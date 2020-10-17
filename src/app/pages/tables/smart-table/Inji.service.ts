//https://stackblitz.com/edit/dynamically-row-components-for-smart-table-cw7q9y?file=src%2Fapp%2Finji.service.ts

import { Injectable,Injector,
    ComponentFactoryResolver,
    EmbeddedViewRef,
ApplicationRef, Renderer2, RendererFactory2  } from '@angular/core';
import { Subject } from 'rxjs';
import { StatByAccountsComponent } from './stat-by-accounts/stat-by-accounts.component';

@Injectable()
export class InjiService {
 public componentSubjects: { [name: string]: Subject<any> } = {};
  renderer : Renderer2;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

//render in injectable service https://stackoverflow.com/questions/44989666/service-no-provider-for-renderer2
  appendComponent(component: any, data:any, selected:any) {

    // 1. Create a component reference from the component 
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
     
      (<StatByAccountsComponent>componentRef.instance).name = data.name;
      (<StatByAccountsComponent>componentRef.instance).ref = componentRef;
        (<StatByAccountsComponent>componentRef.instance).componentName = data.componentName;
    
    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);
    
    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    
    // 4. Append DOM element to the body
    var tr = document.createElement("tr");
    tr.appendChild(domElem);
    let selectedRow = selected;//.closest(".ng2-smart-row");
    if(selectedRow){
      let nextSib = this.renderer.nextSibling(selectedRow);
      this.renderer.insertBefore(selectedRow.parentNode, tr, nextSib);
    }

/*
    (<HelloComponent>componentRef.instance).closeRow.subscribe(() => {
      console.log("close event");
      this.removeComponent(componentRef);
    });
    */


    return componentRef;
  }

  removeComponent(component: any){
    this.appRef.detachView(component.hostView);
    component.destroy();
  }

}