async function invokeRequest(message, prepend_hash = true) {
    const ip = document.getElementById("ipInput").value;
    const port = document.getElementById("portInput").value;
    const password = document.getElementById("passwordInput").value;
    const user_response = document.getElementById("server_response");
    const icon_symbol = document.getElementById("response_icon");


    // can't use an if statement but can do this. thanks js
    var passwordHash = prepend_hash ? sha256(password) : "if this string makes it to finalMessage then this code is wrong. [insert js exploit here that crashes the browser]";

    console.log(`Ip: ${ip} Port: ${port} Pw: ${password} PwHash: ${passwordHash}`);

    /*
     * structure:
     *
     * <12bytenonce><encrypteddata>
     *
     * where encrypteddata is the chacha20 encrypted data with the nonce and the password, the structure of it when unencrypted is the usual:
     * <sha256hash><request>:<arg1>:<arg2>...
     */

    // TODO secure key initialization
    const key = new Uint8Array(32).fill(0x01);
    const nonce = new Uint8Array(12);
    crypto.getRandomValues(nonce);
    const chacha20 = new ChaCha20(key, nonce);

    const plaintext = new TextEncoder().encode(message);
    const ciphertext = chacha20.encrypt(plaintext);
    console.log(ciphertext);
    let encrypteddata = prepend_hash ? `${passwordHash}:${message}` : message;
    console.log(encrypteddata);

    let finalciphertext = `${nonce}${encrypteddata}`;
    console.log(finalciphertext);

    const url = `http://${ip}:${port}/`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: finalciphertext,
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
