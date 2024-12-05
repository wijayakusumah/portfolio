import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ShortProject } from '@/components/home/shortproject';
import { Welcome } from '../components/welcome';

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
