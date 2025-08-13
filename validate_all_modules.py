#!/usr/bin/env python3
import json
import sys

def validate_all_modules():
    """Validate all 4 V-OMEGA modules for N8N compatibility"""
    
    print("🔍 VALIDATING ALL V-OMEGA MODULES")
    print("=" * 60)
    
    modules = [
        'V_OMEGA_MODULE_1_FINAL_65_NODES_CORRECTED.json',
        'V_OMEGA_MODULE_2_AVATAR_LEAD_GEN_REAL_APIS.json', 
        'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_APIS.json',
        'V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_COMPLETE_65_NODES.json'
    ]
    
    all_valid = True
    
    for module_file in modules:
        print(f"\n🔧 Validating {module_file}...")
        
        try:
            with open(module_file, 'r', encoding='utf-8') as f:
                module = json.load(f)
            
            nodes = len(module.get('nodes', []))
            connections = len(module.get('connections', {}))
            
            print(f"  📊 Nodes: {nodes}")
            print(f"  🔗 Connections: {connections}")
            
            if nodes != 65:
                print(f"  ❌ ERROR: Expected 65 nodes, found {nodes}")
                all_valid = False
            else:
                print(f"  ✅ Node count correct: {nodes}")
            
            if connections != 63:
                print(f"  ❌ ERROR: Expected 63 connections, found {connections}")
                all_valid = False
            else:
                print(f"  ✅ Connection count correct: {connections}")
            
            api_vars_count = 0
            for node in module.get('nodes', []):
                if node.get('type') == 'n8n-nodes-base.httpRequest':
                    headers = node.get('parameters', {}).get('headers', {})
                    body = str(node.get('parameters', {}).get('jsonBody', ''))
                    
                    if '$vars.' in str(headers) or '$vars.' in body:
                        api_vars_count += 1
            
            print(f"  🔑 API nodes with $vars syntax: {api_vars_count}")
            
            viral_features = 0
            for node in module.get('nodes', []):
                name = node.get('name', '').lower()
                code = str(node.get('parameters', {}).get('jsCode', ''))
                
                if any(keyword in name or keyword in code for keyword in 
                       ['crystal', 'lion', 'vsmr', 'glass', 'hologram', 'viral']):
                    viral_features += 1
            
            print(f"  🦁 Nodes with viral features: {viral_features}")
            
            print(f"  ✅ JSON syntax: VALID")
            
        except json.JSONDecodeError as e:
            print(f"  ❌ JSON syntax error: {e}")
            all_valid = False
        except FileNotFoundError:
            print(f"  ❌ File not found: {module_file}")
            all_valid = False
        except Exception as e:
            print(f"  ❌ Validation error: {e}")
            all_valid = False
    
    print(f"\n{'='*60}")
    if all_valid:
        print("🚀 ALL MODULES VALIDATED SUCCESSFULLY!")
        print("✅ Ready for N8N import and galactic domination!")
        return True
    else:
        print("❌ VALIDATION FAILED - Some modules need fixes")
        return False

if __name__ == "__main__":
    success = validate_all_modules()
    sys.exit(0 if success else 1)
