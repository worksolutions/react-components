export interface VisibilityManagerContextInterface {
  ref?: any;
  visibility: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}
