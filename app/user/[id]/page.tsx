import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default async function UserProfilePage({params} : any) {
  const supabase = await createClient();

  // Query the public metadata of a user by ID
  const { data, error } = await supabase
    .from('users')
    .select('id, email, display_name, description, twitter, instagram, facebook')
    .eq('id', params.id)
    .single();

  if (error || !data) {
    return notFound();
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-roboto-condensed)]">
      <main className="flex flex-col gap-8 w-full max-w-[600px] mx-auto items-center">
        <Avatar sx={{ width: 150, height: 150 }} alt={data.display_name} />
        <Box textAlign="center">
          <Typography variant="h4" fontWeight={600}>{data.display_name}</Typography>
          <Typography variant="h6" fontWeight={400}>
            {data.description || "This user hasn't written a bio yet."}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          {data.twitter && (
              <IconButton
                  href={`https://x.com/${data.twitter}`}
                  target="_blank"
              >
                  <XIcon sx={{fontSize: 30, color: '#1B003A'}}/>
              </IconButton>
          )}
          {data.instagram && (
              <IconButton
                  href={`https://instagram.com/${data.instagram}`}
                  target="_blank"

              >
                  <InstagramIcon sx={{fontSize: 30, color: '#1B003A'}}/>
              </IconButton>
          )}
          {data.facebook && (
              <IconButton
                  href={`https://facebook.com/${data.facebook}`}
                  target="_blank"

              >
                  <FacebookIcon sx={{fontSize: 30, color: '#1B003A'}}/>
              </IconButton>
          )}
      </Stack>
      </main>
    </div>
  );
}