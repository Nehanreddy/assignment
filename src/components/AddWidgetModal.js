import React, { useState } from 'react';
import '../styles/AddWidgetModal.css';

const AddWidgetModal = ({ categoryId, onAddWidget, onClose }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [chartType, setChartType] = useState('none');

  const generateDummyChartData = (type) => {
    const colors = ['#4285f4', '#db4437', '#ff9800', '#0f9d58', '#9c27b0'];
    
    switch (type) {
      case 'bar':
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            label: 'Data',
            data: [12, 19, 8, 15, 22],
            backgroundColor: colors[0],
            borderColor: colors[0],
            borderWidth: 1
          }]
        };
      case 'line':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          datasets: [{
            label: 'Trend',
            data: [5, 12, 8, 18, 15],
            borderColor: colors[1],
            backgroundColor: `${colors[1]}20`,
            tension: 0.4,
            fill: true
          }]
        };
      case 'doughnut':
        return {
          labels: ['Category A', 'Category B', 'Category C'],
          datasets: [{
            data: [30, 45, 25],
            backgroundColor: [colors[0], colors[1], colors[2]],
            borderWidth: 0
          }]
        };
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (widgetName.trim() && widgetText.trim()) {
      const widgetData = {
        name: widgetName.trim(),
        text: widgetText.trim(),
        type: chartType === 'none' ? null : chartType,
        chartData: chartType === 'none' ? null : generateDummyChartData(chartType)
      };
      
      onAddWidget(categoryId, widgetData);
      setWidgetName('');
      setWidgetText('');
      setChartType('none');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Widget</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-widget-form">
          <div className="form-group">
            <label htmlFor="widgetName">Widget Name</label>
            <input
              type="text"
              id="widgetName"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="Enter widget name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="widgetText">Widget Text</label>
            <textarea
              id="widgetText"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              placeholder="Enter widget content"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="chartType">Chart Type</label>
            <select
              id="chartType"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="none">No Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="doughnut">Doughnut Chart</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="confirm-button">
              Add Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWidgetModal;
