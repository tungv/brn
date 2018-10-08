# Functional Branch

`brn` exports only one function that takes a `test`, a `left`, and a `right`
function and return a combined one that will run `left` if `test` returns truthy
and `right` otherwise

# Example

```js
const branch = require('brn');

const isOdd = x => x % 2;

const left = x => `${x} is odd`;
const right = x => `${x} is even`;

const fn = branch(isOdd, left, right);

console.log(fn(2)); // returns 2 is even
console.log(fn(1)); // returns 1 is odd
```
```
const branch = require('brn');

const isPrime = function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1 && num !== 0;
}
const left = x => `${x} is prime`;
const right = x => `${x} is not prime`;
const fn = branch(isPrime, left, right);

console.log(fn(2)); // returns 2 is prime
console.log(fn(1)); // returns 1 is not prime
```
