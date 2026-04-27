/**
 * Google Apps Script — Welcome-form backend.
 *
 * Purpose: receive JSON POSTs from the site's welcome postcard form and append
 *          one row per submission to a Google Sheet bound to this script.
 *          Suspected bots are routed to a separate "welcome-rejected" tab for
 *          forensic review (never returned an error — silent pass to attacker).
 *
 * Sheets (created automatically on first run):
 *   welcome-submissions:
 *     timestamp_iso | name | profession | message | theme | locale | user_agent | referrer
 *   welcome-rejected:
 *     timestamp_iso | name | profession | message | theme | locale | user_agent | referrer
 *     | origin | dwell_ms | honeypot_value | reject_reason
 *
 * Deploy: see setup/form-backend-google-sheets.md for step-by-step instructions.
 * Required scope: https://www.googleapis.com/auth/spreadsheets.currentonly
 */

const SHEET_NAME = 'welcome-submissions';
const REJECTED_SHEET_NAME = 'welcome-rejected';
const MIN_DWELL_MS = 2000;
const ALLOWED_ORIGINS = [
  'https://jajupmochi.github.io',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
];
const ALLOWED_ORIGIN_PREFIXES = [
  'http://192.168.',
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const reason = detectReject_(body);
    if (reason) {
      logRejected_(body, reason);
      return jsonResponse_({ ok: true });
    }

    const sheet = getOrCreateSheet_();
    sheet.appendRow([
      new Date().toISOString(),
      sanitize_(body.name),
      sanitize_(body.profession),
      sanitize_(body.message),
      sanitize_(body.theme),
      sanitize_(body.locale),
      sanitize_(body.userAgent),
      sanitize_(body.referrer),
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, hint: 'POST JSON to this endpoint.' });
}

/**
 * Returns a reject reason string if the payload looks like a bot, else null.
 * All three checks are fail-closed on a concrete signal and fail-open on
 * missing data (to avoid false positives from users with privacy extensions
 * or cached older page JS).
 */
function detectReject_(body) {
  if (body.website && String(body.website).trim().length > 0) {
    return 'honeypot';
  }
  const origin = body.origin;
  if (origin && !isOriginAllowed_(origin)) {
    return 'bad_origin';
  }
  const dwellMs = typeof body.dwellMs === 'number' ? body.dwellMs : null;
  if (dwellMs !== null && dwellMs < MIN_DWELL_MS) {
    return 'dwell_too_fast';
  }
  return null;
}

function isOriginAllowed_(origin) {
  if (ALLOWED_ORIGINS.indexOf(origin) >= 0) return true;
  return ALLOWED_ORIGIN_PREFIXES.some(p => origin.indexOf(p) === 0);
}

function logRejected_(body, reason) {
  const sheet = getOrCreateRejectedSheet_();
  sheet.appendRow([
    new Date().toISOString(),
    sanitize_(body.name),
    sanitize_(body.profession),
    sanitize_(body.message),
    sanitize_(body.theme),
    sanitize_(body.locale),
    sanitize_(body.userAgent),
    sanitize_(body.referrer),
    sanitize_(body.origin),
    sanitize_(body.dwellMs),
    sanitize_(body.website),
    reason,
  ]);
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'timestamp_iso', 'name', 'profession', 'message',
      'theme', 'locale', 'user_agent', 'referrer',
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateRejectedSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(REJECTED_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(REJECTED_SHEET_NAME);
    sheet.appendRow([
      'timestamp_iso', 'name', 'profession', 'message',
      'theme', 'locale', 'user_agent', 'referrer',
      'origin', 'dwell_ms', 'honeypot_value', 'reject_reason',
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sanitize_(v) {
  if (v === undefined || v === null) return '';
  const s = String(v).slice(0, 2000);
  return s.replace(/^[=+\-@]/, "'$&");
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
