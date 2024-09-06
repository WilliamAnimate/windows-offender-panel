const ip = document.getElementById("ipInput");
const port = document.getElementById("portInput");
const password = document.getElementById("passwordInput");

async function invokeRequest(message) {
    const url = `http://${ip}:${port}/`;
    const response = await fetch(url, {
        method: 'POST',
        body: message,
    });
}
