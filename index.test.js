const brn = require('./index');

it('should return left when test returns true', () => {
  const test = jest.fn(() => true);
  const left = jest.fn(() => 'left');
  const right = jest.fn(() => 'right');

  const fn = brn(test, left, right);

  expect(fn(1, 2, 3)).toBe('left');

  expect(test).toBeCalledWith(1, 2, 3);
  expect(left).toBeCalledWith(1, 2, 3);
  expect(right).not.toBeCalled();
});

it('should return right when test returns false', () => {
  const test = jest.fn(() => false);
  const left = jest.fn(() => 'left');
  const right = jest.fn(() => 'right');

  const fn = brn(test, left, right);

  expect(fn(1, 2, 3)).toBe('right');

  expect(test).toBeCalledWith(1, 2, 3);
  expect(right).toBeCalledWith(1, 2, 3);
  expect(left).not.toBeCalled();
});

it('should return right when test returns null', () => {
  const test = jest.fn(() => null);
  const left = jest.fn(() => 'left');
  const right = jest.fn(() => 'right');

  const fn = brn(test, left, right);

  expect(fn(1, 2, 3)).toBe('right');

  expect(test).toBeCalledWith(1, 2, 3);
  expect(right).toBeCalledWith(1, 2, 3);
  expect(left).not.toBeCalled();
});

it('should return right when test returns undefined', () => {
  const test = jest.fn(() => {});
  const left = jest.fn(() => 'left');
  const right = jest.fn(() => 'right');

  const fn = brn(test, left, right);

  expect(fn(1, 2, 3)).toBe('right');

  expect(test).toBeCalledWith(1, 2, 3);
  expect(right).toBeCalledWith(1, 2, 3);
  expect(left).not.toBeCalled();
});

it('should return right when test returns 0', () => {
  const test = jest.fn(() => 0);
  const left = jest.fn(() => 'left');
  const right = jest.fn(() => 'right');

  const fn = brn(test, left, right);

  expect(fn(1, 2, 3)).toBe('right');

  expect(test).toBeCalledWith(1, 2, 3);
  expect(right).toBeCalledWith(1, 2, 3);
  expect(left).not.toBeCalled();
});

it('should return the first arg when test is falsy and right is omitted', () => {
  const test = jest.fn(() => false);
  const left = jest.fn(() => 'left');

  const fn = brn(test, left);

  expect(fn(1, 2, 3)).toBe(1);

  expect(test).toBeCalledWith(1, 2, 3);
  expect(left).not.toBeCalled();
});

it('should return the first arg when test is truthy and left is omitted', () => {
  const test = jest.fn(() => false);
  const fn = brn(test);

  expect(fn(1, 2, 3)).toBe(1);

  expect(test).toBeCalledWith(1, 2, 3);
});
