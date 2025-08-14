#!/usr/bin/env python3
"""
Analyze V-OMEGA module structure to identify connection and naming issues
"""

import json
import sys
from collections import Counter

def analyze_module_structure():
    """Analyze all 4 V-OMEGA modules for structural issues"""
    
    modules = [
        'V_OMEGA_MODULE_1_ALIEN_INTELLIGENCE_REAL_HONEST.json',
        'V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_REAL_HONEST.json', 
        'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_HONEST.json',
        'V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_REAL_HONEST.json'
    ]
    
    print("🔍 ANALYZING V-OMEGA MODULE STRUCTURE ISSUES:")
    print("=" * 60)
    
    for module_file in modules:
        try:
            with open(module_file, 'r') as f:
                data = json.load(f)
            
            nodes = data.get('nodes', [])
            connections = data.get('connections', [])
            
            print(f'\n📁 {module_file}:')
            print(f'  📊 Total nodes: {len(nodes)}')
            print(f'  🔗 Total connections: {len(connections)}')
            
            node_names = [node.get('name', 'unnamed') for node in nodes]
            name_counts = Counter(node_names)
            duplicates = {name: count for name, count in name_counts.items() if count > 1}
            
            if duplicates:
                print(f'  ❌ DUPLICATE NODE NAMES: {len(duplicates)} sets of duplicates')
                for name, count in duplicates.items():
                    print(f'    - "{name}": {count} instances')
            else:
                print(f'  ✅ All node names are unique')
            
            node_types = [node.get('type', 'unknown') for node in nodes]
            type_counts = Counter(node_types)
            print(f'  📋 Node types: {dict(type_counts)}')
            
            empty_configs = 0
            for node in nodes:
                parameters = node.get('parameters', {})
                if not parameters or len(str(parameters)) < 50:
                    empty_configs += 1
            
            if empty_configs > 0:
                print(f'  ⚠️  Nodes with minimal configuration: {empty_configs}')
            
            if len(connections) == 0:
                print(f'  ❌ CRITICAL: NO CONNECTIONS FOUND!')
            elif len(connections) < 60:
                print(f'  ⚠️  Low connection count (expected ~63): {len(connections)}')
            else:
                print(f'  ✅ Connection count looks good: {len(connections)}')
            
            print(f'  📝 First 5 node names: {node_names[:5]}')
                
        except Exception as e:
            print(f'  ❌ ERROR analyzing {module_file}: {e}')
    
    print(f'\n🚨 CRITICAL ISSUES IDENTIFIED - IMMEDIATE FIX REQUIRED!')

if __name__ == "__main__":
    analyze_module_structure()
