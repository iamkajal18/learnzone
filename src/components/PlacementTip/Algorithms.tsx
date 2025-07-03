'use client';
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Algorithm = {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tags: string[];
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  solutions: {
    language: string;
    code: string;
  }[];
};

type Complexity = {
  notation: string;
  name: string;
  description: string;
};

type AlgorithmType = {
  name: string;
  description: string;
  examples: {
    name: string;
    explanation: string;
    complexity: string;
    useCases: string;
    code?: string;
  }[];
};

const AlgorithmsBook = () => {
  const [activeSolutionTab, setActiveSolutionTab] = useState('javascript');
  const [activeProblemTab, setActiveProblemTab] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);

  const algorithmTypes: AlgorithmType[] = [
    {
      name: 'Sorting Algorithms',
      description: 'Algorithms that arrange elements in a specific order (ascending or descending). Sorting is crucial for optimizing data retrieval, enabling efficient searching, and preparing data for other algorithms.',
      examples: [
        {
          name: 'Bubble Sort',
          explanation: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process continues until no more swaps are needed, indicating the list is sorted. It’s simple but inefficient for large datasets due to its quadratic time complexity.',
          complexity: 'Time: O(n²) average and worst case, O(n) best case; Space: O(1)',
          useCases: 'Useful for educational purposes or small datasets where simplicity is preferred over efficiency.',
          code: `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
        },
        {
          name: 'Merge Sort',
          explanation: 'Merge Sort uses a divide-and-conquer approach, recursively dividing the array into halves, sorting each half, and merging them back into a sorted array. It’s stable and efficient for large datasets but requires additional space.',
          complexity: 'Time: O(n log n) for all cases; Space: O(n)',
          useCases: 'Ideal for large datasets, linked lists, or when stability is required (e.g., sorting objects by multiple keys).',
          code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  let result = [], l = 0, r = 0;
  while (l < left.length && r < right.length) {
    result.push(left[l] <= right[r] ? left[l++] : right[r++]);
  }
  return [...result, ...left.slice(l), ...right.slice(r)];
}`,
        },
        {
          name: 'Quick Sort',
          explanation: 'Quick Sort selects a pivot element, partitions the array around it (smaller elements before, larger after), and recursively sorts the partitions. It’s efficient on average but can degrade to O(n²) with poor pivot choices.',
          complexity: 'Time: O(n log n) average, O(n²) worst case; Space: O(log n)',
          useCases: 'Widely used for general-purpose sorting due to its average-case efficiency, especially in arrays.',
          code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}
function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
        },
        {
          name: 'Heap Sort',
          explanation: 'Heap Sort builds a max-heap from the array, repeatedly extracts the maximum element, and places it at the end, reducing the heap size until sorted. It’s not stable but has consistent performance.',
          complexity: 'Time: O(n log n) for all cases; Space: O(1)',
          useCases: 'Suitable when auxiliary space is limited or guaranteed O(n log n) performance is needed.',
          code: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}
function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
        },
        {
          name: 'Insertion Sort',
          explanation: 'Insertion Sort builds the sorted array one element at a time by taking each element and inserting it into its correct position in the sorted portion. It’s efficient for small datasets or nearly sorted arrays.',
          complexity: 'Time: O(n²) average and worst case, O(n) best case; Space: O(1)',
          useCases: 'Best for small datasets, nearly sorted arrays, or online sorting where data arrives incrementally.',
          code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
        },
      ],
    },
    {
      name: 'Searching Algorithms',
      description: 'Algorithms designed to find specific elements within a data structure. They vary based on whether the data is sorted, the structure type (array, tree, graph), and efficiency requirements.',
      examples: [
        {
          name: 'Linear Search',
          explanation: 'Linear Search sequentially checks each element in a list until the target is found or the list ends. It’s simple but inefficient for large datasets.',
          complexity: 'Time: O(n); Space: O(1)',
          useCases: 'Best for small or unsorted datasets where setup overhead for other algorithms is not justified.',
          code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
        },
        {
          name: 'Binary Search',
          explanation: 'Binary Search works on sorted arrays by repeatedly dividing the search interval in half, comparing the middle element to the target, and narrowing the search to one half. It’s highly efficient but requires sorted data.',
          complexity: 'Time: O(log n); Space: O(1) for iterative, O(log n) for recursive',
          useCases: 'Ideal for static, sorted datasets like database indices or sorted arrays.',
          code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        },
        {
          name: 'Depth-First Search (DFS)',
          explanation: 'DFS explores as far as possible along each branch of a graph or tree before backtracking. It uses a stack (implicit via recursion or explicit) to track nodes.',
          complexity: 'Time: O(V + E) for graphs (V vertices, E edges); Space: O(V)',
          useCases: 'Used for pathfinding, topological sorting, or detecting cycles in graphs.',
          code: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  const result = [start];
  for (let neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      result.push(...dfs(graph, neighbor, visited));
    }
  }
  return result;
}`,
        },
        {
          name: 'Breadth-First Search (BFS)',
          explanation: 'BFS explores all neighbors of a node before moving to the next level, using a queue to track nodes. It’s ideal for finding the shortest path in unweighted graphs.',
          complexity: 'Time: O(V + E); Space: O(V)',
          useCases: 'Used for shortest path problems, level-order tree traversal, or social network analysis.',
          code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  visited.add(start);
  while (queue.length) {
    const node = queue.shift();
    result.push(node);
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}`,
        },
        {
          name: 'Jump Search',
          explanation: 'Jump Search works on sorted arrays by jumping ahead by fixed steps (e.g., √n) and performing a linear search within the block containing the target. It balances Binary Search’s efficiency with simpler implementation.',
          complexity: 'Time: O(√n); Space: O(1)',
          useCases: 'Suitable for sorted arrays where accessing elements is costly (e.g., in memory-constrained systems).',
          code: `function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) return -1;
  }
  return arr[prev] === target ? prev : -1;
}`,
        },
      ],
    },
    {
      name: 'Graph Algorithms',
      description: 'Algorithms that solve problems on graph structures, such as finding paths, cycles, or connectivity. They are widely used in network analysis, routing, and optimization.',
      examples: [
        {
          name: "Dijkstra's Algorithm",
          explanation: "Dijkstra's finds the shortest path from a source node to all other nodes in a weighted graph with non-negative weights. It uses a priority queue to explore nodes with the smallest tentative distance.",
          complexity: 'Time: O((V + E) log V) with a priority queue; Space: O(V)',
          useCases: 'Used in GPS navigation, network routing, and traffic optimization.',
          code: `function dijkstra(graph, start) {
  const distances = {};
  const pq = new PriorityQueue();
  for (let node in graph) distances[node] = Infinity;
  distances[start] = 0;
  pq.enqueue(start, 0);
  while (!pq.isEmpty()) {
    const { node } = pq.dequeue();
    for (let neighbor in graph[node]) {
      const distance = distances[node] + graph[node][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        pq.enqueue(neighbor, distance);
      }
    }
  }
  return distances;
}`,
        },
        {
          name: 'A* Algorithm',
          explanation: 'A* is a heuristic-based search algorithm for finding the shortest path in a weighted graph. It uses a heuristic function to estimate the cost to the goal, prioritizing promising paths.',
          complexity: 'Time: O(E log V) in practice; Space: O(V)',
          useCases: 'Common in pathfinding for games, robotics, and AI planning.',
        },
        {
          name: 'Bellman-Ford Algorithm',
          explanation: 'Bellman-Ford finds the shortest paths from a source node to all other nodes in a weighted graph, handling negative weights. It iterates over all edges multiple times to update distances.',
          complexity: 'Time: O(V * E); Space: O(V)',
          useCases: 'Used in routing protocols or graphs with negative weights.',
        },
        {
          name: 'Floyd-Warshall Algorithm',
          explanation: 'Floyd-Warshall computes the shortest paths between all pairs of nodes in a weighted graph. It uses dynamic programming to update a distance matrix.',
          complexity: 'Time: O(V³); Space: O(V²)',
          useCases: 'Used in network analysis, transit systems, or graph density problems.',
        },
        {
          name: "Prim's Algorithm",
          explanation: "Prim's finds a minimum spanning tree in a weighted, connected graph by growing a tree from a starting node, adding the smallest edge to unvisited nodes.",
          complexity: 'Time: O(V²) or O(E log V) with a priority queue; Space: O(V)',
          useCases: 'Used in network design, such as laying cables or building roads.',
        },
        {
          name: "Kruskal's Algorithm",
          explanation: "Kruskal's builds a minimum spanning tree by sorting all edges by weight and adding them to the tree if they don’t form a cycle, using a union-find data structure.",
          complexity: 'Time: O(E log E); Space: O(V)',
          useCases: 'Used in network optimization, clustering, or circuit design.',
        },
        {
          name: 'Topological Sort',
          explanation: 'Topological Sort orders vertices in a directed acyclic graph (DAG) such that for every edge (u, v), u comes before v in the ordering. It’s typically implemented using DFS or Kahn’s algorithm.',
          complexity: 'Time: O(V + E); Space: O(V)',
          useCases: 'Used in scheduling tasks with dependencies, course prerequisite ordering, or build systems.',
          code: `function topologicalSort(graph) {
  const visited = new Set();
  const stack = [];
  function dfs(node) {
    visited.add(node);
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) dfs(neighbor);
    }
    stack.push(node);
  }
  for (let node in graph) {
    if (!visited.has(node)) dfs(node);
  }
  return stack.reverse();
}`,
        },
      ],
    },
    {
      name: 'Dynamic Programming Algorithms',
      description: 'Algorithms that solve problems by breaking them into overlapping subproblems, solving each subproblem once, and storing results to avoid redundant computations. They are used for optimization problems.',
      examples: [
        {
          name: 'Knapsack Problem (0/1)',
          explanation: 'The 0/1 Knapsack Problem finds the maximum value of items to include in a knapsack with a weight capacity, where each item can be included or excluded (0 or 1). It uses a 2D DP table to track values.',
          complexity: 'Time: O(n * W) where n is the number of items and W is the capacity; Space: O(n * W)',
          useCases: 'Used in resource allocation, budgeting, or cargo loading problems.',
          code: `function knapsack(values, weights, capacity) {
  const n = values.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[n][capacity];
}`,
        },
        {
          name: 'Longest Common Subsequence (LCS)',
          explanation: 'LCS finds the longest sequence of characters that appears in the same order in two strings. It uses a 2D DP table to compare characters and build the subsequence.',
          complexity: 'Time: O(m * n) where m and n are the lengths of the strings; Space: O(m * n)',
          useCases: 'Used in text comparison, DNA sequence analysis, or version control systems.',
          code: `function lcs(str1, str2) {
  const m = str1.length, n = str2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}`,
        },
        {
          name: 'Fibonacci Sequence',
          explanation: 'The Fibonacci Sequence calculates the nth Fibonacci number using DP to store previously computed values, avoiding redundant recursive calls.',
          complexity: 'Time: O(n); Space: O(1) for optimized, O(n) for array-based',
          useCases: 'Used in mathematical modeling, algorithm education, or recursive problem-solving.',
          code: `function fibonacci(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`,
        },
      ],
    },
  ];

  const complexityData: Complexity[] = [
    { notation: 'O(1)', name: 'Constant Time', description: 'Time complexity remains constant regardless of input size' },
    { notation: 'O(log n)', name: 'Logarithmic Time', description: 'Time grows logarithmically with input size' },
    { notation: 'O(n)', name: 'Linear Time', description: 'Time grows linearly with input size' },
    { notation: 'O(n log n)', name: 'Linearithmic Time', description: 'Time grows in proportion to n log n' },
    { notation: 'O(n²)', name: 'Quadratic Time', description: 'Time grows quadratically with input size' },
    { notation: 'O(2ⁿ)', name: 'Exponential Time', description: 'Time doubles with each addition to the input' },
  ];

  const problems: Algorithm[] = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
      tags: ['Array', 'Hash Table'],
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        },
        {
          language: 'python',
          code: `def twoSum(nums, target):
  hashmap = {}
  for i, num in enumerate(nums):
      complement = target - num
      if complement in hashmap:
          return [hashmap[complement], i]
      hashmap[num] = i
  return []`,
        },
        {
          language: 'java',
          code: `public int[] twoSum(int[] nums, int target) {
  Map<Integer, Integer> map = new HashMap<>();
  for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      if (map.containsKey(complement)) {
          return new int[] { map.get(complement), i };
      }
      map.put(nums[i], i);
  }
  return new int[0];
}`,
        },
      ],
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      tags: ['Linked List'],
      examples: [
        {
          input: 'head = [1,2,3,4,5]',
          output: '[5,4,3,2,1]',
          explanation: 'The linked list is reversed from 1→2→3→4→5 to 5→4→3→2→1',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}`,
        },
      ],
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  const chapters = [
    { title: 'What is an Algorithm?', id: 'definition' },
    { title: 'Types of Algorithms', id: 'types' },
    { title: 'Algorithm Complexity', id: 'complexity' },
    { title: 'Practice Problems', id: 'problems' },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentChapter(value);
    const element = document.getElementById(chapters[value].id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-11 bg-gray-100 min-h-screen">
      <header className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Algorithms: A Comprehensive Guide</h1>
        <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>
      </header>

      <div className="sticky top-0 bg-white rounded-lg shadow-md p-4 mb-8 z-10">
        <label htmlFor="chapter-slider" className="block text-lg font-semibold mb-2 text-gray-800">
          Navigate Chapters
        </label>
        <div className="relative">
          <input
            id="chapter-slider"
            type="range"
            min="0"
            max={chapters.length - 1}
            value={currentChapter}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Navigate through algorithm chapters"
            aria-valuemin={0}
            aria-valuemax={chapters.length - 1}
            aria-valuenow={currentChapter}
            style={{
              background: `linear-gradient(to right, #3b82f6 ${((currentChapter) / (chapters.length - 1)) * 100}%, #e5e7eb ${((currentChapter) / (chapters.length - 1)) * 100}%)`,
            }}
          />
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              background: #3b82f6;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              transition: background 0.3s;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              background: #2563eb;
            }
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              background: #3b82f6;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              transition: background 0.3s;
            }
            input[type="range"]::-moz-range-thumb:hover {
              background: #2563eb;
            }
          `}</style>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          {chapters.map((chapter, index) => (
            <div key={index} className="relative group">
              <span
                className={`cursor-pointer hover:text-blue-600 transition-colors ${
                  currentChapter === index ? 'text-blue-600 font-semibold' : ''
                }`}
                onClick={() => {
                  setCurrentChapter(index);
                  const element = document.getElementById(chapter.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {chapter.title}
              </span>
              <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -mt-8 left-1/2 transform -translate-x-1/2">
                {chapter.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-12">
        <section id="definition" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 1: What is an Algorithm?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              The word <strong>Algorithm</strong> means "A set of finite rules or instructions to be followed in calculations or other problem-solving operations" or "A procedure for solving a mathematical problem in a finite number of steps that frequently involves recursive operations".
            </p>
            <p>
              Therefore, an Algorithm refers to a sequence of finite steps to solve a particular problem. Algorithms are fundamental to computer science, enabling efficient problem-solving across various domains, from sorting data to optimizing complex systems.
            </p>
          </div>
        </section>

        <section id="types" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 2: Types of Algorithms</h2>
          <div className="space-y-8">
            {algorithmTypes.map((type, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{type.name}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="space-y-6">
                  {type.examples.map((example, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-md">
                      <h4 className="text-xl font-medium text-gray-800">{example.name}</h4>
                      <p className="text-gray-700 mb-2"><strong>Explanation:</strong> {example.explanation}</p>
                      <p className="text-gray-700 mb-2"><strong>Time/Space Complexity:</strong> {example.complexity}</p>
                      <p className="text-gray-700 mb-2"><strong>Use Cases:</strong> {example.useCases}</p>
                      {example.code && (
                        <div className="mt-4">
                          <h5 className="font-medium text-gray-800">Example Implementation:</h5>
                          <div className="rounded-md overflow-hidden border border-gray-200">
                            <SyntaxHighlighter
                              language="javascript"
                              style={vs}
                              showLineNumbers
                              wrapLines
                              lineNumberStyle={{ color: '#999', minWidth: '2.5em' }}
                              customStyle={{
                                margin: 0,
                                padding: '1rem',
                                fontSize: '0.875rem',
                                lineHeight: '1.5',
                                backgroundColor: '#f8fafc',
                              }}
                            >
                              {example.code}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="complexity" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 3: Algorithm Complexity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {complexityData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold">{item.notation}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="problems" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 4: Algorithm Practice Problems</h2>
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/3 border-r bg-gray-50">
              <div className="overflow-y-auto h-[500px] p-2">
                {problems.map((problem) => (
                  <div
                    key={problem.id}
                    onClick={() => {
                      setActiveProblemTab(problem.id - 1);
                      setActiveSolutionTab(problem.solutions[0].language);
                    }}
                    className={`p-4 border-b cursor-pointer rounded-lg transition-colors ${
                      activeProblemTab === problem.id - 1 
                        ? 'bg-blue-100 border-blue-200' 
                        : 'hover:bg-gray-100 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{problem.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          problem.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-800'
                            : problem.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {problem.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 p-6 overflow-y-auto h-[500px]">
              {problems.length > 0 && (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{problems[activeProblemTab].title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        problems[activeProblemTab].difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800'
                          : problems[activeProblemTab].difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {problems[activeProblemTab].difficulty}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{problems[activeProblemTab].description}</p>
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-lg">Examples:</h4>
                    {problems[activeProblemTab].examples.map((example, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md border border-gray-200">
                        <p className="font-mono text-sm">
                          <span className="font-semibold">Input:</span> {example.input}<br />
                          <span className="font-semibold">Output:</span> {example.output}<br />
                          <span className="font-semibold">Explanation:</span> {example.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h4 className="font-medium text-lg mb-4">Solution:</h4>
                    <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                      {problems[activeProblemTab].solutions.map((solution) => (
                        <button
                          key={solution.language}
                          onClick={() => setActiveSolutionTab(solution.language)}
                          className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                            activeSolutionTab === solution.language
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {solution.language.charAt(0).toUpperCase() + solution.language.slice(1)}
                        </button>
                      ))}
                    </div>
                    <div className="rounded-md overflow-hidden border border-gray-200">
                      <SyntaxHighlighter 
                        language={activeSolutionTab} 
                        style={vs}
                        showLineNumbers
                        wrapLines
                        lineNumberStyle={{ color: '#999', minWidth: '2.5em' }}
                        customStyle={{ 
                          margin: 0, 
                          padding: '1rem',
                          fontSize: '0.875rem',
                          lineHeight: '1.5',
                          backgroundColor: '#f8fafc'
                        }}
                      >
                        {problems[activeProblemTab].solutions.find(
                          s => s.language === activeSolutionTab
                        )?.code || '// No solution available for this language'}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 animate-fade-in-up">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                We use cookies to ensure you have the best browsing experience on our website. 
                By using our site, you acknowledge that you have read and understood our{' '}
                <a href="/cookie-policy" className="text-blue-300 hover:underline">
                  Cookie Policy
                </a>{' '}
                &{' '}
                <a href="/privacy-policy" className="text-blue-300 hover:underline">
                  Privacy Policy
                </a>.
              </p>
            </div>
            <button
              onClick={handleAcceptCookies}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md whitespace-nowrap transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmsBook;