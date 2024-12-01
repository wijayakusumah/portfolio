import { useEffect, useState } from 'react';
import { Container, SimpleGrid } from '@mantine/core';
import { fetchProjects } from '@/supabase/api/projects';
import { CardWithStats } from './list'; // Assuming this is your CardWithStats component

interface Project {
  id: string;
  title: string;
  company: string;
  position: string;
  type: string;
  status: string;
  gallery: { url: string }[];
  description: string;
  goals: string;
  from: string;
  to: string;
}

export function Project() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProjects() {
      try {
        // Replace with your actual fetching logic
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    getProjects();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (projects.length === 0) {
    return <p>No projects available</p>;
  }

  return (
    <Container size="lg" mt={100}>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        {projects.map((project) => (
          <CardWithStats key={project.id} project={project} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
