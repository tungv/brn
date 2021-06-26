type Tuple = any[];
type Falsy = 0 | 0n | null | false | "" | undefined | void;
type Truthy = Extract<object | symbol | Function | true | number | string | bigint, Falsy>;
type TestFn<InputArgs extends Tuple, Outcome extends Falsy | Truthy> = (...args: InputArgs) => Outcome;
type BranchFn<InputArgs extends Tuple, Output> = (...args: InputArgs) => Output;

interface BranchModule {
  <InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
    test: TestFn<InputArgs, Falsy>,
    left: BranchFn<InputArgs, LeftOutput>,
    right: BranchFn<InputArgs, RightOutput>
  ): (...args: InputArgs) => RightOutput;

  <InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
    test: TestFn<InputArgs, Truthy>,
    left: BranchFn<InputArgs, LeftOutput>,
    right: BranchFn<InputArgs, RightOutput>
  ): (...args: InputArgs) => LeftOutput;

  <InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
    test: TestFn<InputArgs, any>,
    left: BranchFn<InputArgs, LeftOutput>,
    right: BranchFn<InputArgs, RightOutput>
  ): (...args: InputArgs) => LeftOutput | RightOutput;

  <InputArgs extends Tuple, LeftOutput = InputArgs[0]>(
    test: TestFn<InputArgs, Falsy>,
    left: BranchFn<InputArgs, LeftOutput>
  ): (...args: InputArgs) => InputArgs[0];

  <InputArgs extends Tuple, LeftOutput = InputArgs[0]>(
    test: TestFn<InputArgs, Truthy>,
    left: BranchFn<InputArgs, LeftOutput>
  ): (...args: InputArgs) => LeftOutput;

  <InputArgs extends Tuple, LeftOutput = InputArgs[0]>(
    test: TestFn<InputArgs, any>,
    left: BranchFn<InputArgs, LeftOutput>
  ): (...args: InputArgs) => LeftOutput | InputArgs[0];

  <InputArgs extends Tuple>(test: TestFn<InputArgs, any>): (...args: InputArgs) => InputArgs[0];
}

const branch: BranchModule = function <InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
  test: TestFn<InputArgs, any>,
  left?: BranchFn<InputArgs, LeftOutput>,
  right?: BranchFn<InputArgs, RightOutput>
) {
  let leftActual = left ?? identity;
  let rightActual = right ?? identity;
  return function (...args: InputArgs) {
    if (test(...args)) {
      return leftActual(...args);
    }

    return rightActual(...args);
  };
};

export default branch;
module.exports = branch;

interface IdentityFn<InputArgs extends Tuple> {
  (...args: InputArgs): InputArgs[0];
}

const identity: IdentityFn<any> = (x) => x;
