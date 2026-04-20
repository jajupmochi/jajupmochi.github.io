#!/usr/bin/env python3
"""Check locales/{en,zh,fr,de}.json have identical key trees; en is baseline."""
import json
import sys
from pathlib import Path

LOCALES_DIR = Path(__file__).resolve().parents[1] / "locales"
BASELINE = "en"
OTHERS = ("zh", "fr", "de")


def flatten(d, prefix=""):
    keys = set()
    for k, v in d.items():
        path = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            keys |= flatten(v, path)
        else:
            keys.add(path)
    return keys


def load_keys(name):
    with (LOCALES_DIR / f"{name}.json").open(encoding="utf-8") as f:
        return flatten(json.load(f))


def main():
    try:
        baseline = load_keys(BASELINE)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"error: {BASELINE}.json — {e}", file=sys.stderr)
        return 1

    print(f"i18n parity check — baseline: {BASELINE}.json ({len(baseline)} keys)")
    ok = True
    for name in OTHERS:
        try:
            keys = load_keys(name)
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"  {name}.json: {e}")
            ok = False
            continue

        missing = sorted(baseline - keys)
        extra = sorted(keys - baseline)
        if not missing and not extra:
            print(f"  {name}.json: OK")
            continue
        ok = False
        if missing:
            print(f"  {name}.json: MISSING {len(missing)} key(s):")
            for k in missing:
                print(f"    - {k}")
        if extra:
            print(f"  {name}.json: EXTRA {len(extra)} key(s):")
            for k in extra:
                print(f"    + {k}")

    if not ok:
        print("\ni18n parity check FAILED. Sync keys before committing.", file=sys.stderr)
        return 1
    print("\nall locales in sync.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
