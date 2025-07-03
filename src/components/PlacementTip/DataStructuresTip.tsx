'use client';
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

type PracticeProblem = {
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

type InterviewQuestion = {
  id: number;
  question: string;
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

type Subtopic = {
  name: string;
  explanation: string;
  useCases: string;
};

const DataStructuresBook = () => {
  const [activeSolutionTab, setActiveSolutionTab] = useState('javascript');
  const [activeProblemTab, setActiveProblemTab] = useState(0);
  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);

  const subtopics: Subtopic[] = [
    {
      name: 'Arrays',
      explanation: 'Arrays are contiguous memory structures allowing O(1) access and O(n) insertions/deletions.',
      useCases: 'Sorting, searching, dynamic programming, matrix operations.',
    },
    {
      name: 'Linked Lists',
      explanation: 'Linked lists are dynamic structures with nodes containing data and pointers, enabling O(1) insertions at known positions.',
      useCases: 'Stacks, queues, dynamic memory allocation.',
    },
    {
      name: 'Stacks',
      explanation: 'Stacks follow a Last-In-First-Out (LIFO) structure, useful for managing function calls and undo operations.',
      useCases: 'Expression parsing, backtracking, recursion.',
    },
    {
      name: 'Queues',
      explanation: 'Queues follow a First-In-First-Out (FIFO) structure, ideal for task scheduling and breadth-first search.',
      useCases: 'Process scheduling, BFS, event handling.',
    },
    {
      name: 'Binary Trees',
      explanation: 'Binary trees are hierarchical structures with nodes having up to two children, used for searching and sorting.',
      useCases: 'Binary search trees, expression trees, hierarchical data.',
    },
    {
      name: 'Binary Search Trees',
      explanation: 'BSTs maintain sorted order, enabling O(log n) search, insertion, and deletion in balanced cases.',
      useCases: 'Database indexing, autocomplete systems.',
    },
    {
      name: 'Graphs',
      explanation: 'Graphs consist of nodes and edges, representing relationships for problems like pathfinding.',
      useCases: 'Social networks, shortest path algorithms, dependency resolution.',
    },
    {
      name: 'Hash Tables',
      explanation: 'Hash tables use key-value pairs with O(1) average-case lookup via hashing.',
      useCases: 'Caching, dictionaries, database lookups.',
    },
    {
      name: 'Heaps',
      explanation: 'Heaps are tree-based structures for priority queues, offering O(log n) insertions and deletions.',
      useCases: 'Scheduling, Dijkstra’s algorithm, heap sort.',
    },
    {
      name: 'Tries',
      explanation: 'Tries are tree-like structures for storing strings, optimized for prefix-based searches.',
      useCases: 'Autocomplete, spell checkers, IP routing.',
    },
  ];

  const practiceProblems: PracticeProblem[] = [
    {
      id: 1,
      title: 'Reverse Array',
      difficulty: 'Easy',
      description: 'Reverse an array in-place without using extra space.',
      tags: ['Array', 'Two Pointers'],
      examples: [
        {
          input: 'arr = [1, 2, 3, 4]',
          output: '[4, 3, 2, 1]',
          explanation: 'Swap elements from both ends until pointers meet.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}`,
        },
      ],
    },
    {
      id: 2,
      title: 'Detect Cycle in Linked List',
      difficulty: 'Medium',
      description: 'Determine if a linked list has a cycle using Floyd’s cycle detection.',
      tags: ['Linked List', 'Two Pointers'],
      examples: [
        {
          input: '1 -> 2 -> 3 -> 2 (cycle)',
          output: 'true',
          explanation: 'Fast and slow pointers meet if a cycle exists.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
        },
      ],
    },
    {
      id: 3,
      title: 'Implement Stack',
      difficulty: 'Easy',
      description: 'Implement a stack with push and pop operations using an array.',
      tags: ['Stack', 'Implementation'],
      examples: [
        {
          input: 'push(1), push(2), pop()',
          output: '2',
          explanation: 'Pop returns the most recently added element.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }
}`,
        },
      ],
    },
    {
      id: 4,
      title: 'Implement Queue',
      difficulty: 'Medium',
      description: 'Implement a queue with enqueue and dequeue operations using a linked list.',
      tags: ['Queue', 'Linked List'],
      examples: [
        {
          input: 'enqueue(1), enqueue(2), dequeue()',
          output: '1',
          explanation: 'Dequeue returns the first element added.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  enqueue(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }
  dequeue() {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    return val;
  }
}`,
        },
      ],
    },
    {
      id: 5,
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'Medium',
      description: 'Perform an inorder traversal of a binary tree.',
      tags: ['Binary Tree', 'Recursion'],
      examples: [
        {
          input: 'root = [1,null,2,3]',
          output: '[1,3,2]',
          explanation: 'Inorder: left, root, right.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
function inorderTraversal(root) {
  const result = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  }
  inorder(root);
  return result;
}`,
        },
      ],
    },
    {
      id: 6,
      title: 'Validate Binary Search Tree',
      difficulty: 'Hard',
      description: 'Check if a binary tree is a valid BST.',
      tags: ['Binary Search Tree', 'Recursion'],
      examples: [
        {
          input: 'root = [2,1,3]',
          output: 'true',
          explanation: 'All nodes in left subtree < root < right subtree.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }
  return validate(root, -Infinity, Infinity);
}`,
        },
      ],
    },
    {
      id: 7,
      title: 'Shortest Path in Graph',
      difficulty: 'Hard',
      description: 'Find the shortest path in a weighted graph using Dijkstra’s algorithm.',
      tags: ['Graph', 'Dijkstra'],
      examples: [
        {
          input: 'graph = [[0,4,0],[4,0,8],[0,8,0]], source = 0',
          output: '[0,4,12]',
          explanation: 'Shortest distances from source to all nodes.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function dijkstra(graph, src) {
  const dist = Array(graph.length).fill(Infinity);
  const visited = Array(graph.length).fill(false);
  dist[src] = 0;
  for (let i = 0; i < graph.length - 1; i++) {
    let u = -1;
    for (let j = 0; j < graph.length; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
    }
    if (dist[u] === Infinity) break;
    visited[u] = true;
    for (let v = 0; v < graph.length; v++) {
      if (!visited[v] && graph[u][v] !== 0) {
        dist[v] = Math.min(dist[v], dist[u] + graph[u][v]);
      }
    }
  }
  return dist;
}`,
        },
      ],
    },
  ];

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 1,
      question: 'What is the difference between an array and a linked list?',
      difficulty: 'Easy',
      description: 'Explain the key differences in terms of structure, performance, and use cases.',
      tags: ['Array', 'Linked List'],
      examples: [
        {
          input: 'Compare access time and insertion.',
          output: 'Array: O(1) access, O(n) insertion; Linked List: O(n) access, O(1) insertion.',
          explanation: 'Arrays use contiguous memory; linked lists use dynamic nodes.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Arrays store elements in contiguous memory, offering O(1) access but O(n) insertion/deletion due to shifting. Linked lists use nodes with pointers, allowing O(1) insertion at known positions but O(n) access due to traversal. Arrays suit static data; linked lists suit dynamic data.`,
        },
      ],
    },
    {
      id: 2,
      question: 'Implement a stack using two queues.',
      difficulty: 'Hard',
      description: 'Use two queues to simulate stack operations (push, pop).',
      tags: ['Stack', 'Queue'],
      examples: [
        {
          input: 'push(1), push(2), pop()',
          output: '2',
          explanation: 'Ensure LIFO behavior using queue operations.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `class StackUsingQueues {
  constructor() {
    this.q1 = [];
    this.q2 = [];
  }
  push(x) {
    this.q2.push(x);
    while (this.q1.length) this.q2.push(this.q1.shift());
    [this.q1, this.q2] = [this.q2, this.q1];
  }
  pop() {
    return this.q1.shift();
  }
}`,
        },
      ],
    },
    {
      id: 3,
      question: 'Find the middle element of a linked list.',
      difficulty: 'Medium',
      description: 'Return the middle node’s value using the two-pointer technique.',
      tags: ['Linked List', 'Two Pointers'],
      examples: [
        {
          input: '1 -> 2 -> 3 -> 4 -> 5',
          output: '3',
          explanation: 'Slow pointer reaches the middle when fast reaches the end.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow.val;
}`,
        },
      ],
    },
    {
      id: 4,
      question: 'Check if a binary tree is balanced.',
      difficulty: 'Hard',
      description: 'Determine if the height difference between left and right subtrees is at most 1.',
      tags: ['Binary Tree', 'Recursion'],
      examples: [
        {
          input: 'root = [1,2,3,4,5,null,null]',
          output: 'true',
          explanation: 'Height difference of subtrees is at most 1.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function isBalanced(root) {
  function checkHeight(node) {
    if (!node) return 0;
    let left = checkHeight(node.left);
    if (left === -1) return -1;
    let right = checkHeight(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return Math.max(left, right) + 1;
  }
  return checkHeight(root) !== -1;
}`,
        },
      ],
    },
    {
      id: 5,
      question: 'Implement a hash table from scratch.',
      difficulty: 'Hard',
      description: 'Create a hash table with put, get, and remove operations, handling collisions.',
      tags: ['Hash Table', 'Implementation'],
      examples: [
        {
          input: 'put(1, "one"), get(1), remove(1)',
          output: '"one", null',
          explanation: 'Use chaining to handle collisions.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `class HashTable {
  constructor(size = 100) {
    this.buckets = Array(size).fill(null).map(() => []);
  }
  hash(key) {
    return key % this.buckets.length;
  }
  put(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    bucket.push([key, value]);
  }
  get(key) {
    const index = this.hash(key);
    for (let pair of this.buckets[index]) {
      if (pair[0] === key) return pair[1];
    }
    return null;
  }
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return;
      }
    }
  }
}`,
        },
      ],
    },
    {
      id: 6,
      question: 'Find the shortest path in a graph.',
      difficulty: 'Hard',
      description: 'Implement Dijkstra’s algorithm to find shortest paths from a source node.',
      tags: ['Graph', 'Dijkstra'],
      examples: [
        {
          input: 'graph = [[0,4,0],[4,0,8],[0,8,0]], src = 0',
          output: '[0,4,12]',
          explanation: 'Shortest distances from source to all nodes.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function dijkstra(graph, src) {
  const dist = Array(graph.length).fill(Infinity);
  const visited = Array(graph.length).fill(false);
  dist[src] = 0;
  for (let i = 0; i < graph.length - 1; i++) {
    let u = -1;
    for (let j = 0; j < graph.length; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
    }
    if (dist[u] === Infinity) break;
    visited[u] = true;
    for (let v = 0; v < graph.length; v++) {
      if (!visited[v] && graph[u][v] !== 0) {
        dist[v] = Math.min(dist[v], dist[u] + graph[u][v]);
      }
    }
  }
  return dist;
}`,
        },
      ],
    },
    {
      id: 7,
      question: 'Explain the applications of heaps.',
      difficulty: 'Medium',
      description: 'Discuss practical uses of heaps in algorithms and systems.',
      tags: ['Heap', 'Conceptual'],
      examples: [
        {
          input: 'Name three applications.',
          output: 'Priority queues, heap sort, scheduling.',
          explanation: 'Heaps efficiently manage prioritized data.',
        },
      ],
      solutions: [
        {
          language: 'text',
          code: `Heaps are used in:
1. Priority Queues: For tasks like job scheduling where the highest-priority task is processed first.
2. Heap Sort: Sorting data in O(n log n) time by leveraging heap properties.
3. Graph Algorithms: In Dijkstra’s algorithm to efficiently extract the minimum distance node.`,
        },
      ],
    },
    {
      id: 8,
      question: 'Reverse a linked list.',
      difficulty: 'Medium',
      description: 'Reverse a singly linked list iteratively or recursively.',
      tags: ['Linked List', 'Recursion'],
      examples: [
        {
          input: '1 -> 2 -> 3 -> null',
          output: '3 -> 2 -> 1 -> null',
          explanation: 'Reverse the pointers to change the list direction.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
        },
      ],
    },
    {
      id: 9,
      question: 'Implement a queue using two stacks.',
      difficulty: 'Hard',
      description: 'Use two stacks to simulate queue operations (enqueue, dequeue).',
      tags: ['Queue', 'Stack'],
      examples: [
        {
          input: 'enqueue(1), enqueue(2), dequeue()',
          output: '1',
          explanation: 'Ensure FIFO behavior using stack operations.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `class QueueUsingStacks {
  constructor() {
    this.s1 = [];
    this.s2 = [];
  }
  enqueue(x) {
    this.s1.push(x);
  }
  dequeue() {
    if (!this.s2.length) {
      while (this.s1.length) this.s2.push(this.s1.pop());
    }
    return this.s2.pop();
  }
}`,
        },
      ],
    },
    {
      id: 10,
      question: 'Find the lowest common ancestor in a BST.',
      difficulty: 'Medium',
      description: 'Find the lowest node in a BST that is an ancestor of two given nodes.',
      tags: ['Binary Search Tree', 'Recursion'],
      examples: [
        {
          input: 'root = [6,2,8,0,4,7,9], p = 2, q = 8',
          output: '6',
          explanation: 'Node 6 is the lowest common ancestor.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function lowestCommonAncestor(root, p, q) {
  while (root) {
    if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else if (root.val < p.val && root.val < q.val) {
      root = root.right;
    } else {
      return root;
    }
  }
  return null;
}`,
        },
      ],
    },
    {
      id: 11,
      question: 'Implement a trie for autocomplete.',
      difficulty: 'Hard',
      description: 'Build a trie to support autocomplete functionality for a list of words.',
      tags: ['Trie', 'String'],
      examples: [
        {
          input: 'words = ["cat", "car"], prefix = "ca"',
          output: '["cat", "car"]',
          explanation: 'Return all words with the given prefix.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEnd = true;
  }
  autocomplete(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }
    const results = [];
    this.collectWords(node, prefix, results);
    return results;
  }
  collectWords(node, prefix, results) {
    if (node.isEnd) results.push(prefix);
    for (let char in node.children) {
      this.collectWords(node.children[char], prefix + char, results);
    }
  }
}`,
        },
      ],
    },
    {
      id: 12,
      question: 'Merge two sorted arrays.',
      difficulty: 'Medium',
      description: 'Merge two sorted arrays into a single sorted array.',
      tags: ['Array', 'Two Pointers'],
      examples: [
        {
          input: 'arr1 = [1,3,5], arr2 = [2,4,6]',
          output: '[1,2,3,4,5,6]',
          explanation: 'Use two pointers to compare and merge.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function mergeSortedArrays(arr1, arr2) {
  const merged = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i++]);
    } else {
      merged.push(arr2[j++]);
    }
  }
  while (i < arr1.length) merged.push(arr1[i++]);
  while (j < arr2.length) merged.push(arr2[j++]);
  return merged;
}`,
        },
      ],
    },
    {
      id: 13,
      question: 'Find the intersection of two sorted arrays.',
      difficulty: 'Medium',
      description: 'Return the common elements of two sorted arrays.',
      tags: ['Array', 'Two Pointers'],
      examples: [
        {
          input: 'arr1 = [1,2,4,5], arr2 = [2,3,5,6]',
          output: '[2,5]',
          explanation: 'Compare elements using two pointers.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function intersection(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] === arr2[j]) {
      result.push(arr1[i]);
      i++;
      j++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else {
      j++;
    }
  }
  return result;
}`,
        },
      ],
    },
    {
      id: 14,
      question: 'Check if a string is a valid palindrome using a stack.',
      difficulty: 'Medium',
      description: 'Verify if a string is a palindrome using a stack-based approach.',
      tags: ['Stack', 'String'],
      examples: [
        {
          input: 's = "radar"',
          output: 'true',
          explanation: 'Characters match in reverse order.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function isPalindrome(s) {
  const stack = [];
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let char of s) stack.push(char);
  for (let char of s) {
    if (char !== stack.pop()) return false;
  }
  return true;
}`,
        },
      ],
    },
    {
      id: 15,
      question: 'Find the diameter of a binary tree.',
      difficulty: 'Hard',
      description: 'Compute the length of the longest path between any two nodes in a binary tree.',
      tags: ['Binary Tree', 'Recursion'],
      examples: [
        {
          input: 'root = [1,2,3,4,5]',
          output: '4',
          explanation: 'Longest path passes through nodes 4,2,1,3,5.',
        },
      ],
      solutions: [
        {
          language: 'javascript',
          code: `function diameterOfBinaryTree(root) {
  let maxDiameter = 0;
  function height(node) {
    if (!node) return 0;
    let left = height(node.left);
    let right = height(node.right);
    maxDiameter = Math.max(maxDiameter, left + right);
    return Math.max(left, right) + 1;
  }
  height(root);
  return maxDiameter;
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
    { title: 'What are Data Structures?', id: 'overview' },
    { title: 'Key Data Structures', id: 'subtopics' },
    { title: 'Practice Problems', id: 'problems' },
    { title: 'Interview Questions', id: 'interview' },
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0286a3]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-100 min-h-screen">
      <header className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Data Structures: A Comprehensive Guide</h1>
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
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0286a3]"
            aria-label="Navigate through data structures chapters"
            aria-valuemin={0}
            aria-valuemax={chapters.length - 1}
            aria-valuenow={currentChapter}
            style={{
              background: `linear-gradient(to right, #0286a3 ${((currentChapter) / (chapters.length - 1)) * 100}%, #e5e7eb ${((currentChapter) / (chapters.length - 1)) * 100}%)`,
            }}
          />
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              background: #0286a3;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              transition: background 0.3s;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              background: #016f85;
            }
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              background: #0286a3;
              border-radius: 50%;
              cursor: pointer;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
              transition: background 0.3s;
            }
            input[type="range"]::-moz-range-thumb:hover {
              background: #016f85;
            }
          `}</style>
        </div>
        <div className="flex justify-between mt-2 Pandora: the box of evil has been opened.2 text-sm text-gray-600">
          {chapters.map((chapter, index) => (
            <div key={index} className="relative group">
              <span
                className={`cursor-pointer hover:text-[#0286a3] transition-colors ${
                  currentChapter === index ? 'text-[#0286a3] font-semibold' : ''
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
        <section id="overview" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 1: What are Data Structures?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              <strong>Data Structures</strong> are specialized formats for organizing, storing, and retrieving data efficiently. They form the backbone of algorithms, enabling optimized solutions to computational problems.
            </p>
            <p>
              Data structures like arrays, linked lists, trees, and graphs are critical for solving problems in coding interviews, optimizing performance, and managing data in real-world applications.
            </p>
          </div>
        </section>

        <section id="subtopics" className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Chapter 2: Key Data Structures</h2>
          <div className="space-y-8">
            {subtopics.map((subtopic, index) => (
              <div key={index} className="border-l-4 border-[#0286a3] pl-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{subtopic.name}</h3>
                <p className="text-gray-600 mb-2"><strong>Explanation:</strong> {subtopic.explanation}</p>
                <p className="text-gray-600 mb-2"><strong>Use Cases:</strong> {subtopic.useCases}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="problems" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 3: Practice Problems</h2>
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/3 border-r bg-gray-50">
              <div className="overflow-y-auto h-[500px] p-2">
                {practiceProblems.map((problem) => (
                  <div
                    key={problem.id}
                    onClick={() => {
                      setActiveProblemTab(problem.id - 1);
                      setActiveSolutionTab(problem.solutions[0].language);
                    }}
                    className={`p-4 border-b cursor-pointer rounded-lg transition-colors ${
                      activeProblemTab === problem.id - 1
                        ? 'bg-[#0286a3]/10 border-[#0286a3]/20'
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
                        <span
                          key={i}
                          className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 p-6 overflow-y-auto h-[500px]">
              {practiceProblems.length > 0 && (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{practiceProblems[activeProblemTab].title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        practiceProblems[activeProblemTab].difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800'
                          : practiceProblems[activeProblemTab].difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {practiceProblems[activeProblemTab].difficulty}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{practiceProblems[activeProblemTab].description}</p>
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-lg">Examples:</h4>
                    {practiceProblems[activeProblemTab].examples.map((example, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md border border-gray-200">
                        <p className="font-mono text-sm">
                          <span className="font-semibold">Input:</span> {example.input}
                          <br />
                          <span className="font-semibold">Output:</span> {example.output}
                          <br />
                          <span className="font-semibold">Explanation:</span> {example.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h4 className="font-medium text-lg mb-4">Solution:</h4>
                    <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                      {practiceProblems[activeProblemTab].solutions.map((solution) => (
                        <button
                          key={solution.language}
                          onClick={() => setActiveSolutionTab(solution.language)}
                          className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                            activeSolutionTab === solution.language
                              ? 'bg-[#0286a3] text-white'
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
                          backgroundColor: '#f8fafc',
                        }}
                      >
                        {practiceProblems[activeProblemTab].solutions.find(
                          (s) => s.language === activeSolutionTab
                        )?.code || '// No solution available for this language'}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section id="interview" className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-3xl font-bold text-gray-800 p-8 border-b">Chapter 4: Interview Questions</h2>
          <div className="flex flex-col md:flex-row min-h-[500px]">
            <div className="w-full md:w-1/3 border-r bg-gray-50">
              <div className="overflow-y-auto h-[500px] p-2">
                {interviewQuestions.map((question) => (
                  <div
                    key={question.id}
                    onClick={() => {
                      setActiveQuestionTab(question.id - 1);
                      setActiveSolutionTab(question.solutions[0].language);
                    }}
                    className={`p-4 border-b cursor-pointer rounded-lg transition-colors ${
                      activeQuestionTab === question.id - 1
                        ? 'bg-[#0286a3]/10 border-[#0286a3]/20'
                        : 'hover:bg-gray-100 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{question.question}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          question.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-800'
                            : question.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {question.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 p-6 overflow-y-auto h-[500px]">
              {interviewQuestions.length > 0 && (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{interviewQuestions[activeQuestionTab].question}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        interviewQuestions[activeQuestionTab].difficulty === 'Easy'
                          ? 'bg-green-100 text-green-800'
                          : interviewQuestions[activeQuestionTab].difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {interviewQuestions[activeQuestionTab].difficulty}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{interviewQuestions[activeQuestionTab].description}</p>
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-lg">Examples:</h4>
                    {interviewQuestions[activeQuestionTab].examples.map((example, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md border border-gray-200">
                        <p className="font-mono text-sm">
                          <span className="font-semibold">Input:</span> {example.input}
                          <br />
                          <span className="font-semibold">Output:</span> {example.output}
                          <br />
                          <span className="font-semibold">Explanation:</span> {example.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h4 className="font-medium text-lg mb-4">Solution:</h4>
                    <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                      {interviewQuestions[activeQuestionTab].solutions.map((solution) => (
                        <button
                          key={solution.language}
                          onClick={() => setActiveSolutionTab(solution.language)}
                          className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors ${
                            activeSolutionTab === solution.language
                              ? 'bg-[#0286a3] text-white'
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
                          backgroundColor: '#f8fafc',
                        }}
                      >
                        {interviewQuestions[activeQuestionTab].solutions.find(
                          (s) => s.language === activeSolutionTab
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
                We use cookies to ensure you have the best browsing experience on our website. By using our site, you
                acknowledge that you have read and understood our{' '}
                <a href="/cookie-policy" className="text-[#0286a3] hover:underline">
                  Cookie Policy
                </a>{' '}
                &{' '}
                <a href="/privacy-policy" className="text-[#0286a3] hover:underline">
                  Privacy Policy
                </a>.
              </p>
            </div>
            <button
              onClick={handleAcceptCookies}
              className="bg-[#0286a3] hover:bg-[#016f85] text-white px-4 py-2 rounded-md whitespace-nowrap transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataStructuresBook;