import { ActionIcon, Grid, Group, Image, SimpleGrid, Text } from '@mantine/core';

const sections = [
  {
    title: 'Project Management',
    items: [
      { src: 'tech/logic-icon.svg', alt: 'Logical Thinking', label: 'Logical Thinking', url: '' },
      { src: 'tech/communication-icon.svg', alt: 'Clear Communication', label: 'Clear Communication', url: '' },
      { src: 'tech/empathize-icon.svg', alt: 'Empathize', label: 'Empathize', url: '' },
      { src: 'tech/ownership-icon.svg', alt: 'Sense of Ownership', label: 'Sense of Ownership', url: '' },
      { src: 'tech/teach-icon.svg', alt: 'Teaching Other', label: 'Teaching Other', url: '' },
      { src: 'tech/leadership-icon.svg', alt: 'Team Leadership', label: 'Team Leadership', url: '' },
    ],
  }
];

export function HomeSoftSkill() {
  return (
    <Grid>
      {sections.map((section, index) => (
        <Grid.Col key={index} span={12}>
          <Text fz="md" fw={600} style={{ marginBottom: 'var(--mantine-spacing-md)' }}>
            {section.title}
          </Text>
          <SimpleGrid
            cols={{ base: 2, lg: 6 }}
            spacing={{ base: 10, sm: 'sm' }}
            verticalSpacing={{ base: 'md', sm: 'md' }}
            style={{
              background: '#228be6',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            {section.items.map((item, itemIndex) => (
              <Group wrap="nowrap" align="center" gap="xs" key={itemIndex}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <ActionIcon variant="white" size="lg">
                    <Image src={item.src} alt={item.alt} style={{ width: '70%', height: '70%' }} />
                  </ActionIcon>
                </a>
                <Text fz="sm" fw={600} c="#fff">
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
