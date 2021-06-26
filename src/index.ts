type Tuple = any[];
type Falsy = 0 | 0n | null | false | '' | undefined | void;
type Truthy = Extract<object | symbol | Function | true | number | string | bigint, Falsy>;
type TestFn<InputArgs extends Tuple, Outcome extends Falsy | Truthy > = (...args: InputArgs) => Outcome;
type BranchFn<InputArgs extends Tuple, Output> = (...args: InputArgs) => Output;


export default function branch<InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
  test: TestFn<InputArgs, Falsy>,
  left: BranchFn<InputArgs, LeftOutput>,
  right: BranchFn<InputArgs, RightOutput>
): (...args: InputArgs) => RightOutput;

export default function branch<InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
  test: TestFn<InputArgs, Truthy>,
  left: BranchFn<InputArgs, LeftOutput>,
  right: BranchFn<InputArgs, RightOutput>
): (...args: InputArgs) => LeftOutput;

export default function branch<InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
  test: TestFn<InputArgs, any>,
  left: BranchFn<InputArgs, LeftOutput>,
  right: BranchFn<InputArgs, RightOutput>
): (...args: InputArgs) => LeftOutput | RightOutput;

export default function branch<InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
  test: TestFn<InputArgs, Falsy>,
  left: BranchFn<InputArgs, LeftOutput>,
): (...args: InputArgs) => InputArgs[0];

export default function branch<InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
  test: TestFn<InputArgs, Truthy>,
  left: BranchFn<InputArgs, LeftOutput>,
): (...args: InputArgs) => LeftOutput;

export default function branch<InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
  test: TestFn<InputArgs, any>,
  left: BranchFn<InputArgs, LeftOutput>,
): (...args: InputArgs) => LeftOutput | InputArgs[0];


export default function branch<InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
  test: TestFn<InputArgs, any>,
): (...args: InputArgs) => InputArgs[0];

export default function branch<InputArgs extends Tuple, LeftOutput = InputArgs[0], RightOutput = InputArgs[0]>(
  test: TestFn<InputArgs, any>,
  left?: BranchFn<InputArgs, LeftOutput>,
  right?: BranchFn<InputArgs, RightOutput>
) {
  let leftActual = left ?? identity;
  let rightActual = right ?? identity;
  return function(...args: InputArgs) {
    if (test(...args)) {
      return leftActual(...args);
    }

    return rightActual(...args);
  };
};

interface IdentityFn<InputArgs extends Tuple> {
  (...args: InputArgs): InputArgs[0]
}

const identity:IdentityFn<any> = (x) => x