import {
  IconBackground,
  IconBook,
  IconBrandGithub,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { ColorTheme } from './colortheme';
import classes from './index.module.css';

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Container w="lg">
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <ActionIcon size="lg" style={{ marginRight: 8 }}>
        <IconBackground />
      </ActionIcon>
      <Text fw={700}>WIJAYA K</Text>
    </a>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#home" className={classes.link}>
              Home
            </a>
            <a href="#projects" className={classes.link}>
              Projects
            </a>
            <a href="#contact" className={classes.link}>
              Contact
            </a>
          </Group>

          <Group>
            <a
              href="https://github.com/wijayakusumah/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <ActionIcon variant="default" size="lg" aria-label="Github action icon">
                <IconBrandGithub stroke="1.5" />
              </ActionIcon>
            </a>
            <ColorTheme />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="#home" className={classes.link}>
            Home
          </a>
          <a href="#projects" className={classes.link}>
            Projects
          </a>
          <a href="#contact" className={classes.link}>
            Contact
          </a>

          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
    </Container>
  );
}
