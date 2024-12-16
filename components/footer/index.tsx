import {
  IconBackground,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';
import { ActionIcon, Container, Grid, Group, Image, Text } from '@mantine/core';

export function Footer() {
  return (
    <footer
      style={{
        marginTop: '80px',
        backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))',
        borderTop: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))',
      }}
    >
      <Container size={'lg'}>
        <Grid
          visibleFrom="lg"
          mb={'md'}
          style={{ paddingTop: 'calc(var(--mantine-spacing-xl) * 1.5)' }}
        >
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <ActionIcon size="lg" style={{ marginRight: '8px' }}>
                <IconBackground />
              </ActionIcon>
              <Text fw={700}>WIJAYA K</Text>
            </a>
            <Text size="xs" c="dimmed" style={{ marginTop: '5px' }}>
              Build solutions for real-world challenges
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Text ta={'end'} size="sm">
              This website is built with open-source technologies.
            </Text>
            <Group gap="md" mt="xs" justify="flex-end">
              <ActionIcon size="lg" style={{ backgroundColor: '#fff' }}>
                <Image src="tech/mantine-icon.svg" style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
              <ActionIcon size="lg" style={{ backgroundColor: '#fff' }}>
                <Image src="tech/nextjs-icon.svg" style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
              <ActionIcon size="lg" style={{ backgroundColor: '#fff' }}>
                <Image src="tech/supabase-icon.svg" style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>

        <Grid
          grow
          pt={'lg'}
          style={{
            borderTop:
              '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))',
          }}
        >
          <Grid.Col span={6}>
            <Text c="dimmed" size="sm">
              © 2024. MIT License.
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group gap={0} style={{ justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
              <a
                href="https://www.linkedin.com/in/abdul-kodir-wijaya-kusumah"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <ActionIcon size="lg" color="gray" variant="subtle">
                  <IconBrandLinkedin size={18} stroke={1.5} />
                </ActionIcon>
              </a>
              <a
                href="https://github.com/wijayakusumah"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <ActionIcon size="lg" color="gray" variant="subtle">
                  <IconBrandGithub size={18} stroke={1.5} />
                </ActionIcon>
              </a>
              <a
                href="https://www.instagram.com/abdulqodirkusumah"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <ActionIcon size="lg" color="gray" variant="subtle">
                  <IconBrandInstagram size={18} stroke={1.5} />
                </ActionIcon>
              </a>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </footer>
  );
}
