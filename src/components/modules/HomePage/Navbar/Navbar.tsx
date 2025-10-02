"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when screen size changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { href: "#about", text: "About" },
        { href: "#project", text: "Projects" },
        { href: "#education", text: "Education" },
        { href: "#contact", text: "Contact" },
        { href: "#blog", text: "Blog" },
    ];

    return (
        <header className={`w-full transition-all duration-300 ${isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg'
            : 'bg-white/90 dark:bg-gray-900/80 backdrop-blur-md'
            } border-b border-gray-200 dark:border-gray-800`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-4 2xl:px-0 max-w-7xl">
                <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
                    {/* Logo and Name */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gray-900 dark:bg-gray-50 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                                <Image src="/icon.svg" width={48} height={48} alt='logo' className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                            </div>
                            <span className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-gray-100">Hassan Nahid</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.text}
                                href={link.href}
                                className="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group"
                            >
                                {link.text}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                        <button
                            className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <span>Resume</span>
                            <Download className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="py-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.text}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-3 py-2.5 text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {link.text}
                                </a>
                            ))}
                            <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
                                <button
                                    className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <span>Resume</span>
                                    <Download className="h-4 w-4" />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;