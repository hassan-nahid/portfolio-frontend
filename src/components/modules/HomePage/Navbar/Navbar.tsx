"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import Image from 'next/image';
import { Link, animateScroll as scroll } from "react-scroll"


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Ensure component is mounted on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Handle scroll effect
    useEffect(() => {
        if (!isMounted) return;
        
        const handleScroll = () => {
            if (typeof window !== 'undefined') {
                setIsScrolled(window.scrollY > 10);
            }
        };
        
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [isMounted]);

    // Close menu when screen size changes
    useEffect(() => {
        if (!isMounted) return;
        
        const handleResize = () => {
            if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [isMounted]);

    const navLinks = [
        { href: "#about", text: "About" },
        { href: "#project", text: "Projects" },
        { href: "#education", text: "Education" },
        { href: "#contact", text: "Contact" },
        { href: "#blog", text: "Blog" },
    ];

    const downloadCV = () => {
        if (typeof window !== 'undefined') {
            const pdfURL = 'https://drive.google.com/uc?export=download&id=1dCXijZ18Ss9QlU7l6llUEayyqZbGgZpa';
            const anchor = document.createElement('a');
            anchor.href = pdfURL;
            anchor.download = 'Full_Stack_Developer_Resume_of_Hassan_Nahid.pdf';
            anchor.click();
        }
    };

    // Prevent hydration mismatch by not rendering interactive elements until mounted
    if (!isMounted) {
        return (
            <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-transparent backdrop-blur-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-4 2xl:px-0 max-w-7xl">
                    <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex items-center space-x-2 group">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                                    <Image src="/icon.svg" width={48} height={48} alt='logo' className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                                </div>
                                <span className="font-bold text-lg sm:text-xl lg:text-2xl text-white">Hassan Nahid</span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                            {navLinks.map((link) => (
                                <span key={link.text} className="text-sm lg:text-base font-medium text-gray-300">
                                    {link.text}
                                </span>
                            ))}
                        </div>
                        <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                            <span className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium border border-white/20 rounded-md text-white">
                                <span>Resume</span>
                                <Download className="h-4 w-4" />
                            </span>
                        </div>
                        <div className="md:hidden p-2 text-white">
                            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                    </div>
                </div>
            </header>
        );
    }


    return (
        <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? 'bg-black/20 backdrop-blur-xl shadow-lg border-b border-white/10'
            : 'bg-transparent backdrop-blur-sm'
            }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-4 2xl:px-0 max-w-7xl">
                <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
                    {/* Logo and Name */}
                    <div className="flex items-center">
                        <div onClick={() => scroll.scrollToTop({ duration: 500 })} className="flex cursor-pointer items-center space-x-2 group">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                                <Image src="/icon.svg" width={48} height={48} alt='logo' className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                            </div>
                            <span className="font-bold text-lg sm:text-xl lg:text-2xl text-white">Hassan Nahid</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.text}
                                to={link.href.replace('#', '')}
                                spy={true}
                                smooth={true}
                                offset={-100}
                                duration={500}
                                className="text-sm lg:text-base font-medium text-gray-300 hover:text-white transition-colors relative group cursor-pointer"
                                activeClass="text-white"
                            >
                                {link.text}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                        <button
                            onClick={downloadCV}
                            className="flex items-center cursor-pointer justify-center space-x-2 px-3 py-2.5 text-sm font-medium border border-white/20 rounded-md hover:bg-white/10 text-white transition-colors"
                        >
                            <span>Resume</span>
                            <Download className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="py-4 border-t border-white/10 bg-black/40 backdrop-blur-md rounded-b-lg">
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.text}
                                    to={link.href.replace('#', '')}
                                    spy={true}
                                    smooth={true}
                                    offset={-100}
                                    duration={500}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-3 py-2.5 text-sm sm:text-base font-medium text-gray-300 rounded-md hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                                    activeClass="text-white bg-white/10"
                                >
                                    {link.text}
                                </Link>
                            ))}
                            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col space-y-2">
                                <button
                                    onClick={downloadCV}
                                    className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium border border-white/20 rounded-md hover:bg-white/10 text-white transition-colors"
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