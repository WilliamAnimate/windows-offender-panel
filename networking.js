async function invokeRequest(message, opt_auto_prepend_hash = true) {
    const ip = document.getElementById("ipInput").value;
    const port = document.getElementById("portInput").value;
    const password = document.getElementById("passwordInput").value;


    // can't use an if statement but can do this. thanks js
    let passwordHash = opt_auto_prepend_hash ? await calculateSha256(password) : "if this string makes it to finalMessage then this code is wrong. [insert js exploit here that crashes the browser]";

    console.log(`Ip: ${ip} Port: ${port} Pw: ${password} PwHash: ${passwordHash}`);

    let finalMessage = opt_auto_prepend_hash ? `${passwordHash}:${message}` : message;
    console.log(finalMessage);
 

    const url = `http://${ip}:${port}/`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: finalMessage,
        });
        const resp = await response.text();
        console.log(`got response ${resp}`);
    } catch (e) {
        console.error(`failed to send network request: ${e}`);
    }
    
}
