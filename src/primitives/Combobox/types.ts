import { BaseInputWrapperInterface } from "../Input/InputWrapper";
import { DropdownContainerInterface, DropdownItemInterface } from "../Dropdown/types";

export interface ComboboxInterface<CODE extends string | number>
  extends Omit<DropdownContainerInterface<CODE>, "onChange" | "size" | "excludeSelected" | "searchable">,
    Pick<
      BaseInputWrapperInterface,
      "outerStyles" | "disabled" | "title" | "titlePosition" | "tip" | "error" | "success" | "children"
    > {
  styles?: any;
  placeholder?: string;
  onChange: (codes: CODE[]) => void;
  onChangeItemsList: (newItemsList: DropdownItemInterface<CODE>[]) => void;
}
