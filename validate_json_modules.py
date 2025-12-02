#!/usr/bin/env python3
"""
Validate JSON syntax of all V-OMEGA modules
"""

import json
import sys

def validate_modules():
    """Validate all V-OMEGA modules"""
    
    modules = [
        'V_OMEGA_MODULE_1_ALIEN_INTELLIGENCE_ULTIMATE_2025.json',
        'V_OMEGA_MODULE_2_AVATAR_QUANTUM_ULTIMATE_2025.json', 
        'V_OMEGA_MODULE_3_VISUAL_4D_HOLOGRAPHIC_ULTIMATE_2025.json',
        'V_OMEGA_MODULE_4_VIRAL_CASCADE_ULTIMATE_2025.json'
    ]

    all_valid = True
    
    for module in modules:
        try:
            with open(module, 'r') as f:
                data = json.load(f)
            
            nodes = len(data.get("nodes", []))
            connections = len(data.get("connections", {}))
            
            print(f'✅ {module}: Valid JSON - {nodes} nodes, {connections} connections')
            
            if nodes != 65:
                print(f'⚠️  Warning: Expected 65 nodes, found {nodes}')
            if connections != 63:
                print(f'⚠️  Warning: Expected 63 connections, found {connections}')
                
        except Exception as e:
            print(f'❌ {module}: JSON Error - {e}')
            all_valid = False

    if all_valid:
        print('\n🦁 ROAR! All V-OMEGA modules validated successfully!')
        return True
    else:
        print('\n❌ Some modules have validation errors!')
        return False

if __name__ == "__main__":
    success = validate_modules()
    sys.exit(0 if success else 1)
