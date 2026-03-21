import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col items-center w-full">
        <Hero />
        <Work />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
