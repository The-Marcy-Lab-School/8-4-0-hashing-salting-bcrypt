const users = []; // our "database"

// a hashing function is one that turns a string into another string
const hash = (plaintextPassword, salt) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const alphabetUpper = alphabet.toUpperCase();

  const hashedPassword = [...plaintextPassword].map((char) => {
    if (!alphabet.includes(char) && !alphabetUpper.includes(char)) {
      return char;
    }
    if (alphabet.includes(char)) {
      return alphabet[(alphabet.indexOf(char) + 1 % 26)]
    }
    return alphabetUpper[(alphabetUpper.indexOf(char) + 1 % 26)]
  }).join('');

  // this is used when using the hashing function to compare
  if (salt) return salt + hashedPassword;

  // generate a new salt when creating a user's hashed password
  let randomSalt = '';
  for (let i = 0; i < 3; i++) {
    randomSalt += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return randomSalt + hashedPassword;
}

const createNewUser = (username, password) => {
  const hashedPassword = hash(password);
  const user = { username, hashedPassword }
  users.push(user);
}

const compare = (passwordAttempt, hashedPassword) => {
  // get the salt from the beginning of the hashed password
  const salt = hashedPassword.slice(0, 3);
  // use the salt to hash the password attempt and compare
  return hash(passwordAttempt, salt) === hashedPassword;
}

createNewUser('dogPerson123', 'abc')
createNewUser('catsRule678', 'abc')
console.log(users)

const attempt1 = compare('abc', users[0].hashedPassword);
const attempt2 = compare('abc', users[1].hashedPassword);
console.log('attempt1 is valid:', attempt1);
console.log('attempt2 is valid:', attempt2);
