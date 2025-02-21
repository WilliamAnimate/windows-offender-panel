// im confident there is a datatype that does this 100 times better
// TODO: fixme
const powerTypes = [
    { entry: "powercontrol" },
    { atElement: "powercontrol" },
    { switch: "config" },
    { id: "normal", text: "Normal" },
    { id: "native", text: "Native" },
    { id: "firmware", text: "Firmware" },
    { id: "triplefault", text: "Triple Fault" },
    { switch: "postconfig" },
    { id: "poweroff", text: "Power down" },
    { id: "reboot", text: "Reboot" },
    { id: "halt", text: "Halt" },
];

// const rfpowerTypes = [
//     { entry: "powercontrol" },
//     { atElement: "powercontrol" },
//     { switch: "config" },
//     { id: "normal", text: "Normal" },
// ];

const processTypes = [
    { entry: "process_termination" },
    { atElement: "process_termination" },
    { switch: "process_termination" },
    { id: "pidInput", inputPlaceholders: "PID" },
]

/**
 * init sequence: create all radioBtns as part of the const `radioBtns` in radio.js
 * @see powerTypes (part of radio.js)
 */
function initSummonRadioButtons(array) {
    let entry = array[0].entry;
    let atElement = array[1].atElement;
    __createTypesInArray(powerTypes);

    __createExecuteBtn(atElement, entry);
}

function __createTypesInArray(array) {
    // remove the first and second element; those are the entry and atElement entries
    array.shift();
    array.shift();
    let toGo;
    array.forEach(a => {
        console.log(a);
        // yanderedev, activate!
        if (a.switch) {
            console.debug(`changing toGo to ${a.switch}`);
            toGo = document.getElementById(a.switch);
        } else if (a.inputPlaceholders) {
            console.log("wtf");
            __createInputbox(a.id, a.processTypes, toGo);
        } else if (a.text) {
            console.log("cringe");
            __createCheckbox(a.id, a.text, toGo);
        } else {
            console.log("none");
        }
    });
}

function __createInputbox(id, text, createOn = Element) {
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", id);
    input.setAttribute("placeholder", text);

    createOn.appendChild(input);
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
    element.textContent = "Execute";

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
