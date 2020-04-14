const { app, BrowserWindow } = require('electron')

function createWindow () {   
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 1020,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
  //win.loadFile('build/index.html')
  win.loadURL('build/index.html')
}

app.on('ready', createWindow)