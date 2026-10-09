import { useEffect, useLayoutEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Globe2 } from 'lucide-react';
import { languagesInfo, type LanguageType } from '../lib/translations';
import '../styles/language-select.css';

const languageLabels: Record<LanguageType, string> = { en:'Choose language', fa:'انتخاب زبان', ar:'اختيار اللغة', de:'Sprache wählen', fr:'Choisir la langue', it:'Scegli la lingua', zh:'选择语言', ru:'Выбрать язык', el:'Επιλογή γλώσσας', la:'Linguam eligere' };
const options = Object.entries(languagesInfo) as [LanguageType, typeof languagesInfo.en][];

/** Native language names remain recognizable regardless of the current UI language. */
export default function LanguageSelect({ value, onChange, label, compact = false, id, onOpen }: { value: LanguageType; onChange: (value: LanguageType) => void; label?: string; compact?: boolean; id?: string; onOpen?:()=>void }) {
  const uid = useId(), listId = `${uid}-languages`;
  const host = useRef<HTMLDivElement>(null), trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const [active, setActive] = useState(options.findIndex(([code]) => code === value));
  const typeahead = useRef({ text:'', time:0 });
  const choose = (index: number) => { onChange(options[index][0]); setOpen(false); trigger.current?.focus({preventScroll:true}); };
  const openPicker = () => {
    if (!open) {
      onOpen?.();
      setActive(options.findIndex(([code]) => code === value));
      setOpen(true);
    }
  };
  useLayoutEffect(() => {
    if(!open || !host.current)return;
    const position = () => {
      const element=host.current, panel=element?.querySelector<HTMLElement>('.language-picker-panel');
      if(!element || !panel)return;
      const bounds=element.getBoundingClientRect(), below=innerHeight-bounds.bottom-24, top=bounds.top-24;
      const upward=!compact && below<480 && top>below;
      setAbove(upward);
      const available=compact && innerWidth<=400 ? innerHeight-87 : upward?top:below;
      element.style.setProperty('--picker-height',`${Math.max(60,Math.min(430,available-54))}px`);
      element.style.setProperty('--picker-shift-x','0px');
      const panelBounds=panel.getBoundingClientRect();
      const shift=panelBounds.left<12 ? 12-panelBounds.left : panelBounds.right>innerWidth-12 ? innerWidth-12-panelBounds.right : 0;
      element.style.setProperty('--picker-shift-x',`${shift}px`);
    };
    position();
    window.addEventListener('resize',position);
    window.addEventListener('scroll',position,{passive:true});
    return()=>{window.removeEventListener('resize',position);window.removeEventListener('scroll',position);};
  },[open,compact]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!host.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  useEffect(() => { setOpen(false); setActive(options.findIndex(([code]) => code === value)); }, [value]);
  useLayoutEffect(() => {
    if(!open)return;
    const list=host.current?.querySelector<HTMLElement>('.language-picker-options');
    const option=list?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if(!list || !option)return;
    const bounds=option.getBoundingClientRect(), viewport=list.getBoundingClientRect();
    if(bounds.top<viewport.top)list.scrollTop+=bounds.top-viewport.top;
    else if(bounds.bottom>viewport.bottom)list.scrollTop+=bounds.bottom-viewport.bottom;
  },[active,open]);
  return <div ref={host} className={`language-picker ${compact ? 'language-picker-compact' : ''} ${above?'opens-above':''}`}>
    <button ref={trigger} id={id} type="button" className="language-picker-trigger" role="combobox" aria-expanded={open} aria-controls={listId} aria-haspopup="listbox" aria-label={label || languageLabels[value]} aria-activedescendant={open ? `${listId}-${active}` : undefined} onClick={() => {setActive(options.findIndex(([code]) => code === value));if(!open)onOpen?.();setOpen(!open);}} onKeyDown={event => {
      if (event.key === 'Tab') {setOpen(false);return;}
      if (event.key === 'Escape') {event.preventDefault();setOpen(false);return;}
      if (event.key === 'Enter' || event.key === ' ') {event.preventDefault();if(open)choose(active);else openPicker();return;}
      if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {event.preventDefault();openPicker();if(open || event.key==='Home' || event.key==='End')setActive(previous => event.key === 'Home' ? 0 : event.key === 'End' ? options.length-1 : (previous + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);return;}
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {const now=performance.now();typeahead.current.text=(now-typeahead.current.time<700?typeahead.current.text:'')+event.key.toLocaleLowerCase();typeahead.current.time=now;const found=options.findIndex(([code,info])=>[code,info.name,info.nativeName].some(text=>text.toLocaleLowerCase().startsWith(typeahead.current.text)));if(found>=0){event.preventDefault();openPicker();setActive(found);}}
    }}>
      {!compact && <Globe2 size={16} aria-hidden="true"/>}<span lang={value} dir={languagesInfo[value].dir}>{compact ? value.toUpperCase() : languagesInfo[value].nativeName}</span><ChevronDown size={13} aria-hidden="true" className={open?'is-open':''}/>
    </button>
    {open && <div className="language-picker-panel" dir="ltr"><div className="language-picker-heading"><Globe2 size={15}/><span>{label || languageLabels[value]}</span><span>10</span></div><div id={listId} role="listbox" aria-label={label || languageLabels[value]} className="language-picker-options">{options.map(([code,info],index)=><div id={`${listId}-${index}`} key={code} role="option" aria-selected={code===value} data-index={index} className={`language-picker-option ${active===index?'is-focused':''}`} onPointerMove={()=>setActive(index)} onPointerDown={event=>event.preventDefault()} onClick={()=>choose(index)}><span className="language-picker-code">{code.toUpperCase()}</span><span className="language-picker-name" lang={code} dir={info.dir}>{info.nativeName}</span>{code===value?<Check size={15} aria-hidden="true"/>:<span className="language-picker-point"/>}</div>)}</div></div>}
  </div>;
}
