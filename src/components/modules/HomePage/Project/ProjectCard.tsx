"use client"
import Image from "next/image"
import Link from "next/link"
import { ProjectData } from "@/lib/api"

interface ProjectCardProps {
    project: ProjectData;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className="group relative bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
            {/* Project Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-75 animate-pulse"></div>
                        <span className="relative px-3 py-1 bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm border border-white/20">
                            {project.category || 'PROJECT'}
                        </span>
                    </div>
                </div>

                {/* Demo Link Button - Only show if demoLink exists */}
                {project.demoLink && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <a
                            href={project.demoLink.replace(/"/g, '')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-full transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>

            {/* Project Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description?.replace(/"/g, '') || 'No description available'}
                </p>

                {/* Cool Features Display */}
                {project.features && project.features.length > 0 && (
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider">Key Features</span>
                        </div>
                        <div className="space-y-1">
                            {project.features.slice(0, 2).map((feature, index) => (
                                <div key={index} className="flex items-start gap-2 text-xs text-gray-400">
                                    <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <span className="leading-relaxed">{feature}</span>
                                </div>
                            ))}
                            {project.features.length > 2 && (
                                <div className="text-xs text-gray-500 ml-3">
                                    +{project.features.length - 2} more features
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {(project.stacks || []).slice(0, 3).map((stack) => (
                        <div
                            key={stack._id}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg border border-gray-600/30 hover:border-blue-500/40 transition-colors duration-300 group/stack"
                        >
                            <Image
                                src={stack.logo || '/placeholder-tech.png'}
                                alt={stack.skill || 'Technology'}
                                width={16}
                                height={16}
                                className="object-contain group-hover/stack:scale-110 transition-transform duration-200"
                            />
                            <span className="text-xs text-gray-300 font-medium group-hover/stack:text-blue-400 transition-colors duration-200">
                                {stack.skill}
                            </span>
                        </div>
                    ))}
                    {(project.stacks?.length || 0) > 3 && (
                        <div className="flex items-center justify-center px-3 py-1.5 bg-gray-700/50 rounded-lg border border-gray-600/30 text-xs text-gray-400 hover:text-purple-400 transition-colors duration-200">
                            +{(project.stacks?.length || 0) - 3} more
                        </div>
                    )}
                </div>

                {/* View Details Button */}
                <Link
                    href={`/projects/${project._id || 'unknown'}`}
                    className="inline-flex items-center justify-center w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 group/btn hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02]"
                >
                    <span className="mr-2">View Details</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
        </div>
    )
}

export default ProjectCard