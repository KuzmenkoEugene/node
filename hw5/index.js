const crypto = require("crypto");

function verifyPassword(password) {
  const userSalt = "0a1e8464d64b28179a4aa215e597b73b";
  const userHash = "021b1c06a0ac41cf7a34c6598770ed76e98a4ce15ebeb6bfc8fa01760e0ad395cb2a3a5c92d739092f2ae8e2345e90c1cd693798e9f04b6f271da5dbcd4ab2ef";

  crypto.pbkdf2(password, userSalt, 100000, 64, "sha512", (err, derivedKey) => {
    if (err) throw err;

    if (derivedKey.toString("hex") === userHash) {
      console.log("true");
    } else {
      console.log("false");
    }
  });
}

verifyPassword("password12345678");
