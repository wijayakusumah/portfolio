import React, { useEffect, useState } from 'react';
import {
  IconBrandGithub,
  IconBrandMantine,
  IconBrandNextjs,
  IconBrandOpenai,
  IconBrandSupabase,
} from '@tabler/icons-react';
import { ActionIcon, Container, Flex, Grid, Group, Image, Paper, Text } from '@mantine/core';
import bg from '../../public/pages/bg.svg';
import { HomeSkill } from './skil';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function Welcome() {
  const [typedText, setTypedText] = useState('');
  const commandPrefix = 'C:\\users\\client> ';

  const devTypeText = [
    {
      command: 'Tell me about your journey?',
      response:
        'I`m Abdul Kodir Wijaya K, a passionate developer from Purwakarta. With over 3 years of experience, I thrive on creating innovative, impactful solutions.',
    },
    {
      command: 'What kind of projects do you work on?',
      response:
        'I specialize in building systems that automate and optimize processes, always aiming to improve efficiency and user experience.',
    },
    {
      command: 'How can we get in touch?',
      response:
        'Feel free to connect with me through phone, email, or social media. I’m open to collaborations and exciting opportunities.',
    },
  ];

  const typeText = async () => {
    for (let i = 0; i < devTypeText.length; i++) {
      await typeCommand(devTypeText[i].command);
      await typeEnter();
      await wait(1000);
      await typeResponse(devTypeText[i].response);
      await typeEnter();
      await wait(1000);
    }
  };

  const typeCommand = async (command) => {
    setTypedText((prev) => prev + '\n' + `<strong>${commandPrefix}</strong>`);
    await wait(2000);
    for (let i = 0; i < command.length; i++) {
      setTypedText((prev) => prev + command[i]);
      await wait(100);
    }
  };

  const typeEnter = async () => {
    setTypedText((prev) => prev + '\n');
    await wait(500);
  };

  const typeResponse = async (response) => {
    for (let i = 0; i < response.length; i++) {
      setTypedText((prev) => prev + response[i]);
      await wait(100);
    }
  };

  useEffect(() => {
    typeText();
  }, []);

  return (
    <Container
      size="lg"
      mt={100}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper shadow="md" radius="lg" w="100%">
        <div
          style={{
            display: 'flex',
            backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))',
            borderRadius: 'var(--mantine-radius-lg)',
            padding: '8px',
            border:
              '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-8))',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              position: 'relative',
              borderRadius: 'var(--mantine-radius-lg)',
              backgroundImage: `url(${bg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid transparent',
              padding: 'var(--mantine-spacing-xl)',
              flex: '0 0 0',
            }}
          >
            <Text
              fz="xl"
              fw={700}
              style={{
                color: '#fff',
                marginBottom: 'calc(var(--mantine-spacing-xl) * 2)',
                fontFamily: 'Greycliff CF, var(--mantine-font-family)',
              }}
            >
              TRANSFORMING IDEAS INTO TOOLS FOR POSITIVE CHANGE
            </Text>

            <Text fz="md" c="#fff" style={{ fontFamily: 'Courier New, monospace' }}>
              Wijaya Portfolio [Version 1.0.0.0]
            </Text>
            <Text mb="xl" fz="md" c="#fff" style={{ fontFamily: 'Courier New, monospace' }}>
              (c) Wijaya. All rights reserved.
            </Text>

            {/* Render typedText */}
            <div
              style={{
                color: '#fff',
                fontFamily: 'Courier New, monospace',
                whiteSpace: 'pre-wrap',
              }}
              dangerouslySetInnerHTML={{ __html: typedText }}
            />
            <span className="blinker">&#32;</span>
          </div>

          <div
            style={{
              flex: 1,
              padding: 'var(--mantine-spacing-lg)',
              borderLeft: 0,
            }}
          >
            <Text fz="md" style={{ marginBottom: 'var(--mantine-spacing-md)' }}>
              Dear All,
            </Text>
            <Text fz="md" style={{ marginBottom: 'var(--mantine-spacing-xl)' }}>
              Welcome to my portfolio, where creativity meets innovation. Each project is a
              testament to my passion for technology and my commitment to building solutions that
              make a difference. Using the best open-source tools available, I craft experiences
              that are both scalable and user-friendly.
            </Text>
            <Text fz="lg" fw={700} style={{ marginBottom: 'var(--mantine-spacing-xl)' }}>
              This website is built with the power of{' '}
              <span
                style={{
                  background: 'linear-gradient(to right, #ff4c4c, #2575fc)', // Red to Blue gradient
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                open-source
              </span>{' '}
              technologies.
            </Text>
            <HomeSkill />
          </div>
        </div>
      </Paper>
    </Container>
  );
}
