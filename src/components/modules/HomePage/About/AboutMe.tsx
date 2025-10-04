import { AboutData } from "@/lib/api"

interface AboutMeProps {
  aboutData?: AboutData | null
  softSkills?: string[]
}

const AboutMe = ({ aboutData, softSkills = [] }: AboutMeProps) => {
  // Debug log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('AboutMe received soft skills:', softSkills)
    console.log('AboutMe received about data:', aboutData)
  }

  return (
    <div className="relative group">
      {/* Background Effects */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-700 animate-pulse"></div>
      
      {/* Main Content Card */}
      <div className="relative bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500">
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute top-6 right-8 w-1 h-1 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-400 tracking-wider uppercase">About Me</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              I am{' '}
            </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              {aboutData?.name || 'Hassan Nahid'}
            </span>
          </h1>
          
          {/* Role Tag */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-blue-300 text-sm font-medium">Full Stack Developer</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed text-base">
            {aboutData?.about || (
              <>
                <span className="text-white font-semibold">Experienced Full Stack Developer</span> with a passion for building 
                <span className="text-blue-400 font-medium"> scalable, efficient, and user-friendly</span> web applications. 
                Adept at designing and developing robust architectures, optimizing performance, and implementing security best practices.
              </>
            )}
          </p>
          
          {aboutData?.bio && (
            <p className="text-gray-400 leading-relaxed text-sm">
              {aboutData.bio}
            </p>
          )}
          
          {!aboutData?.about && (
            <p className="text-gray-400 leading-relaxed text-sm">
              Skilled in <span className="text-purple-400 font-medium">problem-solving, debugging,</span> and collaborating with 
              cross-functional teams to deliver high-quality, maintainable solutions. Committed to staying updated with emerging 
              technologies and continuously improving development processes.
            </p>
          )}
        </div>

        {/* Skills Highlights - Soft Skills from Backend */}
        <div className="mt-6 pt-6 border-t border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            {(softSkills.length > 0 ? softSkills : ['Problem Solving', 'Team Collaboration', 'Performance Optimization', 'Security']).map((skill, index) => (
              <span 
                key={skill}
                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 rounded-full border border-gray-600/50 hover:border-blue-500/30 hover:text-white transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Indicator */}
        <div className="absolute bottom-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AboutMe