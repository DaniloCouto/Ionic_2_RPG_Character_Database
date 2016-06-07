import {Page} from 'ionic-angular';
import {SqlHelper} from '../../providers/sql-helper/sql-helper';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [SqlHelper] 
})
export class HomePage {
  localSystemSqlHelper : SqlHelper
  constructor(systemSqlHelper: SqlHelper) {
    this.localSystemSqlHelper = systemSqlHelper;
    this.insertSystem();
  }
  insertSystem() {
    this.localSystemSqlHelper.insert('System',['name','description'])
  }
}
