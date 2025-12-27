export type Language = "en" | "am"

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    },
    // Hero Section
    hero: {
      name: "Serkalem",
      title: "Software Engineer | Full-Stack Developer",
      subtitle: "Building elegant solutions with clean code",
      cta_projects: "View Projects",
      cta_contact: "Contact Me",
    },
    // About Section
    about: {
      title: "About Me",
      description: "I'm a passionate software engineer with expertise in full-stack development.",
    },
    // Projects Section
    projects: {
      title: "Projects Built by Me",
      role: "Designed & Developed by Me",
      view_project: "View Project",
      github: "GitHub",
      demo: "Live Demo",
      technologies: "Technologies",
    },
    // Skills Section
    skills: {
      title: "Skills",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      tools: "Tools",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
    // Experience Section
    experience: {
      title: "Experience & Achievements",
      work_experience: "Work Experience",
      education: "Education",
      certifications: "Certifications",
      competitions: "Competitions",
    },
    // Contact Section
    contact: {
      title: "Get In Touch",
      description: "Let's discuss your project or just say hello",
      email: "Email",
      send: "Send Message",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
    },
    // Admin
    admin: {
      dashboard: "Admin Dashboard",
      login: "Admin Login",
      logout: "Logout",
      about_me: "About Me",
      manage_projects: "Projects",
      manage_skills: "Skills",
      manage_experience: "Experience",
      add_new: "Add New",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      title: "Title",
      description: "Description",
      link: "Link",
      image: "Image",
      email_required: "Email required",
      password_required: "Password required",
      invalid_credentials: "Invalid email or password",
      unauthorized: "Unauthorized access",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      back: "Back",
      close: "Close",
    },
  },
  am: {
    // ናቭጌሽን
    nav: {
      home: "ዋና页面",
      about: "ስለእኔ",
      projects: "ፕሮጀክቶች",
      skills: "ክህሎቶች",
      experience: "ተሞክሮ",
      contact: "ያግኙን",
    },
    // ሂሮ ክፍል
    hero: {
      name: "ሰርካሌም",
      title: "ሶፍትዌር ምህንድስ | Full-Stack ገንቢ",
      subtitle: "ንጹህ ኮድ ያለ ውብ መፍትሔዎች መገንባት",
      cta_projects: "ፕሮጀክቶች ይመልከቱ",
      cta_contact: "ለእኔ ያግኙ",
    },
    // ስለእኔ ክፍል
    about: {
      title: "ስለእኔ",
      description: "እኔ በሙሉ-ስታክ ልማት ውስጥ ብቃት ያለው አይነት የሶፍትዌር ምህንድስ ነኝ።",
    },
    // ፕሮጀክቶች ክፍል
    projects: {
      title: "በእኔ የተገነቡ ፕሮጀክቶች",
      role: "በእኔ ተጠምዘው ተገንብቷል",
      view_project: "ፕሮጀክት ይመልከቱ",
      github: "GitHub",
      demo: "ቀጥታ ሙከራ",
      technologies: "ቴክኖሎጂዎች",
    },
    // ክህሎቶች ክፍል
    skills: {
      title: "ክህሎቶች",
      frontend: "ፊት-መጨረሻ",
      backend: "ኋላ-መጨረሻ",
      database: "ዳታቤስ",
      tools: "መሳሪያዎች",
      beginner: "አታሪ",
      intermediate: "መካከለኛ",
      advanced: "አንደበት",
    },
    // ተሞክሮ ክፍል
    experience: {
      title: "ተሞክሮ እና ስኬቶች",
      work_experience: "የስራ ተሞክሮ",
      education: "ትምህርት",
      certifications: "ሰነዶች",
      competitions: "ውድድሮች",
    },
    // ያግኙ ክፍል
    contact: {
      title: "ዩን ያግኙ",
      description: "ስለ ፕሮጀክትዎ ወይም በቀላሉ ሰላም ይናገሩ",
      email: "ኢሜይል",
      send: "መልእክት ላክ",
      success: "መልእክት በተሳካ ሁኔታ ተልኩ!",
      error: "መልእክት ስህተት ሆነ። እንደገና ሞክር።",
    },
    // አስተዳደር
    admin: {
      dashboard: "አስተዳደር ড್ashing board",
      login: "የአስተዳደር መግቢያ",
      logout: "ውጪ",
      about_me: "ስለእኔ",
      manage_projects: "ፕሮጀክቶች",
      manage_skills: "ክህሎቶች",
      manage_experience: "ተሞክሮ",
      add_new: "새로운 ጨምር",
      edit: "ኢዲት",
      delete: "ሰርዝ",
      save: "ቁm",
      cancel: "ሰርዝ",
      title: "ርዕስ",
      description: "መግለጫ",
      link: "ሊንክ",
      image: "ምስል",
      email_required: "ኢሜይል ያስፈልግ",
      password_required: "ይለፍ ቃል ያስፈልግ",
      invalid_credentials: "ልክ ያልሆነ ኢሜይል ወይም ይለፍ ቃል",
      unauthorized: "ያልተፈቀደ መዳረሻ",
    },
    // የተለመደ
    common: {
      loading: "በተጠበቀ ...",
      error: "ስህተት",
      success: "ስኬት",
      back: "ዳግመ",
      close: "ዝጋ",
    },
  },
}

export function getTranslation(lang: Language, path: string): string {
  const keys = path.split(".")
  let value: any = translations[lang]

  for (const key of keys) {
    value = value?.[key]
  }

  return value || path
}

export function useTranslation(lang: Language) {
  return {
    t: (path: string) => getTranslation(lang, path),
  }
}
