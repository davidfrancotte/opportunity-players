# Arena Studio integration — 19 September 2026

## Trust / multisport update

The web member area now includes disciplines and per-sport rankings/clubs, agent declarations and reciprocal-link simulation, pending document/photo metadata, professional reviews, reports and blocking, signup notices and a second simulated code, and referral qualification. Seven additional member routes remain under `/espace/`. Source rules match the mobile demo; desktop sidebar, profile columns and two-pane messaging are preserved.

The public Application page explains all features and their separate benefits for athletes, professionals and collectives. Safety and referral descriptions explicitly distinguish prototype behaviour from production requirements. The home page has three keyboard-accessible screenshot tabs: profile, player filters and safety. The login/onboarding editorial panel uses an actual updated desktop screenshot.

Screenshots `studio-web-*-trust.png` are 1440×1000 captures of the implemented desktop UI. Updated mobile captures are 780×1688 (390×844 at 2x), including the dossier, level filters, messages, safety and referral screens. These are real prototype interactions with fictional records, not generated mockups.

47 shared rule tests pass. Desktop flows and new routes were checked in Chrome at 390/900/1440 CSS pixels; no new server authentication, uploads, real moderation or billing has been introduced.

Older sync scripts are migration utilities, not automatic synchronization. Do not run them over the web adaptations without reviewing route and desktop-layout differences.

- `/application`: five features and separate benefits for athletes, professionals and collectives.
- `/espace/connexion`: entry to the simulated member experience, imported from the approved mobile app.
- `/espace/*`: namespaced mobile routes, in-memory interactions and subscription gates. No real identity, email, messaging or payment service.
- `/tarifs`: free access and approved monthly Premium prices: €2.99 / €14.99 / €29.99. No annual or tax promises.
- `lib/studio/pricing.ts`: shared source of prices for both the website pricing cards and its member demo.
- `public/app-visuals/studio-*.png`: actual screenshots of the local standalone Arena Studio v4 app, captured at 390 × 844 CSS pixels, 2x. Real demo UI with fictional contents, not AI mockups or native-store screenshots. Captured solely to supply the requested visual assets, not as browser QA.
- Existing phone mesh, material, side buttons, depth and ±45° scroll motion are retained. All showcase placements now use actual Studio captures.
- Store links still open the current published native app, with an explicit distinction from the future Studio design.
- Old member-detail and opportunity-detail bookmarks redirect to the new network / marketplace instead of invoking the retired member state provider.

## Source reuse

`scripts/sync-studio.mjs` was used for the initial import. It now refuses to overwrite the adapted desktop screens unless `--replace-web-customizations` is explicitly supplied. Prefer selectively merging shared model/rule changes. Never blindly resync the mobile UI into the website.

## Desktop web member experience — version 12

The website member area is no longer a 480px phone frame. `components/studio/web-shell.tsx` supplies a desktop sidebar, current section and account controls. The feed has a central column and contextual network/profile/opportunity rail. Network and opportunity cards use responsive grids. Profiles and plans use desktop columns. Messages show the conversation list beside the active thread (a selection prompt appears before opening a conversation). Auth screens use a full-width editorial/form split. Below 900px, the website keeps the mobile bottom navigation and single-column screens; at 1200px the feed gains its contextual rail.

Web-specific changes live in `app/espace/studio-web.css`, the layout and shell, plus the shared website copies of auth/social screens. The standalone mobile app is unchanged. Both website source variants include these changes. All actions retain their original in-memory demo/subscription rules. No real login, session persistence, messages or payments have been added.

## Validation

`node --test scripts/studio-*.test.mjs` checks 27 onboarding/social/subscription cases.
`node scripts/validate-members.mjs http://localhost:3000` checks the imported routes, redirects, screen assets, marketing links and prices.
Existing phone, sport-image and supporter validations remain applicable. The initial integration used HTTP/content checks only.

## Navigation correction — version 10

The published Vinext beta.5 / Vite 8 client build lost the named exports of its lazily imported navigation modules. A click failed with `navigateClientSide is not a function`, while prefetch failed on `getPrefetchInterceptionContext`. Content tabs were still functional.

`plugins/navigation-compat.ts` binds the two router shims’ internal module namespaces statically, retaining their asynchronous Promise contract and the `use client` directive. It does not replace links with full-page reloads, change the framework version or affect the separate Next.js/Netlify port.

`scripts/validate-navigation-browser.mjs` exercises the compiled production site in Chromium: four content tabs, five desktop menu links, login, all five app tabs, three profile tabs and the mobile menu. It checks the absence of navigation errors and that a fictional like is preserved across route changes. Run with an installed Playwright module (`PLAYWRIGHT_MODULE_PATH`) and optional Chrome executable (`CHROME_PATH`). No real user account or external messages are involved.
