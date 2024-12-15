import { useEffect, useState } from 'react';
import { IconFilter } from '@tabler/icons-react';
import { Button, Card, Container, Flex, MultiSelect, SimpleGrid, Text } from '@mantine/core';
import { fetchCategory } from '@/supabase/api/category';
import { fetchCompany } from '@/supabase/api/company';
import { fetchPosition } from '@/supabase/api/position';
import { fetchProjects } from '@/supabase/api/projects';
import { fetchStatus } from '@/supabase/api/status';
import { fetchType } from '@/supabase/api/type';
import { CardWithStats } from './list';

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

interface Company {
  id: string;
  title: string;
  short: string;
}

interface Category {
  id: string;
  title: string;
}

interface Position {
  id: string;
  title: string;
}

interface Status {
  id: string;
  title: string;
}

interface Type {
  id: string;
  title: string;
}

export function Project() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [types, setTypes] = useState<Type[]>([]); // Added state for types
  const [statuses, setStatuses] = useState<Status[]>([]); // Added state for statuses
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [companyFilter, setCompanyFilter] = useState<string[]>([]);
  const [positionFilter, setPositionFilter] = useState<string[]>([]);

  useEffect(() => {
    async function getProjectsAndCompanies() {
      try {
        // Fetch projects
        const projectData = await fetchProjects();
        setProjects(projectData);

        // Fetch companies
        const companyData = await fetchCompany();
        setCompanies(companyData);

        // Fetch categories, positions, statuses, and types
        const categoryData = await fetchCategory();
        setCategories(categoryData);

        const positionData = await fetchPosition();
        setPositions(positionData);

        const statusData = await fetchStatus();
        setStatuses(statusData);

        const typeData = await fetchType();
        setTypes(typeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    getProjectsAndCompanies();
  }, []);

  const filteredProjects = projects
    .filter((project) => {
      const companyMatch = companyFilter.length === 0 || companyFilter.includes(project.company);
      const categoryMatch =
        categoryFilter.length === 0 || categoryFilter.includes(project.category);
      const positionMatch =
        positionFilter.length === 0 || positionFilter.includes(project.position);

      return companyMatch && categoryMatch && positionMatch;
    })
    .sort((a, b) => new Date(b.to).getTime() - new Date(a.to).getTime());

  // Function to clear all filters
  const clearFilters = () => {
    setStatusFilter([]);
    setTypeFilter([]);
    setCategoryFilter([]);
    setCompanyFilter([]);
    setPositionFilter([]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (projects.length === 0) {
    return <p>No projects available</p>;
  }

  return (
    <Container size="lg" mt={60}>
      <Text fz="lg" fw={700}>
        Showcasing Projects That{' '}
        <span
          style={{
            background: 'linear-gradient(to right, #ff4c4c, #2575fc)', // Red to Blue gradient
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Deliver Real-World
        </span>{' '}
        Impact
      </Text>
      <Text fz="sm" style={{ marginBottom: 'var(--mantine-spacing-xl)' }}>
        A curated collection of projects that showcase my expertise in developing high-impact
        solutions, transforming business processes, and driving efficiency across various
        industries.
      </Text>
      <Card mb="xl" padding="lg" radius="md" withBorder>
        <Text fz="md" fw={700} ta={'center'} style={{ marginBottom: 'var(--mantine-spacing-sm)' }}>
          PROJECTS FILTER
        </Text>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, sm: 'lg' }}
          verticalSpacing={{ base: 'md', sm: 'sm' }}
        >
          {/* Company Multi-Select Filter */}
          <MultiSelect
            label="Company"
            placeholder="Select Company"
            value={companyFilter}
            onChange={setCompanyFilter}
            data={companies.map((company) => ({
              value: company.title,
              label: company.title,
            }))}
            clearable
          />

          {/* Category Multi-Select Filter */}
          <MultiSelect
            label="Category"
            placeholder="Select Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            data={categories.map((category) => ({
              value: category.title,
              label: category.title,
            }))}
            clearable
          />

          {/* Position Multi-Select Filter */}
          <MultiSelect
            label="Position"
            placeholder="Select Position"
            value={positionFilter}
            onChange={setPositionFilter}
            data={positions.map((position) => ({
              value: position.title,
              label: position.title,
            }))}
            clearable
          />

          <Flex align="flex-end">
            <Button
              onClick={clearFilters}
              variant="light"
              leftSection={<IconFilter size={14} />}
              w="100%"
            >
              Clear All Filters
            </Button>
          </Flex>
        </SimpleGrid>
      </Card>

      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 10, sm: 'lg' }}
        verticalSpacing={{ base: 'md', sm: 'lg' }}
      >
        {filteredProjects.map((project) => (
          <CardWithStats key={project.id} project={project} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
