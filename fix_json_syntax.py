import json
import re

def fix_json_syntax():
    """Fix JSON control character issues in Module 2"""
    try:
        with open('V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_ENGINE_COMPLETE_65_NODES.json', 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', '', content)
        
        content = content.replace('\\"', '"')
        content = content.replace('\\n', '\n')
        
        try:
            data = json.loads(content)
            with open('V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_ENGINE_COMPLETE_65_NODES.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print("✅ JSON syntax fixed successfully")
            return True
        except json.JSONDecodeError as e:
            print(f"❌ JSON parsing error: {e}")
            with open('V_OMEGA_MODULE_2_AVATAR_LEAD_GENERATION_ENGINE_COMPLETE_65_NODES.json', 'w', encoding='utf-8') as f:
                f.write(content)
            print("⚠️ Wrote cleaned content, manual review needed")
            return False
            
    except Exception as e:
        print(f"❌ Error fixing JSON: {e}")
        return False

if __name__ == "__main__":
    fix_json_syntax()
