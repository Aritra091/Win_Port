import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  User,
  Code,
  Mail,
  Folder,
  X,
  Minus,
  Maximize2,
  Terminal,
  Github,
  Linkedin,
  Instagram,
  Battery,
  Wifi,
  Volume2,
  ExternalLink,
  Globe,
  Gamepad2,
  Trophy,
  RefreshCw,
  Search,
  LayoutGrid,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Award,
  Star,
  Activity,
  ChevronRight,
  ArrowLeft,
  Database,
  Monitor,
  Briefcase,      // ✅ ADD THIS
  Building2,      // ✅ ADD THIS
  MapPin
} from 'lucide-react';

// --- TERMINAL COMPONENT ---
const TerminalEmulator = () => {
  const [history, setHistory] = useState([
    { text: "Microsoft Windows [Version 10.0.19045.3208]", type: "system" },
    { text: "(c) Microsoft Corporation. All rights reserved.", type: "system" },
    { text: "", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { text: `C:\\Users\\Visitor> ${input}`, type: "user" }];

      switch (cmd) {
        case 'help':
          newHistory.push({ text: "Available commands: help, ls, clear, about, projects, date, exit", type: "system" });
          break;
        case 'ls':
          newHistory.push({ text: "Directory of C:\\Users\\Visitor", type: "system" });
          newHistory.push({ text: "02/28/2026  10:00 AM    <DIR>          Documents", type: "system" });
          newHistory.push({ text: "02/28/2026  10:00 AM    <DIR>          Projects", type: "system" });
          newHistory.push({ text: "02/28/2026  10:00 AM             1,024 resume.pdf", type: "system" });
          break;
        case 'clear':
          setHistory([]);
          setInput("");
          return;
        case 'about':
          newHistory.push({ text: "Full Stack Engineer specializing in React and Machine Learning.", type: "system" });
          break;
        case 'projects':
          newHistory.push({ text: "1. CloudOS - A browser-based OS", type: "system" });
          newHistory.push({ text: "2. Snake - Retro gaming module", type: "system" });
          break;
        case 'date':
          newHistory.push({ text: new Date().toString(), type: "system" });
          break;
        case '':
          break;
        default:
          newHistory.push({ text: `'${cmd}' is not recognized as an internal or external command, operable program or batch file.`, type: "system" });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  return (
    <div
      ref={scrollRef}
      className="bg-[#0c0c0c] text-[#cccccc] p-2 font-mono h-full overflow-y-auto text-sm selection:bg-gray-700 selection:text-white"
      onClick={() => document.getElementById('term-input').focus()}
    >
      {history.map((line, i) => (
        <div key={i} className={`mb-1 whitespace-pre-wrap ${line.type === 'user' ? 'text-white' : ''}`}>
          {line.text}
        </div>
      ))}
      <div className="flex">
        <span className="shrink-0 text-white">C:\Users\Visitor&gt;&nbsp;</span>
        <input
          id="term-input"
          autoFocus
          className="bg-transparent border-none outline-none text-white w-full p-0 font-mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

// --- SNAKE GAME COMPONENT ---
const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gridSize = 20;

  const moveSnake = useCallback(() => {
    if (gameOver) return;
    const newSnake = [...snake];
    const head = { x: newSnake[0].x + dir.x, y: newSnake[0].y + dir.y };

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      setGameOver(true);
      return;
    }

    if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore(s => s + 10);
      setFood({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      });
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
  }, [snake, dir, food, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp': if (dir.y === 0) setDir({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (dir.y === 0) setDir({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (dir.x === 0) setDir({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (dir.x === 0) setDir({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    const interval = setInterval(moveSnake, 150);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(interval);
    };
  }, [moveSnake, dir]);

  const reset = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDir({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-900 p-4 text-white font-mono">
      <div className="mb-4 flex justify-between w-full max-w-[300px]">
        <span className="flex items-center gap-2 font-sans"><Trophy size={16} /> {score}</span>
        <button onClick={reset} className="hover:text-blue-400 flex items-center gap-1 font-sans">
          <RefreshCw size={16} /> Reset
        </button>
      </div>
      <div className="relative bg-slate-800 border-2 border-slate-700 shadow-2xl" style={{ width: '300px', height: '300px' }}>
        {snake.map((s, i) => (
          <div key={i} className="absolute bg-emerald-500 rounded-sm" style={{ width: '14px', height: '14px', left: s.x * 15, top: s.y * 15 }} />
        ))}
        <div className="absolute bg-red-500 rounded-full" style={{ width: '14px', height: '14px', left: food.x * 15, top: food.y * 15 }} />
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
            <h3 className="text-xl font-bold text-red-500 mb-2 font-sans">GAME OVER</h3>
            <button onClick={reset} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-sans">Retry</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isBooting, setIsBooting] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const bootTimer = setTimeout(() => setIsBooting(false), 4000);
    return () => {
      clearInterval(timer);
      clearTimeout(bootTimer);
    };
  }, []);

  const projectsData = [
    {
      id: 'p1',
      title: 'Symphonia',
      desc: 'A full-stack music streaming web app.',
      longDesc: 'A full-stack music streaming web app built with Django. Symphonia delivers a seamless user experience with a robust backend, featuring a dynamically updated trending songs section, a "Listen Later" option, a smooth built-in audio player, and an offline download feature for uninterrupted music enjoyment.',
      tech: ['HTML', 'CSS(Bootstrap)', 'JavaScript', 'Django(Python)', 'SQLite', 'Git'],
      link: 'https://example.com/portfolio-os',
      image: 'src/assets/Symphonia.png'
    },
    {
      id: 'p2',
      title: 'E-Commerce Core',
      desc: 'A robust headless commerce engine with real-time inventory management.',
      longDesc: 'Built to handle high-traffic sales events. Uses a microservices architecture to separate cart logic from user authentication and payment processing.',
      tech: ['Node.js', 'PostgreSQL', 'Redis'],
      link: 'https://example.com/ecommerce',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'p3',
      title: 'Task Manager',
      desc: 'Collaborative productivity tool with real-time sync and data persistence.',
      longDesc: 'A Trello-inspired project management board focusing on drag-and-drop interactions and optimistic UI updates for a seamless user experience.',
      tech: ['React', 'Firebase', 'Framer Motion'],
      link: 'https://example.com/tasks',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const experienceData = [
    {
      id: 'exp1',
      role: 'AI/ML Lead',
      company: 'Google Developer Groups – GNIT',
      period: 'Nov, 2025 – Present',
      line_period: '2025 – Present',
      location: 'Kolkata',
      color: 'bg-blue-600',
      description: [
        'Led the AI & Machine Learning domain at GDG GNIT, mentoring 50+ peers and driving hands-on technical workshops.',
        'Organized and executed AI/ML workshops and sessions, increasing community engagement and practical adoption.'
      ],
      tags: ['Numpy', 'Pandas', 'Scikit-learn', 'NLP', 'TensorFlow']
    },
    {
      id: 'exp2',
      role: 'AI-ML Virtual Internship',
      company: 'AICTE – EduSkills',
      period: 'July – Sep, 2025',
      line_period: '2025',
      location: 'Remote',
      color: 'bg-purple-600',
      description: [
        'Developed and trained deep learning models using TensorFlow and Keras for real-world predictive tasks.',
        'Performed data preprocessing, feature engineering, and model optimization using NumPy, Pandas, and Scikit-learn.',
      ],
      tags: ['Numpy', 'Pandas', 'Scikit-learn', 'NLP', 'TensorFlow']
    },
    {
      id: 'exp3',
      role: 'Tata Imagination Challenge Semi-Finalist',
      company: 'Unstop – TATA',
      period: '2024',
      line_period: '2024',
      location: 'Global',
      color: 'bg-emerald-600',
      description: [
        'Secured a spot in the National Semi-Finals of Tata Imagination Challenge 2024.',
      ],
      tags: ['Ideathon']
    }
  ];

  const apps = [
  { id: 'about', title: 'Developer Properties', icon: <User size={24} className="text-blue-500" /> },
  { id: 'projects', title: 'Projects', icon: <Folder size={24} className="text-yellow-500" /> },
  { id: 'experience', title: 'Career Log', icon: <Briefcase size={24} className="text-orange-500" /> },
  { id: 'skills', title: 'System Performance', icon: <Cpu size={24} className="text-emerald-500" /> },
  { id: 'terminal', title: 'Command Prompt', icon: <Terminal size={24} className="text-white" />, color: 'bg-black' },
  { id: 'games', title: 'Snake Game', icon: <Gamepad2 size={24} className="text-purple-500" /> },
  { id: 'contact', title: 'Contact Hub', icon: <User size={24} className="text-orange-400" /> },
];

  const toggleWindow = (appId) => {
    if (openWindows.includes(appId)) {
      setActiveWindow(appId);
    } else {
      setOpenWindows([...openWindows, appId]);
      setActiveWindow(appId);
    }
    setIsStartOpen(false);
  };

  const closeWindow = (appId) => {
    setOpenWindows(openWindows.filter(id => id !== appId));
    if (activeWindow === appId) setActiveWindow(null);
  };

  const renderContent = (id) => {
    switch (id) {
      case 'terminal': return <TerminalEmulator />;
      case 'games': return <SnakeGame />;
      case 'about': return (
        <div className="h-full bg-slate-50 flex flex-col overflow-hidden animate-in fade-in duration-500">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent scale-150"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div className="px-8 -mt-12 relative z-10 pb-8 flex-1 overflow-y-auto">
            {/* Profile Row */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-white rounded-2xl shadow-xl group-hover:scale-105 transition-transform"></div>
                <img
                  src="src/assets/Aritra2.jpeg"
                  alt="Avatar"
                  className="w-32 h-32 rounded-2xl border-4 border-white relative z-10"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white z-20" title="System Online">
                  <ShieldCheck size={20} />
                </div>
              </div>

              <div className="flex-1 pb-1">
                <h2 className="text-4xl font-bold text-slate-800 tracking-tight">Aritra Chattopadhyay</h2>
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Code size={14} /> Lead Software Architect
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Award size={14} /> Full Stack Certified
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all font-semibold flex items-center gap-2 active:scale-95">
                  Hire Me <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Bio & Core Mission */}
              <div className="lg:col-span-2 space-y-6">
                <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-blue-500" /> Developer Description
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    A passionate <span className="text-blue-600 font-semibold italic">Architect of Digital Environments</span>, I specialize in constructing scalable web ecosystems. My design philosophy balances <span className="font-bold text-slate-800">mathematical precision</span> with <span className="font-bold text-slate-800">visual artistry</span>.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-2xl font-bold text-slate-800">5+</p>
                      <p className="text-xs font-medium text-slate-500 uppercase">Years Uptime</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-2xl font-bold text-slate-800">124</p>
                      <p className="text-xs font-medium text-slate-500 uppercase">Commits / Month</p>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                    <Monitor className="text-blue-500 mb-3" />
                    <h4 className="font-bold text-slate-800">Frontend Engine</h4>
                    <p className="text-sm text-slate-500 leading-snug mt-1">Specializing in high-performance React architectures and atomic design systems.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
                    <Database className="text-indigo-500 mb-3" />
                    <h4 className="font-bold text-slate-800">Backend Logic</h4>
                    <p className="text-sm text-slate-500 leading-snug mt-1">Expertise in Node.js microservices, Postgres optimization, and GraphQL schemas.</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Spec Sheet */}
              <div className="space-y-6">
                <section className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/30 transition-colors"></div>
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap size={16} /> Current Process
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 text-slate-300">
                        <span>Generative AI Integration</span>
                        <span>85%</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[85%] rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 text-slate-300">
                        <span>Edge Computing</span>
                        <span>60%</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[60%] rounded-full"></div>
                      </div>
                    </div>
                    <div className="pt-4 flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                            {['R', 'N', 'T'][i - 1]}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Stack: React, Node, TS</span>
                    </div>
                  </div>
                </section>

                <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Virtues</h3>
                  <ul className="space-y-3">
                    {['Clean Code Evangelist', 'Test-Driven Developer', 'Cloud Native Thinking', 'User-Centric Design'].map(v => (
                      <li key={v} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {v}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      );
      case 'projects': return (
        <div className="h-full relative overflow-hidden flex flex-col">
          {selectedProject ? (
            <div className="flex-1 bg-white animate-in slide-in-from-right-10 duration-300 overflow-y-auto">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 text-blue-600 text-sm hover:underline font-medium"
                >
                  <ArrowLeft size={16} /> Back to Projects
                </button>
              </div>
              <div className="p-6 max-w-2xl mx-auto">
                <img
                  src={selectedProject.image}
                  className="w-full h-48 object-cover rounded-xl shadow-lg mb-6"
                  alt={selectedProject.title}
                />
                <h2 className="text-3xl font-bold text-slate-800 mb-2">{selectedProject.title}</h2>
                <div className="flex gap-2 mb-6">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {selectedProject.longDesc}
                </p>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-200 font-bold"
                >
                  Visit Project Website <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300 overflow-y-auto">
              {projectsData.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="p-5 border border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg cursor-pointer transition-all rounded-xl group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={16} className="text-blue-500" />
                  </div>
                  <Folder className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-slate-800 text-lg mb-1">{p.title}</h3>
                  <p className="text-xs text-gray-500 leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
      case 'experience': return (
        <div className="h-full bg-slate-50 overflow-y-auto animate-in fade-in duration-300">
          <div className="p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10 border-b border-slate-200 pb-6">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                <Briefcase size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-800">My Experience</h2>
                <p className="text-slate-500">A timeline of my journey and achievements.</p>
              </div>
            </div>

            <div className="relative space-y-12">
              {/* Vertical line for the timeline */}
              <div className="absolute left-8 top-2 bottom-2 w-0.5 bg-slate-200 hidden md:block"></div>

              {experienceData.map((exp, idx) => (
                <div key={exp.id} className="relative flex flex-col md:flex-row gap-8">
                  {/* Timeline dot */}
                  <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 hidden md:block" style={{ backgroundColor: idx === 0 ? '#3b82f6' : '#cbd5e1', top: '24px' }}></div>
                  
                  <div className="hidden md:block w-32 shrink-0 pt-6 text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{exp.line_period}</span>
                  </div>

                  <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{exp.role}</h3>
                        <div className="flex items-center gap-3 text-slate-500 mt-1">
                          <span className="flex items-center gap-1.5 text-sm font-medium">
                            <Building2 size={14} className="text-slate-400" /> {exp.company}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1.5 text-sm">
                            <MapPin size={14} className="text-slate-400" /> {exp.location}
                          </span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider self-start ${exp.color}`}>
                        {exp.period}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {exp.description.map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                      {exp.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wide border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      case 'skills': return (
        <div className="p-6 bg-gray-50 h-full overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Layers size={20} className="text-emerald-600" /> Technical Ecosystem
            </h3>
            <p className="text-xs text-gray-500">Resource allocation across modern frameworks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'React Architecture', level: '95%', color: 'bg-blue-500', desc: 'Hooks, Context, Performance Optimization', icon: <Zap size={16} /> },
              { name: 'Node.js Runtime', level: '88%', color: 'bg-emerald-500', desc: 'Express, Microservices, REST APIs', icon: <Cpu size={16} /> },
              { name: 'Cloud Security', level: '82%', color: 'bg-purple-500', desc: 'Azure AD, JWT, OAuth 2.0', icon: <ShieldCheck size={16} /> },
              { name: 'TypeScript Core', level: '90%', color: 'bg-sky-600', desc: 'Type Safety, Generics, OOP', icon: <Code size={16} /> }
            ].map((skill, idx) => (
              <div key={idx} className="bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow group rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-gray-100 rounded group-hover:bg-blue-50 transition-colors">
                    {React.cloneElement(skill.icon, { className: skill.color.replace('bg-', 'text-') })}
                  </div>
                  <span className="text-xl font-bold text-gray-300">{skill.level}</span>
                </div>
                <h4 className="font-bold text-gray-800 text-sm">{skill.name}</h4>
                <p className="text-[10px] text-gray-400 mb-3 uppercase tracking-wider">{skill.desc}</p>
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${skill.color}`} style={{ width: skill.level }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      case 'contact': return (
        <div className="h-full flex flex-col md:flex-row bg-[#f2f2f2]">
          <div className="w-full md:w-64 bg-white border-r border-gray-200 p-4">
            <h2 className="text-2xl font-light mb-6">People</h2>
            <div className="space-y-1">
              {['Social Media', 'Work Email', 'Personal'].map((cat, i) => (
                <div key={i} className={`px-3 py-2 text-sm cursor-default rounded hover:bg-gray-100 ${i === 0 ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600'}`}>
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg">AC</div>
                <h3 className="text-2xl font-semibold text-gray-800">Aritra Chattopadhyay</h3>
                <p className="text-gray-500">Available for collaborations</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <a href="google.com" className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-all group">
                  <div className="p-3 bg-pink-100 text-pink-600 rounded-full mr-4 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Instagram</p>
                    <p className="text-xs text-gray-500">@its_da_hooman</p>
                  </div>
                </a>

                <a href="https://github.com/Aritra091" className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all group">
                  <div className="p-3 bg-gray-100 text-black rounded-full mr-4 group-hover:bg-black group-hover:text-white transition-colors">
                    <Github size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">GitHub</p>
                    <p className="text-xs text-gray-500">Aritra091</p>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/aritra-chattopadhyay-5198492a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-700 hover:bg-blue-50 transition-all group">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-full mr-4 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">LinkedIn</p>
                    <p className="text-xs text-gray-500">Aritra Chattopadhyay</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
      default: return null;
    }
  };

  if (isBooting) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
        <style>{`
          .win-loader-container {
            width: 50px;
            height: 50px;
            position: relative;
          }
          .win-dot {
            position: absolute;
            width: 5px;
            height: 5px;
            background: white;
            border-radius: 50%;
            opacity: 0;
            transform-origin: 25px 25px;
            animation: win-orbit 4s infinite;
          }
          @keyframes win-orbit {
            0% { transform: rotate(225deg); opacity: 1; animation-timing-function: ease-out; }
            7% { transform: rotate(345deg); animation-timing-function: linear; }
            30% { transform: rotate(455deg); animation-timing-function: ease-in-out; }
            39% { transform: rotate(570deg); animation-timing-function: linear; }
            70% { transform: rotate(815deg); opacity: 1; animation-timing-function: ease-out; }
            75% { transform: rotate(945deg); animation-timing-function: ease-out; }
            76% { transform: rotate(945deg); opacity: 0; }
            100% { transform: rotate(945deg); opacity: 0; }
          }
          .dot1 { animation-delay: 0.16s; }
          .dot2 { animation-delay: 0.32s; }
          .dot3 { animation-delay: 0.48s; }
          .dot4 { animation-delay: 0.64s; }
          .dot5 { animation-delay: 0.8s; }
        `}</style>
        <div className="win-loader-container">
          <div className="win-dot dot0"></div>
          <div className="win-dot dot1"></div>
          <div className="win-dot dot2"></div>
          <div className="win-dot dot3"></div>
          <div className="win-dot dot4"></div>
          <div className="win-dot dot5"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen bg-[#0078d7] bg-cover bg-center overflow-hidden flex flex-col select-none relative font-sans"
      style={{ backgroundImage: `url('src/assets/wallpaper.jpg')` }}
    >
      {/* Desktop Icons */}
      <div className="flex-1 p-2 grid grid-flow-col grid-rows-6 gap-2 justify-start w-fit">
        {apps.map((app) => (
          <div
            key={app.id}
            onDoubleClick={() => toggleWindow(app.id)}
            className="flex flex-col items-center p-2 w-20 h-24 hover:bg-white/10 border border-transparent hover:border-white/20 group cursor-default"
          >
            <div className="mb-1 drop-shadow-lg group-active:scale-95 transition-transform">{app.icon}</div>
            <span className="text-[11px] text-white text-center drop-shadow-md leading-tight font-medium">{app.title}</span>
          </div>
        ))}
      </div>

      {/* Windows Layer */}
      {openWindows.map((appId) => {
        const app = apps.find(a => a.id === appId);
        const isActive = activeWindow === appId;
        return (
          <div
            key={appId}
            onClick={() => setActiveWindow(appId)}
            className={`absolute top-10 left-10 md:left-40 md:top-20 w-[90%] md:w-[850px] h-[550px] bg-white shadow-2xl flex flex-col border border-gray-400 transform transition-all duration-150 ${isActive ? 'z-50' : 'z-40'}`}
          >
            {/* Win 10 Title Bar */}
            <div className={`h-8 flex items-center justify-between px-2 shrink-0 ${isActive ? 'bg-white' : 'bg-gray-100'}`}>
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="shrink-0">{React.cloneElement(app.icon, { size: 14 })}</span>
                <span className="text-xs text-gray-600 truncate">{app.title}</span>
              </div>
              <div className="flex items-center h-full">
                <button className="w-10 h-full flex items-center justify-center hover:bg-gray-200 transition-colors"><Minus size={14} /></button>
                <button className="w-10 h-full flex items-center justify-center hover:bg-gray-200 transition-colors"><Maximize2 size={12} /></button>
                <button
                  onClick={(e) => { e.stopPropagation(); closeWindow(appId); }}
                  className="w-12 h-full flex items-center justify-center hover:bg-[#e81123] hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-white">
              {renderContent(appId)}
            </div>
          </div>
        );
      })}

      {/* Windows 10 Taskbar */}
      <div className="h-10 bg-[#1c1c1c] flex items-center justify-between z-[9999] shrink-0">
        <div className="flex items-center h-full">
          {/* Start Button */}
          <button
            onClick={() => setIsStartOpen(!isStartOpen)}
            className={`w-12 h-full flex items-center justify-center transition-colors ${isStartOpen ? 'bg-white/10' : 'hover:bg-white/10'}`}
          >
            <LayoutGrid size={20} className="text-[#0078d7]" fill="currentColor" />
          </button>

          {/* Search Box */}
          <div className="hidden md:flex items-center bg-white/10 h-full px-3 w-64 group">
            <Search size={16} className="text-white/70 mr-3" />
            <input className="bg-transparent border-none outline-none text-white text-xs w-full placeholder-white/70" placeholder="Type here to search" />
          </div>

          <div className="w-px h-6 bg-white/10 mx-1 hidden md:block"></div>

          {/* Running Apps */}
          <div className="flex items-center h-full">
            {apps.map((app) => (
              openWindows.includes(app.id) && (
                <button
                  key={app.id}
                  onClick={() => toggleWindow(app.id)}
                  className={`px-3 h-full flex items-center gap-2 border-b-2 transition-all ${activeWindow === app.id ? 'bg-white/20 border-[#0078d7]' : 'hover:bg-white/10 border-transparent'}`}
                >
                  {React.cloneElement(app.icon, { size: 18 })}
                </button>
              )
            ))}
          </div>
        </div>

        {/* System Tray */}
        <div className="flex items-center h-full text-white px-2 gap-3">
          <div className="hidden sm:flex items-center gap-2 text-white/80">
            <Wifi size={14} />
            <Volume2 size={14} />
          </div>
          <div className="flex flex-col items-center justify-center px-2 hover:bg-white/10 h-full cursor-default">
            <span className="text-[11px] font-light leading-none mb-1">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="text-[11px] font-light leading-none">{currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <button
            className="w-1.5 h-full border-l border-white/20 hover:bg-white/10"
            onClick={() => { setActiveWindow(null); }}
          ></button>
        </div>
      </div>

      {/* Start Menu (Win 10 Style) */}
      {isStartOpen && (
        <div className="absolute bottom-10 left-0 w-80 h-[500px] bg-[#1c1c1c]/95 backdrop-blur-md z-[1000] border-t border-r border-white/10 flex animate-in slide-in-from-bottom-2 duration-200">
          <div className="w-12 h-full flex flex-col items-center justify-end pb-4 gap-6 text-white/70">
            <User size={18} className="hover:text-white cursor-pointer" />
            <Folder size={18} className="hover:text-white cursor-pointer" />
            <RefreshCw size={18} className="hover:text-white cursor-pointer" onClick={() => window.location.reload()} />
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-[10px] text-white/50 mb-4 font-bold uppercase tracking-wider">Recently Added</p>
            {apps.map(app => (
              <button
                key={app.id}
                onClick={() => toggleWindow(app.id)}
                className="flex items-center w-full px-2 py-3 hover:bg-white/10 rounded transition-colors text-white"
              >
                <span className="mr-3">{React.cloneElement(app.icon, { size: 18 })}</span>
                <span className="text-sm font-light">{app.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;