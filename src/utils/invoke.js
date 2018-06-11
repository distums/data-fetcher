export default function invoke(fns, ...args) {
  for (const fn of fns) {
    fn(...args);
  }
}
