# Tests

Test modes:
- Dry: Skip paid providers, validate headers, payload shapes, and linter passes.
- Minimal: Run a single ideation + 1 image + 1 short video with watermark (+ optional QR) to hosting; approvals mocked.
- Full: All lanes active (Animal + Hologram), 3–5 images, 1 avatar, 1 animal video, depth map, audio QC, watermark+QR, approvals, parallel distribution.

Edge cases:
- Missing logo_url_source and missing binary.logo_rgba → must throw with explicit list of missing keys.
- headerParametersUi present in any HTTP node → HeaderPolicy must fail and stop the run.
- Income-claim phrases present in captions → ForbiddenClaims must fail and trigger halt_and_notify.
- Portal lane disabled → Animal lane continues and vice versa.
- Budget exceeded (CostGuard) → graceful stop and report.
- URL HEAD check fails for final_video_url → fallback provider or stop with report.
- Voice or avatar ID missing → fallback to default voice/avatar or skip avatar module with warning.
- QR_TARGET_URL missing → proceed without QR overlay, log warning.
- Audio‑QC outside tolerance (LUFS/phase/binaural) → fail in Full, warn in TEST_MODE.
- Perplexity rate-limited → Claude uses prior hooks; continue.

KPIs:
- ViralScore ≥ $vars.VIRAL_SCORE_THRESHOLD gating correctly.
- Depth map present when enabled and used downstream.
- Logo persistence ≥ 95% frames (video) and visible on images.
- 9:16, 1080p, 24–30 fps, 8–12 s for videos.
- Audio -20 LUFS, binaural, sync < 80 ms; Audio‑QC pass result.
- Distribution executed (Blotato/Predis/Klap/Simplified) with reachable URLs.
- QR overlay visible/scannable when configured (HEAD to QR_TARGET_URL).
- Leads pushed to HubSpot; Metricool metrics logged and reported.

Manual checks:
- Approval windows respected via Wassenger/Telegram.
- Disclaimers auto-inserted when needed.
- No keys hardcoded; headers all Cloud-Policy compliant.
