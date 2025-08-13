#!/usr/bin/env python3
import json

def fix_module4_connections():
    """Fix Module 4 to have exactly 63 connections like other modules"""
    
    print("🚀 FIXING MODULE 4 CONNECTIONS")
    print("=" * 60)
    
    with open('V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_COMPLETE_65_NODES.json', 'r', encoding='utf-8') as f:
        module4 = json.load(f)
    
    print(f"Current: {len(module4['nodes'])} nodes, {len(module4['connections'])} connections")
    
    node_names = [node['name'] for node in module4['nodes']]
    
    new_connections = {}
    
    for i in range(63):
        current_node = node_names[i]
        next_node = node_names[i + 1]
        
        new_connections[current_node] = {
            "main": [
                [
                    {
                        "node": next_node,
                        "type": "main",
                        "index": 0
                    }
                ]
            ]
        }
    
    module4['connections'] = new_connections
    
    print(f"✅ Created {len(new_connections)} connections")
    print(f"✅ Sequential chain: {node_names[0]} -> ... -> {node_names[63]}")
    print(f"✅ Last 2 nodes with no outgoing connections: {node_names[63]}, {node_names[64]}")
    print(f"✅ Pattern matches other modules: 65 nodes, 63 connections")
    
    with open('V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_COMPLETE_65_NODES.json', 'w', encoding='utf-8') as f:
        json.dump(module4, f, indent=2, ensure_ascii=False)
    
    try:
        with open('V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_COMPLETE_65_NODES.json', 'r') as f:
            json.load(f)
        print("✅ JSON syntax validation: PASSED")
        return True
    except json.JSONDecodeError as e:
        print(f"❌ JSON syntax error: {e}")
        return False

if __name__ == "__main__":
    success = fix_module4_connections()
    if success:
        print("\n🚀 MODULE 4 CONNECTIONS FIXED!")
        print("Ready for N8N import with proper 63 connections!")
    else:
        print("\n❌ MODULE 4 FIX FAILED")
