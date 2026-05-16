import { HeritageHero } from '@/components/HeritageHero/HeritageHero';
import { FounderVision } from '@/components/FounderVision/FounderVision';
import { LeadershipTeam } from '@/components/LeadershipTeam/LeadershipTeam';
import { Timeline } from '@/components/Timeline/Timeline';
import { AppreciationLetters } from '@/components/AppreciationLetters/AppreciationLetters';
import { ProcessBento } from '@/components/ProcessBento/ProcessBento';
import { KilnMasters } from '@/components/KilnMasters/KilnMasters';
import { Values } from '@/components/Values/Values';
import { HeritageCTA } from '@/components/HeritageCTA/HeritageCTA';

export default function Heritage() {
  return (
    <>
      <main>
        <HeritageHero />
        <FounderVision />
        <LeadershipTeam />
        <Timeline />
        <AppreciationLetters />
        <ProcessBento />
        <KilnMasters />
        <Values />
        <HeritageCTA />
      </main>
    </>
  );
}
