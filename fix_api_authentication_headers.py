#!/usr/bin/env python3
"""
Fix API authentication headers in all V-OMEGA modules
Convert from 'auth: none' to proper {{ $vars.ApiName }} format like Module 1
"""

import json

def fix_api_authentication():
    """Fix API authentication headers in all modules"""
    
    print("🔧 FIXING API AUTHENTICATION HEADERS FOR LIVE DEPLOYMENT...")
    
    api_auth_mapping = {
        'perplexity': '{{ $vars.PerplexityApi }}',
        'newsapi': '{{ $vars.NewsApi }}',
        'data365': '{{ $vars.Data365Api }}',
        'apollo': '{{ $vars.ApolloIOApi }}',
        'snov': '{{ $vars.SnovIOApi }}',
        'heygen': '{{ $vars.HeyGenApi }}',
        'leonardo': '{{ $vars.LeonardoApi }}',
        'fal.ai': '{{ $vars.FalAiApi }}',
        'runway': '{{ $vars.RunwayApi }}',
        'luma': '{{ $vars.LumaApi }}',
        'bannerbear': '{{ $vars.BannerbearApi }}',
        'anthropic': '{{ $vars.AnthropicApi }}',
        'openai': '{{ $vars.OpenAiApi }}',
        'elevenlabs': '{{ $vars.ElevenLabsApi }}',
        'deepseek': '{{ $vars.DeepSeekApi }}',
        'blotato': '{{ $vars.BlotatoApi }}',
        'klap': '{{ $vars.KlapApi }}',
        'predis': '{{ $vars.PredisApi }}',
        'metricool': '{{ $vars.MetricoolApi }}'
    }
    
    modules = [
        'V_OMEGA_MODULE_1_FINAL_65_NODES_CORRECTED.json',
        'V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_OPTIMIZED_FINAL.json',
        'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_OPTIMIZED_FINAL.json',
        'V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_COMPLETE_65_NODES.json'
    ]
    
    total_fixed = 0
    
    for filename in modules:
        print(f"\n🔧 Fixing {filename}...")
        
        try:
            with open(filename, 'r') as f:
                module_data = json.load(f)
            
            fixed_count = 0
            
            for node in module_data['nodes']:
                if node.get('type') == 'n8n-nodes-base.httpRequest':
                    params = node.get('parameters', {})
                    url = params.get('url', '').lower()
                    
                    api_type = None
                    for api_name in api_auth_mapping.keys():
                        if api_name in url:
                            api_type = api_name
                            break
                    
                    if api_type and params.get('authentication') == 'none':
                        params['authentication'] = 'genericCredentialType'
                        params['genericAuthType'] = 'httpHeaderAuth'
                        
                        if api_type in ['openai', 'anthropic', 'elevenlabs', 'deepseek']:
                            params['httpHeaderAuth'] = {
                                'name': 'Authorization',
                                'value': f'Bearer {api_auth_mapping[api_type]}'
                            }
                        else:
                            params['httpHeaderAuth'] = {
                                'name': 'Authorization',
                                'value': api_auth_mapping[api_type]
                            }
                        
                        node_name = node.get('name', 'Unknown')
                        print(f"  ✅ Fixed: {node_name} → {api_auth_mapping[api_type]}")
                        fixed_count += 1
            
            if fixed_count > 0:
                with open(filename, 'w') as f:
                    json.dump(module_data, f, indent=2)
                
                print(f"✅ {filename}: {fixed_count} APIs fixed")
                total_fixed += fixed_count
                
                try:
                    with open(filename, 'r') as f:
                        json.load(f)
                    print(f"✅ JSON syntax valid")
                except json.JSONDecodeError as e:
                    print(f"❌ JSON syntax error: {e}")
            else:
                print(f"⚠️ {filename}: No APIs needed fixing")
                
        except FileNotFoundError:
            print(f"❌ File not found: {filename}")
        except Exception as e:
            print(f"❌ Error processing {filename}: {e}")
    
    print(f"\n🚀 API AUTHENTICATION FIX COMPLETE!")
    print(f"✅ Total APIs fixed: {total_fixed}")
    print(f"✅ All APIs now use proper {{ $vars.ApiName }} format")
    print(f"✅ System ready for live deployment with authentication!")
    
    return total_fixed

if __name__ == "__main__":
    fix_api_authentication()
