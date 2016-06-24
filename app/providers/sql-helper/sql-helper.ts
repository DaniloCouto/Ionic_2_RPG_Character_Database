import {Injectable} from '@angular/core';
import {Platform, Storage, SqlStorage} from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the SqLiteHelper provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
class ConventerHelper {
  constructor(){}
  convertResultSet(rows : any): Array<any>{
    var localArray = []
    for(var i = 0; i < rows.length; i++){
      localArray.push(rows[i])
    }
    return localArray
  }
}

@Injectable()
export class SqlHelper {
  public platform: Platform;
  public storage: Storage;
  public localConventer : ConventerHelper;
  constructor(platform: Platform) {
    this.storage = new Storage(SqlStorage);
    this.platform = platform;
    this.init();
    this.localConventer = new ConventerHelper();
  }
  
  init() {
    this.platform.ready().then(() => {
      this.storage.query('CREATE TABLE IF NOT EXISTS System (_id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NULL,description TEXT NULL)').then((data) => {
        this.storage.query('CREATE TABLE IF NOT EXISTS Characters (' +
          '_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
          'System_id INTEGER,' +
          'name TEXT NULL,' +
          'race TEXT NULL,' +
          'class TEXT NULL,' +
          'level INTEGER UNSIGNED NULL,' +
          'exp INTEGER UNSIGNED NULL,' +
          'nextExp INTEGER UNSIGNED NULL,' +
          'FOREIGN KEY(System_id) REFERENCES System(_id)' +
          ');').then((data) => {
            this.storage.query('CREATE TABLE IF NOT EXISTS Skill (' +
              '_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
              'System_id INTEGER,' +
              'name TEXT NULL,' +
              'description TEXT NULL,' +
              'FOREIGN KEY(System_id) REFERENCES System(_id)' +
              ');').then((data) => {
                this.storage.query('CREATE TABLE IF NOT EXISTS Base_atribute (' +
                  '_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                  'System_id INTEGER,' +
                  'name TEXT NULL,' +
                  'FOREIGN KEY(System_id) REFERENCES System(_id)' +
                  ');').then((data) => {
                    this.storage.query('CREATE TABLE IF NOT EXISTS Secundary_atribute (idSecundary_atribute INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT);')
                      .then((data) => {
                        this.storage.query('CREATE TABLE IF NOT EXISTS Characters_has_Skill (' +
                          'Characters_idCharacters INTEGER,' +
                          'Skill_idSkill INTEGER,' +
                          'level INTEGER UNSIGNED NULL,' +
                          'FOREIGN KEY(Characters_idCharacters) REFERENCES Characters(_id),' +
                          'FOREIGN KEY(Skill_idSkill) REFERENCES Skill(_id)' +
                          ');').then((data) => {
                            this.storage.query('CREATE TABLE IF NOT EXISTS Characters_has_Secundary_atribute (' +
                              'Characters_idCharacters INTEGER,' +
                              'Secundary_atribute_idSecundary_atribute INTEGER,' +
                              'value INTEGER,' +
                              'FOREIGN KEY(Characters_idCharacters) REFERENCES Characters(_id),' +
                              'FOREIGN KEY(Secundary_atribute_idSecundary_atribute) REFERENCES Secundary_atribute(_id)' +
                              ');').then((data) => {
                                this.storage.query('CREATE TABLE IF NOT EXISTS Characters_has_Base_atribute (' +
                                  'Characters_idCharacters INTEGER,' +
                                  'Base_atribute_idBase_atribute INTEGER,' +
                                  'value INTEGER,' +
                                  'FOREIGN KEY(Characters_idCharacters) REFERENCES Characters(_id),' +
                                  'FOREIGN KEY(Base_atribute_idBase_atribute) REFERENCES Base_atribute(_id)' +
                                  ');').then((data) => {
                                    console.log("DB OK");
                                  }, (error) => {
                                    console.log("Characters_has_Base_atribute ERROR -> " + JSON.stringify(error.err), error);
                                  });
                              }, (error) => {
                                console.log("Characters_has_Secundary_atribute ERROR -> " + JSON.stringify(error.err), error);
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
  insert(table: string,columns: Array<string>, values: Array<any>) {
    var insertCode = 'INSERT INTO ' + table ;
    function stringyForSQL(value){
      if(typeof value === 'string'){
        return "'"+value+"'";
      }else{
        return value;
      }
    }
    for (var i = 0; i < columns.length; i++) {
      if (i === 0) {
        insertCode += " (" + columns[i] + ","
        
      } else if (i === (values.length-1)) {
        insertCode += columns[i] + ') '
      } else {
        insertCode += columns[i] + ','
      }
    }
    insertCode += 'VALUES '
    for (var i = 0; i < values.length; i++) {
      if (i === 0) {
        insertCode += "(" + stringyForSQL(values[i]) + ","
        
      } else if (i === (values.length-1)) {
        insertCode += stringyForSQL(values[i]) + ')'
      } else {
        insertCode += stringyForSQL(values[i]) + ','
      }
    }
    console.log(insertCode);
    return this.storage.query(insertCode)
      .then((data) => {
        console.log(data);
        return true;
      }, (error) => {
        console.error(error);
        return false;
      });
  }
  delete(table: string, id: number){
    var localStorage = this.storage;
    var localConventer = this.localConventer;
    console.log('DELETE FROM ' + table + ' WHERE _id = '+id)
    return new Promise(function(resolve, reject) {
      localStorage.query('DELETE FROM ' + table + " WHERE _id = '"+id+"'")
      .then((data) => {
        console.log(data)
        resolve(true)
      }, (error) => {
        console.error(error);
        reject(false);
      });
    }); 
  }
  select(table: string, id : number){
    var localStorage = this.storage;
    var localConventer = this.localConventer;
    return new Promise(function(resolve, reject) {
      localStorage.query('SELECT * FROM ' + table + ' WHERE _id = '+id)
      .then((data) => {
        resolve(localConventer.convertResultSet(data.res.rows))
      }, (error) => {
        console.log(error);
        reject([]);
      });
    }); 
    
  }
  selectAll(table: string){
    var localStorage = this.storage;
    var localConventer = this.localConventer;
    return new Promise(function(resolve, reject) {
      localStorage.query('SELECT * FROM ' + table)
      .then((data) => {
        resolve(localConventer.convertResultSet(data.res.rows))
      }, (error) => {
        console.log(error);
        reject([]);
      });
    }); 
    
  }
  update(table: string,columns: Array<string>, values: Array<any>, id : number) {
    var insertCode = 'UPDATE ' + table + ' SET ';
    function stringyForSQL(value){
      if(typeof value === 'string'){
        return "'"+value+"'";
      }else{
        return value;
      }
    }
    for (var i = 0; i < columns.length; i++) {
      if (i === (values.length-1)) {
        insertCode += columns[i] + " = " + stringyForSQL(values[i])
      } else {
        insertCode += columns[i] + " = " + stringyForSQL(values[i]) + ", "
      }
    }
    insertCode += ' WHERE '+id;
    console.log(insertCode)
    return this.storage.query(insertCode)
      .then((data) => {
        console.log(data);
        return true;
      }, (error) => {
        console.error(error);
        return false;
      });
  }
}