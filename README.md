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

## Automatic deployment

The workflow `.github/workflows/deploy-pages.yml` deploys `dist/` to GitHub Pages when files in `dist/` change on `main`. It can also be started manually from Actions.

One-time setup:

1. In this repository, open Settings > Pages.
2. Under Build and deployment, set Source to GitHub Actions.
3. Open Actions > Deploy portfolio to GitHub Pages > Run workflow.
4. Wait for a successful deployment and open the URL shown by the deployment job.

The workflow adjusts asset links in the deployment copy so the GitHub Pages project URL works. No build or account secrets are required.

**Custom domain:** https://lefamalatji.co.za still points to its existing hosting. GitHub deployments will update the GitHub Pages site only until the custom domain is configured in Pages and its DNS records are switched. Verify the Pages deployment before changing DNS.

## Regenerate the CV (optional)

```bash
python -m pip install -r requirements.txt
python scripts/generate_cv.py
```

The generator expects DejaVu Sans fonts under `/usr/share/fonts/truetype/dejavu/`. On other operating systems, update the `FONT` variable in the script to your local font directory.

## Content

Personal photographs, CV content and project descriptions belong to Lefa Malatji. No reuse licence has been granted.
