import fs from 'fs'
import path from 'path'
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
import { getCurFile, getCurDir } from './utils/files'
import flexSearchIndexOptions from "flexsearch";

// 转换成sidebarItem数据格式
export function formatSidebarItem(text:string,absPath:string,linkPath:string){
  const files = getCurFile(absPath)
  return {
    text:text,
    items:files.map(file=> (
      {
        text:file,
        // link:`${linkPath}/${file}`
        link:path.join(linkPath,file)
      }
    ))
  }
}
// 转换成sidebarItem数据格式列表
export function formatSidebarList(absPath:string,linkPath:string){
  return getCurDir(absPath).filter(dirName=>dirName !== 'images').reduce((arr:any[],dirName)=> {
    // arr.push(formatSidebarItem(dirName,`${absPath}/${dirName}`,`${linkPath}/${dirName}`))
    arr.push(formatSidebarItem(dirName,path.join(absPath,dirName),path.join(linkPath,dirName)))
    return arr
  },[])
}

const nav: ThemeConfig['nav'] = [
  {
    text: '前端',
    activeMatch: `^/front-end/`,
    items: [
      {
        text: 'VitePress',
        link: '/front-end/vitepress/快速入门',
      },
      {
        text: 'React',
        activeMatch: '^/react/',
        items:[
          {
            text: 'React Native',
            link: '/front-end/react/react-native/快速入门',
          }
        ]
      },
      {
        text: 'Node',
        items:[
          {
            text: 'Node',
            link: '/front-end/node/快速入门',
          }
        ]
      }
    ]
  },
  {
    text: 'Git',
    link: '/git/快速入门',
  },
  {
    text: 'Other',
    link: '/other/高效学习',
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/front-end/vitepress/':[
    {
      text:'VitePress',
      items: [
        { text: '快速入门', link: '/front-end/vitepress/快速入门' },
        { text: '搭建知识库', link: '/front-end/vitepress/搭建知识库' }
      ]
    }
  ],
  '/front-end/react/react-native/':[
    formatSidebarItem('React Native',path.resolve(__dirname,'../src/front-end/react/react-native'),'/front-end/react/react-native'),
    ...formatSidebarList(path.resolve(__dirname,'../src/front-end/react/react-native'),'/front-end/react/react-native')
  ],
  '/front-end/node/':[
    formatSidebarItem('Node',path.resolve(__dirname,'../src/front-end/node'),'/front-end/node'),
    ...formatSidebarList(path.resolve(__dirname,'../src/front-end/node'),'/front-end/node')
  ],
  '/git/':[
    formatSidebarItem('Git',path.resolve(__dirname,'../src/git'),'/git'),
    ...formatSidebarList(path.resolve(__dirname,'../src/git'),'/git'),
  ],
  '/other/':[
    formatSidebarItem('Other',path.resolve(__dirname,'../src/other'),'/other'),
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
    plugins: [
      SearchPlugin({
        ...flexSearchIndexOptions,
        previewLength: 62,
        buttonLabel: "搜索",
        placeholder: "搜索文档",
        allow: [],
        ignore: [],
      })
    ],
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
