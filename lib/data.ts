// ============================================================
// Hardcoded JSON data for AI-Powered Learning & Talent Platform
// Demo-only prototype — no backend, no API calls
// ============================================================

export type Role = "Student" | "Fresher" | "Experienced" | "Recruiter" | "Admin"

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: Role
  department?: string
  employabilityScore: number
  verificationStatus: "Verified" | "Pending" | "Not Started"
  resumeStatus: "Complete" | "Incomplete" | "Not Started"
  skills: string[]
  lastActive: string
}

export const users: User[] = [
  { id: "u1", name: "Priya Sharma", email: "priya@demo.com", avatar: "PS", role: "Student", department: "Computer Science", employabilityScore: 78, verificationStatus: "Verified", resumeStatus: "Complete", skills: ["React", "Node.js", "Python", "SQL", "DSA"], lastActive: "2 hours ago" },
  { id: "u2", name: "Rahul Patel", email: "rahul@demo.com", avatar: "RP", role: "Student", department: "Computer Science", employabilityScore: 65, verificationStatus: "Pending", resumeStatus: "Incomplete", skills: ["Java", "Spring Boot", "MySQL"], lastActive: "1 day ago" },
  { id: "u3", name: "Ananya Gupta", email: "ananya@demo.com", avatar: "AG", role: "Fresher", department: "Information Technology", employabilityScore: 82, verificationStatus: "Verified", resumeStatus: "Complete", skills: ["Python", "Django", "PostgreSQL", "AWS"], lastActive: "5 hours ago" },
  { id: "u4", name: "Vikram Singh", email: "vikram@demo.com", avatar: "VS", role: "Experienced", department: "Computer Science", employabilityScore: 91, verificationStatus: "Verified", resumeStatus: "Complete", skills: ["React", "TypeScript", "GraphQL", "Docker", "K8s"], lastActive: "1 hour ago" },
  { id: "u5", name: "Meera Reddy", email: "meera@demo.com", avatar: "MR", role: "Student", department: "Electronics", employabilityScore: 45, verificationStatus: "Not Started", resumeStatus: "Not Started", skills: ["C", "Embedded Systems"], lastActive: "3 days ago" },
  { id: "u6", name: "Arjun Kumar", email: "arjun@demo.com", avatar: "AK", role: "Fresher", department: "Information Technology", employabilityScore: 72, verificationStatus: "Verified", resumeStatus: "Complete", skills: ["JavaScript", "React", "MongoDB"], lastActive: "4 hours ago" },
  { id: "u7", name: "Sneha Nair", email: "sneha@demo.com", avatar: "SN", role: "Student", department: "Computer Science", employabilityScore: 58, verificationStatus: "Pending", resumeStatus: "Incomplete", skills: ["Python", "ML", "TensorFlow"], lastActive: "12 hours ago" },
  { id: "u8", name: "Karthik Iyer", email: "karthik@demo.com", avatar: "KI", role: "Experienced", department: "Computer Science", employabilityScore: 88, verificationStatus: "Verified", resumeStatus: "Complete", skills: ["Go", "Rust", "System Design", "AWS"], lastActive: "30 min ago" },
  { id: "u9", name: "Divya Joshi", email: "divya@demo.com", avatar: "DJ", role: "Student", department: "Information Technology", employabilityScore: 52, verificationStatus: "Not Started", resumeStatus: "Incomplete", skills: ["HTML", "CSS", "JavaScript"], lastActive: "2 days ago" },
]

export const currentUser = users[0] // Priya

export interface Course {
  id: string
  title: string
  description: string
  progress: number
  modules: { id: string; title: string; completed: boolean; lessons: { id: string; title: string; completed: boolean }[] }[]
}

export const courses: Course[] = [
  {
    id: "c1",
    title: "Backend Development Roadmap",
    description: "Master backend development from fundamentals to deployment",
    progress: 42,
    modules: [
      {
        id: "m1", title: "Fundamentals of HTTP & REST", completed: true, lessons: [
          { id: "l1", title: "How the Web Works", completed: true },
          { id: "l2", title: "HTTP Methods & Status Codes", completed: true },
          { id: "l3", title: "RESTful API Design Principles", completed: true },
        ]
      },
      {
        id: "m2", title: "Node.js & Express", completed: false, lessons: [
          { id: "l4", title: "Node.js Runtime & Event Loop", completed: true },
          { id: "l5", title: "Building REST APIs with Express", completed: true },
          { id: "l6", title: "Middleware & Error Handling", completed: false },
          { id: "l7", title: "Authentication & Authorization", completed: false },
        ]
      },
      {
        id: "m3", title: "Databases", completed: false, lessons: [
          { id: "l8", title: "SQL Fundamentals", completed: false },
          { id: "l9", title: "PostgreSQL Deep Dive", completed: false },
          { id: "l10", title: "ORM with Prisma", completed: false },
        ]
      },
      {
        id: "m4", title: "Deployment & DevOps", completed: false, lessons: [
          { id: "l11", title: "Docker Containers", completed: false },
          { id: "l12", title: "CI/CD Pipelines", completed: false },
          { id: "l13", title: "Cloud Deployment (AWS/Vercel)", completed: false },
        ]
      },
    ]
  }
]

// ── Course Catalog (browsable / enrollable) ──────────────────────────────────
export interface CourseCategory {
  id: string
  name: string
  icon: string
  description: string
  color: "blue" | "violet" | "emerald" | "rose" | "amber" | "cyan" | "orange" | "teal"
  department: "CSE" | "ECE" | "EEE" | "Mechanical"
}

export const courseCategories: CourseCategory[] = [
  { id: "cs",   name: "Computer Science",       icon: "Cpu",         description: "Core CS fundamentals and theory",       color: "blue",    department: "CSE" },
  { id: "prog", name: "Programming",            icon: "Code2",       description: "Master programming languages",           color: "violet",  department: "CSE" },
  { id: "web",  name: "Web Development",         icon: "Globe",       description: "Build modern web applications",          color: "emerald", department: "CSE" },
  { id: "ai",   name: "AI & Machine Learning",  icon: "Brain",       description: "Intelligent systems and models",         color: "rose",    department: "CSE" },
  { id: "ds",   name: "Data Science",           icon: "LineChart",   description: "Analyze and visualize data",             color: "amber",   department: "CSE" },
  { id: "ece",  name: "Electronics & Comm. (ECE)", icon: "RadioTower", description: "Signals, circuits, and communication", color: "cyan",    department: "ECE" },
  { id: "eee",  name: "Electrical (EEE)",       icon: "Zap",         description: "Circuits, machines, and power systems",  color: "orange",  department: "EEE" },
  { id: "mech", name: "Mechanical",             icon: "Cog",         description: "Thermodynamics, fluids, and mechanics",  color: "teal",    department: "Mechanical" },
]

export interface CatalogCourse {
  id: string
  title: string
  description: string
  categoryId: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  lessons: number
  rating: number
  students: number
  instructor: string
  tags: string[]
  progress: number
}

export const catalogCourses: CatalogCourse[] = [
  // ── Web Development ──
  { id: "c1",  title: "Backend Development Roadmap",        description: "Master backend development from HTTP fundamentals to production deployment with Node.js, databases, and DevOps.", categoryId: "web", level: "Intermediate", duration: "24h", lessons: 13, rating: 4.8, students: 18240, instructor: "Ravi Menon",     tags: ["Node.js", "Express", "APIs", "Databases"], progress: 42 },
  { id: "c2",  title: "HTML & CSS from Scratch",            description: "Build beautiful, responsive websites with modern HTML5 and CSS3, including Flexbox and Grid.", categoryId: "web", level: "Beginner", duration: "12h", lessons: 32, rating: 4.7, students: 42100, instructor: "Sara Thomas", tags: ["HTML", "CSS", "Responsive"], progress: 0 },
  { id: "c3",  title: "React 19 Complete Course",           description: "Learn React from components to hooks, context, and the latest React 19 features with real projects.", categoryId: "web", level: "Intermediate", duration: "28h", lessons: 46, rating: 4.9, students: 51300, instructor: "Aditya Rao", tags: ["React", "Hooks", "JSX"], progress: 0 },
  { id: "c4",  title: "Next.js 16 Full-Stack Development",  description: "Build production-grade full-stack apps with the Next.js App Router, server components, and server actions.", categoryId: "web", level: "Advanced", duration: "22h", lessons: 38, rating: 4.8, students: 27600, instructor: "Neha Kapoor", tags: ["Next.js", "SSR", "Full-Stack"], progress: 0 },
  { id: "c5",  title: "Node.js & Express APIs",             description: "Design and build robust REST APIs with Node.js, Express, authentication, and middleware.", categoryId: "web", level: "Intermediate", duration: "18h", lessons: 30, rating: 4.6, students: 22400, instructor: "Ravi Menon", tags: ["Node.js", "Express", "REST"], progress: 0 },
  { id: "c6",  title: "TypeScript Deep Dive",               description: "Go from JavaScript to type-safe TypeScript with generics, utility types, and advanced patterns.", categoryId: "web", level: "Intermediate", duration: "14h", lessons: 26, rating: 4.7, students: 19800, instructor: "Aditya Rao", tags: ["TypeScript", "Types", "Generics"], progress: 0 },
  { id: "c7",  title: "Tailwind CSS Mastery",               description: "Style modern UIs rapidly with Tailwind CSS, design tokens, and component-driven workflows.", categoryId: "web", level: "Beginner", duration: "8h", lessons: 20, rating: 4.6, students: 15200, instructor: "Sara Thomas", tags: ["Tailwind", "CSS", "UI"], progress: 0 },

  // ── Computer Science ──
  { id: "c8",  title: "Data Structures & Algorithms Masterclass", description: "Deep dive into arrays, trees, graphs, and dynamic programming with 100+ solved problems.", categoryId: "cs", level: "Intermediate", duration: "40h", lessons: 60, rating: 4.9, students: 63400, instructor: "Karthik Iyer", tags: ["DSA", "Algorithms", "Problem Solving"], progress: 0 },
  { id: "c9",  title: "Operating Systems Fundamentals",     description: "Understand processes, threads, scheduling, memory management, and concurrency.", categoryId: "cs", level: "Intermediate", duration: "20h", lessons: 34, rating: 4.6, students: 21100, instructor: "Prof. Anil Desai", tags: ["OS", "Concurrency", "Memory"], progress: 0 },
  { id: "c10", title: "Database Management Systems",        description: "Master relational databases, normalization, transactions, indexing, and query optimization.", categoryId: "cs", level: "Intermediate", duration: "18h", lessons: 28, rating: 4.7, students: 24500, instructor: "Meera Reddy", tags: ["DBMS", "SQL", "Transactions"], progress: 0 },
  { id: "c11", title: "Computer Networks Essentials",       description: "From the OSI model to TCP/IP, HTTP, DNS, and network security fundamentals.", categoryId: "cs", level: "Beginner", duration: "16h", lessons: 26, rating: 4.5, students: 17800, instructor: "Prof. Anil Desai", tags: ["Networks", "TCP/IP", "HTTP"], progress: 0 },
  { id: "c12", title: "System Design for Interviews",       description: "Learn to design scalable systems: load balancing, caching, sharding, and real-world case studies.", categoryId: "cs", level: "Advanced", duration: "26h", lessons: 32, rating: 4.9, students: 45900, instructor: "Karthik Iyer", tags: ["System Design", "Scalability", "Architecture"], progress: 0 },
  { id: "c13", title: "Discrete Mathematics for CS",        description: "Logic, set theory, combinatorics, graph theory, and proofs that underpin computer science.", categoryId: "cs", level: "Beginner", duration: "22h", lessons: 40, rating: 4.4, students: 12300, instructor: "Dr. Latha Iyer", tags: ["Math", "Logic", "Graphs"], progress: 0 },
  { id: "c14", title: "Object-Oriented Design Patterns",    description: "Apply SOLID principles and the classic Gang of Four design patterns in real codebases.", categoryId: "cs", level: "Intermediate", duration: "14h", lessons: 24, rating: 4.7, students: 19600, instructor: "Vikram Singh", tags: ["OOP", "Design Patterns", "SOLID"], progress: 0 },

  // ── Programming ──
  { id: "c15", title: "Python for Absolute Beginners",      description: "Start coding with Python: variables, loops, functions, and your first real programs.", categoryId: "prog", level: "Beginner", duration: "15h", lessons: 36, rating: 4.8, students: 88200, instructor: "Ananya Gupta", tags: ["Python", "Basics"], progress: 0 },
  { id: "c16", title: "Java Programming Complete Guide",     description: "Comprehensive Java from syntax and OOP to collections, streams, and multithreading.", categoryId: "prog", level: "Intermediate", duration: "30h", lessons: 52, rating: 4.6, students: 41500, instructor: "Rahul Patel", tags: ["Java", "OOP", "JVM"], progress: 0 },
  { id: "c17", title: "Modern C++ (C++17/20)",              description: "Write efficient, modern C++ with smart pointers, move semantics, templates, and STL.", categoryId: "prog", level: "Advanced", duration: "26h", lessons: 44, rating: 4.5, students: 18700, instructor: "Dr. Sameer Bose", tags: ["C++", "STL", "Performance"], progress: 0 },
  { id: "c18", title: "Go (Golang) Crash Course",           description: "Build fast, concurrent backend services with Go, goroutines, and channels.", categoryId: "prog", level: "Intermediate", duration: "12h", lessons: 24, rating: 4.7, students: 15400, instructor: "Karthik Iyer", tags: ["Go", "Concurrency"], progress: 0 },
  { id: "c19", title: "Rust Programming Fundamentals",      description: "Learn memory-safe systems programming with Rust's ownership model and borrow checker.", categoryId: "prog", level: "Advanced", duration: "20h", lessons: 34, rating: 4.8, students: 13900, instructor: "Dr. Sameer Bose", tags: ["Rust", "Systems", "Memory Safety"], progress: 0 },
  { id: "c20", title: "JavaScript: The Complete Guide",     description: "Master JavaScript from fundamentals to closures, async/await, and the event loop.", categoryId: "prog", level: "Beginner", duration: "24h", lessons: 48, rating: 4.7, students: 72100, instructor: "Aditya Rao", tags: ["JavaScript", "ES6+", "Async"], progress: 0 },
  { id: "c21", title: "Clean Code & Best Practices",        description: "Write readable, maintainable code with naming, refactoring, and testing best practices.", categoryId: "prog", level: "Intermediate", duration: "10h", lessons: 20, rating: 4.8, students: 28300, instructor: "Vikram Singh", tags: ["Clean Code", "Refactoring", "Testing"], progress: 0 },

  // ── AI & Machine Learning ──
  { id: "c22", title: "Machine Learning Foundations",       description: "Supervised and unsupervised learning, regression, classification, and model evaluation.", categoryId: "ai", level: "Intermediate", duration: "28h", lessons: 42, rating: 4.8, students: 54600, instructor: "Dr. Priya Nair", tags: ["ML", "scikit-learn", "Models"], progress: 0 },
  { id: "c23", title: "Deep Learning with PyTorch",         description: "Build and train neural networks, CNNs, and RNNs with PyTorch from the ground up.", categoryId: "ai", level: "Advanced", duration: "32h", lessons: 46, rating: 4.9, students: 38900, instructor: "Dr. Priya Nair", tags: ["Deep Learning", "PyTorch", "Neural Nets"], progress: 0 },
  { id: "c24", title: "Natural Language Processing",        description: "Text processing, embeddings, transformers, and building NLP pipelines.", categoryId: "ai", level: "Advanced", duration: "24h", lessons: 38, rating: 4.7, students: 26400, instructor: "Sneha Nair", tags: ["NLP", "Transformers", "Embeddings"], progress: 0 },
  { id: "c25", title: "LLMs & Prompt Engineering",          description: "Work with large language models, prompt design, RAG, and building AI-powered apps.", categoryId: "ai", level: "Intermediate", duration: "14h", lessons: 24, rating: 4.9, students: 61200, instructor: "Dr. Priya Nair", tags: ["LLMs", "Prompts", "RAG"], progress: 0 },
  { id: "c26", title: "Computer Vision Essentials",         description: "Image processing, object detection, and CNNs for real-world vision tasks.", categoryId: "ai", level: "Advanced", duration: "22h", lessons: 36, rating: 4.6, students: 19300, instructor: "Sneha Nair", tags: ["Computer Vision", "CNN", "OpenCV"], progress: 0 },
  { id: "c27", title: "Reinforcement Learning Basics",      description: "Agents, rewards, Q-learning, and policy gradients through hands-on environments.", categoryId: "ai", level: "Advanced", duration: "18h", lessons: 28, rating: 4.5, students: 11800, instructor: "Dr. Priya Nair", tags: ["RL", "Q-Learning", "Agents"], progress: 0 },

  // ── Data Science ──
  { id: "c28", title: "Data Analysis with Pandas",          description: "Clean, transform, and analyze datasets efficiently with Python and Pandas.", categoryId: "ds", level: "Beginner", duration: "12h", lessons: 26, rating: 4.7, students: 47200, instructor: "Ananya Gupta", tags: ["Pandas", "Python", "Analysis"], progress: 0 },
  { id: "c29", title: "SQL for Data Science",               description: "Query, join, and aggregate data with SQL for analytics and reporting.", categoryId: "ds", level: "Beginner", duration: "10h", lessons: 22, rating: 4.8, students: 53100, instructor: "Meera Reddy", tags: ["SQL", "Analytics", "Queries"], progress: 0 },
  { id: "c30", title: "Data Visualization with Python",     description: "Create compelling charts and dashboards with Matplotlib, Seaborn, and Plotly.", categoryId: "ds", level: "Intermediate", duration: "11h", lessons: 24, rating: 4.6, students: 21900, instructor: "Ananya Gupta", tags: ["Visualization", "Matplotlib", "Plotly"], progress: 0 },
  { id: "c31", title: "Statistics for Data Science",        description: "Probability, distributions, hypothesis testing, and inference for data-driven decisions.", categoryId: "ds", level: "Intermediate", duration: "16h", lessons: 30, rating: 4.5, students: 18600, instructor: "Dr. Latha Iyer", tags: ["Statistics", "Probability", "Inference"], progress: 0 },
  { id: "c32", title: "Big Data with Spark",                description: "Process massive datasets with Apache Spark, RDDs, DataFrames, and distributed computing.", categoryId: "ds", level: "Advanced", duration: "20h", lessons: 32, rating: 4.6, students: 14700, instructor: "Karthik Iyer", tags: ["Spark", "Big Data", "Distributed"], progress: 0 },
  { id: "c33", title: "Excel to Python for Analysts",       description: "Transition from spreadsheets to Python for scalable, reproducible data workflows.", categoryId: "ds", level: "Beginner", duration: "9h", lessons: 20, rating: 4.7, students: 25800, instructor: "Ananya Gupta", tags: ["Excel", "Python", "Automation"], progress: 0 },

  // ── Electronics & Communication (ECE) ──
  { id: "c34", title: "Signals & Systems",                  description: "Continuous and discrete-time signals, LTI systems, convolution, and the Fourier transform.", categoryId: "ece", level: "Intermediate", duration: "26h", lessons: 40, rating: 4.8, students: 21400, instructor: "Dr. Suresh Rao", tags: ["Signals", "Fourier", "Convolution"], progress: 0 },
  { id: "c35", title: "Analog Electronic Circuits",         description: "Diodes, BJTs, MOSFETs, amplifiers, and op-amp circuit design from first principles.", categoryId: "ece", level: "Intermediate", duration: "22h", lessons: 34, rating: 4.6, students: 15800, instructor: "Dr. Suresh Rao", tags: ["Diodes", "Transistors", "Op-Amps"], progress: 0 },
  { id: "c36", title: "Digital Signal Processing",          description: "Sampling, the z-transform, DFT/FFT, and digital filter design for real signals.", categoryId: "ece", level: "Advanced", duration: "24h", lessons: 36, rating: 4.7, students: 13200, instructor: "Dr. Kavita Menon", tags: ["DSP", "FFT", "Filters"], progress: 0 },

  // ── Electrical Engineering (EEE) ──
  { id: "c37", title: "Electric Circuit Analysis",          description: "Ohm's and Kirchhoff's laws, nodal/mesh analysis, network theorems, and AC steady state.", categoryId: "eee", level: "Beginner", duration: "20h", lessons: 32, rating: 4.8, students: 28600, instructor: "Dr. Ramesh Gupta", tags: ["Circuits", "KVL/KCL", "AC"], progress: 0 },
  { id: "c38", title: "Electrical Machines",                description: "Transformers, DC machines, induction motors, and synchronous machines explained.", categoryId: "eee", level: "Intermediate", duration: "24h", lessons: 36, rating: 4.6, students: 17300, instructor: "Dr. Ramesh Gupta", tags: ["Transformers", "Motors", "Generators"], progress: 0 },
  { id: "c39", title: "Power Systems & Distribution",       description: "Generation, transmission lines, per-unit systems, load flow, and power factor.", categoryId: "eee", level: "Advanced", duration: "22h", lessons: 34, rating: 4.5, students: 11900, instructor: "Dr. Anjali Verma", tags: ["Power", "Transmission", "Grid"], progress: 0 },

  // ── Mechanical Engineering ──
  { id: "c40", title: "Engineering Thermodynamics",         description: "The laws of thermodynamics, energy, entropy, and ideal cycles like Carnot and Rankine.", categoryId: "mech", level: "Intermediate", duration: "24h", lessons: 38, rating: 4.7, students: 24100, instructor: "Dr. Vinod Sharma", tags: ["Thermodynamics", "Entropy", "Cycles"], progress: 0 },
  { id: "c41", title: "Fluid Mechanics",                    description: "Fluid statics, continuity, Bernoulli's equation, and laminar vs. turbulent flow.", categoryId: "mech", level: "Intermediate", duration: "22h", lessons: 34, rating: 4.6, students: 18700, instructor: "Dr. Vinod Sharma", tags: ["Fluids", "Bernoulli", "Flow"], progress: 0 },
  { id: "c42", title: "Strength of Materials",             description: "Stress, strain, bending, torsion, and deflection of beams and shafts.", categoryId: "mech", level: "Beginner", duration: "20h", lessons: 32, rating: 4.7, students: 22800, instructor: "Dr. Priya Deshmukh", tags: ["Stress", "Strain", "Beams"], progress: 0 },
]

export function getCatalogCourse(id: string): CatalogCourse | undefined {
  return catalogCourses.find((c) => c.id === id)
}

// ── Generated course content (demo) ──────────────────────────────────────────
export interface CourseLesson {
  id: string
  title: string
  content: string
  quiz: { question: string; options: string[]; answer: number }
}
export interface CourseModule {
  id: string
  title: string
  lessons: CourseLesson[]
}

const MODULE_BLUEPRINT: { title: string; lessons: string[] }[] = [
  { title: "Foundations",       lessons: ["Introduction to {course}", "Why {t0} Matters", "Setting Up Your Environment"] },
  { title: "Core Concepts",     lessons: ["{t0} Fundamentals", "Understanding {t1}", "Key Patterns & Terminology"] },
  { title: "Hands-on Practice", lessons: ["Working with {t0}", "Guided Exercise: {t2}", "Debugging & Testing"] },
  { title: "Advanced Topics",   lessons: ["Advanced {t0} Techniques", "Performance & Best Practices", "Real-world Case Study"] },
  { title: "Capstone Project",  lessons: ["Planning Your Project", "Building the Final Project", "Wrap-up & Next Steps"] },
]

function fillTemplate(tpl: string, course: CatalogCourse): string {
  const t0 = course.tags[0] ?? course.title
  const t1 = course.tags[1] ?? t0
  const t2 = course.tags[2] ?? t1
  return tpl.replace("{course}", course.title).replace("{t0}", t0).replace("{t1}", t1).replace("{t2}", t2)
}

function lessonBody(course: CatalogCourse, lessonTitle: string): string {
  const t0 = course.tags[0] ?? course.title
  return [
    `In this lesson we focus on ${lessonTitle} as part of the ${course.title} course. You'll build a clear mental model of ${t0} and see exactly where it fits in real-world work.`,
    `We begin with the essential ideas and then move through concrete, worked examples. Notice how ${course.tags.join(", ")} connect together — each concept builds on the last so the bigger picture comes into focus.`,
    `By the end you'll be able to apply these ideas with confidence. Use the Quick Check below to test yourself, and ask the AI Tutor on the right if anything is unclear.`,
  ].join("\n\n")
}

function moduleCountFor(course: CatalogCourse): number {
  return course.level === "Advanced" ? 5 : 4
}

// Hand-authored, LaTeX-rich content for flagship engineering courses.
// Math is delimited with $...$ (inline) and $$...$$ (block).
export const authoredCourseContent: Record<string, CourseModule[]> = {
  // ── c37 · Electric Circuit Analysis (EEE) ──
  c37: [
    {
      id: "c37-m1", title: "Fundamental Laws", lessons: [
        {
          id: "c37-m1-l1", title: "Ohm's Law & Electrical Power",
          content:
            "Ohm's law relates the voltage $V$ across a resistor, the current $I$ through it, and its resistance $R$:\n\n$$V = I\\,R$$\n\nHere $V$ is in volts (V), $I$ in amperes (A), and $R$ in ohms ($\\Omega$). Rearranging gives $I = V/R$ and $R = V/I$.\n\nThe power dissipated by the resistor can be written three equivalent ways:\n\n$$P = V I = I^2 R = \\frac{V^2}{R}$$\n\nFor example, a $10\\,\\Omega$ resistor carrying $2\\,\\text{A}$ dissipates $P = I^2 R = (2)^2 (10) = 40\\,\\text{W}$.",
          quiz: { question: "A resistor has $V = 12\\,\\text{V}$ across it and $R = 4\\,\\Omega$. What is the current?", options: ["$0.33\\,\\text{A}$", "$3\\,\\text{A}$", "$48\\,\\text{A}$", "$16\\,\\text{A}$"], answer: 1 },
        },
        {
          id: "c37-m1-l2", title: "Kirchhoff's Current & Voltage Laws",
          content:
            "Kirchhoff's Current Law (KCL) states that the algebraic sum of currents entering a node is zero — charge is conserved:\n\n$$\\sum_{k=1}^{n} I_k = 0$$\n\nKirchhoff's Voltage Law (KVL) states that the sum of voltage drops around any closed loop is zero — energy is conserved:\n\n$$\\sum_{k=1}^{m} V_k = 0$$\n\nTogether, KCL and KVL let you write enough independent equations to solve any linear circuit for its unknown branch currents and node voltages.",
          quiz: { question: "Kirchhoff's Voltage Law is a statement of the conservation of what?", options: ["Charge", "Energy", "Momentum", "Power"], answer: 1 },
        },
      ],
    },
    {
      id: "c37-m2", title: "Analysis Techniques", lessons: [
        {
          id: "c37-m2-l1", title: "Series & Parallel Resistances",
          content:
            "Resistors in series carry the same current and their resistances add:\n\n$$R_{eq} = R_1 + R_2 + \\cdots + R_n$$\n\nResistors in parallel share the same voltage, and their reciprocals add:\n\n$$\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots + \\frac{1}{R_n}$$\n\nFor just two resistors in parallel this simplifies to the product-over-sum rule $R_{eq} = \\dfrac{R_1 R_2}{R_1 + R_2}$.",
          quiz: { question: "Two $6\\,\\Omega$ resistors in parallel give an equivalent resistance of:", options: ["$12\\,\\Omega$", "$6\\,\\Omega$", "$3\\,\\Omega$", "$0.33\\,\\Omega$"], answer: 2 },
        },
      ],
    },
    {
      id: "c37-m3", title: "AC Steady State", lessons: [
        {
          id: "c37-m3-l1", title: "Impedance & Reactance",
          content:
            "In AC circuits we work with complex impedance $Z = R + jX$, where $R$ is resistance and $X$ is reactance. For a sinusoid of angular frequency $\\omega = 2\\pi f$:\n\n$$Z_L = j\\omega L \\qquad Z_C = \\frac{1}{j\\omega C}$$\n\nThe magnitude of the impedance is $|Z| = \\sqrt{R^2 + X^2}$ and its phase angle is $\\theta = \\tan^{-1}\\!\\left(\\dfrac{X}{R}\\right)$. Ohm's law generalizes to phasors as $\\mathbf{V} = \\mathbf{I}\\,Z$.",
          quiz: { question: "The impedance of an inductor $L$ at angular frequency $\\omega$ is:", options: ["$\\dfrac{1}{j\\omega L}$", "$j\\omega L$", "$\\omega L$", "$\\dfrac{L}{j\\omega}$"], answer: 1 },
        },
      ],
    },
  ],

  // ── c34 · Signals & Systems (ECE) ──
  c34: [
    {
      id: "c34-m1", title: "Signals & Energy", lessons: [
        {
          id: "c34-m1-l1", title: "Signal Energy and Power",
          content:
            "A continuous-time signal $x(t)$ has total energy\n\n$$E = \\int_{-\\infty}^{\\infty} |x(t)|^2 \\, dt$$\n\nand average power\n\n$$P = \\lim_{T \\to \\infty} \\frac{1}{2T} \\int_{-T}^{T} |x(t)|^2 \\, dt.$$\n\nA signal with finite, non-zero energy ($0 < E < \\infty$) is called an energy signal; a signal with finite, non-zero power is a power signal. Periodic signals are power signals.",
          quiz: { question: "A periodic sinusoid $x(t) = A\\cos(\\omega t)$ is best classified as a:", options: ["Energy signal", "Power signal", "Neither", "Both"], answer: 1 },
        },
      ],
    },
    {
      id: "c34-m2", title: "LTI Systems", lessons: [
        {
          id: "c34-m2-l1", title: "Convolution",
          content:
            "A linear time-invariant (LTI) system is completely described by its impulse response $h(t)$. The output for any input $x(t)$ is the convolution\n\n$$y(t) = (x * h)(t) = \\int_{-\\infty}^{\\infty} x(\\tau)\\, h(t - \\tau)\\, d\\tau.$$\n\nConvolution is commutative, $x * h = h * x$, so you may flip and shift whichever signal is more convenient. For discrete signals the integral becomes a sum: $y[n] = \\sum_{k=-\\infty}^{\\infty} x[k]\\,h[n-k]$.",
          quiz: { question: "The output of an LTI system is the input convolved with the system's:", options: ["Step response", "Impulse response", "Transfer function", "Eigenvalue"], answer: 1 },
        },
      ],
    },
    {
      id: "c34-m3", title: "Frequency Domain", lessons: [
        {
          id: "c34-m3-l1", title: "The Fourier Transform",
          content:
            "The Fourier transform decomposes a signal into its frequency components:\n\n$$X(\\omega) = \\int_{-\\infty}^{\\infty} x(t)\\, e^{-j\\omega t}\\, dt$$\n\nand the inverse transform reconstructs the signal:\n\n$$x(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} X(\\omega)\\, e^{\\,j\\omega t}\\, d\\omega.$$\n\nA key property is that convolution in time becomes multiplication in frequency: if $y = x * h$ then $Y(\\omega) = X(\\omega)\\,H(\\omega)$. This is why the frequency domain makes filtering so intuitive.",
          quiz: { question: "Convolution in the time domain corresponds to what in the frequency domain?", options: ["Convolution", "Addition", "Multiplication", "Division"], answer: 2 },
        },
      ],
    },
  ],

  // ── c40 · Engineering Thermodynamics (Mechanical) ──
  c40: [
    {
      id: "c40-m1", title: "Laws of Thermodynamics", lessons: [
        {
          id: "c40-m1-l1", title: "The First Law",
          content:
            "The first law of thermodynamics is a statement of energy conservation. For a closed system, the change in internal energy $\\Delta U$ equals the heat added $Q$ minus the work done by the system $W$:\n\n$$\\Delta U = Q - W$$\n\nIn differential form, $dU = \\delta Q - \\delta W$, where boundary work for a quasi-static process is $\\delta W = p\\, dV$. Energy is neither created nor destroyed — only transferred as heat or work.",
          quiz: { question: "In $\\Delta U = Q - W$, the term $W$ represents:", options: ["Heat added to the system", "Work done by the system", "Internal energy", "Entropy change"], answer: 1 },
        },
        {
          id: "c40-m1-l2", title: "Entropy and the Second Law",
          content:
            "The second law introduces entropy $S$, a measure of disorder. For a reversible process,\n\n$$dS = \\frac{\\delta Q_{rev}}{T}$$\n\nand for any real (irreversible) process the entropy of an isolated system can only increase:\n\n$$\\Delta S_{universe} \\geq 0.$$\n\nThis inequality sets the direction of spontaneous change and explains why heat flows from hot to cold, never the reverse, without external work.",
          quiz: { question: "For an isolated system undergoing a real process, the total entropy:", options: ["Decreases", "Stays constant", "Can only increase or stay constant", "Becomes zero"], answer: 2 },
        },
      ],
    },
    {
      id: "c40-m2", title: "Ideal Cycles", lessons: [
        {
          id: "c40-m2-l1", title: "Carnot Efficiency",
          content:
            "The Carnot cycle sets the maximum possible efficiency of any heat engine operating between a hot reservoir at temperature $T_H$ and a cold reservoir at $T_C$ (both in kelvin):\n\n$$\\eta_{Carnot} = 1 - \\frac{T_C}{T_H}$$\n\nNo real engine can exceed this bound. For instance, an engine between $T_H = 600\\,\\text{K}$ and $T_C = 300\\,\\text{K}$ has a maximum efficiency of $\\eta = 1 - \\tfrac{300}{600} = 0.5$, or $50\\%$.",
          quiz: { question: "A Carnot engine runs between $500\\,\\text{K}$ and $250\\,\\text{K}$. Its efficiency is:", options: ["$25\\%$", "$50\\%$", "$75\\%$", "$100\\%$"], answer: 1 },
        },
        {
          id: "c40-m2-l2", title: "The Ideal Gas Law",
          content:
            "Many thermodynamic problems assume an ideal gas, governed by\n\n$$pV = nRT$$\n\nwhere $p$ is pressure, $V$ volume, $n$ the number of moles, $R = 8.314\\,\\text{J/(mol·K)}$ the universal gas constant, and $T$ the absolute temperature. On a per-unit-mass basis this is written $pv = RT$ with specific volume $v$ and a gas-specific $R$.",
          quiz: { question: "In the ideal gas law $pV = nRT$, the temperature $T$ must be expressed in:", options: ["Celsius", "Fahrenheit", "Kelvin", "Any unit"], answer: 2 },
        },
      ],
    },
  ],
}

/** Deterministically builds a demo syllabus (modules + lessons) for any course. */
export function getCourseContent(course: CatalogCourse): CourseModule[] {
  if (authoredCourseContent[course.id]) return authoredCourseContent[course.id]
  const count = Math.min(MODULE_BLUEPRINT.length, moduleCountFor(course))
  return MODULE_BLUEPRINT.slice(0, count).map((blueprint, mi) => {
    const mid = `${course.id}-m${mi + 1}`
    return {
      id: mid,
      title: blueprint.title,
      lessons: blueprint.lessons.map((lt, li) => {
        const title = fillTemplate(lt, course)
        return {
          id: `${mid}-l${li + 1}`,
          title,
          content: lessonBody(course, title),
          quiz: {
            question: `"${title}" is mainly designed to help you...`,
            options: [
              `apply ${course.tags[0] ?? course.title} effectively`,
              "avoid hands-on practice",
              "memorize facts without context",
              "skip the fundamentals",
            ],
            answer: 0,
          },
        }
      }),
    }
  })
}

export type ProblemDepartment = "CSE" | "ECE" | "EEE" | "Mechanical"
export type ProblemType = "coding" | "numerical" | "mcq"

export interface Problem {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  tags: string[]
  status: "Solved" | "Attempted" | "Unsolved"
  acceptance: number
  // Non-CSE problems set these; CSE coding problems default to CSE/coding.
  type?: ProblemType
  subject?: string
  department?: ProblemDepartment
}

export const problems: Problem[] = [
  { id: "p1", title: "Two Sum", difficulty: "Easy", tags: ["Arrays", "Hash Map"], status: "Solved", acceptance: 82 },
  { id: "p2", title: "Valid Parentheses", difficulty: "Easy", tags: ["Stack", "Strings"], status: "Solved", acceptance: 76 },
  { id: "p3", title: "Merge Two Sorted Lists", difficulty: "Easy", tags: ["Linked List"], status: "Solved", acceptance: 79 },
  { id: "p4", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", tags: ["Arrays", "DP"], status: "Unsolved", acceptance: 68 },
  { id: "p5", title: "Binary Tree Inorder Traversal", difficulty: "Easy", tags: ["Trees", "DFS"], status: "Unsolved", acceptance: 74 },
  { id: "p6", title: "Longest Substring Without Repeating", difficulty: "Medium", tags: ["Strings", "Sliding Window"], status: "Solved", acceptance: 55 },
  { id: "p7", title: "Add Two Numbers", difficulty: "Medium", tags: ["Linked List", "Math"], status: "Attempted", acceptance: 48 },
  { id: "p8", title: "3Sum", difficulty: "Medium", tags: ["Arrays", "Two Pointers"], status: "Unsolved", acceptance: 42 },
  { id: "p9", title: "Container With Most Water", difficulty: "Medium", tags: ["Arrays", "Two Pointers"], status: "Unsolved", acceptance: 56 },
  { id: "p10", title: "LRU Cache", difficulty: "Medium", tags: ["Hash Map", "Linked List", "Design"], status: "Unsolved", acceptance: 38 },
  { id: "p11", title: "Course Schedule", difficulty: "Medium", tags: ["Graphs", "BFS", "DFS"], status: "Unsolved", acceptance: 44 },
  { id: "p12", title: "Merge Intervals", difficulty: "Medium", tags: ["Arrays", "Sorting"], status: "Solved", acceptance: 51 },
  { id: "p13", title: "Trapping Rain Water", difficulty: "Hard", tags: ["Arrays", "Two Pointers", "DP"], status: "Unsolved", acceptance: 32 },
  { id: "p14", title: "Median of Two Sorted Arrays", difficulty: "Hard", tags: ["Arrays", "Binary Search"], status: "Unsolved", acceptance: 28 },
  { id: "p15", title: "N-Queens", difficulty: "Hard", tags: ["Backtracking"], status: "Unsolved", acceptance: 35 },

  // ── ECE (Electronics & Communication) ──
  { id: "e1", title: "Nyquist Sampling Rate", difficulty: "Easy", tags: ["Signals", "Sampling"], status: "Unsolved", acceptance: 71, type: "numerical", subject: "Signals & Systems", department: "ECE" },
  { id: "e2", title: "Inverting Op-Amp Gain", difficulty: "Easy", tags: ["Analog", "Op-Amps"], status: "Unsolved", acceptance: 64, type: "numerical", subject: "Analog Electronics", department: "ECE" },
  { id: "e3", title: "Power Ratio in Decibels", difficulty: "Medium", tags: ["Communication", "dB"], status: "Unsolved", acceptance: 58, type: "mcq", subject: "Communication", department: "ECE" },

  // ── EEE (Electrical) ──
  { id: "e4", title: "Series Circuit Current", difficulty: "Easy", tags: ["Circuits", "Ohm's Law"], status: "Unsolved", acceptance: 74, type: "numerical", subject: "Circuit Analysis", department: "EEE" },
  { id: "e5", title: "Transformer Turns Ratio", difficulty: "Easy", tags: ["Machines", "Transformers"], status: "Unsolved", acceptance: 66, type: "numerical", subject: "Electrical Machines", department: "EEE" },
  { id: "e6", title: "Power Factor Concept", difficulty: "Medium", tags: ["Power", "AC"], status: "Unsolved", acceptance: 61, type: "mcq", subject: "Power Systems", department: "EEE" },

  // ── Mechanical ──
  { id: "e7", title: "Carnot Engine Efficiency", difficulty: "Easy", tags: ["Thermodynamics", "Cycles"], status: "Unsolved", acceptance: 69, type: "numerical", subject: "Thermodynamics", department: "Mechanical" },
  { id: "e8", title: "Bernoulli Velocity", difficulty: "Medium", tags: ["Fluids", "Bernoulli"], status: "Unsolved", acceptance: 52, type: "numerical", subject: "Fluid Mechanics", department: "Mechanical" },
  { id: "e9", title: "Axial Stress in a Rod", difficulty: "Easy", tags: ["Stress", "Mechanics"], status: "Unsolved", acceptance: 72, type: "numerical", subject: "Strength of Materials", department: "Mechanical" },
]

export function getProblem(id: string): Problem | undefined {
  return problems.find((p) => p.id === id)
}

// ── Problem details + starter code ───────────────────────────────────────────
export type CodeLanguage = "javascript" | "python" | "java" | "cpp"

export interface ProblemDetail {
  description: string
  examples: { input: string; output: string; explanation?: string }[]
  constraints: string[]
  hints: string[]
  starter: Record<CodeLanguage, string>
}

const snake = (s: string) => s.replace(/([A-Z])/g, "_$1").toLowerCase()

// Builds approximate starter code across the four supported languages.
function starter(fn: string, params: string[]): Record<CodeLanguage, string> {
  const args = params.join(", ")
  return {
    javascript: `function ${fn}(${args}) {\n  // Write your solution here\n  \n}`,
    python: `def ${snake(fn)}(${params.map(snake).join(", ")}):\n    # Write your solution here\n    pass`,
    java: `class Solution {\n    public Object ${fn}(${params.map((p) => "Object " + p).join(", ")}) {\n        // Write your solution here\n        return null;\n    }\n}`,
    cpp: `class Solution {\npublic:\n    auto ${fn}(${params.map((p) => "auto " + p).join(", ")}) {\n        // Write your solution here\n        \n    }\n};`,
  }
}

export const problemDetails: Record<string, ProblemDetail> = {
  p1: {
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input has exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, so we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists."],
    hints: ["A brute force approach checks every pair in O(n²).", "Use a hash map to store values you've seen.", "For each number, check if target - number is already in the map."],
    starter: starter("twoSum", ["nums", "target"]),
  },
  p2: {
    description: "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. Brackets must be closed by the same type and in the correct order.",
    examples: [
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    hints: ["A stack is the natural data structure here.", "Push opening brackets; on a closing bracket, the top of the stack must match.", "The string is valid only if the stack is empty at the end."],
    starter: starter("isValid", ["s"]),
  },
  p3: {
    description: "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list by splicing together the nodes, and return the head of the merged list.",
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100", "Both lists are sorted in non-decreasing order."],
    hints: ["Use a dummy head node to simplify edge cases.", "Advance the pointer of whichever list has the smaller current value.", "Append the remaining nodes once one list is exhausted."],
    starter: starter("mergeTwoLists", ["list1", "list2"]),
  },
  p4: {
    description: "You are given an array `prices` where `prices[i]` is the price of a stock on day `i`. Maximize your profit by choosing a day to buy and a later day to sell. Return the maximum profit, or 0 if none is possible.",
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6)." },
      { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No profitable transaction is possible." },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    hints: ["Track the minimum price seen so far.", "At each day, compute the profit if you sold today.", "Keep a running maximum of those profits."],
    starter: starter("maxProfit", ["prices"]),
  },
  p5: {
    description: "Given the `root` of a binary tree, return the inorder traversal of its nodes' values (left, node, right).",
    examples: [
      { input: "root = [1,null,2,3]", output: "[1,3,2]" },
      { input: "root = []", output: "[]" },
    ],
    constraints: ["The number of nodes is in the range [0, 100].", "-100 <= Node.val <= 100"],
    hints: ["Recursion mirrors the definition directly: left, node, right.", "For an iterative solution, use an explicit stack.", "Push left children until null, then visit and go right."],
    starter: starter("inorderTraversal", ["root"]),
  },
  p6: {
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: "1" },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    hints: ["Use a sliding window with two pointers.", "Track the last index of each character in a map.", "When you see a repeat, move the left pointer past the previous occurrence."],
    starter: starter("lengthOfLongestSubstring", ["s"]),
  },
  p7: {
    description: "You are given two non-empty linked lists representing two non-negative integers stored in reverse order. Add the two numbers and return the sum as a linked list, also in reverse order.",
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
      { input: "l1 = [0], l2 = [0]", output: "[0]" },
    ],
    constraints: ["The number of nodes is in the range [1, 100].", "0 <= Node.val <= 9", "The lists represent numbers with no leading zeros."],
    hints: ["Simulate grade-school addition digit by digit.", "Track a carry between nodes.", "Don't forget a final carry node if the last sum exceeds 9."],
    starter: starter("addTwoNumbers", ["l1", "l2"]),
  },
  p8: {
    description: "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i`, `j`, `k` are distinct and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets.",
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
      { input: "nums = [0,1,1]", output: "[]" },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    hints: ["Sort the array first.", "Fix one element and use two pointers for the remaining pair.", "Skip duplicate values to avoid duplicate triplets."],
    starter: starter("threeSum", ["nums"]),
  },
  p9: {
    description: "Given an integer array `height` of length `n`, find two lines that together with the x-axis form a container holding the most water. Return the maximum amount of water it can store.",
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    hints: ["Start with the widest container: pointers at both ends.", "Area is limited by the shorter line.", "Move the pointer at the shorter line inward."],
    starter: starter("maxArea", ["height"]),
  },
  p10: {
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement `get(key)` and `put(key, value)`, both running in O(1) average time. When capacity is exceeded, evict the least recently used key.",
    examples: [
      { input: 'LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2)', output: "[null,null,null,1,null,-1]", explanation: "Adding key 3 evicts key 2 (least recently used)." },
    ],
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "At most 2 * 10^5 calls to get and put."],
    hints: ["Combine a hash map with a doubly linked list.", "The hash map gives O(1) lookup; the list keeps usage order.", "On access, move the node to the front (most recently used)."],
    starter: {
      javascript: `class LRUCache {\n  constructor(capacity) {\n    // Initialize your data structure here\n  }\n\n  get(key) {\n    \n  }\n\n  put(key, value) {\n    \n  }\n}`,
      python: `class LRUCache:\n    def __init__(self, capacity):\n        # Initialize your data structure here\n        pass\n\n    def get(self, key):\n        pass\n\n    def put(self, key, value):\n        pass`,
      java: `class LRUCache {\n    public LRUCache(int capacity) {\n        // Initialize your data structure here\n    }\n\n    public int get(int key) {\n        return -1;\n    }\n\n    public void put(int key, int value) {\n        \n    }\n}`,
      cpp: `class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        // Initialize your data structure here\n    }\n\n    int get(int key) {\n        return -1;\n    }\n\n    void put(int key, int value) {\n        \n    }\n};`,
    },
  },
  p11: {
    description: "There are `numCourses` courses labeled 0 to numCourses - 1. Given `prerequisites` where `prerequisites[i] = [a, b]` means you must take course b before course a, return true if you can finish all courses.",
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false", explanation: "There is a cyclic dependency." },
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000", "All prerequisite pairs are unique."],
    hints: ["Model courses as a directed graph.", "The answer is true iff the graph has no cycle.", "Use topological sort (Kahn's algorithm) or DFS cycle detection."],
    starter: starter("canFinish", ["numCourses", "prerequisites"]),
  },
  p12: {
    description: "Given an array of `intervals` where `intervals[i] = [start, end]`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "[1,3] and [2,6] overlap, so they merge into [1,6]." },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" },
    ],
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= start <= end <= 10^4"],
    hints: ["Sort intervals by their start value.", "Iterate and extend the current interval while they overlap.", "Otherwise, push the current interval and start a new one."],
    starter: starter("merge", ["intervals"]),
  },
  p13: {
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    hints: ["Water above a bar depends on the max height to its left and right.", "Precompute left-max and right-max arrays, or use two pointers.", "Trapped water at i = min(leftMax, rightMax) - height[i]."],
    starter: starter("trap", ["height"]),
  },
  p14: {
    description: "Given two sorted arrays `nums1` and `nums2` of sizes m and n, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000", explanation: "Merged = [1,2,3], median is 2." },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.50000" },
    ],
    constraints: ["0 <= m, n <= 1000", "1 <= m + n <= 2000", "-10^6 <= nums1[i], nums2[i] <= 10^6"],
    hints: ["A merge is O(m+n) — the log bound needs binary search.", "Binary search the partition of the smaller array.", "Balance the left/right halves so left has ≤ elements and its max ≤ right's min."],
    starter: starter("findMedianSortedArrays", ["nums1", "nums2"]),
  },
  p15: {
    description: "The n-queens puzzle places `n` queens on an n×n chessboard so that no two queens attack each other. Return all distinct solutions, where each solution is a board configuration.",
    examples: [
      { input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: "n = 1", output: '[["Q"]]' },
    ],
    constraints: ["1 <= n <= 9"],
    hints: ["Place one queen per row via backtracking.", "Track used columns and both diagonals for O(1) validity checks.", "Diagonals can be keyed by (row + col) and (row - col)."],
    starter: starter("solveNQueens", ["n"]),
  },
}

export function getProblemDetail(id: string): ProblemDetail {
  return (
    problemDetails[id] ?? {
      description: "Solve this problem efficiently, handling all edge cases such as empty and single-element inputs. Consider the time and space complexity of your approach.",
      examples: [{ input: "Sample input", output: "Expected output" }],
      constraints: ["1 <= n <= 10^5", "Values fit in a 32-bit integer."],
      hints: ["Start with a brute-force approach.", "Think about which data structure reduces the work.", "Can you trade extra space for lower time complexity?"],
      starter: starter("solve", ["input"]),
    }
  )
}

// ── Engineering (non-coding) problem details ─────────────────────────────────
// Statements, solutions, and choices may contain LaTeX ($...$ / $$...$$).
export interface EngineeringProblemDetail {
  statement: string
  given?: string[]
  answerType: "numerical" | "mcq"
  answer?: { value: number; tolerance: number; unit?: string }
  choices?: string[]
  correctChoice?: number
  hints: string[]
  solution: string
}

export const engineeringDetails: Record<string, EngineeringProblemDetail> = {
  e1: {
    statement: "A signal contains frequency components up to a maximum frequency of $f_{max} = 4\\,\\text{kHz}$. According to the Nyquist–Shannon sampling theorem, what is the minimum sampling rate $f_s$ (in kHz) required to reconstruct the signal without aliasing?",
    given: ["Maximum signal frequency: $f_{max} = 4\\,\\text{kHz}$"],
    answerType: "numerical",
    answer: { value: 8, tolerance: 0.01, unit: "kHz" },
    hints: ["The Nyquist rate is twice the highest frequency present.", "$f_s \\geq 2 f_{max}$"],
    solution: "The Nyquist theorem requires sampling at least twice the maximum frequency:\n\n$$f_s \\geq 2 f_{max} = 2 \\times 4\\,\\text{kHz} = 8\\,\\text{kHz}.$$\n\nSampling below this rate causes aliasing, where high frequencies masquerade as lower ones.",
  },
  e2: {
    statement: "For an ideal inverting operational amplifier, the output–input relationship is set by the feedback and input resistors. Given $R_f = 100\\,\\text{k}\\Omega$ and $R_{in} = 10\\,\\text{k}\\Omega$, what is the magnitude of the closed-loop voltage gain $|A_v|$?",
    given: ["Feedback resistor: $R_f = 100\\,\\text{k}\\Omega$", "Input resistor: $R_{in} = 10\\,\\text{k}\\Omega$"],
    answerType: "numerical",
    answer: { value: 10, tolerance: 0.01 },
    hints: ["For an inverting amplifier, $A_v = -\\dfrac{R_f}{R_{in}}$.", "The question asks for the magnitude."],
    solution: "The gain of an ideal inverting op-amp is\n\n$$A_v = -\\frac{R_f}{R_{in}} = -\\frac{100\\,\\text{k}\\Omega}{10\\,\\text{k}\\Omega} = -10.$$\n\nThe magnitude is $|A_v| = 10$, and the negative sign indicates a $180^\\circ$ phase inversion.",
  },
  e3: {
    statement: "The power gain of an amplifier is expressed in decibels as $G_{dB} = 10 \\log_{10}\\!\\left(\\dfrac{P_{out}}{P_{in}}\\right)$. If the output power is $100$ times the input power, what is the gain in decibels?",
    answerType: "mcq",
    choices: ["$10\\,\\text{dB}$", "$20\\,\\text{dB}$", "$100\\,\\text{dB}$", "$2\\,\\text{dB}$"],
    correctChoice: 1,
    hints: ["Substitute $P_{out}/P_{in} = 100$.", "$\\log_{10}(100) = 2$."],
    solution: "With a power ratio of $100$:\n\n$$G_{dB} = 10 \\log_{10}(100) = 10 \\times 2 = 20\\,\\text{dB}.$$\n\nNote that for a *power* ratio the multiplier is $10$; for a *voltage* ratio it would be $20$.",
  },
  e4: {
    statement: "A $12\\,\\text{V}$ battery is connected across three resistors in series: $R_1 = 2\\,\\Omega$, $R_2 = 4\\,\\Omega$, and $R_3 = 6\\,\\Omega$. What is the current $I$ (in amperes) flowing through the circuit?",
    given: ["Source voltage: $V = 12\\,\\text{V}$", "$R_1 = 2\\,\\Omega,\\; R_2 = 4\\,\\Omega,\\; R_3 = 6\\,\\Omega$"],
    answerType: "numerical",
    answer: { value: 1, tolerance: 0.01, unit: "A" },
    hints: ["Series resistances add: $R_{eq} = R_1 + R_2 + R_3$.", "Apply Ohm's law: $I = V / R_{eq}$."],
    solution: "First combine the series resistors:\n\n$$R_{eq} = R_1 + R_2 + R_3 = 2 + 4 + 6 = 12\\,\\Omega.$$\n\nThen apply Ohm's law:\n\n$$I = \\frac{V}{R_{eq}} = \\frac{12\\,\\text{V}}{12\\,\\Omega} = 1\\,\\text{A}.$$",
  },
  e5: {
    statement: "An ideal transformer has $N_1 = 500$ turns on the primary and $N_2 = 100$ turns on the secondary. If the primary voltage is $V_1 = 230\\,\\text{V}$, what is the secondary voltage $V_2$ (in volts)?",
    given: ["Primary turns: $N_1 = 500$", "Secondary turns: $N_2 = 100$", "Primary voltage: $V_1 = 230\\,\\text{V}$"],
    answerType: "numerical",
    answer: { value: 46, tolerance: 0.1, unit: "V" },
    hints: ["For an ideal transformer $\\dfrac{V_1}{V_2} = \\dfrac{N_1}{N_2}$.", "Solve for $V_2$."],
    solution: "The turns ratio relates the voltages:\n\n$$\\frac{V_1}{V_2} = \\frac{N_1}{N_2} \\implies V_2 = V_1 \\cdot \\frac{N_2}{N_1} = 230 \\times \\frac{100}{500} = 46\\,\\text{V}.$$\n\nSince $N_2 < N_1$, this is a step-down transformer.",
  },
  e6: {
    statement: "In an AC circuit, the power factor is defined as $\\cos\\phi$, where $\\phi$ is the phase angle between voltage and current. A purely resistive load has a power factor of:",
    answerType: "mcq",
    choices: ["$0$ (lagging)", "$0.5$", "$1$ (unity)", "$-1$"],
    correctChoice: 2,
    hints: ["In a purely resistive load, voltage and current are in phase.", "What is $\\cos(0^\\circ)$?"],
    solution: "For a purely resistive load, current and voltage are in phase, so $\\phi = 0^\\circ$ and\n\n$$\\text{p.f.} = \\cos\\phi = \\cos 0^\\circ = 1.$$\n\nThis unity power factor means all the supplied power is real (dissipated) power, with no reactive component.",
  },
  e7: {
    statement: "A Carnot engine operates between a hot reservoir at $T_H = 800\\,\\text{K}$ and a cold reservoir at $T_C = 300\\,\\text{K}$. What is its maximum thermal efficiency $\\eta$ (as a percentage)?",
    given: ["Hot reservoir: $T_H = 800\\,\\text{K}$", "Cold reservoir: $T_C = 300\\,\\text{K}$"],
    answerType: "numerical",
    answer: { value: 62.5, tolerance: 0.5, unit: "%" },
    hints: ["Use the Carnot efficiency $\\eta = 1 - \\dfrac{T_C}{T_H}$.", "Temperatures must be in kelvin; convert the result to a percentage."],
    solution: "The Carnot efficiency depends only on the reservoir temperatures:\n\n$$\\eta = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{800} = 1 - 0.375 = 0.625.$$\n\nSo the maximum efficiency is $62.5\\%$.",
  },
  e8: {
    statement: "Water flows through a horizontal pipe. At a point where the pressure difference converts entirely to kinetic energy, the efflux velocity from a tank is given by Torricelli's law. If water exits from a hole a height $h = 5\\,\\text{m}$ below the free surface, what is the exit velocity $v$ (in m/s)? Take $g = 9.81\\,\\text{m/s}^2$.",
    given: ["Head: $h = 5\\,\\text{m}$", "Gravity: $g = 9.81\\,\\text{m/s}^2$"],
    answerType: "numerical",
    answer: { value: 9.9, tolerance: 0.2, unit: "m/s" },
    hints: ["From Bernoulli's equation, $v = \\sqrt{2gh}$.", "Substitute $g = 9.81$ and $h = 5$."],
    solution: "Applying Bernoulli's equation between the free surface and the hole gives Torricelli's result:\n\n$$v = \\sqrt{2gh} = \\sqrt{2 \\times 9.81 \\times 5} = \\sqrt{98.1} \\approx 9.9\\,\\text{m/s}.$$",
  },
  e9: {
    statement: "A steel rod of cross-sectional area $A = 200\\,\\text{mm}^2$ carries an axial tensile load of $F = 20\\,\\text{kN}$. What is the normal (axial) stress $\\sigma$ in the rod, in megapascals (MPa)?",
    given: ["Axial load: $F = 20\\,\\text{kN} = 20000\\,\\text{N}$", "Cross-sectional area: $A = 200\\,\\text{mm}^2$"],
    answerType: "numerical",
    answer: { value: 100, tolerance: 1, unit: "MPa" },
    hints: ["Axial stress is $\\sigma = \\dfrac{F}{A}$.", "$1\\,\\text{MPa} = 1\\,\\text{N/mm}^2$, so keep force in N and area in mm²."],
    solution: "Normal stress is force per unit area:\n\n$$\\sigma = \\frac{F}{A} = \\frac{20000\\,\\text{N}}{200\\,\\text{mm}^2} = 100\\,\\text{N/mm}^2 = 100\\,\\text{MPa}.$$",
  },
}

export function getEngineeringDetail(id: string): EngineeringProblemDetail | undefined {
  return engineeringDetails[id]
}

export interface Verification {
  id: string
  skill: string
  tier: "Basic" | "Intermediate" | "Advanced"
  status: "Passed" | "Failed" | "Scheduled" | "Not Started"
  score?: number
  date?: string
  flags: string[]
  certificateId?: string
}

export const verifications: Verification[] = [
  { id: "v1", skill: "React", tier: "Intermediate", status: "Passed", score: 87, date: "2026-01-15", flags: [], certificateId: "CERT-RCT-2026-A7B3" },
  { id: "v2", skill: "DSA", tier: "Basic", status: "Passed", score: 92, date: "2026-01-08", flags: [], certificateId: "CERT-DSA-2026-K9L2" },
  { id: "v3", skill: "SQL", tier: "Intermediate", status: "Scheduled", date: "2026-02-20", flags: [] },
  { id: "v4", skill: "Backend", tier: "Advanced", status: "Not Started", flags: [] },
]

// ── Guided Projects catalogue ────────────────────────────────────────────────
export type ProjectStatus = "Not Started" | "In Progress" | "Completed"

export interface CatalogProject {
  id: string
  title: string
  description: string
  categoryId: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  tech: string[]
  outcome: string
}

export const catalogProjects: CatalogProject[] = [
  // ── Web Development ──
  { id: "prj1", title: "Full-Stack E-commerce Store", description: "Build a complete online store with product catalog, cart, checkout, and Stripe payments.", categoryId: "web", difficulty: "Advanced", duration: "3 days", tech: ["Next.js", "Stripe", "PostgreSQL"], outcome: "A deployable storefront with real payments." },
  { id: "prj2", title: "Real-time Chat Application", description: "A WebSocket-based chat app with rooms, typing indicators, and message persistence.", categoryId: "web", difficulty: "Intermediate", duration: "2 days", tech: ["WebSocket", "Node.js", "React"], outcome: "A live multi-room chat you can share." },
  { id: "prj3", title: "Personal Portfolio & Blog", description: "A fast, SEO-friendly portfolio with an MDX-powered blog and dark mode.", categoryId: "web", difficulty: "Beginner", duration: "1 day", tech: ["Next.js", "MDX", "Tailwind"], outcome: "A polished personal site you can publish." },
  { id: "prj4", title: "Kanban Task Board", description: "A drag-and-drop task board with columns, cards, and local persistence.", categoryId: "web", difficulty: "Intermediate", duration: "2 days", tech: ["React", "Drag & Drop", "Zustand"], outcome: "A Trello-style board you built from scratch." },

  // ── Computer Science ──
  { id: "prj5", title: "URL Shortener Service", description: "A scalable link shortener with redirects, click analytics, and rate limiting.", categoryId: "cs", difficulty: "Intermediate", duration: "2 days", tech: ["Node.js", "Redis", "REST"], outcome: "A working bit.ly-style service." },
  { id: "prj6", title: "In-Memory Key-Value Store", description: "Build your own mini Redis with TTL, LRU eviction, and a simple protocol.", categoryId: "cs", difficulty: "Advanced", duration: "3 days", tech: ["Go", "Data Structures", "TCP"], outcome: "A key-value database you understand end to end." },
  { id: "prj7", title: "Mini Load Balancer", description: "A round-robin HTTP load balancer with health checks and logging.", categoryId: "cs", difficulty: "Advanced", duration: "2 days", tech: ["Go", "Networking", "Concurrency"], outcome: "A load balancer distributing real traffic." },

  // ── Programming ──
  { id: "prj8", title: "CLI Todo Manager", description: "A command-line todo app with add, list, complete, and JSON persistence.", categoryId: "prog", difficulty: "Beginner", duration: "4 hours", tech: ["Python", "argparse", "JSON"], outcome: "A handy CLI tool you actually use." },
  { id: "prj9", title: "Markdown to HTML Converter", description: "Parse Markdown into HTML with support for headings, lists, links, and code.", categoryId: "prog", difficulty: "Intermediate", duration: "1 day", tech: ["JavaScript", "Parsing", "Regex"], outcome: "Your own Markdown engine." },
  { id: "prj10", title: "2D Game with a Game Loop", description: "A small 2D game featuring a fixed-timestep game loop, input, and collisions.", categoryId: "prog", difficulty: "Advanced", duration: "3 days", tech: ["C++", "Game Loop", "SDL"], outcome: "A playable game you coded from scratch." },

  // ── AI & Machine Learning ──
  { id: "prj11", title: "Movie Recommendation Engine", description: "Recommend movies with collaborative filtering and evaluate the results.", categoryId: "ai", difficulty: "Intermediate", duration: "2 days", tech: ["Python", "ML", "Pandas"], outcome: "A recommender that suggests films for a user." },
  { id: "prj12", title: "Chatbot with LLM + RAG", description: "A retrieval-augmented chatbot that answers questions over your own documents.", categoryId: "ai", difficulty: "Advanced", duration: "3 days", tech: ["LLM", "RAG", "Embeddings"], outcome: "An AI assistant grounded in your data." },
  { id: "prj13", title: "Image Classifier", description: "Train a convolutional neural network to classify images and deploy an inference API.", categoryId: "ai", difficulty: "Advanced", duration: "3 days", tech: ["PyTorch", "CNN", "FastAPI"], outcome: "A model that labels images via an API." },

  // ── Data Science ──
  { id: "prj14", title: "Sales Data Dashboard", description: "Clean, analyze, and visualize sales data in an interactive dashboard.", categoryId: "ds", difficulty: "Beginner", duration: "1 day", tech: ["Pandas", "Plotly", "Python"], outcome: "An interactive dashboard from raw CSVs." },
  { id: "prj15", title: "Customer Churn Analysis", description: "Explore a customer dataset and build a model that predicts churn.", categoryId: "ds", difficulty: "Intermediate", duration: "2 days", tech: ["Pandas", "scikit-learn", "SQL"], outcome: "A churn model with an evaluation report." },
  { id: "prj16", title: "Web Scraper & Data Pipeline", description: "Scrape a website, clean the data, and load it into a queryable store.", categoryId: "ds", difficulty: "Intermediate", duration: "2 days", tech: ["Python", "Scraping", "SQL"], outcome: "An automated data pipeline end to end." },

  // ── Electronics & Communication (ECE) ──
  { id: "prj17", title: "IoT Weather Station", description: "Build an ESP32-based station that measures temperature and humidity and streams readings to a live dashboard over MQTT.", categoryId: "ece", difficulty: "Intermediate", duration: "3 days", tech: ["ESP32", "Sensors", "MQTT"], outcome: "A connected sensor node publishing to a real dashboard." },
  { id: "prj18", title: "FM Radio Receiver", description: "Design and build a superheterodyne FM receiver from RF front-end to audio output.", categoryId: "ece", difficulty: "Advanced", duration: "5 days", tech: ["RF", "Analog", "Circuit Design"], outcome: "A working radio you designed and tuned yourself." },
  { id: "prj19", title: "Digital Voltmeter", description: "Create a microcontroller-based DC voltmeter using an ADC and a 7-segment / LCD display.", categoryId: "ece", difficulty: "Beginner", duration: "2 days", tech: ["Microcontroller", "ADC", "Embedded"], outcome: "A handheld DVM reading real voltages." },

  // ── Electrical Engineering (EEE) ──
  { id: "prj20", title: "Solar MPPT Charge Controller", description: "Build a DC-DC converter with Maximum Power Point Tracking to charge a battery from a solar panel efficiently.", categoryId: "eee", difficulty: "Advanced", duration: "5 days", tech: ["Power Electronics", "MPPT", "Solar"], outcome: "A charge controller maximizing solar harvest." },
  { id: "prj21", title: "Automatic Street Light System", description: "Design an LDR-based circuit that switches a light on at dusk and off at dawn using a relay.", categoryId: "eee", difficulty: "Beginner", duration: "1 day", tech: ["Circuits", "Sensors", "Relays"], outcome: "An automatic day/night lighting controller." },
  { id: "prj22", title: "Single-Phase PWM Inverter", description: "Convert DC to AC with a MOSFET H-bridge and sinusoidal PWM to run small AC loads.", categoryId: "eee", difficulty: "Intermediate", duration: "4 days", tech: ["Power Electronics", "PWM", "Inverter"], outcome: "A DC-to-AC inverter powering a real load." },

  // ── Mechanical Engineering ──
  { id: "prj23", title: "Gear Train CAD & Analysis", description: "Model a spur-gear reduction assembly in CAD, apply GD&T, and verify the gear ratio and tooth stresses.", categoryId: "mech", difficulty: "Intermediate", duration: "3 days", tech: ["CAD", "SolidWorks", "GD&T"], outcome: "A fully dimensioned, analyzed gear assembly." },
  { id: "prj24", title: "Mini Wind Turbine", description: "Design, fabricate, and test a small wind turbine, then measure its power output versus wind speed.", categoryId: "mech", difficulty: "Intermediate", duration: "5 days", tech: ["Aerodynamics", "CAD", "Fabrication"], outcome: "A working turbine with a measured power curve." },
  { id: "prj25", title: "Cantilever Beam FEA", description: "Run a finite-element stress analysis of a loaded cantilever beam and compare the results to hand calculations.", categoryId: "mech", difficulty: "Advanced", duration: "2 days", tech: ["FEA", "ANSYS", "Mechanics"], outcome: "An FEA study validated against theory." },
]

export function getCatalogProject(id: string): CatalogProject | undefined {
  return catalogProjects.find((p) => p.id === id)
}

export interface ProjectStep {
  id: string
  title: string
  description: string
  details: string[]
  command?: string
}

// Guided steps for electronics projects (ECE / EEE): schematic → simulate → prototype → test.
function electronicsBlueprint(project: CatalogProject): Omit<ProjectStep, "id">[] {
  const t0 = project.tech[0] ?? "the circuit"
  return [
    {
      title: "Define Requirements & Specifications",
      description: `Pin down exactly what ${project.title} must do and the specs it must meet.`,
      details: [
        "List the functional requirements and target performance.",
        "Fix the operating voltage, current budget, and I/O ranges.",
        "Choose the core approach and key components for the design.",
      ],
    },
    {
      title: "Circuit Design & Schematic",
      description: `Design the ${t0} and capture a complete schematic.`,
      details: [
        "Select components and size them using Ohm's law $V = IR$ and Kirchhoff's laws.",
        "Draw the schematic in a tool like KiCad, EasyEDA, or Multisim.",
        "Add decoupling, protection, and connectors.",
      ],
    },
    {
      title: "Simulate the Circuit",
      description: "Verify the design in simulation before touching hardware.",
      details: [
        "Simulate in LTspice / Multisim and inspect the operating point.",
        "Check key waveforms, gain, and frequency response.",
        "Iterate on component values until the specs are met.",
      ],
    },
    {
      title: "Build the Prototype",
      description: "Bring the design to life on a breadboard, then a PCB.",
      details: [
        "Breadboard the circuit and verify basic operation.",
        "Lay out a PCB and get it fabricated if the design is stable.",
        "Solder, inspect joints, and check for shorts before powering up.",
      ],
    },
    {
      title: "Testing & Measurement",
      description: "Power it up and measure real-world performance.",
      details: [
        "Measure voltages and currents with a multimeter.",
        "Capture waveforms on an oscilloscope and compare to simulation.",
        "Evaluate efficiency, e.g. $\\eta = \\dfrac{P_{out}}{P_{in}} \\times 100\\%$.",
      ],
    },
    {
      title: "Analysis & Optimization",
      description: "Explain any gaps between measured and expected behavior, then improve.",
      details: [
        "Analyze discrepancies against your calculations.",
        "Address noise, thermal, and stability issues.",
        "Tune the design for reliability and performance.",
      ],
    },
    {
      title: "Documentation & Demo",
      description: "Package the project so others can understand and reproduce it.",
      details: [
        "Write up the schematic, bill of materials (BOM), and results.",
        "Record a short demo showing it working.",
        "Add the project and report to your portfolio.",
      ],
    },
  ]
}

// Guided steps for mechanical projects: calculate → CAD → analyze → fabricate → validate.
function mechanicalBlueprint(project: CatalogProject): Omit<ProjectStep, "id">[] {
  return [
    {
      title: "Define Requirements & Constraints",
      description: `Establish the functional requirements and constraints for ${project.title}.`,
      details: [
        "List loads, motion, and environmental conditions.",
        "Choose candidate materials and a target factor of safety.",
        "Note manufacturing and dimensional constraints.",
      ],
    },
    {
      title: "Conceptual Design & Hand Calculations",
      description: "Sketch concepts and validate them with first-order engineering calculations.",
      details: [
        "Sketch two or three concepts and pick the strongest.",
        "Apply the governing equations, e.g. bending stress $\\sigma = \\dfrac{M c}{I}$.",
        "Compute preliminary dimensions and check the factor of safety.",
      ],
    },
    {
      title: "CAD Modeling",
      description: "Build a parametric 3D model and engineering drawings.",
      details: [
        "Model the parts in SolidWorks / Fusion 360 and assemble them.",
        "Assign materials and mass properties.",
        "Produce dimensioned drawings with GD&T tolerances.",
      ],
    },
    {
      title: "Simulation & Analysis",
      description: "Validate the design numerically with FEA or CFD.",
      details: [
        "Apply boundary conditions and generate a suitable mesh.",
        "Run the FEA/CFD study in ANSYS or the CAD's simulation add-in.",
        "Check stress, deflection, and the factor of safety against targets.",
      ],
    },
    {
      title: "Fabrication / Prototyping",
      description: "Manufacture or 3D-print a physical prototype.",
      details: [
        "Choose a process: machining, 3D printing, or sheet-metal work.",
        "Fabricate the parts to your drawings.",
        "Assemble the prototype and verify fit.",
      ],
    },
    {
      title: "Testing & Validation",
      description: "Test the prototype against the original requirements.",
      details: [
        "Measure real performance under representative loads.",
        "Compare measured results to your analysis and calculations.",
        "Identify failure modes and design improvements.",
      ],
    },
    {
      title: "Documentation & Demo",
      description: "Compile a report and present the finished project.",
      details: [
        "Assemble drawings, analysis, and test results into a report.",
        "Prepare a short presentation or demo.",
        "Add the project to your portfolio.",
      ],
    },
  ]
}

// Guided steps for software projects (CSE): setup → build → deploy.
function softwareBlueprint(project: CatalogProject): Omit<ProjectStep, "id">[] {
  const t0 = project.tech[0] ?? "your stack"
  const t1 = project.tech[1] ?? project.tech[0] ?? "the core module"
  const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  return [
    {
      title: "Set Up Your Environment",
      description: `Install the tools you need and create a clean workspace for ${project.title}.`,
      details: [
        `Install the runtime and package manager for ${t0}.`,
        "Create a project folder and initialize Git for version control.",
        "Install the core dependencies and confirm the app runs.",
      ],
      command: `mkdir ${slug}\ncd ${slug}\ngit init`,
    },
    {
      title: "Scaffold the Project Structure",
      description: "Lay out a clean, scalable folder structure and base configuration.",
      details: [
        "Create folders for source code, config, and assets.",
        "Add a README, .gitignore, and an environment file.",
        "Set up formatting and linting for consistency.",
      ],
    },
    {
      title: "Design the Data Model & Architecture",
      description: `Plan how data flows through ${project.title} before writing feature code.`,
      details: [
        "Sketch the main entities and how they relate.",
        `Decide where ${t0} fits and define your module boundaries.`,
        "Write down the core interfaces and schemas.",
      ],
    },
    {
      title: "Build the Core Features",
      description: `Implement the main functionality that makes ${project.title} work.`,
      details: [
        `Implement the primary ${t0} logic first.`,
        "Wire the pieces together so a basic end-to-end flow works.",
        "Commit often and test each feature as you go.",
      ],
    },
    {
      title: `Integrate ${t1}`,
      description: `Connect ${t1} and any external services the project needs.`,
      details: [
        `Add and configure ${t1}.`,
        "Keep secrets in environment variables, never in code.",
        "Handle the failure cases: timeouts, errors, and empty states.",
      ],
    },
    {
      title: "Add Testing & Polish",
      description: "Make the project robust and pleasant to use.",
      details: [
        "Write tests for the critical paths.",
        "Add input validation and clear error handling.",
        "Polish the UX / output and remove dead code.",
      ],
    },
    {
      title: "Deploy & Ship",
      description: "Deploy your project and add it to your portfolio.",
      details: [
        "Set production environment variables and build settings.",
        "Deploy to a host (Vercel, Render, Fly.io, or a container).",
        "Verify the live version and share the link on your profile.",
      ],
      command: `git add .\ngit commit -m "Ship ${project.title}"\ngit push origin main`,
    },
  ]
}

/** Deterministically builds the step-by-step guide for any project, tailored to its department. */
export function getProjectSteps(project: CatalogProject): ProjectStep[] {
  const department = courseCategories.find((c) => c.id === project.categoryId)?.department ?? "CSE"
  const blueprint =
    department === "Mechanical"
      ? mechanicalBlueprint(project)
      : department === "ECE" || department === "EEE"
        ? electronicsBlueprint(project)
        : softwareBlueprint(project)
  return blueprint.map((s, i) => ({ id: `${project.id}-s${i + 1}`, ...s }))
}

export interface MockInterview {
  id: string
  type: "Technical" | "Behavioral"
  date: string
  status: "Completed" | "Scheduled" | "Cancelled"
  overallScore?: number
  strengths?: string[]
  improvements?: string[]
  recommendedPractice?: string[]
}

export const mockInterviews: MockInterview[] = [
  {
    id: "mi1",
    type: "Technical",
    date: "2026-01-20",
    status: "Completed",
    overallScore: 76,
    strengths: ["Strong problem decomposition", "Clear communication of approach", "Good time management"],
    improvements: ["Edge case handling", "Space complexity optimization", "More thorough testing"],
    recommendedPractice: ["Practice medium DP problems", "Review graph algorithms", "Mock system design rounds"],
  },
  {
    id: "mi2",
    type: "Behavioral",
    date: "2026-02-25",
    status: "Scheduled",
  },
]

export interface Certificate {
  id: string
  skill: string
  tier: string
  issuedDate: string
  authenticityId: string
  holder: string
  score: number
}

export const certificates: Certificate[] = [
  { id: "cert1", skill: "React", tier: "Intermediate", issuedDate: "2026-01-15", authenticityId: "CERT-RCT-2026-A7B3-BLOCKCHAIN-0x8a9f", holder: "Priya Sharma", score: 87 },
  { id: "cert2", skill: "DSA", tier: "Basic", issuedDate: "2026-01-08", authenticityId: "CERT-DSA-2026-K9L2-BLOCKCHAIN-0x3c2d", holder: "Priya Sharma", score: 92 },
]

export interface PipelineCandidate {
  id: string
  userId: string
  name: string
  avatar: string
  role: string
  skills: string[]
  employabilityScore: number
  verified: boolean
  aiRecommended: boolean
  stage: "Applied" | "Shortlisted" | "Interview 1" | "Interview 2" | "Offer" | "Hired" | "Rejected"
  location: string
  experience: string
  lastActive: string
}

export const pipelineCandidates: PipelineCandidate[] = [
  { id: "pc1", userId: "u1", name: "Priya Sharma", avatar: "PS", role: "Full Stack Developer", skills: ["React", "Node.js", "Python"], employabilityScore: 78, verified: true, aiRecommended: true, stage: "Interview 1", location: "Bangalore", experience: "0-1 years", lastActive: "2 hours ago" },
  { id: "pc2", userId: "u4", name: "Vikram Singh", avatar: "VS", role: "Senior Backend Engineer", skills: ["React", "TypeScript", "GraphQL", "Docker"], employabilityScore: 91, verified: true, aiRecommended: true, stage: "Interview 2", location: "Mumbai", experience: "3-5 years", lastActive: "1 hour ago" },
  { id: "pc3", userId: "u3", name: "Ananya Gupta", avatar: "AG", role: "Backend Developer", skills: ["Python", "Django", "PostgreSQL"], employabilityScore: 82, verified: true, aiRecommended: false, stage: "Applied", location: "Delhi", experience: "0-1 years", lastActive: "5 hours ago" },
  { id: "pc4", userId: "u6", name: "Arjun Kumar", avatar: "AK", role: "Frontend Developer", skills: ["JavaScript", "React", "MongoDB"], employabilityScore: 72, verified: true, aiRecommended: false, stage: "Shortlisted", location: "Hyderabad", experience: "0-1 years", lastActive: "4 hours ago" },
  { id: "pc5", userId: "u8", name: "Karthik Iyer", avatar: "KI", role: "Platform Engineer", skills: ["Go", "Rust", "System Design", "AWS"], employabilityScore: 88, verified: true, aiRecommended: true, stage: "Offer", location: "Pune", experience: "5+ years", lastActive: "30 min ago" },
  { id: "pc6", userId: "u2", name: "Rahul Patel", avatar: "RP", role: "Java Developer", skills: ["Java", "Spring Boot", "MySQL"], employabilityScore: 65, verified: false, aiRecommended: false, stage: "Applied", location: "Chennai", experience: "0-1 years", lastActive: "1 day ago" },
  { id: "pc7", userId: "u7", name: "Sneha Nair", avatar: "SN", role: "ML Engineer", skills: ["Python", "ML", "TensorFlow"], employabilityScore: 58, verified: false, aiRecommended: false, stage: "Rejected", location: "Bangalore", experience: "0-1 years", lastActive: "12 hours ago" },
]

export const analyticsAggregates = {
  departmentScores: [
    { department: "Computer Science", avgScore: 72, students: 145 },
    { department: "Information Technology", avgScore: 65, students: 98 },
    { department: "Electronics", avgScore: 48, students: 67 },
    { department: "Mechanical", avgScore: 35, students: 54 },
  ],
  topSkillGaps: [
    { skill: "System Design", gap: 78 },
    { skill: "DevOps", gap: 72 },
    { skill: "Data Structures", gap: 55 },
    { skill: "SQL", gap: 48 },
    { skill: "Communication", gap: 42 },
  ],
  verificationPassRates: [
    { skill: "React", passRate: 74 },
    { skill: "DSA", passRate: 62 },
    { skill: "SQL", passRate: 68 },
    { skill: "Backend", passRate: 55 },
    { skill: "System Design", passRate: 41 },
  ],
  placementTrend: [
    { month: "Sep", ready: 18, notReady: 82 },
    { month: "Oct", ready: 25, notReady: 75 },
    { month: "Nov", ready: 34, notReady: 66 },
    { month: "Dec", ready: 42, notReady: 58 },
    { month: "Jan", ready: 51, notReady: 49 },
    { month: "Feb", ready: 58, notReady: 42 },
  ],
}

export const roadmapSteps = [
  { id: "rs1", title: "Complete Middleware & Error Handling lesson", type: "Learning", done: false },
  { id: "rs2", title: "Solve 3 Medium DSA problems", type: "Practice", done: false },
  { id: "rs3", title: "Take SQL Intermediate verification", type: "Verification", done: false },
  { id: "rs4", title: "Finish DB Schema milestone in project", type: "Project", done: false },
  { id: "rs5", title: "Schedule a Mock Technical Interview", type: "Interview", done: false },
]

export const skillGaps = ["System Design", "DevOps", "Testing", "GraphQL"]
export const recommendedRoles = ["Full Stack Developer", "Backend Engineer", "API Developer"]

export const navItems = {
  student: [
    { group: "Learn", items: [
      { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { label: "Courses", href: "/courses", icon: "GraduationCap" },
      { label: "Learning", href: "/learning", icon: "BookOpen" },
      { label: "Practice", href: "/practice", icon: "Code" },
    ]},
    { group: "Verify", items: [
      { label: "Verification", href: "/verification", icon: "ShieldCheck" },
      { label: "Projects", href: "/projects", icon: "FolderGit2" },
      { label: "Interviews", href: "/interviews", icon: "Video" },
    ]},
    { group: "Profile", items: [
      { label: "Profile & Resume", href: "/profile", icon: "UserCircle" },
    ]},
  ],
  recruiter: [
    { group: "Recruit", items: [
      { label: "Talent Search", href: "/talent-search", icon: "Search" },
      { label: "Pipeline", href: "/pipeline", icon: "GitBranch" },
    ]},
    { group: "Manage", items: [
      { label: "HRMS Integration", href: "/hrms", icon: "Settings" },
    ]},
  ],
  admin: [
    { group: "Placement", items: [
      { label: "Analytics", href: "/analytics", icon: "BarChart3" },
      { label: "Students", href: "/students", icon: "Users" },
    ]},
  ],
}
