import React from 'react';
import ChartWidget from './ChartWidget';
import '../styles/Widget.css';

const Widget = ({ widget, onRemove }) => {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3>{widget.name}</h3>
        <button className="remove-widget" onClick={onRemove}>
          ✕
        </button>
      </div>
      <div className="widget-content">
        {widget.chartData && widget.type ? (
          <div className="widget-chart">
            <ChartWidget type={widget.type} data={widget.chartData} />
          </div>
        ) : (
          <div className="widget-text">
            <p>{widget.text}</p>
          </div>
        )}
        <div className="widget-summary">
          <p>{widget.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
