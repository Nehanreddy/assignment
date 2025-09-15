import React, { useState } from 'react';
import '../styles/WidgetLibraryModal.css';

const WidgetLibraryModal = ({ dashboardData, onUpdateDashboard, onClose }) => {
  const [activeTab, setActiveTab] = useState('CSPM');
  const [selectedWidgets, setSelectedWidgets] = useState(new Set());

  // Widget library - all available widgets
  const widgetLibrary = {
    CSPM: [
      { id: 'cloud-accounts-lib', name: 'Cloud Accounts', description: 'Monitor cloud account connections' },
      { id: 'cloud-risk-lib', name: 'Cloud Account Risk Assessment', description: 'Risk assessment overview' },
      { id: 'security-groups-lib', name: 'Security Groups', description: 'Security group compliance' },
      { id: 'iam-users-lib', name: 'IAM Users', description: 'Identity and access management' }
    ],
    CWPP: [
      { id: 'namespace-alerts-lib', name: 'Top 5 Namespace Specific Alerts', description: 'Kubernetes namespace alerts' },
      { id: 'workload-alerts-lib', name: 'Workload Alerts', description: 'Container workload monitoring' },
      { id: 'pod-security-lib', name: 'Pod Security', description: 'Pod security compliance' },
      { id: 'network-policies-lib', name: 'Network Policies', description: 'Network policy violations' }
    ],
    Image: [
      { id: 'image-risk-lib', name: 'Image Risk Assessment', description: 'Container image vulnerabilities' },
      { id: 'image-security-lib', name: 'Image Security Issues', description: 'Security scan results' },
      { id: 'registry-scan-lib', name: 'Registry Scan Summary', description: 'Registry scanning overview' },
      { id: 'malware-scan-lib', name: 'Malware Scan', description: 'Malware detection results' }
    ],
    Ticket: [
      { id: 'open-tickets-lib', name: 'Open Tickets', description: 'Current open support tickets' },
      { id: 'resolved-tickets-lib', name: 'Resolved Tickets', description: 'Recently resolved tickets' },
      { id: 'ticket-trends-lib', name: 'Ticket Trends', description: 'Support ticket trends' }
    ]
  };

  const handleWidgetToggle = (widgetId) => {
    const newSelected = new Set(selectedWidgets);
    if (newSelected.has(widgetId)) {
      newSelected.delete(widgetId);
    } else {
      newSelected.add(widgetId);
    }
    setSelectedWidgets(newSelected);
  };

  const handleConfirm = () => {
    // Add selected widgets to the appropriate categories
    const updatedData = { ...dashboardData };
    
    selectedWidgets.forEach(widgetId => {
      const widget = Object.values(widgetLibrary).flat().find(w => w.id === widgetId);
      if (widget) {
        // Determine target category based on tab
        let targetCategoryId = 'cspm';
        if (widgetLibrary.CWPP.some(w => w.id === widgetId)) targetCategoryId = 'cwpp';
        if (widgetLibrary.Image.some(w => w.id === widgetId)) targetCategoryId = 'registry';
        if (widgetLibrary.Ticket.some(w => w.id === widgetId)) targetCategoryId = 'cspm'; // Default to CSPM for tickets

        const targetCategory = updatedData.categories.find(cat => cat.id === targetCategoryId);
        if (targetCategory) {
          // Check if widget already exists
          const exists = targetCategory.widgets.some(w => w.name === widget.name);
          if (!exists) {
            targetCategory.widgets.push({
              id: `${widget.id}-${Date.now()}`,
              name: widget.name,
              text: widget.description,
              type: 'bar', // Default chart type
              chartData: generateDummyData('bar')
            });
          }
        }
      }
    });

    onUpdateDashboard(updatedData);
    onClose();
  };

  const generateDummyData = (type) => {
    const colors = ['#4285f4', '#db4437', '#ff9800', '#0f9d58', '#9c27b0'];
    
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Data',
        data: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), 
               Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), 
               Math.floor(Math.random() * 50)],
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        borderColor: colors[Math.floor(Math.random() * colors.length)],
        borderWidth: 1
      }]
    };
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="library-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="library-modal-header">
          <h2>Add Widget</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <div className="library-modal-body">
          <p className="library-description">
            Personalise your dashboard by adding the following widget
          </p>
          
          <div className="library-tabs">
            {Object.keys(widgetLibrary).map(tab => (
              <button
                key={tab}
                className={`library-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="library-widgets-list">
            {widgetLibrary[activeTab].map(widget => (
              <div key={widget.id} className="library-widget-item">
                <label className="library-widget-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedWidgets.has(widget.id)}
                    onChange={() => handleWidgetToggle(widget.id)}
                  />
                  <div className="library-widget-info">
                    <span className="library-widget-name">{widget.name}</span>
                    <span className="library-widget-description">{widget.description}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="library-modal-footer">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleConfirm} className="confirm-button">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetLibraryModal;
