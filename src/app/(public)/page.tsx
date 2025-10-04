import About from "@/components/modules/HomePage/About/About"
import BlogSection from "@/components/modules/HomePage/Blog/BlogSection"
import Contact from "@/components/modules/HomePage/Contact/Contact"
import Education from "@/components/modules/HomePage/Education/Education"
import HeroSection from "@/components/modules/HomePage/HeroSection/HeroSection"
import Project from "@/components/modules/HomePage/Project/Project"
import { skillApi, aboutApi, projectsApi, Skill, AboutData, ProjectData } from "@/lib/api"

// Static site generation - fetch skills at build time
export async function generateStaticParams() {
  return []
}

export async function getSkillsData(): Promise<{ skills: Skill[], skillNames: string[] }> {
  try {
    const skillsData = await skillApi.getAll()
    
    if (Array.isArray(skillsData) && skillsData.length > 0) {
      // Filter for Frontend Development and Backend Development categories only
      const filteredSkills = skillsData.filter((skill: Skill) => 
        skill.category.title === 'Frontend Development' || 
        skill.category.title === 'Backend Development'
      )
      
      console.log('Skills fetched successfully:', skillsData.length, 'total skills')
      console.log('Filtered skills:', filteredSkills.length, 'Frontend/Backend skills')
      
      // Return both skill objects and skill names
      return {
        skills: filteredSkills,
        skillNames: filteredSkills.map((skill: Skill) => skill.skill)
      }
    }
    
    // Fallback if API fails - create mock skill objects
    const fallbackSkillNames = [
      'React', 'Next.js', 'JavaScript', 'TypeScript',
      'TailwindCSS', 'CSS', 'HTML',
      'Node.js', 'Express', 'MongoDB'
    ]
    
    const fallbackSkills: Skill[] = fallbackSkillNames.map((name, index) => ({
      _id: `fallback-${index}`,
      skill: name,
      level: 'Experienced',
      logo: '',
      category: {
        _id: index < 7 ? 'frontend' : 'backend',
        title: index < 7 ? 'Frontend Development' : 'Backend Development',
        __v: 0
      },
      __v: 0
    }))
    
    return {
      skills: fallbackSkills,
      skillNames: fallbackSkillNames
    }
  } catch (error) {
    console.error('Failed to fetch skills:', error)
    
    // Fallback if API fails - create mock skill objects
    const fallbackSkillNames = [
      'React', 'Next.js', 'JavaScript', 'TypeScript',
      'TailwindCSS', 'CSS', 'HTML',
      'Node.js', 'Express', 'MongoDB'
    ]
    
    const fallbackSkills: Skill[] = fallbackSkillNames.map((name, index) => ({
      _id: `fallback-${index}`,
      skill: name,
      level: 'Experienced',
      logo: '',
      category: {
        _id: index < 7 ? 'frontend' : 'backend',
        title: index < 7 ? 'Frontend Development' : 'Backend Development',
        __v: 0
      },
      __v: 0
    }))
    
    return {
      skills: fallbackSkills,
      skillNames: fallbackSkillNames
    }
  }
}

// Static site generation - fetch about data at build time
export async function getAboutData(): Promise<AboutData | null> {
  try {
    const response = await aboutApi.get()
    
    if (response.success && response.data) {
      console.log('About data fetched successfully:', response.data)
      return response.data
    }
    
    console.error('Failed to fetch about data:', response.message)
    return null
  } catch (error) {
    console.error('Error fetching about data:', error)
    return null
  }
}

// Static site generation - fetch soft skills at build time
export async function getSoftSkills(): Promise<string[]> {
  try {
    const skillsData = await skillApi.getAll()
    
    if (Array.isArray(skillsData) && skillsData.length > 0) {
      // Filter for Soft Skills category only
      const softSkills = skillsData
        .filter((skill: Skill) => skill.category.title === 'Soft Skills')
        .map((skill: Skill) => skill.skill)
      
      console.log('Soft skills fetched:', softSkills)
      return softSkills
    }
    
    // Fallback soft skills if API fails
    return ['Problem Solving', 'Team Collaboration', 'Performance Optimization', 'Security']
  } catch (error) {
    console.error('Failed to fetch soft skills:', error)
    return ['Problem Solving', 'Team Collaboration', 'Performance Optimization', 'Security']
  }
}

// Static site generation - fetch projects data at build time
export async function getProjectsData(): Promise<ProjectData[]> {
  try {
    const response = await projectsApi.getAll()
    
    if (response.success && response.data) {
      console.log('Projects data fetched successfully:', response.data.length, 'projects')
      return response.data
    }
    
    console.error('Failed to fetch projects data:', response.message)
    return []
  } catch (error) {
    console.error('Error fetching projects data:', error)
    return []
  }
}

// ISR: Revalidate every 60 seconds
export const revalidate = 60

const HomePage = async () => {
  // Fetch all data at build time for SSG/ISR
  const [{ skills, skillNames }, aboutData, softSkills, projects] = await Promise.all([
    getSkillsData(),
    getAboutData(),
    getSoftSkills(),
    getProjectsData()
  ])
  
  return (
    <div>
      <HeroSection skills={skillNames} />
      <About skills={skills} aboutData={aboutData} softSkills={softSkills} />
      <Project projects={projects} />
      <Education/>
      <Contact/>
      <BlogSection/>
    </div>
  )
}

export default HomePage