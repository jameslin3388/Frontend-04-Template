function NumberToString(number, base) {
  if (typeof number !== 'number') {
    console.log('the number is invalid');
    return;
  }
  if (![2, 8, 10, 16].includes(base)) {
    console.log('the base is invalid');
    return;
  }
  return number.toString(base);
}

function StringToNumber(string) {
  const reg = {
    2: /^0b(\d+)$/,
    8: /^0o(\d+)$/,
    10: /^([0-7]+)$/,
    16: /^0x([\da-fA-F]+)$/,
  };

  for (const base in reg) {
    let result = string.match(reg[base]);
    if (result) {
      return parseInt(result[1], base);
    }
  }
}

let b = NumberToString(12312, 8);
console.log(b);
console.log(StringToNumber(b));
let a = StringToNumber('0x13124');
console.log(a);
console.log(NumberToString(a, 16));
