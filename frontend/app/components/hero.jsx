'use client';
import { Button } from '@nextui-org/button';
import { motion } from 'framer-motion';
import { Link } from '@nextui-org/link';

export const Hero = () => {
  return (
    <div className='relative justify-center items-center'>
      <section>
        <div className='max-w-screen-xl mx-auto px-4 py-32 gap-12 md:px-8 flex flex-col justify-center items-center'>
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{ duration: 0.5 }}
            className='flex flex-col justify-center items-center max-w-4xl mx-auto text-center'
          >
            <h1 className='text-4xl font-extrabold mx-auto md:text-5xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text'>
              Welcome to{' '}
              <span className='bg-gradient-to-t from-light to-foreground text-transparent bg-clip-text border-none'>
                AI Playground
              </span>
            </h1>
            <h2 className='mt-4 text-1xl font-extrabold mx-auto md:text-2xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text'>
              Wear Glasses To Your Face And Chat With AI
            </h2>
            <div className='mt-12 items-center justify-center gap-x-3 sm:flex sm:space-y-0'>
              <Button as={Link} href='/image' color='primary' variant='solid'>
                Let's Have Fun
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
