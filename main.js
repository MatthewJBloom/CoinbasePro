// Modules to control application life and create native browser window
const {app, BrowserWindow, Notification} = require('electron')
const path = require('path')
// Custom Classes
const CoinbaseProFeed = require('./src/CoinbaseProFeed')
const NotificationManager = require('./src/NotificationManager')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // Start the CoinbasePro Websocket Feed
  let coin_id = "BTC"
  const feed = new CoinbaseProFeed()
  feed.start()

  // Test add new notification with notification manager
  const notificationManager = new NotificationManager()
  notificationManager.listen(feed.priceEvents)
  feed.priceEvents.once('price', (price) => {
    console.log(`current price is $${price}`)
    notificationManager.newNotification(coin_id, price-10).then(notification => {
      console.log(`notification waiting for ${price-10}`)
    })
    notificationManager.newNotification(coin_id, price+10).then(notification => {
      console.log(`notification waiting for ${price+10}`)
    })
  })


})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
