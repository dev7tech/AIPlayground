import { Hero, Footer, Languages, Faq } from './components';

export default function Home() {
  return (
    <div className='flex flex-col md:h-main sm:max-h-screen'>
      <main>
        <Hero />
        <Languages />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
