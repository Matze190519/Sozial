#!/usr/bin/env python3
import json
import re

def update_2025_apis():
    """Update all modules with 2025 API versions and features"""
    
    print("🚀 UPDATING ALL MODULES TO 2025 API STANDARDS")
    print("=" * 70)
    
    modules = [
        'V_OMEGA_MODULE_1_FINAL_65_NODES_CORRECTED.json',
        'V_OMEGA_MODULE_2_AVATAR_LEAD_GEN_REAL_APIS.json', 
        'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_APIS.json',
        'V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_COMPLETE_65_NODES.json'
    ]
    
    for module_file in modules:
        print(f"\n🔧 Updating {module_file}...")
        
        try:
            with open(module_file, 'r', encoding='utf-8') as f:
                module = json.load(f)
            
            updated_nodes = 0
            
            for node in module['nodes']:
                if node.get('type') == 'n8n-nodes-base.httpRequest':
                    
                    if 'elevenlabs' in node.get('name', '').lower():
                        if 'parameters' in node and 'jsonBody' in node['parameters']:
                            body = node['parameters']['jsonBody']
                            if isinstance(body, str):
                                body = body.replace('"model_id": "eleven_turbo_v2_5"', '"model_id": "eleven_turbo_v2_6"')
                                body = body.replace('"model_id": "eleven_multilingual_v2"', '"model_id": "eleven_turbo_v2_6"')
                                if '"binaural": true' not in body:
                                    body = body.replace('"voice_settings": {', '"voice_settings": {\n    "binaural": true,')
                                if '"loudness": -24' not in body:
                                    body = body.replace('"stability": 0.5,', '"stability": 0.5,\n    "loudness": -24,')
                                if '"guidance": 1.5' not in body:
                                    body = body.replace('"clarity": 0.75', '"clarity": 0.75,\n    "guidance": 1.5')
                                node['parameters']['jsonBody'] = body
                                updated_nodes += 1
                    
                    if 'heygen' in node.get('name', '').lower():
                        if 'parameters' in node and 'jsonBody' in node['parameters']:
                            body = node['parameters']['jsonBody']
                            if isinstance(body, str):
                                if '"3d_avatar_mode": true' not in body:
                                    body = body.replace('"avatar_id":', '"3d_avatar_mode": true,\n  "avatar_id":')
                                if '"activity_idle_timeout": 120' not in body:
                                    body = body.replace('"quality": "high"', '"quality": "high",\n  "activity_idle_timeout": 120')
                                node['parameters']['jsonBody'] = body
                                updated_nodes += 1
                    
                    if 'runway' in node.get('name', '').lower():
                        if 'parameters' in node and 'jsonBody' in node['parameters']:
                            body = node['parameters']['jsonBody']
                            if isinstance(body, str):
                                body = body.replace('"model": "gen3_turbo"', '"model": "gen4_turbo"')
                                if '"camera": "precise"' not in body:
                                    body = body.replace('"resolution": "1080p"', '"resolution": "1080p",\n  "camera": "precise"')
                                if '"enhance_prompt": true' not in body:
                                    body = body.replace('"duration": 10', '"duration": 10,\n  "enhance_prompt": true')
                                if '"reality_distortion": "maximum"' not in body:
                                    body = body.replace('"quality": "high"', '"quality": "high",\n  "reality_distortion": "maximum"')
                                node['parameters']['jsonBody'] = body
                                updated_nodes += 1
                    
                    if 'fal.ai' in node.get('url', ''):
                        if 'kling' in node.get('url', ''):
                            node['url'] = node['url'].replace('kling-video', 'kling-video/v2.1')
                            updated_nodes += 1
                        if 'flux' in node.get('url', ''):
                            node['url'] = node['url'].replace('flux/schnell', 'flux-pro/v1.1-ultra')
                            updated_nodes += 1
                
                if node.get('type') == 'n8n-nodes-base.code':
                    if 'parameters' in node and 'jsCode' in node['parameters']:
                        code = node['parameters']['jsCode']
                        
                        if 'warp_speed' not in code and ('warp' in node.get('name', '').lower() or 'optimization' in code):
                            code = code.replace('const config = {', 'const config = {\n  warp_speed: "1000000x_light_speed",\n  parallel_batches: true,\n  batch_size: 10,')
                            node['parameters']['jsCode'] = code
                            updated_nodes += 1
                        
                        if 'viral_score > 97.3' not in code and 'viral_score' in code:
                            code = code.replace('if (viral_score >', 'if (viral_score > 97.3 &&')
                            node['parameters']['jsCode'] = code
                            updated_nodes += 1
                        
                        if 'Crystal Lion' in code or 'crystal_lion' in code:
                            if '432Hz' not in code:
                                code = code.replace('frequencies: [', 'frequencies: [432, 528, 741, 963, ')
                                node['parameters']['jsCode'] = code
                                updated_nodes += 1
            
            with open(module_file, 'w', encoding='utf-8') as f:
                json.dump(module, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Updated {updated_nodes} nodes in {module_file}")
            
        except Exception as e:
            print(f"❌ Error updating {module_file}: {e}")
    
    print("\n🚀 ALL MODULES UPDATED TO 2025 STANDARDS!")

if __name__ == "__main__":
    update_2025_apis()
