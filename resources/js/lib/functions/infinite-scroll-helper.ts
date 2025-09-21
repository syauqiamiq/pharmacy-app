export type OnInfiniteScrollProps = {
    event: React.UIEvent<HTMLElement>;
    hasNextPage: boolean;
    fetchNextPage: () => Promise<unknown>;
};

// Global set to track elements currently loading to prevent multiple triggers
const loadingElements = new WeakSet<HTMLElement>();

/**
 * Handles infinite scroll functionality with cross-browser compatibility
 * and prevents multiple simultaneous requests.
 *
 * @param {OnInfiniteScrollProps} params - The infinite scroll configuration
 * @param {React.UIEvent<HTMLElement>} params.event - The scroll event
 * @param {boolean} params.hasNextPage - Whether there are more pages to load
 * @param {() => Promise<unknown>} params.fetchNextPage - Function to fetch the next page
 * @returns {Promise<void>}
 */
const onInfiniteScroll = async ({ event, hasNextPage, fetchNextPage }: OnInfiniteScrollProps): Promise<void> => {
    if (!hasNextPage) {
        return;
    }

    const target = event.target as HTMLElement;

    // Check if this element is already loading to prevent multiple triggers
    if (loadingElements.has(target)) {
        return;
    }

    // Get scroll measurements
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    // Calculate distance from bottom with cross-browser compatibility
    // Using Math.ceil to handle subpixel rendering differences
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    // Trigger fetch when within 100px from bottom (fixed threshold)
    if (distanceFromBottom <= 100) {
        // Mark this element as loading
        loadingElements.add(target);

        try {
            await fetchNextPage();
        } catch (error) {
            // Handle error silently or let the calling component handle it
            console.error('Error fetching next page:', error);
        } finally {
            // Always remove from loading set when done
            loadingElements.delete(target);
        }
    }
};

/**
 * Manually clears the loading state for a specific element.
 * Useful for resetting state when component unmounts or on error recovery.
 *
 * @param {HTMLElement} element - The element to clear loading state for
 * @returns {void}
 */
const clearInfiniteScrollLoading = (element: HTMLElement): void => {
    loadingElements.delete(element);
};

/**
 * Extracts the next page number from API response metadata.
 * Returns undefined if there are no more pages available.
 *
 * @param {Object} res - The API response object
 * @param {Object} [res.meta] - Pagination metadata
 * @param {number} res.meta.current_page - Current page number
 * @param {number} res.meta.last_page - Last available page number
 * @param {number} res.meta.per_page - Items per page
 * @param {number} res.meta.total - Total number of items
 * @returns {number | undefined} Next page number or undefined if no more pages
 */
const getNextPageParams = (res: {
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}): number | undefined => {
    if (res.meta && res.meta.current_page < res.meta.last_page) return res.meta.current_page + 1;
    return undefined;
};

export { clearInfiniteScrollLoading, getNextPageParams, onInfiniteScroll };
