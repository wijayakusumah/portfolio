import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Header />
      <Welcome />
      <ColorSchemeToggle />
      <Footer />
    </>
  );
}
