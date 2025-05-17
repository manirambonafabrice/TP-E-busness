
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:imei_plugin/imei_plugin.dart';
import 'package:taxes_controller/db/adresse.dart';
import 'package:taxes_controller/menus/drawer_navigation.dart';
import 'package:taxes_controller/menus/popup_option.dart';
import 'package:taxes_controller/models/default_lieu.dart';
import 'package:taxes_controller/screens/add_taxe_screen.dart';
import 'package:get_storage/get_storage.dart';
import 'package:sqflite/sqflite.dart';
import 'package:taxes_controller/db/database_user_helpe.dart';
import 'package:http/http.dart' as http;


class SynchScreen extends StatefulWidget {

  int id=0;

  @override
  _SynchScreenState createState() => _SynchScreenState();
}

class _SynchScreenState extends State<SynchScreen> {
  final userdata=GetStorage();
  final dbHelper = DatabaseUserHelper.instance;

  bool visible=false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        floatingActionButton: FloatingActionButton(
          backgroundColor: Theme.of(context).primaryColor,
          child: Icon(Icons.add),
          // onPressed:null ,
          onPressed: () => Navigator.push(
              context, MaterialPageRoute(builder: (_) => AddTaxeScreen())),
        ),
        appBar: AppBar(
          title: Text("Taxes controller"),
          centerTitle: true,
          actions: <Widget>[
            PopupOption()
          ],
        ),
        drawer: Drawer_navigation(),
        body:Material(

            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Visibility(
                    maintainSize: true,
                    maintainAnimation: true,
                    maintainState: true,
                    visible: visible,
                    child: Container(
                        margin: EdgeInsets.only(top: 2, bottom: 2),
                        child: CircularProgressIndicator()
                    )
                ),
                Center(
                  child: InkWell(
                    onTap: () async{
                      loadProgress(true);
                      // print("${userdata.read('id_taxe')}");

                      Database? dbse = await dbHelper.db;

                      List<Map<String,
                          dynamic>> taxes = await dbse!
                          .rawQuery(
                          'SELECT * FROM taxes WHERE USER_ID_SERVER=? AND STATUT_ENVOYE=?',
                          [userdata.read('USER_ID_SERVER'),"0"]);
String val=jsonEncode(taxes);
// print(val);
                      String imei = await ImeiPlugin.getImei();
      try {
                      var connexion_adresse = Uri.parse(Adresses().SYNCHRONISER);
                      var response = await http.post(connexion_adresse, body: {'info':'${val}',"IMEI": imei,"USER_ID_SERVER":"${userdata.read('USER_ID_SERVER')}"});

                      var result=response.body;
                      print(result);
                      Map valueMap = jsonDecode(result);

                      var prov_affect=valueMap['affectation']['PROVINCE_ID'];
                      var com_affect=valueMap['affectation']['COMMUNE_ID'];
                      var zone_affect=valueMap['affectation']['ZONE_ID'];
                      var lieu_affect=valueMap['affectation']['LIEU_DESCRIPTION'];
                      final List<Map<String, dynamic>> rslt_default = await dbse.rawQuery('SELECT * FROM default_info WHERE USER_ID_SERVER=?', [userdata.read('USER_ID_SERVER')]);
                      Default_lieu deft=Default_lieu.withId(DEFAULT_ID:rslt_default[0]['DEFAULT_ID'],USER_ID_SERVER:userdata.read('USER_ID_SERVER'),PROVINCE_ID:prov_affect,COMMUNE_ID:com_affect,ZONE_ID:zone_affect,DESCRIPTION_ENDROIT:lieu_affect,NUMERO_FACTURE:rslt_default[0]['NUMERO_FACTURE']);
                      dbHelper.updateDefault(deft);



    await dbse
        .rawQuery(
    'UPDATE taxes SET STATUT_ENVOYE=1 WHERE USER_ID_SERVER=? ',
    [userdata.read('USER_ID_SERVER')]);

                      loadProgress(false);
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                            title: new Text("Enregistrement avec succès."),
                            actions: <Widget>[
                              FlatButton(
                                child: new Text("OK"),
                                onPressed: () {
                                  Navigator.of(context).pop();
                                },
                              ),
                            ],
                          );
                        },
                      );
      } catch (e) {
        print(e);
        loadProgress(false);
        showDialog(
          context: context,
          builder: (BuildContext context) {
                return AlertDialog(
                  title: new Text("Echec! PROBLEME DE CONNEXION SERVEUR."),
                  actions: <Widget>[
                    FlatButton(
                      child: new Text("OK"),
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                    ),
                  ],
                );
          },
        );
      }
                    },
                    child: Container(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(20.0),
                        child: Image.asset('assets/synch.png',
                            width: 150.0, height: 150.0),
                      ),),
                  ),
                ),
              ],
            )
        )


    );
  }

  loadProgress(bool visibility){

    // if(visible == true){
    setState(() {
      visible = visibility;
    });

  }
}
