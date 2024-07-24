'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { toast } from 'react-toastify';
import { api } from '@/app/services/api';
// import ClipLoader from 'react-spinners/ClipLoader';
import Image from 'next/image';
import UserImg from '@/app/assets/img/User.jpg';

const WearGlasses = () => {
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [generatedImageSrc, setGeneratedImageSrc] = useState(null);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
    }
  };

  const wearGlassesOnImage = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    api.wearGlasses(formData).then((url) => {
      if (url) {
        setGeneratedImageSrc(url);
      } else {
        toast.error('Failed to upload image. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    });
  };

  return (
    <div className='relative justify-center items-center'>
      <div className='max-w-screen-xl mx-auto px-4 pt-16 pb-8 gap-12 md:px-8 flex flex-col justify-center items-center'>
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
          className='flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center'
        >
          <h2 className='text-4xl font-extrabold mx-auto md:text-4xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text'>
            Wear{' '}
            <span className='bg-gradient-to-t from-light to-foreground text-transparent bg-clip-text border-none'>
              Glasses
            </span>{' '}
            to your face
          </h2>
        </motion.div>
        <motion.div className='container mx-auto p-4'>
          <div className='grid grid-cols-2 gap-3'>
            <div className='relative flex-col justify-center text-center'>
              <div className='m-auto xl:w-2/3 lg:w-3/4 md:w-4/5 sm:w-full'>
                <div className='relative w-full pt-[100%]'>
                  <Image
                    src={imageSrc ? imageSrc : UserImg}
                    alt='Upload your image.'
                    fill={true}
                    sizes='(max-width: 1200px) 100%'
                    priority={true}
                    className='absolute left-0 top-0 w-full h-full object-center object-cover'
                  />
                </div>
              </div>
              <Button
                onPress={handleButtonClick}
                color='primary'
                variant='solid'
                className='mt-4'
              >
                Upload Your Image
              </Button>
              <Input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
              />
            </div>
            <div className='relative flex-col justify-center text-center'>
              <div className='m-auto xl:w-2/3 lg:w-3/4 md:w-4/5 sm:w-full'>
                <div className='relative w-full pt-[100%]'>
                  <Image
                    src={generatedImageSrc ? generatedImageSrc : UserImg}
                    alt='Generated image.'
                    fill={true}
                    sizes='(max-width: 1200px) 100%'
                    priority={true}
                    className='absolute left-0 top-0 w-full h-full object-center object-cover'
                  />
                </div>
              </div>
              <Button
                onPress={wearGlassesOnImage}
                color='primary'
                variant='solid'
                className='mt-4'
              >
                Wear Glasses
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WearGlasses;
