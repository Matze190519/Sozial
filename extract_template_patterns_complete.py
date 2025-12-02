#!/usr/bin/env python3
"""
Complete analysis of user's 8312-line V_OMEGA_MODULE_2 template
Extracts all sophisticated JavaScript patterns, API configurations, and viral features
"""

import json
import re
from pathlib import Path

def analyze_template_patterns():
    """Extract all sophisticated patterns from user's 8312-line template"""
    
    template_path = "/home/ubuntu/attachments/755cb97c-55eb-4c47-af4d-b0eeeb350679/V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_ENGINE_COMPLETE_65_NODES+6.json"
    
    with open(template_path, 'r', encoding='utf-8') as f:
        template = json.load(f)
    
    patterns = {
        "sophisticated_javascript": {},
        "api_configurations": {},
        "viral_features": [],
        "avatar_system": {},
        "glass_transformation": {},
        "connection_architecture": {},
        "alien_intelligence": {}
    }
    
    for node in template.get("nodes", []):
        if node.get("type") == "n8n-nodes-base.code":
            js_code = node.get("parameters", {}).get("jsCode", "")
            if len(js_code) > 1000:  # Sophisticated patterns
                patterns["sophisticated_javascript"][node.get("name", "")] = {
                    "code": js_code,
                    "length": len(js_code),
                    "features": extract_features_from_js(js_code)
                }
    
    for node in template.get("nodes", []):
        if node.get("type") == "n8n-nodes-base.httpRequest":
            api_name = node.get("name", "")
            headers = node.get("parameters", {}).get("headerParameters", {}).get("parameters", [])
            patterns["api_configurations"][api_name] = {
                "url": node.get("parameters", {}).get("url", ""),
                "headers": headers,
                "body": node.get("parameters", {}).get("jsonBody", "")
            }
    
    viral_keywords = ["viral", "crystal", "lion", "glass", "quantum", "hologram", "vsmr", "432hz"]
    for node in template.get("nodes", []):
        node_name = node.get("name", "").lower()
        if any(keyword in node_name for keyword in viral_keywords):
            patterns["viral_features"].append({
                "name": node.get("name", ""),
                "type": node.get("type", ""),
                "features": extract_viral_features(node)
            })
    
    avatar_nodes = [node for node in template.get("nodes", []) if "avatar" in node.get("name", "").lower()]
    patterns["avatar_system"] = {
        "total_avatars": len(avatar_nodes),
        "avatar_profiles": extract_avatar_profiles(template),
        "casting_algorithm": extract_casting_algorithm(template)
    }
    
    glass_nodes = [node for node in template.get("nodes", []) if "glass" in node.get("name", "").lower()]
    patterns["glass_transformation"] = {
        "total_glass_nodes": len(glass_nodes),
        "transformation_stages": extract_glass_stages(template),
        "processor_logic": extract_glass_processor(template)
    }
    
    patterns["connection_architecture"] = {
        "total_connections": len(template.get("connections", {})),
        "connection_map": template.get("connections", {}),
        "flow_patterns": analyze_flow_patterns(template)
    }
    
    patterns["alien_intelligence"] = extract_alien_features(template)
    
    return patterns

def extract_features_from_js(js_code):
    """Extract key features from JavaScript code"""
    features = []
    
    if "genetic" in js_code.lower() or "algorithm" in js_code.lower():
        features.append("Genetic Algorithm")
    if "quantum" in js_code.lower():
        features.append("Quantum Processing")
    if "avatar" in js_code.lower() and "casting" in js_code.lower():
        features.append("Avatar Casting")
    if "glass" in js_code.lower() and "transform" in js_code.lower():
        features.append("Glass Transformation")
    if "viral" in js_code.lower() and "score" in js_code.lower():
        features.append("Viral Scoring")
    if "vsmr" in js_code.lower() or "432" in js_code:
        features.append("VSMR Audio")
    if "crystal" in js_code.lower() and "lion" in js_code.lower():
        features.append("Crystal Lion")
    
    return features

def extract_viral_features(node):
    """Extract viral features from node"""
    features = []
    
    node_str = json.dumps(node).lower()
    
    if "97.3" in node_str:
        features.append("97.3% Viral Threshold")
    if "billion" in node_str:
        features.append("Billion View Target")
    if "hologram" in node_str:
        features.append("Holographic Content")
    if "3d" in node_str:
        features.append("3D Generation")
    if "emotion" in node_str:
        features.append("Emotion Sync")
    
    return features

def extract_avatar_profiles(template):
    """Extract avatar profiles from template"""
    profiles = []
    
    for node in template.get("nodes", []):
        js_code = node.get("parameters", {}).get("jsCode", "")
        if "avatar" in js_code.lower() and "profile" in js_code.lower():
            profile_matches = re.findall(r'"([^"]*avatar[^"]*)"', js_code, re.IGNORECASE)
            profiles.extend(profile_matches)
    
    return list(set(profiles))

def extract_casting_algorithm(template):
    """Extract avatar casting algorithm"""
    for node in template.get("nodes", []):
        if "casting" in node.get("name", "").lower():
            return {
                "name": node.get("name", ""),
                "logic": node.get("parameters", {}).get("jsCode", "")[:500] + "..."
            }
    return {}

def extract_glass_stages(template):
    """Extract glass transformation stages"""
    stages = []
    
    for node in template.get("nodes", []):
        if "glass" in node.get("name", "").lower():
            stages.append({
                "name": node.get("name", ""),
                "stage": extract_stage_info(node)
            })
    
    return stages

def extract_glass_processor(template):
    """Extract glass processor logic"""
    for node in template.get("nodes", []):
        if "glass" in node.get("name", "").lower() and "processor" in node.get("name", "").lower():
            return {
                "name": node.get("name", ""),
                "logic": node.get("parameters", {}).get("jsCode", "")[:1000] + "..."
            }
    return {}

def extract_stage_info(node):
    """Extract stage information from node"""
    node_str = json.dumps(node).lower()
    
    if "molecular" in node_str:
        return "Molecular Dissolution"
    elif "crystal" in node_str:
        return "Crystal Formation"
    elif "hologram" in node_str:
        return "Holographic Projection"
    elif "luxury" in node_str or "car" in node_str:
        return "Luxury Car Materialization"
    else:
        return "Unknown Stage"

def analyze_flow_patterns(template):
    """Analyze flow patterns in template"""
    connections = template.get("connections", {})
    
    patterns = {
        "parallel_processing": 0,
        "sequential_chains": 0,
        "feedback_loops": 0,
        "branching_points": 0
    }
    
    for source, targets in connections.items():
        if isinstance(targets, dict) and "main" in targets:
            main_connections = targets["main"]
            if len(main_connections) > 1:
                patterns["parallel_processing"] += 1
            if len(main_connections) == 1:
                patterns["sequential_chains"] += 1
    
    return patterns

def extract_alien_features(template):
    """Extract alien intelligence features"""
    features = {
        "v_omega_init": False,
        "year_3025_logic": False,
        "quantum_loops": False,
        "consciousness_expansion": False,
        "galaxy_domination": False
    }
    
    template_str = json.dumps(template).lower()
    
    if "v-omega" in template_str and "init" in template_str:
        features["v_omega_init"] = True
    if "3025" in template_str:
        features["year_3025_logic"] = True
    if "quantum" in template_str and "loop" in template_str:
        features["quantum_loops"] = True
    if "consciousness" in template_str and "expansion" in template_str:
        features["consciousness_expansion"] = True
    if "galaxy" in template_str and ("domination" in template_str or "conquest" in template_str):
        features["galaxy_domination"] = True
    
    return features

def main():
    """Main analysis function"""
    print("🔍 Analyzing user's 8312-line V_OMEGA_MODULE_2 template...")
    
    patterns = analyze_template_patterns()
    
    print(f"\n📊 ANALYSIS RESULTS:")
    print(f"Sophisticated JavaScript Patterns: {len(patterns['sophisticated_javascript'])}")
    print(f"API Configurations: {len(patterns['api_configurations'])}")
    print(f"Viral Features: {len(patterns['viral_features'])}")
    print(f"Avatar Profiles: {patterns['avatar_system']['total_avatars']}")
    print(f"Glass Transformation Nodes: {patterns['glass_transformation']['total_glass_nodes']}")
    print(f"Total Connections: {patterns['connection_architecture']['total_connections']}")
    
    print(f"\n🧬 SOPHISTICATED JAVASCRIPT PATTERNS:")
    for name, data in patterns['sophisticated_javascript'].items():
        print(f"  - {name}: {data['length']} chars, Features: {', '.join(data['features'])}")
    
    print(f"\n🔗 API CONFIGURATIONS:")
    for api_name, config in patterns['api_configurations'].items():
        print(f"  - {api_name}: {config['url'][:50]}...")
    
    print(f"\n👽 ALIEN INTELLIGENCE FEATURES:")
    for feature, present in patterns['alien_intelligence'].items():
        status = "✅" if present else "❌"
        print(f"  {status} {feature}")
    
    with open("/home/ubuntu/repos/Sozial/template_analysis_complete.json", "w") as f:
        json.dump(patterns, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Analysis saved to template_analysis_complete.json")
    
    return patterns

if __name__ == "__main__":
    main()
