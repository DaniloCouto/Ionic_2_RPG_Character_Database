import {Page} from 'ionic-angular';
import {AdicionarPage} from '../adicionar/adicionar';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  adicionarPage = AdicionarPage
  
  constructor() {}
}
