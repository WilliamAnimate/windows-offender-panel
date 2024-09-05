// its a tuesday.
// the executioner works on a tuesday.
var executioner; // variable will be assigned a value in initSummonRadioButtons
// im confident there is a datatype that does this 100 times better
// TODO: fixme
const types = [
    { id: "normal", text: "normal" },
    { id: "syscalls", text: "syscall" },
    { id: "firmware", text: "firmware" },
];
const powerActions = [
    { id: "powerdown", text: "power down" },
    { id: "reboot", text: "reboot" },
    { id: "halt", text: "halt" },
]
const syscallsActions = [
    // this is a test, obviously.
    { id: "kebugcheck", text: "execute KeBugCheck" }
]
const formElement = document.getElementById("config");
const postFormElement = document.getElementById("postconfig");

function onRadioTypeChange(event) {
    id = event.target.id.replace("cfg_", "");

    console.warn(id);
    postFormElement.innerHTML = ""; // clear whatever is inside postFormElement
    switch (id) {
        case "firmware":
            __createTypesInArray(powerActions, postFormElement);
            break;
        case "syscalls":
            __createTypesInArray(syscallsActions, postFormElement);
            break;
        case "normal":
            console.error("TODO: HERE");
            break;
        default:
            console.error(`id ${id} is unimplemented`);
            break;
    }
}

/**
 * init sequence: create all radioBtns as part of the const `radioBtns` in radio.js
 * @see types (part of radio.js)
 */
function initSummonRadioButtons() {
    __createTypesInArray(types, formElement);

    __createExecuteBtn();
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
    input.addEventListener("change", onRadioTypeChange);
}

function __createExecuteBtn() {
    let element = document.createElement("button");
    element.id = "config_execute";
    element.textContent = "execute";

    formElement.appendChild(element);
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

/**
 * this function should only be called from html, as part of the onsubmit= attribute.
 * as such, if you want to call this from a js context, know that:
 * 1. you are making a huge mistake
 * 2. the code complexity will quadruple
 * @param {*} event optional variable lmao
 * @returns false (so the form does not submit)
 */
function onFormSubmit(event) {
    console.log(`form submitted: ${event}`);

    getCheckedRadioIds();
    assembleNetworkString();

    // dont you dare refresh the damn page!!!!!!
    return false;
}

function assembleNetworkString() {
    let checked = getCheckedRadioIds();
    if (checked.length == 0) {
        return null;
    }

    str = checked.join(".");

    console.log(str);
}
