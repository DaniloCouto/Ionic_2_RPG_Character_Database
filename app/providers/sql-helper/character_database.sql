CREATE TABLE System (
  idSystem INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name TEXT NULL,
  description TEXT NULL,
  PRIMARY KEY(idSystem)
);

CREATE TABLE Characters (
  idCharacters INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  System_idSystem INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name TEXT NULL,
  race TEXT NULL,
  class TEXT NULL,
  level INTEGER UNSIGNED NULL,
  exp INTEGER UNSIGNED NULL,
  nextExp INTEGER UNSIGNED NULL,
  PRIMARY KEY(idCharacters),
  FOREIGN KEY(System_idSystem) REFERENCES System(idSystem)
);

CREATE TABLE Skill (
  idSkill INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  System_idSystem INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name TEXT NULL,
  description TEXT NULL,
  level INTEGER UNSIGNED NULL,
  PRIMARY KEY(idSkill),
  FOREIGN KEY(System_idSystem) REFERENCES System(idSystem)
);

CREATE TABLE Base_atribute (
  idBase_atribute INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  System_idSystem INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name TEXT NULL,
  value INTEGER UNSIGNED NULL,
  PRIMARY KEY(idBase_atribute),
  FOREIGN KEY(System_idSystem) REFERENCES System(idSystem)
);

CREATE TABLE Secundary_atribute (
  idSecundary_atribute INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  name TEXT NULL,
  value INTEGER UNSIGNED NULL,
  PRIMARY KEY(idSecundary_atribute)
);

CREATE TABLE Characters_has_Skill (
  Characters_idCharacters INTEGER UNSIGNED NOT NULL,
  Skill_idSkill INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Characters_idCharacters, Skill_idSkill),
  FOREIGN KEY(Characters_idCharacters) REFERENCES Characters(idCharacters),
  FOREIGN KEY(Skill_idSkill) REFERENCES Skill(idSkill)
);

CREATE TABLE Base_atribute_has_Secundary_atribute (
  Base_atribute_idBase_atribute INTEGER UNSIGNED NOT NULL,
  Secundary_atribute_idSecundary_atribute INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Base_atribute_idBase_atribute, Secundary_atribute_idSecundary_atribute),
  FOREIGN KEY(Base_atribute_idBase_atribute) REFERENCES Base_atribute(idBase_atribute),
  FOREIGN KEY(Secundary_atribute_idSecundary_atribute) REFERENCES Secundary_atribute(idSecundary_atribute)
);

CREATE TABLE Characters_has_Base_atribute (
  Characters_idCharacters INTEGER UNSIGNED NOT NULL,
  Base_atribute_idBase_atribute INTEGER UNSIGNED NOT NULL,
  PRIMARY KEY(Characters_idCharacters, Base_atribute_idBase_atribute),
  FOREIGN KEY(Characters_idCharacters) REFERENCES Characters(idCharacters),
  FOREIGN KEY(Base_atribute_idBase_atribute) REFERENCES Base_atribute(idBase_atribute)
);
