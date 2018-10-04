import { Injectable } from '@angular/core';
import { PlatformDetectService } from '../platformDetect';
import { GoogleAnalyticsEventCategory, GoogleAnalyticsEventAction, GoogleAnalyticsEventLabelPrefix } from '../../models';

@Injectable()
export class GoogleAnalyticsEventsService {
  constructor(private platformDetectService: PlatformDetectService) {}

  public emitEvent(
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    if (this.platformDetectService.isBrowser) {
      (<any>window).ga('send', 'event', {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      });
    }
  }

  submitEvent(category, action, label, value?) {
    this.emitEvent(category, action, label, 10);
  }

  get gaEventCategory() {
    return GoogleAnalyticsEventCategory;
  }

  get gaEventAction() {
    return GoogleAnalyticsEventAction;
  }

  get gaEventLabelPrefix() {
    return GoogleAnalyticsEventLabelPrefix;
  }
}
