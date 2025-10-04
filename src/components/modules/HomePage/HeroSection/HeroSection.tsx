"use client";
import React from "react"

// Props interface for HeroSection
interface HeroSectionProps {
    skills?: string[]
}

// Self-contained SVG icon for the "Welcome" badge
const DotIcon = () => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
);

const downloadCV = () => {
    const pdfURL = 'https://drive.google.com/uc?export=download&id=1dCXijZ18Ss9QlU7l6llUEayyqZbGgZpa';
    const anchor = document.createElement('a');
    anchor.href = pdfURL;
    anchor.download = 'Full_Stack_Developer_Resume_of_Hassan_Nahid.pdf';
    anchor.click();
};

// Create coder data with dynamic skills
const createCoderData = (skills: string[]) => ({
    name: 'Hassan Nahid',
    role: 'Full Stack Developer',
    seniority: 'Mid-Level',
    location: 'Bangladesh',
    skills: skills,
});

const socialIcons = [
    {
        name: "GitHub",
        href: "https://github.com/hassan-nahid",
        svg: (
            <svg
                className="size-6 transition-transform duration-200 hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.025 2.75-1.025c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z"
                ></path>
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/hassan-nahid",
        svg: (
            <svg
                className="size-6 transition-transform duration-200 hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                ></path>
            </svg>
        ),
    },
    {
        name: "X",
        href: "https://x.com/HassanNahid100",
        svg: (
            <svg
                className="size-6 transition-transform duration-200 hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
                ></path>
            </svg>
        ),
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/HassanNahid10",
        svg: (
            <svg
                className="size-6 transition-transform duration-200 hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                ></path>
            </svg>
        ),
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/HassanNahid10",
        svg: (
            <svg
                className="size-6 transition-transform duration-200 hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                ></path>
            </svg>
        ),
    },
];
// The styled code window component
const CoderProfileCard = ({ skills }: { skills: string[] }) => {
    const coderData = createCoderData(skills);
    
    return (
        // Main container with gradient, border, and shadow - theme-aware
        <div className="w-full mx-auto bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-[#000000] dark:to-[#0a0d37] border-zinc-300 dark:border-[#1b2c68a0] relative rounded-lg border shadow-lg">

            {/* Top gradient border element */}
            <div className="flex flex-row">
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
                <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
            </div>

            {/* Window Header */}
            <div className="px-4 lg:px-8 py-5 flex justify-between items-center bg-zinc-200 dark:bg-[#000000]">
                <div className="flex flex-row space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs text-zinc-600 dark:text-gray-400 font-mono">coder.js</div>
            </div>

            {/* Code Content Area */}
            <div className="overflow-hidden border-t-[2px] border-zinc-300 dark:border-indigo-900 px-4 lg:px-8 py-4 lg:py-8 relative">
                {/* Background blur effects */}
                <div className="absolute -top-24 -left-24 w-56 h-56 bg-blue-600 rounded-full opacity-10 filter blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-pink-600 rounded-full opacity-10 filter blur-3xl"></div>

                <div className="relative flex">
                    {/* Line Numbers */}
                    <div className="hidden md:flex flex-col items-end pr-4 text-zinc-600 dark:text-gray-500 font-mono text-xs">
                        {Array.from({ length: 12 }, (_, i) => (
                            <div key={i} className="leading-relaxed select-none opacity-70">{i + 1}</div>
                        ))}
                    </div>

                    {/* Code Snippet with theme-aware colors */}
                    <code className="font-mono text-xs md:text-sm lg:text-base w-full">
                        <div>
                            <span className="mr-2 text-pink-500 dark:text-pink-400">const</span>
                            <span className="mr-2 text-violet-500 dark:text-violet-400">coder</span>
                            <span className="mr-2 text-pink-500 dark:text-pink-400">=</span>
                            <span className="text-zinc-600 dark:text-gray-400">{'{'}</span>
                        </div>
                        <div className="pl-6">
                            <span className="text-zinc-800 dark:text-white">name:</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                            <span className="text-green-600 dark:text-green-400">{coderData.name}</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;,</span>
                        </div>
                        <div className="pl-6">
                            <span className="text-zinc-800 dark:text-white">role:</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                            <span className="text-green-600 dark:text-green-400">{coderData.role}</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;,</span>
                        </div>
                        <div className="pl-6">
                            <span className="text-zinc-800 dark:text-white">seniority:</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                            <span className="text-green-600 dark:text-green-400">{coderData.seniority}</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;,</span>
                        </div>
                        <div className="pl-6">
                            <span className="text-zinc-800 dark:text-white">location:</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                            <span className="text-green-600 dark:text-green-400">{coderData.location}</span>
                            <span className="text-zinc-600 dark:text-gray-400">&#39;,</span>
                        </div>
                        <div className="pl-6">
                            <span className="text-zinc-800 dark:text-white">skills:</span>
                            <span className="text-zinc-600 dark:text-gray-400">{'['}</span>
                            <div className="pl-6 flex flex-wrap">
                                {coderData.skills.map((skill: string, index: number) => (
                                    <span key={skill} className="mr-1">
                                        <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                                        <span className="text-cyan-600 dark:text-cyan-400">{skill}</span>
                                        <span className="text-zinc-600 dark:text-gray-400">&#39;</span>
                                        {index < coderData.skills.length - 1 && <span className="text-zinc-600 dark:text-gray-400">, </span>}
                                    </span>
                                ))}
                            </div>
                            <span className="text-zinc-600 dark:text-gray-400">{'],'}</span>
                        </div>
                        <div>
                            <span className="text-zinc-600 dark:text-gray-400">{'};'}</span>
                        </div>
                    </code>
                </div>
            </div>

            {/* Window Footer */}
            <div className="px-4 lg:px-8 pb-4 mt-4 border-t border-zinc-300 dark:border-gray-800 pt-3 text-xs text-zinc-600 dark:text-gray-500 flex justify-between items-center">
                <span>UTF-8</span>
                <span>JavaScript</span>
                <span>Ln 12, Col 2</span>
            </div>
        </div>
    );
};

// Main component
const HeroSection = ({ skills = [] }: HeroSectionProps) => {
    return (
        <div className="min-h-screen w-full relative flex items-center justify-center font-sans p-4 sm:p-6 lg:p-6">
            {/* Light mode Azure Depths */}
            <div
                className="absolute inset-0 z-0 dark:hidden"
                style={{
                    background: "radial-gradient(125% 125% at 50% 100%, #ffffff 40%, #3b82f6 100%)",
                }}
            />

            {/* Dark mode Azure Depths */}
            <div
                className="absolute inset-0 z-0 hidden dark:block"
                style={{
                    background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
                }}
            />

            {/* Main Content Container */}
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col gap-4 sm:gap-2 items-start text-left order-2 lg:order-1 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900/80 dark:bg-white/10 border border-gray-700 dark:border-gray-600 rounded-full text-xs sm:text-sm text-gray-200 dark:text-gray-300 backdrop-blur-sm hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300">
                            <DotIcon />
                            Welcome to my universe
                        </div>

                        <div className="relative">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                                Hello <br />
                                I&apos;m{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    Hassan Nahid
                                </span>
                            </h1>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3 my-2 sm:my-4">
                            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-900/80 dark:bg-white/10 border border-gray-700 dark:border-gray-600 rounded-full text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">Learning Full Stack</span>
                            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-900/80 dark:bg-white/10 border border-gray-700 dark:border-gray-600 rounded-full text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">Clean Code</span>
                            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-900/80 dark:bg-white/10 border border-gray-700 dark:border-gray-600 rounded-full text-gray-200 dark:text-gray-300 text-sm sm:text-base backdrop-blur-sm hover:bg-gray-800 dark:hover:bg-white/20 transition-all duration-300 cursor-default">Innovation</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-lg max-w-lg leading-relaxed">
                            Full Stack Developer | JavaScript & TypeScript Specialist (MERN, Next.js, PostgreSQL) | Scalable Web Solutions            </p>

                        <div className="my-6 flex flex-wrap justify-center gap-4 text-sm">
                            {socialIcons.map((icon) => (
                                <a
                                    key={icon.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={icon.name}
                                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                                    href={icon.href}
                                >
                                    {icon.svg}
                                </a>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto">
                            <button onClick={downloadCV} className="cursor-pointer px-6 py-3 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
                                Get Resume
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Code Editor */}
                    <div className="order-1 lg:order-2 animate-fade-in-up">
                        <CoderProfileCard skills={skills} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;

// Add custom CSS for animations
const styles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .hover\\:shadow-3xl:hover {
    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}