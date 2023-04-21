import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: '前端',
    activeMatch: `^/front-end/`,
    items: [
      {
        text: 'VitePress',
        link: '/front-end/vitepress/index',
        activeMatch: '^/vitepress/',
      },
      {
        text: 'React',
        activeMatch: '^/react/',
        items:[
          {
            text: 'React Native',
            link: '/front-end/react/react-native/index',
          }
        ]
      },
      {
        text: 'Node',
        activeMatch: '^/node/',
        items:[
          {
            text: 'Node',
            link: '/front-end/node/index',
          }
        ]
      }
    ]
  },
  {
    text: 'git',
    activeMatch: `^/git/`,
    link: '/git/index',
  },
  {
    text: 'other',
    activeMatch: `^/other/`,
    link: '/other/高效学习',
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/front-end/vitepress/':[
    {
      text:'VitePress',
      items: [
        { text: '快速入门', link: '/front-end/vitepress/index' },
        { text: '搭建知识库', link: '/front-end/vitepress/搭建知识库' }
      ]
    }
  ],
  '/front-end/react/react-native/':[
    {
      text:'React Native',
      items: [
        { text: '快速入门', link: '/front-end/react/react-native/index' },
      ]
    }
  ],
  '/front-end/node/':[
    {
      text:'Node',
      items: [
        { text: '快速入门', link: '/front-end/node/index' },
        { text: 'node版本管理工具', link: '/front-end/node/node版本管理工具' },
      ]
    }
  ],
  '/git/':[
    {
      text: '快速入门',
      link: '/git/index',
    },
    {
      text: 'git配置ssh',
      link: '/git/git配置ssh',
    },
    {
      text: '.gitignore失效',
      link: '/git/.gitignore失效',
    }
  ],
  '/other/':[
    {
      text: '高效学习',
      link: '/git/高效学习',
    },
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  lang: 'zh-CN',
  title: '阿饭',
  description: '阿饭的编程知识库，用于系统整理、学习、复习',
  srcDir: 'src',
  head: [
    ['meta', { name: 'theme-color', content: '#0984e3' }],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
  ],
  themeConfig: {
    nav,
    sidebar,
    editLink: {
      repo: 'vuejs/docs',
      text: 'Edit this page on GitHub'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} Evan You`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  }
})
