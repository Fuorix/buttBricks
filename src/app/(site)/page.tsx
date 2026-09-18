import { Hero } from '@/components/Hero/Hero';
import { StatsBar } from '@/components/StatsBar/StatsBar';
import { Products } from '@/components/Products/Products';
import { About } from '@/components/About/About';
import { Projects } from '@/components/Projects/Projects';
import { Features } from '@/components/Features/Features';
import { Contact } from '@/components/Contact/Contact';
import { getFeaturedProducts } from '@/lib/data/catalog';

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <main>
      <Hero />
      <StatsBar />
      <Products products={featured.slice(0, 6)} />
      <About />
      <Projects />
      <Features />
      <Contact />
    </main>
  );
}
