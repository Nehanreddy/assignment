import React from 'react';
import Widget from './Widget';
import '../styles/Category.css';

const Category = ({ category, onAddWidget, onRemoveWidget }) => {
  return (
    <div className="category">
      <div className="category-header">
        <h2>{category.name}</h2>
      </div>
      
      <div className="widgets-grid">
        {category.widgets.map(widget => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={() => onRemoveWidget(category.id, widget.id)}
          />
        ))}
        
        <div className="add-widget-card" onClick={onAddWidget}>
          <div className="add-widget-content">
            <span className="add-icon">+</span>
            <span>Add Widget</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
