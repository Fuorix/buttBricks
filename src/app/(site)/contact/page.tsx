import type { Metadata } from 'next';
import { ContactHero } from '@/components/ContactHero/ContactHero';
import { ContactInteraction } from '@/components/ContactInteraction/ContactInteraction';
import { ContactMap } from '@/components/ContactMap/ContactMap';
import { SustainabilityAnchor } from '@/components/SustainabilityAnchor/SustainabilityAnchor';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Request a quote or consultation from Butt Bricks in Lahore. Call, email or send a project brief to our material experts.',
};

export default function Contact() {
  return (
    <main>
      <ContactHero />
      <ContactInteraction />
      <ContactMap />
      <SustainabilityAnchor />
    </main>
  );
}
