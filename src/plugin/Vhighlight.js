import Vue from 'vue'

import hljs from 'highlight.js'

import 'highlight.js/styles/monokai-sublime.css'

Vue.directive('highlight', function (el) {
    el.querySelectorAll('pre code').forEach((block) => { hljs.highlightBlock(block) })
})
