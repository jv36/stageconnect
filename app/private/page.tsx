import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Avatar, Box, Button, Typography } from '@mui/material'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-start min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 w-full max-w-[600px] mx-auto items-center">
        <Avatar sx={{ width: 150, height: 150 }} alt={data.user.email}></Avatar>
        <Box alignItems="center" alignContent="center">
          <Typography align="center" variant='h4' fontWeight={600}>{data.user.user_metadata?.display_name}</Typography>
          <Typography align="center" variant='h6' fontWeight={600}>{data.user.email}</Typography>
          <Typography align="center" variant='h6' fontWeight={400}>I love music and concerts, hope I can find alike-minded people here!</Typography>
        </Box>
        <Button variant="contained">
          EDIT
        </Button>
      </main>
    </div>
  );
}