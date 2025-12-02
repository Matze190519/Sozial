#!/usr/bin/env python3
"""
Fix V-OMEGA modules: Convert ID-based connections to NAME-based connections
and restore missing API nodes with proper authentication headers
"""

import json
import uuid

def fix_v_omega_modules():
    """Fix all 4 V-OMEGA modules with proper connections and API configurations"""
    
    with open('V_OMEGA_MODULE_1_FINAL_65_NODES_CORRECTED.json', 'r') as f:
        template = json.load(f)
    
    modules_to_fix = [
        'V_OMEGA_MODULE_1_ALIEN_INTELLIGENCE_REAL_HONEST.json',
        'V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_REAL_HONEST.json', 
        'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_HONEST.json',
        'V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_REAL_HONEST.json'
    ]
    
    print('🔧 FIXING V-OMEGA MODULE CONNECTIONS AND APIS:')
    print('=' * 60)
    
    template_api_nodes = [node for node in template.get('nodes', []) if node.get('type') == 'n8n-nodes-base.httpRequest']
    print(f'📊 Template has {len(template_api_nodes)} API nodes')
    
    for module_file in modules_to_fix:
        print(f'\n🔧 Fixing {module_file}...')
        
        try:
            with open(module_file, 'r') as f:
                module_data = json.load(f)
            
            nodes = module_data.get('nodes', [])
            connections = module_data.get('connections', {})
            
            print(f'  📊 Current: {len(nodes)} nodes, {len(connections)} connections')
            
            fixed_connections = {}
            node_id_to_name = {node['id']: node['name'] for node in nodes}
            
            for source_id, targets in connections.items():
                source_name = node_id_to_name.get(source_id, source_id)
                
                fixed_targets = {"main": []}
                for target_list in targets.get("main", []):
                    fixed_target_list = []
                    for target in target_list:
                        target_node_id = target.get("node")
                        target_node_name = node_id_to_name.get(target_node_id, target_node_id)
                        fixed_target_list.append({
                            "node": target_node_name,
                            "type": target.get("type", "main"),
                            "index": target.get("index", 0)
                        })
                    fixed_targets["main"].append(fixed_target_list)
                
                fixed_connections[source_name] = fixed_targets
            
            module_data['connections'] = fixed_connections
            print(f'  ✅ Fixed connections to use node names')
            
            current_api_nodes = [node for node in nodes if node.get('type') == 'n8n-nodes-base.httpRequest']
            print(f'  📊 Current API nodes: {len(current_api_nodes)}')
            
            missing_apis = [
                {
                    "name": "🚀 ZylaLabs WARP Trends",
                    "url": "https://api.zylalabs.com/api/2859/social+media+scraper+api/3168/search",
                    "auth": "Bearer {{ $vars.ZylaLabsApi }}"
                },
                {
                    "name": "👻 Phantom WARP Scraper", 
                    "url": "https://phantombuster.com/api/v2/agents/launch",
                    "auth": "Bearer {{ $vars.PhantomBusterApi }}"
                },
                {
                    "name": "🕷️ ScrapeCreators WARP",
                    "url": "https://api.scrapecreators.com/v1/social/search", 
                    "auth": "Bearer {{ $vars.ScrapeCreatorsApi }}"
                },
                {
                    "name": "🤖 Claude Viral Content Generator",
                    "url": "https://api.anthropic.com/v1/messages",
                    "auth": "Bearer {{ $vars.AnthropicApi }}"
                },
                {
                    "name": "🚀 OpenAI Quantum Strategist",
                    "url": "https://api.openai.com/v1/chat/completions",
                    "auth": "Bearer {{ $vars.OpenAIApi }}"
                },
                {
                    "name": "🧠 DeepSeek Psychology Master",
                    "url": "https://api.deepseek.com/chat/completions",
                    "auth": "Bearer {{ $vars.DeepSeekApi }}"
                },
                {
                    "name": "🎨 Fal.AI Kling 2.1 Master",
                    "url": "https://fal.run/fal-ai/kling-video/v2/master",
                    "auth": "Bearer {{ $vars.FalAIApi }}"
                },
                {
                    "name": "🎭 HeyGen June 2025 3D Avatar",
                    "url": "https://api.heygen.com/v2/video/generate",
                    "auth": "Bearer {{ $vars.HeyGenApi }}"
                },
                {
                    "name": "🔊 ElevenLabs Turbo v2.6",
                    "url": "https://api.elevenlabs.io/v1/text-to-speech",
                    "auth": "Bearer {{ $vars.ElevenLabsApi }}"
                },
                {
                    "name": "📈 Apollo Lead Generation 2025",
                    "url": "https://api.apollo.io/v1/mixed_people/search",
                    "auth": "Bearer {{ $vars.ApolloApi }}"
                },
                {
                    "name": "📧 Snov Lead Enrichment",
                    "url": "https://api.snov.io/v1/get-emails-from-names",
                    "auth": "Bearer {{ $vars.SnovApi }}"
                },
                {
                    "name": "💼 HubSpot CRM Integration",
                    "url": "https://api.hubapi.com/crm/v3/objects/contacts",
                    "auth": "Bearer {{ $vars.HubSpotApi }}"
                },
                {
                    "name": "📱 Wassenger WhatsApp 2025",
                    "url": "https://api.wassenger.com/v1/messages",
                    "auth": "Token {{ $vars.WassengerApi }}"
                }
            ]
            
            added_count = 0
            for api_config in missing_apis:
                exists = any(api_config["name"] in node.get("name", "") for node in current_api_nodes)
                if not exists:
                    new_node = {
                        "parameters": {
                            "method": "POST",
                            "url": api_config["url"],
                            "sendHeaders": True,
                            "headerParameters": {
                                "parameters": [
                                    {
                                        "name": "Authorization",
                                        "value": api_config["auth"]
                                    },
                                    {
                                        "name": "Content-Type", 
                                        "value": "application/json"
                                    }
                                ]
                            },
                            "sendBody": True,
                            "specifyBody": "json",
                            "jsonBody": '={"viral_campaign": "Crystal-Löwe", "target": "5_BILLION_VIEWS"}',
                            "options": {"timeout": 30000}
                        },
                        "id": f"api-{str(uuid.uuid4())[:8]}",
                        "name": api_config["name"],
                        "type": "n8n-nodes-base.httpRequest",
                        "typeVersion": 4.2,
                        "position": [1000 + added_count * 200, 400 + added_count * 100],
                        "retryOnFail": True,
                        "maxTries": 3
                    }
                    
                    nodes.append(new_node)
                    added_count += 1
            
            print(f'  ✅ Added {added_count} missing API nodes')
            
            if added_count > 0:
                existing_processor = next((node for node in nodes if "Processor" in node.get("name", "")), None)
                if existing_processor:
                    processor_name = existing_processor["name"]
                    if processor_name not in fixed_connections:
                        fixed_connections[processor_name] = {"main": []}
                    
                    for api_config in missing_apis[-added_count:]:
                        if not fixed_connections[processor_name]["main"]:
                            fixed_connections[processor_name]["main"] = [[]]
                        fixed_connections[processor_name]["main"][0].append({
                            "node": api_config["name"],
                            "type": "main", 
                            "index": 0
                        })
            
            module_data['nodes'] = nodes
            module_data['connections'] = fixed_connections
            
            with open(module_file, 'w') as f:
                json.dump(module_data, f, indent=2)
            
            print(f'  ✅ Fixed: {len(nodes)} nodes, {len(fixed_connections)} connections')
            
        except Exception as e:
            print(f'  ❌ Error fixing {module_file}: {e}')
    
    print(f'\n🦁 ROAR! All V-OMEGA modules fixed with proper connections and APIs!')

if __name__ == "__main__":
    fix_v_omega_modules()
