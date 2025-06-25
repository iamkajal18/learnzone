export default function VerbalAbility() {
    return (
      <div className="p-6 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl font-bold mb-4">📘 Verbal Ability</h1>
        <p className="mb-4">
           Ability refers to your ability to understand, analyze, and eVerbalxpress yourself in the English language. It tests how well you can:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Understand written passages</li>
          <li>Use correct grammar</li>
          <li>Identify errors</li>
          <li>Rearrange or complete sentences</li>
          <li>Use vocabulary properly</li>
        </ul>
        <p className="mb-6">
          Verbal Ability is important for competitive exams like <strong>TCS, Infosys, Wipro, Capgemini, HCL</strong>, etc., because it shows how good your communication and comprehension skills are — which is crucial in any job role.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">📘 Verbal Ability Topics – Explained</h2>
        {topics.map(({ title, description, example }) => (
          <div key={title} className="mb-6">
            <h3 className="text-xl font-semibold text-blue-600">🔹 {title}</h3>
            <p className="mt-1 mb-2">{description}</p>
            {example && <p className="italic text-gray-700">Example: {example}</p>}
          </div>
        ))}
        <p className="mt-6 text-center text-lg text-gray-600">
  Mastering verbal ability is essential for success in competitive exams and career growth. Start practicing today and improve your skills!
</p>
      </div>
    );
  }
  
  const topics = [
    {
      title: "Synonyms",
      description: "Words that have the same meaning.",
      example: "Happy → Joyful, Glad, Cheerful"
    },
    {
      title: "Antonyms",
      description: "Words that have the opposite meaning.",
      example: "Big → Small, Huge → Tiny"
    },
    {
      title: "Prepositions",
      description: "Words that show position, direction, time or relationship.",
      example: "The book is on the table."
    },
    {
      title: "Sentence Completion",
      description: "Fill in the blank with the most suitable word or phrase to complete the sentence logically and grammatically.",
      example: "She is ___ at dancing. → (good/skilled)"
    },
    {
      title: "Active and Passive Voice",
      description: "Active Voice: Subject does the action. Passive Voice: Subject receives the action.",
      example: "Active: She eats an apple. / Passive: An apple is eaten by her."
    },
    {
      title: "Spelling Test",
      description: "Find the correctly spelled word among options.",
      example: "(a) Occurence ❌ (b) Occurrence ✅"
    },
    {
      title: "Spotting Errors",
      description: "Identify the part of the sentence that has a grammatical mistake.",
      example: "She don’t like coffee. (Error: don’t → doesn’t)"
    },
    {
      title: "Passage Completion",
      description: "A small passage is given with a missing sentence. You have to pick the best sentence that completes the idea."
    },
    {
      title: "One Word Substitution",
      description: "Use one word to replace a full phrase.",
      example: "One who loves books → Bibliophile / One who can speak many languages → Polyglot"
    },
    {
      title: "Sentence Arrangement",
      description: "Rearrange jumbled sentences to form a meaningful paragraph."
    },
    {
      title: "Transformation",
      description: "Change the form of a sentence without changing its meaning. Includes Voice, Speech, and sentence types.",
      example: "Direct: She said, 'I am ready.' / Indirect: She said that she was ready."
    },
    {
      title: "Idioms and Phrases",
      description: "Common expressions that don’t mean exactly what the words say.",
      example: "Break the ice → Start a conversation / Once in a blue moon → Very rarely"
    },
    {
      title: "Sentence Improvement",
      description: "You’re given a sentence, and you need to find a better way to write it (if required).",
      example: "He do his homework every day. → He does his homework every day."
    },
    {
      title: "Para Completion",
      description: "A paragraph is given with a missing ending sentence. You need to choose the sentence that best concludes the paragraph."
    },
    {
      title: "Joining Sentences",
      description: "Two simple sentences are given — you need to combine them without changing their meaning.",
      example: "She is tired. She went to sleep. → Being tired, she went to sleep."
    },
    {
      title: "Error Correction (Underlined Part)",
      description: "You’re shown a sentence with one part underlined. You need to replace the underlined part with a grammatically correct phrase.",
      example: "He go to school every day. → He goes to school every day."
    },
    {
      title: "Error Correction (Phrase in Bold)",
      description: "Similar to underlined errors, but the entire phrase is in bold, and you need to choose the correct version."
    },
    {
      title: "Fill in the Blanks",
      description: "Choose the correct word(s) to complete a sentence logically and grammatically.",
      example: "She is fond ___ music. → of"
    }
    
  ];
  