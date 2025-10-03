import About from "@/components/modules/HomePage/About/About"
import BlogSection from "@/components/modules/HomePage/Blog/BlogSection"
import Contact from "@/components/modules/HomePage/Contact/Contact"
import Education from "@/components/modules/HomePage/Education/Education"
import HeroSection from "@/components/modules/HomePage/HeroSection/HeroSection"
import Project from "@/components/modules/HomePage/Project/Project"
const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <About/>
      <Project/>
      <Education/>
      <Contact/>
      <BlogSection/>
    </div>
  )
}
export default HomePage