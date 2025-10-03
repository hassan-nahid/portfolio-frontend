"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { mockProjectData } from "../../../../components/modules/HomePage/Project/mockData";

interface Stack {
    _id: string;
    skill: string;
    level: string;
    logo: string;
    category: string;
    __v: number;
}

interface Project {
    _id: string;
    title: string;
    image: string;
    category: string;
    description: string;
    demoLink?: string;
    githubFrontend?: string;
    githubBackend?: string;
    githubFullStack?: string;
    stacks: Stack[];
    __v: number;
}

const ProjectDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // Simulate API call - in real app, replace with actual API call
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const foundProject = mockProjectData.data.find(p => p._id === params.id);
                if (foundProject) {
                    setProject(foundProject);
                } else {
                    router.push('/404');
                }
            } catch (error) {
                console.error('Error fetching project:', error);
                router.push('/404');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProject();
        }
    }, [params.id, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (!project) return null;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Header Navigation */}
            <div className="relative z-10 container mx-auto px-4 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                    <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Portfolio
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 pb-16">
                <div className="max-w-6xl mx-auto">
                    {/* Project Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center space-x-4 mb-6">
                            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-16 animate-pulse"></div>
                            <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 text-sm font-semibold rounded-full border border-blue-500/30">
                                {project.category}
                            </span>
                            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-16 animate-pulse"></div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                {project.title}
                            </span>
                        </h1>

                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            {/* Live Demo Link */}
                            {project.demoLink && (
                                <a
                                    href={project.demoLink.replace(/"/g, '')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-full transition-all duration-300 group transform hover:scale-105"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <span>Live Demo</span>
                                </a>
                            )}

                            {/* GitHub Frontend Link */}
                            {project.githubFrontend && (
                                <a
                                    href={project.githubFrontend}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold rounded-full transition-all duration-300 group transform hover:scale-105"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    <span>Frontend Code</span>
                                </a>
                            )}

                            {/* GitHub Backend Link */}
                            {project.githubBackend && (
                                <a
                                    href={project.githubBackend}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-semibold rounded-full transition-all duration-300 group transform hover:scale-105"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    <span>Backend Code</span>
                                </a>
                            )}

                            {/* GitHub Full Stack Link */}
                            {project.githubFullStack && (
                                <a
                                    href={project.githubFullStack}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white font-semibold rounded-full transition-all duration-300 group transform hover:scale-105"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    <span>Full Stack Code</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Project Image */}
                    <div className="relative mb-16 group">
                        <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-700">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                    </div>

                    {/* Project Description */}
                    <div className="mb-16 text-center">
                        <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                            {project.description.replace(/"/g, '')}
                        </p>
                    </div>

                    {/* Tech Stack Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Technologies Used
                            </span>
                        </h2>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {project.stacks.map((stack) => (
                                <div
                                    key={stack._id}
                                    className="group relative bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-500 hover:scale-105"
                                >
                                    <div className="text-center">
                                        <div className="relative w-16 h-16 mx-auto mb-4">
                                            <Image
                                                src={stack.logo}
                                                alt={stack.skill}
                                                fill
                                                className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                                            />
                                        </div>
                                        
                                        <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                            {stack.skill}
                                        </h3>
                                        
                                        <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800/50 rounded-full">
                                            {stack.level}
                                        </span>
                                    </div>

                                    {/* Glow Effect */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project Features Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">
                            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                Key Features
                            </span>
                        </h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Sample features - in real app, these would come from project data */}
                            <div className="group bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-500">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                                    High Performance
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Optimized for speed and efficiency with modern development practices.
                                </p>
                            </div>

                            <div className="group bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-500">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                                    Responsive Design
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Fully responsive design that works seamlessly across all devices.
                                </p>
                            </div>

                            <div className="group bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-500">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                                    User Friendly
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Intuitive user interface designed for the best user experience.
                                </p>
                            </div>
                        </div>
                    </div>

               
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;