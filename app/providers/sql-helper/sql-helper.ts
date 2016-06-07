import {Injectable} from '@angular/core';
import {Platform, Storage, SqlStorage} from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the SqLiteHelper provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SqlHelper {
  public platform: Platform;
  public storage: Storage;
  constructor(platform: Platform) {
    this.storage = new Storage(SqlStorage);
    this.platform = platform;
    this.init();
  }
  init() {
    this.platform.ready().then(() => {
      this.storage.query('CREATE TABLE IF NOT EXISTS System (idSystem INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NULL,description TEXT NULL)').then((data) => {
        this.storage.query('CREATE TABLE IF NOT EXISTS Characters (' +
          'idCharacters INTEGER PRIMARY KEY AUTOINCREMENT,' +
          'System_idSystem INTEGER,' +
          'name TEXT NULL,' +
          'race TEXT NULL,' +
          'class TEXT NULL,' +
          'level INTEGER UNSIGNED NULL,' +
          'exp INTEGER UNSIGNED NULL,' +
          'nextExp INTEGER UNSIGNED NULL,' +
          'FOREIGN KEY(System_idSystem) REFERENCES System(idSystem)' +
          ');').then((data) => {
            this.storage.query('CREATE TABLE IF NOT EXISTS Skill (' +
              'idSkill INTEGER PRIMARY KEY AUTOINCREMENT,' +
              'System_idSystem INTEGER,' +
              'name TEXT NULL,' +
              'description TEXT NULL,' +
              'level INTEGER UNSIGNED NULL,' +
              'FOREIGN KEY(System_idSystem) REFERENCES System(idSystem)' +
              ');').then((data) => {
                this.storage.query('CREATE TABLE IF NOT EXISTS Base_atribute (' +
                  'idBase_atribute INTEGER PRIMARY KEY AUTOINCREMENT,' +
                  'System_idSystem INTEGER,' +
                  'name TEXT NULL,' +
                  'value INTEGER UNSIGNED NULL,' +
                  'FOREIGN KEY(System_idSystem) REFERENCES System(idSystem)' +
                  ');').then((data) => {
                    this.storage.query('CREATE TABLE IF NOT EXISTS Secundary_atribute (idSecundary_atribute INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,value INTEGER);')
                    .then((data) => {
                        this.storage.query('CREATE TABLE IF NOT EXISTS Characters_has_Skill (' +
                          'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                          'Characters_idCharacters INTEGER,' +
                          'Skill_idSkill INTEGER,' +
                          'FOREIGN KEY(Characters_idCharacters) REFERENCES Characters(idCharacters),' +
                          'FOREIGN KEY(Skill_idSkill) REFERENCES Skill(idSkill)' +
                          ');').then((data) => {
                            this.storage.query('CREATE TABLE IF NOT EXISTS Base_atribute_has_Secundary_atribute (' +
                              'Base_atribute_idBase_atribute INTEGER,' +
                              'Secundary_atribute_idSecundary_atribute INTEGER,' +
                              'FOREIGN KEY(Base_atribute_idBase_atribute) REFERENCES Base_atribute(idBase_atribute),' +
                              'FOREIGN KEY(Secundary_atribute_idSecundary_atribute) REFERENCES Secundary_atribute(idSecundary_atribute)' +
                              ');').then((data) => {
                                this.storage.query('CREATE TABLE IF NOT EXISTS Characters_has_Base_atribute (' +
                                  'Characters_idCharacters INTEGER,' +
                                  'Base_atribute_idBase_atribute INTEGER,' +
                                  'FOREIGN KEY(Characters_idCharacters) REFERENCES Characters(idCharacters),' +
                                  'FOREIGN KEY(Base_atribute_idBase_atribute) REFERENCES Base_atribute(idBase_atribute)' +
                                  ');').then((data) => {
                                    console.log("TABLE CREATED -> " + JSON.stringify(data.res));
                                  }, (error) => {
                                    console.log("Characters_has_Base_atribute ERROR -> " + JSON.stringify(error.err), error);
                                  });
                              }, (error) => {
                                console.log("Base_atribute_has_Secundary_atribute ERROR -> " + JSON.stringify(error.err), error);
                              });
                          }, (error) => {
                            console.log("Characters_has_Skill ERROR -> " + JSON.stringify(error.err), error);
                          });
                      }, (error) => {
                        console.log("Secundary_atribute ERROR -> " + JSON.stringify(error.err), error);
                      });
                  }, (error) => {
                    console.log("Base_atribute ERROR -> " + JSON.stringify(error.err), error);
                  });
              }, (error) => {
                console.log("Skill ERROR -> " + JSON.stringify(error.err), error);
              });
          }, (error) => {
            console.log("Characters ERROR -> " + JSON.stringify(error.err), error);
          });
      }, (error) => {
        console.log("System ERROR -> " + JSON.stringify(error.err), error);
      });
    });
  }
}

