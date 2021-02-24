import { makeAutoObservable } from "mobx";

export class ProviderLogic {
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

export const providerLogicStore = new ProviderLogic();
