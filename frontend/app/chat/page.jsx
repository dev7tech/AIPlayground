'use client';
import React, { useState } from 'react';
import { Button } from '@nextui-org/button';
import { motion } from 'framer-motion';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { Input } from '@nextui-org/input';
import { Card, CardBody } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { BtnArrowUp } from '../components';
import { api } from '@/app/services/api';

const ChatField = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [chatHistory, setChatHistory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isValid, setIsValid] = useState(false);

  const sendMessage = async () => {
    if (!message) return;
    const tmpChat = chatHistory + `User: ${message}\n`;
    setChatHistory(tmpChat);
    setMessage('');
    setLoading(true);

    try {
      const data = await api.chatWithAI(tmpChat);
      if (data) {
        if (data.error) {
          toast.error(data.error, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          setChatHistory(data.response);
        }
      } else {
        toast.error('Failed to chat with AI. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == 'Enter') sendMessage();
  };

  const handleSaveApiKey = async (onClose) => {
    if (!apiKey) {
      toast.error('API Key cannot be empty', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      const result = await api.verifyApiKey(apiKey);
      if (result.valid) {
        localStorage.setItem('openai_api_key', apiKey);
        setIsValid(true);
        toast.success('API Key saved successfully', {
          position: 'top-right',
          autoClose: 3000,
        });
        onClose();
      } else {
        toast.error(result.error || 'Invalid API Key', {
          position: 'top-right',
          autoClose: 3000,
        });
        setApiKey('');
      }
    } catch (error) {
      toast.error('An error occurred while verifying the API key', {
        position: 'top-right',
        autoClose: 3000,
      });
      setApiKey('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container max-w-screen-xl mx-auto'>
      <div className='relative px-4 lg:w-2/3 md:w-3/4 sm:w-full left-1/2 transform -translate-x-1/2'>
        <div
          className='flex flex-col-reverse pb-14 h-full'
          style={{
            maxHeight: 'calc(100vh - 4rem)',
            minHeight: 'calc(100vh - 4rem)',
          }}
        >
          <div className='pr-[4px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-auto block max-h-screen'>
            {chatHistory.length > 0
              ? chatHistory.split('\n').map((chatmsg, index) =>
                  chatmsg ? (
                    <div
                      key={index}
                      className={`flex pb-2 ${
                        index % 2 == 0 ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <Card className='lg:max-w-1/2 md:max-w-2/3 sm:max-w-full p-1 rounded-2'>
                        <CardBody
                          className={`p-2 ${
                            index % 2 == 0 ? 'text-right' : 'text-left'
                          }`}
                        >
                          {chatmsg.split(':')[1]}
                        </CardBody>
                      </Card>
                    </div>
                  ) : (
                    ''
                  ),
                )
              : ''}
          </div>
        </div>
        <div className='fixed bottom-[8px] -ml-4 w-full'>
          {isValid ? (
            <div className='w-full px-4 relative'>
              <Input
                type='text'
                placeholder='Type a message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <BtnArrowUp onPress={sendMessage} disabled={loading} />
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} className='text-center'>
              <Button onPress={onOpen} color='primary' variant='solid'>
                Get Started
              </Button>
              <Modal
                isOpen={isOpen}
                placement='center'
                onOpenChange={onOpenChange}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className='flex flex-col gap-1'>
                        Input your Open AI Api Key
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          type='text'
                          placeholder='sk-proj-'
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color='primary'
                          variant='flat'
                          onPress={() => handleSaveApiKey(onClose)}
                          disabled={loading}
                        >
                          OK
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatField;
