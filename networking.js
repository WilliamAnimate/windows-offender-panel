async function invokeRequest(message, prepend_hash = true) {
    const ip = document.getElementById("ipInput").value;
    const port = document.getElementById("portInput").value;
    const password = document.getElementById("passwordInput").value;
    const user_response = document.getElementById("server_response");
    const icon_symbol = document.getElementById("response_icon");


    // can't use an if statement but can do this. thanks js
    let passwordHash = prepend_hash ? await calculateSha256(password) : "if this string makes it to finalMessage then this code is wrong. [insert js exploit here that crashes the browser]";

    console.log(`Ip: ${ip} Port: ${port} Pw: ${password} PwHash: ${passwordHash}`);

    let finalMessage = prepend_hash ? `${passwordHash}:${message}` : message;
    console.log(finalMessage);
 

    const url = `http://${ip}:${port}/`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: finalMessage,
        });
        const resp = await response.text();
        console.log(`got response ${resp}`);
        user_response.textContent = resp;
        icon_symbol.classList.remove("icon-cross");
        icon_symbol.classList.add("icon-checkmark");
    } catch (e) {
        console.error(`failed to send network request: ${e}`);
        // N.B. PLEASE DO NOT USE .innerHTML!
        // that could potentally turn into a CVE; we could receive html tags and that would be able to do RCE.
        // that includes, <script>, fullscreen DOM elements...
        user_response.textContent = e;
        icon_symbol.classList.remove("icon-checkmark");
        icon_symbol.classList.add("icon-cross");
    } finally {
        // who actually remembers this is a real thing?
        domRejitterIcons();
    }
    
}
