# Odoo Worldwide

Static website for https://odooworldwide.com, adapted from the supplied website package without changing its design.

## Publish
In Settings → Pages, choose Deploy from a branch, branch `main`, folder `/docs`, and Save. Set the custom domain to `odooworldwide.com` and configure domain DNS for GitHub Pages. Enable HTTPS when available.

## Form
The consultation form posts to https://formspree.io/f/xoevyrnb. Configure and verify the notification recipient in the Formspree dashboard. No secret keys belong in this repository. Submissions are processed by Formspree; the site does not use the original Cloudflare database.

## Editing
Editable source is in app/page.tsx and app/globals.css. Run `npm install` and `npm run build` with Node 22.13+; commit the resulting docs folder to publish updates. The initial docs build reuses the supplied production assets with a standalone React entry and the Formspree integration.

## Verification
Static checks cover JavaScript syntax, bundled imports, and the Formspree endpoint. Browser rendering and actual email delivery still require verification after publishing.
