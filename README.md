# Talking Tails Dog Training

Static marketing site for **Talking Tails Dog Training** — Murfreesboro, Tennessee.

No build step, no dependencies. Open `index.html` in a browser, or serve the
folder with anything (`python3 -m http.server`, Netlify, Vercel, S3, cPanel).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — positioning, program overview, process, behavior list, trainer intro, reviews, CTA |
| `about.html` | Who we are, training principles, All Pet Card financing, service area, owner bio, press |
| `trainers.html` | Trainers &amp; staff roster with expandable bios, plus verified Google reviews |
| `training.html` | The four programs in detail, behavior solutions, FAQ |
| `videos.html` | Video gallery (placeholder thumbnails ready for embeds) |
| `contact.html` | Contact details, embedded evaluation request form, what to expect |
| `quiz.html` | Embedded program-match quiz (survey), what happens after |

Shared assets:

```
assets/css/styles.css   all styling, design tokens at the top
assets/js/main.js       mobile nav, sticky-header hairline, scroll reveals
```

Everything degrades gracefully: with JavaScript disabled the nav collapses to a
plain list and all content is visible (no reveal animations).

## Photography

Six photos live in `assets/` and are placed like this:

| Photo | Where it appears |
| --- | --- |
| `dogfield.jpg` | Home hero &mdash; full-bleed background |
| `Hybrid-Training-Program.avif` | Home "Hybrid Training" card &middot; `training.html#private` &middot; About intro |
| `Puppy-Lesson.webp` | Home "Puppy Training" card &middot; `training.html#puppy` &middot; Contact "what to expect" |
| `Board-Train.avif` | Home "Board &amp; Train" card &middot; `training.html#obedience` |
| `Group-Class.avif` | Home "Group Classes" card &middot; `training.html#group` |
| `why-us.webp` | Home "Our story" |

The hero treatment lives in `styles.css` under *Photo hero*, entirely scoped to
`.hero--photo` &mdash; the plain `.hero` rules are untouched, so the photo hero can
be lifted out by deleting that one block and the `hero--photo` class plus the
`<img class="hero__bg">` on `index.html`. It layers the photo (`z-index: 0`), a
scrim (`1`) and the copy (`2`); the z-indexes are load-bearing, because the
`::before` scrim precedes the `<img>` in the DOM and would otherwise paint
underneath it. The scrim is weighted to the left so the copy stays legible while
the dog sits in open light, and the stat panel gets a translucent surface of its
own rather than darkening the whole photo to suit it.

Four more CSS helpers (under *Photography*) carry the rest:

- `.photo` &mdash; the real-image counterpart to `.frame`: fixed ratio, rounded
  corners, `object-fit: cover`. Modifiers `--wide` (16/10), `--square`,
  `--tall`. `.photo__caption` sits on a gradient scrim so it reads over any
  image.
- `.photo-plain` &mdash; for a photo that arrives with its own border or matte
  baked into the file (`why-us.webp`), so it gets no frame of ours.
- `.card__photo` &mdash; full-bleed lid on a `.card`, cancelling the card's own
  padding via the `--card-pad` variable. Scales gently on card hover.
- `.feature__photo` &mdash; photo in the narrow label column of a `.feature`
  block, capped at 420px once the block stacks on narrow screens.

Every `<img>` carries `alt`, intrinsic `width`/`height` (so nothing shifts as
images load), `loading="lazy"` and `decoding="async"`.

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

1. **Photography.** The five photos in `assets/` are now placed across the site
   (see *Photography* below). Still placeholders: the `.frame` block on
   `about.html` (owner headshot), the `.person__photo` blocks on
   `trainers.html` and the `.video__thumb` blocks on `videos.html`. Each is
   marked with an HTML comment; swap in real headshots, images or embeds.
   Three things to check before launch:
   - `Group-Class.avif` has **"SIT MEANS SIT DOG TRAINING"** legible on the
     picnic table. That brand appears nowhere else on this site — crop it out,
     or replace the photo, unless the association is intentional.
   - `Board-Train.avif` (terrier in sunglasses at an airport) reads as stock
     rather than as Talking Tails' own work, and is the smallest file at
     598&times;446. A real board-and-train photo would carry more weight.
   - `dogfield.jpg` is **3.6&nbsp;MB** at 2816&times;1536, and as the hero
     background it is the homepage's largest-contentful-paint image &mdash; the
     one file where weight costs the most. Resized to 1920px wide it is
     ~395&nbsp;KB as JPEG q82 or ~317&nbsp;KB as WebP; at 2400px, ~575&nbsp;KB
     / ~438&nbsp;KB. Any of those is a 6&ndash;11&times; saving with nothing
     visible given up at real display sizes.
   - `Puppy-Lesson.webp` is **619&nbsp;KB** for a 940&times;701 image — it looks
     lossless. Re-encoding at WebP q85 brings it to ~96&nbsp;KB with no visible
     loss. It appears on three pages, so this is the single biggest page-weight
     win available. `why-us.webp` (307&nbsp;KB, has transparency) drops to
     ~30&nbsp;KB the same way. Source files were left untouched.
   - The red matte baked into `why-us.webp` is a harder red than the brand
     `--ember` (`#f26224`). Fine as-is, but it is not a palette colour.
2. **Testimonials.** The four quotes on `index.html` are placeholder copy
   (marked with a comment). Replace them with verified Google/Facebook reviews
   and real attribution before publishing. The seven reviews on `trainers.html`
   are client-supplied from the live Google profile; the two Google links on
   that page point at `#` and need the real review URL. Note the review count
   differs between pages — `trainers.html` says 260 (client copy), `index.html`
   says 288+. Pick one number.
3. **Hosted embeds.** The contact form (`contact.html`) and the program quiz
   (`quiz.html`) are iframes served from `links.k9-dynamics.com`, each followed
   by `form_embed.js`, which resizes the frame as the visitor moves through it.
   The CSS `min-height` on `.embed--form` / `.embed--survey` is the pre-script
   fallback, so update it if either form's length changes materially. Both
   embeds carry `data-cookie-consent="true"`. If an embed fails to load, the
   phone-number fallback below it is all the visitor gets — worth re-checking
   after any change on the k9-dynamics side.
4. **Good Morning Murfreesboro.** The `.video` block on `about.html` is a
   placeholder; drop in the real interview embed when the URL is available.
5. **Business details.** Phone `629-772-3647` and the "by appointment" hours are
   set throughout; confirm hours, and add an email address and street address if
   you want them public. The `LocalBusiness` JSON-LD block in `index.html` should
   be updated to match.
6. **Canonical URLs.** Each page declares `https://talkingtailstn.com/<page>`.
   Update if the site lives somewhere else.

## Accessibility & SEO notes

- Skip link, visible focus rings, labelled form fields, `aria-current` on the
  active nav item, `aria-expanded` on the mobile menu toggle.
- One `<h1>` per page, unique `<title>` and meta description, Open Graph tags,
  `LocalBusiness` structured data on the home page.
- `prefers-reduced-motion` disables every animation and reveal.
- Verified at 1440px, 1000px, 860px and 390px with no horizontal overflow.
