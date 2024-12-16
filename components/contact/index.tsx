// ContactInfo.tsx
import { useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react'; // Importing icons
import {
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { notifications, showNotification } from '@mantine/notifications';
import { postContact } from '@/supabase/api/contact';
import bg from './bg.svg';
import { ContactIconsList } from './info';
import classes from './index.module.css';

export function ContactInfo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate if all fields are filled
    if (!name || !email || !subject || !message) {
      // Show an error notification for missing fields
      showNotification({
        title: 'Error!',
        message: 'All fields are required. Please fill in all fields.',
        color: 'red',
        icon: <IconX style={{ width: 18, height: 18 }} />,
        autoClose: 2000,
      });
      return; // Prevent form submission
    }

    // Show the initial loading notification
    const id = Math.random().toString(36).substring(7); // Create a unique ID for the notification
    notifications.show({
      id,
      loading: true,
      title: 'Sending your message',
      message: 'Please wait, your message is being sent.',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      setIsLoading(true);
      const formData = { name, email, subject, message };
      const data = await postContact(formData); // Send data to Supabase
      setIsLoading(false);

      // Update notification after message is sent successfully
      notifications.update({
        id,
        color: 'teal',
        title: 'Message sent successfully',
        message: 'Your message was sent. We will get back to you soon.',
        icon: <IconCheck style={{ width: 18, height: 18 }} />,
        loading: false,
        autoClose: 5000, // Close after 2 seconds
      });

      console.log('Data submitted:', data); // Optional: log data
    } catch (error) {
      setIsLoading(false);

      // Update notification if there was an error
      notifications.update({
        id,
        color: 'red',
        title: 'Error sending message',
        message: 'There was an issue sending your message. Please try again.',
        icon: <IconX style={{ width: 18, height: 18 }} />,
        loading: false,
        autoClose: 5000, // Close after 2 seconds
      });

      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container
      size="lg"
      mt={80}
      style={{
        display: 'flex',
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center', // Centers vertically
      }}
    >
      <Paper shadow="md" radius="lg" w={'100%'}>
        <div className={classes.wrapper}>
          <div className={classes.contacts} style={{ backgroundImage: `url(${bg.src})` }}>
            <Text fz="lg" fw={700} className={classes.title} c="#fff">
              Contact information
            </Text>
            <ContactIconsList />
          </div>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Text fz="lg" fw={700} className={classes.title}>
              Get in touch
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput
                  label="Your name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextInput
                  label="Your email"
                  placeholder="hello@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </SimpleGrid>

              <TextInput
                mt="md"
                label="Subject"
                placeholder="Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <Textarea
                mt="md"
                label="Your message"
                placeholder="Please include all relevant information"
                minRows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Group justify="flex-end" mt="md">
                <Button type="submit" className={classes.control} loading={isLoading}>
                  Send message
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
