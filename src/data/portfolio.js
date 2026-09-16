export const profile = {
  name: 'Leiya Sree M',
  role: 'Computer Science Engineering Graduate',
  headline: 'Full Stack Developer | Python Developer | AI Enthusiast',
  typingRoles: [
    'Full Stack Developer',
    'Python Developer',
    'AI Enthusiast',
    
  ],
  location: 'Kanyakumari, Tamil Nadu',
  email: 'leiyasree2005@gmail.com',
  phone: '+91 96007 52209',
  linkedin: 'https://www.linkedin.com/in/leiya-sree',
  github: 'https://github.com/leiya-sree',
  instagram: 'https://instagram.com/leiya_a_',
  about:
    "Computer Science Engineering graduate with a strong foundation in Python, FastAPI, SQL, React, REST APIs, and AI application development. Passionate about building scalable web applications and AI-powered solutions. Seeking opportunities to contribute, learn, and grow as a Full Stack Developer while solving real-world problems through technology.",
  objective:
    "To secure a Full Stack Developer role where I can leverage my expertise in React, FastAPI, and AI to build scalable, impact-driven products — while continuously learning and growing as an engineer.",
 resumeUrl: '/Leiyasreem_resume.pdf',
};

export const stats = [
  { label: '2026 Graduate', value: '2026', suffix: '' },
  { label: 'Internships', value: '2', suffix: '' },
  { label: 'Major Projects', value: '2', suffix: '' },
  { label: 'Technologies', value: '10', suffix: '+' },
];

export const skillGroups = [
  {
    category: 'Frontend',
    icon: 'layout',
    skills: [
      { name: 'React.js', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css3' },
    ],
  },
  {
    category: 'Backend',
    icon: 'server',
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'REST APIs', icon: 'api' },
    ],
  },
  {
    category: 'Database',
    icon: 'database',
    skills: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
  },
  {
    category: 'Libraries',
    icon: 'library',
    skills: [
      { name: 'NumPy', icon: 'numpy' },
      { name: 'Pandas', icon: 'pandas' },
    ],
  },
  {
    category: 'Tools',
    icon: 'wrench',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Power BI', icon: 'powerbi' },
      { name: 'Excel', icon: 'excel' },
      { name: 'Google Colab', icon: 'colab' },
      { name: 'Roboflow', icon: 'roboflow' },
    ],
  },
];

export const experiences = [
  {
   
  company: "ENTUITE TECHNOLOGIES PVT LTD",
  role: "Web Development Intern",
  period: "Academic Internship",
  points: [
  "Developed a Student Registration System using HTML5, CSS3, JavaScript (ES6), Python, FastAPI, and SQL.",
  "Designed responsive registration forms with a user-friendly interface and client-side validation.",
  "Integrated frontend forms with FastAPI backend APIs for secure data processing.",
  "Worked with SQL databases to store, retrieve, and manage student registration records.",
  "Tested and debugged the application to ensure accurate data validation and smooth functionality."
],
  
    tags: [
  "HTML5",
  "CSS3",
  "JavaScript (ES6)",
  "Python",
  "FastAPI",
  "SQL"
]
}
  ,
  {
    company: 'NOVITECH R&D PVT LTD',
    role: 'Data Analytics Intern',
    period: 'Internship',
    points: [
      'Worked with SQL, Python, and Excel for data processing.',
      'Built interactive dashboards in Power BI.',
      'Analyzed business datasets to surface actionable insights.',
    ],
    tags: ['SQL', 'Python', 'Power BI', 'Excel'],
  },
];

export const projects = [
  {
    id: 'road-quality-monitoring',
    title: 'AI-Based Road Quality Monitoring System',
    description:
      'Developed an AI-powered road quality monitoring platform using the YOLOv8 object detection model to identify potholes and road defects from uploaded images. Integrated GPS-based location tracking and built a dashboard for visualization and reporting.',
    tech: ['React', 'Tailwind CSS', 'Python', 'FastAPI', 'MySQL', 'YOLOv8'],
    features: [
      'Image Upload',
      'Object Detection',
      'Confidence Score',
      'Dashboard',
      'GPS Mapping',
      'Detection Reports',
    ],
    github: null,
    demo: null,
    featured: true,
    category: 'AI',
    image: '/road-quality.jpg.png',
  },
  {
    id: 'college-placement-portal',
    title: 'AI-Powered College Placement Portal',
    description:
      'AI-driven placement portal with resume screening, job-role matching, resume feedback and personalized upskilling recommendations.',
    tech: ['React', 'FastAPI', 'MongoDB', 'REST API'],
    features: [
      'Resume Screening',
      'Job-Role Matching',
      'Resume Feedback',
      'Upskilling Recommendations',
    ],
    github: null,
    demo: null,
    featured: false,
    category: 'Web',
    image:
      'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export const education = [
  {
    degree: 'Bachelor of Engineering',
    field: 'Computer Science Engineering',
    institution: "St. Xavier's Catholic College of Engineering",
    board: 'Anna University',
    period: '2022 – 2026',
    score: 'CGPA 7.9',
  },
  {
    degree: 'Higher Secondary',
    field: 'HSC',
    institution: 'Sree Ramakrishna Matriculation Higher Secondary School, Paraicode',
    board: 'Tamil Nadu State Board',
    period: '2021 – 2022',
    score: '81.5%',
  },
];

export const certifications = [
  {
    title: 'Microsoft Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    icon: 'badge',
  },
  { title: 'Hackathon Participant', issuer: 'Multiple Events', icon: 'trophy' },
  { title: 'Technical Paper Presentation', issuer: 'Symposiums', icon: 'file' },
  { title: 'IET Member', issuer: 'Institution of Engineering and Technology', icon: 'network' },
  { title: 'YRC Volunteer', issuer: 'Youth Red Cross', icon: 'heart' },
];

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];
