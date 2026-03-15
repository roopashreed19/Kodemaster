export const challenges = {
  dsa: {
    floor1: {
      id: "floor1",
      title: "The Sliding Window Serpent",
      difficulty: "Easy",
      xpReward: 50,
      
      // THE LOGIC SECTION
      logicTitle: "The Art of the Sliding Window",
      logicDesc: "Instead of using nested loops (O(n*k)), we maintain a running sum. When the window slides, we subtract the element that is 'falling out' of the back and add the new element 'entering' from the front.",
      
      // THE CHALLENGE SECTION
      description: "You are given an array of integers `nums` and an integer `k`. Your mission is to find the maximum sum of any contiguous subarray of size `k` and return it.",
      
      testCases: [
        { id: 1, input: "[2, 1, 5, 1, 3, 2], k=3", expected: "9" },
        { id: 2, input: "[2, 3, 4, 1, 5], k=2", expected: "7" },
        { id: 3, input: "[1, 2, 3, 4, 5, 6], k=3", expected: "15" }
      ],

      defaultCode: {
        javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function solve(nums, k) {
    let maxSum = 0;
    let windowSum = 0;

    // 1. Calculate sum of the first window
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    maxSum = windowSum;

    // 2. Slide the window across the rest of the array
    for (let i = k; i < nums.length; i++) {
        // Subtract the element leaving, add the element entering
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    console.log(maxSum);
    return maxSum;
}

// Initial Test
solve([2, 1, 5, 1, 3, 2], 3);`,

        python: `def solve(nums, k):
    max_sum = 0
    window_sum = 0
    
    # 1. Calculate sum of the first window
    for i in range(k):
        window_sum += nums[i]
    max_sum = window_sum
    
    # 2. Slide the window
    for i in range(k, len(nums)):
        window_sum = window_sum - nums[i-k] + nums[i]
        max_sum = max(max_sum, window_sum)
        
    print(max_sum)
    return max_sum

# Initial Test
solve([2, 1, 5, 1, 3, 2], 3)`
      }
    }
  }
};