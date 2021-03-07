import {
  exec
} from 'child_process'
import { app, ipcMain, shell } from 'electron'
import { unzip, PATCHLIST_PATH } from '../../utils'
import fs from 'fs'
import path from 'path'

ipcMain.on('write-file', (event, {
  filename,
  data
}) => {
  let result
  try {
    const filePath = path.join(process.cwd(), filename)
    console.log('write-file: ', filePath)
    fs.writeFileSync(filePath, data)
    result = filePath
  } catch (error) {
    console.error(error)
    result = JSON.stringify(error)
  }
  event.sender.send('write-file-result', result)
})

ipcMain.on('launch-exe', (event, {
  name,
  params
}) => {
  const exePath = path.join(process.cwd(), name)
  exec(exePath + params)
  event.sender.send('launch-exe-result', exePath)
})

ipcMain.on('open-link', (event, url) => {
  event.preventDefault()
  shell.openExternal(url)
})

ipcMain.on('launch-game', (event, {
  params
}) => {
  const exePath = path.join(process.cwd(), 'InphaseNXD.EXE')
  const command = `@start ${exePath} /USE_SERVER 1 /ADDR 210582139 /PORT 52000 ${params} exit`
  console.log('launch-game:', command)
  exec(command)
})

ipcMain.on('search-process', (event, params) => {
  exec('tasklist | findstr Code')
})

ipcMain.on('suicide', () => {
  dialog.showErrorBox(
    'Error',
    '检测到您开启了非法程序，游戏自动关闭，请关闭非法程序后重新启动游戏。'
  )
  app.quit()
})

ipcMain.on('alert', (event, {
  title,
  content
}) => {
  dialog.showErrorBox(title || 'Error', content || '运行错误')
})

ipcMain.on('unzip-patch', (event, { zipPath, latestTime }) => {
  unzip(zipPath, './').finally(() => {
    fs.unlinkSync(zipPath)
    fs.writeFileSync(PATCHLIST_PATH, latestTime)
    event.sender.send('unzipped-patch')
  })
})
