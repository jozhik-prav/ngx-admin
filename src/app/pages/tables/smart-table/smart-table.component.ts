import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';

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
    columns: {
      type: {
        title: 'Тип',
        type: 'number',
        valuePrepareFunction(cell:number) {
          switch (cell){
            case 0: return 'Физическое лицо'
            case 1: return 'Юридическое лицо'
            default: return 'Такого не может быть'
          }
        }
      },
      name: {
        title: 'Наименование/ФИО',
        type: 'string',
      },
      createDate: {
        title: 'Дата создания/дата рождения',
        type: 'date',
        valuePrepareFunction(cell:Date) {
          return cell.toLocaleDateString();
        }
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
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
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
}
