# ColorFlick

A free color guessing game for people who like playing with colors.

Play it at **[colorflick.vercel.app](https://colorflick.vercel.app)**

![ColorFlick: How good is your eye for color?](public/og-image.png)

## About

ColorFlick started as a simple idea: a place where people can have fun with colors. It's for
designers who want to sharpen their eye, developers who'd like to read hex codes without a
converter, students learning color theory, or anyone who enjoys a quick daily puzzle.

It's free, there are no ads, and you don't need an account. Scores, streaks and achievements are
saved in your own browser.

## What's in it

### Game modes

There are nine modes, each with four difficulty levels:

| Mode | What you do |
| --- | --- |
| Color guessing game | Find the swatch that matches the target |
| RGB mixer | Recreate a color with red, green and blue sliders |
| HEX code | Look at a color and type its hex code |
| HSL matcher | Match a color with hue, saturation and lightness sliders |
| Color picker | Recreate a color by eye with a color picker |
| Color name | Pick the right name for a color |
| Warm or cool | Decide whether a color is warm, cool or neutral |
| Light or dark | Decide whether a color is light or dark |
| Closest color | Pick the swatch that looks nearest to the target |

You can play them in different formats: a standard 10-round game, a quick challenge that gets
harder as you go, timed, endless (three lives), survival (one mistake and you're out) or practice.

### Daily challenge

Ten rounds a day, the same for everyone. You get a streak for playing on consecutive days, a
countdown to the next puzzle, a spoiler-free result grid to share (🟩🟩🟥🟩…), and a calendar
for replaying the last five weeks.

### Stats and progress

Your accuracy over recent games, which color families trip you up most, and 16 achievements.

### Tools and guides

A color converter (HEX, RGB, HSL, HSV, OKLab), a WCAG contrast checker, a color difference
calculator and a list of named web colors. There are also short guides to RGB, HEX, HSL and
basic color theory.

### How scoring stays fair

Colors are compared in OKLab, a color space built around how people actually see, rather than
by raw RGB numbers. Every wrong swatch in a round is also checked to make sure it's visibly
different from the target and from the others, so even Expert never turns into a coin flip.
There are tests for this in `tests/randomColor.test.ts`.

Right and wrong answers are always shown with an icon and a label as well as color, and
Settings has color-blind and high-contrast options.

## Run it locally

You need [Node.js](https://nodejs.org/) 18 or newer (20+ recommended).

```bash
git clone https://github.com/shoaibmarif/colorflick.git
cd colorflick
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server with hot reload on port 3000 |
| `npm run build` | Type-check and build the production site into `dist/` |
| `npm run preview` | Serve the production build locally on port 4173 |
| `npm test` | Run the test suite (Vitest) |

The production build also pre-renders an HTML page for every route with its own title,
description and social-preview tags, and generates `sitemap.xml`, `robots.txt` and `404.html`.

## Project structure

```text
src/
  pages/            One component per page (home, games, tools, guides, about…)
  components/       UI building blocks (layout, game board, swatches, charts…)
  hooks/            Game engine, daily challenge, settings and stats state
  utils/            Color math (conversion, OKLab distance, luminance), scoring, sharing
  data/             FAQ, achievements, color names, mode guides
  seo/              Site config, per-page SEO metadata, structured data
  storage/          localStorage persistence and a tiny shared store
scripts/seoPlugin.ts  Build step that pre-renders pages and writes the sitemap
tests/              Unit tests and a render test for every page
vercel.json         Hosting config: clean URLs, redirects, caching headers
```

Useful places to start:

- **Brand name, domain and links:** `src/seo/site.ts`
- **Page titles and descriptions:** `src/seo/routes.ts`
- **Difficulty settings (number of swatches, how close they are):** `DIFFICULTY_CONFIGS` in
  `src/utils/randomColor.ts`
- **Scoring rules:** `SCORING` in `src/utils/scoring.ts`

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · React Router · Vitest. Hosted on Vercel.

## Deploying

The site deploys to Vercel with no extra setup: import the repository, and Vercel picks up the
build command and output folder from `vercel.json`. If you use a different domain, change `url`
in `src/seo/site.ts` - canonical URLs, the sitemap and social tags all follow from it.

## Contributing

Ideas for new modes, bug reports and pull requests are all welcome - please
[open an issue](https://github.com/shoaibmarif/colorflick/issues) first for anything big.
Run `npm test` and `npm run build` before sending a pull request.

## Author

Made by **Shoaib Arif**

- Portfolio: [shoaibarif.vercel.app](https://shoaibarif.vercel.app/)
- LinkedIn: [linkedin.com/in/shoaibmarif](https://www.linkedin.com/in/shoaibmarif/)
- GitHub: [@shoaibmarif](https://github.com/shoaibmarif)
- Email: [shoaibmuhammadarif@gmail.com](mailto:shoaibmuhammadarif@gmail.com)
