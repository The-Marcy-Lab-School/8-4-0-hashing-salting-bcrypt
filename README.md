# Hashing Passwords with Bcrypt

**Table of Contents:**
- [Terms](#terms)
- [Hashing](#hashing)
  - [Verifying Passwords](#verifying-passwords)
- [Salting](#salting)
- [Bcrypt](#bcrypt)

## Terms
* **Hashing** - a mathematical algorithm that transforms a string of characters into a fixed-length string of characters. 
* Salting
* Salt Rounds
* Plaintext password vs. hashed password

## Hashing

**Hashing** is a mathematical algorithm that transforms a string of characters into a fixed-length string of characters. 

The purpose of password hashing is to prevent attackers who obtain a database of user passwords from easily obtaining the passwords themselves. 
* Without password hashing, an attacker who obtains a user database can simply read the passwords in plain text. 
* With password hashing, the passwords are stored as **hash values**, and an attacker would need to spend significant time and resources attempting to crack the hash values back into the original passwords.

```js
const hash = (pw) => {
  return convertPasswordToHashedPassword(pw);
}

const users = []; // our "database"

const createNewUser = (username, password) => {
  const hashedPassword = hash(password);
  const user = { username, hashedPassword }
  users.push(user);
}

createNewUser('dogPerson123', 'hElLo')
createNewUser('catsRule678', 'abc')
console.log(users)
// [
//  { username: 'dogPerson123', hashedPassword: 'iFmMp' },
//  { username: 'catsRule678', hashedPassword: 'bcd' }
// ]
```

**Q: What does this hashing function do?**

### Verifying Passwords

**Q: let's say I want to try logging in as user `dogPerson123` and I provide the password `ihatedogs`, how can I verify that the password `ihatedogs` does or dot not match the hashed password?**

The beauty of a hashing function is that it MUST be pure: if given the same plaintext string, it must return the same hashed string every time. We can use this to verify any incoming password attempt:
* hash the password attempt
* compare it to the stored hashed password
* return if they match or not

```js
const hash = (plaintextPassword) => {
  // ...
}

const users = []; // our database

const createNewUser = (username, password) => {
  const hashedPassword = hash(password);
  const user = { username, hashedPassword }
  users.push(user);
}

// take a password attempt and hash it.
// if the same result is produced as the hashed password, its a match!
const compare = (passwordAttempt, hashedPassword) => {
  return hash(passwordAttempt) === hashedPassword;
}

createNewUser('dogPerson123', 'hElLo123')
createNewUser('catsRule678', 'abc123')
console.log(users);

compare('abc123', users[1].hashedPassword); // true
compare('abc1234', users[1].hashedPassword); // false
```

## Salting

A salt is a random string of data that is added to the input data before the hash function is applied. This changes the hash value that is produced, even for the same input data.

Even if two users have the same password, a new salt will be generated and added to the password, generating a unique hash each time. 

```js
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
  // the salt will always be a random sequence of 3 lowercase letters
  let randomSalt = '';
  for (let i = 0; i < 3; i++) {
    randomSalt += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return randomSalt + hashedPassword;
}
const compare = (passwordAttempt, hashedPassword) => {
  // get the salt from the beginning of the hashed password
  // we know that it is the first three letters of the hashed password
  const salt = hashedPassword.slice(0, 3);
  // use the salt to hash the password attempt and compare
  return hash(passwordAttempt, salt) === hashedPassword;
}
```

## Bcrypt

The `bcrypt` module does this all for us! It has two key methods:
* `bcrypt.hash(password, saltRounds)`
* `bcrypt.compare(password, hashedPassword)`

```js
const hashPassword = async (password, saltRounds = 8) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    return console.error(err.message);
  }
};
const isValidPassword = async (password, hash) => {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (err) {
    return console.error(err.message);
  }
};
```
