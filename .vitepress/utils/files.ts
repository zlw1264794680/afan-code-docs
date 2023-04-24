import fs from 'fs'
import path from 'path'

// 获取当前路径下的文件夹
export function getCurDir(relativePath:string){
  return getFilesDir(relativePath,{
    type:'dir'
  })
}
// 获取当前路径下的文件，没有后缀，只处理md文件
export function getCurFile(relativePath:string){
  return getFilesDir(relativePath,{
    type:'file',
    include:['md'],
    showSuffix:false
  })
}

// 获取当前路径下的文件、文件夹名称
type Type = 'all' | 'dir' | 'file'
interface IOptions {
  type?:Type;
  showSuffix?: boolean;
  include?:string[];
}
export function getFilesDir(absPath: string,{
  type  = 'all',
  showSuffix = true,
  include= [],
}:IOptions) {
  const files = fs.readdirSync(absPath);

  let fileNames: string[] = [];

  // 遍历文件夹下的文件和子文件夹
  files.forEach(function(file) {
    const fullPath = path.resolve(absPath, file);

    if ((type === 'all' || type === 'dir') && fs.statSync(fullPath).isDirectory()) {
      // 如果是子文件夹，则将其加入到数组中
      fileNames.push(file);
    } else if (type === 'all' || type === 'file' && (!include?.length || include.some(suffix => file.includes(suffix)))) {
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
