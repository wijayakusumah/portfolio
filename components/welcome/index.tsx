import React, { useEffect, useState } from 'react';
import { Container, Paper, Text } from '@mantine/core';
import bg from './bg.svg';

// Fungsi wait untuk delay asinkron
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function Welcome() {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogIndex, setDialogIndex] = useState(0);
  const commandPrefix = 'C:\\users\\client> ';

  const devTypeText = [
    {
      command: 'Please tell me about yourself?',
      response:
        'My name is Abdul Kodir Wijaya K, born in Purwakarta. I have 3+ years of experience in system development.',
    },
    {
      command: 'Please list your projects?',
      response: 'I am passionate about tech and human. Many projects I built to automate systems.',
    },
    {
      command: 'Please show your contact?',
      response: 'You can contact Wijaya via phone, email, and social media.',
    },
  ];

  // Fungsi pengetikan dengan async/await
  const typeText = async () => {
    for (let i = 0; i < devTypeText.length; i++) {
      // Mengetikkan command dengan prefix
      await typeCommand(devTypeText[i].command);

      // Mengetikkan enter setelah command
      await typeEnter();

      // Jeda sebelum mengetikkan response
      await wait(1000); // Jeda 1 detik

      // Mengetikkan response
      await typeResponse(devTypeText[i].response);

      // Mengetikkan enter setelah response
      await typeEnter();

      // Mengetikkan enter setelah response
      await typeEnter();

      // Jeda setelah response selesai
      await wait(2000); // Jeda 2 detik sebelum pindah ke dialog berikutnya
    }
  };

  // Mengetikkan command dengan prefix
  const typeCommand = async (command) => {
    setTypedText((prev) => prev + `<strong>${commandPrefix}</strong>`); // Tambahkan prefix
    await wait(500); // Delay sedikit sebelum mengetik command

    for (let i = 0; i < command.length; i++) {
      setTypedText((prev) => prev + command[i]);
      await wait(100); // Kecepatan pengetikan 100ms per karakter
    }
  };

  // Mengetikkan enter (newline)
  const typeEnter = async () => {
    setTypedText((prev) => prev + '\n');
    await wait(500); // Jeda sedikit sebelum melanjutkan
  };

  // Mengetikkan response
  const typeResponse = async (response) => {
    for (let i = 0; i < response.length; i++) {
      setTypedText((prev) => prev + response[i]);
      await wait(100); // Kecepatan pengetikan 100ms per karakter
    }
  };

  useEffect(() => {
    typeText(); // Jalankan pengetikan otomatis saat komponen pertama kali dimuat
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
              Transforming Ideas into Tools for Positive Change
            </Text>

            <Text fz="md" c="#fff" style={{ fontFamily: 'Courier New, monospace' }}>
              Microsoft Windows [Version 10.0.22631.4460]
            </Text>
            <Text mb="xl" fz="md" c="#fff" style={{ fontFamily: 'Courier New, monospace' }}>
              (c) Microsoft Corporation. All rights reserved.
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
    </Container>
  );
}
