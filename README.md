# Lefa's portfolio

Personal portfolio for Lefa Malatji, showcasing software development, AI and NLP research, database systems and data analysis.

**Live website:** https://lefamalatji.co.za

## Technology

- HTML, CSS and vanilla JavaScript
- Static files with no application server, database or build step required
- Python and ReportLab for regenerating the downloadable CV (optional)

## Run locally

Install Python 3, open a terminal in this repository, then run:

```bash
python -m http.server 8000 --directory dist
```

Open http://localhost:8000 in your browser.

## Files

- `dist/index.html`: page content, CSS and JavaScript
- `dist/lefa-malatji.jpeg`: portrait
- `dist/Lefa-Malatji-CV.pdf`: downloadable CV
- `dist/favicon.svg` and `dist/favicon.ico`: browser icons
- `scripts/generate_cv.py`: optional CV generator

## Update the portfolio

Edit `dist/index.html` in Visual Studio Code and preview locally. Replace the portrait or CV in `dist/` as needed. Commit and push your changes to keep this repository up to date.

**Deployment:** this repository is a copy of the portfolio source. Pushing here does not currently update https://lefamalatji.co.za automatically. The live site still uses its existing hosting and DNS configuration. A GitHub deployment workflow must be configured separately.

## Regenerate the CV (optional)

```bash
python -m pip install -r requirements.txt
python scripts/generate_cv.py
```

The generator expects DejaVu Sans fonts under `/usr/share/fonts/truetype/dejavu/`. On other operating systems, update the `FONT` variable in the script to your local font directory.

## Content

Personal photographs, CV content and project descriptions belong to Lefa Malatji. No reuse licence has been granted.
