"""Build static translations of public portfolio prose; never called by the website.
Existing authored locale records remain the primary source. Review the generated glossary in site_text.json.
"""
import concurrent.futures,json,re,time,urllib.parse,urllib.request
from pathlib import Path
source=json.loads(Path('docs/localization-source.json').read_text(encoding='utf-8'))
def public_phrase(phrase):
 # SVG commands need a numeric operand: "A browser..." is ordinary prose.
 svg_path=re.fullmatch(r'[MLCQHVASTZmlcqhv\d.,\s-]+',phrase) and re.match(r'^[MLCQHVASTZmlcqhv]\s*-?(?:\d|\.\d)',phrase)
 return not svg_path and not re.match(r'^(?:minmax\(|clamp\(|repeat\(|\.querySelector|(?:hover|focus|grid|flex|text|border|bg|px|py|mt|mb|w|h|items|justify|rounded)-|\d+(?:\.\d+)?px|\d+ \d+)',phrase)
source=[phrase for phrase in source if public_phrase(phrase)]
target=Path('src/lib/site_text.json');dictionary=json.loads(target.read_text(encoding='utf-8'))
languages=['fa','ar','de','fr','it','zh','ru','el','la']
tasks=[]
for lang in languages:
 batch=[];length=0
 for phrase in source:
  if dictionary.get(phrase,{}).get(lang):continue
  if length+len(phrase)>900 and batch:tasks.append((lang,batch));batch=[];length=0
  batch.append(phrase);length+=len(phrase)+16
 if batch:tasks.append((lang,batch))
def translate(task):
 lang,phrases=task
 missing=[p for p in phrases if not dictionary.get(p,{}).get(lang)]
 if not missing:return lang,{}
 query='\n'.join(f'__{i:04}__ {p}' for i,p in enumerate(missing))
 url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode({'client':'gtx','sl':'en','tl':lang,'dt':'t','q':query})
 for attempt in range(3):
  try:
   request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
   data=json.loads(urllib.request.urlopen(request,timeout=20).read())
   result=''.join(part[0] or '' for part in data[0]);matches=list(re.finditer(r'__\s*(\d{4})\s*__',result))
   if len(matches)!=len(missing):
    if len(missing)>1:
     middle=len(missing)//2
     return lang,{**translate((lang,missing[:middle]))[1],**translate((lang,missing[middle:]))[1]}
    plain_url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode({'client':'gtx','sl':'en','tl':lang,'dt':'t','q':missing[0]})
    plain=json.loads(urllib.request.urlopen(plain_url,timeout=20).read())
    return lang,{missing[0]:''.join(part[0] or '' for part in plain[0]).strip()}
   values={missing[int(m.group(1))]:result[m.end():matches[j+1].start() if j+1<len(matches) else None].strip() for j,m in enumerate(matches)}
   for phrase,value in list(values.items()):
    if not value:
     plain_url='https://translate.googleapis.com/translate_a/single?'+urllib.parse.urlencode({'client':'gtx','sl':'en','tl':lang,'dt':'t','q':phrase})
     plain=json.loads(urllib.request.urlopen(plain_url,timeout=20).read())
     values[phrase]=''.join(part[0] or '' for part in plain[0]).strip()
   if any(not value for value in values.values()):raise ValueError('Empty translation')
   return lang,values
  except Exception as error:
   if attempt==2:raise RuntimeError(f'{lang}: {missing[0]}: {error}')
   time.sleep(1+attempt)
print(f'{len(tasks)} batches of missing translations.',flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
 for index,(lang,values) in enumerate(pool.map(translate,tasks)):
  for phrase,value in values.items():dictionary.setdefault(phrase,{})[lang]=value
  if values:time.sleep(.6)
  if index%10==0:
   target.write_text(json.dumps(dictionary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');print(f'{index+1}/{len(tasks)} batches',flush=True)
target.write_text(json.dumps(dictionary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
assert all(all(dictionary.get(p,{}).get(lang) for lang in languages) for p in source)
locale_dir=Path('src/lib/site_locales');locale_dir.mkdir(exist_ok=True)
for lang in languages:
 phrases={phrase:values[lang] for phrase,values in dictionary.items() if values.get(lang) and public_phrase(phrase)}
 (locale_dir/f'{lang}.json').write_text(json.dumps(phrases,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Complete: {len(source)} phrases in {len(languages)} target languages.',flush=True)
