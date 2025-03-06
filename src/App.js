import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements, 
  Route 
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import FlowBuilder from './pages/FlowBuilder';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';
import './App.css';

// Layout component that includes the NavBar
const Layout = ({ children }) => {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

function App() {
  // Create router with the future flag to resolve the warning
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout><Dashboard /></Layout>}>
        <Route index element={<Layout><Dashboard /></Layout>} />
        <Route path="flows" element={<Layout><FlowBuilder /></Layout>} />
        <Route path="integrations" element={<Layout><Integrations /></Layout>} />
        <Route path="settings" element={<Layout><Settings /></Layout>} />
      </Route>
    ), 
    {
      // This is the future flag that resolves the warning
      future: {
        v7_relativeSplatPath: true
      }
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
