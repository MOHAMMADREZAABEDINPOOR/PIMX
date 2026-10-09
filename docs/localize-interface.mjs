import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
const files=[];
const collectOnly=process.argv.includes('--collect-only');
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())walk(file);else if(/\.tsx?$/.test(file)&&!file.includes('Admin')&&!file.includes('useSiteText'))files.push(file);}}
walk('src');
const strings=new Set(), technical=new Set(['GitHub','LinkedIn','Telegram','Python','Django','React','TypeScript','JavaScript','Rust','Tauri','Three.js','HTML','CSS','SQL','MySQL','PostgreSQL','Arduino','Tkinter','Canvas','WebRTC','Webhooks','PHP','Express','Laravel','Claude','Gemini','AI','LLM','API','UI','UX','CV','PDF','PIMX','MA','EN','FA','AR','DE','FR','IT','ZH','RU','EL','LA','English','Français','Deutsch','Italiano','Latina','FA','JS','TS','RS','PY','PNG','JPG','JPEG','JWT','KV','C++','Git','Agno','Scrapling','Meta','Windows','Chrome','Next.js','Node.js','Tailwind CSS','SQLite','SQLAlchemy']);
function human(s){const letters=s.match(/\p{L}/gu)||[],latin=s.match(/[A-Za-z]/g)||[];return latin.length>0&&latin.length>=letters.length*.7&&!technical.has(s)&&!/^\s*(https?:|mailto:|tel:|\/|#|\.|\{|\[|var\(|rgb|inset\(|translate|rotate|scale|matrix)/.test(s)&&!s.includes('className')&&!s.includes('=>')&&!s.includes('@')&&!/^[\w.-]+\.(ts|tsx|js|css|jpg|png|webp|pdf|json|cjs)$/.test(s)&&!s.includes('github-')&&!s.startsWith('mra_')&&!s.startsWith('PIMX_')&&!/^[a-z]+(?:-[a-z0-9]+)+$/.test(s)&&((s.includes(' ')&&s.length>3)||(/^[A-Z]{3,}[.!?]?$/.test(s))||/^[A-Z][a-z]+[.!?]?$/.test(s));}
const locales=new Set(['fa','ar','de','fr','it','zh','ru','el','la']);
function otherLocale(node){for(let p=node.parent;p;p=p.parent)if(ts.isPropertyAssignment(p)&&locales.has(p.name.getText().replace(/['"]/g,'')))return true;return false;}
for(const file of files){const source=fs.readFileSync(file,'utf8'),ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('x')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 function collect(node){if(ts.isStringLiteral(node)&&human(node.text)&&!otherLocale(node))strings.add(node.text.trim());if(ts.isJsxText(node)){const text=node.getText().replace(/\s+/g,' ').trim();if(human(text))strings.add(text);}ts.forEachChild(node,collect);}collect(ast);
 if(collectOnly||!file.endsWith('.tsx')||file.includes('context')||file.endsWith('LanguageSelect.tsx'))continue;
 const edits=[],components=new Set();
 function owner(node){for(let p=node.parent;p;p=p.parent){if(ts.isFunctionDeclaration(p)&&p.name&&/^[A-Z]/.test(p.name.text)&&p.body)return p;if(ts.isArrowFunction(p)&&ts.isVariableDeclaration(p.parent)&&/^[A-Z]/.test(p.parent.name.getText())&&ts.isBlock(p.body))return p;}return null;}
 function visit(node){
  if(ts.isJsxText(node)&&human(node.getText().replace(/\s+/g,' ').trim())){const fn=owner(node);if(fn){const raw=node.getText(),text=raw.replace(/\s+/g,' ').trim();edits.push([node.getStart(ast),node.end,`{l(${JSON.stringify(text)})}`]);components.add(fn);}}
  if(ts.isJsxExpression(node)&&node.expression){const fn=owner(node),parent=node.parent;const attr=ts.isJsxAttribute(parent)?parent.name.getText():null;const readable=!attr||['aria-label','title','placeholder','text','label','alt','words'].includes(attr);if(fn&&readable){edits.push([node.expression.getStart(ast),node.expression.getStart(ast),'l(']);edits.push([node.expression.end,node.expression.end,')']);components.add(fn);}}
  if(ts.isStringLiteral(node)&&ts.isJsxAttribute(node.parent)&&['aria-label','title','placeholder','text','label','alt'].includes(node.parent.name.getText())&&human(node.text)){const fn=owner(node);if(fn){edits.push([node.getStart(ast),node.end,`{l(${JSON.stringify(node.text)})}`]);components.add(fn);}}
  ts.forEachChild(node,visit);
 }visit(ast);
 for(const component of components){const pos=component.body.getStart(ast)+1;edits.push([pos,pos,'\n  const l = useSiteText();']);}
 if(edits.length){edits.sort((a,b)=>b[0]-a[0]||b[1]-a[1]);let next=source;for(const[start,end,replacement]of edits)next=next.slice(0,start)+replacement+next.slice(end);const location=file.includes('components')||file.includes('pages')?'../lib/useSiteText':'./lib/useSiteText';next=`import { useSiteText } from '${location}';\n`+next;fs.writeFileSync(file,next);}
}
fs.writeFileSync('docs/localization-source.json',JSON.stringify([...strings].sort(),null,2));
console.log(`${strings.size} source phrases collected; JSX text localized without DOM mutations.`);
