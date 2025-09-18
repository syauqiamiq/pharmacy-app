import { KeyboardEvent } from 'react';

const isCapslockOn = (event: KeyboardEvent<HTMLInputElement>): boolean => {
  return event.getModifierState('CapsLock');
};

export { isCapslockOn };
