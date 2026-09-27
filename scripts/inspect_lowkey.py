from pathlib import Path
import re, urllib.request, concurrent.futures

origin = 'https://lowkeytp.art'
root = Path(__file__).resolve().parent.parent
dest = root / 'lowkey-clone' / 'reference'
dest.mkdir(parents=True, exist_ok=True)
html = (root / 'lowkey-source.html').read_text(encoding='utf-8-sig')
paths = sorted(set(re.findall(r'(?:src|href)="([^"?]+)', html)))
paths = [p for p in paths if p.startswith('/')]
def download(path):
    target = dest / path.lstrip('/')
    target.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(origin+path, timeout=40) as r:
        target.write_bytes(r.read())
    return f'{path}: {target.stat().st_size}'
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    for result in pool.map(download,paths): print(result)
