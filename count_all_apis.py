#!/usr/bin/env python3
"""
Count all real API integrations in V-OMEGA modules
"""
import json
import re
from pathlib import Path

def count_apis_in_module(module_path):
    """Count real API integrations in a single module"""
    try:
        with open(module_path, 'r') as f:
            data = json.load(f)
        
        real_apis = []
        placeholder_apis = []
        
        for node in data.get('nodes', []):
            if node.get('type') == 'n8n-nodes-base.httpRequest':
                url = node.get('parameters', {}).get('url', '')
                if url:
                    if 'api.example.com' in url:
                        placeholder_apis.append(url)
                    else:
                        real_apis.append(url)
        
        return real_apis, placeholder_apis
    except Exception as e:
        print(f"Error processing {module_path}: {e}")
        return [], []

def categorize_apis(api_urls):
    """Categorize APIs by service provider"""
    categories = {
        'fal.ai': [],
        'anthropic': [],
        'openai': [],
        'elevenlabs': [],
        'heygen': [],
        'perplexity': [],
        'social_media': [],
        'crm_lead_gen': [],
        'analytics': [],
        'other': []
    }
    
    for url in api_urls:
        url_lower = url.lower()
        if 'fal.run/fal-ai' in url_lower:
            categories['fal.ai'].append(url)
        elif 'anthropic.com' in url_lower:
            categories['anthropic'].append(url)
        elif 'openai.com' in url_lower:
            categories['openai'].append(url)
        elif 'elevenlabs.io' in url_lower:
            categories['elevenlabs'].append(url)
        elif 'heygen.com' in url_lower:
            categories['heygen'].append(url)
        elif 'perplexity.ai' in url_lower:
            categories['perplexity'].append(url)
        elif any(x in url_lower for x in ['blotato', 'klap', 'simplified', 'predis', 'metricool', 'telegram']):
            categories['social_media'].append(url)
        elif any(x in url_lower for x in ['apollo.io', 'snov.io', 'hubapi.com', 'wassenger']):
            categories['crm_lead_gen'].append(url)
        elif any(x in url_lower for x in ['analytics', 'tracking', 'newsapi', 'reddit', 'youtube']):
            categories['analytics'].append(url)
        else:
            categories['other'].append(url)
    
    return categories

def main():
    """Main function to count all APIs"""
    module_files = [
        'V_OMEGA_MODULE_1_ALIEN_INTELLIGENCE_REAL_TEMPLATE.json',
        'V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_REAL_TEMPLATE.json',
        'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_TEMPLATE.json',
        'V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_REAL_TEMPLATE.json'
    ]
    
    all_real_apis = []
    all_placeholder_apis = []
    
    print("🔍 V-OMEGA API Integration Analysis")
    print("=" * 50)
    
    for module_file in module_files:
        if Path(module_file).exists():
            real_apis, placeholder_apis = count_apis_in_module(module_file)
            all_real_apis.extend(real_apis)
            all_placeholder_apis.extend(placeholder_apis)
            
            print(f"\n📁 {module_file}")
            print(f"   Real APIs: {len(real_apis)}")
            print(f"   Placeholder APIs: {len(placeholder_apis)}")
            
            for api in real_apis[:3]:
                print(f"   ✅ {api}")
            if len(real_apis) > 3:
                print(f"   ... and {len(real_apis) - 3} more")
        else:
            print(f"\n❌ {module_file} not found")
    
    unique_real_apis = list(set(all_real_apis))
    unique_placeholder_apis = list(set(all_placeholder_apis))
    
    print(f"\n🎯 TOTAL API COUNT SUMMARY")
    print("=" * 50)
    print(f"Real APIs: {len(unique_real_apis)}")
    print(f"Placeholder APIs: {len(unique_placeholder_apis)}")
    print(f"Total API Nodes: {len(unique_real_apis) + len(unique_placeholder_apis)}")
    
    categories = categorize_apis(unique_real_apis)
    
    print(f"\n📊 API BREAKDOWN BY SERVICE")
    print("=" * 50)
    for category, apis in categories.items():
        if apis:
            print(f"{category.upper()}: {len(apis)} APIs")
            for api in apis:
                print(f"  • {api}")
    
    fal_ai_models = []
    for api in categories['fal.ai']:
        model_match = re.search(r'fal-ai/([^/?\s]+)', api)
        if model_match:
            fal_ai_models.append(model_match.group(1))
    
    print(f"\n🎨 FAL.AI MODELS DETECTED: {len(fal_ai_models)}")
    print("=" * 50)
    for model in sorted(set(fal_ai_models)):
        print(f"  • {model}")
    
    return len(unique_real_apis), len(unique_placeholder_apis), categories

if __name__ == "__main__":
    main()
