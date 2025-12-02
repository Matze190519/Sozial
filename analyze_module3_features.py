#!/usr/bin/env python3
"""
Analyze Module 3 to confirm all sophisticated features are preserved
"""

import json

def analyze_module3_features():
    """Analyze Module 3 to verify all features are preserved"""
    
    print("🔍 ANALYZING MODULE 3 FEATURE PRESERVATION...")
    
    with open('V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_OPTIMIZED_FINAL.json', 'r') as f:
        m3 = json.load(f)
    
    print(f"📊 Total Nodes in Module 3: {len(m3['nodes'])}")
    
    m3_str = json.dumps(m3, indent=2)
    
    features = {
        '🦁 Crystal Animals': ['crystal', 'lion', 'löwe', 'animals', 'crystal_lion'],
        '🔮 Glass Pipeline': ['glass', 'transformation', 'pipeline', 'glass_dna', 'glas'],
        '🎨 fal.ai Tools': ['fal.ai', 'flux', 'pro', 'blackforestflux'],
        '🌟 3D Features': ['3d', 'hologram', 'portal', 'tripo3d', 'begehbare'],
        '🎭 Leonardo AI': ['leonardo', 'phoenix', 'hyperrealistic'],
        '🎵 VSMR/ASMR': ['vsmr', 'asmr', '432hz', 'frequency'],
        '🚗 Traumwagen': ['traumwagen', '99€', 'traumauto'],
        '🚀 Viral Features': ['viral', 'wow', 'alien', 'galaxy', 'galactic'],
        '✨ Consciousness': ['consciousness', 'expansion', 'quantum', 'portal'],
        '🎬 Video Generation': ['video', 'motion', 'animation', 'runway']
    }
    
    print("\n=== 🔍 SOPHISTICATED FEATURE PRESERVATION CHECK ===")
    
    total_feature_mentions = 0
    
    for feature_name, keywords in features.items():
        feature_mentions = 0
        keyword_details = []
        
        for keyword in keywords:
            count = m3_str.lower().count(keyword.lower())
            if count > 0:
                keyword_details.append(f"{keyword}: {count}")
                feature_mentions += count
        
        total_feature_mentions += feature_mentions
        
        status = "✅ PRESERVED" if feature_mentions > 0 else "❌ MISSING"
        print(f"{feature_name}: {feature_mentions} mentions - {status}")
        
        if keyword_details:
            for detail in keyword_details[:3]:  # Show top 3
                print(f"  └─ {detail}")
    
    print(f"\n📈 TOTAL SOPHISTICATED FEATURES: {total_feature_mentions} mentions")
    
    http_nodes = [node for node in m3['nodes'] if node.get('type') == 'n8n-nodes-base.httpRequest']
    print(f"\n=== 🌐 HTTP API INTEGRATIONS ===")
    print(f"Total API Calls: {len(http_nodes)}")
    
    api_details = []
    for node in http_nodes:
        name = node.get('name', 'Unknown')
        url = ''
        if 'parameters' in node and 'url' in node['parameters']:
            url = node['parameters']['url']
            if 'leonardo' in url.lower():
                api_details.append(f"🎨 {name}: Leonardo AI")
            elif 'fal.ai' in url.lower():
                api_details.append(f"🔮 {name}: fal.ai")
            elif 'tripo3d' in url.lower():
                api_details.append(f"🌟 {name}: Tripo3D")
            else:
                api_details.append(f"🌐 {name}: {url}")
    
    for detail in api_details:
        print(f"  └─ {detail}")
    
    code_nodes = [node for node in m3['nodes'] if node.get('type') == 'n8n-nodes-base.code']
    print(f"\n=== 💎 SOPHISTICATED PROMPTS ===")
    print(f"Code Processing Nodes: {len(code_nodes)}")
    
    sophisticated_prompts = 0
    for node in code_nodes:
        if 'parameters' in node and 'jsCode' in node['parameters']:
            code = node['parameters']['jsCode']
            if len(code) > 300:  # Sophisticated prompts are longer
                sophisticated_prompts += 1
    
    print(f"Sophisticated Prompts (>300 chars): {sophisticated_prompts}")
    
    print(f"\n=== 🎯 QUALITY ASSESSMENT ===")
    
    if total_feature_mentions > 50:
        quality_status = "🚀 ALIEN-LEVEL QUALITY PRESERVED"
    elif total_feature_mentions > 20:
        quality_status = "✅ HIGH QUALITY MAINTAINED"
    else:
        quality_status = "⚠️ QUALITY CONCERNS"
    
    print(f"Feature Density: {total_feature_mentions} mentions across {len(m3['nodes'])} nodes")
    print(f"Quality Status: {quality_status}")
    
    if len(http_nodes) >= 2 and sophisticated_prompts >= 10:
        print("✅ MODULE 3 READY FOR GALACTIC DOMINATION!")
    else:
        print("⚠️ Module may need enhancement")
    
    return {
        'total_nodes': len(m3['nodes']),
        'total_features': total_feature_mentions,
        'api_calls': len(http_nodes),
        'sophisticated_prompts': sophisticated_prompts
    }

if __name__ == "__main__":
    analyze_module3_features()
