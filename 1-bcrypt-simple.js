const bcrypt = require('bcrypt');

// Make an async wrapper function so we can use await
const testHashing = async () => {
  const saltRounds = 8;

  const hashedPassword = await bcrypt.hash('secretPassword', saltRounds);

  console.log(hashedPassword); // a complex string!

  const isValid = await bcrypt.compare('secretPassword', hashedPassword);

  console.log(isValid); // true!
}

testHashing();


// Make an async wrapper function so we can use await
const testSalting = async () => {
  const salt = '$2b$10$abcdefghijlkmnopqrstuv';

  // bcrypt.hash can also take in a salt value
  console.log(await bcrypt.hash('secretPassword', salt));
  console.log(await bcrypt.hash('secretPassword', salt));

  // The same hash is made with the same salt!
}

// testSalting();