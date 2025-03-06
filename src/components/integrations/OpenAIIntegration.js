import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Grid,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Stack,
  Slider,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Api as ApiIcon,
  Check as CheckIcon,
  Info as InfoIcon,
  SettingsBackupRestore as ResetIcon
} from '@mui/icons-material';
import openaiService from '../../services/openaiService';

function OpenAIIntegration() {
  const [apiKey, setApiKey] = useState('');
  const [orgId, setOrgId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  
  // Model settings
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('openai_settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setApiKey(settings.apiKey || '');
        setOrgId(settings.orgId || '');
        setSelectedModel(settings.model || 'gpt-4o');
        setTemperature(settings.temperature || 0.7);
        setMaxTokens(settings.maxTokens || 1000);
        setTopP(settings.topP || 1);
        setFrequencyPenalty(settings.frequencyPenalty || 0);
        setPresencePenalty(settings.presencePenalty || 0);
        setIsConnected(settings.connected || false);
      } catch (err) {
        console.error('Error loading saved settings:', err);
      }
    }
  }, []);

  const saveSettings = (connected = isConnected) => {
    const settings = {
      apiKey,
      orgId,
      model: selectedModel,
      temperature,
      maxTokens,
      topP,
      frequencyPenalty,
      presencePenalty,
      connected
    };
    
    localStorage.setItem('openai_settings', JSON.stringify(settings));
  };

  const handleConnect = async () => {
    if (!apiKey) {
      setErrorMessage('Please enter an API key');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Use our browser-compatible OpenAI service
      const isValid = await openaiService.validateKey(apiKey, orgId);
      
      if (isValid) {
        setIsConnected(true);
        setSuccessMessage('Successfully connected to OpenAI API!');
        saveSettings(true);
      }
    } catch (error) {
      setErrorMessage('Failed to connect to OpenAI API. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetDefaults = () => {
    setTemperature(0.7);
    setMaxTokens(1000);
    setTopP(1);
    setFrequencyPenalty(0);
    setPresencePenalty(0);
  };

  const handleSaveSettings = () => {
    saveSettings();
    setSuccessMessage('Settings saved successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const modelOptions = [
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <ApiIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6">
          OpenAI Integration
        </Typography>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Connect to OpenAI API to use GPT models in your assistant flows.
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="API Key"
            fullWidth
            variant="outlined"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="password"
            placeholder="sk-..."
            required
            helperText="Get this from your OpenAI dashboard"
            margin="normal"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            label="Organization ID (optional)"
            fullWidth
            variant="outlined"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
            helperText="Only required if you belong to multiple organizations"
            margin="normal"
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleConnect}
              disabled={isLoading || !apiKey}
              startIcon={isConnected ? <CheckIcon /> : null}
              color={isConnected ? 'success' : 'primary'}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                isConnected ? 'Re-Test Connection' : 'Connect to OpenAI'
              )}
            </Button>
            
            <Button
              variant="outlined"
              onClick={handleSaveSettings}
            >
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Model Settings
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="model-select-label">Model</InputLabel>
              <Select
                labelId="model-select-label"
                value={selectedModel}
                label="Model"
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                {modelOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Max Tokens"
              fullWidth
              variant="outlined"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              type="number"
              InputProps={{ inputProps: { min: 1, max: 8192 } }}
              helperText="Maximum length of generated text (1-8192)"
              margin="normal"
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ px: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography id="temperature-slider" gutterBottom>
                  Temperature
                </Typography>
                <Tooltip title="Controls randomness: 0 = deterministic, 1 = creative">
                  <InfoIcon fontSize="small" color="action" />
                </Tooltip>
              </Box>
              <Slider
                aria-labelledby="temperature-slider"
                value={temperature}
                onChange={(e, newValue) => setTemperature(newValue)}
                min={0}
                max={2}
                step={0.1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 1, label: '1' },
                  { value: 2, label: '2' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ px: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography id="top-p-slider" gutterBottom>
                  Top P
                </Typography>
                <Tooltip title="Controls diversity via nucleus sampling (0.1 = only top 10% likely tokens)">
                  <InfoIcon fontSize="small" color="action" />
                </Tooltip>
              </Box>
              <Slider
                aria-labelledby="top-p-slider"
                value={topP}
                onChange={(e, newValue) => setTopP(newValue)}
                min={0}
                max={1}
                step={0.05}
                marks={[
                  { value: 0, label: '0' },
                  { value: 0.5, label: '0.5' },
                  { value: 1, label: '1' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ px: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography id="frequency-penalty-slider" gutterBottom>
                  Frequency Penalty
                </Typography>
                <Tooltip title="Reduces repetition of tokens: higher values decrease repetition">
                  <InfoIcon fontSize="small" color="action" />
                </Tooltip>
              </Box>
              <Slider
                aria-labelledby="frequency-penalty-slider"
                value={frequencyPenalty}
                onChange={(e, newValue) => setFrequencyPenalty(newValue)}
                min={0}
                max={2}
                step={0.1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 1, label: '1' },
                  { value: 2, label: '2' }
                ]}
                valueLabelDisplay="auto"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                startIcon={<ResetIcon />}
                onClick={handleResetDefaults}
                sx={{ mr: 1 }}
              >
                Reset to Defaults
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleSaveSettings}
              >
                Save Settings
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Status
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip 
            label={isConnected ? "Connected" : "Not Connected"} 
            color={isConnected ? "success" : "default"} 
            variant="outlined" 
          />
          <Chip 
            label={`Model: ${selectedModel}`} 
            color="primary" 
            variant="outlined" 
          />
        </Stack>
        
        {isConnected && (
          <Alert severity="info">
            Your OpenAI integration is ready. You can now use OpenAI models in your flows by adding an OpenAI node from the flow builder.
          </Alert>
        )}
      </Box>
    </Paper>
  );
}

export default OpenAIIntegration;
