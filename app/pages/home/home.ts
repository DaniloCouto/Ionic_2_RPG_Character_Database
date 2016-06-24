import {Page,Platform,NavController} from 'ionic-angular';
import {AddSystemPage} from '../add-system/add-system';
import {SqlHelper} from '../../providers/sql-helper/sql-helper';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [SqlHelper] 
})
export class HomePage {
  systemArray : any;
  localSqlHelper : SqlHelper;
  platform : Platform;
  nav : NavController;
  constructor(sqlHelper : SqlHelper, platform : Platform,nav:NavController) {
    this.systemArray = []
    this.localSqlHelper = sqlHelper; 
    this.platform = platform;
    this.nav = nav;
    this.platform.ready().then(()=>{
      this.refresh();
    });
  }

  refresh(){
    this.platform.ready().then(()=>{
      this.localSqlHelper.selectAll('System').then((array)=>{
        this.systemArray = array
      })
    });
  }

  deleteItem(item){
    this.platform.ready().then(()=>{
      this.localSqlHelper.delete('System',item._id).then((success)=>{
        this.systemArray.splice(this.systemArray.indexOf(item),1)
      })
    });
  }
  editItem(item){
    this.nav.push(AddSystemPage,{systemId:item._id})
  }
  addItem(){
    this.nav.push(AddSystemPage)
  }

  onPageWillEnter(){
    this.refresh();
  }
  
}
