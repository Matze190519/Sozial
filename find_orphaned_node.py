import json

def find_orphaned_node():
    print("🔍 FINDING ORPHANED NODE")
    print("=" * 40)
    
    with open('workflow.json', 'r') as f:
        workflow = json.load(f)
    
    nodes = workflow['nodes']
    connections = workflow['connections']
    
    all_node_names = {node['name'] for node in nodes}
    print(f"Total nodes: {len(all_node_names)}")
    
    connected_sources = set(connections.keys())
    print(f"Connected sources: {len(connected_sources)}")
    
    connected_targets = set()
    for source, connection_data in connections.items():
        for connection_type, connection_list in connection_data.items():
            for connection_group in connection_list:
                for connection in connection_group:
                    connected_targets.add(connection['node'])
    
    print(f"Connected targets: {len(connected_targets)}")
    
    all_connected = connected_sources | connected_targets
    orphaned = all_node_names - all_connected
    
    print(f"All connected: {len(all_connected)}")
    print(f"Orphaned nodes: {len(orphaned)}")
    
    if orphaned:
        print(f"Orphaned node(s): {list(orphaned)}")
        
        for node in nodes:
            if node['name'] in orphaned:
                print(f"Orphaned node details:")
                print(f"  Name: {node['name']}")
                print(f"  ID: {node['id']}")
                print(f"  Type: {node['type']}")
    else:
        print("✅ No orphaned nodes found")
    
    return list(orphaned)

if __name__ == "__main__":
    find_orphaned_node()
