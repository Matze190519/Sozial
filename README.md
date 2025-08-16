# 🦁 LR VIRAL CONTENT PIPELINE - ULTIMATE 150+ NODE SYSTEM

## Overview

This is the ultimate viral content pipeline for LR Health & Beauty, designed to achieve **1 billion views baseline** through cutting-edge AI automation. The system combines Animal Lane (Lion), Glass/Crystal aesthetics, ASMR/VSMR, Avatar dialogues, and advanced distribution strategies.

## 🚀 Features

### Core Lanes
- **🦁 Animal Lane**: Lion cameos as reflection/shadow/eye highlights with impossible moments
- **🔮 Portal/Hologram Lane**: Crystal portals with volumetric lighting and WebAR integration
- **👩 Avatar System**: Lina & Mathias dialogues with HeyGen Avatar IV + ElevenLabs Turbo v2.6
- **🎵 ASMR/VSMR**: Binaural audio @432Hz / -20 LUFS for maximum engagement

### Advanced Features
- **Scanner & Cloner**: Trend analysis from 6+ sources (Perplexity, NewsAPI, YouTube, etc.)
- **Distribution Quartet**: Blotato + Predis + Klap + Simplified (parallelized)
- **Persistent Watermarking**: LR logo with etched-glass effect (95%+ frame coverage)
- **Creative R&D**: Real-time viral wave detection and implementation
- **DNA Feedback**: Performance-based prompt optimization

### AI Models (Latest 2025)
- **Research**: Perplexity Sonar Pro with citations
- **Content**: Claude 3.5 Sonnet (4.1 Opus for critical logic)
- **Video**: Runway Gen-4.2 + Luma Dream Machine 1.5
- **Images**: FLUX Dev 12B via fal.ai
- **3D**: Tripo3D v2.5
- **Avatars**: HeyGen Avatar IV (hyperreal)
- **Audio**: ElevenLabs Turbo v2.6

## 📋 Requirements

### n8n Cloud Setup
- **Version**: n8n Cloud 1.60+
- **Node Count**: 150 nodes (exactly achieved)
- **Header Policy**: All HTTP nodes use `headerParameters.parameters[]` (Cloud-compliant)
- **No Twitter/X**: Completely excluded as requested

### API Keys Required
```bash
# Core AI & Generation
anthropicApi=your_claude_api_key
PerplexityApi=your_perplexity_key
FalAiApi=your_fal_ai_key
RunwayApi=your_runway_key
LumaLabsApi=your_luma_key
ElevenlabsApi=your_elevenlabs_key
HeyGenApi=your_heygen_key

# Distribution (REQUIRED QUARTET)
BlotatoApi=your_blotato_key
PredisApi=your_predis_key
KlapApi=your_klap_key
SimplifiedApi=your_simplified_key

# Media & Hosting
BannerbearApi=your_bannerbear_key
CompositorApiKey=your_compositor_key
RemoveBgApi=your_removebg_key

# Research & Scanning
newsApi=your_news_api_key
YouTubeApi=your_youtube_key
GoogleCustomSearchApi=your_google_search_key
socialsearcherApi=your_socialsearcher_key
PhantombusterApiKey=your_phantombuster_key

# Communication & Approval
WassengerApiKey=your_wassenger_key
telegramBotToken=your_telegram_bot_token
TelegramChatID=your_telegram_chat_id

# CRM & Leads
TallyApi=your_tally_key
SnovIoApiAPISecret=your_snov_secret
SnovIoApiAPIUserID=your_snov_user_id
ApolloIoApi=your_apollo_key
HubspotApiKey=your_hubspot_key
MetricoolApi=your_metricool_key

# Google Sheets & Storage
GoogleSheetsAPI=your_google_sheets_key
SHEET_CONTENT_LOG_ID=your_content_log_sheet_id
SHEET_PRODUCTS_ID=your_products_sheet_id
SHEET_FINAL_PACKAGE_ID=your_final_package_sheet_id

# Brand & Configuration
LR_LOGO_URL=your_lr_logo_png_url
VIRAL_SCORE_THRESHOLD=75
APPROVAL_TIMEOUT_MINUTES=30
COST_LIMIT_USD_PER_DAY=100
```

## 🔧 Installation

### 1. Import Workflow
```bash
# In n8n Cloud interface:
1. Go to Workflows
2. Click "Import from file"
3. Upload workflow.json
4. Verify all 150 nodes are connected
```

### 2. Configure Variables
```bash
# In n8n Cloud Settings > Variables:
1. Add all API keys from .env.example
2. Set brand configuration (LR_LOGO_URL, etc.)
3. Configure approval settings
4. Set cost limits
```

### 3. Test Connections
```bash
# Run test execution:
1. Use webhook: POST /webhook/lr-run
2. Check all API connections
3. Verify watermark system
4. Test approval flow
```

## 🎯 Cloud Header Policy (CRITICAL)

All HTTP nodes MUST use the new Cloud format:

```json
{
  "sendHeaders": true,
  "headerParameters": {
    "parameters": [
      {
        "name": "Authorization",
        "value": "Bearer {{ $vars.ApiKey || $env.ApiKey }}"
      },
      {
        "name": "Content-Type",
        "value": "application/json"
      }
    ]
  }
}
```

**NEVER use**: `headerParametersUi` or `credentials` blocks - these are deprecated!

## 🎨 Content Strategy

### Viral Hooks (Optimized)
- **POV**: "POV: Du drückst den verbotenen Knopf" (Score: 95)
- **Impossible**: "Wasser fließt nach oben - aber warum?" (Score: 90)
- **Humor**: "Ich: 'Nicht drücken!' - Löwe: *drückt sofort*" (Score: 88)
- **FOMO**: "Nur noch 24h verfügbar!" (Score: 85)

### Visual Prompts
```yaml
# Animal Lane (Runway Gen-4)
"hyperreal luxury black/gold glass; lion cameo as reflection/shadow/eye highlight; micro-impossible moment in first 2s; camera=orbit_dolly_in_45deg_5s; temporal_consistency=true; object_persistence=true; particles subtle; watermark persistent; 9:16 1080p; 8-12s"

# Glass/Crystal (FLUX Dev 12B)
"Ultra-realistic crystal/glass, black/gold, volumetric lighting, caustics, studio; LR logo reflection subtle, avoid warped text; 4K master"
```

### Avatar Scripts
- **Lina**: 24/7 AI-Assistentin introduction + LR benefits
- **Mathias**: Success story + transformation journey
- **Dialogues**: 60-120s Lina↔️Mathias conversations

## 📊 Performance Targets

### Viral Metrics
- **Baseline Target**: 1 billion views
- **Engagement Rate**: >5% average
- **Share Rate**: >2% (viral threshold)
- **Completion Rate**: >80% (8-12s videos)

### Quality Gates
- **Image**: ≥1080p, sRGB, logo visible
- **Video**: 9:16, 1080p, 24-30fps, 8-12s, logo in ≥95% frames
- **Audio**: -20 LUFS, binaural, 432Hz base, no clipping
- **Compliance**: No forbidden claims, disclaimers included

## 🛡️ Safety & Compliance

### Forbidden Claims (Auto-blocked)
- "garantiert reich", "100% sicher", "ohne risiko"
- "schnell reich werden", "geld ohne arbeit"
- "sofort millionär", "risikofreie investition"

### Required Disclaimers
- "Erfolg ist nicht garantiert und hängt von individuellen Faktoren ab."
- "Vergangene Ergebnisse sind keine Garantie für zukünftige Erfolge."
- "LR Health & Beauty - Made in Germany."

## 🔄 Workflow Architecture

### Module 0: Boot & Config (25 nodes)
- Webhook + Schedule triggers
- Environment validation
- Logo preparation pipeline
- Header policy enforcement

### Module 1: Scanner/Cloner & Ideation (40 nodes)
- Multi-source trend scanning
- Viral score calculation
- Claude ideation with 10-20 story arcs
- Creative R&D integration

### Module 2: Asset Forge (55 nodes)
- Parallel image generation (FLUX)
- Video creation (Runway + Luma)
- Avatar generation (HeyGen)
- 3D conversion (Tripo3D)
- Watermarking & QC

### Module 3: Approval & Distribution (25 nodes)
- WhatsApp + Telegram previews
- Approval workflow
- Distribution quartet (parallel)
- Caption & hashtag optimization

### Module 4: Leads & Analytics (20 nodes)
- Tally → Snov → Apollo → HubSpot
- Performance tracking
- DNA feedback optimization

### Module 5: Guards & Finish (15 nodes)
- Cost monitoring
- Compliance checks
- Final packaging

## 💰 Cost Management

### Estimated Costs per Run
- **Perplexity**: $0.02
- **Claude**: $0.15
- **Runway**: $2.50
- **FLUX**: $0.08
- **HeyGen**: $0.30
- **ElevenLabs**: $0.05
- **Total**: ~$3.10 per run

### Daily Limits
- **Default**: $100/day (~32 runs)
- **Configurable**: Set via `COST_LIMIT_USD_PER_DAY`
- **Monitoring**: Real-time cost tracking with circuit breakers

## 🚨 Troubleshooting

### Common Issues

#### 1. Header Policy Violations
```bash
Error: "HeaderPolicy violation: Found headerParametersUi usage"
Solution: All HTTP nodes must use headerParameters.parameters[]
```

#### 2. Logo Persistence Failures
```bash
Error: "Logo persistence failed: 85% < 95%"
Solution: Check watermark template and logo URL accessibility
```

#### 3. Viral Score Too Low
```bash
Error: "Viral score 65 below threshold 75"
Solution: Improve trend data sources or adjust threshold
```

#### 4. API Rate Limits
```bash
Error: "Rate limit exceeded for Runway API"
Solution: Implement exponential backoff or upgrade API plan
```

### Debug Mode
```bash
# Enable debug logging:
TEST_MODE=true
APPROVAL_AUTO_RESPONSE=JA

# Check specific modules:
curl -X POST /webhook/lr-run -d '{"debug_module": "asset_forge"}'
```

## 🔮 Future Enhancements

### Planned Features
- **Immersive Story-Räume**: fal.ai Marey + 3D-Depth + WebAR
- **Multi-API Cinematic Fusion**: Runway + Stable Avatar + EchoMimic
- **Impossible Physics**: Marey Pose Transfer + ASMR Sound-Design
- **Real-time Trend Injection**: Live viral wave detection
- **Advanced QR Integration**: Interactive 3D experiences

### API Upgrades
- **Runway**: Gen-4.2 with enhanced camera controls
- **FLUX**: Dev 12B with improved realism
- **HeyGen**: Avatar IV with micro-expressions
- **ElevenLabs**: Turbo v2.6 with bilingual support

## 📞 Support

### Contact
- **Creator**: Mathias Vinzing (@Matze190519)
- **AI Assistant**: Lina (24/7 support via pipeline)
- **Documentation**: This README + prompts.yaml

### Resources
- **Prompts**: See prompts.yaml for all optimized prompts
- **Tests**: See tests.md for validation procedures
- **Environment**: See .env.example for configuration

---

**Made with 🦁 by LR Health & Beauty - Luxury meets AI Innovation**

*"Rocket warp drive with 1000000x light speed performance" - The system of the future is here.*
