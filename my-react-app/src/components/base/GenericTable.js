import React, { useState } from 'react';
import SearchComponent from './SearchComponent'; // Adjust the path as necessary
import './GenericTable.css';

const GenericTable = ({ data, columns, columnDisplayNames, renderCell, title, buttonText, 
  onButtonClick  }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(columns[0]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleColumnChange = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortColumn(column);
  };

  // Sort the data
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const itemA = a[sortColumn];
    const itemB = b[sortColumn];

    if (itemA < itemB) {
        return sortOrder === 'asc' ? -1 : 1;
    }
    if (itemA > itemB) {
        return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter the sorted data based on search query and selected column
  const filteredData = sortedData.filter((item) => {
    const itemValue = item[selectedColumn]?.toString().toLowerCase() || '';
    return itemValue.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="generic-table-container">
   <div className="table-header-container">
   {buttonText && <button onClick={onButtonClick} className="generic-table-button">{buttonText}</button>}
        {title && <h2 className="table-title">{title}</h2>}
        <SearchComponent
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedColumn={selectedColumn}
          onColumnChange={handleColumnChange}
          columns={columns}
          columnDisplayNames={columnDisplayNames}
        />
        
      </div>
      <table className="generic-table">
        <thead>
          <tr>
            {columns.map((header) => (
              <th key={header} onClick={() => handleSort(header)}>
                {columnDisplayNames[header]} {sortColumn === header ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item._id || index}>
              {columns.map((column) => (
                <td key={column}>
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
