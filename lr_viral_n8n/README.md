# LR Viral n8n Cloud System

This package contains:
- workflow.json (n8n ≥ 1.60 Cloud, 150–190 nodes; Cloud Header Policy)
- prompts.yaml (dynamic lanes, hooks, safety, audio)
- tests.md (dry/minimal/full + KPIs)
- .env.example (variable names only; no keys)

Important: Do not hardcode secrets. Use variables only: {{ $vars.KEY || $env.KEY }}

Cloud Header Policy (mandatory for every HTTP node):
- sendHeaders: true + headerParameters.parameters[] (not headerParametersUi; no credentials block)
- sendBody: true + bodyParameters.parameters[] (JSON string or primitive)
- Set Content-Type explicitly (application/json unless otherwise required)
- Authorization headers use variables only:
  - Perplexity: Authorization: Bearer {{ $vars.PerplexityApi || $env.PerplexityApi }}
  - Anthropic: x-api-key: {{ $vars.anthropicApi || $env.anthropicApi }}, anthropic-version: 2023-06-01
  - fal.ai: Authorization: Key {{ $vars.FalAiApi || $env.FalAiApi }}
  - Runway/Luma/Predis/Klap/Simplified/Blotato/Metricool/Tally/Snov/Apollo/HubSpot/NewsAPI/YouTube/GoogleCustomSearch/ScrapeCreators/SocialSearcher:
    Authorization: Bearer {{ $vars.<Api> || $env.<Api> }}
  - HeyGen: X-Api-Key: {{ $vars.HeyGenApi || $env.HeyGenApi }}
  - Bannerbear/Compositor: Authorization: Bearer {{ $vars.BannerbearApi || $env.BannerbearApi || $vars.CompositorApiKey }}
  - Wassenger: Token: {{ $vars.WassengerApiKey || $env.WassengerApiKey }}

Linter Nodes:
- HeaderPolicy: fail if any node has headerParametersUi
- ForbiddenClaims: block disallowed phrases
- LogoPersist: require ≥95% frames with logo
- NodeCount: require ≥150
- CostGuard: stop by COST_LIMIT_USD_PER_DAY and webhook budget

Modules:
0) Boot & Config
1) Scanner/Cloner & Ideation
2) Asset Forge (Images/3D/Video/Avatars/Watermark)
3) Approval & Distribution
4) Leads & Analytics
5) Guards & Finish

Setup:
1) Copy .env.example to your secure store and set $vars in n8n Cloud or environment.
2) Verify logo source URL or provide binary.logo_rgba via webhook payload.
3) Import workflow.json into n8n Cloud (v1.60+).
4) Update prompts.yaml path in the workflow’s loader node if you host it externally.

Costs:
- Runway Gen-4, Luma DM 1.5, fal.ai (FLUX/Tripo3D), HeyGen, ElevenLabs, Blotato, Predis, Klap, Simplified, Metricool, Tally, Snov, Apollo, HubSpot APIs incur usage costs.
- CostGuard accumulates an estimated total and halts at COST_LIMIT_USD_PER_DAY.

Troubleshooting:
- Linter HeaderPolicy fails → some node still uses headerParametersUi or misses Content-Type.
- LogoPersist fails → watermark compositor missing or logo_url_ready not set.
- NodeCount fails → ensure all modules enabled or feature flags adjusted.
- URL Head Check fails → hosting provider didn’t return a reachable URL; fallback path will trigger or halt.
