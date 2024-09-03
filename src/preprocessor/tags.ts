import { as_tag } from './code/tags/as'

let html_tags = {    
    as: {
        html: `<as></as>`,
        script: as_tag
    } 
}

let script_tags = {
}

// TODO
// Add custom snippets to the language plugin


export { html_tags, script_tags }