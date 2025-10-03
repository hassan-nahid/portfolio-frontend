"use client";

import Image from "next/image";
import { Link } from "react-scroll";


function Footer() {
  const navLinks = [
    { href: "#about", text: "About" },
    { href: "#project", text: "Projects" },
    { href: "#education", text: "Education" },
    { href: "#contact", text: "Contact" },
    { href: "#blog", text: "Blog" },
  ];




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
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 font-inter relative overflow-hidden ">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <div className="mb-6 flex items-center justify-center">
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
              <Image src="/icon.svg" width={48} height={48} alt='logo' className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
            <span className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-gray-100">Hassan Nahid</span>
          </a>

        </div>

        <nav className="mb-6 w-full">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-base font-medium">
            {navLinks.map((link) => (
              <li key={link.text}>
                <Link
                  to={link.href.replace('#', '')}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-gray-900 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
                  activeClass="text-gray-900 dark:text-white after:w-full"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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

        <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} Hassan Nahid. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
