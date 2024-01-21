import { Observable } from "rxjs";
import { ServiceResult } from "../models/base/service-result";

export interface UploadEvent {
  id: number,
  ob: Observable<ServiceResult>,
  file: File,
  status: FileHandlingStatus,
  response?: ServiceResult,
  message?: string
}

export enum FileHandlingStatus {
  Handling = 0,
  Success = 1,
  Failed = 2
}
