export const groupConsecutiveByProp =
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  <T extends Record<string, any>>(arr: T[], prop: keyof T): T[][] =>
    arr.reduce((acc: T[][], value: T) => {
      // compare the current value with the last item in the collected array
      if (acc.length && acc[acc.length - 1][0][prop] === value[prop]) {
        // append the current value to it if it is matching
        acc[acc.length - 1].push(value);
      } else {
        // append the new value at the end of the collected array
        acc.push([value]);
      }
      return acc;
    }, []);
