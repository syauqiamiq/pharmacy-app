import { ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Spin, Typography } from 'antd';
import { useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { usePdfViewer } from './hooks/usePdfViewer';
import PDFToolbar from './PDFToolbar';

const { Text } = Typography;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface PDFViewerProps {
  url: string;
}

export const PDFViewer = ({ url }: PDFViewerProps) => {
  const {
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
  } = usePdfViewer({
    initialScale: 1.0,
  });

  const options = useMemo(
    () => ({
      cMapUrl: '/cmaps/',
      standardFontDataUrl: '/standard_fonts/',
      wasmUrl: '/wasm/',
    }),
    []
  );

  const documentFile = useMemo(
    () => ({
      url,
    }),
    [url]
  );

  const handleReload = () => {
    window.location.reload();
  };

  const renderDocumentContent = () => {
    return (
      <Document
        file={documentFile}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        options={options}
        loading={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '400px',
            }}
          >
            <Spin size="large" tip="Loading PDF document..." />
          </div>
        }
        error={
          <Alert
            message="Failed to Load PDF"
            description="The PDF document could not be loaded. Please check your internet connection or try again later."
            type="error"
            showIcon
            icon={<ExclamationCircleOutlined />}
            action={
              <Button
                size="small"
                icon={<ReloadOutlined />}
                onClick={handleReload}
              >
                Retry
              </Button>
            }
            style={{ margin: '20px' }}
          />
        }
      >
        {numPages > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              gap: '20px',
            }}
          >
            {Array.from({ length: numPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <div
                  key={`page_${pageNumber}`}
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    border: '1px solid #e8e8e8',
                  }}
                >
                  <div
                    style={{
                      padding: '8px',
                      backgroundColor: '#fafafa',
                      borderBottom: '1px solid #e8e8e8',
                      textAlign: 'center',
                      fontSize: '12px',
                      color: '#666',
                    }}
                  >
                    Page {pageNumber} of {numPages}
                  </div>
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    width={pageWidth}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    loading={
                      <div
                        style={{
                          width: pageWidth * scale,
                          height: pageWidth * scale * 1.4,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'white',
                          border: '1px solid #d9d9d9',
                        }}
                      >
                        <Spin tip={`Loading page ${pageNumber}...`} />
                      </div>
                    }
                    error={
                      <div
                        style={{
                          width: pageWidth * scale,
                          height: pageWidth * scale * 1.4,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#fff2f0',
                          border: '1px solid #ffccc7',
                          color: '#cf1322',
                        }}
                      >
                        <Text type="danger">
                          Failed to load page {pageNumber}
                        </Text>
                      </div>
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
      </Document>
    );
  };

  return (
    <div ref={containerRef}>
      <Card size="small">
        <PDFToolbar
          numPages={numPages}
          scale={scale}
          isFullscreen={isFullscreen}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
          onScaleChange={handleScaleChange}
          onPrint={handlePrint}
          onToggleFullscreen={toggleFullscreen}
          onReload={handleReload}
          disabled={loading}
        />
      </Card>

      <div
        ref={documentRef}
        className={
          !isFullscreen
            ? 'h-[calc(100vh-16rem)] overflow-y-scroll'
            : 'overflow-y-scroll'
        }
        style={{
          marginTop: '16px',
          backgroundColor: isFullscreen ? '#000' : '#f5f5f5',
          borderRadius: isFullscreen ? 0 : '18px',
          border: isFullscreen ? 'none' : '1px solid #d9d9d9',
        }}
      >
        {renderDocumentContent()}
      </div>
    </div>
  );
};
