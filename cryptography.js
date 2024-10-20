/*class ChaCha20 {
    constructor(key, nonce) {
      //  this.key = new Uint8Array(32);
      //  this.nonce = new Uint8Array(12);
        this.counter = 0;
        this.state = new Uint32Array(16);

        // init state
        for (let i = 0; i < 4; i++) {
            this.state[i] = 0x61707865 + i * 0x3320646e;
            this.state[i + 4] = 0x79622d32 + i * 0x6b206574;
        }

        // set key
        for (let i = 0; i < 8; i++) {
            this.state[4 + i] = (key[i * 4] << 24) | (key[i * 4 + 1] << 16) |
                                (key[i * 4 + 2] << 8) | key[i * 4 + 3];
        }

        // set nonce
        for (let i = 0; i < 3; i++) {
            this.state[12 + i] = (nonce[i * 4] << 24) | (nonce[i * 4 + 1] << 16) |
                                 (nonce[i * 4 + 2] << 8) | nonce[i * 4 + 3];
        }

        this.state[15] = this.counter;
    }

    encrypt(data) {
        const keystream = new Uint8Array(64);
        let result = new Uint8Array(data.length);

        for (let i = 0; i < data.length; i += 64) {
            this.block(keystream);
            for (let j = 0; j < Math.min(64, data.length - i); j++) {
            result[i + j] = data[i + j] ^ keystream[j];
            }
        }

        return result;
    }

    block(out) {
        const x = [...this.state];

        for (let i = 0; i < 10; i++) {
            quarterRound(x[0], x[4], x[8], x[12]);
            quarterRound(x[1], x[5], x[9], x[13]);
            quarterRound(x[2], x[6], x[10], x[14]);
            quarterRound(x[3], x[7], x[11], x[15]);
            quarterRound(x[0], x[5], x[10], x[15]);
            quarterRound(x[1], x[6], x[11], x[12]);
            quarterRound(x[2], x[7], x[8], x[13]);
            quarterRound(x[3], x[4], x[9], x[14]);
        }

        for (let i = 0; i < 16; i++) {
            out[i * 4] = (x[i] + this.state[i]) >> 24;
            out[i * 4 + 1] = ((x[i] + this.state[i]) >> 16) & 0xFF;
            out[i * 4 + 2] = ((x[i] + this.state[i]) >> 8) & 0xFF;
            out[i * 4 + 3] = x[i] + this.state[i];
        }

        this.counter++;
        this.state[12] += 1;
        if (this.state[12] === 0) {
            this.state[13]++;
        }
    }
}

function quarterRound(a, b, c, d) {
    a += b; d ^= a; d <<= 16;
    c += d; b ^= c; b >>= 12;
    a += b; d ^= a; d <<= 8;
    c += d; b ^= c; b >>= 7;
}

*/

function sha256(ascii) {

    

    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    }

    const maxWord = Math.pow(2, 32);
    const lengthProperty = 'length';
    let i, j;

    const result = [];

    const words = [];
    const asciiBitLength = ascii[lengthProperty] * 8;


   const hash =  [];
   const k = [];
   
    let primeCounter = k[lengthProperty];

    if (!primeCounter) {
        let candidate = 2;
        outer: while (primeCounter < 64) {
            for (i = 2; i * i <= candidate; i++) {
                if (candidate % i === 0) {
                    candidate++;
                    continue outer;
                }
            }
            hash[primeCounter] = (Math.pow(candidate, 0.5) * maxWord) | 0;
            k[primeCounter++] = (Math.pow(candidate, 1 / 3) * maxWord) | 0;
            candidate++;
        }
    }

    ascii += '\x80'; // Append Ƈ' bit (plus zero padding)
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00'; // More zero padding
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return;
        words[i >> 2] |= j << ((3 - (i % 4)) * 8);
    }
    words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
    words[words[lengthProperty]] = asciiBitLength;

    /* Process each chunk */
    for (j = 0; j < words[lengthProperty];) {
        const w = words.slice(j, (j += 16)); // The message is divided into 512-bit chunks

        const oldHash = hash.slice(0);


        for (i = 16; i < 64; i++) {
            const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
            const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
            w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
        }

        for (i = 0; i < 64; i++) {
            const s1 = rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25);
            const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
            const temp1 = (hash[7] + s1 + ch + k[i] + w[i]) | 0;
            const s0 = rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);
            const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
            const temp2 = (s0 + maj) | 0;

            hash[7] = hash[6];
            hash[6] = hash[5];
            hash[5] = hash[4];
            hash[4] = (hash[3] + temp1) | 0;
            hash[3] = hash[2];
            hash[2] = hash[1];
            hash[1] = hash[0];
            hash[0] = (temp1 + temp2) | 0;
        }

        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }

    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            const b = (hash[i] >> (j * 8)) & 255;
            result.push((b < 16 ? '0' : '') + b.toString(16));
        }
    }
    return result.join('');
}
