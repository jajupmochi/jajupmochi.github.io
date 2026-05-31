#!/usr/bin/env python3
"""Regenerate each post's `updated` date and `revisions` list in
blog-posts/registry.json straight from git history — so the blog footer
("Updated" + edit history) always reflects GitHub without a runtime API call.

- `updated`  = date of the newest commit that touched the post's *.md files.
- `revisions` = newest-first list of those commits: {date, sha(7), by, summary}.
- Curated `summary`/`by` are PRESERVED by matching commit sha, so any hand
  edits in registry.json survive future runs; only genuinely-new commits are
  added (with the commit subject as a placeholder summary).

Run from anywhere; paths are resolved relative to this file.
Wired up by .github/workflows/update-registry.yml (push to blog-posts/**/*.md).
Idempotent: writes registry.json only when something actually changed.
"""
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REGISTRY = os.path.join(ROOT, "blog-posts", "registry.json")
# Author label applied to newly-discovered commits. Edit a revision's "by" in
# registry.json to override for a specific commit (preserved on later runs).
DEFAULT_BY = "Linlin × Claude"
SEP = "\x1f"  # unit separator, safe inside commit subjects


def git_log(paths):
    if not paths:
        return []
    res = subprocess.run(
        ["git", "-C", ROOT, "log", "--date=short",
         f"--format=%h{SEP}%ad{SEP}%s", "--", *paths],
        capture_output=True, text=True, check=True,
    )
    commits = []
    for line in res.stdout.splitlines():
        if not line.strip():
            continue
        sha, date, subject = line.split(SEP, 2)
        commits.append({"sha": sha, "date": date, "subject": subject})
    return commits  # newest first


def main():
    with open(REGISTRY, encoding="utf-8") as f:
        reg = json.load(f)

    changed = False
    for post in reg.get("posts", []):
        slug = post.get("slug")
        if not slug:
            continue
        langs = post.get("langs") or ["en"]
        md = [f"blog-posts/{slug}/{lang}.md" for lang in langs]
        md = [p for p in md if os.path.exists(os.path.join(ROOT, p))]
        commits = git_log(md)
        if not commits:
            continue

        old = {r.get("sha"): r for r in post.get("revisions", []) if r.get("sha")}
        revisions = []
        for c in commits:
            if c["sha"] in old:
                revisions.append(old[c["sha"]])  # keep curated entry verbatim
            else:
                revisions.append({
                    "date": c["date"],
                    "sha": c["sha"],
                    "by": DEFAULT_BY,
                    "summary": {lang: c["subject"] for lang in langs},
                })
        updated = revisions[0]["date"]

        if post.get("revisions") != revisions or post.get("updated") != updated:
            post["revisions"] = revisions
            post["updated"] = updated
            changed = True

    if changed:
        with open(REGISTRY, "w", encoding="utf-8") as f:
            json.dump(reg, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print("registry.json: updated")
    else:
        print("registry.json: already current")
    return 0


if __name__ == "__main__":
    sys.exit(main())
