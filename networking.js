async function invokeRequest(message, prepend_hash = true) {
    const ip = document.getElementById("ipInput").value;
    const port = document.getElementById("portInput").value;
    const password = document.getElementById("passwordInput").value;
    const user_response = document.getElementById("server_response");
    const icon_symbol = document.getElementById("response_icon");

    // can't use an if statement but can do this. thanks js
    let passwordHash = prepend_hash ? sha256(password) : "";
    /*
     * structure:
     *
     * <12bytenonce><encrypteddata>
     *
     * where encrypteddata is the chacha20 encrypted data with the nonce and the password, the structure of it when unencrypted is the usual:
     * <sha256hash><request>:<arg1>:<arg2>...
     */

    let plainRequest = prepend_hash ? `${passwordHash}:${message}` : message;

    if(password.length > 32)
    {
        console.log("Password is too long");
        return;
    }

    const encodedPassword = new TextEncoder().encode(password);

    const encodedPlainRequest = new TextEncoder().encode(plainRequest); // Encode the text as a byte array

    // Secure key initialization
    const key = new Uint8Array(32).fill(0x00); // 32-byte key
    const nonce = new Uint8Array(12);
    crypto.getRandomValues(nonce);

    key.set(encodedPassword); // Put the password into the key array,

    let requestSize = plainRequest.length;

    let nonceSize = nonce.length;

    const encryptedRequest = new JSChaCha20(key, nonce).encrypt(encodedPlainRequest);

    // Create the final byte array: concatenate nonce and encrypted data
    const finalRequest = new Uint8Array(nonceSize + requestSize);
    finalRequest.set(nonce); // Copy nonce into the beginning of finalRequest
    finalRequest.set(encryptedRequest, nonceSize); // Copy encryptedData after the nonce

    console.log(`Sending request ${plainRequest} to ${ip}:${port}`);

    const url = `http://${ip}:${port}/`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: finalRequest,
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
