export const challenges = {
  dsa: {
    floor1: {
      id: "floor1",
      name: "Array Abyss",
      questions: [
        {
          id: "q1",
          title: "The Sliding Window Serpent",
          difficulty: "Easy",
          xp: 50,
          description: "Given an array of integers and a number k, find the maximum sum of any contiguous subarray of size k.",
          logic: "Instead of recalculating the sum for every window, subtract the element leaving the window and add the one entering it. This maintains O(n) complexity.",
          testCases: [
            { input: "[2, 1, 5, 1, 3, 2], 3", expected: "9" },
            { input: "[2, 3, 4, 1, 5], 2", expected: "7" },
            { input: "[1, 2, 3, 4, 5, 6], 3", expected: "15" }
          ],
          defaultCode: {
            javascript: "function solve(nums, k) {\n  let maxSum = 0;\n  // Your logic here\n  return maxSum;\n}",
            python: "def solve(nums, k):\n    max_sum = 0\n    # Your logic here\n    return max_sum",
            java: "class Solution {\n    public int solve(int[] nums, int k) {\n        return 0;\n    }\n}",
            cpp: "int solve(vector<int>& nums, int k) {\n    return 0;\n}",
            c: "int solve(int* nums, int numsSize, int k) {\n    return 0;\n}",
            ruby: "def solve(nums, k)\n  0\nend"
          }
        },
        {
          id: "q2",
          title: "Two-Sum Sentinel",
          difficulty: "Easy",
          xp: 50,
          description: "Given an array of integers and a target, return indices of the two numbers such that they add up to the target.",
          logic: "Use a Hash Map to store numbers you've already seen. For every number 'x', check if 'target - x' exists in your map.",
          testCases: [
            { input: "[2, 7, 11, 15], 9", expected: "0,1" },
            { input: "[3, 2, 4], 6", expected: "1,2" },
            { input: "[3, 3], 6", expected: "0,1" }
          ],
          defaultCode: {
            javascript: "function solve(nums, target) {\n  // return [index1, index2]\n}",
            python: "def solve(nums, target):\n    # return [index1, index2]",
            java: "class Solution {\n    public int[] solve(int[] nums, int target) {\n        return new int[]{0, 0};\n    }\n}",
            cpp: "vector<int> solve(vector<int>& nums, int target) {\n    return {0, 0};\n}",
            c: "int* solve(int* nums, int numsSize, int target) {\n    static int res[2];\n    return res;\n}",
            ruby: "def solve(nums, target)\n  [0, 0]\nend"
          }
        },
        {
          id: "q3",
          title: "The Zero-Sum Phantom",
          difficulty: "Medium",
          xp: 100,
          description: "Find if there is a contiguous subarray whose sum equals 0. Return true or false.",
          logic: "Use the Prefix Sum technique. If a sum repeats, it means the elements in between summed to zero.",
          testCases: [
            { input: "[4, 2, -3, 1, 6]", expected: "true" },
            { input: "[1, 2, 3]", expected: "false" },
            { input: "[0, 1, 2]", expected: "true" }
          ],
          defaultCode: {
            javascript: "function solve(nums) {\n  return false;\n}",
            python: "def solve(nums):\n    return False",
            java: "class Solution {\n    public boolean solve(int[] nums) {\n        return false;\n    }\n}",
            cpp: "bool solve(vector<int>& nums) {\n    return false;\n}",
            c: "int solve(int* nums, int numsSize) {\n    return 0;\n}",
            ruby: "def solve(nums)\n  false\nend"
          }
        },
        {
          id: "q4",
          title: "The Dutch Flag Duel",
          difficulty: "Medium",
          xp: 100,
          description: "Sort an array of 0s, 1s, and 2s in-place (red, white, and blue).",
          logic: "Use three pointers (low, mid, high) to partition the array in a single pass.",
          testCases: [
            { input: "[2, 0, 2, 1, 1, 0]", expected: "0,0,1,1,2,2" },
            { input: "[2, 0, 1]", expected: "0,1,2" },
            { input: "[0]", expected: "0" }
          ],
          defaultCode: {
            javascript: "function solve(nums) {\n  return nums;\n}",
            python: "def solve(nums):\n    return nums",
            java: "class Solution {\n    public int[] solve(int[] nums) {\n        return nums;\n    }\n}",
            cpp: "vector<int> solve(vector<int>& nums) {\n    return nums;\n}",
            c: "int* solve(int* nums, int numsSize) {\n    return nums;\n}",
            ruby: "def solve(nums)\n  nums\nend"
          }
        },
        {
          id: "q5",
          title: "The Trapping Rain Titan",
          difficulty: "Hard",
          xp: 200,
          description: "Compute how much water an elevation map can trap after raining.",
          logic: "Use two pointers at both ends of the array. Track left_max and right_max to calculate the water at each index.",
          testCases: [
            { input: "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", expected: "6" },
            { input: "[4, 2, 0, 3, 2, 5]", expected: "9" },
            { input: "[1, 1, 1]", expected: "0" }
          ],
          defaultCode: {
            javascript: "function solve(height) {\n  return 0;\n}",
            python: "def solve(height):\n    return 0",
            java: "class Solution {\n    public int solve(int[] height) {\n        return 0;\n    }\n}",
            cpp: "int solve(vector<int>& height) {\n    return 0;\n}",
            c: "int solve(int* height, int heightSize) {\n    return 0;\n}",
            ruby: "def solve(height)\n  0\nend"
          }
        }
      ]
    }
    // Floor 2 (String Sanctum) is omitted here because your useEffect 
    // will now fetch it dynamically from your MongoDB.
  }
};