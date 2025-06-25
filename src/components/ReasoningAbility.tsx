export default function ReasoningAbility() {
    return (
      <div className="p-6 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold mb-4">🧠 Reasoning Ability Syllabus</h1>
        <p className="mb-4">
          Reasoning ability tests your cognitive skills to analyze, understand, and solve logical and pattern-based problems. It is crucial in competitive exams as it assesses how well you can think logically, solve puzzles, and handle complex situations.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">📘 Reasoning Ability Topics – Explained</h2>
  
        {topics.map(({ title, description, example }) => (
          <div key={title} className="mb-6">
            <h3 className="text-xl font-semibold text-blue-600">🔹 {title}</h3>
            <p className="mt-1 mb-2">{description}</p>
            {example && <p className="italic text-gray-700">Example: {example}</p>}
          </div>
        ))}
  
        <h2 className="text-2xl font-semibold mt-8">📘 Sample Questions</h2>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
              <p className="text-lg font-semibold">{question}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  const topics = [
    {
      title: "Meaningful Word Creation",
      description:
        "In this section, you will be given a set of letters or a word, and you have to form meaningful words by rearranging the letters or selecting the correct combination.",
      example: "Example: From 'CHAIR', make 'ARCH'."
    },
    {
      title: "Number Series – Missing Number Single, Missing Number Analogy",
      description:
        "These questions involve finding patterns in number series or identifying the missing number in a sequence.",
      example: "Example: 2, 4, 6, ?, 10 (Answer: 8)"
    },
    {
      title: "Data Sufficiency – Rank Based Logic, Ages",
      description:
        "You are given statements, and you need to determine if the provided information is sufficient to answer a given question.",
      example: "Example: The age of person A is 5 years more than B. How old is A? (Data sufficiency checks how much info is needed)"
    },
    {
      title: "Blood Relations",
      description:
        "In this section, you will need to determine relationships between family members using logical clues.",
      example: "Example: If A is the father of B, and B is the mother of C, how is C related to A?"
    },
    {
      title: "Coding-Decoding",
      description:
        "This involves determining how a word or phrase is encoded, and then decoding it to find the correct answer.",
      example: "Example: If CAT is coded as 3120, what is the code for DOG?"
    },
    {
      title: "Ages",
      description:
        "These problems deal with calculating the age of individuals based on given relationships and conditions.",
      example: "Example: If a person’s age is double another person's age, and their sum is 36, find their ages."
    },
    {
      title: "Odd Man Out – Numbers, Logical",
      description:
        "In this section, one item will not fit in a series or set, and you have to identify the odd one out.",
      example: "Example: 2, 4, 6, 8, 11 (Answer: 11)"
    },
    {
      title: "Distance and Directions",
      description:
        "You will be asked to determine the position or direction of an individual from a given set of clues.",
      example: "Example: A man starts at point A, moves north 10 meters, then turns east. Where is he now?"
    },
    {
      title: "Statement and Conclusion",
      description:
        "Given a statement, you need to determine if the conclusion is logically valid based on the statement.",
      example: "Example: Statement: All humans are mortal. Conclusion: John is mortal."
    },
    {
      title: "Seating Arrangement (Easy)",
      description:
        "In this section, you will be asked to arrange individuals based on given seating conditions and relationships.",
      example: "Example: A, B, C, D are sitting in a row. If A is to the left of B, and B is to the left of C, who is sitting at the center?"
    },
    {
      title: "Seating Arrangement (Complex)",
      description:
        "A more complicated form of seating arrangement, requiring a greater level of deduction and logical reasoning.",
      example: "Example: In a circular seating arrangement, find who is sitting next to whom given various conditions."
    },
    {
      title: "Analogy",
      description:
        "Involves finding the relationship between two words or items and applying that relationship to other items.",
      example: "Example: Book is to Reading as Fork is to Eating."
    },
    {
      title: "Mathematical Operational Arrangement",
      description:
        "Involves arranging mathematical operations in the correct order to solve for the correct answer.",
      example: "Example: 2 + 3 × 5 = ? (Answer: 17)"
    },
    {
      title: "Symbols and Notations",
      description:
        "This section involves understanding and interpreting mathematical or logical symbols used in reasoning.",
      example: "Example: If A + B means A is greater than B, what is the meaning of B + C?"
    }
  ];
  
  const questions = [
    "1. What is the next number in the sequence: 3, 6, 9, 12, ?",
    "2. If R is coded as 18 and S as 19, what is the code for T?",
    "3. How many meaningful words can be formed from the letters of 'EAT'?",
    "4. In a certain code language, CAT is written as 3120. How is DOG written?",
    "5. If A is the brother of B and C is the sister of B, how is C related to A?",
    "6. Find the odd one out: 11, 22, 33, 42, 55",
    "7. What is the total distance covered by a person who walks 10 meters north, then 20 meters east?",
    "8. What will be the next term in the series: 2, 5, 10, 17, ?",
    "9. Who is sitting to the right of B if A, B, C, D are sitting in a row and C is to the left of B?",
    "10. If A is greater than B, B is greater than C, and C is greater than D, which of the following is correct?"
  ];
  
  