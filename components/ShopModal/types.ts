export interface TContactsLink {
  type: string;
  url: string;
}

export interface TProps {
  isOpened: boolean;
  close: () => void;
}
