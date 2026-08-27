# Talking Tails Dog Training

Static marketing site for **Talking Tails Dog Training** — Murfreesboro, Tennessee.

No build step, no dependencies. Open `index.html` in a browser, or serve the
folder with anything (`python3 -m http.server`, Netlify, Vercel, S3, cPanel).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — positioning, program overview, process, behavior list, trainer intro, reviews, CTA |
| `about.html` | Story, trainer bio, training principles, who we work with |
| `training.html` | The four programs in detail, behavior solutions, FAQ |
| `videos.html` | Video gallery (placeholder thumbnails ready for embeds) |
| `contact.html` | Contact details, evaluation request form, what to expect |

Shared assets:

```
assets/css/styles.css   all styling, design tokens at the top
assets/js/main.js       mobile nav, sticky-header hairline, scroll reveals
```

Everything degrades gracefully: with JavaScript disabled the nav collapses to a
plain list and all content is visible (no reveal animations).

## Brand

| Token | Value | Used for |
| --- | --- | --- |
| `--ember` | `#dc612f` | Primary accent — buttons, rules, highlights, CTA band |
| `--ink` | `#0e1d2b` | Text, dark sections, footer |
| `--cream` / `--sand` / `--paper` | `#fbf8f5` / `#f2ece5` / `#ffffff` | Page, ribbon, card surfaces |

Type is **Fraunces** (display) over **Karla** (body), loaded from Google Fonts.
Layout leans on generous whitespace: section padding scales from 5rem to 9.5rem,
content columns are capped near 62ch, and cards sit on a wide 1180px shell.

All colors, fonts and spacing live in the `:root` block at the top of
`styles.css` — change them there and the whole site follows.

## Before this goes live

1. **Photography.** The `.frame` blocks on `index.html` and `about.html` and the
   `.video__thumb` blocks on `videos.html` are styled placeholders. Each is
   marked with an HTML comment; swap in real images or video embeds.
2. **Testimonials.** The three quotes on `index.html` are placeholder copy
   (marked with a comment). Replace them with verified Google/Facebook reviews
   and real attribution before publishing.
3. **Contact form.** `contact.html` posts to `#`. Point the `action` at a form
   handler (Formspree, Jotform, Netlify Forms, etc.).
4. **Business details.** Phone `629-772-3647` and the "by appointment" hours are
   set throughout; confirm hours, and add an email address and street address if
   you want them public. The `LocalBusiness` JSON-LD block in `index.html` should
   be updated to match.
5. **Canonical URLs.** Each page declares `https://talkingtailstn.com/<page>`.
   Update if the site lives somewhere else.

## Accessibility & SEO notes

- Skip link, visible focus rings, labelled form fields, `aria-current` on the
  active nav item, `aria-expanded` on the mobile menu toggle.
- One `<h1>` per page, unique `<title>` and meta description, Open Graph tags,
  `LocalBusiness` structured data on the home page.
- `prefers-reduced-motion` disables every animation and reveal.
- Verified at 1440px, 1000px, 860px and 390px with no horizontal overflow.
