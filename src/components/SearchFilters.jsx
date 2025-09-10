import React from 'react';
import '../style/components/SearchFilters.scss';

const SearchFilters = ({ filters, lookups, onFilterChange, onRemoveFilter }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({ [field]: value });
  };

  const getFilterLabel = (filterKey, value) => {
    switch (filterKey) {
      case 'dept':
        return lookups.departments.find(d => d.id.toString() === value)?.title || value;
      case 'loc':
        return lookups.locations.find(l => l.id.toString() === value)?.title || value;
      case 'fun':
        return lookups.functions.find(f => f.id.toString() === value)?.title || value;
      case 'q':
        return value;
      default:
        return value;
    }
  };

  const activeFilters = Object.entries(filters).filter(([key, value]) => value);

  return (
    <div className="search-filters">
      <div className="search-row">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search for Job"
            value={filters.q}
            onChange={(e) => handleInputChange('q', e.target.value)}
          />
          <button className="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#4CAF50" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="#4CAF50" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="filters-row">
        <div className="filter-dropdown">
          <select
            value={filters.dept}
            onChange={(e) => handleInputChange('dept', e.target.value)}
          >
            <option value="">Department</option>
            {lookups.departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.title}
              </option>
            ))}
          </select>
          <span className="dropdown-arrow">›</span>
        </div>

        <div className="filter-dropdown">
          <select
            value={filters.loc}
            onChange={(e) => handleInputChange('loc', e.target.value)}
          >
            <option value="">Location</option>
            {lookups.locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.title}
              </option>
            ))}
          </select>
          <span className="dropdown-arrow">›</span>
        </div>

        <div className="filter-dropdown">
          <select
            value={filters.fun}
            onChange={(e) => handleInputChange('fun', e.target.value)}
          >
            <option value="">Function</option>
            {lookups.functions.map((func) => (
              <option key={func.id} value={func.id}>
                {func.title}
              </option>
            ))}
          </select>
          <span className="dropdown-arrow">›</span>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="active-filters">
          {activeFilters.map(([key, value]) => (
            <div key={key} className="filter-tag">
              <span>{getFilterLabel(key, value)}</span>
              <button
                className="remove-filter"
                onClick={() => onRemoveFilter(key)}
              >
                ×
              </button>
            </div>
          ))}
          {activeFilters.length > 1 && (
            <button
              className="clear-all"
              onClick={() => {
                activeFilters.forEach(([key]) => onRemoveFilter(key));
              }}
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;