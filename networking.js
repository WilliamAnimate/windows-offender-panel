async function invokeRequest(message) {
    const ip = document.getElementById("ipInput").value;
    const port = document.getElementById("portInput").value;
    const password = document.getElementById("passwordInput").value;


    let passwordHash = await calculateSha256(password);

    console.log(`Ip: ${ip} Port: ${port} Pw: ${password} PwHash: ${passwordHash}`);

    let finalMessage = `${passwordHash}:${message}`;
 

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
