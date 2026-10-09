import { useSiteText } from '../lib/useSiteText';
import { useEffect, useLayoutEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Check, ChevronDown, Code2 } from 'lucide-react';
import '../styles/project-language-select.css';

type Option = { value: string; label: string; count: number };
export default function ProjectLanguageSelect({ options, value, onChange, label, fa }: { options: Option[]; value: string; onChange: (value: string)=>void; label: string; fa: boolean }) {
  const l = useSiteText();
  const id=useId(), host=useRef<HTMLDivElement>(null), trigger=useRef<HTMLButtonElement>(null);
  const [open,setOpen]=useState(false),[active,setActive]=useState(0);
  const [above,setAbove]=useState(false);
  useLayoutEffect(()=>{
    if(!open || !host.current) return;
    const box=host.current.getBoundingClientRect();
    const headerBottom=document.querySelector('.shell-header')?.getBoundingClientRect().bottom || 80;
    const spaceBelow=innerHeight-box.bottom-14,spaceAbove=box.top-headerBottom-14;
    const opensAbove=spaceBelow<350 && spaceAbove>spaceBelow;
    setAbove(opensAbove);
    host.current.style.setProperty('--language-options-height',`${Math.max(90,Math.min(335,(opensAbove?spaceAbove:spaceBelow)-55))}px`);
  },[open]);
  const selected=options.findIndex(option=>option.value===value);
  const typeahead=useRef({text:'',time:0});
  useEffect(()=>{const outside=(event:PointerEvent)=>{if(!host.current?.contains(event.target as Node))setOpen(false);};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[]);
  useLayoutEffect(()=>{
    if(!open)return;
    const list=host.current?.querySelector<HTMLElement>('.project-language-options'),option=document.getElementById(`${id}-option-${active}`);
    if(!list || !option)return;
    const bounds=option.getBoundingClientRect(),viewport=list.getBoundingClientRect();
    if(bounds.top<viewport.top)list.scrollTop+=bounds.top-viewport.top;
    else if(bounds.bottom>viewport.bottom)list.scrollTop+=bounds.bottom-viewport.bottom;
  },[open,active,id]);
  const choose=(index:number)=>{onChange(options[index].value);setOpen(false);trigger.current?.focus({preventScroll:true});};
  const keydown=(event:KeyboardEvent<HTMLButtonElement>)=>{
    if(event.key==='Tab'){setOpen(false);return;}
    if(event.key==='Escape'){event.preventDefault();setOpen(false);return;}
    if(['Enter',' '].includes(event.key)){event.preventDefault();if(open)choose(active);else{setActive(Math.max(0,selected));setOpen(true);}return;}
    if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();const step=event.key==='ArrowDown'?1:-1;setActive(event.key==='Home'?0:event.key==='End'?options.length-1:open?(active+step+options.length)%options.length:Math.max(0,selected));setOpen(true);return;}
    if(event.key.length===1&&!event.ctrlKey&&!event.metaKey){event.preventDefault();const now=performance.now();typeahead.current.text=(now-typeahead.current.time<700?typeahead.current.text:'')+event.key.toLowerCase();typeahead.current.time=now;const next=options.findIndex(option=>option.label.toLowerCase().startsWith(typeahead.current.text));if(next>=0){setActive(next);setOpen(true);}}
  };
  return <div ref={host} className={`project-language-select ${open?'is-open':''} ${above?'opens-above':''}`} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setOpen(false);}}>
    <button ref={trigger} type="button" className="project-language-trigger" role="combobox" aria-label={l(label)} aria-expanded={open} aria-controls={`${id}-list`} aria-haspopup="listbox" aria-activedescendant={open?`${id}-option-${active}`:undefined} onKeyDown={keydown} onClick={()=>{setActive(Math.max(0,selected));setOpen(current=>!current);}}><Code2 size={16}/><span>{l(options[Math.max(0,selected)]?.label)}</span><ChevronDown size={14}/></button>
    {open && <div className="project-language-menu"><div className="project-language-menu-label"><span>{fa?'زبانِ ساخت':l('BUILT WITH')}</span><span>{options.length-1}</span></div><div id={`${id}-list`} role="listbox" aria-label={l(label)} className="project-language-options">{options.map((option,index)=><div role="option" id={`${id}-option-${index}`} key={option.value} aria-selected={option.value===value} className={`${index===active?'highlighted':''} ${option.value===value?'selected':''}`} onPointerMove={()=>setActive(index)} onPointerDown={event=>event.preventDefault()} onClick={()=>choose(index)}><span className="language-option-dot"/><span className="language-option-name">{l(option.label)}</span><small>{option.count}</small>{option.value===value&&<Check size={14}/>}</div>)}</div></div>}
  </div>;
}
