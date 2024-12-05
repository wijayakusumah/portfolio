import {
  IconBrandGithub,
  IconBrandMantine,
  IconBrandNextjs,
  IconBrandOpenai,
  IconBrandSupabase,
} from '@tabler/icons-react';
import { ActionIcon, Container, Flex, Grid, Group, Image, Paper, Text } from '@mantine/core';

export function HomeSkill() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
        <Text fz="md" fw={600} style={{ marginBottom: 'var(--mantine-spacing-md)' }}>
          Backend and Frontend Tech
        </Text>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
          p={10}
          mih={50}
          bg="blue"
          wrap="wrap"
          style={{
            border: '2px solid rgba(0, 0, 0, 0)',
            borderRadius: '8px',
          }}
        >
          <Group align="center" gap="xs">
            <ActionIcon variant="white" size="lg">
              <Image
                src="tech/nodejs-icon.svg"
                alt="Supabase"
                style={{ width: '70%', height: '70%' }}
              />
            </ActionIcon>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Supabase
            </Text>
          </Group>
          <Group align="center" gap="xs">
            <ActionIcon variant="white" size="lg">
              <Image
                src="tech/nextjs-icon.svg"
                alt="Supabase"
                style={{ width: '70%', height: '70%' }}
              />
            </ActionIcon>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Supabase
            </Text>
          </Group>
          <Group align="center" gap="xs">
            <ActionIcon variant="white" size="lg">
              <Image
                src="tech/mantine-icon.svg"
                alt="Supabase"
                style={{ width: '70%', height: '70%' }}
              />
            </ActionIcon>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Supabase
            </Text>
          </Group>
        </Flex>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>
        <Text fz="md" fw={600} style={{ marginBottom: 'var(--mantine-spacing-md)' }}>
          Code management and assisstant
        </Text>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
          p={10}
          mih={50}
          bg="blue"
          wrap="wrap"
          style={{
            border: '2px solid rgba(0, 0, 0, 0)',
            borderRadius: '8px',
          }}
        >
          <Group align="center" gap="xs">
            <ActionIcon variant="white" size="lg">
              <Image
                src="tech/github-icon.svg"
                alt="Supabase"
                style={{ width: '70%', height: '70%' }}
              />
            </ActionIcon>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Supabase
            </Text>
          </Group>
          <Group align="center" gap="xs">
            <ActionIcon variant="white" size="lg">
              <Image
                src="tech/openai-icon.svg"
                alt="Supabase"
                style={{ width: '70%', height: '70%' }}
              />
            </ActionIcon>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Supabase
            </Text>
          </Group>
          <Group align="center" gap="xs">
            <ActionIcon variant="white" size="lg">
              <Image
                src="tech/docker-icon.svg"
                alt="Supabase"
                style={{ width: '70%', height: '70%' }}
              />
            </ActionIcon>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              Supabase
            </Text>
          </Group>
        </Flex>
      </Grid.Col>
    </Grid>
  );
}
