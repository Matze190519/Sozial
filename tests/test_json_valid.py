import json
import glob
from pathlib import Path


def test_json_files_are_valid():
    json_files = glob.glob("*.json")
    assert json_files, "No JSON files found"
    for path in json_files:
        data = Path(path).read_text(encoding="utf-8")
        try:
            json.loads(data)
        except json.JSONDecodeError as e:
            raise AssertionError(f"Invalid JSON in {path}: {e}")
