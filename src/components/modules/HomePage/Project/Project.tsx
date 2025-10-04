import ProjectCard from "./ProjectCard";
import { ProjectData } from '@/lib/api'

type Project = ProjectData

interface ProjectProps {
    projects?: Project[]
}

const Project = ({ projects = [] }: ProjectProps) => {
    // Projects now come from props (server-side fetched)


    return (
        <div className="py-8 sm:py-12 md:py-16" id="project">
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
            </div>

            <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4">
                <div className="inline-block">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-8 sm:w-16 animate-pulse"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-ping"></div>
                        <span className="text-gray-400 font-light tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase">Portfolio</span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-ping [animation-delay:0.5s]"></div>
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-8 sm:w-16 animate-pulse"></div>
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                            Things I&apos;ve Built
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Projects That Define My Learning and Growth
                    </p>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-gray-400 text-lg">No projects available at the moment.</p>
                            <p className="text-gray-500 text-sm mt-2">Check back later for amazing projects!</p>
                        </div>
                    )}
                </div>


            </div>

            <div className="relative z-10 mt-8 sm:mt-12 md:mt-16 flex justify-center px-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="w-4 sm:w-8 h-px bg-gradient-to-r from-transparent to-blue-500 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    <div className="w-4 sm:w-8 h-px bg-gradient-to-l from-transparent to-purple-500 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default Project;
