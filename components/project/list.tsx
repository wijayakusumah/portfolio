import { Badge, Box, Card, Grid, Group, Image, Progress, Text } from '@mantine/core';

interface Project {
  id: string;
  title: string;
  position: string;
  company: string;
  status: string;
  gallery: { url: string }[];
  description: string;
  goals: string;
  from: string;
  to: string;
  type: string;
  category: string;
}

interface CardWithStatsProps {
  project: Project;
}

// Function to calculate working days excluding weekends
function calculateWorkingDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let totalDays = 0;

  // Loop through each day between the two dates
  while (start <= end) {
    const dayOfWeek = start.getDay();
    // Only count weekdays (Monday to Friday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      totalDays++;
    }
    // Move to the next day
    start.setDate(start.getDate() + 1);
  }

  return totalDays;
}

export function CardWithStats({ project }: CardWithStatsProps) {
  const progressValue = project.status === 'Completed' ? 100 : 0; // Set progress to 100% if completed, 0% if not.

  // Calculate dev time excluding weekends
  const devTime = calculateWorkingDays(project.from, project.to);

  return (
    <Card
      withBorder
      padding="lg"
      shadow="sm"
      radius="md"
      style={{ backgroundColor: 'var(--mantine-color-body)', width: '100%' }}
    >
      <Card.Section>
        {/* Display the first image from the gallery as the card cover image */}
        <Image
          src={project.gallery[0]?.url || 'https://via.placeholder.com/300'}
          alt={project.title}
          height={100}
        />
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text
          style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)', lineHeight: 1 }}
          size="sm"
          fw={700}
        >
          {project.title || 'Untitled Project'}
        </Text>
        <Group gap={5}>
          <Badge size="xs" variant="outline">
            {project.position || 'Unknown Position'}
          </Badge>
        </Group>
      </Group>
      <Text size="xs" c="dimmed">
        {project.company || 'Unknown Company'}
      </Text>

      <Box
        mt="sm"
        style={{
          borderTop: '1px solid #ddd',
          borderBottom: '1px solid #ddd',
          paddingBottom: '1rem',
        }}
      >
        {/* Project description */}
        <Text mt="sm" c="dimmed" size="xs">
          <strong>Description:</strong> {project.description || 'No description available.'}
        </Text>

        {/* Project goals */}
        <Text mt="sm" c="dimmed" size="xs">
          <strong>Goals:</strong> {project.goals || 'No goals set.'}
        </Text>
      </Box>

      <Grid>
        <Grid.Col span={4}>
          <Text mt="sm" c="dimmed" size="xs">
            Status:
          </Text>
          <Progress.Root size="xl">
            <Progress.Section value={progressValue}>
              <Progress.Label>
                {project.status === 'Completed' ? 'Completed' : 'In Progress'}
              </Progress.Label>
            </Progress.Section>
          </Progress.Root>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text mt="sm" c="dimmed" size="xs">
            Development:
          </Text>
          <Text size="xs">
            <strong>{devTime} Days</strong>
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text mt="sm" c="dimmed" size="xs">
            Working:
          </Text>
          <Text size="xs">
            <strong>{project.type}</strong>
          </Text>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
