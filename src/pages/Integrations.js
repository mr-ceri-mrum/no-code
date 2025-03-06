import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import TelegramIntegration from '../components/integrations/TelegramIntegration';
import OpenAIIntegration from '../components/integrations/OpenAIIntegration';

function Integrations() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Integrations
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure external service integrations
        </Typography>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="integration tabs">
            <Tab label="Messaging" />
            <Tab label="AI Services" />
            <Tab label="Storage" />
            <Tab label="Other" />
          </Tabs>
        </Box>

        {/* Messaging Tab */}
        {activeTab === 0 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TelegramIntegration />
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    WhatsApp Integration
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Connect your WhatsApp Business API to create WhatsApp bots.
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Coming soon...
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Web Chat Widget
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Embed an AI chat widget on your website.
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Coming soon...
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* AI Services Tab */}
        {activeTab === 1 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <OpenAIIntegration />
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Anthropic Claude Integration
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Connect Anthropic Claude API for advanced AI capabilities.
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Coming soon...
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Google Gemini Integration
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Connect Google Gemini API for additional AI models.
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Coming soon...
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Storage Tab */}
        {activeTab === 2 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Local Storage
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Your data is currently stored in your browser's local storage.
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">
                      Data is stored locally in your browser
                    </Typography>
                    <Button variant="outlined" color="warning">
                      Clear Data
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Cloud Storage
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Store your flows and configurations in the cloud.
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Coming soon...
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Other Tab */}
        {activeTab === 3 && (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Custom API Integration
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Connect to any REST API endpoint.
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Coming soon...
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Webhook Integration
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Trigger webhooks from your flows.
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Coming soon...
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Integrations;
