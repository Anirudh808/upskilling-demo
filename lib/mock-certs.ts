export type QuestionType = "mcq" | "tf" | "multi" | "fill" | "code";

export interface Question {
  id: string;
  type: QuestionType;
  q: string;
  options?: string[];
  correct?: any; // number, number[], string
  placeholder?: string;
}

export interface Certification {
  id: string;
  title: string;
  timeLimit: number;
  passPercentage: number;
  questions: Question[];
}

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "React Master Certification",
    timeLimit: 600,
    passPercentage: 80,
    questions: [
      {
        id: "q1",
        type: "mcq",
        q: "What is a React Hook?",
        options: ["A function", "A class", "A DOM element"],
        correct: 0,
      },
      {
        id: "q2",
        type: "tf",
        q: "React uses the Virtual DOM to improve performance.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        id: "q3",
        type: "multi",
        q: "Which of these are valid React Hooks? (Select multiple)",
        options: ["useState", "useFetch", "useMemo", "useEffect"],
        correct: [0, 2, 3],
      },
      {
        id: "q4",
        type: "fill",
        q: "The hook primarily used for handling side effects is ___?",
        correct: "useeffect",
        placeholder: "Type hook name entirely in lowercase...",
      },
      {
        id: "q5",
        type: "code",
        q: "Write a React functional component named 'Hello' that returns a div with text 'World'.",
        correct: "function Hello() { return <div>World</div>; }",
        placeholder: "function Hello() {\n  // your code here\n}",
      },
    ],
  },
  {
    id: "cert-2",
    title: "DSA & Problem Solving",
    timeLimit: 900,
    passPercentage: 70,
    questions: [
      {
        id: "q1",
        type: "tf",
        q: "An array allows O(1) time complexity for accessing elements by index.",
        options: ["True", "False"],
        correct: 0,
      },
      {
        id: "q2",
        type: "mcq",
        q: "Time complexity of standard binary search?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
        correct: 2,
      },
      {
        id: "q3",
        type: "multi",
        q: "Which of the following are Linear Data Structures?",
        options: ["Trees", "Arrays", "Graphs", "Linked Lists"],
        correct: [1, 3],
      },
      {
        id: "q4",
        type: "fill",
        q: "A data structure that follows the LIFO (Last In First Out) principle is called a ___?",
        correct: "stack",
        placeholder: "Type single word...",
      },
      {
        id: "q5",
        type: "code",
        q: "Write a JS function 'add' taking two arguments 'a' and 'b' and returning their sum.",
        correct: "function add(a, b) { return a + b; }",
        placeholder: "function add(a, b) {\n\n}",
      },
    ],
  },
  {
    id: "cert-3",
    title: "JavaScript Advanced",
    timeLimit: 600,
    passPercentage: 75,
    questions: [
      {
        id: "q1",
        type: "mcq",
        q: "What does 'typeof null' return in JavaScript?",
        options: ["null", "undefined", "object", "string"],
        correct: 2,
      },
      {
        id: "q2",
        type: "tf",
        q: "Promises are always resolved synchronously.",
        options: ["True", "False"],
        correct: 1,
      },
      {
        id: "q3",
        type: "multi",
        q: "Which of these are correct ways to declare a variable in ES6?",
        options: ["var", "let", "const", "def"],
        correct: [0, 1, 2],
      },
      {
        id: "q4",
        type: "fill",
        q: "What keyword is used to declare a constant variable in JS?",
        correct: "const",
      },
      {
        id: "q5",
        type: "code",
        q: "Write an arrow function 'square' that takes 'n' and returns its square.",
        correct: "const square = (n) => n * n;",
        placeholder: "const square = (n) => ",
      },
    ],
  },
  {
    id: "cert-4",
    title: "Node.js Backend",
    timeLimit: 800,
    passPercentage: 70,
    questions: [
      {
        id: "q1",
        type: "mcq",
        q: "Which core module in Node.js is used for creating a web server?",
        options: ["fs", "http", "path", "url"],
        correct: 1,
      },
      {
        id: "q2",
        type: "tf",
        q: "Node.js runs on a multi-threaded execution model by default.",
        options: ["True", "False"],
        correct: 1,
      },
      {
        id: "q3",
        type: "multi",
        q: "Which of the following are valid Express route methods?",
        options: ["app.get()", "app.fetch()", "app.post()", "app.receive()"],
        correct: [0, 2],
      },
      {
        id: "q4",
        type: "fill",
        q: "The package used commonly to load environment variables from a .env file is ___?",
        correct: "dotenv",
        placeholder: "Type package name...",
      },
      {
        id: "q5",
        type: "code",
        q: "Write a line of JS to import the standard 'fs' module using ES module syntax.",
        correct: "import fs from 'fs';",
        placeholder: "import ...",
      },
    ],
  },
  {
    id: "cert-5",
    title: "Latest Tech (AI/ML basics)",
    timeLimit: 600,
    passPercentage: 60,
    questions: [
      {
        id: "q1",
        type: "mcq",
        q: "What does NLP stand for?",
        options: [
          "Native Language Processing",
          "Natural Language Processing",
          "Neural Logic Parsing",
        ],
        correct: 1,
      },
      {
        id: "q2",
        type: "tf",
        q: "Transformers process input data sequentially rather than in parallel.",
        options: ["True", "False"],
        correct: 1,
      },
      {
        id: "q3",
        type: "multi",
        q: "Which of the following are popular Machine Learning frameworks?",
        options: ["TensorFlow", "React", "PyTorch", "Express"],
        correct: [0, 2],
      },
      {
        id: "q4",
        type: "fill",
        q: "A widely used Python library for data manipulation and analysis is ___?",
        correct: "pandas",
        placeholder: "Library name...",
      },
      {
        id: "q5",
        type: "code",
        q: "Assuming 'model' is an instantiated scikit-learn regressor, write the line to train it using 'X_train' and 'y_train'.",
        correct: "model.fit(X_train, y_train)",
        placeholder: "model...",
      },
    ],
  },
];
