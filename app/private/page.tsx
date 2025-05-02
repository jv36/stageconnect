'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import {
  Avatar, Box, Button, Typography, Modal, TextField, Stack,
  IconButton
} from '@mui/material'
import { User } from '@supabase/supabase-js'
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function PrivatePage() {
  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [description, setDescription] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [facebook, setFacebook] = useState('')

  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        redirect('/login')
      } else {
        setUser(data.user)
        setDisplayName(data.user.user_metadata?.display_name || '')
        setDescription(data.user.user_metadata?.description || '')
        setTwitter(data.user.user_metadata?.twitter || '')
        setInstagram(data.user.user_metadata?.instagram || '')
        setFacebook(data.user.user_metadata?.facebook || '')
      }
    }
    fetchUser()
  }, [])

  const handleSave = async () => {
    const { error } = await supabase.auth.updateUser({
      data: {
        display_name: displayName,
        description: description,
        twitter: twitter,
        instagram: instagram,
        facebook: facebook
      }
    })
    if (!error) {
      setUser((prev: any) => ({
        ...prev,
        user_metadata: {
          ...prev.user_metadata,
          display_name: displayName,
          description: description,
          twitter: twitter,
          instagram: instagram,
          facebook: facebook
        }
      }))
      setOpen(false)
    } else {
      console.error(error)
    }
  }

  if (!user) return null

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-roboto-condensed)]">
      <main className="flex flex-col gap-8 w-full max-w-[600px] mx-auto items-center">
        <Avatar sx={{ width: 150, height: 150 }} alt={user.user_metadata?.display_name} />
        <Box textAlign="center">
          <Typography variant="h4" fontWeight={600}>{user.user_metadata?.display_name}</Typography>
          <Typography variant="h6" fontWeight={600}>{user.email}</Typography>
          <Typography variant="h6" fontWeight={400}>
            {user.user_metadata?.description || "No description added."}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          {twitter && (
              <IconButton
                  href={`https://x.com/${twitter}`}
                  target="_blank"
              >
                  <XIcon sx={{fontSize: 30, color: '#1B003A'}}/>
              </IconButton>
          )}
          {instagram && (
              <IconButton
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"

              >
                  <InstagramIcon sx={{fontSize: 30, color: '#1B003A'}}/>
              </IconButton>
          )}
          {facebook && (
              <IconButton
                  href={`https://facebook.com/${facebook}`}
                  target="_blank"

              >
                  <FacebookIcon sx={{fontSize: 30, color: '#1B003A'}}/>
              </IconButton>
          )}
      </Stack>
        <Button variant="contained" onClick={() => setOpen(true)}>EDIT</Button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper', boxShadow: 24,
              p: 4, borderRadius: 2, minWidth: 300
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h6">Edit Profile</Typography>
              <TextField
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
              />
              <TextField
                label="Twitter (X)"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                fullWidth
              />
              <TextField
                label="Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                fullWidth
              />
              <TextField
                label="Facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={handleSave}>Save</Button>
            </Stack>
          </Box>
        </Modal>
      </main>
    </div>
  )
}
