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
import { GoogleGenAI } from "@google/genai";
import SliderCarousel from '@/components/Carousel'

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI });


export default function RecomPage() {
  const [user, setUser] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [description, setDescription] = useState('')
  const [twitter, setTwitter] = useState('')
  const [instagram, setInstagram] = useState('')
  const [facebook, setFacebook] = useState('')
  const [reply, setReply] = useState<string | undefined>('')
  const [artistInput, setArtistInput] = useState<string>('')
  const [fittingGenre, setFittingGenre] = useState<string | undefined>('')

  const classifications = ['Pop', 'Rock', 'Electronic', 'Classical', 'Alternative', 'Country', 'World', 'Metal', 'Rap', 'Jazz'];


  const supabase = createClient()

  async function fetchFittingGenre() {
    if (!artistInput) {
      setFittingGenre('Please enter an artist.');
      return;
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Based on the following list of music genres: ${classifications.join(', ')}, what is the most fitting genre for the artist: ${artistInput}? Just return the single most fitting genre.`,
    });
    setFittingGenre(response.text?.trim());
  }


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

  if (!user) return null

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-roboto-condensed)]">
      <main className="flex flex-col gap-8 w-full max-w-[600px] mx-auto items-center">
        <Typography className="stage-logo" color="primary" variant="h4" style={{}}>GigFinder</Typography>
        <Typography align='center'>Tell us an artist you like. Our AI will get you the best concerts based on your choice. Easy, right?</Typography>
        <TextField
          value={artistInput}
          onChange={(e) => setArtistInput(e.target.value)}
          label="Artist Name"
          variant="outlined"
          fullWidth
        />
        <Button onClick={fetchFittingGenre} variant="contained" color="primary">Find Gigs</Button>
        
        {fittingGenre && (
          <>
          <Typography variant="h6" mt={2}>
                      Most fitting genre: <span style={{ fontWeight: 'bold' }}>{fittingGenre}</span>
            </Typography>
            <SliderCarousel
                          requestParams={{
                              sort: 'random',
                              classificationName: fittingGenre
                          }} /></>
        )}
      </main>
    </div>
  )
}