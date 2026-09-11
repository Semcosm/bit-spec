# Bit Specification website

This is the Docusaurus shell for the repository documentation. The docs plugin reads Markdown from the repository root, so the specification has one source of truth.

The site is built and deployed by [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml) after a push to `main` or `master`. No local Node.js setup is required for normal editing: update the Markdown, commit, and push. GitHub Actions installs the pinned Docusaurus dependencies, builds `website/build`, and publishes it to GitHub Pages.

In the repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions** once. The workflow uses the repository owner and name from GitHub to derive the Pages URL and project base path.
