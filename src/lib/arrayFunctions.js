export const moveArrayElement = (arr, oldIndex, newIndex) => {
  if (oldIndex < newIndex) {
    const item = arr.splice(oldIndex, 1)[0];
    arr.splice(newIndex - 1, 0, item);
  } else {
    const item = arr.splice(oldIndex, 1)[0];
    arr.splice(newIndex, 0, item);
  }
  
  return arr;
}