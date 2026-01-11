import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Cloud, Code, Database, DownloadCloud, ExternalLink, GitBranch, Github, Layers, Linkedin, Mail, MapPin, Phone, Server, Sparkles, Terminal, Workflow, Zap } from "lucide-react";
import React, { useEffect, useState, type JSX } from "react";
import Tilt from "react-parallax-tilt";


type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  imageAlt?: string;
};

const projectsSeed: Project[] = [
 {
    id: "p1",
    title: "business management",
    description: "Developed a dynamic business management web application using Spring Boot for backend services, Thymeleaf for server-side rendering, and MySQL for persistent data storage.",
    tags: ["Java", "Spring Boot"],
    live: "#",
  },
     {
    id: "p2",
    title: "Crop Prediction",
    description: "Developed and trained five Machine Learning models (Decision Tree, Logistic Regression, Neural Network, SVM, KNN) and com- bined them into an Ensemble model, achieving improved accuracy of 98.40% higher than idividual model accuracy Decision Tree – 98.18%, Logistic Regression – 94.54%, Neural Network – 97.04%, SVM – 97.95%, KNN – 96.81%.",
    tags: ["Python", "Scikit-learn", "Keras", "TensorFlow", "Flask", "Android Studio", "Java", "Pandas", "NumPy"],
    live: "#",
  },
 {
    id: "p3",
    title: "Backlog Report Web App",
    description: "Engineered an automated backlog reporting system using LLM-based natural-language summarization and Spring Boot for reading ticket status and then distributing structured reports via email using Thymeleaf — reducing manual reporting effort and enabling instant ticket status insights form AI summarization.",
    tags: ["Java", "Spring Boot", "Thymeleaf", "Maven", "Large Language Model"],
  },
];

// Advanced skills data with professional icons
const skillsData = {
  languages: [
    //  C++, C, Java, Python, SQL, Spark, PySpark, Scala.
    { name: "C++", icon: Code, level: 85, category: "Backend" },
    { name: "C", icon: Code, level: 80, category: "Backend" },
    { name: "Python", icon: Code, level: 88, category: "Backend" },
    { name: "Scala", icon: Code, level: 75, category: "Backend" },
    { name: "PySpark", icon: Code, level: 78, category: "Data" },
    { name: "Spark", icon: Code, level: 77, category: "Data" },
    { name: "Java", icon: Code, level: 95, category: "Backend" },
    { name: "SQL", icon: Database, level: 90, category: "Database" },
    { name: "OOP Concepts", icon: Workflow, level: 94, category: "Fundamentals" },
    { name: "Linux", icon: Terminal, level: 82, category: "Systems" }
  ],
  technologies: [
    //  Big-Data, Hadoop, Machine Learning, Spring boot, TensorFlow, Spark and Unix.
    { name: "Big Data", icon: Cloud, level: 78, category: "Data" },
    { name: "Hadoop", icon: Calendar, level: 75, category: "Data" },
    { name: "Machine Learning", icon: Cloud, level: 80, category: "AI" },
    { name: "TensorFlow", icon: Cloud, level: 70, category: "AI" },
    { name: "Apache Spark", icon: Cloud, level: 74, category: "Data" },
    { name: "Spring Boot", icon: Server, level: 92, category: "Backend" },
    { name: "REST API", icon: Zap, level: 90, category: "Architecture" },
    { name: "Hibernate", icon: Database, level: 85, category: "ORM" },
    { name: "Spring JDBC", icon: Database, level: 83, category: "Database" },
    { name: "Maven", icon: Workflow, level: 88, category: "Build Tools" },
    { name: "MVC Architecture", icon: Layers, level: 89, category: "Architecture" },
    { name: "JUnit", icon: Code, level: 86, category: "Testing" },
  ],
  tools: [
    { name: "Git", icon: GitBranch, level: 91, category: "Version Control" },
    { name: "MySQL", icon: Database, level: 89, category: "Database" },
    { name: "NoSQL", icon: Database, level: 72, category: "Database" },
    { name: "VS Code", icon: Code, level: 94, category: "IDE" },
  ]
};

export default function AdvancedPortfolio(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("all");

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => {
      setProjects(projectsSeed);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formsubmit.co/ajax/shubhampokhriyal3328@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New Portfolio Contact - " + formData.name,
          _captcha: "false"
        })
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });

        const mailtoLink = `mailto:shubhampokhriyal3328@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`;
        window.location.href = mailtoLink;
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitStatus("error");
      const mailtoLink = `mailto:shubhampokhriyal3328@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`;
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Get all unique categories for filtering
  const allCategories = Array.from(new Set([
    ...skillsData.languages.map(s => s.category),
    ...skillsData.technologies.map(s => s.category),
    ...skillsData.tools.map(s => s.category)
  ]));

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-slate-900 text-gray-900 dark:text-gray-100 transition-all duration-700 overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <header className="relative w-full px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center sm:text-left"
        >
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Shubham Pokhriyal
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Java Full-Stack Developer</p>
        </motion.div>
        <nav className="flex items-center">
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-g from-cyan-500 to-blue-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={16} className="sm:w-5 sm:h-5" /> Get In Touch
          </motion.a>
        </nav>
      </header>

      <main className="relative w-full px-4 sm:px-6 pb-16 sm:pb-20">
        {/* HERO SECTION */}
        <motion.section 
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[80vh] sm:min-h-[90vh] py-8 sm:py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="max-w-4xl order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 mb-4 sm:mb-6 text-xs sm:text-sm"
            >
              <Sparkles size={14} className="sm:w-4 sm:h-4" />
              <span className="font-medium">Available for new opportunities</span>
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, delay: 0.3 }}
            >
              Crafting{" "}
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital
              </span>{" "}
              Excellence
            </motion.h2>

            <motion.p
              className="mt-4 sm:mt-6 lg:mt-8 text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed"
              variants={itemVariants}
            >
              Specializing in <span className="font-semibold text-cyan-600 dark:text-cyan-400">Java</span>,{" "}
              <span className="font-semibold text-cyan-600 dark:text-cyan-400">Spring Boot</span>, and{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">Big Data</span>, and{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">Machine Learning</span>. 
              Building scalable solutions that drive business success.
            </motion.p>

            <motion.div 
              className="mt-6 sm:mt-8 lg:mt-12 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6"
              variants={itemVariants}
            >
              <motion.a
                href="#projects"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-g from-cyan-500 to-blue-600 text-white font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 text-center"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work
              </motion.a>

              <motion.a
                href="/Shubham_Pokhriyal_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                download="Shubham_Pokhriyal_Resume.pdf"
              >
                <DownloadCloud size={18} className="sm:w-5 sm:h-5" /> Download Resume
              </motion.a>
            </motion.div>

            <motion.div 
              className="mt-6 sm:mt-8 lg:mt-12 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 lg:gap-8 text-base sm:text-lg"
              variants={itemVariants}
            >
              <a href="tel:+917900974433" className="flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-gray-300 hover:text-cyan-600 transition-colors duration-300 text-sm sm:text-base">
                <Phone size={16} className="sm:w-5 sm:h-5" /> +91 7900974433
              </a>
              <a href="mailto:shubhampokhriyal3328@gmail.com" className="flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-gray-300 hover:text-cyan-600 transition-colors duration-300 text-sm sm:text-base">
                <Mail size={16} className="sm:w-5 sm:h-5" /> shubhampokhriyal3328@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/shubham-pokhriyal-6a8205203/" className="flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-gray-300 hover:text-cyan-600 transition-colors duration-300 text-sm sm:text-base">
                <Linkedin size={16} className="sm:w-5 sm:h-5" /> LinkedIn
              </a>
            </motion.div>

            <motion.div 
              className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl"
              variants={containerVariants}
            >
              <Stat label="Years Experience" value="1.5+" delay={0.4} color="from-cyan-500 to-blue-500" />
              <Stat label="Projects Completed" value="10+" delay={0.5} color="from-blue-500 to-purple-500" />
              <Stat label="Technologies" value="15+" delay={0.6} color="from-purple-500 to-pink-500" />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end w-full order-1 lg:order-2"
            variants={itemVariants}
          >
            <AnimatePresence>
              <motion.div
                className="w-full max-w-md lg:max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-white/20 to-cyan-100/20 dark:from-gray-800/20 dark:to-cyan-900/20 backdrop-blur-sm border border-white/30"
                initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
                whileHover={{ y: -10, rotate: 1 }}
              >
                <Tilt 
                  tiltMaxAngleX={12} 
                  tiltMaxAngleY={12} 
                  glareEnable={true} 
                  glareMaxOpacity={0.3}
                  glareColor="#ffffff"
                  glarePosition="all"
                  scale={1.05}
                  transitionSpeed={2000}
                >
                  <div className="p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10">
                    <div>
                      <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                        <Sparkles size={14} className="sm:w-5 sm:h-5" />
                        Summary
                      </div>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Software Engineer with 1.5+ years of experience in Java and Spring Boot, specializing in backend development and scalable web applications. Strong foundation in Data Structures and Algorithms with 1200+ problems solved across Codeforces, LeetCode, GeeksforGeeks, and CodeChef. Achieved 4-Star rating on CodeChef and Specialist rank on Codeforces (max rating 1466), with a Global Rank 975 in Google Kick Start. Experienced in building secure, role-based applications using Spring Security, RESTful APIs, and MySQL.
                      </p>
                    </div>
                    <div className="mt-6 sm:mt-8 flex items-center justify-between">
                      <div className="flex gap-3 sm:gap-4 items-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-lg">
                          <div className="text-lg sm:text-xl lg:text-2xl">⚡</div>
                        </div>
                        <div className="text-xs sm:text-sm">
                          <div className="font-semibold">Java • Spring Boot</div>
                          <div className="opacity-80">Machine Learning</div>
                        </div>
                      </div>
                      <motion.a
                      href="#"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-cyan-500 text-white shadow-lg"
                      >
                        <ExternalLink size={18} className="sm:w-6 sm:h-6" />
                      </motion.a>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          id="projects" 
          className="w-full mt-20 sm:mt-24 lg:mt-32"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Featured <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              Real-world applications showcasing technical expertise in full-stack development, 
              microservices architecture, and performance optimization
            </p>
          </motion.div>

          <motion.div 
            className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                isActive={activeProject === project.id}
                onHover={setActiveProject}
              />
            ))}
            
            {isLoading && (
              <>
                <ProjectSkeleton />
                <ProjectSkeleton />
                <ProjectSkeleton />
              </>
            )}
          </motion.div>
        </motion.section>

        {/* ADVANCED SKILLS SECTION */}
        <motion.section 
          className="w-full mt-20 sm:mt-24 lg:mt-32 xl:mt-40"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Technical <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
              Comprehensive skill set spanning full-stack development, cloud technologies, and modern software architecture
            </p>
          </motion.div>

          {/* Skills Filter */}
          <motion.div 
            className="flex justify-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center px-2">
              <motion.button
                onClick={() => setActiveSkillCategory("all")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-xs sm:text-sm ${
                  activeSkillCategory === "all" 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl" 
                    : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:shadow-xl"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All Skills
              </motion.button>
              {allCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveSkillCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-xs sm:text-sm ${
                    activeSkillCategory === category 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl" 
                      : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:shadow-xl"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Advanced Skills Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {Object.entries(skillsData).map(([category, skills]) => (
                  <SkillCategorySection
                    key={category}
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                    skills={skills.filter(skill => 
                      activeSkillCategory === "all" || skill.category === activeSkillCategory
                    )}
                    delay={0.2}
                  />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </motion.section>

        {/* EXPERIENCE SECTION */}
        <motion.section 
          className="w-full mt-20 sm:mt-24 lg:mt-32 xl:mt-40"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Professional <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
            </h3>
          </motion.div>

          <div className="w-full max-w-6xl mx-auto">
            <GlassCard className="p-6 sm:p-8 lg:p-12">
              <div className="space-y-6 sm:space-y-8">
                <TimelineItem 
                  year="July 2024 - Present" 
                  title="Specialist Programmer · Infosys" 
                  location="Bangalore, Karnataka"
                  description="Engineered an backlog reporting system using LLM-based natural-language summarization and Spring Boot for reading ticket status and distributing structured reports via email using Thymeleaf."
                  technologies={["Spring Boot", "Apache Kafka", "Microservices", "Apache Camel", "Multithreading"]}
                />
                <TimelineItem 
                  year="February 2024 – April 2024" 
                  title="Intern · Insignia" 
                  location="Bangalore, Karnataka"
                  description="Trained a custom NLP Spacy ROBERTA model for resume parsing for NER. If a user submits his resume model must be able to extract all relevant details from a CV."
                  technologies={["Python", "Hugging face", "Fine Tuning"]}
                />
                <TimelineItem 
                  year="February 2024 – April 2024" 
                  title="Bachelor's in Computer Science · Graphic Era Hill University" 
                  location="Dehradun, Uttarakhand"
                  description="Graduated with expertise in computer science fundamentals and software engineering principles."
                  technologies={["C++","Python","Java", "Algorithms", "Data Structures", "Software Engineering"]}
                />
              </div>
            </GlassCard>
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section 
          id="contact" 
          className="w-full mt-20 sm:mt-24 lg:mt-32 xl:mt-40"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Let's <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Connect</span>
            </h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing.
            </p>
          </motion.div>
          
          <motion.div 
            className="w-full max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-6 sm:p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    Start a Conversation
                  </h4>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                    Whether you have a project in mind, need technical consultation, or just want to connect, 
                    I'm always excited to hear about new opportunities and challenges.
                  </p>
                  
                  <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-cyan-50 dark:bg-cyan-900/20">
  <Mail className="text-cyan-600 sm:w-6 sm:h-6" size={20} />
  <div>
    <div className="font-semibold text-sm sm:text-base">Email</div>
    <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">shubhampokhriyal3328@gmail.com</div>
  </div>
</div>
<div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-900/20">
  <Phone className="text-blue-600 sm:w-6 sm:h-6" size={20} />
  <div>
    <div className="font-semibold text-sm sm:text-base">Phone</div>
    <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">+91 7900974433</div>
  </div>
</div>
<div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-purple-50 dark:bg-purple-900/20">
  <MapPin className="text-purple-600 sm:w-6 sm:h-6" size={20} />
  <div>
    <div className="font-semibold text-sm sm:text-base">Location</div>
    <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Available for remote & onsite opportunities</div>
  </div>
</div>       </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm sm:text-base"
                      >
                        ✅ Message sent successfully! I'll get back to you soon.
                      </motion.div>
                    )}
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm sm:text-base"
                      >
                        ❌ There was an error sending your message. Please try again or email me directly.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <input 
                      name="name" 
                      placeholder="Your full name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 transition-all text-sm sm:text-base"
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      name="email" 
                      placeholder="Your email address" 
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all text-sm sm:text-base"
                      required 
                    />
                  </div>
                  <div>
                    <textarea 
                      name="message" 
                      placeholder="Tell me about your project, opportunity, or just say hello..." 
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all text-sm sm:text-base resize-none"
                      required 
                    />
                  </div>

                  <motion.button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⏳
                        </motion.div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Mail size={18} className="inline mr-2 sm:mr-3 sm:w-5 sm:h-5" /> Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </GlassCard>
          </motion.div>
        </motion.section>

        <motion.footer 
          className="w-full mt-20 sm:mt-24 lg:mt-32 py-8 sm:py-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-sm border border-white/20">
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
              © Shubham Pokhriyal — Crafted using React, TypeScript & Framer Motion
            </p>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}

/* ----------------------
   Advanced Subcomponents
   ---------------------- */

function Stat({ label, value, delay = 0, color }: { label: string; value: string; delay?: number; color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="text-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500"
      whileHover={{ y: -8, scale: 1.05 }}
    >
      <div className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{value}</div>
      <div className="text-xs sm:text-sm opacity-80 mt-1 sm:mt-2 font-medium">{label}</div>
    </motion.div>
  );
}

function ProjectSkeleton() {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-gray-300 dark:border-gray-600 p-6 sm:p-8 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm h-80 sm:h-96 animate-pulse">
      <div className="h-6 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded-2xl mb-4 sm:mb-6"></div>
      <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded-2xl mb-2 sm:mb-3"></div>
      <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded-2xl mb-2 sm:mb-3"></div>
      <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-700 rounded-2xl mb-6 sm:mb-8"></div>
      <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="h-6 sm:h-8 w-16 sm:w-24 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
        <div className="h-6 sm:h-8 w-20 sm:w-28 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
      </div>
    </div>
  );
}

function GlassCard({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl sm:rounded-3xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 shadow-2xl p-6 sm:p-8 lg:p-10 ${className}`}>
      {title && (
        <h4 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}

function TimelineItem({ year, title, location, description, technologies }: { 
  year: string; 
  title: string; 
  location: string;
  description: string; 
  technologies: string[];
}) {
  return (
    <motion.div 
      className="flex gap-4 sm:gap-6 group"
      whileHover={{ x: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:scale-150 transition-transform duration-300 shadow-lg"
          whileHover={{ scale: 1.5 }}
        />
        <div className="w-1 h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 mt-2 rounded-full"></div>
      </div>
      
      <div className="flex-1 pb-6 sm:pb-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <Calendar size={14} className="sm:w-5 sm:h-5 text-cyan-600" />
          <span className="text-xs sm:text-base font-semibold text-cyan-600 dark:text-cyan-400">{year}</span>
        </div>
        <h5 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2 text-gray-800 dark:text-gray-200">{title}</h5>
        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
          <MapPin size={12} className="sm:w-4 sm:h-4 text-gray-500" />
          <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{location}</span>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {technologies.map((tech) => (
            <motion.span 
              key={tech}
              whileHover={{ scale: 1.05 }}
              className="text-xs px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 font-medium"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ADVANCED SKILL COMPONENTS
function SkillCategorySection({ title, skills, delay }: { 
  title: string; 
  skills: Array<{name: string, icon: any, level: number, category: string}>;
  delay: number;
}) {
  if (skills.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-white/60 to-white/40 dark:from-gray-800/60 dark:to-gray-800/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/30 shadow-2xl"
    >
      <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h4>
      <div className="space-y-3 sm:space-y-4">
        {skills.map((skill, index) => (
          <AdvancedSkillCard
            key={skill.name}
            skill={skill}
            delay={delay + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
}

function AdvancedSkillCard({ skill, delay }: { 
  skill: {name: string, icon: any, level: number, category: string};
  delay: number;
}) {
  const IconComponent = skill.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-3 sm:gap-4 flex-1">
          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg">
            <IconComponent size={16} className="sm:w-5 sm:h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base truncate">{skill.name}</h5>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{skill.category}</p>
          </div>
        </div>
        
        {/* Skill level indicator */}
        <div className="flex items-center gap-1 sm:gap-2 ml-2">
          <div className="w-12 sm:w-16 lg:w-20 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
            >
              <motion.div
                className="absolute inset-0 bg-white/40"
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                transition={{ duration: 1.5, delay: delay + 0.5, repeat: Infinity, repeatDelay: 2 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </div>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 w-6 sm:w-8 text-right">
            {skill.level}%
          </span>
        </div>
      </div>
      
      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        whileHover={{ scale: 1.02 }}
      />
    </motion.div>
  );
}

function ProjectCard({ project, index, isActive, onHover }: { 
  project: Project; 
  index: number;
  isActive: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-2xl sm:rounded-3xl border border-gray-300 dark:border-gray-600 p-6 sm:p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 h-full flex flex-col"
      >
        <Tilt 
          tiltMaxAngleX={8} 
          tiltMaxAngleY={8} 
          glareEnable={true} 
          glareMaxOpacity={0.2}
          scale={1.02}
          transitionSpeed={1500}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <h4 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-gray-200">{project.title}</h4>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex gap-2 sm:gap-3"
              >
                {project.github && (
                  <motion.a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors shadow-lg"
                  >
                    <Github size={16} className="sm:w-5 sm:h-5" />
                  </motion.a>
                )}
                {project.live && (
                  <motion.a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors shadow-lg"
                  >
                    <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                  </motion.a>
                )}
              </motion.div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 flex-grow leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              {project.tags.map((tag) => (
                <motion.span 
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 font-medium shadow-lg"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </Tilt>
      </motion.div>
    </motion.div>
  );
}
