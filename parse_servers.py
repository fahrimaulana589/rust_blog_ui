import json

try:
    with open('openapi_full.json', 'r') as f:
        data = json.load(f)
        servers = data.get('servers', [])
        print("Servers:")
        for server in servers:
            print(server)
except Exception as e:
    print(e)
