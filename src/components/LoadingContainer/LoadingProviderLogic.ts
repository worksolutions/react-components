import { makeAutoObservable } from "mobx";

export class LoadingProviderLogic {
  constructor() {
    makeAutoObservable(this);
  }

  static attributeName = "system-loader-provider";

  private id = 1;

  providers: Record<number | string, { spinnerCount: number }> = {};

  generateId() {
    return this.id++;
  }
}

export const loadingProviderLogicStore = new LoadingProviderLogic();
