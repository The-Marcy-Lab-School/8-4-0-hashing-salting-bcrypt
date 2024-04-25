const users = []; // our "database"

// a hashing function is one that turns a string into another string
const hash = (plaintextPassword) => {
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

  return hashedPassword;
}

const createNewUser = (username, password) => {
  const hashedPassword = hash(password);
  const user = { username, hashedPassword }
  users.push(user);
}

const compare = (passwordAttempt, hashedPassword) => {
  return hash(passwordAttempt) === hashedPassword;
}

createNewUser('dogPerson123', 'hElLo123')
createNewUser('catsRule678', 'abc123')
console.log(users)

const attempt1 = compare('abc123', users[1].hashedPassword);
const attempt2 = compare('abc1234', users[1].hashedPassword);
console.log('attempt1 is valid:', attempt1);
console.log('attempt2 is valid:', attempt2);

// [
//  { username: 'dogPerson123', hashedPassword: 'iFmMp123' },
//  { username: 'catsRule678', hashedPassword: 'bcd123' }
// ]
// comparing bcd123 and bcd123
// comparing bcd1234 and bcd123
// attempt1 is valid: true
// attempt2 is valid: false