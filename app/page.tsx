import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { getSettings } from "../sanity/queries";

export default async function Home() {
  const s = await getSettings().catch(() => null);

  return (
    <>
      <Nav name={s?.name ?? "Jane Doe"} />
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
