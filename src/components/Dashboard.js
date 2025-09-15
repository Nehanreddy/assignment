import React, { useState } from 'react';
import Category from './Category';
import SearchBar from './SearchBar';
import AddWidgetModal from './AddWidgetModal';
import WidgetLibraryModal from './WidgetLibraryModal';
import initialData from '../data/dashboardData';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(initialData);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter widgets based on search term
  const filteredData = {
    categories: dashboardData.categories.map(category => ({
      ...category,
      widgets: category.widgets.filter(widget =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        widget.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
  };

  const handleAddWidget = (categoryId, widgetData) => {
    setDashboardData(prevData => ({
      categories: prevData.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: [...category.widgets, {
              id: `widget-${Date.now()}`,
              ...widgetData
            }]
          };
        }
        return category;
      })
    }));
    setIsCreateModalOpen(false);
    setSelectedCategory(null);
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    setDashboardData(prevData => ({
      categories: prevData.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            widgets: category.widgets.filter(widget => widget.id !== widgetId)
          };
        }
        return category;
      })
    }));
  };

  const handleRefresh = () => {
    // Simulate data refresh
    console.log('Refreshing dashboard data...');
  };

  const openCreateWidgetModal = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsCreateModalOpen(true);
  };

  const openLibraryModal = () => {
    setIsLibraryModalOpen(true);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="breadcrumb">
          <span>Home</span>
          <span className="breadcrumb-separator">&gt;</span>
          <span>Dashboard V2</span>
        </div>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="dashboard-controls">
          <button className="control-btn add-widget-btn" onClick={openLibraryModal}>
            Add Widget +
          </button>
          <button className="control-btn refresh-btn" onClick={handleRefresh}>
            ⟳
          </button>
          <button className="control-btn menu-btn">
            ⋮
          </button>
          <select className="time-filter">
            <option>🕒 Last 2 days</option>
            <option>🕒 Last 7 days</option>
            <option>🕒 Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="dashboard-title">
        <h1>CNAPP Dashboard</h1>
      </div>

      <div className="dashboard-content">
        {filteredData.categories.map(category => (
          <Category
            key={category.id}
            category={category}
            onAddWidget={() => openCreateWidgetModal(category.id)}
            onRemoveWidget={handleRemoveWidget}
          />
        ))}
      </div>

      {isCreateModalOpen && (
        <AddWidgetModal
          categoryId={selectedCategory}
          onAddWidget={handleAddWidget}
          onClose={() => {
            setIsCreateModalOpen(false);
            setSelectedCategory(null);
          }}
        />
      )}

      {isLibraryModalOpen && (
        <WidgetLibraryModal
          dashboardData={dashboardData}
          onUpdateDashboard={setDashboardData}
          onClose={() => setIsLibraryModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
