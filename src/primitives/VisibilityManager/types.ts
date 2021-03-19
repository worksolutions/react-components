export interface VisibilityManagerContextInterface {
  visibility: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}
