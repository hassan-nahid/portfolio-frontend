import Image from "next/image";
import Link from "next/link";
import { projectsApi, ProjectData } from "@/lib/api";
import { notFound } from 'next/navigation';

// Generate static params for ISR
export async function generateStaticParams() {
  try {
    const response = await projectsApi.getAll()
    if (response.success && response.data) {
      return response.data.map((project: ProjectData) => ({
        id: project._id,
      }))
    }
    return []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// ISR: Revalidate every 60 seconds
export const revalidate = 60

// Server-side data fetching
async function getProjectData(id: string): Promise<ProjectData | null> {
  try {
    const response = await projectsApi.getById(id)
    if (response.success && response.data) {
      return response.data
    }
    return null
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return null
  }
}

interface PageProps {
  params: { id: string }
}

const ProjectDetailsPage = async ({ params }: PageProps) => {
    // Fetch project data server-side
    const project = await getProjectData(params.id)
    
    // Handle project not found
    if (!project) {
        notFound()
    }

    console.log(project)

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
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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

                    {/* Project Description - Enhanced */}
                    <div className="mb-16 relative">
                        <div className="relative overflow-hidden rounded-3xl bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 p-8 md:p-12">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                            
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-ping"></div>
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-black text-white">
                                            Project Overview
                                        </h2>
                                        <p className="text-sm text-gray-400 font-medium tracking-wide">Detailed insights & vision</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30">
                                    <div className="prose prose-lg prose-invert max-w-none">
                                        <p className="text-gray-200 leading-relaxed text-xl font-light tracking-wide animate-fade-in">
                                            {project.description?.replace(/"/g, '') || 'This amazing project showcases innovative solutions and cutting-edge technology implementation with modern development practices.'}
                                        </p>
                                    </div>
                                    
                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technologies Used - Enhanced */}
                    <div className="mb-16 relative">
                        <div className="relative overflow-hidden rounded-3xl bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 p-8 md:p-12">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                            
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-ping"></div>
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-black text-white">
                                            Tech Arsenal
                                        </h2>
                                        <p className="text-sm text-gray-400 font-medium tracking-wide">Cutting-edge technology stack</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {project.stacks?.map((stack: { _id: string; skill: string; level: string; logo: string }, index: number) => (
                                    <div 
                                        key={stack._id}
                                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-600/40 p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        <div className="relative z-10 text-center">
                                            <div className="relative w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <Image
                                                    src={stack.logo}
                                                    alt={stack.skill}
                                                    fill
                                                    className="object-contain filter group-hover:brightness-125 transition-all duration-300 relative z-10"
                                                />
                                            </div>
                                            
                                            <h3 className="text-white font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                                                {stack.skill}
                                            </h3>
                                            
                                            <span className="text-xs text-gray-400 px-3 py-1 bg-gray-700/50 rounded-full">
                                                {stack.level}
                                            </span>
                                        </div>
                                        
                                        {/* Subtle Glow Effect */}
                                        <div className="absolute -inset-0.5 bg-blue-600/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                                    </div>
                                )) || (
                                    <div className="col-span-full text-center py-12">
                                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-800/60 to-blue-900/60 rounded-full border border-gray-600/30">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span className="text-gray-300 font-medium">Tech stack details will be displayed here</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Tech Stats */}
                            <div className="mt-8 text-center">
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800/50 border border-gray-600/30 rounded-full">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-gray-300">
                                            {project.stacks?.length || 0} technologies
                                        </span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-600"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                        <span className="text-sm text-gray-300">Latest versions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Features Section */}
                    {/* Amazing Key Features Section */}
                    {project.features && project.features.length > 0 && (
                        <div className="mb-16">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 blur-lg opacity-30 animate-pulse"></div>
                                        <span className="relative text-sm font-medium text-purple-400 uppercase tracking-[0.2em]">
                                            ✨ Key Features
                                        </span>
                                    </div>
                                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"></div>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                                        What Makes It Special
                                    </span>
                                </h2>
                                <p className="text-gray-400 max-w-2xl mx-auto">
                                    Discover the powerful features that make this project stand out
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {project.features.map((feature: string, index: number) => (
                                    <div 
                                        key={index}
                                        className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                                        style={{
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        {/* Floating Icon */}
                                        <div className="absolute -top-3 -right-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                                {index + 1}
                                            </div>
                                        </div>
                                        
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        {/* Feature Icon */}
                                        <div className="relative mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-lg flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Feature Text */}
                                        <div className="relative">
                                            <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                                                {feature}
                                            </p>
                                        </div>
                                        
                                        {/* Animated Border */}
                                        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gradient-to-r group-hover:from-purple-500/50 group-hover:to-cyan-500/50 transition-all duration-500"></div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Feature Stats */}
                            <div className="mt-8 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/30 rounded-full">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-gray-400">
                                        {project.features.length} powerful features implemented
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;