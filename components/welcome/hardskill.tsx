import { ActionIcon, Grid, Group, Image, SimpleGrid, Text } from '@mantine/core';

const sections = [
  {
    title: 'Project Management Tools',
    description: 'I have hands-on experience managing projects, making sure everything runs smoothly from start to finish. I use tools that help keep things organized, track progress, and ensure team collaboration so that we can hit deadlines without a hitch.',
    color: "",
    items: [
      { src: 'tech/visio-icon.svg', alt: 'MS Visio', label: 'MS Visio', url: 'https://www.microsoft.com/en-us/microsoft-365/visio/flowchart-software' },
      { src: 'tech/jira-icon.svg', alt: 'Atlassian Jira', label: 'Atlassian Jira', url: 'https://www.atlassian.com/software/jira' },
    ],
  },
  {
    title: 'Office 365 Development',
    description: 'I’m skilled at creating customized solutions within the Office 365 suite to help teams work smarter, automate repetitive tasks, and improve collaboration. It’s all about making everyday work easier and more efficient.',
    color: "",
    items: [
      { src: 'tech/sharepoint-icon.svg', alt: 'Sharepoint', label: 'Sharepoint', url: 'https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration' },
      { src: 'tech/powerautomate-icon.svg', alt: 'Power Automate', label: 'Power Automate', url: 'https://powerautomate.microsoft.com/' },
      { src: 'tech/powerapps-icon.svg', alt: 'Power Apps', label: 'Power Apps', url: 'https://powerapps.microsoft.com/' },
      { src: 'tech/powerbi-icon.svg', alt: 'Power BI', label: 'Power BI', url: 'https://powerbi.microsoft.com/' },
      { src: 'tech/admin-icon.svg', alt: 'MS Admin', label: 'MS Admin', url: 'https://admin.microsoft.com/' },
      { src: 'tech/activedirectory-icon.svg', alt: 'Active Directory', label: 'Active Directory', url: 'https://azure.microsoft.com/en-us/products/active-directory/' },
    ],
  },
  {
    title: 'Software Development Tech',
    description: 'I’ve built a strong foundation in full-stack development, using modern frameworks and databases to create scalable, user-friendly applications. Whether it’s frontend, backend, or database management, I’ve got the tools to bring ideas to life.',
    color: "",
    items: [
      { src: 'tech/nodejs-icon.svg', alt: 'Node.js', label: 'Node.js', url: 'https://nodejs.org/' },
      { src: 'tech/expressjs-icon.svg', alt: 'Express.js', label: 'Express.js', url: 'https://expressjs.com/' },
      { src: 'tech/nextjs-icon.svg', alt: 'Next.js', label: 'Next.js', url: 'https://nextjs.org/' },
      { src: 'tech/mantine-icon.svg', alt: 'Mantine UI', label: 'Mantine UI', url: 'https://mantine.dev/' },
      { src: 'tech/bootstrap-icon.svg', alt: 'Bootstrap', label: 'Bootstrap', url: 'https://getbootstrap.com/' },
      { src: 'tech/supabase-icon.svg', alt: 'Supabase', label: 'Supabase', url: 'https://supabase.com/' },
      { src: 'tech/strapi-icon.svg', alt: 'Strapi', label: 'Strapi', url: 'https://strapi.io/' },
      { src: 'tech/python-icon.svg', alt: 'Python', label: 'Python', url: 'https://www.python.org/' },
      { src: 'tech/selenium-icon.svg', alt: 'Selenium', label: 'Selenium', url: 'https://www.selenium.dev/' },
      { src: 'tech/mysql-icon.svg', alt: 'MySQL', label: 'MySQL', url: 'https://www.mysql.com/' },
      { src: 'tech/postgresql-icon.svg', alt: 'PostgreSQL', label: 'PostgreSQL', url: 'https://www.postgresql.org/' },
      { src: 'tech/sqlserver-icon.svg', alt: 'MS SQL Server', label: 'MS SQL Server', url: 'https://www.microsoft.com/sql-server' },
      { src: 'tech/wordpress-icon.svg', alt: 'Wordpress', label: 'Wordpress', url: 'https://wordpress.org/' },
      { src: 'tech/jetengine-icon.svg', alt: 'Crocoblock JetEngine', label: 'Crocoblock JetEngine', url: 'https://crocoblock.com/plugins/jetengine/' },
      { src: 'tech/elementor-icon.svg', alt: 'Elementor Builder', label: 'Elementor Builder', url: 'https://elementor.com/' },
      { src: 'tech/cpanel-icon.svg', alt: 'Cpanel', label: 'Cpanel', url: 'https://cpanel.net/' },
      { src: 'tech/plesk-icon.svg', alt: 'Plesk', label: 'Plesk', url: 'https://www.plesk.com/' },
      { src: 'tech/docker-icon.svg', alt: 'Docker', label: 'Docker', url: 'https://www.docker.com/' },
      { src: 'tech/github-icon.svg', alt: 'GitHub', label: 'GitHub', url: 'https://github.com/' },
      { src: 'tech/postman-icon.svg', alt: 'Postman', label: 'Postman', url: 'https://www.postman.com/' },
    ],
  },
  {
    title: 'IT Infrastructure',
    description: 'I have a solid background in managing IT infrastructure, from setting up servers and networks to troubleshooting hardware and software issues. Keeping systems running smoothly and efficiently is my top priority.',
    color: "",
    items: [
      { src: 'tech/server-icon.svg', alt: 'Onpremise Windows Server', label: 'Onpremise Windows Server', url: 'https://www.microsoft.com/en-us/windows-server' },
      { src: 'tech/accessdomain-icon.svg', alt: 'Onpremise Access Domain', label: 'Onpremise Access Domain', url: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-domain-services' },
      { src: 'tech/switch-icon.svg', alt: 'LAN Switch', label: 'LAN Switch', url: 'https://www.cisco.com/c/en/us/products/switches/what-is-a-network-switch.html' },
      { src: 'tech/hub-icon.svg', alt: 'LAN Hub', label: 'LAN Hub', url: 'https://en.wikipedia.org/wiki/Ethernet_hub' },
      { src: 'tech/router-icon.svg', alt: 'LAN AP Router', label: 'LAN AP Router', url: 'https://en.wikipedia.org/wiki/Wireless_router' },
      { src: 'tech/firewall-icon.svg', alt: 'LAN Firewall', label: 'LAN Firewall', url: 'https://en.wikipedia.org/wiki/Firewall_(computing)' },
      { src: 'tech/printer-icon.svg', alt: 'Printer', label: 'Printer', url: 'https://en.wikipedia.org/wiki/Printer_(computing)' },
      { src: 'tech/cctv-icon.svg', alt: 'CCTV', label: 'CCTV', url: 'https://en.wikipedia.org/wiki/Closed-circuit_television' },
      { src: 'tech/pc-icon.svg', alt: 'PC Troubleshoot', label: 'PC Troubleshoot', url: 'https://support.microsoft.com/en-us' },
    ],
  },
  {
    title: 'Engineering Design',
    description: 'I’m also passionate about engineering design, using advanced CAD and modeling tools to create precise and innovative designs. Whether it’s for 3D models or engineering applications, I focus on quality and creativity.',
    color: "",
    items: [
      { src: 'tech/autocad-icon.svg', alt: 'Autodesk AutoCAD', label: 'Autodesk AutoCAD', url: 'https://www.autodesk.com/products/autocad/overview' },
      { src: 'tech/fusion-icon.svg', alt: 'Autodesk Fusion 360', label: 'Autodesk Fusion 360', url: 'https://www.autodesk.com/products/fusion-360/overview' },
      { src: 'tech/solidedge-icon.svg', alt: 'Siemens Solid Edge', label: 'Siemens Solid Edge', url: 'https://www.plm.automation.siemens.com/global/en/products/solid-edge/' },
      { src: 'tech/maxsurf-icon.svg', alt: 'Bentley Maxsurf', label: 'Bentley Maxsurf', url: 'https://www.bentley.com/software/maxsurf/' },
      { src: 'tech/arcgis-icon.svg', alt: 'Esri Arcgis', label: 'Esri Arcgis', url: 'https://www.esri.com/en-us/arcgis/products/index' },
    ],
  },
];

export function HomeHardSkill() {
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
