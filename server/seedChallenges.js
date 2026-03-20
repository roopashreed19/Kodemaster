const mongoose = require('mongoose');
// Standardizing to lowercase to match your folder structure and avoid casing crashes
const Challenge = require('./models/challenges'); 
require('dotenv').config();
const arrayAbyssQuests = [
  {
    subject: "dsa",
    floorId: "floor1",
    floorName: "Array Abyss",
    id: "q1",
    title: "The Sliding Window Serpent",
    difficulty: "Easy",
    xp: 50,
    description: "Given an array of integers and a number k, find the maximum sum of any contiguous subarray of size k.",
    logic: "Instead of recalculating the sum for every window, subtract the element leaving the window and add the one entering it. This maintains O(n) complexity.",
    testCases: [
      { input: "[2, 1, 5, 1, 3, 2], 3", expected: "9" },
      { input: "[2, 3, 4, 1, 5], 2", expected: "7" }
    ],
    defaultCode: {
      javascript: "function solve(nums, k) {\n  let maxSum = 0;\n  // Your logic here\n  return maxSum;\n}",
      python: "def solve(nums, k):\n    max_sum = 0\n    return max_sum"
    }
  },
  {
    subject: "dsa",
    floorId: "floor1",
    floorName: "Array Abyss",
    id: "q2",
    title: "Two-Sum Sentinel",
    difficulty: "Easy",
    xp: 50,
    description: "Given an array of integers and a target, return indices of the two numbers such that they add up to the target.",
    logic: "Use a Hash Map to store numbers you've already seen. For every number 'x', check if 'target - x' exists in your map.",
    testCases: [
      { input: "[2, 7, 11, 15], 9", expected: "0,1" },
      { input: "[3, 2, 4], 6", expected: "1,2" }
    ],
    defaultCode: {
      javascript: "function solve(nums, target) {\n  // return [index1, index2]\n}",
      python: "def solve(nums, target):\n    # logic here"
    }
  },
  {
    subject: "dsa",
    floorId: "floor1",
    floorName: "Array Abyss",
    id: "q3",
    title: "The Zero-Sum Phantom",
    difficulty: "Medium",
    xp: 100,
    description: "Find if there is a contiguous subarray whose sum equals 0. Return true or false.",
    logic: "Use the Prefix Sum technique. If a sum repeats, it means the elements in between summed to zero.",
    testCases: [
      { input: "[4, 2, -3, 1, 6]", expected: "true" }
    ],
    defaultCode: {
      javascript: "function solve(nums) {\n  return false;\n}"
    }
  },
  {
    subject: "dsa",
    floorId: "floor1",
    floorName: "Array Abyss",
    id: "q4",
    title: "The Dutch Flag Duel",
    difficulty: "Medium",
    xp: 100,
    description: "Sort an array of 0s, 1s, and 2s in-place (red, white, and blue).",
    logic: "Use three pointers (low, mid, high) to partition the array in a single pass.",
    testCases: [
      { input: "[2, 0, 2, 1, 1, 0]", expected: "0,0,1,1,2,2" }
    ],
    defaultCode: {
      javascript: "function solve(nums) {\n  return nums;\n}"
    }
  },
  {
    subject: "dsa",
    floorId: "floor1",
    floorName: "Array Abyss",
    id: "q5",
    title: "The Trapping Rain Titan",
    difficulty: "Hard",
    xp: 200,
    description: "Compute how much water an elevation map can trap after raining.",
    logic: "Use two pointers at both ends of the array. Track left_max and right_max to calculate the water at each index.",
    testCases: [
      { input: "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", expected: "6" }
    ],
    defaultCode: {
      javascript: "function solve(height) {\n  return 0;\n}"
    }
  }
];

const stringSanctumQuests = [
  {
    subject: "dsa",
    floorId: "floor2",
    floorName: "String Sanctum",
    id: "q1",
    title: "The Anagram Alchemist",
    difficulty: "Easy",
    xp: 50,
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    logic: "An Anagram is a word formed by rearranging the letters of a different word. Use a frequency map (hash map) to count characters. Increment for String A, decrement for String B.",
    testCases: [
      { input: '"anagram", "nagaram"', expected: "true" },
      { input: '"rat", "car"', expected: "false" }
    ],
    defaultCode: {
      javascript: "function solve(s, t) {\n  // Use a frequency map to compare counts\n  return false;\n}",
      python: "def solve(s, t):\n    # Your frequency map logic here\n    return False",
      java: "class Solution {\n    public boolean solve(String s, String t) {\n        return false;\n    }\n}"
    }
  },
  {
    subject: "dsa",
    floorId: "floor2",
    floorName: "String Sanctum",
    id: "q2",
    title: "The Palindrome Path",
    difficulty: "Easy",
    xp: 50,
    description: "Given a string s, return true if it is a palindrome, or false otherwise.",
    logic: "A palindrome reads the same backward as forward. Use two pointers: one at the start and one at the end, moving toward the center.",
    testCases: [
      { input: '"racecar"', expected: "true" },
      { input: '"hello"', expected: "false" }
    ],
    defaultCode: {
      javascript: "function solve(s) {\n  // Use two pointers to check symmetry\n  return false;\n}",
      python: "def solve(s):\n    # Return True if palindrome\n    return False"
    }
  },
  {
    subject: "dsa",
    floorId: "floor2",
    floorName: "String Sanctum",
    id: "q3",
    title: "Non-Repeating Nomad",
    difficulty: "Medium",
    xp: 100,
    description: "Find the length of the longest substring without repeating characters.",
    logic: "Use a sliding window with a Set or Hash Map to track unique characters. Expand the window until a duplicate is found, then shrink from the left.",
    testCases: [
      { input: '"abcabcbb"', expected: "3" },
      { input: '"bbbbb"', expected: "1" }
    ],
    defaultCode: {
      javascript: "function solve(s) {\n  // Implement sliding window logic\n  return 0;\n}",
      python: "def solve(s):\n    return 0"
    }
  },
  {
    subject: "dsa",
    floorId: "floor2",
    floorName: "String Sanctum",
    id: "q4",
    title: "The Roman Ritual",
    difficulty: "Medium",
    xp: 100,
    description: "Convert a Roman numeral string to an integer.",
    logic: "Map Roman characters to values. Iterate through the string; if a smaller value precedes a larger one, subtract it; otherwise, add it.",
    testCases: [
      { input: '"LVIII"', expected: "58" },
      { input: '"MCMXCIV"', expected: "1994" }
    ],
    defaultCode: {
      javascript: "function solve(s) {\n  // Map Roman symbols to values and iterate\n  return 0;\n}",
      python: "def solve(s):\n    return 0"
    }
  },
  {
    subject: "dsa",
    floorId: "floor2",
    floorName: "String Sanctum",
    id: "q5",
    title: "Longest Common Prefix Spell",
    difficulty: "Easy",
    xp: 50,
    description: "Find the longest common prefix string amongst an array of strings.",
    logic: "Compare the first string with others. Gradually shorten the prefix until it matches the start of every string in the array.",
    testCases: [
      { input: '["flower","flow","flight"]', expected: '"fl"' },
      { input: '["dog","racecar","car"]', expected: '""' }
    ],
    defaultCode: {
      javascript: "function solve(strs) {\n  // Find the common prefix\n  return '';\n}",
      python: "def solve(strs):\n    return ''"
    }
  }
];
const remainingQuests = [
  // --- FLOOR 3: POINTER PEAK (Two Pointers) ---
  {
    subject: "dsa", floorId: "floor3", floorName: "Pointer Peak", id: "q1", title: "Two Sum II", difficulty: "Easy", xp: 50,
    description: "In a sorted array, find two numbers that sum to a target.",
    logic: "Use two pointers (left and right). Adjust based on sum vs target.",
    testCases: [{ input: '[2,7,11,15], 9', expected: '[1,2]' }],
    defaultCode: { javascript: "function solve(nums, target) { \n // Logic here \n return []; \n}" }
  },
  {
    subject: "dsa", floorId: "floor3", floorName: "Pointer Peak", id: "q2", title: "Remove Duplicates", difficulty: "Easy", xp: 50,
    description: "Remove duplicates from a sorted array in-place.",
    logic: "Use a slow and fast pointer to overwrite duplicates.",
    testCases: [{ input: '[1,1,2]', expected: '2' }],
    defaultCode: { javascript: "function solve(nums) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor3", floorName: "Pointer Peak", id: "q3", title: "Container With Most Water", difficulty: "Medium", xp: 100,
    description: "Find two lines that form a container holding the most water.",
    logic: "Pointers at ends. Move the pointer with the smaller height.",
    testCases: [{ input: '[1,8,6,2,5,4,8,3,7]', expected: '49' }],
    defaultCode: { javascript: "function solve(height) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor3", floorName: "Pointer Peak", id: "q4", title: "3Sum", difficulty: "Medium", xp: 100,
    description: "Find all unique triplets that sum to zero.",
    logic: "Sort the array, then use a loop with two pointers.",
    testCases: [{ input: '[-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]' }],
    defaultCode: { javascript: "function solve(nums) { return []; }" }
  },
  {
    subject: "dsa", floorId: "floor3", floorName: "Pointer Peak", id: "q5", title: "Trapping Rain Water", difficulty: "Hard", xp: 200,
    description: "Compute how much water it can trap after raining.",
    logic: "Maintain left_max and right_max using two pointers.",
    testCases: [{ input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' }],
    defaultCode: { javascript: "function solve(height) { return 0; }" }
  },

  // --- FLOOR 4: LINKER’S LODGE (Linked Lists) ---
  {
    subject: "dsa", floorId: "floor4", floorName: "Linker’s Lodge", id: "q1", title: "Reverse List", difficulty: "Easy", xp: 50,
    description: "Reverse a singly linked list.",
    logic: "Iterate through, changing 'next' pointers to point to 'prev'.",
    testCases: [{ input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' }],
    defaultCode: { javascript: "function solve(head) { return null; }" }
  },
  {
    subject: "dsa", floorId: "floor4", floorName: "Linker’s Lodge", id: "q2", title: "Cycle Detection", difficulty: "Easy", xp: 50,
    description: "Determine if a linked list has a cycle.",
    logic: "Floyd's Tortoise and Hare (slow and fast pointers).",
    testCases: [{ input: '[3,2,0,-4]', expected: 'true' }],
    defaultCode: { javascript: "function solve(head) { return false; }" }
  },
  {
    subject: "dsa", floorId: "floor4", floorName: "Linker’s Lodge", id: "q3", title: "Merge Two Sorted Lists", difficulty: "Easy", xp: 50,
    description: "Merge two sorted linked lists into one.",
    logic: "Use a dummy head and compare nodes of both lists.",
    testCases: [{ input: '[1,2,4], [1,3,4]', expected: '[1,1,2,3,4,4]' }],
    defaultCode: { javascript: "function solve(l1, l2) { return null; }" }
  },
  {
    subject: "dsa", floorId: "floor4", floorName: "Linker’s Lodge", id: "q4", title: "Remove N-th Node", difficulty: "Medium", xp: 100,
    description: "Remove the n-th node from the end of the list.",
    logic: "Two pointers separated by 'n' distance.",
    testCases: [{ input: '[1,2,3,4,5], 2', expected: '[1,2,3,5]' }],
    defaultCode: { javascript: "function solve(head, n) { return null; }" }
  },
  {
    subject: "dsa", floorId: "floor4", floorName: "Linker’s Lodge", id: "q5", title: "LRU Cache", difficulty: "Hard", xp: 200,
    description: "Design a Least Recently Used (LRU) cache.",
    logic: "Combination of a Hash Map and a Doubly Linked List.",
    testCases: [{ input: '["LRUCache", "put", "get"], [[2], [1,1], [1]]', expected: '[null, null, 1]' }],
    defaultCode: { javascript: "class LRUCache { \n // Implement logic \n }" }
  },

  // --- FLOOR 5: STACK SUMMIT (Stacks & Queues) ---
  {
    subject: "dsa", floorId: "floor5", floorName: "Stack Summit", id: "q1", title: "Valid Parentheses", difficulty: "Easy", xp: 50,
    description: "Determine if parentheses strings are valid.",
    logic: "Use a stack to push opening brackets and pop for matches.",
    testCases: [{ input: '"()[]{}"', expected: 'true' }],
    defaultCode: { javascript: "function solve(s) { return false; }" }
  },
  {
    subject: "dsa", floorId: "floor5", floorName: "Stack Summit", id: "q2", title: "Min Stack", difficulty: "Medium", xp: 100,
    description: "Design a stack that supports push, pop, top, and min in O(1).",
    logic: "Use a secondary stack to track the minimum values.",
    testCases: [{ input: '["MinStack","push","getMin"], [[],[-2],[]]', expected: '[null,null,-2]' }],
    defaultCode: { javascript: "class MinStack { \n // Logic here \n }" }
  },
  {
    subject: "dsa", floorId: "floor5", floorName: "Stack Summit", id: "q3", title: "Daily Temperatures", difficulty: "Medium", xp: 100,
    description: "Find how many days to wait for a warmer temperature.",
    logic: "Monotonic stack to store indices of temperatures.",
    testCases: [{ input: '[73,74,75,71,69,72,76,73]', expected: '[1,1,4,2,1,1,0,0]' }],
    defaultCode: { javascript: "function solve(t) { return []; }" }
  },
  {
    subject: "dsa", floorId: "floor5", floorName: "Stack Summit", id: "q4", title: "Evaluate RPN", difficulty: "Medium", xp: 100,
    description: "Evaluate Reverse Polish Notation expressions.",
    logic: "Push numbers; pop two for every operator found.",
    testCases: [{ input: '["2","1","+","3","*"]', expected: '9' }],
    defaultCode: { javascript: "function solve(tokens) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor5", floorName: "Stack Summit", id: "q5", title: "Largest Rectangle in Histogram", difficulty: "Hard", xp: 200,
    description: "Find the area of the largest rectangle in a histogram.",
    logic: "Monotonic increasing stack to track heights.",
    testCases: [{ input: '[2,1,5,6,2,3]', expected: '10' }],
    defaultCode: { javascript: "function solve(heights) { return 0; }" }
  }

  
];
const recursionRiftQuests = [
  {
    subject: "dsa", floorId: "floor6", floorName: "Recursion Rift", id: "q1", title: "Fibonacci's Echo", difficulty: "Easy", xp: 50,
    description: "Calculate the n-th Fibonacci number.",
    logic: "Base cases are n=0 and n=1. Use f(n) = f(n-1) + f(n-2).",
    testCases: [{ input: "5", expected: "5" }, { input: "10", expected: "55" }],
    defaultCode: { javascript: "function solve(n) {\n  // Base cases and recursive relation\n  return 0;\n}" }
  },
  {
    subject: "dsa", floorId: "floor6", floorName: "Recursion Rift", id: "q2", title: "The Reversed Scroll", difficulty: "Easy", xp: 50,
    description: "Reverse a string using recursion.",
    logic: "Take the last character and add it to the result of reversing the remaining string.",
    testCases: [{ input: '"hello"', expected: '"olleh"' }],
    defaultCode: { javascript: "function solve(s) {\n  // Base case: empty string\n  return '';\n}" }
  },
  {
    subject: "dsa", floorId: "floor6", floorName: "Recursion Rift", id: "q3", title: "Subsets of the Void", difficulty: "Medium", xp: 100,
    description: "Given an array of unique integers, return all possible subsets (the power set).",
    logic: "For each element, you have two choices: include it or exclude it. This forms a recursive tree.",
    testCases: [{ input: "[1,2,3]", expected: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" }],
    defaultCode: { javascript: "function solve(nums) {\n  // backtracking/recursion logic here\n  return [];\n}" }
  },
  {
    subject: "dsa", floorId: "floor6", floorName: "Recursion Rift", id: "q4", title: "Permutation Portal", difficulty: "Medium", xp: 100,
    description: "Return all possible permutations of an array.",
    logic: "Swap the current element with every other element and recurse for the remaining positions.",
    testCases: [{ input: "[1,2]", expected: "[[1,2],[2,1]]" }],
    defaultCode: { javascript: "function solve(nums) {\n  return [];\n}" }
  },
  {
    subject: "dsa", floorId: "floor6", floorName: "Recursion Rift", id: "q5", title: "The N-Queens Gambit", difficulty: "Hard", xp: 250,
    description: "Find the number of ways to place N queens on an NxN chessboard such that no two queens attack each other.",
    logic: "Classic Backtracking. Place a queen in a row, check if it's safe, and move to the next row. Undo the move if it fails.",
    testCases: [{ input: "4", expected: "2" }, { input: "1", expected: "1" }],
    defaultCode: { javascript: "function solve(n) {\n  // Count the number of distinct solutions\n  return 0;\n}" }
  }
];
const finalFloorsQuests = [
  // --- FLOOR 7: TREE TEMPLE (Trees & BST) ---
  {
    subject: "dsa", floorId: "floor7", floorName: "Tree Temple", id: "q1", title: "Invert the Soul", difficulty: "Easy", xp: 50,
    description: "Invert a binary tree (left becomes right, right becomes left).",
    logic: "Recursively swap the left and right children of every node.",
    testCases: [{ input: '[4,2,7,1,3,6,9]', expected: '[4,7,2,9,6,3,1]' }],
    defaultCode: { javascript: "function solve(root) {\n  // Recursively swap nodes\n  return null;\n}" }
  },
  {
    subject: "dsa", floorId: "floor7", floorName: "Tree Temple", id: "q2", title: "Maximum Depth", difficulty: "Easy", xp: 50,
    description: "Find the number of nodes along the longest path from root to leaf.",
    logic: "The depth is 1 + max(depth(left), depth(right)).",
    testCases: [{ input: '[3,9,20,null,null,15,7]', expected: '3' }],
    defaultCode: { javascript: "function solve(root) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor7", floorName: "Tree Temple", id: "q3", title: "Level Order Oracle", difficulty: "Medium", xp: 100,
    description: "Return the level order traversal of its nodes' values.",
    logic: "Use a Queue (Breadth-First Search) to visit nodes level by level.",
    testCases: [{ input: '[3,9,20,15,7]', expected: '[[3],[9,20],[15,7]]' }],
    defaultCode: { javascript: "function solve(root) { return []; }" }
  },
  {
    subject: "dsa", floorId: "floor7", floorName: "Tree Temple", id: "q4", title: "Valid BST Ritual", difficulty: "Medium", xp: 100,
    description: "Determine if a tree is a valid Binary Search Tree.",
    logic: "Every node must be > all left children and < all right children. Use a range (min, max).",
    testCases: [{ input: '[2,1,3]', expected: 'true' }],
    defaultCode: { javascript: "function solve(root) { return false; }" }
  },
  {
    subject: "dsa", floorId: "floor7", floorName: "Tree Temple", id: "q5", title: "Diameter of Divinity", difficulty: "Hard", xp: 150,
    description: "Find the length of the longest path between any two nodes.",
    logic: "The path may or may not pass through the root. Track max(left_depth + right_depth).",
    testCases: [{ input: '[1,2,3,4,5]', expected: '3' }],
    defaultCode: { javascript: "function solve(root) { return 0; }" }
  },

  // --- FLOOR 8: HEAP HOLLOW (Heaps & Priority Queues) ---
  {
    subject: "dsa", floorId: "floor8", floorName: "Heap Hollow", id: "q1", title: "Kth Largest Echo", difficulty: "Medium", xp: 100,
    description: "Find the kth largest element in an unsorted array.",
    logic: "Use a Min-Heap of size k. The top will be your answer.",
    testCases: [{ input: '[3,2,3,1,2,4,5,5,6], 4', expected: '4' }],
    defaultCode: { javascript: "function solve(nums, k) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor8", floorName: "Heap Hollow", id: "q2", title: "Top K Frequent", difficulty: "Medium", xp: 100,
    description: "Return the k most frequent elements.",
    logic: "Use a Hash Map for counts and a Heap to keep the top k.",
    testCases: [{ input: '[1,1,1,2,2,3], 2', expected: '[1,2]' }],
    defaultCode: { javascript: "function solve(nums, k) { return []; }" }
  },
  {
    subject: "dsa", floorId: "floor8", floorName: "Heap Hollow", id: "q3", title: "Merge K Sorted Lists", difficulty: "Hard", xp: 200,
    description: "Merge k sorted linked lists into one sorted list.",
    logic: "Push the head of each list into a Min-Heap.",
    testCases: [{ input: '[[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]' }],
    defaultCode: { javascript: "function solve(lists) { return null; }" }
  },
  {
    subject: "dsa", floorId: "floor8", floorName: "Heap Hollow", id: "q4", title: "Task Scheduler", difficulty: "Medium", xp: 100,
    description: "Find the least number of units to finish tasks with cooling time n.",
    logic: "Use a Max-Heap to prioritize the most frequent tasks.",
    testCases: [{ input: '["A","A","A","B","B","B"], 2', expected: '8' }],
    defaultCode: { javascript: "function solve(tasks, n) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor8", floorName: "Heap Hollow", id: "q5", title: "The Median Stream", difficulty: "Hard", xp: 250,
    description: "Find the median from a data stream.",
    logic: "Use two heaps: a Max-Heap for the left half and a Min-Heap for the right.",
    testCases: [{ input: '["addNum","addNum","findMedian"], [[1],[2],[]]', expected: '[null,null,1.5]' }],
    defaultCode: { javascript: "class MedianFinder { \n // Two Heap logic \n }" }
  },

  // --- FLOOR 9: GRAPH GROTTO (Graphs - BFS/DFS) ---
  {
    subject: "dsa", floorId: "floor9", floorName: "Graph Grotto", id: "q1", title: "Islands of Lost Souls", difficulty: "Medium", xp: 100,
    description: "Count the number of islands in a 2D grid.",
    logic: "When you find '1', use DFS/BFS to visit all connected '1's and mark them.",
    testCases: [{ input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', expected: '2' }],
    defaultCode: { javascript: "function solve(grid) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor9", floorName: "Graph Grotto", id: "q2", title: "Clone the Matrix", difficulty: "Medium", xp: 100,
    description: "Return a deep copy of a connected undirected graph.",
    logic: "Use a Hash Map to map old nodes to new nodes while doing BFS.",
    testCases: [{ input: '[[2,4],[1,3],[2,4],[1,3]]', expected: '[[2,4],[1,3],[2,4],[1,3]]' }],
    defaultCode: { javascript: "function solve(node) { return null; }" }
  },
  {
    subject: "dsa", floorId: "floor9", floorName: "Graph Grotto", id: "q3", title: "The Rotten Oranges", difficulty: "Medium", xp: 150,
    description: "Find the minimum time until all oranges are rotten.",
    logic: "Multi-source BFS starting from all rotten oranges.",
    testCases: [{ input: '[[2,1,1],[1,1,0],[0,1,1]]', expected: '4' }],
    defaultCode: { javascript: "function solve(grid) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor9", floorName: "Graph Grotto", id: "q4", title: "Pacific Atlantic Flow", difficulty: "Medium", xp: 150,
    description: "Find coordinates that can flow to both oceans.",
    logic: "Run DFS from the edges (oceans) inward.",
    testCases: [{ input: '[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1]]', expected: '[[0,4],[1,3],[1,4],[2,2]]' }],
    defaultCode: { javascript: "function solve(heights) { return []; }" }
  },
  {
    subject: "dsa", floorId: "floor9", floorName: "Graph Grotto", id: "q5", title: "Course Schedule", difficulty: "Hard", xp: 200,
    description: "Can you finish all courses given the prerequisites?",
    logic: "Detect a cycle in a directed graph using Kahn's Algorithm or DFS.",
    testCases: [{ input: '2, [[1,0]]', expected: 'true' }],
    defaultCode: { javascript: "function solve(numCourses, prerequisites) { return true; }" }
  },

  // --- FLOOR 10: DP CITADEL (Dynamic Programming) ---
  {
    subject: "dsa", floorId: "floor10", floorName: "DP Citadel", id: "q1", title: "Climbing the Zenith", difficulty: "Easy", xp: 50,
    description: "Find distinct ways to climb n stairs (1 or 2 steps).",
    logic: "dp[i] = dp[i-1] + dp[i-2]. It's essentially Fibonacci.",
    testCases: [{ input: '3', expected: '3' }],
    defaultCode: { javascript: "function solve(n) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor10", floorName: "DP Citadel", id: "q2", title: "The Robber's Path", difficulty: "Medium", xp: 100,
    description: "Max money you can rob without robbing two adjacent houses.",
    logic: "dp[i] = max(dp[i-1], current_val + dp[i-2]).",
    testCases: [{ input: '[1,2,3,1]', expected: '4' }],
    defaultCode: { javascript: "function solve(nums) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor10", floorName: "DP Citadel", id: "q3", title: "Coin Change Quest", difficulty: "Medium", xp: 100,
    description: "Fewest coins needed to make up an amount.",
    logic: "dp[amount] = min(dp[amount - coin] + 1) for all coins.",
    testCases: [{ input: '[1,2,5], 11', expected: '3' }],
    defaultCode: { javascript: "function solve(coins, amount) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor10", floorName: "DP Citadel", id: "q4", title: "Longest Increasing Path", difficulty: "Medium", xp: 150,
    description: "Find the length of the longest increasing subsequence.",
    logic: "Keep a dp array where dp[i] is the LIS ending at index i.",
    testCases: [{ input: '[10,9,2,5,3,7,101,18]', expected: '4' }],
    defaultCode: { javascript: "function solve(nums) { return 0; }" }
  },
  {
    subject: "dsa", floorId: "floor10", floorName: "DP Citadel", id: "q5", title: "The King's Knapsack", difficulty: "Hard", xp: 300,
    description: "Maximize value for a given weight capacity.",
    logic: "2D DP table: dp[i][w] = max(include current, exclude current).",
    testCases: [{ input: '[1,2,3], [6,10,12], 5', expected: '22' }],
    defaultCode: { javascript: "function solve(w, v, cap) { return 0; }" }
  }
];


// // NOTE: Floors 6-10 contain advanced logic like BFS/DFS and Knapsack.
// const advancedQuests = [
//   { subject: "dsa", floorId: "floor6", floorName: "Recursion Rift", id: "q1", title: "Fibonacci Sequence", difficulty: "Easy", xp: 50, description: "Calculate n-th Fibonacci number.", logic: "Recursive call: f(n) = f(n-1) + f(n-2).", testCases: [{ input: "5", expected: "5" }], defaultCode: { javascript: "function solve(n) { return 0; }" } },
//   { subject: "dsa", floorId: "floor7", floorName: "Tree Temple", id: "q1", title: "Invert Binary Tree", difficulty: "Easy", xp: 50, description: "Flip a binary tree.", logic: "Swap left and right children recursively.", testCases: [{ input: "[4,2,7,1,3,6,9]", expected: "[4,7,2,9,6,3,1]" }], defaultCode: { javascript: "function solve(root) { return null; }" } },
//   { subject: "dsa", floorId: "floor8", floorName: "Heap Hollow", id: "q1", title: "Kth Largest Element", difficulty: "Medium", xp: 100, description: "Find the kth largest element in an array.", logic: "Use a Min-Heap of size k.", testCases: [{ input: "[3,2,3,1,2,4,5,5,6], 4", expected: "4" }], defaultCode: { javascript: "function solve(nums, k) { return 0; }" } },
//   { subject: "dsa", floorId: "floor9", floorName: "Graph Grotto", id: "q1", title: "Number of Islands", difficulty: "Medium", xp: 100, description: "Count connected components in a 2D grid.", logic: "Use BFS or DFS to mark visited land.", testCases: [{ input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', expected: "2" }], defaultCode: { javascript: "function solve(grid) { return 0; }" } },
//   { subject: "dsa", floorId: "floor10", floorName: "DP Citadel", id: "q1", title: "Climbing Stairs", difficulty: "Easy", xp: 50, description: "Find distinct ways to reach the top of n stairs.", logic: "Dynamic programming: ways[i] = ways[i-1] + ways[i-2].", testCases: [{ input: "3", expected: "3" }], defaultCode: { javascript: "function solve(n) { return 0; }" } }
// ];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the Archives... 🏛️");
    
    // Clear all existing floors except Floor 1 & 2
    const floorsToSeed = ["floor3", "floor4", "floor5", "floor6", "floor7", "floor8", "floor9", "floor10"];
    await Challenge.deleteMany({ floorId: { $in: floorsToSeed } });
    
    await Challenge.insertMany(arrayAbyssQuests);
    await Challenge.insertMany(remainingQuests);
    await Challenge.insertMany(stringSanctumQuests);
    await Challenge.insertMany(recursionRiftQuests);
    await Challenge.insertMany(finalFloorsQuests);

    
    console.log("Dungeon Fully Populated! Floors 3-10 are ready for battle. ⚔️");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};


seedDB();