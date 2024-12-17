import { Container, Paper, Text } from '@mantine/core';
import { HomeHardSkill } from './hardskill';
import { HomeSoftSkill } from './softskil';

export function SkillList() {
  return (
    <Container
      size="lg"
      mt={80}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        shadow="md"
        radius="lg"
        w="100%"
        pr={20}
        pl={20}
        pb={40}
        pt={40}
        style={{
          backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-5))',
          border: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-3))',
        }}
      >
        <Text fz="lg" fw={700}>
          Building a Foundation of{' '}
          <span
            style={{
              background: 'linear-gradient(to right, #ff4c4c, #2575fc)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Technical and Personal
          </span>{' '}
          Excellence
        </Text>
        <Text fz="sm" style={{ marginBottom: 'var(--mantine-spacing-xl)' }}>
          I combine expertise in project management, Office 365 development, system development, IT
          infrastructure, and engineering design to create practical, all-in-one solutions that
          solve real-world business problems. My goal is to help businesses run more smoothly, save
          time, and grow faster by improving processes, boosting collaboration, and unlocking new
          opportunities. I focus on delivering real value that helps businesses meet their goals
          today, while also preparing them for the challenges of tomorrow.
        </Text>
        <HomeSoftSkill />
        <HomeHardSkill />
      </Paper>
    </Container>
  );
}
