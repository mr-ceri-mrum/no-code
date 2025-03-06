import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  MiniMap,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Grid,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Save as SaveIcon,
  PlayArrow as PlayIcon,
  Menu as MenuIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Telegram as TelegramIcon,
  Textsms as TextsmsIcon,
  MessageOutlined as MessageIcon,
  Api as ApiIcon,
  AllInclusive as LogicIcon
} from '@mui/icons-material';

// Import custom node components
import TelegramInputNode from '../components/nodes/TelegramInputNode';
import TelegramOutputNode from '../components/nodes/TelegramOutputNode';

// Node types
const nodeTypes = {
  telegramInput: TelegramInputNode,
  telegramOutput: TelegramOutputNode,
};

function FlowBuilder() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - (drawerOpen ? 450 : 200),
        y: event.clientY - 100,
      };
      
      // Create different data structures based on node types
      let data = { label: `${type} node` };
      
      if (type === 'telegramInput') {
        data = { 
          botId: '',
          filterCommands: false,
          commands: '',
          filterText: false,
          textPattern: ''
        };
      } else if (type === 'telegramOutput') {
        data = {
          botId: '',
          messageType: 'text',
          messageTemplate: 'Hello! I am a Telegram bot.',
          includeButtons: false,
          buttons: '',
          parseMode: 'none'
        };
      } else if (type === 'openai') {
        data = {
          model: 'gpt-3.5-turbo',
          prompt: 'You are a helpful assistant.',
          temperature: 0.7,
          maxTokens: 500
        };
      } else if (type === 'condition') {
        data = {
          condition: '{{input}} === "yes"',
          trueLabel: 'True',
          falseLabel: 'False'
        };
      }
      
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data,
      };

      setNodes((nds) => nds.concat(newNode));
      
      // Show a success message
      setSnackbarMessage(`Added new ${type} node`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    },
    [setNodes, drawerOpen]
  );

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const handleDeleteSelectedNode = () => {
    if (!selectedNode) return;
    
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) => eds.filter(
      (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ));
    setSelectedNode(null);
    
    setSnackbarMessage('Node deleted');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleSaveFlow = () => {
    const flow = { nodes, edges };
    localStorage.setItem('current_flow', JSON.stringify(flow));
    
    setSnackbarMessage('Flow saved successfully');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleTestFlow = () => {
    // In a real app, this would test the flow using a simulator
    setSnackbarMessage('Flow testing feature coming soon');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const nodeCategories = [
    {
      title: 'Messaging',
      icon: <MessageIcon fontSize="small" sx={{ mr: 1 }} />,
      nodes: [
        { type: 'telegramInput', label: 'Telegram Input', icon: <TelegramIcon fontSize="small" sx={{ color: '#0088cc' }} /> },
        { type: 'telegramOutput', label: 'Telegram Output', icon: <TelegramIcon fontSize="small" sx={{ color: '#0088cc' }} /> },
      ]
    },
    {
      title: 'AI',
      icon: <ApiIcon fontSize="small" sx={{ mr: 1 }} />,
      nodes: [
        { type: 'openai', label: 'OpenAI', icon: <ApiIcon fontSize="small" /> },
        { type: 'textProcessor', label: 'Text Processor', icon: <TextsmsIcon fontSize="small" /> },
      ]
    },
    {
      title: 'Logic',
      icon: <LogicIcon fontSize="small" sx={{ mr: 1 }} />,
      nodes: [
        { type: 'condition', label: 'Condition', icon: <LogicIcon fontSize="small" /> },
        { type: 'switch', label: 'Switch', icon: <LogicIcon fontSize="small" /> },
      ]
    },
  ];

  return (
    <div style={{ height: '100%' }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Flow Builder
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<SaveIcon />}
            sx={{ mr: 1 }}
            onClick={handleSaveFlow}
          >
            Save
          </Button>
          <Button 
            variant="contained" 
            color="success"
            startIcon={<PlayIcon />}
            onClick={handleTestFlow}
          >
            Test Flow
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', height: 'calc(100vh - 128px)' }}>
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          sx={{
            width: 250,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              position: 'relative',
              width: 250,
              height: '100%',
              border: 'none',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)'
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Nodes</Typography>
            <Typography variant="caption" color="text.secondary">
              Drag and drop nodes to the canvas
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ overflow: 'auto' }}>
            {nodeCategories.map((category) => (
              <React.Fragment key={category.title}>
                <List disablePadding>
                  <ListItem>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {category.icon}
                      <ListItemText 
                        primary={category.title} 
                        primaryTypographyProps={{ 
                          variant: 'subtitle2',
                          color: 'text.secondary' 
                        }}
                      />
                    </Box>
                  </ListItem>
                </List>
                <Divider />
                <List disablePadding>
                  {category.nodes.map((node) => (
                    <ListItem 
                      button
                      key={node.type}
                      onDragStart={(event) => onDragStart(event, node.type)}
                      draggable
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Box sx={{ mr: 1 }}>
                          {node.icon}
                        </Box>
                        <ListItemText 
                          primary={node.label} 
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </React.Fragment>
            ))}
          </Box>
        </Drawer>

        <Box sx={{ flexGrow: 1, height: '100%', position: 'relative' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
            
            {selectedNode && (
              <Panel position="top-right">
                <Paper sx={{ p: 1 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteSelectedNode}
                  >
                    Delete Selected Node
                  </Button>
                </Paper>
              </Panel>
            )}
          </ReactFlow>
        </Box>

        <Drawer
          variant="persistent"
          anchor="right"
          open={true}
          sx={{
            width: 300,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              position: 'relative',
              width: 300,
              height: '100%',
              border: 'none',
              borderLeft: '1px solid rgba(0, 0, 0, 0.12)'
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Properties</Typography>
            <Typography variant="caption" color="text.secondary">
              Configure the selected node
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            {selectedNode ? (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  {selectedNode.type} Node
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  ID: {selectedNode.id}
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary">
                  Node properties are editable directly from the node.
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Select a node to view and edit its properties
              </Typography>
            )}
          </Box>
        </Drawer>
      </Box>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default FlowBuilder;
