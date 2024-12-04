import { useEffect, useState } from 'react';
import { Button, Container, SimpleGrid } from '@mantine/core';
import { fetchProjects } from '@/supabase/api/projects';
import { CardWithStats } from '../project/list';
import { IconAffiliateFilled, IconCategoryPlus, IconDeviceIpadCheck, IconDeviceIpadHorizontalCheck, IconShieldCheckFilled } from '@tabler/icons-react';

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
        <Container size="lg" mt={100}>

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
