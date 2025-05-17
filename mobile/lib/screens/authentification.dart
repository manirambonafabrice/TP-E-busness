import 'dart:convert';
import 'package:get_storage/get_storage.dart';
import 'package:sqflite/sqflite.dart';
import 'dart:ui';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:taxes_controller/db/adresse.dart';
import 'package:taxes_controller/db/database_user_helpe.dart';
import 'package:taxes_controller/models/communes.dart';
import 'package:taxes_controller/models/default_lieu.dart';
import 'package:taxes_controller/models/provinces.dart';
import 'package:taxes_controller/models/user.dart';
import 'package:taxes_controller/models/zones.dart';
import 'package:taxes_controller/screens/home_screen.dart';


class Authentification extends StatefulWidget {
  @override
  _AuthentificationState createState() => _AuthentificationState();
}

class _AuthentificationState extends State<Authentification> {
  final dbHelper = DatabaseUserHelper.instance;
  final _formKey = GlobalKey<FormState>();
  TextEditingController _usernameController = TextEditingController();
  TextEditingController _pwdController = TextEditingController();

  String prov_affect = "";
  String com_affect = "";
  String zone_affect = "";
  String lieu_affect = "";

  final userdata=GetStorage();
  bool visible=false;

  void initState() {
    // TODO: implement initState
    super.initState();
    dbHelper.db;

  }

  Adresses adresse=Adresses();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Colors.blue,
      body: Center(

        child: GestureDetector(


          onTap: () => FocusScope.of(context).unfocus(),
          child: SingleChildScrollView(
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 40.0, vertical: 80.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  // GestureDetector(
                  //   onTap: () => Navigator.pop(context),
                  //   child: Icon(
                  //     Icons.arrow_back_ios,
                  //     size: 30.0,
                  //     color: Theme.of(context).primaryColor,
                  //   ),
                  // ),
                  new Container(
                    child: Center(
                      child: Image(
                        image:AssetImage('assets/Logo.png'),
            ),
                    ),
                  ),
                  SizedBox(height: 20.0),
                  Center(
                    child: Text(
                      "Taxes collector",
                      style: TextStyle(
                          color: Colors.black,
                          fontSize: 25.0,
                          fontWeight: FontWeight.bold),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  SizedBox(height: 10.0),

                  Form(
                    key: _formKey,
                    child: Column(
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
                        // CircularProgressIndicator(
                        //   semanticsLabel: 'Linear progress indicator',
                        // ),
                        SizedBox(
                          height: 10,
                        ),
                        Padding(
                          padding: EdgeInsets.symmetric(vertical: 20.0),
                          child: TextFormField(
                            controller: _usernameController,
                            style: TextStyle(fontSize: 18.0),
                            decoration: InputDecoration(
                                labelText: "Username",
                                labelStyle: TextStyle(fontSize: 18.0),
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10.0),
                                )),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'required';
                              }
                              return null;
                            },

                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.symmetric(vertical: 20.0),
                          child: TextFormField(
                            obscureText: true,
                            controller: _pwdController,
                            style: TextStyle(fontSize: 18.0),
                            decoration: InputDecoration(
                                labelText: "Mot de passe",
                                labelStyle: TextStyle(fontSize: 18.0),
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10.0),
                                )),
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                return 'required';
                              }
                              return null;
                            },
 ),
                        ),


                        Container(
                          margin: EdgeInsets.symmetric(vertical: 20.0),
                          height: 60.0,
                          width: double.infinity,
                          decoration: BoxDecoration(
                              color: Theme.of(context).primaryColor,
                              borderRadius: BorderRadius.circular(10.0)),
                          // ignore: deprecated_member_use
                          child: FlatButton(
                            child: Text(
                              "Entrer",
                              style: TextStyle(
                                  color: Colors.white, fontSize: 20.0),
                            ),
                            onPressed: () async{
                              loadProgress(true);
                              // Validate returns true if the form is valid, or false otherwise.
                              if (_formKey.currentState!.validate()) {
    Database? dbse = await dbHelper.db;
    final List<Map<String, dynamic>> rslt = await dbse!.rawQuery('SELECT * FROM users WHERE USERNAME=? and  PASSWORD=?', ['${_usernameController.text}','${_pwdController.text}']);
    // JSONObject userinfo= new JSONObject(rslt);
  // print(rslt[0]['USERNAME']);
    if(rslt.isNotEmpty){
      // print("oui");

      userdata.write('username',rslt[0]['USERNAME']);
      userdata.write('tel',rslt[0]['TELEPHONE']);
      userdata.write('nom', rslt[0]['NOM_USER']);
      userdata.write('prenom', rslt[0]['PRENOM_USER']);
      userdata.write('pwd', rslt[0]['PASSWORD']);
      userdata.write('email', rslt[0]['EMAIL']);
      userdata.write('USER_ID_SERVER', rslt[0]['USER_ID_SERVER']);
      // print(rslt[0]["PASSWORD"]);
      // Get.offAll(HomeScreen());
      loadProgress(false);
      Navigator.of(context).push(MaterialPageRoute(builder: (context)=>HomeScreen()));
    }else{




      // print("non");
      try {

      var connexion_adresse = Uri.parse(Adresses().AUTH_ADRESS);
      var response = await http.post(connexion_adresse, body: {'username': '${_usernameController.text}', 'pwd' : '${_pwdController.text}'});

      var result=response.body;
      // print(result);
      Map valueMap = jsonDecode(result);
      var id_user ="";
      if(valueMap['user']!=null) {
      id_user = valueMap['user']['USER_ID'];
    }

      if(valueMap['result']=="ok"){
    if(valueMap['affectation']==null) {
       prov_affect = "";
       com_affect = "";
       zone_affect = "";
       lieu_affect = "";
    }else{
  prov_affect=valueMap['affectation']['PROVINCE_ID'];
  com_affect=valueMap['affectation']['COMMUNE_ID'];
  zone_affect=valueMap['affectation']['ZONE_ID'];
  lieu_affect=valueMap['affectation']['LIEU_DESCRIPTION'];
}
                                  // dbHelper.insertUsers(users)
        Database? dbse1 = await dbHelper.db;
        Default_lieu deft=Default_lieu(USER_ID_SERVER:id_user,PROVINCE_ID:prov_affect,COMMUNE_ID:com_affect,ZONE_ID:zone_affect,DESCRIPTION_ENDROIT:lieu_affect,NUMERO_FACTURE:valueMap['numero_facture']);
        final List<Map<String, dynamic>> rslt_default = await dbse1!.rawQuery('SELECT * FROM default_info WHERE USER_ID_SERVER=?', [id_user]);
       // print(id_user);
        if(rslt_default.isEmpty) {
          var i = dbHelper.insertDefault(deft);
        }

                                  Users users=Users(USER_ID_SERVER:valueMap['user']['USER_ID'],NOM_USER:valueMap['user']['NOM_USER'],PRENOM_USER:valueMap['user']['PRENOM_USER'],EMAIL:valueMap['user']['EMAIL'],TELEPHONE:valueMap['user']['TELEPHONE'],USERNAME:valueMap['user']['USERNAME'],PASSWORD:'${_pwdController.text}',FOTO:valueMap['user']['FOTO'],PROVINCE_ID:valueMap['user']['PROVINCE_ID'],COMMUNE_ID:valueMap['user']['COMMUNE_ID'],ZONE_ID:valueMap['user']['ZONE_ID'],ADRESSE:valueMap['user']['ADRESSE']);
                                  Database? dbse = await dbHelper.db;
                                  final List<Map<String, dynamic>> rslt_user = await dbse!.rawQuery('SELECT * FROM users WHERE USER_ID_SERVER=?', [valueMap['user']['USER_ID']]);
                                  if(rslt_user.isEmpty) {
                                    var i = dbHelper.insertUsers(users);
                                  }

                                  // print(users.toMap());

                                  // print(valueMap);

                                  valueMap['prov'].forEach((prov) async {
                                    Database? dbse = await dbHelper.db;
                                    Provinces province=Provinces(PROVINCE_ID:prov['PROVINCE_ID'],PROVINCE_NAME:prov['PROVINCE_NAME']);
                                    final List<Map<String, dynamic>> rslt_prov = await dbse!.rawQuery('SELECT * FROM provinces WHERE PROVINCE_ID=?', [prov['PROVINCE_ID']]);
    if(rslt_prov.isEmpty) {
      dbHelper.insertProvinces(province);
    }
                                  });
                                  valueMap['com'].forEach((com) async{
                                    Database? dbse = await dbHelper.db;
                                    Communes communes=Communes(PROVINCE_ID:com['PROVINCE_ID'],COMMUNE_ID:com['COMMUNE_ID'],COMMUNE_NAME:com['COMMUNE_NAME']);
      final List<Map<String, dynamic>> rslt_com = await dbse!.rawQuery('SELECT * FROM communes WHERE COMMUNE_ID=?', [com['COMMUNE_ID']]);
    if(rslt_com.isEmpty) {
      dbHelper.insertCommunes(communes);
    }

                                  });
                                  valueMap['zone'].forEach((zon) async{
                                    Database? dbse = await dbHelper.db;
                                    Zones zones=Zones(COMMUNE_ID:zon['COMMUNE_ID'],ZONE_ID:zon['ZONE_ID'],ZONE_NAME:zon['ZONE_NAME']);
                                    final List<Map<String, dynamic>> rslt_zon = await dbse!.rawQuery('SELECT * FROM zones WHERE ZONE_ID=?', [zon['ZONE_ID']]);
                                    if(rslt_zon.isEmpty) {
                                      dbHelper.insertZones(zones);
                                    }

                                  });
                                  //
                                  userdata.write('username',valueMap['user']['USERNAME']);
                                  userdata.write('tel',valueMap['user']['TELEPHONE']);
                                  userdata.write('nom', valueMap['user']['NOM_USER']);
                                  userdata.write('prenom', valueMap['user']['PRENOM_USER']);
                                  userdata.write('pwd', valueMap['user']['USER_ID']);
                                  userdata.write('email', valueMap['user']['EMAIL']);
                                  userdata.write('USER_ID_SERVER', valueMap['user']['USER_ID']);
                                  // print(i);
                                  // print(valueMap['user']['USER_ID']);
    loadProgress(false);
                                  Navigator.of(context).push(MaterialPageRoute(builder: (context)=>HomeScreen()));
                                }else{
        loadProgress(false);
                                  showDialog(
                                    context: context,
                                    builder: (BuildContext context) {
                                      return AlertDialog(
                                        title: new Text("Echec! Verifier bien vos identifiants."),
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




    }

                              }

                            },

                          ),
                        ),

                      ],
                    ),

                  ),


                ],
              ),
            ),
          ),
        ),
      ),

    );
  }
  loadProgress(bool visibility){

    // if(visible == true){
      setState(() {
        visible = visibility;
      });

  }
}
