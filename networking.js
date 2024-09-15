async function invokeRequest(message) {
    const ip = document.getElementById("ipInput").value;
    const port = document.getElementById("portInput").value;
    const password = document.getElementById("passwordInput").value;

    console.log(`ip: ${ip}, ${port}, ${password}`);

    // prepend a "hash"
    let hashedmsg = `c13a6cf1f7186b9743b5ae1525171c9a1e949fac:${message}`;
    console.log(hashedmsg);

    const url = `http://${ip}:${port}/`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: message,
        });
        const resp = await response.text();
        console.log(`got response ${resp}`);
    } catch (e) {
        console.error(`failed to send network request: ${e}`);
    }
    
}
