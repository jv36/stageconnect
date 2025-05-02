'use client'

import * as React from 'react';
import { useRouter } from 'next/navigation';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useEffect } from 'react';

export default function BottomNav() {
  const [value, setValue] = React.useState('/');
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/${newValue === '' ? '' : newValue}`);
  };
  
  /*
  useEffect(() => {
    router.prefetch('/private');
    router.prefetch('/favorites');
  }, []);
  */
  

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      borderTop: '1px solid #ddd',
      backgroundColor: '#1b003a'
    }}>
      <BottomNavigation
        sx={{ width: '100%', backgroundColor: '#1b003a'}}
        value={value}
        onChange={handleChange}
        color='primary'
      >
        <BottomNavigationAction label="Home" value="" icon={<HomeIcon />} sx={{
            color: 'secondary.main',
            '&.Mui-selected': {
              color: 'primary.contrastText', // color for selected
            },
          }}/>
        <BottomNavigationAction sx={{
            color: 'secondary.main',
            '&.Mui-selected': {
              color: 'primary.contrastText', // color for selected
            },
          }} label="My Concerts" value="favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction sx={{
            color: 'secondary.main',
            '&.Mui-selected': {
              color: 'primary.contrastText', // color for selected
            },
          }} label="Profile" value="private" icon={<AccountBoxIcon />} />
      </BottomNavigation>
    </div>
  );
}
