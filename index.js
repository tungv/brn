function identity(x) {
  return x;
}

module.exports = function branch(test, left, right) {
  return function() {
    const args = [].slice.apply(arguments);

    test = test || identity;
    left = left || identity;
    right = right || identity;

    if (test.apply(null, args)) {
      return left.apply(null, args);
    }

    return right.apply(null, args);
  };
};
