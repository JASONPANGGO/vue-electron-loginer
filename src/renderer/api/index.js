const { app } = require('electron')
const path = require('path')
const fs = require('fs')

function writeFile (filename, data) {
  try {
    const appPath = getAppPath()
    console.log(appPath)
    const filePath = path.join(appPath, filename)
    fs.writeFileSync(filePath, data)
    return filePath
  } catch (error) {
    return 'error: ' + JSON.stringify(error)
  }
}

function getAppPath () {
  const appPath = app.getAppPath()
  return appPath
}

export default {
  writeFile,
  getAppPath
}
