import 'dart:async';
import 'dart:io';

import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import 'package:path_provider/path_provider.dart';
import 'package:taxes_controller/models/communes.dart';
import 'package:taxes_controller/models/default_lieu.dart';
import 'package:taxes_controller/models/provinces.dart';
import 'package:taxes_controller/models/taxe.dart';
import 'package:taxes_controller/models/user.dart';
import 'package:taxes_controller/models/zones.dart';

class DatabaseUserHelper {
  DatabaseUserHelper._instance();
  static final DatabaseUserHelper instance = DatabaseUserHelper._instance();
  static Database? _db;



  String userstable = 'users';
  String taxestable = 'taxes';
  String defaulttable = 'default_info';
  String provincestable = 'provinces';
  String communestable = 'communes';
  String zonestable = 'zones';

 Future<Database?> dbase() async{
   Database? db = await this.db;
  return db;
}

  Future<Database?> get db async {
    // print("deja");
    if (_db == null) {
      _db = await _initDb();
    }
    return _db;
  }

  Future<Database> _initDb() async {
    Directory dir = await getApplicationDocumentsDirectory();
    String path = dir.path + 'taxes.db';
    final listDb =
        await openDatabase(path, version: 1, onCreate: _createDb);
    return listDb;
  }

  void _createDb(Database db, int version) async {
    await db.execute("CREATE TABLE $userstable(USER_ID INTEGER PRIMARY KEY AUTOINCREMENT,USER_ID_SERVER INTEGER,NOM_USER TEXT,PRENOM_USER TEXT,EMAIL TEXT,TELEPHONE TEXT,USERNAME TEXT,PASSWORD TEXT,FOTO TEXT,PROVINCE_ID INTEGER,COMMUNE_ID INTEGER,ZONE_ID INTEGER,ADRESSE text)");
    await db.execute("CREATE TABLE $taxestable(TAXE_ID INTEGER PRIMARY KEY AUTOINCREMENT,TAXE_ID_SERVER INTEGER ,USER_ID_SERVER INTEGER ,MONTANT TEXT ,DATE TEXT ,HEURE TEXT ,PROVINCE_ID INTEGER ,COMMUNE_ID INTEGER ,ZONE_ID INTEGER ,DESCRIPTION_ENDROIT text ,MOTIF text,STATUT_ENVOYE text,STATUT_IMPRIMER text ,NUMERO_FACTURE INTEGER )");
      await db.execute("CREATE TABLE $defaulttable(DEFAULT_ID INTEGER PRIMARY KEY AUTOINCREMENT,USER_ID_SERVER INTEGER,PROVINCE_ID INTEGER,COMMUNE_ID INTEGER,ZONE_ID INTEGER , NUMERO_FACTURE INTEGER,DESCRIPTION_ENDROIT TEXT)");
    await db.execute("CREATE TABLE $provincestable(ID INTEGER PRIMARY KEY AUTOINCREMENT,PROVINCE_ID INTEGER,PROVINCE_NAME TEXT)");
    await db.execute("CREATE TABLE $communestable(ID INTEGER PRIMARY KEY AUTOINCREMENT,COMMUNE_ID INTEGER,PROVINCE_ID INTEGER,COMMUNE_NAME TEXT)");
    await db.execute("CREATE TABLE $zonestable(ID INTEGER PRIMARY KEY AUTOINCREMENT,ZONE_ID,COMMUNE_ID INTEGER,ZONE_NAME TEXT)");
  }




  Future<List<Map<String, dynamic>>> getUsersMapList() async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(userstable);
    return result;
  }
  Future<List<Map<String, dynamic>>> getTaxesMapList() async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(taxestable);
    return result;
  }
  Future<List<Map<String, dynamic>>> getDefaultMapList() async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(defaulttable);
    return result;
  }
  Future<List<Map<String, dynamic>>> getPovincesMapList() async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(provincestable);
    return result;
  }
  Future<List<Map<String, dynamic>>> getCommunesMapList() async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(communestable);
    return result;
  }
  Future<List<Map<String, dynamic>>> getZonesMapList() async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(zonestable);
    return result;
  }



  Future<List<Users>> getUsersList() async {
    final List<Map<String, dynamic>> userMapList = await getUsersMapList();
    final List<Users> userList = [];
    userMapList.forEach((taskMap) {
      userList.add(Users.fromMap(taskMap));
    });
    return userList;
  }
  Future<List<Taxe>> getTaxesList() async {
    final List<Map<String, dynamic>> taxesMapList = await getTaxesMapList();
    final List<Taxe> taxesList = [];
    taxesMapList.forEach((taskMap) {
      taxesList.add(Taxe.fromMap(taskMap));
    });
    return taxesList;
  }
  Future<List<Default_lieu>> getDefaultList() async {
    final List<Map<String, dynamic>> defaultMapList = await getDefaultMapList();
    final List<Default_lieu> defaultList = [];
    defaultMapList.forEach((taskMap) {
      defaultList.add(Default_lieu.fromMap(taskMap));
    });
    return defaultList;
  }
  Future<List<Provinces>> getProvincesList() async {
    final List<Map<String, dynamic>> provinceMapList = await getPovincesMapList();
    final List<Provinces> provincesList = [];
    provinceMapList.forEach((taskMap) {
      provincesList.add(Provinces.fromMap(taskMap));
    });
    return provincesList;
  }
  Future<List<Communes>> getCommunesList() async {
    final List<Map<String, dynamic>> CommunesMapList = await getCommunesMapList();
    final List<Communes> communeList = [];
    CommunesMapList.forEach((taskMap) {
      communeList.add(Communes.fromMap(taskMap));
    });
    return communeList;
  }
  Future<List<Zones>> getZonesList() async {
    final List<Map<String, dynamic>> zonesMapList = await getZonesMapList();
    final List<Zones> zonesList = [];
    zonesMapList.forEach((taskMap) {
      zonesList.add(Zones.fromMap(taskMap));
    });
    return zonesList;
  }



  Future<int> insertUsers(Users users) async {
    Database? db = await this.db;
    final int result = await db!.insert(userstable, users.toMap());
    return result;
  }
  Future<int> insertTaxes(Taxe taxe) async {
    Database? db = await this.db;
    final int result = await db!.insert(taxestable, taxe.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace);
    return result;
  }
  Future<int> insertDefault(Default_lieu default_lieu) async {
    Database? db = await this.db;
    final int result = await db!.insert(defaulttable, default_lieu.toMap());
    return result;
  }
  Future<int> insertProvinces(Provinces provinces) async {
    Database? db = await this.db;
    final int result = await db!.insert(provincestable, provinces.toMap());
    return result;
  }
  Future<int> insertCommunes(Communes communes) async {
    Database? db = await this.db;
    final int result = await db!.insert(communestable, communes.toMap());
    return result;
  }
  Future<int> insertZones(Zones zones) async {
    Database? db = await this.db;
    final int result = await db!.insert(zonestable, zones.toMap());
    return result;
  }




  Future<int> updateUsers(Users users) async {
    Database? db = await this.db;
    final int result = await db!.update(userstable, users.toMap(),
        where: 'USER_ID=?', whereArgs: [users.USER_ID]);
    return result;
  }
  Future<int> updateTaxes(Taxe taxe) async {
    Database? db = await this.db;
    final int result = await db!.update(taxestable, taxe.toMap(),
        where: 'TAXE_ID=?', whereArgs: [taxe.TAXE_ID]);
    return result;
  }
  Future<int> updateDefault(Default_lieu default_lieu) async {
    Database? db = await this.db;
    final int result = await db!.update(defaulttable, default_lieu.toMap(),
        where: 'USER_ID_SERVER=?', whereArgs: [default_lieu.USER_ID_SERVER]);
    return result;
  }
  Future<int> updateProvinces(Provinces provinces) async {
    Database? db = await this.db;
    final int result = await db!.update(provincestable, provinces.toMap(),
        where: 'ID=?', whereArgs: [provinces.ID]);
    return result;
  }
  Future<int> updateCommunes(Communes communes) async {
    Database? db = await this.db;
    final int result = await db!.update(communestable, communes.toMap(),
        where: 'ID=?', whereArgs: [communes.ID]);
    return result;
  }
  Future<int> updateZones(Zones zones) async {
    Database? db = await this.db;
    final int result = await db!.update(zonestable, zones.toMap(),
        where: 'ID=?', whereArgs: [zones.ID]);
    return result;
  }




  Future<int> deleteTask(int id) async {
    Database? db = await this.db;
    final int result =
        await db!.delete(userstable, where: 'USER_ID=?', whereArgs: [id]);
    return result;
  }
  Future<int> deleteTaxe(int id) async {
    Database? db = await this.db;
    final int result =
    await db!.delete(taxestable, where: 'TAXE_ID=?', whereArgs: [id]);
    return result;
  }
  Future<int> deleteDefault(int id) async {
    Database? db = await this.db;
    final int result =
    await db!.delete(provincestable, where: 'DEFAULT_ID=?', whereArgs: [id]);
    return result;
  }
  Future<int> deleteProvinces(int id) async {
    Database? db = await this.db;
    final int result =
    await db!.delete(provincestable, where: 'ID=?', whereArgs: [id]);
    return result;
  }
  Future<int> deleteCommunes(int id) async {
    Database? db = await this.db;
    final int result =
    await db!.delete(communestable, where: 'ID=?', whereArgs: [id]);
    return result;
  }
  Future<int> deleteZones(int id) async {
    Database? db = await this.db;
    final int result =
    await db!.delete(zonestable, where: 'ID=?', whereArgs: [id]);
    return result;
  }



  Future<List<Map<String, dynamic>>> getUsersMapList_condition(int id) async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(userstable, where: 'USER_ID=?', whereArgs: [id]);
    return result;
  }
  Future<List<Map<String, dynamic>>> getTaxesMapList_condition(int id) async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(taxestable, where: 'TAXE_ID=?', whereArgs: [id]);
    return result;
  }

  Future<List<Map<String, dynamic>>> getPovincesMapList_condition(int id) async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(provincestable, where: 'ID=?', whereArgs: [id]);
    return result;
  }
  Future<List<Map<String, dynamic>>> getCommunesMapList_condition(int id) async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(communestable, where: 'ID=?', whereArgs: [id]);
    return result;
  }
  Future<List<Map<String, dynamic>>> getZonesMapList_condition(int id) async {
    Database? db = await this.db;
    final List<Map<String, dynamic>> result = await db!.query(zonestable, where: 'ID=?', whereArgs: [id]);
    return result;
  }
}
