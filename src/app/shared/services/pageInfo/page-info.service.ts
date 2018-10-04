import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { zip } from 'rxjs/observable/zip';

@Injectable()
export class PageInfoService {
  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  init() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(event => {
        this.setTitle(event['title']);
        this.setDescription(event['description']);
      });
  }

  get titlePrefix(): Observable<string> {
    return this.translate
    .get('DEFAULT_TITLE');
  }
  setTitle(title: string) {

    zip(this.titlePrefix, this.translate.get(title))
      .subscribe(t =>
        this.title.setTitle(t[0] + ' - ' + t[1])
      );
  }

  setDescription(description: string) {
    this.translate.get(description).subscribe(d =>
      this.meta.updateTag({
        name: 'description',
        content: d
      })
    );
  }
}
