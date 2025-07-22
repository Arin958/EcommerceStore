import React from "react";
import {
  Filter as FiFilter,
  X as FiX,
  ChevronDown as FiChevronDown,
  ChevronUp as FiChevronUp,
} from "lucide-react";
import useFilterLogic from "../../hooks/user/filterlogic";
import PriceFilter from "./FilterTypes/PriceFilter";
import CategoryFilter from "./FilterTypes/CategoryFilter";
import GenderFilter from "./FilterTypes/GenderFilter";
import BrandFilter from "./FilterTypes/BrandFilter";
import ColorFilter from "./FilterTypes/ColorFilter";
import SizeFilter from "./FilterTypes/SizeFilter";
import SpecialFilter from "./FilterTypes/SpecialFilter";
import SortFilter from "./FilterTypes/SortFilter";

const ProductFilters = ({ filters }) => {
  const {
    searchParams,
    activeFilters,
    searchInput,
    mobileFiltersOpen,
    expandedSections,
    priceInputs,
    activeFilterCount,
    handleSearchChange,
    handleFilterChange,
    toggleArrayFilter,
    isFilterActive,
    toggleSection,
    setMobileFiltersOpen,
    setSearchParams,
  } = useFilterLogic();

  return (
    <>
      {/* Mobile filter toggle button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md"
        >
          <div className="flex items-center">
            <FiFilter className="mr-2" />
            <span>
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </span>
          </div>
          {mobileFiltersOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      {/* Filters sidebar */}
      <div
        className={`${
          mobileFiltersOpen ? "block" : "hidden"
        } lg:block bg-white rounded-lg shadow-lg overflow-hidden`}
      >
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h2 className="text-lg font-semibold text-white flex items-center justify-between">
            <span>Filter Products</span>
            {activeFilterCount > 0 && (
              <button
                onClick={() => setSearchParams({})}
                className="text-xs bg-white text-indigo-600 px-2 py-1 rounded-full flex items-center"
              >
                Clear all <FiX className="ml-1" />
              </button>
            )}
          </h2>
        </div>

        <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Search */}

          {/* Price Range */}
          <PriceFilter
            expanded={expandedSections.price}
            toggleSection={toggleSection}
            priceInputs={priceInputs}
            handleFilterChange={handleFilterChange}
          />

          {/* Categories */}
          {filters.categories?.length > 0 && (
            <CategoryFilter
              categories={filters.categories}
              expanded={expandedSections.categories}
              toggleSection={toggleSection}
              isFilterActive={isFilterActive}
              toggleArrayFilter={toggleArrayFilter}
            />
          )}

          {/* Genders */}
          {filters.genders?.length > 0 && (
            <GenderFilter
              genders={filters.genders}
              expanded={expandedSections.gender}
              toggleSection={toggleSection}
              isFilterActive={isFilterActive}
              toggleArrayFilter={toggleArrayFilter}
            />
          )}

          {/* Brands */}
          {filters.brands?.length > 0 && (
            <BrandFilter
              brands={filters.brands}
              expanded={expandedSections.brands}
              toggleSection={toggleSection}
              isFilterActive={isFilterActive}
              toggleArrayFilter={toggleArrayFilter}
            />
          )}

          {/* Colors */}
          {filters.colors?.length > 0 && (
            <ColorFilter
              colors={filters.colors}
              expanded={expandedSections.colors}
              toggleSection={toggleSection}
              isFilterActive={isFilterActive}
              toggleArrayFilter={toggleArrayFilter}
            />
          )}

          {/* Sizes */}
          {filters.sizes?.length > 0 && (
            <SizeFilter
              sizes={filters.sizes}
              expanded={expandedSections.sizes}
              toggleSection={toggleSection}
              isFilterActive={isFilterActive}
              toggleArrayFilter={toggleArrayFilter}
            />
          )}

          {/* Special Filters */}
          <SpecialFilter
            expanded={expandedSections.special}
            toggleSection={toggleSection}
            activeFilters={activeFilters}
            handleFilterChange={handleFilterChange}
          />

          {/* Sorting */}
        </div>
      </div>
    </>
  );
};

export default ProductFilters;
