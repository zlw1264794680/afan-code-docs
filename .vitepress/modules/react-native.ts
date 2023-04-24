import { getAllFiles } from '.vitepress/utils/files'
import { SidebarConfig } from '@vue/theme/src/vitepress/config'

// link 匹配路径
const linkPath = '/front-end/react/react-native'
// 读取文件的相对路径
const relativePath = '../../src/front-end/react/react-native'

const sidebarItem:SidebarConfig = {
  [linkPath]:[
    {
      text:'React Native',
      items: [
        { text: '快速入门', link: `${linkPath}/index` },
      ]
    },
    ...getAllFiles(relativePath,linkPath)
  ]
}

export  default  sidebarItem
