import {
  IconArrowRight,
  IconAt,
  IconCheck,
  IconCopy,
  IconDownload,
  IconFileTypePdf,
  IconLocation,
  IconPhoneCall,
} from '@tabler/icons-react';
import { ActionIcon, Avatar, Button, CopyButton, Grid, Group, Text, Tooltip } from '@mantine/core';
import { createClient } from '@/supabase/client';

export function AboutMe() {
  const downloadResume = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from('uploads') // 'avatars' is the bucket name
      .download('Abdul-Kodir-Wijaya-Kusumah-Resume.pdf'); // Path to the resume

    if (error) {
      console.error('Error downloading file:', error.message);
      return;
    }

    // Create a link to download the file
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abdul-Kodir-Wijaya-Kusumah-Resume.pdf'; // Specify the filename
    a.click();
    window.URL.revokeObjectURL(url); // Clean up the URL object
  };
  return (
    <>
      <Grid m={{ base: '0', lg: 40 }} mt={{ base: 40, lg: 40 }} mb={{ base: 40, lg: 40 }}>
        <Grid.Col span={{ base: 12, lg: 5 }}>
          <div>
            <Group wrap="wrap">
              <Avatar
                src="https://hhixtgpvsutjqogroeuv.supabase.co/storage/v1/object/public/uploads/photo.jpg"
                size={94}
                radius="md"
              />
              <div>
                <Text
                  style={{
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  Abdul Kodir Wijaya Kusumah
                </Text>

                <Group wrap="nowrap" gap={5} mt={3}>
                  <IconAt
                    stroke={1.5}
                    size={16}
                    style={{
                      color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))',
                    }}
                  />
                  <Text style={{ fontSize: '0.75rem', color: 'var(--mantine-color-dimmed)' }}>
                    abdulkodirwijayakusumah@gmail.com
                  </Text>
                  <CopyButton value="abdulkodirwijayakusumah@gmail.com" timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                        <ActionIcon
                          color={copied ? 'teal' : 'gray'}
                          variant="subtle"
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck style={{ width: 16 }} />
                          ) : (
                            <IconCopy style={{ width: 16 }} />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>

                {/* Phone Number */}
                <Group wrap="nowrap" gap={5}>
                  <IconPhoneCall
                    stroke={1.5}
                    size={16}
                    style={{
                      color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))',
                    }}
                  />
                  <Text style={{ fontSize: '0.75rem', color: 'var(--mantine-color-dimmed)' }}>
                    +62 813 1614 9820
                  </Text>
                  <CopyButton value="081316149820" timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                        <ActionIcon
                          color={copied ? 'teal' : 'gray'}
                          variant="subtle"
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck style={{ width: 16 }} />
                          ) : (
                            <IconCopy style={{ width: 16 }} />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>

                {/* Address */}
                <Group wrap="nowrap" gap={5}>
                  <IconLocation
                    stroke={1.5}
                    size={16}
                    style={{
                      color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))',
                    }}
                  />
                  <Text style={{ fontSize: '0.75rem', color: 'var(--mantine-color-dimmed)' }}>
                    Purwakarta, Indonesia, 41118
                  </Text>
                  <CopyButton
                    value="https://www.google.com/maps/place/Jl.+Kutilang+3+No.24,+Ciseureuh,+Kec.+Purwakarta,+Kabupaten+Purwakarta,+Jawa+Barat+41118,+Indonesia/@-6.5260818,107.450795,18.75z/data=!4m6!3m5!1s0x2e690e742becc37f:0x5265312d8cfde99a!8m2!3d-6.5261185!4d107.4502523!16s%2Fg%2F11pkjbz251!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
                    timeout={2000}
                  >
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                        <ActionIcon
                          color={copied ? 'teal' : 'gray'}
                          variant="subtle"
                          onClick={copy}
                        >
                          {copied ? (
                            <IconCheck style={{ width: 16 }} />
                          ) : (
                            <IconCopy style={{ width: 16 }} />
                          )}
                        </ActionIcon>
                      </Tooltip>
                    )}
                  </CopyButton>
                </Group>
              </div>
            </Group>
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 'auto' }}>
          <Button
            fullWidth
            leftSection={<IconFileTypePdf size={14} />}
            rightSection={<IconDownload size={14} />}
            onClick={downloadResume}
          >
            Download My Resume
          </Button>
          <Text fw={700} ta={'center'} m={5}>
            Or
          </Text>
          <Button
            variant="light"
            fullWidth
            leftSection={<IconFileTypePdf size={14} />}
            rightSection={<IconArrowRight size={14} />}
            component="a"
            href="https://hhixtgpvsutjqogroeuv.supabase.co/storage/v1/object/public/uploads/Abdul-Kodir-Wijaya-Kusumah-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Online My Resume
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}
