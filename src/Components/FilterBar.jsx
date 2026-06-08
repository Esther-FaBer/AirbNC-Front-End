import styles from "./FilterBar.module.css";

export default function FilterBar({ filters, onFilterChange, onReset, totalResults }) {
  const hasActiveFilters =
    filters.search !== "" ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.sortBy !== "default";

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterControls}>

        {/* Price Range */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Min Price (£)</label>
          <input
            type="number"
            className={styles.input}
            placeholder="No min"
            value={filters.minPrice}
            min="0"
            onChange={(e) => onFilterChange("minPrice", e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Max Price (£)</label>
          <input
            type="number"
            className={styles.input}
            placeholder="No max"
            value={filters.maxPrice}
            min="0"
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          />
        </div>
        
        {/* Sort */}
        <div className={styles.filterGroup}>
          <label className={styles.label}>Sort By</label>
          <select
            className={styles.select}
            value={filters.sortBy}
            onChange={(e) => onFilterChange("sortBy", e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Top Rated</option>
          </select>
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <button className={styles.resetBtn} onClick={onReset}>
            ✕ Clear filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className={styles.resultsCount}>
        {totalResults} {totalResults === 1 ? "property" : "properties"} found
      </p>
    </div>
  );
}
