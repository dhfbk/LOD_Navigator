const {ipcRenderer} = require('electron')

$('.about').click(function () {
    show_about();
})


function show_about(){
    ipcRenderer.send('asynchronous-message', 'show-about');
}