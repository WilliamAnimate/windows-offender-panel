// js can eat shit
// fetch('footer.html')
//     .then(response=>response.text())
//     .then(text=>document.getElementById('footer')
//     .innerHTML=text);

// why the fuck i need [...] in js
// worst "language" ever
// rust better
// c better
// go better
// zig better
// literally java better
[...document.getElementsByClassName("icon-checkmark")].forEach(e => {
    e.innerHTML = icons.check
});

function onFormSubmit(where) {
    // if (typeof(where) != String) {
    //     console.error(`typeof(where) != string: typeof(where): ${typeof(where)}, where: ${where}`);
    //     return false;
    // }
    console.debug(where);
    let networkStr;
    switch (where) {
        case "power":
            networkStr = scanForCheckedInDiv("power");
            break;
        default:
            console.error(`${where} is unimplemented!`);
            return;
    }
    console.log(networkStr)
    console.log(networkStr.join(":"));
    if (networkStr.length <3) {
        console.warn("networkStr not 3!");
        return false;
    }
    invokeRequest(networkStr);

    return false;
}

function onInit() {
    // try {
        initSummonRadioButtons(powerTypes);
    // } catch (e) {
    //     console.error(`initialization failed: ${e}`);
    //     // alert(`initialization failed:\n${e}`);
    //     return;
    // }
    console.log("initialization all complete; everything seems okay.");
}

onInit();
