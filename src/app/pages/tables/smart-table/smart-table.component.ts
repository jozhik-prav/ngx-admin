import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { InjiService } from './inji.service';
import { SmartTableData } from '../../../@core/data/smart-table';
import { StatByAccountsComponent } from './stat-by-accounts/stat-by-accounts.component';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: 'Действия'
    },
    columns: {
      type: {
        title: 'Тип',
        type: 'number',
        valuePrepareFunction(cell:string) {
          switch (cell){
            case '0': return 'Физическое лицо'
            case '1': return 'Юридическое лицо'
            default: return 'Такого не может быть'
            
          }
        },
        editor: {
          type: 'list',
          config: {
            list: [{ value: 0, title: 'Физическое лицо' }, { value: 1, title: 'Юридическое лицо' }]
          }
        }
      },
      name: {
        title: 'Наименование/ФИО',
        type: 'string',
      },
      createDate: {
        title: 'Дата создания/дата рождения',
        type: 'string',
        valuePrepareFunction(cell:Date) {
          return cell.toLocaleDateString();
        },
      },
      address: {
        title: 'Адрес регистрации/юр. адрес',
        type: 'string',
      },
      inn: {
        title: 'ИНН',
        type: 'string',
      },
    },
    rowClassFunction: (row) => {
      return `row-${row.data.id}`;
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private InjiService: InjiService) {
    const data = this.service.getData();
    this.source.load(data);
    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  expanededComp: any = null;

  onRowClick(event): void {
   /*const closestParent = event.target.closest("tr.ocean-st-row");
     this.expanededComp = this.InjiService.appendComponent(HelloComponent, event.data, closestParent);*/
     const closestParent = document.querySelector(`tr.row-${event.data.id}`);
     this.expanededComp = this.InjiService.appendComponent(StatByAccountsComponent, event.data, closestParent);
  }
}
