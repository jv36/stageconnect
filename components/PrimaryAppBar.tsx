'use client'
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { logout } from '@/app/login/actions';
import { useRouter } from 'next/navigation';
import allCountryCodes from '@/utils/countryCodes';
import LogoutIcon from '@mui/icons-material/Logout';

// Define the CountryOption interface
interface CountryOption {
  name: string;
  code: string;
}

export default function PrimaryAppBar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [selectedCountry, setSelectedCountry] = React.useState<CountryOption | null>(
    allCountryCodes.find(c => c.code === 'CZ') || null
  );

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    router.push("/private");
    handleMenuClose();
  };

  const handleSearch = (
    event: React.SyntheticEvent, 
    value: CountryOption | null
  ) => {
    if (value && value.code) {
      // Navigate to the home page with the country code
      router.push(`/?country=${value.code}`);
    }
  };

  // Handle when user presses Enter in the search field
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && selectedCountry?.code) {
      router.push(`/?country=${selectedCountry.code}`);
    }
  };

  // Handle app title click to go back to home
  const handleTitleClick = () => {
    router.push('/');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => {
        handleMobileMenuClose();
        router.push('/private');
      }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
            <MenuItem onClick={logout}>
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
            onClick={handleTitleClick}
          >
            StageConnect
          </Typography>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
              },
              marginRight: 2,
              marginLeft: 0,
              width: '100%',
            }}
          >
            <Box
              sx={{
                padding: '0 16px',
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >
              <SearchIcon />
            </Box>
            <Autocomplete<CountryOption, false, false, false>
              options={allCountryCodes as CountryOption[]}
              getOptionLabel={(option: CountryOption) => `${option.name} (${option.code})`}
              value={selectedCountry}
              onChange={(event, newValue: CountryOption | null) => {
                setSelectedCountry(newValue);
                handleSearch(event, newValue);
              }}
              onKeyDown={handleKeyDown}
              sx={{
                color: 'inherit',
                width: '100%',
                '& .MuiInputBase-root': {
                  color: 'inherit',
                  padding: '8px 8px 8px 0',
                  paddingLeft: 'calc(1em + 32px)',
                  transition: (theme) => theme.transitions.create('width'),
                  width: '100%',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiAutocomplete-endAdornment': {
                  display: 'none', // Hide the dropdown arrow
                },
                '& .MuiInputLabel-root': {
                  color: (theme) => alpha(theme.palette.common.white, 0.7),
                },
                '& .MuiInputBase-input::placeholder': {
                  color: (theme) => alpha(theme.palette.common.white, 0.7),
                  opacity: 1,
                },
              }}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  placeholder="Search for a country…"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    'aria-label': 'search',
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}