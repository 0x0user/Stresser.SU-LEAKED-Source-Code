function importKey(pemEncodedKey) {
  // helper function
  // from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  // main function to load the public key
  // and convert it to crypto key
  // for encryption in browser
  function Load(pem) {
    // fetch the part of the PEM string between header and footer
    // replace this
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";

    const pemContents = pem.substring(
      pemHeader.length,
      pem.length - pemFooter.length
    );

    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents);

    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);

    return window.crypto.subtle.importKey(
      "spki",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["encrypt"]
    );
  }

  return Load(pemEncodedKey);
}

export default importKey;
