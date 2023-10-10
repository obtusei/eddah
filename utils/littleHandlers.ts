export const commaArray = (arra: string) => {
  //remove first and last letters
  let arr = arra;
  arr = arr.slice(1, -1);
  //  string is in "Indepedent","Friendly" format so make it Independent, Friendly
  arr = arr.replace(/"/g, "");
  //split the string into array
  let newArray = arr.split(",");
  //turn the array into a string with commas
  arr = newArray.join(", ");

  // if (arr && arr.length > 0) {
  //   const data = arr.join(', ')
  //   return data
  // }
  return arr;
};
