import json

with open('workflow.json', 'r') as f:
    data = json.load(f)

print(f'Total nodes in array: {len(data["nodes"])}')
print(f'Connections object keys: {len(data["connections"])}')

node_ids = [node['id'] for node in data['nodes']]
numbered_nodes = [id for id in node_ids if '_' in id and id.split('_')[-1].isdigit()]
print(f'Numbered nodes found: {len(numbered_nodes)}')

numbers = []
for node_id in numbered_nodes:
    try:
        num = int(node_id.split('_')[-1])
        numbers.append(num)
    except:
        pass

numbers.sort()
print(f'Number range: {min(numbers)} to {max(numbers)}')
print(f'Missing numbers in sequence:')
missing_count = 0
for i in range(min(numbers), max(numbers)+1):
    if i not in numbers:
        print(f'  Missing: {i}')
        missing_count += 1

print(f'Total missing nodes: {missing_count}')

connection_count = 0
orphaned_nodes = []
for node_id in node_ids:
    if node_id not in data['connections']:
        orphaned_nodes.append(node_id)
    elif 'main' in data['connections'][node_id] and data['connections'][node_id]['main'] and data['connections'][node_id]['main'][0]:
        connection_count += len(data['connections'][node_id]['main'][0])

print(f'Total connection links: {connection_count}')
print(f'Orphaned nodes: {len(orphaned_nodes)}')
if orphaned_nodes:
    print(f'First 10 orphaned: {orphaned_nodes[:10]}')
