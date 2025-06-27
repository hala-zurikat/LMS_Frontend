import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as courseService from "../../services/courseService";
import CourseCard from "../../features/courses/components/CourseCard";
import styles from "./SearchResultsPage.module.css";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await courseService.searchCourses(query);
        setResults(data);
      } catch (err) {
        setError("Error loading search results.");
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className={styles.container}>
      <h2>Search Results for: "{query}"</h2>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && results.length === 0 && <p>No courses found.</p>}
      <div className={styles.grid}>
        {results.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
