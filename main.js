[...document.getElementsByClassName("icon-checkmark")].forEach(e => {
    e.innerHTML = icons.check
});

function onFormSubmit(where) {
    console.debug(where);
    let networkStr = scanForCheckedInDiv(where);
    if (networkStr.length <3) {
        console.warn("networkStr not 3!");
        return false;
    }
    console.log(networkStr)
    let network = networkStr.join(":");
    console.log(network);
    invokeRequest(network);

    return false;
}

function onInit() {
    initSummonRadioButtons(powerTypes);
    // console.error("s");
    // initSummonRadioButtons(processTypes);
    console.log("initialization all complete; everything seems okay.");
}

onInit();
