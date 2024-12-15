import { IconAt, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react';
import { Box, Stack, Text } from '@mantine/core';
import classes from './info.module.css';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon size={24} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text size="md" className={classes.description}>
          {description}
        </Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: 'Email', description: 'abdulkodirwijayakusumah@gmail.com', icon: IconAt },
  { title: 'Phone', description: '+62 813 1614 9820', icon: IconPhone },
  { title: 'Address', description: 'Purwakarta, West Java, Indonesia, 41175', icon: IconMapPin },
  { title: 'Available', description: '07:00 – 20:00', icon: IconSun },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />);
  return <Stack>{items}</Stack>;
}
