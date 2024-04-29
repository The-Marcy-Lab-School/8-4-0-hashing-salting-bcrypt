const users = []; // our "database"
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetUpper = alphabet.toUpperCase();

// a hashing function is one that turns a string into another string
const hash = (plaintextPassword) => {

  const hashedPassword = [...plaintextPassword].map((char) => {
    if (!alphabet.includes(char) && !alphabetUpper.includes(char)) {
      return char;
    }
    if (alphabet.includes(char)) {
      return alphabet[(alphabet.indexOf(char) + 1 % 26)]
    }
    return alphabetUpper[(alphabetUpper.indexOf(char) + 1 % 26)]
  }).join('');

  return hashedPassword;
}

// A salt is a random string of data that is added to the 
// input data before the hash function is applied. This changes 
// the hash value that is produced, even for the same input data.
const getSalt = () => {
  // this salt is just a random string of 3 letters from alphabet
  let randomSalt = '';
  for (let i = 0; i < 3; i++) {
    randomSalt += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return randomSalt;
}

const createNewUser = (username, password) => {
  const salt = getSalt();
  const hashedPassword = hash(salt + password);
  // store the salt along with the hashed password
  // hackers still need 
  const user = { username, hashedPassword, salt };
  users.push(user);
}

const authenticate = (passwordAttempt, user) => {
  // use the salt to hash the password attempt and compare
  return hash(user.salt + passwordAttempt) === user.hashedPassword;
}

createNewUser('dogPerson123', 'abc')
createNewUser('catsRule678', 'abc')
console.log(users)

const attempt1 = authenticate('abc', users[0]);
const attempt2 = authenticate('abc', users[1]);
console.log('attempt1 is valid:', attempt1);
console.log('attempt2 is valid:', attempt2);
