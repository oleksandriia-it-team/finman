export function blockSameProps<ARGS extends Array<unknown>, ReturnType>(fn: (...args: ARGS) => ReturnType, isSameFn?: (args1: ARGS, args2: ARGS) => boolean): (...args: ARGS) => ReturnType | null {
  let prevArgs: ARGS | null = null;

  return (...args: ARGS) => {
    if(!prevArgs) {
      prevArgs = args;
      return fn(...args);
    }

    if (args.length !== prevArgs.length) {
      prevArgs = args;
      return fn(...args);
    }

    const isChanged = isSameFn ? !isSameFn(args, prevArgs as ARGS) : Object.values(args).some((arg, index) => {
      if(typeof arg === typeof (prevArgs as ARGS)[index] && typeof arg === 'object' && arg !== null) {
        return JSON.stringify(arg) !== JSON.stringify((prevArgs as ARGS)[index]);
      }

      return args !== (prevArgs as ARGS)[index];
    });

    if(isChanged) {
      prevArgs = args;
      return fn(...args);
    }

    return null;
  }
}