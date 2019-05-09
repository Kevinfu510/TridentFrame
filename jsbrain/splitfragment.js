console.log('splitfragment.js loaded!');
const { dialog } = require('electron').remote
const { client } = require("./renderer.js");

let open_aimg_button = document.querySelector('#open_aimg_button')
let clear_aimg_button = document.querySelector('#clear_aimg_button')
let target_dir_button = document.querySelector('#target_dir_button')
let split_button = document.querySelector('#split_button')

let image_stage = document.querySelector('#image_stage')
let image_path = document.querySelector('#image_path')

let target_path = document.querySelector('#target_path')

let info_header = document.querySelector('#info_header')
let aimg_name = document.querySelector('#aimg_name')
let aimg_dimens = document.querySelector('#aimg_dimens')
let aimg_file_size = document.querySelector('#aimg_file_size')
let aimg_frame_count = document.querySelector('#aimg_frame_count')
let aimg_fps = document.querySelector('#aimg_fps')
let aimg_duration = document.querySelector('#aimg_duration')

let td_message_box = document.querySelector('#td_message_box')


let extension_filters = [
    { name: 'Images', extensions: ['png', 'gif'] },
]

let file_dialog_props = ['openfile']
let dir_dialog_props = ['openDirectory', 'createDirectory']


// function registerListeners() {
//     open_aimg_button.addEventListener("click", openImage);
//     console.log("registerListener called");
// }

open_aimg_button.addEventListener("click", () => {
    var chosen_path = dialog.showOpenDialog({ filters: extension_filters, properties: file_dialog_props })
    console.log(`chosen path: ${chosen_path}`)
    if (chosen_path === undefined) {return}
    client.invoke("inspect_image", chosen_path[0], (error, res) => {
        if (error) {
            console.error(error)
            msg_error(error);
        } else {
            console.log(res)
            aimg_name.innerHTML = res.name
            info_header.innerHTML = `${res.extension} Information`
            aimg_file_size.innerHTML = `${res.fsize}`
            aimg_frame_count.innerHTML = res.frame_count
            aimg_fps.innerHTML = res.fps
            aimg_dimens.innerHTML = `${res.width} x ${res.height}`
            aimg_duration.innerHTML = `${res.loop_duration} seconds`
            image_stage.src = res.absolute_url
            image_path.value = res.absolute_url
            msg_clear();
        }
    })
    console.log('registered!');
});

clear_aimg_button.addEventListener('click', () => {
    aimg_name.innerHTML = '-'
    info_header.innerHTML = 'Information'
    aimg_file_size.innerHTML = '-'
    aimg_frame_count.innerHTML = '-'
    aimg_fps.innerHTML = '-'
    aimg_dimens.innerHTML = '-'
    aimg_duration.innerHTML = '-'
    image_stage.src = ''
    image_path.value = ''
    msg_clear();
});

target_dir_button.addEventListener('click', () => {
    var choosen_dir = dialog.showOpenDialog({ properties: dir_dialog_props });
    console.log(`Chosen dir: ${choosen_dir}`);
    if (choosen_dir === undefined) {return}
    target_path.innerHTML = choosen_dir;
    msg_clear();
});

function activate_buttons () {
    open_aimg_button.classList.remove('is-static')
    clear_aimg_button.classList.remove('is-static')
    target_dir_button.classList.remove('is-static')

}

function deactivate_buttons () {
    open_aimg_button.classList.add('is-static')
    clear_aimg_button.classList.add('is-static')
    target_dir_button.classList.add('is-static')
}

split_button.addEventListener('click', () => {
    msg_clear();
    deactivate_buttons();
    split_button.classList.add("is-loading");
    var img_path = image_path.value;
    var out_path = target_path.innerHTML;
    console.log(`${image_path} ${out_path}`);
    client.invoke('split_image', img_path, out_path, (error, res) => {
        if (error || !res){
            console.log(error);
            msg_error(error);
        } else {
            if (res){
                msg_success('GIF splitted successfully!!1 Check the output directory');
            }
        }
        split_button.classList.remove('is-loading');
        activate_buttons();
    })
});

function msg_clear() {
    td_message_box.classList.remove('has-text-danger');
    td_message_box.innerHTML = '';
}

function msg_error(text) {
    td_message_box.classList.add('has-text-danger');
    td_message_box.innerHTML = text;
}

function msg_success(text) {
    td_message_box.classList.add('has-text-success');
    td_message_box.innerHTML = text;
}

// module.exports.registerListeners = registerListeners;