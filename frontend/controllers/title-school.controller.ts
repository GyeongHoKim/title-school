import { ReactiveController, ReactiveControllerHost } from "lit";
import apiClient from "../client/api-client";
import { isTitleSchool, TitleSchool } from "../model/title-school";

export class TitleSchoolController implements ReactiveController {
  private host: ReactiveControllerHost;
  public isLoading: boolean = true;
  public isError: boolean = false;
  public titleSchool?: TitleSchool;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  private typeGuard<T>(data: unknown, isType: (data: unknown) => data is T): T {
    if (isType(data)) {
      return data;
    }
    console.error('Invalid data type', data);
    throw new Error('Invalid data type');
  }


  hostConnected(): void {
    apiClient.get<TitleSchool>('title-school')
      .then((data) => {
        console.debug('hostConnected', data);
        this.titleSchool = this.typeGuard(data, isTitleSchool);
      })
      .catch(() => {
        this.isError = true;
      })
      .finally(() => {
        this.isLoading = false;
        this.host.requestUpdate();
      });
  }

  public refetch(): void {
    this.isLoading = true;
    this.isError = false;
    this.titleSchool = undefined;

    apiClient.get<TitleSchool>('title-school')
      .then((data) => {
        this.titleSchool = this.typeGuard(data, isTitleSchool);
        console.debug('refetch', this.titleSchool);
      })
      .catch(() => this.isError = true)
      .finally(() => {
        this.isLoading = false;
        this.host.requestUpdate();
      });
  }
}