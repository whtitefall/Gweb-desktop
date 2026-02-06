const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('graphNoteDesktop', {
  platform: process.platform,
})
