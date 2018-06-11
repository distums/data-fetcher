export default function push(arr, item) {
  arr.push(item);
  const index = arr.length - 1;
  return function pop() {
    return arr.splice(index, 1);
  };
}
