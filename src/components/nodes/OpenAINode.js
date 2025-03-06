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
  Slider,
  IconButton,
  Tooltip
} from '@mui/material';
import { Handle } from 'reactflow';
import {
  Api as ApiIcon,
  Settings as SettingsIcon,
  Info as InfoIcon
} from '@mui/icons-material';

function OpenAINode({ data, isConnectable }) {
  const [expanded, setExpanded] = useState(false);
  const [model, setModel] = useState(data.model || 'gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(data.temperature || 0.7);
  const [maxTokens, setMaxTokens] = useState(data.maxTokens || 500);
  const [prompt, setPrompt] = useState(data.prompt || 'You are a helpful assistant.');

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const modelOptions = [
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
  ];

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
      <Handle
        type="source"
        position="right"
        id="output"
        style={{ background: '#555', width: 10, height: 10 }}
        isConnectable={isConnectable}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ApiIcon sx={{ color: '#10a37f', mr: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            OpenAI
          </Typography>
        </Box>
        <Tooltip title="Configure model settings">
          <IconButton size="small" onClick={toggleExpanded}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Model</InputLabel>
        <Select
          value={model}
          label="Model"
          onChange={(e) => setModel(e.target.value)}
        >
          {modelOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {expanded && (
        <Box>
          <TextField
            label="System Prompt"
            fullWidth
            variant="outlined"
            size="small"
            multiline
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">Temperature</Typography>
              <Typography variant="body2">{temperature}</Typography>
            </Box>
            <Slider
              value={temperature}
              onChange={(e, newValue) => setTemperature(newValue)}
              min={0}
              max={2}
              step={0.1}
              valueLabelDisplay="auto"
              size="small"
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">Precise</Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="caption" color="text.secondary">Creative</Typography>
            </Box>
          </Box>

          <TextField
            label="Max Tokens"
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            value={maxTokens}
            onChange={(e) => setMaxTokens(e.target.value)}
            InputProps={{ inputProps: { min: 1, max: 4096 } }}
          />
        </Box>
      )}

      {!expanded && (
        <Typography variant="caption" color="text.secondary">
          Using {model} with temperature {temperature}
        </Typography>
      )}
    </Box>
  );
}

export default OpenAINode;
