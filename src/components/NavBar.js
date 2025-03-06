import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Typography,
  Box
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountTree as FlowIcon,
  Settings as SettingsIcon,
  Extension as IntegrationsIcon
} from '@mui/icons-material';

const drawerWidth = 240;

function NavBar() {
  const location = useLocation();
  
  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/'
    },
    {
      text: 'Flow Builder',
      icon: <FlowIcon />,
      path: '/flows'
    },
    {
      text: 'Integrations',
      icon: <IntegrationsIcon />,
      path: '/integrations'
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings'
    }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6" component="div">
          No-Code AI
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Assistant Builder
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <Divider />
      <Box sx={{ padding: '12px', textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Version 0.1.0
        </Typography>
      </Box>
    </Drawer>
  );
}

export default NavBar;
