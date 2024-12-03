import React, { useState, useEffect } from 'react';
import { Container, Paper, Text } from '@mantine/core';
import bg from './bg.svg';

export function Welcome() {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const devTypeText = [
    "<span>About Dev Quest<br/><br/>Do you want to go on an epic quest to uncover the magic of coding? Seize the chance to learn about web development and get a scholarship or an internship.</span><br/><br/><br/><span>Are you a developer?<br/> Y / N</span><br/>"
  ];

  useEffect(() => {
    // Start typing effect after 2 seconds for the rest of the text
    const typingInterval = setInterval(() => {
      if (currentIndex < devTypeText[0].length) {
        setTypedText(devTypeText[0].slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Typing speed

    return () => clearInterval(typingInterval); // Cleanup on component unmount
  }, [currentIndex]);

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
            padding: '4px',
            border: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-8))',
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
              Transforming Ideas into Tools for Positive Change
            </Text>

            {/* Always visible static text */}
            <Text fz="md" c="#fff" style={{ fontFamily: 'Courier New, monospace' }}>
              Microsoft Windows [Version 10.0.22631.4460]
            </Text>
            <Text mb="xl" fz="md" c="#fff" style={{ fontFamily: 'Courier New, monospace' }}>
              (c) Microsoft Corporation. All rights reserved.
            </Text>

            {/* Render typedText as raw HTML using dangerouslySetInnerHTML */}
            <div
              style={{
                color: '#fff',
                fontFamily: 'Courier New, monospace', // Change this to your desired font
              }}
              dangerouslySetInnerHTML={{ __html: typedText }}
            />
            <span className="blinker">&#32;</span>
          </div>

          <div
            style={{
              flex: 1,
              padding: 'var(--mantine-spacing-xl)',
              paddingLeft: 'calc(var(--mantine-spacing-xl) * 2)',
              borderLeft: 0,
            }}
          >
            <Text fz="lg" fw={700} style={{ marginBottom: 'var(--mantine-spacing-xl)' }}>
              Get in touch
            </Text>
          </div>
        </div>
      </Paper>
    </Container >
  );
}
