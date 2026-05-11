#!/usr/bin/env python3
"""Validate canonical bilingual routes in local Jekyll build output."""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from html import unescape
from pathlib import Path
from typing import Dict, List, Optional


@dataclass
class RouteExpectation:
    route: str
    expected_lang: str


@dataclass
class ValidationIssue:
    route: str
    message: str


SWITCHER_DIV_RE = re.compile(r"<div[^>]*data-language-switcher[^>]*>", re.IGNORECASE | re.DOTALL)
ATTR_RE = re.compile(r"([:\w-]+)=(\"([^\"]*)\"|'([^']*)')")
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)


def resolve_html_path(site_dir: Path, route: str) -> Path:
    normalized = route.lstrip("/")
    if not normalized:
        return site_dir / "index.html"

    if route.endswith(".html"):
        return site_dir / normalized

    return site_dir / normalized / "index.html"


def extract_title(html: str) -> str:
    match = TITLE_RE.search(html)
    if not match:
        return ""
    return unescape(match.group(1)).strip()


def extract_switcher_attrs(html: str) -> Optional[Dict[str, str]]:
    match = SWITCHER_DIV_RE.search(html)
    if not match:
        return None

    attrs: Dict[str, str] = {}
    for attr_match in ATTR_RE.finditer(match.group(0)):
        name = attr_match.group(1)
        value = attr_match.group(3) if attr_match.group(3) is not None else attr_match.group(4)
        attrs[name] = unescape(value)
    return attrs


def validate_route(site_dir: Path, expectation: RouteExpectation) -> List[ValidationIssue]:
    issues: List[ValidationIssue] = []
    html_path = resolve_html_path(site_dir, expectation.route)

    if not html_path.exists():
        issues.append(ValidationIssue(expectation.route, f"Missing generated file: {html_path}"))
        return issues

    html = html_path.read_text(encoding="utf-8", errors="replace")
    title = extract_title(html)
    if "404" in title.lower() or "not found" in title.lower():
        issues.append(ValidationIssue(expectation.route, f"Route renders 404 template title: '{title}'"))

    switcher = extract_switcher_attrs(html)
    if switcher is None:
        issues.append(ValidationIssue(expectation.route, "Language switcher markup is missing"))
        return issues

    current_lang = switcher.get("data-current-lang", "")
    if current_lang != expectation.expected_lang:
        issues.append(
            ValidationIssue(
                expectation.route,
                f"Expected data-current-lang='{expectation.expected_lang}' but found '{current_lang or '[missing]'}'",
            )
        )

    for attr_name in ("data-target-en", "data-target-es"):
        value = switcher.get(attr_name, "")
        if not value:
            issues.append(ValidationIssue(expectation.route, f"Missing {attr_name} in language switcher"))
        elif "/404.html" in value:
            issues.append(ValidationIssue(expectation.route, f"{attr_name} points to 404 route: {value}"))

    return issues


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate canonical routes in local _site output")
    parser.add_argument("--site-dir", default="_site", help="Path to generated Jekyll output directory")
    args = parser.parse_args()

    site_dir = Path(args.site_dir).resolve()
    expectations = [
        RouteExpectation(route="/", expected_lang="en"),
        RouteExpectation(route="/about/", expected_lang="en"),
        RouteExpectation(route="/posts/", expected_lang="en"),
        RouteExpectation(
            route="/jekyll/speckit/2026/05/08/how-to-build-a-blog-with-spec-driven-design.html",
            expected_lang="en",
        ),
        RouteExpectation(
            route="/jekyll/theme/2026/05/08/installing-minimal-mistakes-on-a-bilingual-jekyll-blog.html",
            expected_lang="en",
        ),
        RouteExpectation(route="/es/", expected_lang="es"),
        RouteExpectation(route="/es/about/", expected_lang="es"),
        RouteExpectation(route="/es/posts/", expected_lang="es"),
        RouteExpectation(
            route="/es/jekyll/speckit/2026/05/08/como-crear-un-blog-con-spec-driven-design.html",
            expected_lang="es",
        ),
        RouteExpectation(
            route="/es/jekyll/theme/2026/05/08/instalacion-minimal-mistakes.html",
            expected_lang="es",
        ),
    ]

    all_issues: List[ValidationIssue] = []
    print(f"Validating local routes in: {site_dir}")

    for expectation in expectations:
        path = resolve_html_path(site_dir, expectation.route)
        print(f"- {expectation.route} -> {path}")
        all_issues.extend(validate_route(site_dir, expectation))

    if all_issues:
        print("\nValidation issues:")
        for issue in all_issues:
            print(f"- {issue.route}: {issue.message}")
        print(f"\nResult: FAILED ({len(all_issues)} issue(s))")
        return 1

    print("\nResult: PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())



