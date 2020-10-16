import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    id: 1,
    type: '0',
    name: 'Otto',
    createDate: new Date(2020, 5, 16),
    address: 'г.Москва',
    inn: '28000000000000',
  }, ];

  getData() {
    return this.data;
  }
}
