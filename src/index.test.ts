import brn from "./index";

it("should return left when test returns true", () => {
  const test = jest.fn((_a, _b, _c) => true as const);
  const left = jest.fn(() => "left" as const);
  const right = jest.fn(() => "right" as const);

  const fn = brn(test, left, right);

  const expected: ReturnType<typeof fn> = "left";

  expect(fn(1, 2, 3)).toBe(expected);

  expect(test).toBeCalledWith(1, 2, 3);
  expect(left).toBeCalledWith(1, 2, 3);
  expect(right).not.toBeCalled();
});

it("should return left when test returns truthy number", () => {
  const test = jest.fn((_a, _b, _c) => 42 as const);
  const left = jest.fn(() => "left" as const);
  const right = jest.fn(() => "right" as const);

  const fn = brn(test, left, right);
  const expected: ReturnType<typeof fn> = "left";

  expect(fn(1, 2, 3)).toBe(expected);

  expect(test).toBeCalledWith(1, 2, 3);
  expect(left).toBeCalledWith(1, 2, 3);
  expect(right).not.toBeCalled();
});

it("should return right when test returns false", () => {
  const test = jest.fn((_a, _b, _c) => false as const);
  const left = jest.fn(() => "left" as const);
  const right = jest.fn(() => "right" as const);

  const fn = brn(test, left, right);
  const expected: ReturnType<typeof fn> = "right";

  expect(fn(1, 2, 3)).toBe(expected);

  expect(test).toBeCalledWith(1, 2, 3);
  expect(right).toBeCalledWith(1, 2, 3);
  expect(left).not.toBeCalled();
});

it("should return right when test returns null", () => {
  const test = jest.fn((str: string, num: number) => null);
  const left = jest.fn(() => "left" as const);
  const right = jest.fn(() => "right" as const);

  const fn = brn(test, left, right);
  const expected: ReturnType<typeof fn> = "right";

  expect(fn("1", 2)).toBe(expected);

  expect(test).toBeCalledWith("1", 2);
  expect(right).toBeCalledWith("1", 2);
  expect(left).not.toBeCalled();
});

it("should return right when test returns undefined", () => {
  const test = jest.fn((a, b, c, d, e) => {});
  const left = jest.fn(() => "left" as const);
  const right = jest.fn(() => "right" as const);

  const fn = brn(test, left, right);
  const expected: ReturnType<typeof fn> = "right";

  expect(fn(1, 2, 3, 4, 5)).toBe(expected);

  expect(test).toBeCalledWith(1, 2, 3, 4, 5);
  expect(right).toBeCalledWith(1, 2, 3, 4, 5);
  expect(left).not.toBeCalled();
});

it("should return right when test returns 0", () => {
  const test = jest.fn((a: number, b: number, c: number) => 0 as const);
  const left = jest.fn(() => "left" as const);
  const right = jest.fn(() => "right" as const);

  const fn = brn(test, left, right);
  const expected: ReturnType<typeof fn> = "right";

  expect(fn(1, 2, 3)).toBe(expected);

  expect(test).toBeCalledWith(1, 2, 3);
  expect(right).toBeCalledWith(1, 2, 3);
  expect(left).not.toBeCalled();
});

it("should return right when test returns 0n", () => {
  const test = jest.fn((a: number, b: number, c: number) => 0n as const);
  const left = jest.fn(() => "left" as const);
  const right = jest.fn(() => "right" as const);

  const fn = brn(test, left, right);
  const expected: ReturnType<typeof fn> = "right";

  expect(fn(1, 2, 3)).toBe(expected);

  expect(test).toBeCalledWith(1, 2, 3);
  expect(right).toBeCalledWith(1, 2, 3);
  expect(left).not.toBeCalled();
});

it("should return the first arg when test is falsy and right is omitted", () => {
  const test = jest.fn((a: 1, b: 2, c: 3) => false as const);
  const left = jest.fn(() => "left" as const);

  const fn = brn(test, left);

  const expected: ReturnType<typeof fn> = 1;
  expect(fn(1, 2, 3)).toBe(expected);

  expect(test).toBeCalledWith(1, 2, 3);
  expect(left).not.toBeCalled();
});

it("should return the first arg when test is truthy and left is omitted", () => {
  const test = jest.fn((a: 1, b: 2, c: 3) => true as const);
  const fn = brn(test);

  const expected: ReturnType<typeof fn> = 1;
  expect(fn(1, 2, 3)).toBe(expected);

  expect(test).toBeCalledWith(1, 2, 3);
});

it("readme example", () => {
  const isOdd = (x: number) => x % 2;

  const fn = brn(
    isOdd,
    (x) => `${x} is odd` as const,
    (x) => `${x} is even` as const
  );

  const expected1: ReturnType<typeof fn> = "1 is odd";
  const expected2: ReturnType<typeof fn> = "2 is even";

  expect(fn(1)).toBe(expected1); // returns 1 is odd
  expect(fn(2)).toBe(expected2); // returns 2 is even
});

it("nested brn", () => {
  function always<X extends string>(x: X) {
    return () => x;
  }
  const fn = brn(
    (x: number) => x >= 10,
    always(`2 digit`),
    brn((x) => x < 0, always("negative"), always("single digit"))
  );

  const expected: ReturnType<typeof fn> = "negative";
  expect(fn(-10)).toBe(expected);
});
