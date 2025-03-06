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
  IconButton,
  CircularProgress,
  Collapse,
  Card,
  CardContent,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Telegram as TelegramIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

function TelegramIntegration() {
  // State for bot token and bot configuration
  const [botToken, setBotToken] = useState('');
  const [botName, setBotName] = useState('');
  const [botDescription, setBotDescription] = useState('');
  const [isWebhookEnabled, setIsWebhookEnabled] = useState(true);
  const [isPollingEnabled, setIsPollingEnabled] = useState(false);
  const [botUsername, setBotUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [pollingInterval, setPollingInterval] = useState(1000);
  const [webhookUrl, setWebhookUrl] = useState('');
  
  // State for setup dialog
  const [setupOpen, setSetupOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Create Bot with BotFather', 'Configure Bot', 'Test Connection'];

  // State for the list of bots
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load bots from local storage
  useEffect(() => {
    const savedBots = localStorage.getItem('telegram_bots');
    if (savedBots) {
      try {
        setBots(JSON.parse(savedBots));
      } catch (err) {
        console.error('Error loading saved bots:', err);
      }
    }
  }, []);

  // Save bots to local storage when changed
  useEffect(() => {
    if (bots.length > 0) {
      localStorage.setItem('telegram_bots', JSON.stringify(bots));
    }
  }, [bots]);

  // Handle bot selection
  const handleSelectBot = (bot) => {
    setSelectedBot(bot);
    setBotToken(bot.token);
    setBotName(bot.name);
    setBotDescription(bot.description || '');
    setBotUsername(bot.username || '');
    setIsWebhookEnabled(bot.webhookEnabled || true);
    setIsPollingEnabled(bot.pollingEnabled || false);
    setPollingInterval(bot.pollingInterval || 1000);
    setWebhookUrl(bot.webhookUrl || '');
    setIsConnected(bot.connected || false);
  };

  const handleDeleteBot = (botId) => {
    const updatedBots = bots.filter(bot => bot.id !== botId);
    setBots(updatedBots);
    
    if (selectedBot && selectedBot.id === botId) {
      setSelectedBot(null);
      resetForm();
    }
  };

  const resetForm = () => {
    setBotToken('');
    setBotName('');
    setBotDescription('');
    setBotUsername('');
    setIsWebhookEnabled(true);
    setIsPollingEnabled(false);
    setPollingInterval(1000);
    setWebhookUrl('');
    setIsConnected(false);
    setIsEditing(false);
  };

  const handleEditBot = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (selectedBot) {
      handleSelectBot(selectedBot);
    } else {
      resetForm();
    }
    setIsEditing(false);
  };

  const handleSaveBot = () => {
    if (!botToken || !botName) {
      setErrorMessage('Bot token and name are required');
      return;
    }

    const botData = {
      id: selectedBot ? selectedBot.id : Date.now().toString(),
      token: botToken,
      name: botName,
      description: botDescription,
      username: botUsername,
      webhookEnabled: isWebhookEnabled,
      pollingEnabled: isPollingEnabled,
      pollingInterval: pollingInterval,
      webhookUrl: webhookUrl,
      connected: isConnected
    };

    let updatedBots;
    if (selectedBot) {
      // Update existing bot
      updatedBots = bots.map(bot => 
        bot.id === selectedBot.id ? botData : bot
      );
      setSuccessMessage('Bot updated successfully!');
    } else {
      // Add new bot
      updatedBots = [...bots, botData];
      setSuccessMessage('Bot added successfully!');
    }

    setBots(updatedBots);
    setSelectedBot(botData);
    setIsEditing(false);
  };

  const handleAddNewBot = () => {
    resetForm();
    setSelectedBot(null);
    setIsEditing(true);
  };

  const handleConnect = async () => {
    if (!botToken) {
      setErrorMessage('Please enter a bot token');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would make an API call to Telegram
      // here to verify the token and get bot information
      const botInfo = {
        username: 'myawesomebot',
        // Other bot info would come from Telegram API
      };
      
      setBotUsername(botInfo.username);
      setIsConnected(true);
      setSuccessMessage('Successfully connected to Telegram bot!');
      
      // Update the bot in the list
      if (selectedBot) {
        const updatedBots = bots.map(bot => {
          if (bot.id === selectedBot.id) {
            return {
              ...bot,
              username: botInfo.username,
              connected: true
            };
          }
          return bot;
        });
        
        setBots(updatedBots);
        setSelectedBot({
          ...selectedBot,
          username: botInfo.username,
          connected: true
        });
      }
    } catch (error) {
      setErrorMessage('Failed to connect to Telegram bot. Please check your token.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSetup = () => {
    setSetupOpen(true);
  };

  const handleCloseSetup = () => {
    setSetupOpen(false);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccessMessage('Copied to clipboard!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Render bot list
  const renderBotList = () => {
    if (bots.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            No bots configured yet
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />}
            onClick={handleAddNewBot}
            sx={{ mt: 1 }}
          >
            Add Your First Bot
          </Button>
        </Box>
      );
    }

    return (
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          {bots.map((bot) => (
            <Grid item xs={12} md={6} key={bot.id}>
              <Card 
                variant="outlined"
                sx={{ 
                  cursor: 'pointer',
                  border: selectedBot && selectedBot.id === bot.id ? '2px solid #1976d2' : '1px solid rgba(0, 0, 0, 0.12)',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
                onClick={() => handleSelectBot(bot)}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TelegramIcon sx={{ color: '#0088cc', mr: 1 }} />
                      <Typography variant="subtitle1">
                        {bot.name}
                      </Typography>
                    </Box>
                    <Box>
                      {bot.connected ? (
                        <Chip 
                          size="small"
                          color="success"
                          icon={<CheckCircleIcon />}
                          label="Connected" 
                        />
                      ) : (
                        <Chip 
                          size="small"
                          color="default"
                          icon={<ErrorIcon />}
                          label="Not Connected" 
                        />
                      )}
                    </Box>
                  </Box>
                  
                  {bot.username && (
                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                      @{bot.username}
                    </Typography>
                  )}
                  
                  {bot.description && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mt: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {bot.description}
                    </Typography>
                  )}
                </CardContent>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    px: 2,
                    pb: 1
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectBot(bot);
                      handleEditBot();
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBot(bot.id);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />}
            onClick={handleAddNewBot}
          >
            Add New Bot
          </Button>
        </Box>
      </Box>
    );
  };

  // Render bot configuration form
  const renderBotForm = () => {
    return (
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {selectedBot ? (isEditing ? 'Edit Bot' : 'Bot Details') : 'Add New Bot'}
          </Typography>
          
          {selectedBot && !isEditing && (
            <Box>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditBot}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              
              <Button
                variant="contained"
                color={isConnected ? 'success' : 'primary'}
                startIcon={isConnected ? <CheckCircleIcon /> : <TelegramIcon />}
                onClick={handleConnect}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  isConnected ? 'Reconnect' : 'Connect'
                )}
              </Button>
            </Box>
          )}
        </Box>
        
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
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Bot Name"
              fullWidth
              variant="outlined"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              disabled={!isEditing}
              required
              helperText="A friendly name for your bot"
              margin="normal"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              label="Bot Token"
              fullWidth
              variant="outlined"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              disabled={!isEditing}
              required
              type="password"
              helperText={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Get from @BotFather on Telegram</span>
                  <Tooltip title="Click 'Setup Guide' for instructions on how to get a bot token">
                    <IconButton size="small" onClick={handleOpenSetup}>
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
              margin="normal"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Bot Description"
              fullWidth
              variant="outlined"
              value={botDescription}
              onChange={(e) => setBotDescription(e.target.value)}
              disabled={!isEditing}
              multiline
              rows={2}
              helperText="Optional description of what your bot does"
              margin="normal"
            />
          </Grid>
          
          {botUsername && (
            <Grid item xs={12} md={6}>
              <TextField
                label="Bot Username"
                fullWidth
                variant="outlined"
                value={`@${botUsername}`}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <IconButton 
                      size="small"
                      onClick={() => handleCopyToClipboard(`@${botUsername}`)}
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  ),
                }}
                margin="normal"
              />
            </Grid>
          )}
          
          <Grid item xs={12}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mt: 1, 
                cursor: 'pointer' 
              }}
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <Typography variant="subtitle1">
                Advanced Settings
              </Typography>
              {showAdvanced ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          </Grid>
        </Grid>
        
        <Collapse in={showAdvanced}>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isWebhookEnabled}
                  onChange={(e) => setIsWebhookEnabled(e.target.checked)}
                  disabled={!isEditing}
                />
              }
              label="Use Webhook (recommended)"
            />
            
            {isWebhookEnabled && (
              <TextField
                label="Webhook URL"
                fullWidth
                variant="outlined"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                disabled={!isEditing}
                helperText="URL where Telegram will send updates"
                margin="normal"
              />
            )}
            
            <FormControlLabel
              control={
                <Switch
                  checked={isPollingEnabled}
                  onChange={(e) => setIsPollingEnabled(e.target.checked)}
                  disabled={!isEditing}
                />
              }
              label="Use Long Polling (alternative)"
            />
            
            {isPollingEnabled && (
              <TextField
                label="Polling Interval (ms)"
                fullWidth
                variant="outlined"
                value={pollingInterval}
                onChange={(e) => setPollingInterval(e.target.value)}
                disabled={!isEditing}
                type="number"
                helperText="How often to check for updates (in milliseconds)"
                margin="normal"
              />
            )}
          </Box>
        </Collapse>
        
        {isEditing && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleCancelEdit}
              sx={{ mr: 1 }}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            
            <Button
              variant="contained"
              onClick={handleSaveBot}
              startIcon={<SaveIcon />}
            >
              Save Bot
            </Button>
          </Box>
        )}
      </Paper>
    );
  };

  // Render setup guide dialog
  const renderSetupDialog = () => {
    return (
      <Dialog
        open={setupOpen}
        onClose={handleCloseSetup}
        aria-labelledby="setup-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="setup-dialog-title">
          Telegram Bot Setup Guide
        </DialogTitle>
        
        <DialogContent>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Create a new bot using BotFather
              </Typography>
              
              <Typography variant="body1" paragraph>
                1. Open Telegram and search for @BotFather
              </Typography>
              
              <Typography variant="body1" paragraph>
                2. Start a chat with BotFather and send the command /newbot
              </Typography>
              
              <Typography variant="body1" paragraph>
                3. Follow the instructions to name your bot and create a username (must end with 'bot')
              </Typography>
              
              <Typography variant="body1" paragraph>
                4. BotFather will provide you with a token - copy this for the next step
              </Typography>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Your bot token is private and should be kept secure. Don't share it with others.
                </Typography>
              </Alert>
            </Box>
          )}
          
          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Configure your bot
              </Typography>
              
              <Typography variant="body1" paragraph>
                1. Enter your bot's name and token in the form
              </Typography>
              
              <Typography variant="body1" paragraph>
                2. Add an optional description of what your bot does
              </Typography>
              
              <Typography variant="body1" paragraph>
                3. Configure webhook settings (recommended) or long polling
              </Typography>
              
              <Typography variant="body1">
                For webhook, you will need:
              </Typography>
              <ul>
                <li>A public HTTPS URL where Telegram can send updates</li>
                <li>SSL certificate (Telegram only works with HTTPS)</li>
              </ul>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Webhooks are more efficient but require a public HTTPS endpoint. Long polling works on local development but is less efficient.
                </Typography>
              </Alert>
            </Box>
          )}
          
          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Test the connection
              </Typography>
              
              <Typography variant="body1" paragraph>
                1. After saving your bot configuration, click "Connect" to test the connection
              </Typography>
              
              <Typography variant="body1" paragraph>
                2. If successful, you'll see your bot's username and status update to "Connected"
              </Typography>
              
              <Typography variant="body1" paragraph>
                3. Open Telegram and search for your bot by username
              </Typography>
              
              <Typography variant="body1" paragraph>
                4. Send a message to your bot to test it
              </Typography>
              
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  Your bot is now ready to be used in your flows! You can use the Telegram nodes in the Flow Builder to define how your bot responds.
                </Typography>
              </Alert>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseSetup}>Close</Button>
          
          {activeStep > 0 && (
            <Button onClick={handleBackStep}>Back</Button>
          )}
          
          {activeStep < steps.length - 1 && (
            <Button onClick={handleNextStep}>Next</Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TelegramIcon sx={{ color: '#0088cc', mr: 1 }} />
          <Typography variant="h6">
            Telegram Bot Integration
          </Typography>
        </Box>
        
        <Button
          variant="outlined"
          startIcon={<InfoIcon />}
          onClick={handleOpenSetup}
        >
          Setup Guide
        </Button>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Connect your Telegram bots to create conversational AI assistants on Telegram.
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {renderBotList()}
      
      {(isEditing || selectedBot) && renderBotForm()}
      
      {renderSetupDialog()}
    </Paper>
  );
}

export default TelegramIntegration;
