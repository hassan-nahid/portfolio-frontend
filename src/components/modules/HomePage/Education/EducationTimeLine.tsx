"use client"
import type React from "react"
interface TimelineItem {
  id: string
  title: string
  company: string
  date: string
  description: string
}

interface TimelineProps {
  data?: TimelineItem[]
  className?: string
}

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span
    className={`inline-flex items-center rounded-full bg-sky-100 px-1.5 sm:px-2.5 py-0.5 text-xs font-medium text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 leading-none whitespace-nowrap ${className}`}
  >
    {children}
  </span>
)

const defaultTimelineData: TimelineItem[] = [
  {
    id: "1",
    title: "Level 2 Web Development (Ongoing)",
    company: "Programming Hero",
    date: "2025 - Present",
    description: "Advanced web development course focusing on modern technologies and professional development practices.",
  },
  {
    id: "2",
    title: "Diploma in Computer Science & Technology",
    company: "Sirajganj Polytechnic Institute",
    date: "2022 - Present",
    description: "Comprehensive diploma program covering computer science fundamentals, programming, and technology applications.",
  },
  {
    id: "3",
    title: "Complete Web Development Course",
    company: "Programming Hero",
    date: "2023 - 2024",
    description: "Intensive web development program covering full-stack development, modern frameworks, and industry best practices.",
  },
  {
    id: "4",
    title: "SSC - GPA 5.00",
    company: "Sabuj Kanan School and College",
    date: "2022",
    description: "Secondary School Certificate with perfect GPA, demonstrating excellence in academic performance.",
  },
]

export default function EducationTimeLine({ data = defaultTimelineData, className = "" }: TimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Background Pattern - Only visible on larger screens */}
      <div className="hidden lg:block absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30 bg-white dark:bg-gray-950 [--pattern-fg:rgb(3_7_18_/_0.05)] dark:[--pattern-fg:rgb(255_255_255_/_0.1)]"
          style={{
            backgroundImage: "repeating-linear-gradient(315deg, var(--pattern-fg) 0, var(--pattern-fg) 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px"
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Mobile/Tablet View - Ultra Responsive Layout */}
        <div className="lg:hidden">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 mx-2 sm:mx-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-950 dark:text-white mb-6 sm:mb-8 tracking-tight text-center">
              <span className="bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                Education & Courses
              </span>
            </h1>

            <div className="space-y-5 sm:space-y-6 md:space-y-8">
              {data.map((item, index) => (
                <div key={item.id} className="relative">
                  {/* Timeline line for mobile - adjusted for smaller screens */}
                  {index !== data.length - 1 && (
                    <div className="absolute left-2.5 sm:left-4 top-8 sm:top-12 h-[calc(100%+0.5rem)] sm:h-[calc(100%+1rem)] w-0.5 bg-gradient-to-b from-sky-400 to-purple-400 opacity-30" />
                  )}
                  
                  <div className="flex gap-3 sm:gap-4 md:gap-6">
                    <div className="relative z-10 flex h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-purple-600 shadow-md sm:shadow-lg mt-1 sm:mt-0">
                      <div className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 rounded-full bg-white shadow-sm" />
                    </div>
                    
                    <div className="flex-1 pb-3 sm:pb-4 min-w-0">
                      <div className="mb-3">
                        <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-950 dark:text-white mb-2 leading-tight">
                          {item.title}
                        </h3>
                        <div className="flex flex-col gap-2">
                          <p className="text-sky-600 dark:text-sky-400 font-medium text-sm sm:text-sm md:text-base leading-tight">
                            {item.company}
                          </p>
                          <Badge className="w-fit text-xs px-2 sm:px-2.5 py-1 shrink-0">
                            {item.date}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View - Enhanced Grid Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-[1fr_2.5rem_minmax(0,2xl)_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] min-h-[80vh]">
            <div className="col-start-3 row-start-3 flex flex-col">
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-purple-500 to-cyan-400"></div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-sky-400/20 to-purple-600/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-400/20 to-cyan-600/20 rounded-full blur-xl"></div>

                <h1 className="text-4xl font-bold text-gray-950 dark:text-white mb-12 tracking-tight relative z-10">
                  <span className="bg-gradient-to-r from-sky-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    Education & Courses Timeline
                  </span>
                </h1>

                <div className="space-y-12 relative z-10">
                  {data.map((item, index) => (
                    <div key={item.id} className="relative group transition-all duration-500 hover:translate-x-2 hover:scale-[1.02]">
                      {index !== data.length - 1 && (
                        <div className="absolute left-4 top-12 h-full w-px bg-gradient-to-b from-sky-400 via-purple-500 to-cyan-400 opacity-40 group-hover:opacity-80 transition-all duration-500" />
                      )}
                      
                      <div className="flex gap-8">
                        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-purple-600 shadow-lg group-hover:shadow-xl group-hover:scale-125 transition-all duration-500">
                          <div className="h-4 w-4 rounded-full bg-white shadow-sm group-hover:bg-gradient-to-br group-hover:from-sky-100 group-hover:to-purple-100 transition-all duration-500" />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="space-y-2">
                            <h3 className="font-bold text-xl text-gray-950 dark:text-white group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-3 flex-wrap">
                              <p className="text-sky-600 dark:text-sky-400 font-semibold text-lg">{item.company}</p>
                              <Badge className="text-sm font-medium bg-gradient-to-r from-sky-100 to-purple-100 text-sky-800 dark:from-sky-900/50 dark:to-purple-900/50 dark:text-sky-300 border border-sky-200 dark:border-sky-700">
                                {item.date}
                              </Badge>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-gray-50 to-sky-50/50 dark:from-gray-800/50 dark:to-sky-900/20 rounded-xl p-4 group-hover:from-sky-50 group-hover:to-purple-50 dark:group-hover:from-sky-900/30 dark:group-hover:to-purple-900/20 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Grid Lines */}
            <div className="relative col-start-2 row-span-full row-start-1 border-r border-gray-200/30 dark:border-gray-700/30"></div>
            <div className="relative col-start-4 row-span-full row-start-1 border-l border-gray-200/30 dark:border-gray-700/30"></div>
            <div className="relative col-span-full col-start-1 row-start-2 h-px bg-gray-200/30 dark:bg-gray-700/30"></div>
            <div className="relative col-span-full col-start-1 row-start-4 h-px bg-gray-200/30 dark:bg-gray-700/30"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
