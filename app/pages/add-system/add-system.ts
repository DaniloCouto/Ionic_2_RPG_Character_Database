import {Page, NavController, NavParams} from 'ionic-angular';
import {SqlHelper} from '../../providers/sql-helper/sql-helper';

/*
  Generated class for the AddSystemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/add-system/add-system.html',
  providers: [SqlHelper]
})
export class AddSystemPage {

  private systemId: number;
  private intenalNav: NavController;
  public systemOnScreen: any;
  public nameValid = false;
  private localSystemSqlHelper: SqlHelper;

  constructor(public nav: NavController, params: NavParams, systemSqlHelper: SqlHelper) {
    this.intenalNav = nav;
    this.systemId = params.get('systemId');
    this.localSystemSqlHelper = systemSqlHelper;
    this.systemOnScreen = {
      name: "",
      description: ""
    }
    this.refresh()
  }
  refresh() {
    if (this.systemId !== null || typeof this.systemId !== 'undefined') {
      this.localSystemSqlHelper.select('System', this.systemId).then((success)=>{
        console.log(success)
        this.systemOnScreen.name = success[0].name;
        this.systemOnScreen.description = success[0].description;
      })
    }
  }
  done() {
    if (this.systemOnScreen.name != "") {
      if (this.systemId === null || typeof this.systemId === 'undefined') {
        this.localSystemSqlHelper.insert('System', ['name', 'description'], [this.systemOnScreen.name, this.systemOnScreen.description])
      } else {
        this.localSystemSqlHelper.update('System', ['name', 'description'], [this.systemOnScreen.name, this.systemOnScreen.description], this.systemId)
      }
      this.intenalNav.pop()
    } else {
      this.nameValid = true;
    }
  }
}
