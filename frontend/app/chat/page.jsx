'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@nextui-org/input';
import { Card, CardBody } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { BtnArrowUp } from '../components';
import { api } from '@/app/services/api';

const ChatField = () => {
  const [chatHistory, setChatHistory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className='container max-w-screen-xl mx-auto'>
      <div className='relative px-4 lg:w-2/3 md:w-3/4 sm:w-full left-1/2 transform -translate-x-1/2'>
        <div
          className='flex flex-col-reverse py-4 pb-14 h-full overscroll-y-auto'
          style={{
            maxHeight: 'calc(100vh - 4rem)',
            minHeight: 'calc(100vh - 4rem)',
          }}
        >
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
        <div className='fixed bottom-[8px] -ml-4 w-full'>
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
        </div>
      </div>
    </div>
  );
};

export default ChatField;
