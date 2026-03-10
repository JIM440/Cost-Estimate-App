## Walkthrough (Guided overlay)

This app uses a **custom guided walkthrough** that blocks the UI until the user either **Skips** or **Finishes** the walkthrough.

### What the user sees

A 4-step walkthrough that guides the user through:

1. **Home → House Category** tab
2. **Home → Individual Estimates** tab
3. **Guides**
4. **Settings** (theme & customization)

Each step shows a bottom panel with **Next / Skip** (and **Finish** on the last step).
While the walkthrough is running, a full-screen overlay prevents tapping tabs, switching screens, or dismissing by tapping outside.

### Persistence (first run logic)

We persist walkthrough state in `AsyncStorage`:

- **Onboarding** sets:
  - `@cost_estimate_has_seen_onboarding = "true"`
  - `@cost_estimate_walkthrough_state = "pending"`
- The walkthrough provider reads `@cost_estimate_walkthrough_state` and automatically starts the spotlight tour when it is `pending`.
- When the user **skips** or finishes, we set `@cost_estimate_walkthrough_state = "completed"`.

Key files:

- `app/onboarding.tsx`: sets the `pending` walkthrough state when onboarding finishes.
- `context/WalkthroughContext.tsx`: stores and exposes the persisted walkthrough status + `reset()`.
- `app/(tabs)/_layout.tsx`: renders the **blocking overlay** and handles Next/Finish navigation.

### Tour steps mapping

Steps are driven by `WalkthroughContext.currentStep`:

- `home-house`
- `home-individual`
- `guides`
- `settings`

Navigation between screens happens in `app/(tabs)/_layout.tsx` when the user presses **Next**.

### Translations / theme

Tooltip text uses i18n keys in `context/LocaleContext.tsx`:

- `walkthrough.home.house.*`
- `walkthrough.home.individual.*`
- `walkthrough.guides.*`
- `walkthrough.settings.*`
- `walkthrough.next`, `walkthrough.back`, `walkthrough.skip`, `walkthrough.done`

Tooltip styles use theme colors from `context/ThemeContext.tsx`.

### How to restart the walkthrough (testing)

Go to **Settings → MORE → “Start app walkthrough”**.

That calls `reset()` (sets `@cost_estimate_walkthrough_state = "pending"`) and navigates to Home.
The walkthrough auto-starts on Home and shows step 1.

