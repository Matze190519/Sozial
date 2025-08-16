# 🧪 LR VIRAL CONTENT PIPELINE - TEST SUITE

## Test Categories

### 1. Dry Run Tests (No API Calls)
### 2. Minimal Tests (Essential APIs Only)  
### 3. Full Tests (Complete Pipeline)
### 4. Edge Cases & Error Handling
### 5. Performance & KPI Validation

---

## 1. 🏃 DRY RUN TESTS

### Test 1.1: Workflow Structure Validation
```bash
# Objective: Verify workflow.json structure and connections
# Expected: All 150+ nodes connected, no orphans

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{"test_mode": "dry_run", "validate_structure": true}'

# Success Criteria:
✅ Node count: 150-190
✅ All nodes connected (no orphans)
✅ Proper n8n Cloud format
✅ No headerParametersUi usage
```

### Test 1.2: Environment Variables Check
```bash
# Objective: Validate all required API keys and configs
# Expected: Complete environment setup

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{"test_mode": "dry_run", "check_env": true}'

# Success Criteria:
✅ All 70+ API keys present
✅ Brand configuration complete
✅ Logo URL accessible
✅ Sheet IDs valid
✅ Approval settings configured
```

### Test 1.3: Header Policy Compliance
```bash
# Objective: Ensure all HTTP nodes use Cloud-compliant headers
# Expected: No deprecated header formats

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{"test_mode": "dry_run", "lint_headers": true}'

# Success Criteria:
✅ HeaderPolicy Linter passes
✅ All HTTP nodes use headerParameters.parameters[]
✅ No credentials blocks
✅ Proper Content-Type headers
```

---

## 2. 🔬 MINIMAL TESTS

### Test 2.1: Core AI Pipeline
```bash
# Objective: Test essential AI components only
# APIs: Perplexity + Claude + FLUX (1 image)

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "minimal",
    "max_images": 1,
    "max_videos": 0,
    "skip_distribution": true,
    "skip_avatars": true
  }'

# Success Criteria:
✅ Perplexity trends retrieved
✅ Claude ideation successful
✅ FLUX image generated
✅ Viral score calculated
✅ Cost under $0.25
```

### Test 2.2: Logo & Watermark System
```bash
# Objective: Verify logo pipeline and watermarking
# APIs: RemoveBG + Bannerbear

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "minimal",
    "test_logo_only": true,
    "logo_url_override": "https://example.com/test-logo.png"
  }'

# Success Criteria:
✅ Logo fetched successfully
✅ Background removed
✅ Logo hosted and accessible
✅ Watermark template ready
✅ Etched-glass effect applied
```

### Test 2.3: Approval Flow
```bash
# Objective: Test WhatsApp + Telegram approval system
# APIs: Wassenger + Telegram

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "minimal",
    "test_approval_only": true,
    "auto_approve": false
  }'

# Success Criteria:
✅ WhatsApp preview sent
✅ Telegram preview sent
✅ Approval buttons functional
✅ Timeout handling works
✅ Decision routing correct
```

---

## 3. 🚀 FULL TESTS

### Test 3.1: Complete Animal Lane
```bash
# Objective: Full Animal Lane (Lion) pipeline
# APIs: All core + Runway + HeyGen + ElevenLabs

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "full",
    "enable_animal_lane": true,
    "enable_portal_lane": false,
    "max_videos": 1,
    "auto_approve": true
  }'

# Success Criteria:
✅ Lion cameo video generated (Runway Gen-4)
✅ Impossible moment in first 2s
✅ Logo watermark persistent (≥95% frames)
✅ ASMR audio track (-20 LUFS)
✅ QC gates passed
✅ Distribution successful
```

### Test 3.2: Complete Portal Lane
```bash
# Objective: Full Portal/Hologram pipeline
# APIs: All core + Luma + Tripo3D + WebAR

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "full",
    "enable_animal_lane": false,
    "enable_portal_lane": true,
    "enable_webxr": true,
    "auto_approve": true
  }'

# Success Criteria:
✅ Crystal portal video (Luma Dream Machine)
✅ 3D model generated (Tripo3D)
✅ WebAR QR code functional
✅ Volumetric lighting consistent
✅ Portal edge stability verified
```

### Test 3.3: Avatar Dialogue System
```bash
# Objective: Full avatar system with dialogues
# APIs: HeyGen + ElevenLabs + Lip-sync

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "full",
    "test_avatars_only": true,
    "dialogue_type": "lina_mathias_60s",
    "voice_quality": "hyperreal"
  }'

# Success Criteria:
✅ Lina avatar generated (HeyGen Avatar IV)
✅ Mathias avatar generated
✅ Dialogue lip-sync accurate (<80ms)
✅ Voice quality hyperreal
✅ Background swap functional
✅ Motion studio effects applied
```

### Test 3.4: Distribution Quartet
```bash
# Objective: Test all 4 distribution platforms
# APIs: Blotato + Predis + Klap + Simplified

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "full",
    "test_distribution_only": true,
    "platforms": ["instagram", "facebook", "linkedin", "tiktok"],
    "schedule_delay_minutes": 5
  }'

# Success Criteria:
✅ Blotato multi-posting successful
✅ Predis captions generated
✅ Klap reframes created (5 clips)
✅ Simplified overlays applied
✅ All platforms scheduled
✅ Hashtag strategy implemented
```

---

## 4. ⚠️ EDGE CASES & ERROR HANDLING

### Test 4.1: API Failures & Fallbacks
```bash
# Objective: Test resilience with API failures
# Scenario: Simulate Runway failure → Luma fallback

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "edge_case",
    "simulate_failures": ["runway"],
    "enable_fallbacks": true
  }'

# Success Criteria:
✅ Runway failure detected
✅ Luma fallback triggered
✅ Video still generated
✅ Quality maintained
✅ Cost tracking accurate
```

### Test 4.2: Low Viral Score Handling
```bash
# Objective: Test behavior with low viral scores
# Scenario: Viral score below threshold

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "edge_case",
    "force_low_viral_score": 50,
    "viral_threshold": 75
  }'

# Success Criteria:
✅ Low score detected
✅ Pipeline halted at gate
✅ No resources wasted
✅ Proper error message
✅ Retry mechanism available
```

### Test 4.3: Cost Limit Exceeded
```bash
# Objective: Test cost guard functionality
# Scenario: Daily cost limit reached

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "edge_case",
    "simulate_high_cost": 150,
    "daily_limit": 100
  }'

# Success Criteria:
✅ Cost limit detected
✅ Pipeline stopped
✅ Alert sent to admin
✅ Remaining budget preserved
✅ Next day reset functional
```

### Test 4.4: Compliance Violations
```bash
# Objective: Test forbidden claims detection
# Scenario: Content with prohibited phrases

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "edge_case",
    "inject_forbidden_claims": ["garantiert reich", "100% sicher"],
    "strict_compliance": true
  }'

# Success Criteria:
✅ Forbidden claims detected
✅ Content blocked
✅ Violation logged
✅ Alternative content suggested
✅ Disclaimers added
```

---

## 5. 📊 PERFORMANCE & KPI VALIDATION

### Test 5.1: Speed Benchmarks
```bash
# Objective: Measure pipeline execution times
# Target: Complete run under 15 minutes

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "performance",
    "benchmark": true,
    "parallel_execution": true
  }'

# Success Criteria:
✅ Total time < 15 minutes
✅ Trend scanning < 2 minutes
✅ Asset generation < 8 minutes
✅ Distribution < 3 minutes
✅ QC & packaging < 2 minutes
```

### Test 5.2: Viral Score Accuracy
```bash
# Objective: Validate viral score predictions
# Method: Compare with actual performance

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "performance",
    "validate_viral_scores": true,
    "historical_data": true
  }'

# Success Criteria:
✅ Score accuracy >80%
✅ High scores (>90) = viral content
✅ Low scores (<70) = poor performance
✅ Correlation with engagement
✅ Predictive value confirmed
```

### Test 5.3: Resource Utilization
```bash
# Objective: Monitor system resource usage
# Target: Efficient API usage and cost control

curl -X POST /webhook/lr-run \
  -H "Content-Type: application/json" \
  -d '{
    "test_mode": "performance",
    "monitor_resources": true,
    "optimize_calls": true
  }'

# Success Criteria:
✅ API calls minimized
✅ Parallel execution optimized
✅ Memory usage stable
✅ No unnecessary retries
✅ Cost per run <$5
```

### Test 5.4: Quality Consistency
```bash
# Objective: Ensure consistent output quality
# Method: Run 10 consecutive tests

for i in {1..10}; do
  curl -X POST /webhook/lr-run \
    -H "Content-Type: application/json" \
    -d '{
      "test_mode": "performance",
      "consistency_test": '$i',
      "quality_metrics": true
    }'
done

# Success Criteria:
✅ All QC gates pass consistently
✅ Visual quality stable
✅ Audio quality consistent
✅ Watermark always present
✅ Compliance always maintained
```

---

## 🎯 KPI TARGETS

### Viral Performance
- **Views**: 1B+ baseline target
- **Engagement Rate**: >5% average
- **Share Rate**: >2% (viral threshold)
- **Completion Rate**: >80%
- **Click-through Rate**: >3%

### Technical Performance
- **Pipeline Success Rate**: >95%
- **API Uptime**: >99%
- **Quality Gate Pass Rate**: >98%
- **Cost per Viral Hit**: <$50
- **Time to Market**: <15 minutes

### Content Quality
- **Visual Quality Score**: >8.5/10
- **Audio Quality Score**: >8.0/10
- **Brand Compliance**: 100%
- **Logo Visibility**: >95% frames
- **Watermark Persistence**: >95%

---

## 🚨 CRITICAL TEST SCENARIOS

### Scenario A: Viral Breakthrough
```bash
# Test system under viral load (1M+ views/hour)
# Verify: Scaling, cost control, quality maintenance
```

### Scenario B: API Cascade Failure
```bash
# Test with multiple API failures simultaneously
# Verify: Graceful degradation, fallback chains
```

### Scenario C: Compliance Crisis
```bash
# Test with regulatory content challenges
# Verify: Immediate blocking, legal protection
```

### Scenario D: Competitor Response
```bash
# Test with similar content flooding market
# Verify: Differentiation, trend adaptation
```

---

## 📋 TEST EXECUTION CHECKLIST

### Pre-Test Setup
- [ ] All API keys configured
- [ ] Test environment isolated
- [ ] Backup systems ready
- [ ] Monitoring enabled
- [ ] Cost limits set

### During Testing
- [ ] Real-time monitoring active
- [ ] Error logs captured
- [ ] Performance metrics recorded
- [ ] Quality samples saved
- [ ] Cost tracking enabled

### Post-Test Analysis
- [ ] Results documented
- [ ] Issues identified
- [ ] Performance analyzed
- [ ] Recommendations made
- [ ] Next steps planned

---

## 🔧 DEBUGGING COMMANDS

### Check Node Connections
```bash
# Verify all nodes are properly connected
grep -c "connections" workflow.json
```

### Validate API Keys
```bash
# Test API connectivity
curl -H "Authorization: Bearer $anthropicApi" https://api.anthropic.com/v1/messages
```

### Monitor Costs
```bash
# Real-time cost tracking
curl -X GET /webhook/lr-run/costs
```

### Quality Inspection
```bash
# Download and inspect generated content
curl -X GET /webhook/lr-run/latest/assets
```

---

**Test Suite Version**: 1.0.0  
**Last Updated**: August 16, 2025  
**Compatibility**: n8n Cloud 1.60+

*"Testing is not about finding bugs, it's about ensuring viral success at scale."*
