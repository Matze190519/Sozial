#!/usr/bin/env python3
"""
FINAL CONNECTION FIX: Ensure all V-OMEGA modules have proper name-based connections
"""

import json

def fix_connections_final():
    """Fix connections in all rebuilt modules to ensure they reference correct node names"""
    
    print('🔧 FINAL CONNECTION FIX: Ensuring proper name-based connections')
    print('=' * 70)
    
    modules = [
        'V_OMEGA_MODULE_1_ALIEN_INTELLIGENCE_REAL_HONEST.json',
        'V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_REAL_HONEST.json',
        'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_HONEST.json',
        'V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_REAL_HONEST.json'
    ]
    
    for module_file in modules:
        print(f'\n🔧 Fixing connections in {module_file}...')
        
        try:
            with open(module_file, 'r') as f:
                data = json.load(f)
            
            nodes = data.get('nodes', [])
            connections = data.get('connections', {})
            
            node_names = [node.get('name') for node in nodes]
            node_names_set = set(node_names)
            
            print(f'  📊 Found {len(nodes)} nodes, {len(connections)} connections')
            
            fixed_connections = {}
            connection_fixes = 0
            
            for source_key, targets in connections.items():
                actual_source_name = source_key
                if source_key not in node_names_set:
                    for node_name in node_names:
                        if any(word in node_name for word in source_key.split() if len(word) > 3):
                            actual_source_name = node_name
                            connection_fixes += 1
                            break
                
                fixed_targets = {"main": []}
                for target_list in targets.get("main", []):
                    fixed_target_list = []
                    for target in target_list:
                        target_name = target.get("node")
                        actual_target_name = target_name
                        
                        if target_name not in node_names_set:
                            for node_name in node_names:
                                if any(word in node_name for word in target_name.split() if len(word) > 3):
                                    actual_target_name = node_name
                                    connection_fixes += 1
                                    break
                        
                        fixed_target_list.append({
                            "node": actual_target_name,
                            "type": target.get("type", "main"),
                            "index": target.get("index", 0)
                        })
                    
                    fixed_targets["main"].append(fixed_target_list)
                
                fixed_connections[actual_source_name] = fixed_targets
            
            data['connections'] = fixed_connections
            
            with open(module_file, 'w') as f:
                json.dump(data, f, indent=2)
            
            print(f'  ✅ Fixed {connection_fixes} connection references')
            
            valid_connections = 0
            for source, targets in fixed_connections.items():
                if source in node_names_set:
                    valid_connections += 1
                    for target_list in targets.get("main", []):
                        for target in target_list:
                            if target.get("node") not in node_names_set:
                                print(f'    ⚠️  Invalid target still exists: {target.get("node")}')
            
            print(f'  ✅ Valid connections: {valid_connections}/{len(fixed_connections)}')
            
        except Exception as e:
            print(f'  ❌ Error fixing {module_file}: {e}')
    
    print(f'\n🦁 ROAR! All connection fixes complete!')

if __name__ == "__main__":
    fix_connections_final()
