const bcrypt = require('bcrypt');

// Make an async wrapper function so we can use await
const testHashing = async (password) => {
  const saltRounds = 8;

  const hashedPassword = await bcrypt.hash('secret', saltRounds);

  console.log(hashedPassword); // a complex string!

  const isValid = await bcrypt.compare('secret', hashedPassword);

  console.log(isValid); // true!
}

testHashing();