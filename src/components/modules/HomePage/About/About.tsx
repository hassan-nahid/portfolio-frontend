import AboutMe from "./AboutMe"
import AboutSkill from "./AboutSkill"
import Image from "next/image"
import NumberTicker from "./Number"

const About = () => {
    return (
        <div className="py-16">
            {/* About Section Header */}


            {/* About Me Section + Skill Section */}
            <div className="relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                </div>

                {/* Section Header */}
                <div className="relative z-10 text-center mb-16">
                    <div className="inline-block">
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-16 animate-pulse"></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                            <span className="text-gray-400 font-light tracking-[0.3em] text-sm uppercase">Deep Dive</span>
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-16 animate-pulse"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                Skills & Story
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed px-4">
                            Interactive showcase of technical expertise and professional journey
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 container mx-auto px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                            
                            {/* Skills Section */}
                            <div className="order-2 xl:order-1 relative">
                                <div className="relative group">
                                    {/* Glow Effect */}
                                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    
                                    {/* Skills Container */}
                                    <div className="relative bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                            <h3 className="text-xl font-bold text-white">Technical Skills</h3>
                                            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                                        </div>
                                        
                                        {/* Interactive Skills Display */}
                                        <div className="relative min-h-[400px] flex items-center justify-center">
                                            <AboutSkill />
                                        </div>
                                        
                                        {/* Skills Footer */}
                                        <div className="mt-6 pt-6 border-t border-gray-700/50">
                                            <div className="flex items-center justify-between text-sm text-gray-400">
                                                <span>Interactive Skills Orbit</span>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                                                    <span>Hover to explore</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* About Me Section */}
                            <div className="order-1 xl:order-2 relative">
                                <div className="relative group">
                                    {/* Decorative Elements */}
                                    <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-blue-500/30 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
                                    <div className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-purple-500/30 rounded-full animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
                                    
                                    {/* About Me Enhanced Container */}
                                    <div className="relative">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                                            <h3 className="text-xl font-bold text-white">About Me</h3>
                                            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                                        </div>
                                        <AboutMe />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Profile Showcase Section */}
                <div className="relative z-10 mt-24">
                    <div className="container mx-auto px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                {/* Professional Profile Card */}
                                <div className="lg:col-span-1 relative group">
                                    <div className="relative group">
                                        {/* Glow Effect */}
                                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                        
                                        {/* Profile Container */}
                                        <div className="relative bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-cyan-500/30 transition-all duration-500">
                                            <div className="flex items-center space-x-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                                                <h3 className="text-xl font-bold text-white">Profile</h3>
                                                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                                            </div>
                                            
                                            {/* Profile Content */}
                                            <div className="text-center">
                                                <div className="relative w-full max-w-xs mx-auto">
                                                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white/10 group-hover:border-cyan-400/30 transition-all duration-500 shadow-2xl">
                                                        <Image
                                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                                                            alt="Hassan Nahid - Full Stack Developer"
                                                            width={160}
                                                            height={160}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    </div>
                                                    {/* Status Indicator */}
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900 animate-pulse"></div>
                                                </div>
                                                
                                                <div className="mt-6 space-y-4">
                                                    <div>
                                                        <h4 className="text-2xl font-bold text-white mb-2">Hassan Nahid</h4>
                                                        <p className="text-cyan-400 font-medium text-sm tracking-wide">Full Stack Developer</p>
                                                    </div>
                                                    
                                                    {/* Location & Status */}
                                                    <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm pt-2">
                                                        <div className="flex items-center space-x-1">
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                            </svg>
                                                            <span>Remote</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                            <span>Available</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Bio Section */}
                                                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                                                        <p className="text-gray-300 text-sm leading-relaxed">
                                                            &ldquo;I dissect intricate user experience challenges to engineer integrity-focused solutions that resonate with billions of users.&rdquo;
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Experience Card */}
                                <div className="lg:col-span-1 relative">
                                    <div className="relative group">
                                        {/* Glow Effect */}
                                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                        
                                        {/* Experience Container */}
                                        <div className="relative bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500">
                                            <div className="flex items-center space-x-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                                                <h3 className="text-xl font-bold text-white">Experience</h3>
                                                <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                                            </div>
                                            
                                            <div className="text-center mb-6">
                                                <div className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                    <NumberTicker value={1} suffix={"+"} />
                                                </div>
                                                <h4 className="text-xl font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 mb-4">Years of Experience</h4>
                                                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <p className="text-gray-400 mt-4 text-sm">Building amazing digital experiences</p>
                                            </div>
                                            
                                            {/* Experience Details */}
                                            <div className="space-y-4">
                                                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4">
                                                    <h5 className="text-white font-semibold text-sm mb-2">Frontend Development</h5>
                                                    <p className="text-gray-400 text-xs leading-relaxed">React, Next.js, TypeScript, Tailwind CSS</p>
                                                </div>
                                                
                                                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-4">
                                                    <h5 className="text-white font-semibold text-sm mb-2">Backend Development</h5>
                                                    <p className="text-gray-400 text-xs leading-relaxed">Node.js, Express, MongoDB, PostgreSQL</p>
                                                </div>
                                                
                                                <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4">
                                                    <h5 className="text-white font-semibold text-sm mb-2">Tools & Deployment</h5>
                                                    <p className="text-gray-400 text-xs leading-relaxed">Git, Docker, AWS, Vercel</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Projects Card */}
                                <div className="lg:col-span-1 relative">
                                    <div className="relative group">
                                        {/* Glow Effect */}
                                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                        
                                        {/* Projects Container */}
                                        <div className="relative bg-gradient-to-br from-gray-900/50 to-black/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-purple-500/30 transition-all duration-500">
                                            <div className="flex items-center space-x-3 mb-6">
                                                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                                                <h3 className="text-xl font-bold text-white">Projects</h3>
                                                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                                            </div>
                                            
                                            <div className="text-center mb-6">
                                                <div className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                                    <NumberTicker value={40} suffix={"+"} />
                                                </div>
                                                <h4 className="text-xl font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 mb-4">Completed Projects</h4>
                                                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <p className="text-gray-400 mt-4 text-sm">Successful deliveries & happy clients</p>
                                            </div>
                                            
                                            {/* Project Categories */}
                                            <div className="space-y-4">
                                                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-4">
                                                    <h5 className="text-white font-semibold text-sm mb-2">Web Applications</h5>
                                                    <p className="text-gray-400 text-xs leading-relaxed">E-commerce, Dashboards, SaaS platforms</p>
                                                </div>
                                                
                                                <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 backdrop-blur-sm border border-pink-500/20 rounded-2xl p-4">
                                                    <h5 className="text-white font-semibold text-sm mb-2">Mobile Apps</h5>
                                                    <p className="text-gray-400 text-xs leading-relaxed">React Native, Progressive Web Apps</p>
                                                </div>
                                                
                                                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-4">
                                                    <h5 className="text-white font-semibold text-sm mb-2">API Development</h5>
                                                    <p className="text-gray-400 text-xs leading-relaxed">RESTful APIs, GraphQL, Microservices</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Decorative Line */}
                <div className="relative z-10 mt-16 flex justify-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500 animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        <div className="w-8 h-px bg-gradient-to-l from-transparent to-purple-500 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About