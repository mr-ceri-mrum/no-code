import React from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  CardActions
} from '@mui/material';
import {
  Memory as AIIcon,
  Chat as ChatIcon,
  Send as SendIcon,
  Add as AddIcon
} from '@mui/icons-material';

function Dashboard() {
  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create and manage your AI assistants
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
        >
          Create New Assistant
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Example Assistant Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AIIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  Customer Support Bot
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Automated customer service assistant
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ChatIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  123 conversations today
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SendIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  Telegram, Web
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
              <Button size="small">Analytics</Button>
              <Button size="small" color="error">Delete</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Example Assistant Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AIIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  Sales Assistant
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Lead qualification and product information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ChatIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  56 conversations today
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SendIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  Telegram
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
              <Button size="small">Analytics</Button>
              <Button size="small" color="error">Delete</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Create New Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
              border: '1px dashed rgba(25, 118, 210, 0.4)',
              cursor: 'pointer'
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <AddIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" color="primary">
                Create New Assistant
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Build a custom AI assistant
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
