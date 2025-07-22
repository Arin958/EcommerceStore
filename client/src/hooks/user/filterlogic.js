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

  useEffect(() => {
    setPriceInputs({
      minPrice: activeFilters.minPrice || "",
      maxPrice: activeFilters.maxPrice || "",
    });
  }, [activeFilters.minPrice, activeFilters.maxPrice]);

  // Initialize active filters from URL
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    setActiveFilters(params);
    setSearchInput(params.search || "");
  }, [searchParams]);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debounceHandlePriceChange = useCallback(
    debounce((key, value) => {
      const newParams = new URLSearchParams(searchParams);

      if (value === "" || value === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }

      setSearchParams(newParams);
    }, 500)
  );

  const debounceHandleSearch = useCallback(
    debounce((searchValue) => {
      handleFilterChange("search", searchValue);
    })
  );

  const handleFilterChange = (key, value) => {
    if (key === "minPrice" || key === "maxPrice") {
      debounceHandlePriceChange(key, value);
    } else {
      const newParams = new URLSearchParams(searchParams);

      if (value === "" || value === false) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach((v) => newParams.append(key, v));
      } else {
        newParams.set(key, value);
      }

      setSearchParams(newParams);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    debounceHandleSearch(e.target.value);
  };

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

  const isFilterActive = (key, value) => {
    if (!activeFilters[key]) return false;
    return Array.isArray(activeFilters[key])
      ? activeFilters[key].includes(value)
      : activeFilters[key] === value;
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const activeFilterCount = Object.keys(activeFilters).filter(
    (key) => activeFilters[key] && activeFilters[key] !== "newest"
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
    isFilterActive
  };
};

export default useFilterLogic;