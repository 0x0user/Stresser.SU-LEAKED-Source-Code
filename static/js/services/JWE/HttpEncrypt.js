import * as jose from "jose";
import importKey from "./ImportRSA";

export const Encrypt = async (values) => {
  try {
    // public key
    const pemEncodedKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzi65+rh9hW7nZ3TuPCCw
    iMh63eBArhATyahT/a2mMVwoMeu7kp+/xG655h9D9pscQZt9w1F/qYglyq04Jl3b
    mwdq50gcloPatldDOyYF55Cx9IvykXIj0i4p1A5dSv3h32Tzy7oFCUhFmTS9gDmb
    YskxMRzKxbP8Hn/d3xVf7lkhBRBpNv/luyYgImolxs84EZUvhWUWmYt/D81oVOO0
    bMJ1qZSjuTRAN88yzCi3PaqwC0uUTDERyUeA7pt6xXyyrklPirF0HOOS674GSJEn
    3OTdalhoaxRbNjS101J6sc2aJoLiD78KkSVE7xC12J61TmMLcWcjezHHO1n4mRAY
    iQIDAQAB
    -----END PUBLIC KEY-----`;

    // load the public key
    let publicKey = await importKey(pemEncodedKey);

    // generate the jwe key from the string 
    const jwe = await new jose.CompactEncrypt(new TextEncoder().encode(JSON.stringify(values)))
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(publicKey);

    // send this JWE key as data in the api call
    return jwe;
  } catch (e) {
    return null;
  }
};