import { ActionIcon, Grid, Group, Image, SimpleGrid, Text } from '@mantine/core';

const sections = [
  {
    title: 'Soft Skill',
    description:
      'With strong problem-solving, communication, and leadership skills, I drive successful teamwork and ensure that projects align with business objectives, delivering meaningful results.',
    items: [
      { src: 'tech/logic-icon.svg', alt: 'Logical Thinking', label: 'Logical Thinking', url: '' },
      {
        src: 'tech/communication-icon.svg',
        alt: 'Clear Communication',
        label: 'Clear Communication',
        url: '',
      },
      { src: 'tech/empathize-icon.svg', alt: 'Empathize', label: 'Empathize', url: '' },
      {
        src: 'tech/ownership-icon.svg',
        alt: 'Sense of Ownership',
        label: 'Sense of Ownership',
        url: '',
      },
      { src: 'tech/teach-icon.svg', alt: 'Teaching Other', label: 'Teaching Other', url: '' },
      {
        src: 'tech/leadership-icon.svg',
        alt: 'Team Leadership',
        label: 'Team Leadership',
        url: '',
      },
    ],
  },
];

export function HomeSoftSkill() {
  return (
    <Grid>
      {sections.map((section, index) => (
        <Grid.Col key={index} span={12}>
          <Text fz="md" fw={600} style={{ marginTop: 'var(--mantine-spacing-md)' }}>
            {section.title}
          </Text>
          <Text fz="sm" style={{ marginBottom: 'var(--mantine-spacing-md)' }}>
            {section.description}
          </Text>
          <SimpleGrid
            cols={{ base: 2, lg: 6 }}
            spacing={{ base: 10, sm: 'sm' }}
            verticalSpacing={{ base: 'md', sm: 'md' }}
            style={{
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            {section.items.map((item, itemIndex) => (
              <Group wrap="nowrap" align="center" gap="xs" key={itemIndex}>
                <ActionIcon
                  size="lg"
                  style={{
                    backgroundColor:
                      'light-dark(var(--mantine-color-gray-2), var(--mantine-color-white))',
                  }}
                >
                  <Image src={item.src} alt={item.alt} style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
                <Text fz="sm" fw={600}>
                  {item.label}
                </Text>
              </Group>
            ))}
          </SimpleGrid>
        </Grid.Col>
      ))}
    </Grid>
  );
}
