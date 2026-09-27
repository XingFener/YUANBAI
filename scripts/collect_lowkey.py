from pathlib import Path
import re, urllib.request, urllib.parse, concurrent.futures, json
root=Path(__file__).resolve().parent.parent/'lowkey-clone'
dest=root/'reference'
extra=['/_next/static/chunks/25.1dbd591b2cc73574.js','/_next/static/chunks/b536a0f1.f1229265e0ce474f.js','/_next/static/chunks/123.2afe883af1fbe6d6.js','/_next/static/chunks/504.733c34792308f9bb.js','/_next/static/chunks/9dadc25a.d9665d92b2da232c.js','/_next/static/css/03c4daa5b84289ce.css']
def get(path):
    target=dest/path.lstrip('/')
    if target.exists(): return
    target.parent.mkdir(parents=True,exist_ok=True)
    try:
        with urllib.request.urlopen('https://lowkeytp.art'+urllib.parse.quote(path,safe='/%:?=&'),timeout=60) as r: target.write_bytes(r.read())
        print(path, target.stat().st_size,flush=True)
    except Exception as e: print('FAILED',path,str(e),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: list(pool.map(get,extra))
paths=set()
for f in dest.rglob('*'):
    if f.suffix not in ('.css','.js'): continue
    text=f.read_text(encoding='utf-8')
    paths.update(re.findall(r'["\'](/[^"\'\n]*?\.(?:webp|png|jpg|jpeg|woff2?|glb|gltf|mp3|ogg|svg))["\']',text))
    if f.suffix=='.css':
        for p in re.findall(r'url\(["\']?([^\)"\']+)',text):
            if not p.startswith('data:'): paths.add(urllib.parse.urljoin('/'+str(f.relative_to(dest)).replace('\\','/'),p))
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: list(pool.map(get,sorted(paths)))
(root/'asset-manifest.json').write_text(json.dumps(sorted(paths),ensure_ascii=False,indent=2),encoding='utf-8')
