/* first of all, this code does some pretty horrific stuff.
 * second of all, nobody cares about the performance implications of this.
 * given that you pray that the JS v8 engine (or the equal in mozilla firefox?) will offer substantal performance improvements over this interpreted garbage hellfire of a language.
 * if that is not the case, always remember that you can write webassembly in Rust or C, and even so, the DOM being slow is a problem.
 * tl;dr javascript is the worst language to date. (im blaming this on javascript and not computers not being able to iterate through an array at O(1) time (and do it in under -2 ns) in most cases)
 */
function domRejitterIcons() {
    [...document.getElementsByClassName("icon-checkmark")].forEach(e => {
        e.innerHTML = icons.check;
    });
    [...document.getElementsByClassName("icon-cross")].forEach(e => {
        e.innerHTML = icons.cross;
    });
}

function onFormSubmit(where) {
    console.debug(where);
    let networkStr = scanForCheckedInDiv(where);
    console.log(networkStr)
    let network = networkStr.join(":");
    console.log(network);
    invokeRequest(network);

    return false;
}

async function calculateSha256(message) {
    // Convert the message to a Uint8Array
    const msgBuffer = new TextEncoder().encode(message);

    // Hash the message using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
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
        let str = `terminateprocess:${pid}`;
        console.log(str);
        invokeRequest(str);
    });
    document.getElementById("raw_input_executioner").addEventListener("click", function() {
        const asdf = document.getElementById("rawInput").value;
        const isCheckboxChecked = document.getElementById("raw_input_prependhash").checked;
        invokeRequest(asdf, isCheckboxChecked);
    });
    document.getElementById("self_destruct_executioner").addEventListener("click", function() {
        const checked = document.getElementById("self_destruct_verif").checked;
        if (!checked) {
            const user_response = document.getElementById("server_response");
            const icon_symbol = document.getElementById("response_icon");
            user_response.textContent = "Self destruct verification checkbox not checked. Not proceeding.";
            icon_symbol.classList.remove("icon-checkmark");
            icon_symbol.classList.add("icon-cross");
            domRejitterIcons();
            return;
        }
        invokeRequest("selfdestruct");
    })
    console.log("initialization all complete; everything seems okay.");
    domRejitterIcons();
}

onInit();
