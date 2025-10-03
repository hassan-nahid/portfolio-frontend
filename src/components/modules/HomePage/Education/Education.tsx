import EducationTimeLine from "./EducationTimeLine"

const Education = () => {
    return (
        <div className="py-8 sm:py-12 md:py-16" id="education">
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Section Header */}
            <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4">
                <div className="inline-block">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-8 sm:w-16 animate-pulse"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-ping"></div>
                        <span className="text-gray-400 font-light tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm uppercase">Deep Dive</span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent w-8 sm:w-16 animate-pulse"></div>
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                            Learning Journey
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Exploring my educational path and continuous growth in technology
                    </p>
                </div>
            </div>
            <EducationTimeLine />
            {/* Bottom Decorative Line */}
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
    )
}
export default Education