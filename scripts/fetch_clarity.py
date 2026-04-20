#!/usr/bin/env python3
"""Fetch Microsoft Clarity project-live-insights and write snapshot JSON.

Run via GitHub Actions on a weekly cron (see .github/workflows/backup-analytics.yml).
Requires env var CLARITY_API_TOKEN (set as a repo secret). Writes
data/analytics/clarity-YYYY-MM-DD.json relative to the repo root.

The free Clarity tier limits API calls to 10/day per project — weekly cron
is safely under that.
"""
from __future__ import annotations

import json
import os
import sys
from datetime import date
from pathlib import Path
from urllib import request, parse, error

API_URL = "https://www.clarity.ms/export-data/api/v1/project-live-insights"
OUT_DIR = Path(__file__).resolve().parents[1] / "data" / "analytics"


def fetch(token: str, num_days: int = 3, dimensions: tuple[str, ...] = ("Browser", "Country")) -> dict:
    """Call Clarity Data Export API. Returns parsed JSON response."""
    params = [("numOfDays", str(num_days))]
    for i, d in enumerate(dimensions, start=1):
        params.append((f"dimension{i}", d))
    url = f"{API_URL}?{parse.urlencode(params)}"
    req = request.Request(url, headers={"Authorization": f"Bearer {token}"})
    with request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> int:
    token = os.environ.get("CLARITY_API_TOKEN")
    if not token:
        print("error: CLARITY_API_TOKEN env var not set", file=sys.stderr)
        return 1

    try:
        payload = fetch(token)
    except error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")[:500]
        print(f"error: Clarity API returned HTTP {e.code}: {body}", file=sys.stderr)
        return 1
    except error.URLError as e:
        print(f"error: could not reach Clarity API: {e}", file=sys.stderr)
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / f"clarity-{date.today().isoformat()}.json"
    snapshot = {
        "fetched_at": date.today().isoformat(),
        "source": "clarity.microsoft.com/export-data/api/v1/project-live-insights",
        "num_days": 3,
        "data": payload,
    }
    out_path.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"wrote {out_path.relative_to(OUT_DIR.parents[1])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
