/**
 * Google Apps Script — Welcome-form backend.
 *
 * Purpose: receive JSON POSTs from the site's welcome postcard form and append
 *          one row per submission to a Google Sheet bound to this script.
 *
 * Sheet columns (created automatically on first run):
 *   timestamp_iso | name | profession | message | theme | locale | user_agent | referrer
 *
 * Deploy: see setup/form-backend-google-sheets.md for step-by-step instructions.
 * Required scope: https://www.googleapis.com/auth/spreadsheets.currentonly
 */

const SHEET_NAME = 'welcome-submissions';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
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
