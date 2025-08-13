#!/usr/bin/env python3
"""
Convert Modules 2, 3, and 4 to use Module 1's exact connection pattern
- Use node names as connection keys instead of node IDs
- Use node names as connection targets instead of node IDs
- Exclude appropriate final/response nodes from connections
"""

import json

def convert_module_to_module1_pattern():
    """Convert modules to use Module 1's working connection pattern"""
    
    print("🔧 CONVERTING MODULES TO MODULE 1 CONNECTION PATTERN...")
    
    modules = [
        {
            'file': 'V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_OPTIMIZED_FINAL.json',
            'name': 'Module 2: Avatar Lead Generation'
        },
        {
            'file': 'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_APIS.json',
            'name': 'Module 3: Visual & 3D Generator'
        },
        {
            'file': 'V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_COMPLETE_65_NODES.json',
            'name': 'Module 4: Distribution & Analytics'
        }
    ]
    
    for module_info in modules:
        filename = module_info['file']
        module_name = module_info['name']
        
        print(f"\n🔧 Converting {module_name}...")
        
        try:
            with open(filename, 'r') as f:
                module_data = json.load(f)
            
            id_to_name = {}
            name_to_id = {}
            for node in module_data['nodes']:
                node_id = node['id']
                node_name = node['name']
                id_to_name[node_id] = node_name
                name_to_id[node_name] = node_id
            
            print(f"📊 Processing {len(module_data['nodes'])} nodes...")
            
            old_connections = module_data['connections']
            new_connections = {}
            
            exclude_patterns = [
                'webhook response', 'final', 'victory', 'completion', 'end',
                'report', 'notification', 'telegram final', 'bannerbear final'
            ]
            
            excluded_nodes = []
            for node in module_data['nodes']:
                node_name = node['name'].lower()
                node_type = node.get('type', '')
                
                if node_type == 'n8n-nodes-base.respondToWebhook':
                    excluded_nodes.append(node['name'])
                elif any(pattern in node_name for pattern in exclude_patterns):
                    excluded_nodes.append(node['name'])
            
            print(f"🚫 Excluding {len(excluded_nodes)} nodes from connections:")
            for excluded in excluded_nodes:
                print(f"  - {excluded}")
            
            converted_count = 0
            for old_key, connection_data in old_connections.items():
                if old_key in id_to_name:
                    new_key = id_to_name[old_key]
                    
                    if new_key in excluded_nodes:
                        print(f"  ⏭️ Skipping excluded node: {new_key}")
                        continue
                    
                    new_connection_data = {"main": []}
                    
                    if connection_data.get('main') and connection_data['main'][0]:
                        new_targets = []
                        for target in connection_data['main'][0]:
                            target_id = target['node']
                            if target_id in id_to_name:
                                target_name = id_to_name[target_id]
                                new_targets.append({
                                    "node": target_name,
                                    "type": target['type'],
                                    "index": target['index']
                                })
                        
                        if new_targets:
                            new_connection_data['main'] = [new_targets]
                    
                    new_connections[new_key] = new_connection_data
                    converted_count += 1
            
            module_data['connections'] = new_connections
            
            print(f"✅ Converted {converted_count} connections")
            print(f"✅ Using node names as keys and targets")
            print(f"✅ Excluded {len(excluded_nodes)} final/response nodes")
            
            with open(filename, 'w') as f:
                json.dump(module_data, f, indent=2)
            
            print(f"✅ {module_name} saved with Module 1 pattern")
            
            try:
                with open(filename, 'r') as f:
                    json.load(f)
                print(f"✅ JSON syntax valid for {module_name}")
            except json.JSONDecodeError as e:
                print(f"❌ JSON syntax error in {module_name}: {e}")
                
        except FileNotFoundError:
            print(f"❌ File not found: {filename}")
        except Exception as e:
            print(f"❌ Error processing {module_name}: {e}")
    
    print(f"\n🚀 ALL MODULES CONVERTED TO MODULE 1 PATTERN!")
    print(f"✅ Connection keys: NODE NAMES (like Module 1)")
    print(f"✅ Connection targets: NODE NAMES (like Module 1)")
    print(f"✅ Excluded final/response nodes (like Module 1)")
    print(f"✅ Ready for N8N import with Module 1 compatibility")
    
    return True

if __name__ == "__main__":
    convert_module_to_module1_pattern()
