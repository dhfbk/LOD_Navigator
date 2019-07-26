/**
 * Created by giovannimoretti on 21/09/16.
 */
const electron = require('electron');
const {app, ipcMain, BrowserWindow} = electron;
const fs = require('fs');
var os = require('os');
const path = require('path');
const autoUpdater = require('electron').autoUpdater;


if (require('electron-squirrel-startup')) return;


if (handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}


ipcMain.on('exit_app', (event, arg) => {
    app.quit();
})



function handleSquirrelEvent() {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);



    const spawn = function (command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
        } catch (error) {
        }

        return spawnedProcess;
    };

    const spawnUpdate = function (args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            app.quit();
            return true;
    }
};


function checkupdate() {
    var platform = os.platform() + '_' + os.arch();  // usually returns darwin_64
    var version = app.getVersion();

    try {
        if (platform.includes('darwin') || platform.includes('osx')) {
            autoUpdater.setFeedURL('http://dhlab.fbk.eu:50002/update?version=' + version + '&platform=osx');
        } else {
            autoUpdater.setFeedURL('http://dhlab.fbk.eu:50002/update/win32/' + version);
        }
    }catch (err){
        console.log("Update server unreachable")
    }
    setTimeout(() => {
        try {
            autoUpdater.checkForUpdates();
        } catch (err) {
            console.log("Something wrong with updates")
        }
    }, 30000)
}





global.userData = app.getPath('userData');

global.data_path = path.join(app.getPath('userData'), 'data.json');

global.app_version = app.getVersion();

global.use_external = false;

if (fs.existsSync(global.data_path)) {
    console.log('Read external file')
    global.data_path = 'data.json' // added in shoa
    global.use_external = false; // modded in shoa
} else {
    global.data_path = 'data.json'
    console.log('Use internal data')
}










app.on('ready', function () {

    var screenElectron = electron.screen;
    var screen_width = screenElectron.getPrimaryDisplay().workArea.width;
    var screen_height = screenElectron.getPrimaryDisplay().workArea.height;


    try {
       // checkupdate();
    } catch (err) {
        console.log("Something wrong with updates")
    }

    /*
     const refreshKey = globalShortcut.register('Command+R', () => {
     console.log('Refresh')
     })
     */

    var aboutWin = null;


    let win = new BrowserWindow({
        width: screen_width - parseInt(screen_width/10),
        height: screen_height - parseInt(screen_height/10),
        resizable: true,
        title: 'RambleOn',
        webPreferences: {
            devTools: true
        },
        icon: './RambleOn.png'
    });
    win.loadURL(`file://${__dirname}/main.html`)
  //  win.webContents.openDevTools();
    ipcMain.on('asynchronous-message', (event, arg) => {


        if (arg == 'show-about') {

            if (aboutWin == null) {
                aboutWin = new BrowserWindow({
                    width: 400,
                    height: 505,
                    show: false,
                    resizable: false,
                    webPreferences: {
                        devTools: false
                    }
                })
                aboutWin.loadURL(`file://${__dirname}/about.html`)
                aboutWin.on('closed', () => {
                    aboutWin = null
                })
            }

            aboutWin.show();
            return event.returnValue;
        }
    })

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform != 'darwin') {

    app.quit();


    // }
});
