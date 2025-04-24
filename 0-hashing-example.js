// Convert a given string to its ASCII codes
const simpleHash = (str) => {
  let hash = '';
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  return hash;
}

// the passwordToTest should produce the same hash as the storedHash
const validatePassword = (passwordToTest, storedHash) => {
  return simpleHash(passwordToTest) === storedHash;
}

const hashedPassword = simpleHash("abc");  // 979899

console.log(validatePassword("xyz", hashedPassword));
// false, the given password produces a different hash!

console.log(validatePassword("abc", hashedPassword));
// true, the given password produces the same hash!