/** Run: npx tsx docs/verify-project-artwork.ts */
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { getTranslatedProjects } from '../src/lib/project_translations';
import DedicatedProjectArt, { hasDedicatedArtwork } from '../src/components/DedicatedProjectArt';
import { projectScreenshots } from '../src/lib/project_visuals';

const projects = getTranslatedProjects('en');
const missing: string[] = [], duplicateGeometry: string[][] = [], duplicatePhotos: string[][] = [];
const geometry = new Map<string,string>(), photos = new Map<string,string>();
const fingerprint = (data: string | Buffer) => crypto.createHash('sha256').update(data).digest('hex');
for(const project of projects) {
  if(projectScreenshots[project.id]) {
    const file = `public${projectScreenshots[project.id]}`;
    if(!fs.existsSync(file)) { missing.push(project.id); continue; }
    const signature = fingerprint(fs.readFileSync(file));
    if(photos.has(signature)) duplicatePhotos.push([project.id,photos.get(signature)!]);
    photos.set(signature,project.id);
  } else {
    if(!hasDedicatedArtwork(project.id)) { missing.push(project.id); continue; }
    const markup = renderToStaticMarkup(React.createElement('svg',{viewBox:'0 0 960 640'},React.createElement(DedicatedProjectArt,{id:project.id})));
    // Names and captions cannot make identical drawings count as unique.
    const signature = fingerprint(markup.replace(/<text[\s\S]*?<\/text>/g,'').replace(/data-composition="[^"]*"/g,''));
    if(geometry.has(signature)) duplicateGeometry.push([project.id,geometry.get(signature)!]);
    geometry.set(signature,project.id);
  }
}
const order = projects.map(project=>({id:project.id,screenshot:!!projectScreenshots[project.id]}));
const firstDrawing = order.findIndex(project=>!project.screenshot);
const correctlyOrdered = !order.slice(firstDrawing).some(project=>project.screenshot);
const result = {projects:projects.length,photos:photos.size,drawings:geometry.size,missing,duplicateGeometry,duplicatePhotos,correctlyOrdered,order};
fs.mkdirSync('docs/ui-refinement-review',{recursive:true});
fs.writeFileSync('docs/ui-refinement-review/artwork-audit.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({...result,order:undefined},null,2));
if(missing.length || duplicateGeometry.length || duplicatePhotos.length || !correctlyOrdered) process.exitCode=1;
