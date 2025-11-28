#!/usr/bin/env python3
"""
Fix Module 1 node connections to use node names instead of IDs
"""

import json

def fix_connections():
    """Fix all connections to use node names instead of IDs"""
    
    with open('/home/ubuntu/repos/Sozial/module_1_final_75_nodes_workflow.json', 'r') as f:
        workflow = json.load(f)
    
    print(f"Fixing connections for {len(workflow['nodes'])} nodes")
    
    id_to_name = {}
    for node in workflow['nodes']:
        id_to_name[node['id']] = node['name']
    
    print(f"Created mapping for {len(id_to_name)} nodes")
    
    new_connections = {}
    
    node_names = [node['name'] for node in workflow['nodes']]
    
    for i in range(len(node_names) - 1):
        current_name = node_names[i]
        next_name = node_names[i + 1]
        
        new_connections[current_name] = {
            "main": [[{
                "node": next_name,
                "type": "main",
                "index": 0
            }]]
        }
    
    workflow['connections'] = new_connections
    
    with open('/home/ubuntu/repos/Sozial/module_1_final_75_nodes_workflow_fixed.json', 'w', encoding='utf-8') as f:
        json.dump(workflow, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Fixed workflow saved!")
    print(f"📊 Total connections: {len(new_connections)}")
    
    connected_nodes = set(new_connections.keys())
    target_nodes = set()
    for connections in new_connections.values():
        for connection_list in connections['main']:
            for connection in connection_list:
                target_nodes.add(connection['node'])
    
    all_nodes = set(node_names)
    orphaned_nodes = all_nodes - connected_nodes - target_nodes
    
    if orphaned_nodes:
        print(f"⚠️ Orphaned nodes found: {orphaned_nodes}")
    else:
        print("✅ All nodes properly connected!")
    
    print(f"\n📊 Connection Summary:")
    print(f"  🔗 Source nodes: {len(connected_nodes)}")
    print(f"  🎯 Target nodes: {len(target_nodes)}")
    print(f"  📝 Total nodes: {len(all_nodes)}")
    print(f"  🚫 Orphaned: {len(orphaned_nodes)}")
    
    return workflow

if __name__ == "__main__":
    print("🔧 Fixing Module 1 node connections...")
    workflow = fix_connections()
    print("🏆 Module 1 connections fixed!")
