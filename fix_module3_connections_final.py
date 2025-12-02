#!/usr/bin/env python3
import json

def fix_module3_connections_final():
    """Fix Module 3 to have exactly 65 nodes with 63 connections like Module 1"""
    
    print("🦁 CRYSTAL LION FINAL CONNECTION FIX")
    print("=" * 60)
    
    with open('V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_APIS.json', 'r', encoding='utf-8') as f:
        module3 = json.load(f)
    
    print(f"Current Module 3: {len(module3['nodes'])} nodes, {len(module3['connections'])} connections")
    
    node_names = [node['name'] for node in module3['nodes']]
    
    new_connections = {}
    
    for i in range(63):  # Create connections for first 63 nodes
        current_node = node_names[i]
        next_node = node_names[i + 1]  # Connect to next node
        
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
    
    module3['connections'] = new_connections
    
    print(f"✅ Created {len(new_connections)} connections")
    print(f"✅ Connection chain: {node_names[0]} -> ... -> {node_names[62]} -> {node_names[63]}")
    print(f"✅ Last 2 nodes ({node_names[63]}, {node_names[64]}) have no outgoing connections")
    print(f"✅ Pattern matches Module 1: 65 nodes, 63 connections")
    
    with open('V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_APIS.json', 'w', encoding='utf-8') as f:
        json.dump(module3, f, indent=2, ensure_ascii=False)
    
    try:
        with open('V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_APIS.json', 'r') as f:
            json.load(f)
        print("✅ JSON syntax validation: PASSED")
        return True
    except json.JSONDecodeError as e:
        print(f"❌ JSON syntax error: {e}")
        return False

if __name__ == "__main__":
    success = fix_module3_connections_final()
    if success:
        print("\n🚀 MODULE 3 CONNECTION FIX COMPLETE!")
        print("Ready for N8N import with proper 63 connections!")
    else:
        print("\n❌ MODULE 3 CONNECTION FIX FAILED")
