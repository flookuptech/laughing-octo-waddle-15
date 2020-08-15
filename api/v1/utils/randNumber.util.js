const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");

exports.generateRandNumber = (length, charset) => {
  return randomstring.generate({
    length,
    charset,
  });
};

exports.generatePassword = async function () {
  const randString = randomstring.generate({
    length: 8,
  });

  const password = await bcrypt.hash(randString, 10);
  return { password, key: randString };
};
