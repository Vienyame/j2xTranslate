import { PageInfoService } from './pageInfo';
import { GoogleAnalyticsEventsService } from './googleAnalytics';
import { PlatformDetectService } from './platformDetect';
import { LocalStorageService } from './localStorage';
import {EnvironmentService} from "@j2xT/shared/services/environment/environment.service";

export const services = [PageInfoService, GoogleAnalyticsEventsService, PlatformDetectService, LocalStorageService, EnvironmentService];

export * from './pageInfo';
export * from './googleAnalytics';
export * from './platformDetect';
export * from './localStorage';
export * from './environment';
