# Arena Studio integration — 19 September 2026

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

`node scripts/sync-studio.mjs /absolute/path/to/approved/studio` imports UI components, demo rules, assets and tests without modifying the mobile app. It remaps links to `/espace`, assets to `/studio-images`, and namespaces CSS to `body:has(.studio-surface)` including portalled dialogs. Web-only additions are in `app/espace/studio-web.css` and its layout.

## Validation

`node --test scripts/studio-*.test.mjs` checks 27 onboarding/social/subscription cases.
`node scripts/validate-members.mjs http://localhost:3000` checks the imported routes, redirects, screen assets, marketing links and prices.
Existing phone, sport-image and supporter validations remain applicable. No automated browser interaction or visual QA was performed.
