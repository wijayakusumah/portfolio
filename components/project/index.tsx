import { useEffect, useState } from 'react';
import { Box, Container, Group, MultiSelect, SimpleGrid } from '@mantine/core';
import { fetchCompany } from '@/supabase/api/company'; // Ensure this imports correctly
import { fetchProjects } from '@/supabase/api/projects'; // Ensure this imports correctly

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

interface Company {
  id: string;
  title: string;
  short: string;
}

export function Project() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]); // State for companies
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string[]>([]); // Changed to array for multi-select
  const [typeFilter, setTypeFilter] = useState<string[]>([]); // Changed to array for multi-select
  const [companyFilter, setCompanyFilter] = useState<string[]>([]); // New state for company filter

  useEffect(() => {
    async function getProjectsAndCompanies() {
      try {
        // Fetch projects
        const projectData = await fetchProjects();
        setProjects(projectData);

        // Fetch companies
        const companyData = await fetchCompany();
        setCompanies(companyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    getProjectsAndCompanies();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const statusMatch = statusFilter.length === 0 || statusFilter.includes(project.status);
    const typeMatch = typeFilter.length === 0 || typeFilter.includes(project.type);
    const companyMatch = companyFilter.length === 0 || companyFilter.includes(project.company);
    return statusMatch && typeMatch && companyMatch;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (projects.length === 0) {
    return <p>No projects available</p>;
  }

  return (
    <Container size="lg" mt={100}>
      {/* Filtering Controls Section */}
      <Box mb="lg">
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
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

          {/* Status Multi-Select Filter */}
          <MultiSelect
            label="Status"
            placeholder="Select Status"
            value={statusFilter}
            onChange={setStatusFilter}
            data={[
              { value: 'Completed', label: 'Completed' },
              { value: 'On Progress', label: 'On Progress' },
            ]}
            clearable
          />

          {/* Type Multi-Select Filter */}
          <MultiSelect
            label="Type"
            placeholder="Select Type"
            value={typeFilter}
            onChange={setTypeFilter}
            data={[
              { value: 'Team', label: 'Team' },
              { value: 'Solo', label: 'Solo' },
            ]}
            clearable
          />
        </SimpleGrid>
      </Box>

      {/* Projects Display Section */}
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        {filteredProjects.map((project) => (
          <CardWithStats key={project.id} project={project} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
