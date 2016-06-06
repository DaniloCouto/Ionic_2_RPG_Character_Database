import {Injectable} from '@angular/core';
import {Platform, Storage, SqlStorage} from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the SqLiteHelper provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SqliteHelper {
  public storage : any;
  public platform : any;

  constructor(sqlite: SqlStorage, platform: Platform) {
    this.storage = new Storage(SqlStorage);
    this.platform =  platform;
    this.init();
  }

  init() {
    this.platform.ready().then(() => {
            this.storage = new Storage(SqlStorage);
            this.storage.query('CREATE TABLE IF NOT EXISTS Characters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, race TEXT, class TEXT)').then((data) => {
                console.log("TABLE CREATED -> " + JSON.stringify(data.res));
            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });
        });
  }
}

