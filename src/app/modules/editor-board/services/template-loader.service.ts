import {ComponentFactoryResolver, Inject, Injectable, ViewContainerRef} from '@angular/core';
import {ViewerComponent} from '../../editor-board/components/viewer/viewer.component';

@Injectable()
export class TemplateLoaderService {

  rootViewContainer: ViewContainerRef;

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver) { }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicComponent(componentName) {
    console.log('this.rootViewContainer', this.rootViewContainer);
    const factory = this.factoryResolver
      .resolveComponentFactory(componentName);
    const component = factory.create(this.rootViewContainer.parentInjector);
    //const component = this.rootViewContainer.createComponent(factory);
    this.rootViewContainer.insert(component.hostView)
  }
}
