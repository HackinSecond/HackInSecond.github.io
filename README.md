# Hack In Seconds website
Static site for GitHub Pages (user site: root `index.html`, root-relative paths). No build needed to deploy.

## Deploy
1. Repo `HackinSecond/hackinsecond.github.io`: upload all files to the root of the default branch.
2. Settings > Pages > Deploy from a branch > main / root. Wait a few minutes; HTTPS is automatic.

## Formspree
Create a form at formspree.io, copy the ID from `https://formspree.io/f/ID`, set `formspreeId` in `js/config.js`, then submit a real test. Until then forms show "not connected".

## Add a video (2 min)
Open `js/data.js`, add to `videos:[ ]`:
`{ id:"11-char-ID", title:"Real title", description:"...", channel:"Hack In Seconds", category:"Beginner", tags:["linux"], date:"2026-10-01", featured:true }` then commit.

## Tools, courses, FAQs
Same file: add objects to `tools`, `courses`, `products`, `faqs` (examples in comments). Search and chatbot use these lists automatically.

## Editing static pages
Header, footer, explore section and legal text are in `build.py`. Edit, run `python3 build.py`, commit the generated HTML.

## Not yet done / manual checks
Formspree test submission, real videos/courses/products, review of legal text, JSON-LD check (search.google.com/test/rich-results), viewport and Lighthouse checks, an Open Graph image.
