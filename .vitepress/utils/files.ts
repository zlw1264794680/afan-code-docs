import fs from 'fs'
import path from 'path'

// 获取当前路径下的全部文件、文件夹名，转行成sidebarItem菜单数据格式
export function getAllFiles(relativePath:string,linkPath:string){
  return getFilesDir(relativePath,'dir').filter(dir=>dir !== 'images').map(dir=>({
    text:dir,
    items:getFilesDir(`${relativePath}/${dir}`,'file').map(file=>({
      text:file,
      link:`${linkPath}/${dir}/${file}`
    }))
  }))
}

// 获取当前路径下的文件、文件夹名称
type Type = 'all' | 'dir' | 'file'
export function getFilesDir(dirPath: string,type:Type  = 'all',showSuffix:boolean = false,include:string[]=['md']) {
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
    } else if (type === 'all' || type === 'file' && include.some(suffix => file.includes(suffix))) {
      // 如果是文件，则将其加入到数组中
      const name = showSuffix ? file : getFileName(file)
      fileNames.push(name);
    }
  });

  return fileNames;
}

// 获取文件名，不包含后缀
export function getFileName(filePath:string) {
  const { name, ext } = path.parse(filePath);
  return name;
}
