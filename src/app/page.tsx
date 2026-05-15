import { Hero } from '@/components/Hero/Hero';
import { StatsBar } from '@/components/StatsBar/StatsBar';
import { Products } from '@/components/Products/Products';
import { About } from '@/components/About/About';
import { AppreciationLetters } from '@/components/AppreciationLetters/AppreciationLetters';
import { Projects } from '@/components/Projects/Projects';
import { Features } from '@/components/Features/Features';
import { Contact } from '@/components/Contact/Contact';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <StatsBar />
        <Products />
        <About />
        <AppreciationLetters />
        <Projects />
        <Features />
        <Contact />
      </main>
    </>
  );
}
