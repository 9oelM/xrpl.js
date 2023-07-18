// import * as xrpl from "xrpl";
import * as codec from "ripple-binary-codec";

const { Amount } = codec[`coreTypes`]

const a = Amount.from({
  value: `123.11`,
  currency: `AAA`,
  issuer: `r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59`,
})

console.log(a.toBytes())
console.log(a.toHex())
console.log(a.toString())
console.log(a.toJSON())
