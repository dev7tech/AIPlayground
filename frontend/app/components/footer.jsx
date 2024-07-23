import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';
import { Github, Twitter } from 'lucide-react';
export const Footer = () => {
  return (
    <footer className='pt-24'>
      <div className='max-w-screen-xl mx-auto px-4 md:px-8'>
        <Divider />
        <div className='flex justify-between items-center py-10'>
          <p className='font-light'>
            Made by{' '}
            <a
              href='https://jacobarmstrong102.vercel.app'
              target='_blank'
              className='font-medium'
            >
              DevTech
            </a>
          </p>
          <a href='https://github.com/dev7tech/AIPlayground' target='_blank'>
            <Button isIconOnly variant='light'>
              <Github size={24} />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
};
