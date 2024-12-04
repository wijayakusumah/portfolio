import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Welcome } from '../components/welcome';
import { ShortProject } from '@/components/home/shortproject';

export default function HomePage() {
  return (
    <>
      <Header />
      <Welcome />
      <ShortProject />
      <Footer />
    </>
  );
}
