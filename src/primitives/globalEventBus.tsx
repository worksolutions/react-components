export interface BaseToastInterface {
  text: string;
  error?: boolean;
  cancelButton?: {
    text: string;
    onClick: () => void;
  };
}
