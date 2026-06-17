# Privacy & Data Handling — Morning!

_Last updated: 2026-06-09_

Morning! is a browser extension that schedules a wellness break (a walk, or a
hydrate reminder) and shows a countdown or nudge when it's time. It is built so
that **all of your data stays on your own device, under your control** — a
deliberate data-sovereignty stance, not an afterthought.

## The short version

- **Nothing leaves your device.** Morning! makes no network requests at runtime.
  No analytics, no telemetry, no tracking, no third-party services.
- **Your data stays local.** Scheduled tasks are stored only in your browser's
  local extension storage (`chrome.storage.local`) on this device. They are
  never uploaded, synced, or sent to any server or cloud account.
- **No accounts.** There is no sign-in, no profile, and no identifier.

## What the extension stores

When you schedule a break, Morning! saves, locally:

- the task you chose (e.g. `walk` or `hydrate`),
- the duration (for timed tasks),
- whether it repeats daily,
- the time the alarm should fire.

This lives in `chrome.storage.local` only so the extension can open your
countdown/reminder at the right moment. One-time tasks are deleted automatically
after they fire; recurring tasks are kept until you remove them.

## What the extension does NOT do

- It does not collect personal information.
- It does not read, modify, or transmit the content of pages you visit.
- It does not contact any external server — the Poppins font is bundled with the
  extension instead of being loaded from Google Fonts.
- It does not use cookies, analytics, advertising, or fingerprinting.

## Enforced by the extension itself

- A Content-Security-Policy (`default-src 'self'`) tells the browser to **block**
  any external network request from the extension's pages — so the "no egress"
  guarantee is enforced, not just promised.
- All assets (fonts, icons, scripts, styles) are packaged in the extension.

## Permissions, and why

- **alarms** — to fire your scheduled break at the chosen time.
- **storage** — to remember your scheduled tasks locally on your device.

Neither of these grants access to your browsing history or page content.

## Your data, your control

You can remove a scheduled task at any time, or remove everything by uninstalling
the extension — uninstalling deletes all data Morning! has stored.

## Contact

Questions about this app's data handling: reza.soleimani@animikii.com
