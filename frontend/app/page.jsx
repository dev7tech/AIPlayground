import Dashboard from './dashboard/page';
import { Footer, Pricing, Partners, Faq } from './components';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <main>
        <Dashboard />
        <Partners />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
