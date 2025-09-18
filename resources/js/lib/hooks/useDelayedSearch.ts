/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

export const useDelayedSearch = () => {
  const [delayedSearchValue, setDelayedSearchValue] = useState<string>('');
  // Create a state variable to store the search query
  const [searchValue, setSearchValue] = useState<string>('');
  // Use useEffect to handle the delayed search
  useEffect(() => {
    // Create a timer variable to store the setTimeout ID
    let timer: NodeJS.Timeout | undefined = undefined;
    // Define a function to perform the search
    const performSearch = () => {
      setDelayedSearchValue(searchValue);
    };
    // Clear the previous timer (if any) whenever the searchQuery changes
    clearTimeout(timer);
    // Set a new timer to perform the search after 1000 milliseconds (1 second)
    timer = setTimeout(performSearch, 1000);
    // Clean up the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);
  return {
    searchValue,
    setSearchValue,
    delayedSearchValue,
  };
};
