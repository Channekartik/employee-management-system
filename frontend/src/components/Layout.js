import React from 'react';
import Navbar  from './Navbar';
import Sidebar from './Sidebar';

/**
 * Main layout: top Navbar + left Sidebar + main content area.
 */
const Layout = ({ children }) => (
  <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
    <Navbar />
    <div className="d-flex flex-grow-1">
      <Sidebar />
      <main className="flex-grow-1 p-4 bg-light overflow-auto">
        {children}
      </main>
    </div>
  </div>
);

export default Layout;
