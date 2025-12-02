#!/usr/bin/env python3
"""
Detailed validation of V-OMEGA module connections to identify exact issues
"""

import json

def validate_connections_detailed():
    """Validate connections in all modules with detailed analysis"""
    
    print('🔍 DETAILED CONNECTION VALIDATION')
    print('=' * 50)
    
    with open('V_OMEGA_MODULE_1_FINAL_65_NODES_CORRECTED.json', 'r') as f:
        template = json.load(f)
    
    template_nodes = template.get('nodes', [])
    template_connections = template.get('connections', {})
    template_node_names = [node.get('name') for node in template_nodes]
    
    print(f'📊 Template: {len(template_nodes)} nodes, {len(template_connections)} connections')
    print(f'🔗 Template connection keys: {list(template_connections.keys())[:5]}...')
    print(f'📝 Template node names: {template_node_names[:5]}...')
    
    modules = [
        'V_OMEGA_MODULE_1_ALIEN_INTELLIGENCE_REAL_HONEST.json',
        'V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_REAL_HONEST.json',
        'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_HONEST.json',
        'V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_REAL_HONEST.json'
    ]
    
    for module_file in modules:
        print(f'\n🔧 Analyzing {module_file}:')
        
        try:
            with open(module_file, 'r') as f:
                data = json.load(f)
            
            nodes = data.get('nodes', [])
            connections = data.get('connections', {})
            node_names = [node.get('name') for node in nodes]
            
            print(f'  📊 Module: {len(nodes)} nodes, {len(connections)} connections')
            print(f'  🔗 Connection keys: {list(connections.keys())[:3]}...')
            print(f'  📝 Node names: {node_names[:3]}...')
            
            matching_connections = 0
            for conn_key in connections.keys():
                if conn_key in node_names:
                    matching_connections += 1
                else:
                    print(f'    ❌ Connection key "{conn_key}" not found in node names')
                    for node_name in node_names[:5]:
                        if any(word in node_name for word in conn_key.split() if len(word) > 3):
                            print(f'      🔍 Possible match: "{node_name}"')
                            break
            
            print(f'  ✅ Matching connections: {matching_connections}/{len(connections)}')
            
            invalid_targets = 0
            for source, targets in connections.items():
                for target_list in targets.get('main', []):
                    for target in target_list:
                        target_name = target.get('node')
                        if target_name not in node_names:
                            invalid_targets += 1
                            print(f'    ❌ Invalid target: "{target_name}" from "{source}"')
            
            if invalid_targets == 0:
                print(f'  ✅ All target references valid')
            else:
                print(f'  ❌ Invalid target references: {invalid_targets}')
                
        except Exception as e:
            print(f'  ❌ Error: {e}')

if __name__ == "__main__":
    validate_connections_detailed()
