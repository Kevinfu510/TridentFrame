const remote = require("electron").remote;
const session = remote.getCurrentWebContents().session;

let create_menu = document.getElementById('create_menu');
let create_box = document.getElementById('create_box');
let split_menu = document.getElementById('split_menu');
let split_box = document.getElementById('split_box')
let create_panel = document.getElementById('create_panel');
let split_panel = document.getElementById('split_panel');

let minimize_button = document.getElementById('minimize_button');
let exit_button = document.getElementById('exit_button');
let display_panel = document.getElementById('display_panel');

// window.addEventListener("load", show_create_panel);

function hideAll() {
    create_panel.style.display = 'none';
    split_panel.style.display = 'none';
}
function unselect_all_menus() {
    create_box.classList.remove('is-selected');
    split_box.classList.remove('is-selected');
}
function show_create_panel() {
    console.log("create called")
    hideAll();
    unselect_all_menus();
    create_box.classList.add('is-selected');
    create_panel.style.display = 'block';
    session.clearStorageData(['appcache', 'cookies', 'filesystem', 'indexdb', 'localstorage', 'shadercache', 'websql', 'serviceworkers', 'cachestorage']);
}
function show_split_panel() {
    console.log("split called");
    hideAll();
    unselect_all_menus();
    split_box.classList.add('is-selected');
    split_panel.style.display = 'block';
    session.clearStorageData(['appcache', 'cookies', 'filesystem', 'indexdb', 'localstorage', 'shadercache', 'websql', 'serviceworkers', 'cachestorage']);
}


minimize_button.addEventListener("click", () => {
    var window = remote.getCurrentWindow();
    window.minimize();
});

exit_button.addEventListener("click", () => {
    var window = remote.getCurrentWindow();
    window.close();
});

create_menu.addEventListener('click', show_create_panel);
split_menu.addEventListener('click', show_split_panel);