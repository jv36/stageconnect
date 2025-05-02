'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import {
  Avatar, Box, Button, Typography, Stack
} from '@mui/material'
import { User } from '@supabase/supabase-js'
import MyCard from '@/components/MyCard' // adjust path if needed

interface Event {
  event_id: string
  event_name: string
  event_location: string
  event_date: string
  event_image: string
}

export default function FavoritesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [events, setEvents] = useState<Event[]>([])

  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        redirect('/login')
      } else {
        setUser(data.user)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchAttendingEvents = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('attending')
        .select('event_id, event_name, event_location, event_date, event_image')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching events for auth user:', error);
        return;
      }

      setEvents(data || []);
    }

    fetchAttendingEvents();
  }, [user])

  if (!user) return null

  
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-roboto-condensed)]">
      <main className="flex flex-col gap-8 w-full max-w-[800px] mx-auto items-center">
        {events.length > 0 ? (
          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
            {events.map((event) => (
              <MyCard
                key={event.event_id}
                card={{
                  id: event.event_id,
                  image: event.event_image,
                  artist: event.event_name,
                  location: event.event_location,
                  date: event.event_date,
                  seatmap: ''
                }}
              />
            ))}
          </Stack>
        ) : (
          <Typography fontWeight={600}>No events to show!</Typography>
        )}
      </main>
    </div>
  )
}
