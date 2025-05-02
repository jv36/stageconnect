'use client';

import { useEventStore } from '@/store/useEventStore';
import { useParams } from 'next/navigation';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';



export default function EventPage() {
  const { id } = useParams();
  const event = useEventStore((state) => state.selectedEvent);
  const supabase = createClient();
  const router = useRouter();

  const [open, setOpen] = useState(false);  // State to control modal visibility
  const [isGoing, setIsGoing] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [attendanceCount, setAttendanceCount] = useState<number>(0);


  const [attendingUsers, setAttendingUsers] = useState<any[]>([]);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserId(user.id);

      const { data, error } = await supabase
        .from('attending')
        .select('*')
        .eq('user_id', user.id)
        .eq('event_id', id)
        .maybeSingle();

      const { count } = await supabase
          .from('attending')
          .select('*', { count: 'exact', head: true })
          .eq('event_id', id);

      setAttendanceCount(count ?? 0);


      if (data) setIsGoing(true);
    };
    fetchData();
  }, [id, supabase]);


  const fetchAttendingUsers = async () => {
    const { data, error } = await supabase
      .from('attending')
      .select('user_id, users (id, display_name)')
      .eq('event_id', id);
  
    if (error) {
      console.error('Error fetching attendees:', error);
      return;
    }
  
    const users = data.map((record) => record.users); // extract users
    setAttendingUsers(users);
    setAttendanceModalOpen(true);
  };
  

  const toggleGoing = async () => {
    if (!userId) return;

    if (isGoing) {
      // Remove attendance
      await supabase
        .from('attending')
        .delete()
        .eq('user_id', userId)
        .eq('event_id', id);
      setIsGoing(false);
    } else {
      const {error} = await supabase.from('attending').insert({
        user_id: userId,
        event_id: id,
        event_name: event?.artist,
        event_location: event?.location,
        event_date: event?.date,
        event_image: event?.image
      });
      if (error) {
        console.error('Insert error:', error.message);
      }
      
      setIsGoing(true);
    }
  };



  if (!event) {
    return <p>Loading or no event data available.</p>;
  }

  const handleSeatmap = () => {
    setOpen(true);  // Open the modal
  };

  const handleClose = () => {
    setOpen(false);  // Close the modal
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-roboto-condensed)]">
      <main className="flex flex-col gap-8 w-full max-w-[600px] mx-auto items-center">
        <Image
          src={event.image}
          alt={event.artist}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          style={{
            objectFit: 'cover',
            maxWidth: '600px',
            borderRadius: 15
          }}
        />
        <Typography variant='h4' align="center" fontWeight={600}>{event.artist}</Typography>

        <Box display="flex" flexDirection="column" gap={0.5}>
          <Typography align="center" variant="h5" fontWeight={500}>
            {event.date}
          </Typography>
          <Typography align="center" variant="h5" fontWeight={500}>
            {event.location}
          </Typography>
        </Box>
        <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={2}>
          <Avatar sx={{ width: 60, height: 60 }}></Avatar>
          <Avatar sx={{ width: 60, height: 60 }}></Avatar>
          <Avatar sx={{ width: 60, height: 60 }}></Avatar>
          <Button
            variant="contained"
            onClick={fetchAttendingUsers}
            sx={{ alignSelf: 'center', height: 'auto' }} // Center the button vertically
          >
            {attendanceCount} are going
          </Button>
        </Stack>


        <Stack display="flex" flexDirection="row" gap={2}>
          <Button sx={{borderRadius: 3}} variant="contained" color={isGoing ? 'secondary' : 'primary'} onClick={toggleGoing}>
              {isGoing ? "I'M NOT GOING" : "I'M GOING!"}
          </Button>
          <Button sx={{borderRadius: 3}} variant='contained' >GROUP CHAT</Button>
          <Button sx={{borderRadius: 3}} variant='contained' onClick={handleSeatmap}>SEATMAP</Button>
        </Stack>
      </main>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Image
            src={event.seatmap}
            alt="Seatmap"
            width={600}
            height={400}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={attendanceModalOpen} onClose={() => setAttendanceModalOpen(false)}>
        <DialogTitle>People Going</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {attendingUsers.map((user) => (
              <Button
                key={user.id}
                variant="text"
                onClick={() => router.push(`/user/${user.id}`)}
              >
                {user.display_name || user.id}
              </Button>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAttendanceModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
