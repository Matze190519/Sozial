import json

def find_json_error():
    print("🔍 Finding JSON syntax error in workflow.json...")
    
    try:
        with open('workflow.json', 'r') as f:
            content = f.read()
        
        try:
            json.loads(content)
            print("✅ JSON is valid!")
            return True
        except json.JSONDecodeError as e:
            print(f"❌ JSON Error: {e}")
            print(f"Error at line {e.lineno}, column {e.colno}")
            print(f"Error position: {e.pos}")
            
            lines = content.split('\n')
            if e.lineno <= len(lines):
                error_line = lines[e.lineno - 1]
                print(f"Problematic line: {error_line}")
                
                start_line = max(0, e.lineno - 3)
                end_line = min(len(lines), e.lineno + 2)
                print("\nContext:")
                for i in range(start_line, end_line):
                    marker = ">>> " if i == e.lineno - 1 else "    "
                    print(f"{marker}{i+1:4d}: {lines[i]}")
            
            return False
            
    except Exception as e:
        print(f"❌ File error: {e}")
        return False

if __name__ == "__main__":
    find_json_error()
