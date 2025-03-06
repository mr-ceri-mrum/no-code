import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField,
  Divider,
  IconButton,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { Handle } from 'reactflow';
import {
  CallSplit as CallSplitIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

function ConditionNode({ data, isConnectable }) {
  const [expanded, setExpanded] = useState(false);
  const [condition, setCondition] = useState(data.condition || '{{input}} === "yes"');
  const [trueLabel, setTrueLabel] = useState(data.trueLabel || 'True');
  const [falseLabel, setFalseLabel] = useState(data.falseLabel || 'False');
  const [operator, setOperator] = useState(data.operator || 'equals');

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const operatorOptions = [
    { value: 'equals', label: 'Equals (===)' },
    { value: 'notEquals', label: 'Not Equals (!==)' },
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' },
    { value: 'greaterThan', label: 'Greater Than (>)' },
    { value: 'lessThan', label: 'Less Than (<)' },
    { value: 'custom', label: 'Custom Expression' }
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
        id="true"
        style={{ top: '30%', background: 'green', width: 10, height: 10 }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="right"
        id="false"
        style={{ top: '70%', background: 'red', width: 10, height: 10 }}
        isConnectable={isConnectable}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CallSplitIcon sx={{ color: '#6366f1', mr: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Condition
          </Typography>
        </Box>
        <Tooltip title="Configure condition">
          <IconButton size="small" onClick={toggleExpanded}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {expanded ? (
        <Box>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Operator</InputLabel>
            <Select
              value={operator}
              label="Operator"
              onChange={(e) => setOperator(e.target.value)}
            >
              {operatorOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {operator === 'custom' ? (
            <TextField
              label="Condition Expression"
              fullWidth
              variant="outlined"
              size="small"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="{{input}} === 'yes'"
              sx={{ mb: 2 }}
            />
          ) : (
            <TextField
              label="Value to Compare"
              fullWidth
              variant="outlined"
              size="small"
              value={condition.replace(/^.*?["'](.*)["'].*$/, '$1')}
              onChange={(e) => {
                let newCondition = '';
                switch(operator) {
                  case 'equals':
                    newCondition = `{{input}} === "${e.target.value}"`;
                    break;
                  case 'notEquals':
                    newCondition = `{{input}} !== "${e.target.value}"`;
                    break;
                  case 'contains':
                    newCondition = `{{input}}.includes("${e.target.value}")`;
                    break;
                  case 'startsWith':
                    newCondition = `{{input}}.startsWith("${e.target.value}")`;
                    break;
                  case 'endsWith':
                    newCondition = `{{input}}.endsWith("${e.target.value}")`;
                    break;
                  case 'greaterThan':
                    newCondition = `{{input}} > ${e.target.value}`;
                    break;
                  case 'lessThan':
                    newCondition = `{{input}} < ${e.target.value}`;
                    break;
                  default:
                    newCondition = `{{input}} === "${e.target.value}"`;
                }
                setCondition(newCondition);
              }}
              sx={{ mb: 2 }}
            />
          )}
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label="True Label"
              fullWidth
              variant="outlined"
              size="small"
              value={trueLabel}
              onChange={(e) => setTrueLabel(e.target.value)}
              sx={{ mb: 2 }}
            />
            
            <TextField
              label="False Label"
              fullWidth
              variant="outlined"
              size="small"
              value={falseLabel}
              onChange={(e) => setFalseLabel(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="body2">
            Condition: {condition}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="success.main">
              True → {trueLabel}
            </Typography>
            <Typography variant="caption" color="error.main">
              False → {falseLabel}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ConditionNode;
