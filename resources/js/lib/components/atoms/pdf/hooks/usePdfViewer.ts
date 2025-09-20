import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useCallback, useEffect, useRef, useState } from 'react';

interface FullscreenElement extends Element {
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface FullscreenDocument extends Document {
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
  webkitFullscreenElement?: Element;
  msFullscreenElement?: Element;
}

interface UsePdfViewerProps {
  initialScale?: number;
}

interface UsePdfViewerReturn {
  // State
  numPages: number;
  scale: number;
  loading: boolean;
  isFullscreen: boolean;
  pageWidth: number;

  // Refs
  documentRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;

  // Handlers
  onDocumentLoadSuccess: (pdf: PDFDocumentProxy) => Promise<void>;
  onDocumentLoadError: (error: Error) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleZoomReset: () => void;
  handlePrint: () => void;
  toggleFullscreen: () => void;
  handleScaleChange: (value: number) => void;

  // Setters
  setScale: (scale: number) => void;
}

export const usePdfViewer = ({
  initialScale = 1.0,
}: UsePdfViewerProps): UsePdfViewerReturn => {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(initialScale);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [pageWidth, setPageWidth] = useState<number>(800);

  const documentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = useCallback(async (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
    setLoading(false);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('PDF load error:', error);
    setLoading(false);
  }, []);

  const handleZoomIn = useCallback(() => {
    const newScale = Math.min(scale + 0.25, 3.0);
    setScale(newScale);
  }, [scale]);

  const handleZoomOut = useCallback(() => {
    const newScale = Math.max(scale - 0.25, 0.25);
    setScale(newScale);
  }, [scale]);

  const handleZoomReset = useCallback(() => {
    setScale(1.0);
  }, []);

  const handlePrint = useCallback(() => {
    try {
      window.print();
    } catch (error) {
      console.error('Print error:', error);
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        const element = containerRef.current as FullscreenElement;
        if (element?.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element?.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        } else if (element?.msRequestFullscreen) {
          await element.msRequestFullscreen();
        }
      } else {
        const doc = document as FullscreenDocument;
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [isFullscreen]);

  const handleScaleChange = useCallback((value: number) => {
    const newScale = value / 100;
    setScale(newScale);
  }, []);

  // Keyboard shortcuts (zoom only)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;

      switch (event.key) {
        case '+':
        case '=':
          if (isCtrlOrCmd) {
            event.preventDefault();
            handleZoomIn();
          }
          break;
        case '-':
          if (isCtrlOrCmd) {
            event.preventDefault();
            handleZoomOut();
          }
          break;
        case '0':
          if (isCtrlOrCmd) {
            event.preventDefault();
            handleZoomReset();
          }
          break;
        case 'f':
          if (isCtrlOrCmd && event.shiftKey) {
            event.preventDefault();
            toggleFullscreen();
          }
          break;
        case 'p':
          if (isCtrlOrCmd) {
            event.preventDefault();
            handlePrint();
          }
          break;
      }
    },
    [
      handleZoomIn,
      handleZoomOut,
      handleZoomReset,
      toggleFullscreen,
      handlePrint,
    ]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Update page width based on container size
  useEffect(() => {
    const updatePageWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const padding = isFullscreen ? 40 : 80;
        setPageWidth(Math.min(containerWidth - padding, 1200));
      }
    };

    updatePageWidth();
    const resizeObserver = new ResizeObserver(updatePageWidth);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [isFullscreen]);

  // Handle fullscreen change
  const handleFullscreenChange = useCallback(() => {
    const doc = document as FullscreenDocument;
    const isCurrentlyFullscreen = !!(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement
    );
    setIsFullscreen(isCurrentlyFullscreen);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'msfullscreenchange',
        handleFullscreenChange
      );
    };
  }, [handleFullscreenChange]);

  return {
    // State
    numPages,
    scale,
    loading,
    isFullscreen,
    pageWidth,

    // Refs
    documentRef,
    containerRef,

    // Handlers
    onDocumentLoadSuccess,
    onDocumentLoadError,
    handleZoomIn,
    handleZoomOut,
    handleZoomReset,
    handlePrint,
    toggleFullscreen,
    handleScaleChange,

    // Setters
    setScale,
  };
};
