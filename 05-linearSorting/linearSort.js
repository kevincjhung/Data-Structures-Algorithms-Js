/**
 * Counting Sort Algorithm
 * @param {number[]} arr - The array to be sorted
 * @returns {number[]} - The sorted array
 */
function countingSort(arr) {
  if (arr.length === 0) return [];

  // Find the maximum and minimum values in the array
  const max = Math.max(...arr);
  const min = Math.min(...arr);

  // Create a count array to store the count of each unique number
  const countArray = new Array(max - min + 1).fill(0);

  // Count the occurrences of each number
  for (let num of arr) {
      countArray[num - min]++;
  }

  // Build the sorted array
  let sortedIndex = 0;
  for (let i = 0; i < countArray.length; i++) {
      while (countArray[i] > 0) {
          arr[sortedIndex++] = i + min;
          countArray[i]--;
      }
  }

  return arr;
}



/**
 * Helper function to get the digit at a specific place value
 * @param {number} num - The number from which to extract the digit
 * @param {number} place - The place value (0 for units, 1 for tens, etc.)
 * @returns {number} - The digit at the specified place value
 */
function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

/**
* Helper function to count the number of digits in a number
* @param {number} num - The number to count digits
* @returns {number} - The number of digits in the number
*/
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

/**
* Helper function to find the maximum number of digits in an array of numbers
* @param {number[]} nums - The array of numbers
* @returns {number} - The maximum number of digits found in the array
*/
function mostDigits(nums) {
  let maxDigits = 0;
  for (let num of nums) {
      maxDigits = Math.max(maxDigits, digitCount(num));
  }
  return maxDigits;
}

/**
* Radix Sort Algorithm
* @param {number[]} nums - The array of numbers to be sorted
* @returns {number[]} - The sorted array
*/
function radixSort(nums) {
  const maxDigitCount = mostDigits(nums);

  // Loop through each digit place (units, tens, hundreds, etc.)
  for (let k = 0; k < maxDigitCount; k++) {
      // Create buckets for each digit (0 to 9)
      const digitBuckets = Array.from({ length: 10 }, () => []);

      // Place each number in the corresponding bucket based on the current digit
      for (let num of nums) {
          const digit = getDigit(num, k);
          digitBuckets[digit].push(num);
      }

      // Flatten the buckets back into the array
      nums = [].concat(...digitBuckets);
  }

  return nums;
}
