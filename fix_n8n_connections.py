import json

def fix_n8n_connections():
    print("🔧 FIXING N8N CONNECTIONS & SYNTAX ERRORS")
    print("=" * 60)
    
    with open('workflow.json', 'r') as f:
        workflow = json.load(f)
    
    nodes = workflow['nodes']
    connections = workflow['connections']
    
    print(f"📊 Current Status:")
    print(f"   Nodes: {len(nodes)}")
    print(f"   Connections: {len(connections)}")
    
    id_to_name = {}
    name_to_id = {}
    for node in nodes:
        node_id = node['id']
        node_name = node['name']
        id_to_name[node_id] = node_name
        name_to_id[node_name] = node_id
    
    print(f"\n🔄 Converting Connections: ID → Name")
    
    new_connections = {}
    conversion_count = 0
    
    for source_id, connection_data in connections.items():
        if source_id in id_to_name:
            source_name = id_to_name[source_id]
            new_connections[source_name] = {}
            
            for connection_type, connection_list in connection_data.items():
                new_connections[source_name][connection_type] = []
                
                for connection_group in connection_list:
                    new_group = []
                    for connection in connection_group:
                        target_id = connection['node']
                        if target_id in id_to_name:
                            target_name = id_to_name[target_id]
                            new_connection = {
                                'node': target_name,
                                'type': connection.get('type', 'main'),
                                'index': connection.get('index', 0)
                            }
                            new_group.append(new_connection)
                            conversion_count += 1
                        else:
                            print(f"   ⚠️  Target ID not found: {target_id}")
                    
                    new_connections[source_name][connection_type].append(new_group)
        else:
            print(f"   ⚠️  Source ID not found: {source_id}")
    
    print(f"   Converted {conversion_count} connections")
    
    print(f"\n🐛 Fixing Code Node Syntax Errors:")
    syntax_fixes = 0
    
    for node in nodes:
        if node.get('type') == 'n8n-nodes-base.code':
            params = node.get('parameters', {})
            js_code = params.get('jsCode', '')
            
            if '.$json' in js_code or '.$input' in js_code:
                print(f"   Fixing: {node['name']}")
                js_code = js_code.replace('.$json', '...$json')
                js_code = js_code.replace('.$input', '...$input')
                params['jsCode'] = js_code
                syntax_fixes += 1
    
    print(f"   Fixed {syntax_fixes} Code nodes")
    
    final_response_exists = any(node['name'] == 'Final Response' for node in nodes)
    if not final_response_exists:
        print(f"\n➕ Adding Final Response Node")
        final_response_node = {
            "parameters": {
                "jsCode": "return [{ ...$input.first().json, final_status: 'completed', timestamp: new Date().toISOString() }];"
            },
            "id": "final_response_node",
            "name": "Final Response",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [300, 5000]
        }
        nodes.append(final_response_node)
    
    workflow['connections'] = new_connections
    
    with open('workflow_fixed_connections.json', 'w') as f:
        json.dump(workflow, f, indent=2)
    
    print(f"\n✅ FIXES COMPLETE:")
    print(f"   ✅ Connections converted to name-based")
    print(f"   ✅ Code syntax errors fixed")
    print(f"   ✅ Final Response node added")
    print(f"   ✅ Saved as: workflow_fixed_connections.json")
    
    return True

if __name__ == "__main__":
    fix_n8n_connections()
