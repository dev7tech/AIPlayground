import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { NavBar, BgImg } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Playground',
  description: 'Wear Glasses, Chat With AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <BgImg top='20' />
          <NavBar />
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
