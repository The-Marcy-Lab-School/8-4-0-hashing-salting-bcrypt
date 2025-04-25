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


// Make an async wrapper function so we can use await
const testSalting = async (password) => {
  const salt = '$2b$10$abcdefghijlkmnopqrstuv';

  // bcrypt.hash can also take in a salt value
  console.log(await bcrypt.hash('secret', salt));
  console.log(await bcrypt.hash('secret', salt));

  // The same hash is made with the same salt!
}

// testSalting();