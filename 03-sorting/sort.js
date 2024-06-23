function selectionSort(arr){
  for(let i = 0; i < arr.length - 1; i++){
    let min_index = i; // index of the smallest element

    for(let j = i + 1; j < arr.length; j++){
      if (arr[j] < arr[min_index]){
        min_index = j;
      }
    }

    if (min_index != i){
      [arr[i], arr[min_index]] = [arr[min_index], arr[i]];
    }
  }

  return arr
}


function insertionSort(arr){
  for(let i = 0; i < arr.length; i++){
    // store the current element
    let key = arr[i]

    let j = i-1

    while(j >= 0 && arr[j] > key){
      arr[j + 1] = arr[j]
      j = j - 1
    }

    arr[j+1] = key
  }

  return arr
}


function merge(arr1, arr2) {
  let resultArray = [];
  
  while (arr1.length !== 0 && arr2.length !== 0) {
    if (arr1[0] <= arr2[0]) {
      resultArray.push(arr1.shift());
    } else {
      resultArray.push(arr2.shift());
    }
  }

  // Concatenate remaining elements (one of the arrays might be empty)
  resultArray = resultArray.concat(arr1).concat(arr2);
  return resultArray;
}

/**
 * Sorts an array using mergesort
 * 
 * @param {*} array 
 * @returns 
 */
function mergeSort(array){
  // base case, if array has 1 or 0 item, it is already sorted
  if (array.length <= 1){
    return array
  }

  let middleIndex = Math.floor(array.length/2)
  let leftArray = array.slice(0, middleIndex)
  let rightArray = array.slice(middleIndex)

  return merge(mergeSort(leftArray), mergeSort(rightArray))
}


/**
 * Sorts an array using the QuickSort algorithm.
 * It picks a "pivot" element and partitions
 * the array into two sub-arrays: elements smaller than the pivot and elements
 * larger than the pivot. It then recursively sorts these sub-arrays until the
 * entire array is sorted.
 * 
 * @param {Array} array - The array to be sorted.
 * @param {number} lowIndex - The starting index of the array segment to be sorted.
 * @param {number} highIndex - The ending index of the array segment to be sorted.
 * @returns {Array} The sorted array.
 */
function quickSort(array, lowIndex = 0, highIndex = array.length - 1) {
  if (lowIndex < highIndex) {
      // Partition the array and get the pivot index
      const pivotIndex = partition(array, lowIndex, highIndex);

      // Recursively sort elements before and after partition
      quickSort(array, lowIndex, pivotIndex - 1);
      quickSort(array, pivotIndex + 1, highIndex);
  }
  return array; // Return the sorted array
}


/**
* Helper function for quickSort()
* Partitions the array segment and returns the index of the pivot.
* 
* @param {Array} array - The array to be partitioned.
* @param {number} lowIndex - The starting index of the array segment.
* @param {number} highIndex - The ending index of the array segment.
* @returns {number} The index of the pivot.
*/
function partition(array, lowIndex, highIndex) {
  // Choose the pivot as the last element of the array segment
  const pivot = array[highIndex];
  let i = lowIndex - 1; // Index of smaller element

  for (let j = lowIndex; j < highIndex; j++) {
      // If the current element is smaller than or equal to the pivot
      if (array[j] <= pivot) {
          i++;
          // Swap array[i] and array[j]
          [array[i], array[j]] = [array[j], array[i]];
      }
  }
  // Swap array[i + 1] and array[highIndex] (or pivot)
  [array[i + 1], array[highIndex]] = [array[highIndex], array[i + 1]];
  return i + 1;
}


module.exports = {
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  merge,
  partition,
};