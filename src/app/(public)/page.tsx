import About from "@/components/modules/HomePage/About/About"
import Education from "@/components/modules/HomePage/Education/Education"
import HeroSection from "@/components/modules/HomePage/HeroSection/HeroSection"

const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <About/>
      <Education/>
    </div>
  )
}
export default HomePage