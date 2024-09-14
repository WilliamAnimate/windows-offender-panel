// its a tuesday.
// the executioner works on a tuesday.
var executioner; // variable will be assigned a value in initSummonRadioButtons
// im confident there is a datatype that does this 100 times better
// TODO: fixme
const types = [
    { id: "normal", text: "Normal" },
    { id: "syscalls", text: "Syscall" },
    { id: "firmware", text: "Firmware" },
];
const powerActions = [
    { id: "powerdown", text: "Power down" },
    { id: "reboot", text: "Reboot" },
    { id: "halt", text: "Halt" },
]
const syscallsActions = [
    // this is a test, obviously.
    { id: "kebugcheck", text: "execute KeBugCheck" }
]
const formElement = document.getElementById("config");
const postFormElement = document.getElementById("postconfig");

/**
 * init sequence: create all radioBtns as part of the const `radioBtns` in radio.js
 * @see types (part of radio.js)
 */
function initSummonRadioButtons() {
    __createTypesInArray(types, formElement);
    __createTypesInArray(powerActions, postFormElement);

    __createExecuteBtn("powercontrol"); // TODO: modularify
    executioner = document.getElementById("config_execute");
}

function __createTypesInArray(array, typesArea = Element) {
    array.forEach(a => {
        __createCheckbox(a.id, a.text, typesArea);
    });
}

function __createCheckbox(id, text, createOn = Element) {
    let div = document.createElement("div");
    div.classList.add("flex-column-inline");

    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("id", `cfg_${id}`);
    input.setAttribute("name", "group");
    input.setAttribute("value", `cfg_${id}`);

    let label = document.createElement("label");
    label.setAttribute("for", `cfg_${id}`);
    label.textContent = text;

    createOn.appendChild(div);
    div.appendChild(input);
    div.appendChild(label);
}

function __createExecuteBtn(atElement) {
    let element = document.createElement("button");
    element.classList.add("block-centered");
    element.id = "config_execute";
    element.textContent = "execute";

    document.getElementById(atElement).appendChild(element);
    // FIXME: make this modular
    element.addEventListener("click", function(){onFormSubmit("power")});
}

function scanForCheckedInDiv(div) {
    let d = document.querySelector(`#${div}`);
    if (!div) {
        console.error(`div ${div} doesnt exist`);
        return;
    }

    let radios = d.querySelectorAll('input[type="radio"]:checked');
    let checked = [];
    checked.push(div);
    radios.forEach(radio => {
        let r = radio.id.replace("cfg_", "");
        console.log(r);
        checked.push(r);
    });

    return checked;
}

function getCheckedRadioIds() {
    const selectedRadio = document.querySelectorAll('input[type="radio"]:checked');

    let ret = [];
    [...selectedRadio].forEach(selectedRadio => {
        console.log(`internal id: ${selectedRadio.id.replace("cfg_", "")}`)
        ret.push(selectedRadio.id.replace("cfg_", ""));
    })
    console.log(ret);

    return ret;
}

function radio_onFormSubmit(event) {
    console.log(`form submitted: ${event}`);

    getCheckedRadioIds();
    s = assembleNetworkString();
    invokeRequest(s);

    return false;
}

function assembleNetworkString() {
    let checked = getCheckedRadioIds();
    if (checked.length == 0) {
        return null;
    }

    let str2 = checked.join(":");
    let str = "powercontrol:" + str2;

    console.log(str);
    return str;
}
