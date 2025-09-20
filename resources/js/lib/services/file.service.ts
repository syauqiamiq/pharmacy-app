import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import axios from 'axios';

// File Download Hook
export const useDownloadFile = () => {
    return useMutation({
        mutationFn: async ({ url, filename }: { url: string; filename?: string }): Promise<void> => {
            try {
                // Fetch the file
                const response = await axios.get(url, {
                    responseType: 'blob',
                });

                // Create blob URL
                const blob = new Blob([response.data]);
                const downloadUrl = window.URL.createObjectURL(blob);

                // Create temporary anchor element for download
                const link = document.createElement('a');
                link.href = downloadUrl;

                // Set filename - use provided filename or extract from URL or use default
                if (filename) {
                    link.download = filename;
                } else {
                    // Try to extract filename from URL
                    const urlParts = url.split('/');
                    const urlFilename = urlParts[urlParts.length - 1];
                    link.download = urlFilename || 'download';
                }

                // Trigger download
                document.body.appendChild(link);
                link.click();

                // Cleanup
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);

                // Show success notification
                notification.success({
                    message: 'Download Berhasil',
                    description: `File ${link.download} berhasil didownload`,
                    duration: 3,
                });
            } catch (error) {
                // Show error notification
                notification.error({
                    message: 'Download Gagal',
                    description: 'Terjadi kesalahan saat mendownload file',
                    duration: 5,
                });
                throw error;
            }
        },
    });
};

// File Download Hook with Custom Headers (for authenticated downloads)
export const useDownloadFileWithAuth = () => {
    return useMutation({
        mutationFn: async ({ url, filename, headers = {} }: { url: string; filename?: string; headers?: Record<string, string> }): Promise<void> => {
            try {
                // Get auth token from localStorage or wherever you store it
                const token = localStorage.getItem('auth_token');

                const response = await axios.get(url, {
                    responseType: 'blob',
                    headers: {
                        ...headers,
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                });

                // Create blob URL
                const blob = new Blob([response.data]);
                const downloadUrl = window.URL.createObjectURL(blob);

                // Create temporary anchor element for download
                const link = document.createElement('a');
                link.href = downloadUrl;

                // Set filename
                if (filename) {
                    link.download = filename;
                } else {
                    // Try to get filename from Content-Disposition header
                    const contentDisposition = response.headers['content-disposition'];
                    if (contentDisposition) {
                        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                        if (filenameMatch) {
                            link.download = filenameMatch[1];
                        }
                    }

                    if (!link.download) {
                        // Fallback to URL extraction
                        const urlParts = url.split('/');
                        const urlFilename = urlParts[urlParts.length - 1];
                        link.download = urlFilename || 'download';
                    }
                }

                // Trigger download
                document.body.appendChild(link);
                link.click();

                // Cleanup
                document.body.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);

                // Show success notification
                notification.success({
                    message: 'Download Berhasil',
                    description: `File ${link.download} berhasil didownload`,
                    duration: 3,
                });
            } catch (error) {
                // Show error notification
                notification.error({
                    message: 'Download Gagal',
                    description: 'Terjadi kesalahan saat mendownload file',
                    duration: 5,
                });
                throw error;
            }
        },
    });
};

// Simple download function (non-React Query version)
export const downloadFile = async (url: string, filename?: string): Promise<void> => {
    try {
        const response = await axios.get(url, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;

        if (filename) {
            link.download = filename;
        } else {
            const urlParts = url.split('/');
            const urlFilename = urlParts[urlParts.length - 1];
            link.download = urlFilename || 'download';
        }

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);

        notification.success({
            message: 'Download Berhasil',
            description: `File ${link.download} berhasil didownload`,
            duration: 3,
        });
    } catch (error) {
        notification.error({
            message: 'Download Gagal',
            description: 'Terjadi kesalahan saat mendownload file',
            duration: 5,
        });
        throw error;
    }
};

// Preview file in new tab (for PDFs, images, etc.)
export const previewFile = (url: string): void => {
    window.open(url, '_blank');
};

// Get file extension from URL
export const getFileExtension = (url: string): string => {
    const urlParts = url.split('.');
    return urlParts[urlParts.length - 1].toLowerCase();
};

// Check if file can be previewed in browser
export const canPreviewFile = (url: string): boolean => {
    const extension = getFileExtension(url);
    const previewableExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'txt'];
    return previewableExtensions.includes(extension);
};
