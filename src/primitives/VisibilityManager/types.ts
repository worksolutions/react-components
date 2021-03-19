export interface VisibilityManagerContextInterface {
  initRef?: any;
  visible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}
