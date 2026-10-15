Direct fix (fast, low-risk)
- Add an empty file named .nojekyll at the repository root and push it to main. This tells GitHub Pages to skip Jekyll processing and will prevent the Liquid parser from trying to render README.md files in node_modules (the logs show Liquid syntax errors in third‑party READMEs).
- After the commit, re-run the Pages workflow (Actions → pages build and deployment → Re-run jobs).

Commands you can run locally (copy/paste)
1. git checkout main
2. echo > .nojekyll
3. git add .nojekyll
4. git commit -m "chore: disable Jekyll processing for Pages by adding .nojekyll"
5. git push origin main

Why this fixes it
- The logs show Jekyll failing while parsing files under nhs-donation-portal/node_modules (Liquid syntax errors in third‑party README files such as @tanstack/react-query). Adding .nojekyll tells Pages to serve static files directly and not run the Jekyll build that chokes on those files.

Recommended long-term improvements (optional)
1) Use a Pages workflow that builds the Vite app and deploys the build artifact instead of relying on the default Jekyll runner. Example GitHub Actions job (create .github/workflows/pages.yml) that builds the nhs-donation-portal and deploys the dist folder:

```yaml
name: Build and deploy Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install deps
        run: |
          cd nhs-donation-portal
          npm ci

      - name: Build
        run: |
          cd nhs-donation-portal
          npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: nhs-donation-portal/dist
```

This creates the static site properly (built by Vite) and avoids Jekyll entirely. Combine with .nojekyll or omit if you upload the build artifact.

2) Remove or move any top-level files that make Pages pick Jekyll (e.g., _config.yml) if you prefer Pages to use your custom workflow. (But keep .nojekyll — it’s simplest.)

What I can do next
- I can create and push the .nojekyll file for you, and/or open a PR that adds the recommended Pages workflow. Tell me which you want me to do and I'll apply the change and re-run the Pages job.
