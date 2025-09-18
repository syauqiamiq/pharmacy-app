import { useState } from 'react';

export type UseDialog<T = unknown> = {
  handleClickOpen: (data?: T | null) => void;
  handleClose: () => void;
  open: boolean;
  data: T | null;
  setDialogState: React.Dispatch<React.SetStateAction<DialogState<T>>>;
};

interface DialogState<T> {
  open: boolean;
  data: T | null;
}

export const useDialog = <T = unknown>() => {
  const [dialogState, setDialogState] = useState<DialogState<T>>({
    open: false,
    data: null,
  });

  const handleClickOpen = (data: T | null = null) => {
    setDialogState({ open: true, data });
  };

  const handleClose = () => {
    setDialogState({ open: false, data: null });
  };

  return {
    handleClickOpen,
    handleClose,
    open: dialogState.open,
    data: dialogState.data,
    setDialogState,
  };
};
