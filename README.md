# Morning!

A lightweight Chrome extension that helps you step away from the screen for a quick, intentional break. Schedule a short walk or a hydrate reminder, and Morning! nudges you right on time — with everything kept private and on your own device.

## Features

- **Walk breaks** with a calming, full-screen countdown
- **Hydrate reminders** — a quick nudge, no timer
- **Flexible timing** — start in 15, 30, or 60 minutes, or at a specific time
- **One-time or daily** — schedule a break once or have it repeat every day
- **Morning / afternoon / evening** quick-set buttons that prefill a sensible time
- **Warm, simple interface** that stays out of your way
- **Fully private**. No data is collected, stored externally, or transmitted

## How it works

When you schedule a break, the popup saves your choice (task, length, start time, and repeat setting) to your browser's local storage and creates an alarm with the [`chrome.alarms`](https://developer.chrome.com/docs/extensions/reference/api/alarms) API. Scheduling this way means the break still fires at the right time even after the popup closes.

A background service worker listens for the alarm. When it fires, it opens the countdown (for a walk) or a reminder (for hydrate) in a new tab, and closes that tab once you're done. One-time breaks are cleaned up automatically; recurring breaks fire again the next day.

## Installation

The easiest way is to install directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/morning/kmlcdfaodfmlllggjmgodaaffkeglmjo).

### From source

1. Clone or download this repository:
   ```bash
   git clone https://github.com/rezaska/morning-extension.git
   ```
2. Open `chrome://extensions` in Chrome (or any Chromium-based browser).
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the cloned folder.
5. Click the extension icon to schedule your first break.

## Privacy

This extension is **data-sovereign by design** — all of your data stays on your own device. It makes no network requests, has no accounts, and no analytics or tracking. Your scheduled breaks live only in your browser's local storage, the Poppins font is bundled rather than loaded from Google, and a strict content-security policy blocks the extension from contacting any outside server.

See [`PRIVACY.md`](PRIVACY.md) or the [privacy policy](https://www.rezasoleimani.ca/morning/privacy/) for details.
