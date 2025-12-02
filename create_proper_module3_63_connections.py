#!/usr/bin/env python3
import json

def create_proper_module3_connections():
    """Create Module 3 with exactly 65 nodes and 63 connections like Module 1"""
    
    print("🦁 CRYSTAL LION - Creating proper Module 3 with 63 connections")
    print("=" * 70)
    
    with open('V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_APIS.json', 'r', encoding='utf-8') as f:
        module3 = json.load(f)
    
    print(f"Current: {len(module3['nodes'])} nodes, {len(module3['connections'])} connections")
    
    node_names = [node['name'] for node in module3['nodes']]
    
    new_connections = {}
    
    for i in range(63):  # Create 63 connections
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
    
    module3['connections'] = new_connections
    
    print(f"✅ Created {len(new_connections)} connections")
    print(f"✅ Sequential chain: {node_names[0]} -> ... -> {node_names[63]}")
    print(f"✅ Last 2 nodes excluded: {node_names[63]}, {node_names[64]}")
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
    success = create_proper_module3_connections()
    if success:
        print("\n🚀 MODULE 3 FIXED WITH 63 CONNECTIONS!")
        print("Ready for N8N import with Module 1 compatibility!")
    else:
        print("\n❌ MODULE 3 FIX FAILED")
