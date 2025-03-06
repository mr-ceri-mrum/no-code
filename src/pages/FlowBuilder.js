import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  MiniMap 
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
  Grid
} from '@mui/material';
import {
  Save as SaveIcon,
  PlayArrow as PlayIcon,
  Menu as MenuIcon,
  Add as AddIcon
} from '@mui/icons-material';

// Node types
const nodeTypes = {
  // Custom node types will be defined here
};

function FlowBuilder() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(true);

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
        x: event.clientX - 200,
        y: event.clientY - 100,
      };
      
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeCategories = [
    {
      title: 'Input/Output',
      nodes: [
        { type: 'input', label: 'Input' },
        { type: 'output', label: 'Output' },
      ]
    },
    {
      title: 'Messaging',
      nodes: [
        { type: 'telegramInput', label: 'Telegram Input' },
        { type: 'telegramOutput', label: 'Telegram Output' },
      ]
    },
    {
      title: 'AI',
      nodes: [
        { type: 'openai', label: 'OpenAI' },
        { type: 'textProcessor', label: 'Text Processor' },
      ]
    },
    {
      title: 'Logic',
      nodes: [
        { type: 'condition', label: 'Condition' },
        { type: 'switch', label: 'Switch' },
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
          >
            Save
          </Button>
          <Button 
            variant="contained" 
            color="success"
            startIcon={<PlayIcon />}
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
                    <ListItemText 
                      primary={category.title} 
                      primaryTypographyProps={{ 
                        variant: 'subtitle2',
                        color: 'text.secondary' 
                      }}
                    />
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
                      <ListItemText 
                        primary={node.label} 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
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
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select a node to configure its properties
            </Typography>
          </Box>
        </Drawer>
      </Box>
    </div>
  );
}

export default FlowBuilder;
