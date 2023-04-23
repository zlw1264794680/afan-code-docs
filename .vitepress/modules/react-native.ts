import fs from 'fs'
import path from 'path'
import { SidebarConfig } from '@vue/theme/src/vitepress/config'
const rootPath = '/front-end/react/react-native'
const relativePath = '../../src/front-end/react/react-native'
// 获取当前路径下的文件、文件夹名称
function getFilesInDir(dirPath: string,type:string  ='all') {
  // 得到绝对路径
  const absPath = path.join(__dirname, dirPath);
  const files = fs.readdirSync(absPath);

  let fileNames: string[] = [];

  // 遍历文件夹下的文件和子文件夹
  files.forEach(function(file) {
    const fullPath = path.join(absPath, file);

    if ((type === 'all' || type === 'dir') && fs.statSync(fullPath).isDirectory()) {
      // 如果是子文件夹，则将其加入到数组中
      fileNames.push(file);
    } else if (type === 'all' || type === 'file') {
      // 如果是文件，则将其加入到数组中
      fileNames.push(file);
    }
  });

  return fileNames;
}

const data = getFilesInDir(relativePath,'dir').map(dir=>({
  text:dir,items:getFilesInDir(`${relativePath}/${dir}`,'file').map(file=>({
    text:file,
    link:`${rootPath}/${dir}/${file}`
  }))
}))
const sidebarItem:SidebarConfig = {
  [rootPath]:[
    {
      text:'React Native',
      items: [
        { text: '快速入门', link: `${rootPath}/index` },
      ]
    },
    ...data
  ]
}

export  default  sidebarItem
