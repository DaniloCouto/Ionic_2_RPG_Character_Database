import {Page, NavController} from 'ionic-angular';
import {SqlHelper} from '../../providers/sql-helper/sql-helper';

/*
  Generated class for the AdicionarPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/adicionar/adicionar.html',
  providers: [SqlHelper] 
})
export class AdicionarPage {
  personagem = {
    nome: "",
    raca: "",
    classe: ""
  };
  storage : any;
  constructor(public nav: NavController, sqlHelper : SqlHelper) {
    this.storage = sqlHelper;
  };
  registerChar(){
    this.nav.pop();
  }
}
