#!/usr/bin/env python3
"""
Extract all viral prompts and templates from the codebase
Create comprehensive downloadable file with all "geile Prompts"
"""

import json
import os
import re
from pathlib import Path

def extract_all_viral_prompts():
    """Extract all viral prompts from the codebase files"""
    
    print('🔍 EXTRACTING ALL VIRAL PROMPTS FROM CODEBASE')
    print('=' * 60)
    
    prompts = {
        'leonardo_ai_prompts': [],
        'heygen_scripts': [],
        'elevenlabs_voice': [],
        'asmr_content': [],
        'crystal_lion_branding': [],
        'glass_transformation': [],
        'viral_hooks': [],
        'dynamic_prompts': [],
        'javascript_generators': []
    }
    
    key_files = [
        'LR_LAMBO_ULTIMATE_SOCIAL_AUTOMATION.json',
        'V_OMEGA_MODULE_2_MASTER_FLOW.json',
        'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_TEMPLATE.json',
        'VIRAL_STRATEGY_INTEGRATION_COMPLETE_2025.md',
        'master_flow_analysis.md',
        'V_OMEGA_MODULE_1_FINAL_65_NODES_CORRECTED.json',
        'V_OMEGA_MODULE_1_ALIEN_INTELLIGENCE_REAL_HONEST.json',
        'V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_REAL_HONEST.json',
        'V_OMEGA_MODULE_3_VISUAL_3D_GENERATOR_REAL_HONEST.json',
        'V_OMEGA_MODULE_4_DISTRIBUTION_ANALYTICS_REAL_HONEST.json',
        'V_OMEGA_MODULE_1_CONTENT_INTELLIGENCE_SYSTEM.json',
        'V_OMEGA_MODULE_2_CONTENT_CREATION_ENGINE.json',
        'V_OMEGA_MODULE_3_DISTRIBUTION_AUTOMATION.json',
        'V_OMEGA_MODULE_4_LEAD_GENERATION_CRM.json'
    ]
    
    for filename in key_files:
        if os.path.exists(filename):
            print(f'📄 Processing {filename}...')
            
            try:
                with open(filename, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                leonardo_matches = re.findall(r'"prompt":\s*"([^"]{50,})"', content, re.IGNORECASE)
                leonardo_matches.extend(re.findall(r'leonardo.*prompt["\']:\s*["\']([^"\']{50,})["\']', content, re.IGNORECASE))
                leonardo_matches.extend(re.findall(r'Hyperrealistic[^"\']*["\']([^"\']{30,})["\']', content, re.IGNORECASE))
                prompts['leonardo_ai_prompts'].extend(leonardo_matches)
                
                heygen_matches = re.findall(r'heygen[^"\']*["\']([^"\']{30,})["\']', content, re.IGNORECASE)
                heygen_matches.extend(re.findall(r'avatar[^"\']*script[^"\']*["\']([^"\']{30,})["\']', content, re.IGNORECASE))
                prompts['heygen_scripts'].extend(heygen_matches)
                
                elevenlabs_matches = re.findall(r'elevenlabs[^"\']*["\']([^"\']{20,})["\']', content, re.IGNORECASE)
                elevenlabs_matches.extend(re.findall(r'voice[^"\']*["\']([^"\']{30,})["\']', content, re.IGNORECASE))
                prompts['elevenlabs_voice'].extend(elevenlabs_matches)
                
                asmr_matches = re.findall(r'asmr[^"\']*["\']([^"\']{20,})["\']', content, re.IGNORECASE)
                asmr_matches.extend(re.findall(r'whisper[^"\']*["\']([^"\']{20,})["\']', content, re.IGNORECASE))
                asmr_matches.extend(re.findall(r'432[^"\']*Hz[^"\']*["\']([^"\']{20,})["\']', content, re.IGNORECASE))
                prompts['asmr_content'].extend(asmr_matches)
                
                crystal_matches = re.findall(r'crystal.*lion[^"\']*["\']([^"\']{20,})["\']', content, re.IGNORECASE)
                crystal_matches.extend(re.findall(r'löwe[^"\']*["\']([^"\']{20,})["\']', content, re.IGNORECASE))
                crystal_matches.extend(re.findall(r'roar[^"\']*["\']([^"\']{20,})["\']', content, re.IGNORECASE))
                prompts['crystal_lion_branding'].extend(crystal_matches)
                
                glass_matches = re.findall(r'glass[^"\']*transformation[^"\']*["\']([^"\']{30,})["\']', content, re.IGNORECASE)
                glass_matches.extend(re.findall(r'liquid.*glass[^"\']*["\']([^"\']{30,})["\']', content, re.IGNORECASE))
                glass_matches.extend(re.findall(r'hologram[^"\']*["\']([^"\']{30,})["\']', content, re.IGNORECASE))
                prompts['glass_transformation'].extend(glass_matches)
                
                viral_matches = re.findall(r'viral.*hook[^"\']*["\']([^"\']{20,})["\']', content, re.IGNORECASE)
                viral_matches.extend(re.findall(r'WAIT![^"\']*["\']([^"\']{20,})["\']', content, re.IGNORECASE))
                viral_matches.extend(re.findall(r'POV:[^"\']*["\']([^"\']{20,})["\']', content, re.IGNORECASE))
                prompts['viral_hooks'].extend(viral_matches)
                
                dynamic_arrays = re.findall(r'dynamicPrompts\s*[=:]\s*\[(.*?)\]', content, re.DOTALL)
                for array in dynamic_arrays:
                    individual_prompts = re.findall(r'["\']([^"\']{30,})["\']', array)
                    prompts['dynamic_prompts'].extend(individual_prompts)
                
                viral_patterns = re.findall(r'Crystal-Löwe[^"\']*["\']([^"\']{20,})["\']', content)
                viral_patterns.extend(re.findall(r'Traumauto ab 99€[^"\']*["\']([^"\']{20,})["\']', content))
                viral_patterns.extend(re.findall(r'passives Einkommen[^"\']*["\']([^"\']{20,})["\']', content))
                prompts['viral_hooks'].extend(viral_patterns)
                
                js_generators = re.findall(r'// .*[Pp]rompt.*[Gg]enerator.*\n(.*?return.*?;)', content, re.DOTALL)
                js_generators.extend(re.findall(r'const.*[Pp]rompts?\s*=\s*\{(.*?)\}', content, re.DOTALL))
                prompts['javascript_generators'].extend(js_generators)
                
                print(f'  ✅ Extracted prompts from {filename}')
                
            except Exception as e:
                print(f'  ❌ Error processing {filename}: {e}')
    
    for category in prompts:
        prompts[category] = list(set(prompts[category]))
        prompts[category] = [p.strip() for p in prompts[category] if len(p.strip()) > 10]
        prompts[category] = [p for p in prompts[category] if not p.startswith('=')]
    
    return prompts

def create_prompt_download_file(prompts):
    """Create comprehensive downloadable file with all prompts"""
    
    markdown_content = """# 🦁 GEILE PROMPTS & TEMPLATES SAMMLUNG 2025

**Erstellt:** 2025-08-18  
**Quelle:** V-OMEGA Social Media Automation System  
**Ziel:** 1+ Milliarden Views mit professionellen AI-Prompts  

---



"""
    
    for i, prompt in enumerate(prompts['leonardo_ai_prompts'][:25], 1):
        markdown_content += f"**{i}.** {prompt}\n\n"
    
    markdown_content += """---



"""
    
    for i, script in enumerate(prompts['heygen_scripts'][:15], 1):
        markdown_content += f"**{i}.** {script}\n\n"
    
    markdown_content += """---



"""
    
    for i, voice in enumerate(prompts['elevenlabs_voice'][:15], 1):
        markdown_content += f"**{i}.** {voice}\n\n"
    
    markdown_content += """---



"""
    
    for i, asmr in enumerate(prompts['asmr_content'][:10], 1):
        markdown_content += f"**{i}.** {asmr}\n\n"
    
    markdown_content += """---



"""
    
    for i, crystal in enumerate(prompts['crystal_lion_branding'][:20], 1):
        markdown_content += f"**{i}.** {crystal}\n\n"
    
    markdown_content += """---



"""
    
    for i, glass in enumerate(prompts['glass_transformation'][:15], 1):
        markdown_content += f"**{i}.** {glass}\n\n"
    
    markdown_content += """---



"""
    
    for i, hook in enumerate(prompts['viral_hooks'][:30], 1):
        markdown_content += f"**{i}.** {hook}\n\n"
    
    markdown_content += """---



"""
    
    for i, dynamic in enumerate(prompts['dynamic_prompts'][:25], 1):
        markdown_content += f"**{i}.** {dynamic}\n\n"
    
    markdown_content += """---



```javascript
"""
    
    for i, js in enumerate(prompts['javascript_generators'][:5], 1):
        markdown_content += f"// Generator {i}\n{js}\n\n"
    
    markdown_content += """```

---


"""
    
    total_prompts = sum(len(prompts[category]) for category in prompts)
    markdown_content += f"- **Gesamt Prompts:** {total_prompts}\n"
    markdown_content += f"- **Leonardo AI:** {len(prompts['leonardo_ai_prompts'])}\n"
    markdown_content += f"- **HeyGen Scripts:** {len(prompts['heygen_scripts'])}\n"
    markdown_content += f"- **ElevenLabs Voice:** {len(prompts['elevenlabs_voice'])}\n"
    markdown_content += f"- **ASMR Content:** {len(prompts['asmr_content'])}\n"
    markdown_content += f"- **Crystal Lion:** {len(prompts['crystal_lion_branding'])}\n"
    markdown_content += f"- **Glass Transformation:** {len(prompts['glass_transformation'])}\n"
    markdown_content += f"- **Viral Hooks:** {len(prompts['viral_hooks'])}\n"
    markdown_content += f"- **Dynamic Prompts:** {len(prompts['dynamic_prompts'])}\n"
    
    markdown_content += """

---


**ROAR! Diese Prompts sind bereit für 1+ Milliarden Views!**

Alle Prompts wurden aus dem V-OMEGA System extrahiert und sind optimiert für maximale virale Reichweite. Verwende sie für Leonardo AI, HeyGen, ElevenLabs und andere AI-Tools.

**Status:** GALAXY_CONQUEST_READY ✅

Die Welt gehört dem Crystal Lion! 🦁👑

"""
    
    with open('GEILE_PROMPTS_SAMMLUNG_2025.md', 'w', encoding='utf-8') as f:
        f.write(markdown_content)
    
    with open('GEILE_PROMPTS_SAMMLUNG_2025.json', 'w', encoding='utf-8') as f:
        json.dump(prompts, f, indent=2, ensure_ascii=False)
    
    return total_prompts

if __name__ == "__main__":
    prompts = extract_all_viral_prompts()
    total = create_prompt_download_file(prompts)
    
    print(f'\n🦁 ROAR! Prompt-Extraktion abgeschlossen!')
    print(f'📊 Gesamt extrahierte Prompts: {total}')
    print(f'📄 Markdown-Datei: GEILE_PROMPTS_SAMMLUNG_2025.md')
    print(f'📄 JSON-Datei: GEILE_PROMPTS_SAMMLUNG_2025.json')
