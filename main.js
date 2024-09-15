[...document.getElementsByClassName("icon-checkmark")].forEach(e => {
    e.innerHTML = icons.check
});

function onFormSubmit(where) {
    console.debug(where);
    let networkStr = scanForCheckedInDiv(where);
    console.log(networkStr)
    let network = networkStr.join(":");
    console.log(network);
    invokeRequest(network);

    return false;
}

function getProcessTerminationPid() {
    return document.getElementById("pidInput").value;
}

function onInit() {
    initSummonRadioButtons(powerTypes);
    // console.error("s");
    // HACK: wtf is going on??? initSummonRadioButtons keeps using powerTypes???? what the fuck??
    document.getElementById("process_termination_executioner").addEventListener("click", function() {
        let pid = getProcessTerminationPid()
        let str = `terminate:${pid}`;
        console.log(str);
        invokeRequest(str);
    });
    document.getElementById("raw_input_executioner").addEventListener("click", function() {
        const asdf = document.getElementById("rawInput").value;
        invokeRequest(asdf);
    })
    console.log("initialization all complete; everything seems okay.");
}

onInit();
