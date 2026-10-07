import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import sql from 'highlight.js/lib/languages/sql'

hljs.registerLanguage('javascript', javascript)
hljs.registerAliases('jsx', { languageName: 'javascript' })
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('json', json)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('sql', sql)

// Configure highlight.js to handle JSX properly
hljs.configure({
  // Enable JSX highlighting within JavaScript
  languages: ['javascript', 'xml', 'bash', 'css', 'json', 'typescript', 'python', 'sql'],
  // Configure JSX to be treated as JavaScript with HTML-like syntax
  classPrefix: 'hljs-'
})

export default defineNuxtPlugin(() => {
  // Make highlight.js available globally
  if (process.client) {
    window.hljs = hljs
  }

  return {
    provide: {
      hljs
    }
  }
})
