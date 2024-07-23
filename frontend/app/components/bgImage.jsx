'use client';
import { motion } from 'framer-motion';

export const BgImg = ({ top }) => {
  return (
    <motion.div
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className={`w-full h-full absolute flex justify-end items-center -z-10`}
      style={{ top: `-${top}rem` }}
    >
      <div className='w-3/4 flex justify-center items-center'>
        <div className='w-12 h-[600px] bg-light blur-[100px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg]'></div>
      </div>
    </motion.div>
  );
};
