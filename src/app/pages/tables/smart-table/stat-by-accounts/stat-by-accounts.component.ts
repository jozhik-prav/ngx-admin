import { Component, Input, Output, EventEmitter } from '@angular/core';
import {InjiService} from '../inji.service';
import { Subscription ,Subject} from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from 'app/@core/data/smart-table';

//http://plnkr.co/edit/SVbMLQJSrZMkiwf5NKc8?p=preview

@Component({
  selector: 'td[sarmad]',
  templateUrl: './stat-by-accounts.component.html',
  host: {
      "[attr.colspan]": "6", 
      "(removeTheRow)": "ref"
   },
})

export class StatByAccountsComponent  {
  @Input() name: string;
  @Input() componentName: string;
  @Input() ref: any;
  @Output() onRemove = new EventEmitter<any>();
   

  test(){
    alert("HI: " + this.name);
  }

//@Output('removeTheRow') 
//closeRow = new EventEmitter<any>();
  close(ref:any){
    console.log("internal close");
    this.InjiService.removeComponent(ref);
    debugger;
    this.InjiService.componentSubjects[this.componentName].next("value emitted from "+ref.componentName)
    debugger;
    //this.closeRow.emit();
    //this.onRemove.emit(this.ref);
  }

  settings = {
    actions: false,
    columns: {
      account: {
        title: 'Номер счета',
        type: 'text',
        filter: false,
      },
      month: {
        title: 'Месяц',
        type: 'text',
        filter: false,
      },
      input: {
        title: 'Входящий остаток',
        type: 'text',
        filter: false,
      },
      debet: {
        title: 'Сумма входящих транзакций',
        type: 'text',
        filter: false,
      },
      credit: {
        title: 'Сумма исходящих транзакций',
        type: 'text',
        filter: false,
      },
      output: {
        title: 'Исходящий остаток',
        type: 'text',
        filter: false,
      }
    }
  }

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private InjiService: InjiService) {
    const data = [
      {
        id: 1,
        account: '000000000000',
        month: 'октябрь',
        input: 20000,
        debet: 1000,
        credit: 2000,
        output: 10000,
      }
    ];
    this.source.load(data);
    
  }
}
