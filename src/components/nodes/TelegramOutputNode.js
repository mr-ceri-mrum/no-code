import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  TextField,
  Divider,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  RadioGroup,
  Radio,
  FormLabel,
  Chip
} from '@mui/material';
import { Handle } from 'reactflow';
import {
  Telegram as TelegramIcon,
  Settings as SettingsIcon,
  Send as SendIcon,
  Image as ImageIcon,
  EmojiObjects as EmojiIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

function TelegramOutputNode({ data, isConnectable }) {
  const [selectedBot, setSelectedBot] = useState(data.botId || '');
  const [expanded, setExpanded] = useState(false);
  const [messageType, setMessageType] = useState(data.messageType || 'text');
  const [messageTemplate, setMessageTemplate] = useState(data.messageTemplate || '');
  const [includeButtons, setIncludeButtons] = useState(data.includeButtons || false);
  const [buttons, setButtons] = useState(data.buttons || '');
  const [parseMode, setParseMode] = useState(data.parseMode || 'none');

  // Mock bot list - in a real app, this would come from your bot registry
  const availableBots = [
    { id: 'bot1', name: 'Customer Support Bot' },
    { id: 'bot2', name: 'Sales Assistant' },
    { id: 'bot3', name: 'Marketing Bot' }
  ];

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        background: '#ffffff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: 2,
        width: 280,
      }}
    >
      <Handle
        type="target"
        position="left"
        id="input"
        style={{ background: '#555', width: 10, height: 10 }}
        isConnectable={isConnectable}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SendIcon sx={{ color: '#0088cc', mr: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Telegram Output
          </Typography>
        </Box>
        <Tooltip title="Configure node settings">
          <IconButton size="small" onClick={toggleExpanded}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Select Bot</InputLabel>
        <Select
          value={selectedBot}
          label="Select Bot"
          onChange={(e) => setSelectedBot(e.target.value)}
        >
          {availableBots.map((bot) => (
            <MenuItem key={bot.id} value={bot.id}>
              {bot.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {expanded ? (
        <Box>
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend" sx={{ fontSize: '0.875rem' }}>Message Type</FormLabel>
            <RadioGroup
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              row
            >
              <FormControlLabel value="text" control={<Radio size="small" />} label="Text" />
              <FormControlLabel value="image" control={<Radio size="small" />} label="Image" />
              <FormControlLabel value="location" control={<Radio size="small" />} label="Location" />
            </RadioGroup>
          </FormControl>

          {messageType === 'text' && (
            <>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Message Template"
                placeholder="Hello, {{user.name}}! How can I help you today?"
                value={messageTemplate}
                onChange={(e) => setMessageTemplate(e.target.value)}
                size="small"
                sx={{ mb: 2 }}
              />
              
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend" sx={{ fontSize: '0.875rem' }}>Parse Mode</FormLabel>
                <RadioGroup
                  value={parseMode}
                  onChange={(e) => setParseMode(e.target.value)}
                  row
                >
                  <FormControlLabel value="none" control={<Radio size="small" />} label="None" />
                  <FormControlLabel value="markdown" control={<Radio size="small" />} label="Markdown" />
                  <FormControlLabel value="html" control={<Radio size="small" />} label="HTML" />
                </RadioGroup>
              </FormControl>
            </>
          )}

          {messageType === 'image' && (
            <TextField
              fullWidth
              label="Image URL or Path"
              placeholder="https://example.com/image.jpg or {{image_url}}"
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
            />
          )}

          {messageType === 'location' && (
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Latitude"
                placeholder="37.7749"
                value={messageTemplate.split(',')[0] || ''}
                onChange={(e) => setMessageTemplate(`${e.target.value},${messageTemplate.split(',')[1] || ''}`)}
                size="small"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Longitude"
                placeholder="-122.4194"
                value={messageTemplate.split(',')[1] || ''}
                onChange={(e) => setMessageTemplate(`${messageTemplate.split(',')[0] || ''},${e.target.value}`)}
                size="small"
              />
            </Box>
          )}

          <FormControlLabel
            control={
              <Switch
                checked={includeButtons}
                onChange={(e) => setIncludeButtons(e.target.checked)}
                size="small"
              />
            }
            label="Include Inline Buttons"
          />

          {includeButtons && (
            <Box sx={{ mt: 1, mb: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                label="Button Config (JSON)"
                placeholder='[{"text": "Yes", "callback_data": "yes"}, {"text": "No", "callback_data": "no"}]'
                value={buttons}
                onChange={(e) => setButtons(e.target.value)}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                JSON array of button objects (text, callback_data)
              </Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ mb: 1 }}>
          {messageType === 'text' && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {messageTemplate || 'No message template'}
            </Typography>
          )}
          
          {messageType === 'image' && (
            <Chip icon={<ImageIcon fontSize="small" />} label="Image message" size="small" />
          )}
          
          {messageType === 'location' && (
            <Chip icon={<LocationIcon fontSize="small" />} label="Location message" size="small" />
          )}
        </Box>
      )}

      <Box sx={{ mt: expanded ? 2 : 0 }}>
        <Typography variant="caption" color="text.secondary">
          Sends messages to Telegram users
        </Typography>
      </Box>
    </Box>
  );
}

export default TelegramOutputNode;
