import { SyntheticEvent } from 'react';

export type MenuItem = {
  key: string;
  keyPath: string[];
  domEvent: SyntheticEvent;
};
