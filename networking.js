async function invokeRequest(message) {
    const ip = document.getElementById("ipInput").value;
    const port = document.getElementById("portInput").value;
    const password = document.getElementById("passwordInput").value;

    console.log(`ip: ${ip}, ${port}, ${password}`);

    const url = `http://${ip}:${port}/`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: message,
        });
    } catch (e) {
        console.error(`failed to send network request: ${e}`);
    }
    console.log(`response received: ${response}`);
}
