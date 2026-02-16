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

export interface Problem {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  tags: string[]
  status: "Solved" | "Attempted" | "Unsolved"
  acceptance: number
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
]

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

export interface Project {
  id: string
  title: string
  description: string
  milestones: { id: string; title: string; status: "Complete" | "In Progress" | "Pending"; aiScore?: number; feedback?: string }[]
  published: boolean
  aiReviewScore?: number
}

export const projects: Project[] = [
  {
    id: "pr1",
    title: "E-commerce REST API",
    description: "A full-stack REST API with authentication, product CRUD, cart management, and Stripe payments.",
    milestones: [
      { id: "ms1", title: "Project Setup & Config", status: "Complete", aiScore: 95, feedback: "Excellent project structure with proper TypeScript configuration." },
      { id: "ms2", title: "API Design & Routes", status: "Complete", aiScore: 88, feedback: "Good REST conventions. Consider adding pagination to list endpoints." },
      { id: "ms3", title: "Authentication & Auth", status: "Complete", aiScore: 82, feedback: "JWT implementation is solid. Add refresh token rotation for production." },
      { id: "ms4", title: "Database Schema", status: "In Progress", aiScore: undefined, feedback: undefined },
      { id: "ms5", title: "Deployment", status: "Pending" },
    ],
    published: true,
    aiReviewScore: 88,
  },
  {
    id: "pr2",
    title: "Real-time Chat Application",
    description: "WebSocket-based chat app with rooms, typing indicators, and message persistence.",
    milestones: [
      { id: "ms6", title: "Project Setup", status: "Complete", aiScore: 90, feedback: "Clean setup with good dependency choices." },
      { id: "ms7", title: "WebSocket Server", status: "In Progress" },
      { id: "ms8", title: "Chat UI", status: "Pending" },
      { id: "ms9", title: "Message Persistence", status: "Pending" },
      { id: "ms10", title: "Deployment", status: "Pending" },
    ],
    published: false,
  },
]

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
