const simpleHash = (str) => {
  let hash = '';
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  return hash;
}

const hashedPassword1 = simpleHash("abc");  // 979899
const hashedPassword2 = simpleHash("def");  // 100101102

console.log(hashedPassword1, hashedPassword2);

// TODO: Validate some passwords