import { useEffect, useState } from 'react';
import { Button, Container, SimpleGrid, Text } from '@mantine/core';
import { fetchProjects } from '@/supabase/api/projects';
import { CardWithStats } from '../project/list';
import { IconCategoryPlus } from '@tabler/icons-react';

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
    category: string;
}

export function ShortProject() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProjectsAndCompanies() {
            try {
                // Fetch projects
                const projectData = await fetchProjects();
                setProjects(projectData);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        getProjectsAndCompanies();
    }, []);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (projects.length === 0) {
        return <p>No projects available</p>;
    }

    return (
        <Container size="lg" mt={60}>
            <Text
                fz="xl"
                fw={700}
                style={{
                    marginBottom: 'calc(var(--mantine-spacing-md))',
                    fontFamily: 'Greycliff CF, var(--mantine-font-family)',
                }}
            >
                PROJECT LIST
            </Text>
            <Text fz="md" style={{ marginBottom: 'var(--mantine-spacing-xl)' }}>
                Below are some of the key projects I have worked on, each designed to create meaningful and positive change. These initiatives reflect my commitment to innovation, collaboration, and sustainability. Every project serves as a testament to my ability to transform ideas into impactful solutions.
            </Text>

            <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
                mb={50}
            >
                {projects.slice(0, 6).map((project) => (
                    <CardWithStats key={project.id} project={project} />
                ))}
            </SimpleGrid>

            <Button
                leftSection={<IconCategoryPlus size={16} />}
                fullWidth
                component="a"
                href="/projects"
            >
                Show All Projects
            </Button>
        </Container>
    );
}
