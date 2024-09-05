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

if (document.getElementById("title").textContent != "catgirl panel") {
    console.warn("hallilo, why??");
}

function onTypeFormSubmit() {
    

    return false;
}

function onInit() {
    try {
        initSummonRadioButtons();
    } catch (e) {
        console.error(`initialization failed: ${e}`);
        return;
    }
    console.log("initialization all complete; everything seems okay.");
}

onInit();
