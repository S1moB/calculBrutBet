#!/usr/bin/env python3
"""
Apply Phases 1-2 fixes across all HTML pages
Phase 1: Mobile/technical CSS fixes
Phase 2: Schema corrections
"""

import re
import os
from pathlib import Path
from datetime import datetime

def apply_phase1_css_fixes(html_content, page_name):
    """Phase 1: Add mobile CSS fixes for overflow bug and touch targets"""

    # Fix 1: Improve mobile overflow/responsive CSS
    if '<style>' in html_content:
        # Find the style block
        style_start = html_content.find('<style>')
        style_end = html_content.find('</style>') + len('</style>')
        style_block = html_content[style_start:style_end]

        # Add responsive fixes after existing CSS
        mobile_fixes = '''
        /* Phase 1 fixes: Mobile responsive improvements */
        .calculator-card, .results-panel, table {
            max-width: 100%;
            box-sizing: border-box;
            overflow-x: auto;
        }
        /* Touch target sizing: nav links >= 44px */
        .nav-link {
            min-height: 44px;
            display: flex;
            align-items: center;
            padding: 0.6rem 0.75rem !important;
        }
        .breadcrumb a {
            padding: 0.4rem 0.2rem;
            display: inline-block;
            min-height: 44px;
            line-height: 44px;
        }
        '''

        # Insert before </style>
        updated_style = style_block.replace('</style>', mobile_fixes + '\n        </style>')
        html_content = html_content.replace(style_block, updated_style)

    return html_content

def apply_phase2_schema_fixes(html_content, page_name):
    """Phase 2: Fix schema issues (logo, sameAs, dateModified)"""

    today = datetime.now().isoformat()[:10]  # YYYY-MM-DD

    # Fix 1: Update logo to square format (only on pages that have Organization)
    if '"logo": "https://monbrutnet.fr/og-image.jpg"' in html_content:
        html_content = html_content.replace(
            '"logo": "https://monbrutnet.fr/og-image.jpg"',
            '"logo": {\n                    "@type": "ImageObject",\n                    "url": "https://monbrutnet.fr/logo.png",\n                    "width": 512,\n                    "height": 512\n                }'
        )

    # Fix 2: Remove incorrect sameAs on a-propos page
    if 'a-propos' in page_name:
        html_content = re.sub(
            r'"sameAs":\s*\[\s*"https://www\.urssaf\.fr",\s*"https://www\.service-public\.fr"\s*\]',
            '"sameAs": []',
            html_content
        )

    # Fix 3: Add dateModified to WebApplication/WebPage if missing
    if '"@type": "WebApplication"' in html_content and '"dateModified"' not in html_content:
        # Add dateModified after description for WebApplication
        html_content = re.sub(
            r'("description":\s*"[^"]*")(,\n\s*")',
            rf'\1,\n            "dateModified": "{today}"\2',
            html_content,
            count=1
        )

    return html_content

def process_all_pages():
    """Process all HTML files in the project"""

    base_path = Path('.')
    html_files = list(base_path.glob('**/index.html'))

    fixed_count = 0

    for html_file in html_files:
        try:
            content = html_file.read_text(encoding='utf-8')
            original = content

            # Apply Phase 1 fixes
            content = apply_phase1_css_fixes(content, str(html_file))

            # Apply Phase 2 fixes
            content = apply_phase2_schema_fixes(content, str(html_file))

            # Only write if changed
            if content != original:
                html_file.write_text(content, encoding='utf-8')
                fixed_count += 1
                print(f"[OK] Fixed: {html_file}")

        except Exception as e:
            print(f"[ERROR] {html_file}: {e}")

    print(f"\nPhase 1-2: {fixed_count} files updated")
    return fixed_count

if __name__ == '__main__':
    process_all_pages()
