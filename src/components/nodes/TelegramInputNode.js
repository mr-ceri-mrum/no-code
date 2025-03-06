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
  Tooltip
} from '@mui/material';
import { Handle } from 'reactflow';
import {
  Telegram as TelegramIcon,
  Settings as SettingsIcon,
  Info as InfoIcon
} from '@mui/icons-material';

function TelegramInputNode({ data, isConnectable }) {
  const [selectedBot, setSelectedBot] = useState(data.botId || '');
  const [expanded, setExpanded] = useState(false);
  const [filterCommands, setFilterCommands] = useState(data.filterCommands || false);
  const [commands, setCommands] = useState(data.commands || '');
  const [filterText, setFilterText] = useState(data.filterText || false);
  const [textPattern, setTextPattern] = useState(data.textPattern || '');

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
        type="source"
        position="right"
        id="output"
        style={{ background: '#555', width: 10, height: 10 }}
        isConnectable={isConnectable}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TelegramIcon sx={{ color: '#0088cc', mr: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Telegram Input
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

      {expanded && (
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Message Filters
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={filterCommands}
                onChange={(e) => setFilterCommands(e.target.checked)}
                size="small"
              />
            }
            label="Filter commands"
          />

          {filterCommands && (
            <TextField
              fullWidth
              size="small"
              placeholder="/start, /help, /info"
              label="Commands (comma separated)"
              value={commands}
              onChange={(e) => setCommands(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}

          <FormControlLabel
            control={
              <Switch
                checked={filterText}
                onChange={(e) => setFilterText(e.target.checked)}
                size="small"
              />
            }
            label="Filter text messages"
          />

          {filterText && (
            <Box sx={{ mb: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder=".*hello.*"
                label="Regex pattern"
                value={textPattern}
                onChange={(e) => setTextPattern(e.target.value)}
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <InfoIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                Uses JavaScript regex to match messages
              </Typography>
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ mt: expanded ? 2 : 0 }}>
        <Typography variant="caption" color="text.secondary">
          Listens for incoming messages from Telegram
        </Typography>
      </Box>
    </Box>
  );
}

export default TelegramInputNode;
