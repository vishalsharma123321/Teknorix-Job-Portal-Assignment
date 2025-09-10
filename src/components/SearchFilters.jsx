import React, { useState } from 'react';
import { IoSearch, IoChevronDown, IoClose } from 'react-icons/io5';
import '../style/components/SearchFilters.scss';

const SearchFilters = ({ filters, lookups, onFilterChange, onRemoveFilter }) => {
  const [searchText, setSearchText] = useState(filters.q || "");

const handleInputChange = (value) => {
  setSearchText(value);
  // Always do live search (text or number)
  onFilterChange({ q: value });
};

const handleSearch = (e) => {
  e.preventDefault();
  if (searchText.trim()) {
    // If numeric, explicitly trigger job ID fetch
    const isNumeric = /^\d+$/.test(searchText.trim());
    onFilterChange({ q: searchText.trim() }, isNumeric);
  }
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
      <form className="search-row" onSubmit={handleSearch}>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search by Job ID, Title, Company..."
            value={searchText}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <IoSearch size={20} />
          </button>
        </div>
      </form>

      <div className="filters-row">
        <div className="filter-dropdown">
          <select
            value={filters.dept}
            onChange={(e) => onFilterChange({ dept: e.target.value })}
          >
            <option value="">Department</option>
            {lookups.departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.title}
              </option>
            ))}
          </select>
          <IoChevronDown className="dropdown-arrow" />
        </div>

        <div className="filter-dropdown">
          <select
            value={filters.loc}
            onChange={(e) => onFilterChange({ loc: e.target.value })}
          >
            <option value="">Location</option>
            {lookups.locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.title}
              </option>
            ))}
          </select>
          <IoChevronDown className="dropdown-arrow" />
        </div>

        <div className="filter-dropdown">
          <select
            value={filters.fun}
            onChange={(e) => onFilterChange({ fun: e.target.value })}
          >
            <option value="">Function</option>
            {lookups.functions.map((func) => (
              <option key={func.id} value={func.id}>
                {func.title}
              </option>
            ))}
          </select>
          <IoChevronDown className="dropdown-arrow" />
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
                <IoClose size={14} />
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
