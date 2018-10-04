import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageInfoService, PlatformDetectService} from '@j2xT/shared/services';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private pageInfoService: PageInfoService,
    private platformDetectService: PlatformDetectService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('fr_FR');
  }

  ngOnInit(): void {
    this.pageInfoService.init();
  }

}
