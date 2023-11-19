// SearchComponent.js
import React from 'react';

const SearchComponent = ({
  searchQuery,
  onSearchChange,
  selectedColumn,
  onColumnChange,
  columns,
  columnDisplayNames
}) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="חפש..."
        value={searchQuery}
        onChange={onSearchChange}
      />
      <select value={selectedColumn} onChange={onColumnChange}>
        {columns.map((column) => (
          <option key={column} value={column}>
            {columnDisplayNames[column]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchComponent;
