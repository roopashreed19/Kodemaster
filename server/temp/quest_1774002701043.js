function solve(nums, k) {
  let maxSum = 0;
  let windowSum = 0;

  // 1. Calculate the sum of the first window (first k elements)
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  // Initialize maxSum with the first window's sum
  maxSum = windowSum;

  // 2. Slide the window across the rest of the array
  for (let i = k; i < nums.length; i++) {
    // Add the element entering the window (nums[i])
    // Subtract the element leaving the window (nums[i - k])
    windowSum += nums[i] - nums[i - k];
    
    // Update maxSum if the new windowSum is larger
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
            const testCases = [{"input":"[2, 1, 5, 1, 3, 2], 3","expected":"9","_id":"69bd1ae8c2044e73a255dab6"},{"input":"[2, 3, 4, 1, 5], 2","expected":"7","_id":"69bd1ae8c2044e73a255dab7"}];
            testCases.forEach((tc, index) => {
                try {
                    const args = JSON.parse("[" + tc.input + "]"); 
                    const result = solve(...args);
                    process.stdout.write(result.toString() + (index < testCases.length - 1 ? "###" : ""));
                } catch (e) {
                    process.stderr.write("Runtime Error in test case " + (index + 1));
                }
            });
        