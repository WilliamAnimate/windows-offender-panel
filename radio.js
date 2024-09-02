// its a tuesday.
// the executioner works on a tuesday.
var executioner; // variable will be assigned a value in initSummonRadioButtons
const radioBtns = [
    { id: "shutdowns", text: "Shut down the computer" },
    { id: "reboot", text: "Reboot the computer" },
];
const formElement = document.getElementById("config");

/**
 * init sequence: create all radioBtns as part of the const `radioBtns` in radio.js
 * @see radioBtns (part of radio.js)
 */
function initSummonRadioButtons() {
    radioBtns.forEach(radio => {
        __createCheckbox(radio.id, radio.text);
    });

    __createExecuteBtn();
    executioner = document.getElementById("config_execute");
}

function __createCheckbox(id, text) {
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("id", `cfg_${id}`);
    input.setAttribute("name", "group");
    input.setAttribute("value", `cfg_${id}`);

    let label = document.createElement("label");
    label.setAttribute("for", `cfg_${id}`);
    label.textContent = text;

    formElement.appendChild(input);
    formElement.appendChild(label);
}

function __createExecuteBtn() {
    let element = document.createElement("button");
    element.innerHTML = '<button id="config_execute">execute</button>';

    formElement.appendChild(element);
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

    const selectedRadio = document.querySelector('input[type="radio"]:checked');

    if (selectedRadio) {
        console.log(`Selected: ${selectedRadio.value}`);
    } else {
        console.log("no radio button selected");
    } 

    // dont you dare refresh the damn page!!!!!!
    return false;
}
