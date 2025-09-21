import { message } from 'antd';

/**
 * Handle API error response and show appropriate snackbar message
 * @param error - Axios error object
 * @param defaultMessage - Default message if no error message found
 */
export const handleApiErrorMessage = (error: any, defaultMessage: string = 'Terjadi kesalahan'): string => {
    let errorMessage = defaultMessage;

    if (error?.response?.data?.error) {
        // Backend error response format: { code: 401, error: "Ini pesan error" }
        errorMessage = error.response.data.error;
    } else if (error?.response?.data?.message) {
        // Alternative error message format
        errorMessage = error.response.data.message;
    } else if (error?.message) {
        // Network or other errors
        errorMessage = error.message;
    }

    // Show error snackbar using Antd message
    return errorMessage;
};

/**
 * Handle success message
 * @param successMessage - Success message to show
 */
export const handleApiSuccess = (successMessage: string): void => {
    message.success(successMessage);
};

/**
 * Handle warning message
 * @param warningMessage - Warning message to show
 */
export const handleApiWarning = (warningMessage: string): void => {
    message.warning(warningMessage);
};

/**
 * Handle info message
 * @param infoMessage - Info message to show
 */
export const handleApiInfo = (infoMessage: string): void => {
    message.info(infoMessage);
};

/**
 * Generic API success handler for React Query mutations
 * Can be used in onSuccess callbacks
 */
export const apiSuccessHandler = (message: string) => {
    handleApiSuccess(message);
};
