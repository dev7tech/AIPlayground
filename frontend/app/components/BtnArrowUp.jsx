'use client';
import { Button } from '@nextui-org/button';
import { FaArrowUp } from 'react-icons/fa';

export const BtnArrowUp = ({ onPress, disabled }) => {
  return (
    <Button
      auto
      color='primary'
      className='absolute min-w-0 p-0 rounded-[50%] w-[2rem] h-[2rem] right-[20px] bottom-[4px]'
      onPress={onPress}
      disabled={disabled}
    >
      <FaArrowUp />
    </Button>
  );
};
