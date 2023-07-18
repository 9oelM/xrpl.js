// import * as xrpl from "xrpl";
import * as codec from "ripple-binary-codec";
// import * as bigInt from "big-integer";

const { Amount } = codec[`coreTypes`]

const a = Amount.from({
  value: `123.11`,
  currency: `AAA`,
  issuer: `r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59`,
})

console.log(a.toJSON())

// const b = Amount.from({
//   value: 1e-1,
//   currency: `005841551A748AD2C1F76FF6ECB0CCCD00000000`,
//   issuer: `r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59`,
// })

// console.log(b.toJSON())

const c = Amount.from(1e-1)
c;
console.log(444)
// console.log(c.toJSON())
