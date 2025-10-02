import AboutMe from "./AboutMe"
import AboutSkill from "./AboutSkill"
import ImageCard from "./ImageCard"
import Image from "next/image"
import NumberTicker from "./Number"

const About = () => {
    return (
        <div className="py-16">
            {/* About Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                    About Section
                </h2>
            </div>

            {/* Main Content - Skills + Experience + Projects Side by Side */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

                    {/* About Skills Section */}
                    <ImageCard>
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl">
                            <div className="text-center p-6">
                                <div className="w-full h-full rounded overflow-hidden mx-auto mb-4">
                                    <Image
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                                        alt="Profile"
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-white text-lg font-semibold mb-2">Hassan Nahid</h3>
                            </div>
                        </div>
                    </ImageCard>

                    {/* Experience Card */}
                    <div className="lg:col-span-1">
                        <div className="group relative p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 h-full flex flex-col justify-center min-h-[400px]">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10 text-center">
                                <div className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    <NumberTicker value={1} suffix={"+"} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 mb-4">Years of Experience</h3>
                                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <p className="text-gray-400 mt-4 text-sm">Building amazing digital experiences</p>
                            </div>
                        </div>
                    </div>

                    {/* Completed Projects Card */}
                    <div className="lg:col-span-1">
                        <div className="group relative p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl hover:border-purple-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 h-full flex flex-col justify-center min-h-[400px]">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10 text-center">
                                <div className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    <NumberTicker value={40} suffix={"+"} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 mb-4">Completed Projects</h3>
                                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <p className="text-gray-400 mt-4 text-sm">Successful deliveries & happy clients</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* About Me Section Below */}
            <div className="container mx-auto px-6 mt-16">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="lg:col-span-1 flex items-center justify-center">
                            <AboutSkill />
                        </div>
                        <AboutMe />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About