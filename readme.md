# Strongly Typed Functional Branching

`brn` exports only one function that takes a `test`, a `left`, and a `right`
function and return a combined one that will run `left` if `test` returns truthy
and `right` otherwise

# Example

```js
const brn = require('brn');

const isOdd = x => x % 2;

const left = x => `${x} is odd`;
const right = x => `${x} is even`;

const fn = brn(isOdd, left, right);

console.log(fn(2)); // returns 2 is even
console.log(fn(1)); // returns 1 is odd
```

# TypeScript

```ts
import brn from 'brn'

const isOdd = (x: number) => x % 2;

const fn = brn(
  isOdd,
  x => `${x} is odd` as const,
  x => `${x} is even` as const
);

expect(fn(2, 'two')).toBe('2 is even'); // returns 2 is even
expect(fn(1, 'one')).toBe('1 is odd'); // returns 1 is odd
```

In this example, parameter `x` in the "left" and "right" functions is typed as `number`.
`fn` also has return type of `` `${number} is even` | `${number} is odd` ``


```ts
// another example
function always<X extends string>(x: X) {
  return () => x;
}
const fn = brn(
  (x: number) => x >= 10,
  always(`double digit`),
  brn(
    x => x < 0,
    always('negative'),
    always('single digit')
  )
)
```

In this example, return type of `fn` is one of `"single digit"`, `"double digit"` or `"negative"`.