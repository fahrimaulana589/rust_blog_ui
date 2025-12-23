import json

try:
    with open('openapi_full.json', 'r') as f:
        data = json.load(f)
        paths = data.get('paths', {})
        print("Available Paths:")
        for path in paths:
            print(f"- {path}")
            for method in paths[path]:
                print(f"  - {method.upper()}")
except Exception as e:
    print(e)
