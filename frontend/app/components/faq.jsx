'use client';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Faq = () => {
  const faqContent = [
    {
      question: 'How does the glasses-wearing feature work?',
      answer:
        'Our application uses advanced facial recognition and augmented reality technology to wear glasses to your face. Simply upload your picture, and the glasses will appear on your face on the picture.',
    },
    {
      question: 'How can I get started to chat with AI?',
      answer:
        'Super easy. Simply input your Open AI Api Key in the input field on the right, and then you can start chatting with AI.',
    },
    {
      question: 'What kind of AI do you use for chat?',
      answer:
        'Our chat feature is powered by a state-of-the-art language model developed by OpenAI. It can understand and generate human-like responses to a wide range of questions and prompts.',
    },
    {
      question: 'Do I need any special hardware to use this app?',
      answer:
        'No special hardware is required. As long as you have an internet connection, you can use all features of our app.',
    },
  ];
  return (
    <section className='relative max-w-screen-xl mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center'>
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className='flex flex-col gap-3 justify-center items-center'
      >
        <h4 className='text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text'>
          FAQ
        </h4>
        <p className='max-w-xl text-foreground/80 text-center'>
          Here are some of our frequently asked questions. If you have any other
          questions you’d like answered please feel free to contact{' '}
          <Link
            href='mailto:jacob.devtech102@gmail.com'
            className='text-primary underline'
          >
            me
          </Link>
          .
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1 }}
        className='max-w-2xl w-full border border-foreground/50 rounded-md p-1'
      >
        <Accordion
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: 'auto',
                transition: {
                  height: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: 'ease',
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                transition: {
                  height: {
                    easings: 'ease',
                    duration: 0.25,
                  },
                  opacity: {
                    easings: 'ease',
                    duration: 0.3,
                  },
                },
              },
            },
          }}
        >
          {faqContent.map((faq, index) => (
            <AccordionItem
              key={index}
              aria-label={faq.question}
              title={faq.question}
            >
              {faq.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
      <div className='absolute w-40 h-40 border bg-light -left-28 top-0 blur-[200px]'></div>
    </section>
  );
};
