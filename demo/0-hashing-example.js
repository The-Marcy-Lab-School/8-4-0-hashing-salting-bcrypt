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
      return alphabet[((alphabet.indexOf(char) + 3) % 26)]
    }

    // a = (0 + 3) % 26 = 3 => d
    // z = (25 + 3) % 26 = 2 => c
    return alphabetUpper[((alphabetUpper.indexOf(char) + 3) % 26)]
  }).join('');

  return hashedPassword;
}

// a hashing function is a function that transforms the input into something different
// a hashing function must be pure
// const badHash = (plaintextPassword) => plaintextPassword + 'a';

// console.log(hash('wxyz1!'));
// console.log(badHash('xxyz1!'));

const createNewUser = (username, password) => {
  const hashedPassword = hash(password);
  const user = { username, hashedPassword }
  users.push(user);
}

const authenticate = (passwordAttempt, user) => {
  console.log('hashed password attempt:', hash(passwordAttempt));
  console.log('stored hashed password:', user.hashedPassword);
  return hash(passwordAttempt) === user.hashedPassword;
}

createNewUser('dogPerson123', 'hElLo123')
createNewUser('catsRule678', 'weoirufv|abc123')
createNewUser('catsRule789', 'lsjdklfj|abc123')
// console.log(users)

// const attempt1 = authenticate('abc123', users[1]);
// console.log('attempt1 is valid:', attempt1);

const attempt2 = authenticate('abd123', users[1]);
console.log('attempt2 is valid:', attempt2);