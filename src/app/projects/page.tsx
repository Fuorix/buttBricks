import { Header } from '@/components/Header/Header';
import { ProjectsHeader } from '@/components/ProjectsHeader/ProjectsHeader';
import { ProjectsFilter } from '@/components/ProjectsFilter/ProjectsFilter';
import { ProjectsGrid } from '@/components/ProjectsGrid/ProjectsGrid';
import { ProjectsStats } from '@/components/ProjectsStats/ProjectsStats';
import { ProjectsCTA } from '@/components/ProjectsCTA/ProjectsCTA';
import { Footer } from '@/components/Footer/Footer';

export default function Projects() {
  return (
    <>
      <Header />
      <main>
        <ProjectsHeader />
        <ProjectsFilter />
        <ProjectsGrid />
        <ProjectsStats />
        <ProjectsCTA />
      </main>
      <Footer />
    </>
  );
}
