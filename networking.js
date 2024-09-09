async function invokeRequest(message) {
    const ip = document.getElementById("ipInput").value;
    const port = document.getElementById("portInput").value;
    const password = document.getElementById("passwordInput").value;

    console.log(`ip: ${ip}, ${port}, ${password}`);

    const url = `http://${ip}:${port}/`;
    const response = await fetch(url, {
        method: 'POST',
        body: message,
    });
    console.log(`response received: ${response}`);
}
