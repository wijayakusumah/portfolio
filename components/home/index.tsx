import React, { useEffect, useState } from 'react';
import { Container, Paper, Text } from '@mantine/core';
import bg from '../../public/pages/bg.svg';
import { AboutMe } from '../about';

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
            backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-5))',
            borderRadius: 'var(--mantine-radius-lg)',
            padding: '8px',
            border:
              '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-3))',
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
              fz="lg"
              fw={700}
              style={{
                color: '#fff',
                marginBottom: 'calc(var(--mantine-spacing-xl) * 2)',
                fontFamily: 'Greycliff CF, var(--mantine-font-family)',
              }}
            >
              TRANSFORMING IDEAS INTO TOOLS FOR POSITIVE CHANGE
            </Text>

            <Text fz="sm" c="#fff" style={{ fontFamily: 'Courier New, monospace' }}>
              Wijaya Portfolio [Version 1.0.0.0]
            </Text>
            <Text mb="xl" fz="md" c="#fff" style={{ fontFamily: 'Courier New, monospace' }}>
              (c) Wijaya. All rights reserved.
            </Text>

            {/* Render typedText */}
            <div
              style={{
                fontSize: '14px',
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
            <Text fz="sm" style={{ marginBottom: 'var(--mantine-spacing-md)' }}>
              Dear All,
            </Text>
            <Text fz="md" fw="700" style={{ marginBottom: 'var(--mantine-spacing-md)' }}>
              Welcome to my portfolio,
            </Text>
            <Text fz="sm">
              My passion for technology began at the age of 8 in 2005 and has shaped my career ever
              since. I specialize in creating efficient systems and automating processes to solve
              real-world challenges. Each project in this portfolio highlights my hands-on approach
              and multidisciplinary skills. By leveraging the best tools and technologies, I aim to
              deliver solutions that are both scalable and user-friendly.
            </Text>
            <Text fz="sm">
              Thank you for visiting, and I hope my work inspires new possibilities.
            </Text>

            <AboutMe />
          </div>
        </div>
      </Paper>
    </Container>
  );
}
