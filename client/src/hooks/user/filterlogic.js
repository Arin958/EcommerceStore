import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useFilterLogic = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    gender: true,
    brands: true,
    colors: true,
    sizes: true,
    special: true,
    sort: true,
  });
  const [priceInputs, setPriceInputs] = useState({
    minPrice: "",
    maxPrice: "",
  });

  // Helper: parse URL params into proper arrays/values
  const parseFiltersFromParams = (params) => {
    const parsed = {};

    // Get all unique keys from searchParams
    const keys = Array.from(new Set(Array.from(params.keys())));

    keys.forEach((key) => {
      const values = params.getAll(key);
      // If more than one value, store as array; else store as string
      parsed[key] = values.length > 1 ? values : values[0];
    });

    return parsed;
  };



  // Initialize from URL on mount or URL change
  useEffect(() => {
    const parsed = parseFiltersFromParams(searchParams);
    setActiveFilters(parsed);

    // Sync search input
    setSearchInput(searchParams.get("search") || "");
  }, [searchParams]);

  

  // Sync price inputs with filters
  useEffect(() => {
    setPriceInputs({
      minPrice: activeFilters.minPrice || "",
      maxPrice: activeFilters.maxPrice || "",
    });
  }, [activeFilters.minPrice, activeFilters.maxPrice]);

  // Debounce utility
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Debounced handlers
  const debounceHandlePriceChange = useCallback(
    debounce((key, value) => {
      const newParams = new URLSearchParams(searchParams);

      if (value === "" || value === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }

      setSearchParams(newParams);
    }, 500),
    [searchParams]
  );

  const debounceHandleSearch = useCallback(
    debounce((searchValue) => {
      handleFilterChange("search", searchValue);
    }, 500),
    [searchParams]
  );

  // Handle setting filter values (array or single)
  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === "" || value === false || (Array.isArray(value) && value.length === 0)) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((v) => newParams.append(key, v));
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  // Search input change
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    debounceHandleSearch(e.target.value);
  };

  // Toggle array filter value
  const toggleArrayFilter = (key, item) => {
    const current = activeFilters[key]
      ? Array.isArray(activeFilters[key])
        ? activeFilters[key]
        : [activeFilters[key]]
      : [];

    const newValue = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];

    handleFilterChange(key, newValue);
  };

  // Check if a filter is active
  const isFilterActive = (key, value) => {
    if (!activeFilters[key]) return false;
    return Array.isArray(activeFilters[key])
      ? activeFilters[key].includes(value)
      : activeFilters[key] === value;
  };

  // Toggle collapse for sections
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Count active filters excluding "sort" or defaults
  const activeFilterCount = Object.keys(activeFilters).filter(
    (key) =>
      activeFilters[key] &&
      activeFilters[key] !== "newest" &&
      !(Array.isArray(activeFilters[key]) && activeFilters[key].length === 0)
  ).length;

  return {
    searchParams,
    activeFilters,
    searchInput,
    mobileFiltersOpen,
    expandedSections,
    priceInputs,
    activeFilterCount,
    handleSearchChange,
    toggleSection,
    setMobileFiltersOpen,
    setSearchParams,
    handleFilterChange,
    toggleArrayFilter,
    isFilterActive,
  };
};

export default useFilterLogic;
