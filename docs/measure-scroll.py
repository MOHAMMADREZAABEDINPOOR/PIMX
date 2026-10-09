import json, os
from pathlib import Path
from playwright.sync_api import sync_playwright
base=os.environ.get('PORTFOLIO_TEST_URL','http://127.0.0.1:3000')
with sync_playwright() as pw:
 browser=pw.chromium.launch()
 page=browser.new_page(viewport={'width':1440,'height':900})
 page.goto(base,wait_until='networkidle');page.wait_for_timeout(1800)
 cdp=page.context.new_cdp_session(page);cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
 results=[]
 for run in range(3):
  page.evaluate('scrollTo(0,0)');page.wait_for_timeout(500)
  results.append(page.evaluate('''async () => {
   const times=[],tasks=[];let previous=performance.now();const start=previous;
   const observer=new PerformanceObserver(list=>tasks.push(...list.getEntries().map(e=>e.duration)));observer.observe({type:'longtask',buffered:false});
   await new Promise(resolve=>{function tick(now){times.push(now-previous);previous=now;const p=Math.min(1,(now-start)/4000);scrollTo(0,p*(document.documentElement.scrollHeight-innerHeight));if(p<1)requestAnimationFrame(tick);else resolve();}requestAnimationFrame(tick);});
   observer.disconnect();times.sort((a,b)=>a-b);
   return {frames:times.length,p95:Math.round(times[Math.floor(times.length*.95)]*100)/100,slowFrames:times.filter(n=>n>35).length,longTasks:tasks.length,longTaskMilliseconds:Math.round(tasks.reduce((a,b)=>a+b,0)),cards:document.querySelectorAll('.product-study').length};
  }'''))
 print(json.dumps(results));Path('docs/scroll-'+os.environ.get('MEASUREMENT','before')+'.json').write_text(json.dumps(results,indent=2))
 browser.close()
