import https from 'node:https';

https.get('https://pimx.pages.dev', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Print lines containing skill-like keywords or just extract list elements/paragraphs
    console.log("=== FULL LENGTH ===", data.length);
    // Find all text or list elements, or sections
    const cleanText = data.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
                          .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
                          .replace(/<[^>]*>/g, '\n')
                          .split('\n')
                          .map(line => line.trim())
                          .filter(line => line.length > 0);
    
    // Print and filter
    console.log(JSON.stringify(cleanText, null, 2));
  });
});
