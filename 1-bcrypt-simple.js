const bcrypt = require('bcrypt');

// Make an async wrapper function so we can use await
const testHashing = async (password) => {
  const hashedPassword1 = await bcrypt.hash('secret', 8)
  console.log(hashedPassword1); // Some crazy string
  const hashedPassword2 = await bcrypt.hash('secret', 8)
  console.log(hashedPassword2); // A different crazy string!

  // TODO: Validate some passwords
}

testHashing();
