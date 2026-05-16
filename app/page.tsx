import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Research from "@/components/Research";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Leadership from "@/components/Leadership";
import Gallery from "@/components/Gallery";
import Writing from "@/components/Writing";
import Now from "@/components/Now";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Stats />
      <Experience />
      <Research />
      <Work />
      <Skills />
      <Leadership />
      <Achievements />
      <Education />
      <Gallery />
      <Writing />
      <Now />
      <Contact />
      <Footer />
    </main>
  );
}
