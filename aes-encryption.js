const AES_KEY = "R8v#2Kp!9xL@4mQ7zT$6wN1cY5bH3fD9";

// =======================================
// CONVERT BASE64 TO BYTES
// Used for encrypted data, NOT for the AES key
// =======================================

function base64ToBytes(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes;
}

// =======================================
// CONVERT BYTES TO BASE64
// =======================================

function bytesToBase64(bytes) {
    let binary = "";

    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
}

// =======================================
// IMPORT AES-256 KEY
// Plain string -> UTF-8 bytes
// =======================================

async function importAESKey(keyString = AES_KEY) {
    const keyBytes = new TextEncoder().encode(keyString);

    if (keyBytes.length !== 32) {
        throw new Error(
            `AES-256 key must be exactly 32 bytes. Current length: ${keyBytes.length}`
        );
    }

    return await crypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: "AES-CBC" },
        false,
        ["encrypt", "decrypt"]
    );
}

// =======================================
// ENCRYPT
// Input: JSON string
// Output: Base64 string containing IV + ciphertext
// =======================================

export async function encryptData(payload, keyString = AES_KEY) {

    if (typeof payload !== "string") {
        throw new Error("Payload must be a string.");
    }

    const key = await importAESKey(keyString);

    // Generate a random 16-byte IV
    const iv = crypto.getRandomValues(
        new Uint8Array(16)
    );

    // Convert plaintext to UTF-8 bytes
    const plaintext = new TextEncoder().encode(payload);

    // Encrypt using AES-CBC
    const encryptedBuffer = await crypto.subtle.encrypt(
        {
            name: "AES-CBC",
            iv: iv
        },
        key,
        plaintext
    );

    const ciphertext = new Uint8Array(encryptedBuffer);

    // Combine IV + ciphertext
    const combined = new Uint8Array(
        iv.length + ciphertext.length
    );

    combined.set(iv, 0);
    combined.set(ciphertext, iv.length);

    // Return combined data as Base64
    return bytesToBase64(combined);
}

// =======================================
// DECRYPT
// Input: Base64 string containing IV + ciphertext
// Output: Original string
// =======================================

export async function decryptData(
    encryptedBase64,
    keyString = AES_KEY
) {

    if (typeof encryptedBase64 !== "string") {
        throw new Error("Encrypted data must be a string.");
    }

    // Convert Base64 data into bytes
    const combined = base64ToBytes(encryptedBase64);

    // 16-byte IV + minimum 16-byte ciphertext
    if (combined.length < 32 || combined.length % 16 !== 0) {
        throw new Error("Invalid encrypted data.");
    }

    // Extract IV
    const iv = combined.slice(0, 16);

    // Extract ciphertext
    const ciphertext = combined.slice(16);

    // Import AES key
    const key = await importAESKey(keyString);

    // Decrypt
    const decryptedBuffer = await crypto.subtle.decrypt(
        {
            name: "AES-CBC",
            iv: iv
        },
        key,
        ciphertext
    );

    // Convert decrypted bytes to string
    return new TextDecoder().decode(decryptedBuffer);
}
