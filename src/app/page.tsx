import { Hero } from '@/components/Hero/Hero';
import { StatsBar } from '@/components/StatsBar/StatsBar';
import { Products } from '@/components/Products/Products';
import { About } from '@/components/About/About';
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
<Projects />
        <Features />
        <Contact />
      </main>
    </>
  );
}
