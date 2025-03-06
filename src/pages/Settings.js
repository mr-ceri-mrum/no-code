import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Divider,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardActions,
  Alert,
  Snackbar,
  Tabs,
  Tab
} from '@mui/material';

function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAIKey, setOpenAIKey] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSaveAPISettings = () => {
    // Here would be the logic to save the API key
    setSaveSuccess(true);
  };

  const handleCloseSnackbar = () => {
    setSaveSuccess(false);
  };

  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure your application settings
        </Typography>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="settings tabs">
            <Tab label="General" />
            <Tab label="API Keys" />
            <Tab label="Appearance" />
            <Tab label="Advanced" />
          </Tabs>
        </Box>

        {/* General Settings Tab */}
        {activeTab === 0 && (
          <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                General Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Application Name"
                    variant="outlined"
                    defaultValue="My AI Assistant"
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Default Language"
                    variant="outlined"
                    defaultValue="English"
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable auto-save"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Show flow preview in dashboard"
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained">Save Changes</Button>
              </Box>
            </Paper>
          </Box>
        )}

        {/* API Keys Tab */}
        {activeTab === 1 && (
          <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                API Keys
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  OpenAI API Configuration
                </Typography>
                <TextField
                  fullWidth
                  label="API Key"
                  variant="outlined"
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                  type="password"
                  placeholder="sk-..."
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Organization ID (optional)"
                  variant="outlined"
                  margin="normal"
                />
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="contained" 
                    onClick={handleSaveAPISettings}
                    disabled={!openAIKey}
                  >
                    Save API Settings
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />
              
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Other Integrations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure other API integrations in the Integrations page.
                </Typography>
              </Box>
            </Paper>

            <Snackbar
              open={saveSuccess}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                API settings saved successfully!
              </Alert>
            </Snackbar>
          </Box>
        )}

        {/* Appearance Tab */}
        {activeTab === 2 && (
          <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Appearance Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Dark Mode"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Show animations"
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained">Save Changes</Button>
              </Box>
            </Paper>
          </Box>
        )}

        {/* Advanced Tab */}
        {activeTab === 3 && (
          <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Advanced Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Alert severity="warning" sx={{ mb: 3 }}>
                These settings are for advanced users. Incorrect configuration may affect application performance.
              </Alert>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Max Tokens per Request"
                    variant="outlined"
                    defaultValue="2048"
                    margin="normal"
                    type="number"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Request Timeout (ms)"
                    variant="outlined"
                    defaultValue="30000"
                    margin="normal"
                    type="number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Enable debug mode"
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained">Save Changes</Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Settings;
