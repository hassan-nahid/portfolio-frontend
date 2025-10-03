"use client";
import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { mockProjectData } from "./mockData";

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const limitedProjects = mockProjectData.data.slice(0, 6);
                setProjects(limitedProjects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="py-8 sm:py-12 md:py-16" id="project">
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4">
                <div className="inline-block">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-8 sm:w-16 animate-pulse"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-ping"></div>
                        <span className="text-gray-400 font-light tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase">Portfolio</span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-8 sm:w-16 animate-pulse"></div>
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                            Things I've Built
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Projects That Define My Learning and Growth
                    </p>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden animate-pulse">
                                <div className="h-48 sm:h-56 bg-gray-700/50"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-700/50 rounded mb-3"></div>
                                    <div className="space-y-2 mb-4">
                                        <div className="h-4 bg-gray-700/50 rounded"></div>
                                        <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                                    </div>
                                    <div className="flex gap-2 mb-4">
                                        <div className="h-6 w-16 bg-gray-700/50 rounded"></div>
                                        <div className="h-6 w-20 bg-gray-700/50 rounded"></div>
                                        <div className="h-6 w-18 bg-gray-700/50 rounded"></div>
                                    </div>
                                    <div className="h-10 bg-gray-700/50 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                        {projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                )}

       
            </div>

            <div className="relative z-10 mt-8 sm:mt-12 md:mt-16 flex justify-center px-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="w-4 sm:w-8 h-px bg-gradient-to-r from-transparent to-blue-500 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <div className="w-4 sm:w-8 h-px bg-gradient-to-l from-transparent to-purple-500 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default Project;
