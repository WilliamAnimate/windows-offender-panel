// its a tuesday.
// the executioner works on a tuesday.
var executioner; // variable will be assigned a value in initSummonRadioButtons
// im confident there is a datatype that does this 100 times better
// TODO: fixme
const powerTypes = [
    { entry: "power" },
    { atElement: "power" },
    { switch: "config" },
    { id: "normal", text: "Normal" },
    { id: "syscalls", text: "Syscall" },
    { id: "firmware", text: "Firmware" },
    { switch: "postconfig" },
    { id: "powerdown", text: "Power down" },
    { id: "reboot", text: "Reboot" },
    { id: "halt", text: "Halt" },
];

/**
 * init sequence: create all radioBtns as part of the const `radioBtns` in radio.js
 * @see powerTypes (part of radio.js)
 */
function initSummonRadioButtons(array) {
    let entry = array[0].entry;
    let atElement = array[1].atElement;
    __createTypesInArray(powerTypes);

    __createExecuteBtn(atElement, entry);
    executioner = document.getElementById("config_execute");
}

function __createTypesInArray(array) {
    // remove the first and second element; those are the entry and atElement entries
    array.shift();
    array.shift();
    let toGo;
    array.forEach(a => {
        if (a.switch) {
            console.debug(`changing toGo to ${a.switch}`);
            toGo = document.getElementById(a.switch);
        } else {
            __createCheckbox(a.id, a.text, toGo);
        }
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

function __createExecuteBtn(atElement, id) {
    console.log(atElement);
    let element = document.createElement("button");
    element.classList.add("block-centered");
    element.id = `${id}_executioner`;
    element.textContent = "execute";

    document.getElementById(atElement).appendChild(element);
    element.addEventListener("click", function(){onFormSubmit(id)});
}

function scanForCheckedInDiv(div) {
    let d = document.querySelector(`#${div}`);
    if (!div) {
        console.error(`div ${div} doesnt exist`);
        return;
    }

    let radios = d.querySelectorAll('input[type="radio"]:checked');
    console.log(radios);
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
