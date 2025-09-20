import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Button, Divider, Slider, Space, Tooltip, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

interface PDFToolbarProps {
  numPages: number;
  scale: number;
  isFullscreen: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onScaleChange: (value: number) => void;
  onPrint: () => void;
  onToggleFullscreen: () => void;
  onReload: () => void;
  disabled?: boolean;
}

const PDFToolbar: React.FC<PDFToolbarProps> = ({
  scale,
  isFullscreen,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onScaleChange,
  onToggleFullscreen,
  onReload,
  disabled = false,
}) => {
  return (
    <Space
      wrap
      size="small"
      style={{ width: '100%', justifyContent: 'space-between' }}
    >
      <Divider type="vertical" style={{ height: 'auto' }} />
      <Space size="small">
        <Tooltip title="Zoom Out (Ctrl + -)">
          <Button
            icon={<ZoomOutOutlined />}
            onClick={onZoomOut}
            disabled={disabled || scale <= 0.25}
            size="small"
          />
        </Tooltip>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Slider
            value={scale * 100}
            onChange={onScaleChange}
            min={25}
            max={300}
            step={25}
            style={{ width: 120 }}
            tooltip={{ formatter: (value) => `${value}%` }}
            disabled={disabled}
          />
          <Text
            style={{
              minWidth: 50,
              textAlign: 'center',
              fontSize: '12px',
              color: disabled ? '#d9d9d9' : undefined,
            }}
          >
            {Math.round(scale * 100)}%
          </Text>
        </div>

        <Tooltip title="Zoom In (Ctrl + +)">
          <Button
            icon={<ZoomInOutlined />}
            onClick={onZoomIn}
            disabled={disabled || scale >= 3.0}
            size="small"
          />
        </Tooltip>

        <Tooltip title="Reset Zoom (Ctrl + 0)">
          <Button
            onClick={onZoomReset}
            size="small"
            disabled={disabled}
            type={scale === 1.0 ? 'default' : 'primary'}
          >
            Fit
          </Button>
        </Tooltip>

        <Tooltip
          title={
            isFullscreen
              ? 'Exit Fullscreen'
              : 'Enter Fullscreen (Ctrl + Shift + F)'
          }
        >
          <Button
            icon={
              isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
            }
            onClick={onToggleFullscreen}
            size="small"
            disabled={disabled}
          />
        </Tooltip>

        <Tooltip title="Reload Document">
          <Button
            icon={<ReloadOutlined />}
            onClick={onReload}
            size="small"
            disabled={disabled}
          />
        </Tooltip>
      </Space>
    </Space>
  );
};

export default PDFToolbar;
