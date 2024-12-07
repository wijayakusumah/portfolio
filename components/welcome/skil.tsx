import { ActionIcon, Grid, Group, Image, SimpleGrid, Text } from '@mantine/core';

const sections = [
  {
    title: 'Software Development Tech',
    items: [
      { src: 'tech/nodejs-icon.svg', alt: 'Node.js', label: 'Node.js' },
      { src: 'tech/expressjs-icon.svg', alt: 'Express.js', label: 'Express.js' },
      { src: 'tech/nextjs-icon.svg', alt: 'Next.js', label: 'Next.js' },
      { src: 'tech/mantine-icon.svg', alt: 'Mantine UI', label: 'Mantine UI' },
      { src: 'tech/bootstrap-icon.svg', alt: 'Bootstrap', label: 'Bootstrap' },
      { src: 'tech/supabase-icon.svg', alt: 'Supabase', label: 'Supabase' },
      { src: 'tech/python-icon.svg', alt: 'Python', label: 'Python' },
      { src: 'tech/selenium-icon.svg', alt: 'Selenium', label: 'Selenium' },
      { src: 'tech/mysql-icon.svg', alt: 'MySQL', label: 'MySQL' },
      { src: 'tech/postgresql-icon.svg', alt: 'PostgreSQL', label: 'PostgreSQL' },
      { src: 'tech/sqlserver-icon.svg', alt: 'MS SQL Server', label: 'MS SQL Server' },
      { src: 'tech/docker-icon.svg', alt: 'Docker', label: 'Docker' },
      { src: 'tech/wordpress-icon.svg', alt: 'Wordpress', label: 'Wordpress' },
      {
        src: 'tech/jetengine-icon.svg',
        alt: 'Crocoblock JetEngine',
        label: 'Crocoblock JetEngine',
      },
      { src: 'tech/elementor-icon.svg', alt: 'Elementor Builder', label: 'Elementor Builder' },
      { src: 'tech/cpanel-icon.svg', alt: 'Cpanel', label: 'Cpanel' },
      { src: 'tech/plesk-icon.svg', alt: 'Plesk', label: 'Plesk' },
      { src: 'tech/github-icon.svg', alt: 'GitHub', label: 'GitHub' },
    ],
  },
  {
    title: 'Office 365 Development',
    items: [
      { src: 'tech/sharepoint-icon.svg', alt: 'Sharepoint', label: 'Sharepoint' },
      { src: 'tech/powerautomate-icon.svg', alt: 'Power Automate', label: 'Power Automate' },
      { src: 'tech/powerapps-icon.svg', alt: 'Power Apps', label: 'Power Apps' },
      { src: 'tech/powerbi-icon.svg', alt: 'Power BI', label: 'Power BI' },
      { src: 'tech/admin-icon.svg', alt: 'MS Admin', label: 'MS Admin' },
      { src: 'tech/activedirectory-icon.svg', alt: 'Active Directory', label: 'Active Directory' },
    ],
  },
  {
    title: 'Project Management',
    items: [
      { src: 'tech/visio-icon.svg', alt: 'MS Visio', label: 'MS Visio' },
      { src: 'tech/jira-icon.svg', alt: 'Atlassian Jira', label: 'Atlassian Jira' },
    ],
  },
  {
    title: 'Infrastructure',
    items: [
      {
        src: 'tech/server-icon.svg',
        alt: 'Onpremise Windows Server',
        label: 'Onpremise Windows Server',
      },
      {
        src: 'tech/accessdomain-icon.svg',
        alt: 'Onpremise Access Domain Server',
        label: 'Onpremise Access Domain Server',
      },
      { src: 'tech/switch-icon.svg', alt: 'LAN Switch', label: 'LAN Switch' },
      { src: 'tech/hub-icon.svg', alt: 'LAN Hub', label: 'LAN Hub' },
      { src: 'tech/router-icon.svg', alt: 'LAN AP Router', label: 'LAN AP Router' },
      { src: 'tech/firewall-icon.svg', alt: 'LAN Firewall', label: 'LAN Firewall' },
    ],
  },
];

export function HomeSkill() {
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
                <ActionIcon variant="white" size="lg">
                  <Image src={item.src} alt={item.alt} style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
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
