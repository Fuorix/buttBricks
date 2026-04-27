import { ContactHero } from '@/components/ContactHero/ContactHero';
import { ContactInteraction } from '@/components/ContactInteraction/ContactInteraction';
import { ContactMap } from '@/components/ContactMap/ContactMap';
import { SustainabilityAnchor } from '@/components/SustainabilityAnchor/SustainabilityAnchor';

export default function Contact() {
  return (
    <>
      <main>
        <ContactHero />
        <ContactInteraction />
        <ContactMap />
        <SustainabilityAnchor />
      </main>
    </>
  );
}
