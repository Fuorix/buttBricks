import { Header } from '@/components/Header/Header';
import { ContactHero } from '@/components/ContactHero/ContactHero';
import { ContactInteraction } from '@/components/ContactInteraction/ContactInteraction';
import { ContactMap } from '@/components/ContactMap/ContactMap';
import { SustainabilityAnchor } from '@/components/SustainabilityAnchor/SustainabilityAnchor';
import { Footer } from '@/components/Footer/Footer';

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactInteraction />
        <ContactMap />
        <SustainabilityAnchor />
      </main>
      <Footer />
    </>
  );
}
