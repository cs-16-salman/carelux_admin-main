const crypto = require("node:crypto");

const algorithm = "aes-256-ctr";
const ENCRYPTION_KEY = Buffer.from(
  "FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=",
  "base64"
);

const decrypt = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = {
  decrypt,
};
