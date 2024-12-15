import { ContactInfo } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Welcome } from '@/components/home';
import { Project } from '@/components/project';
import { SkillList } from '@/components/skills';

export default function HomePage() {
  return (
    <>
      <Header />
      <div id="home">
        <Welcome />
      </div>
      <div id="projects">
        <Project />
      </div>
      <div id="skills">
        <SkillList />
      </div>
      <div id="contact">
        <ContactInfo />
      </div>
      <Footer />
    </>
  );
}
