import 'dart:convert';
import 'package:imei_plugin/imei_plugin.dart';
import 'package:datetime_picker_formfield/datetime_picker_formfield.dart';
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:sqflite/sqflite.dart';
import 'package:taxes_controller/db/adresse.dart';
import 'package:taxes_controller/db/database_user_helpe.dart';
import 'package:taxes_controller/models/taxe.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:connectivity/connectivity.dart';
import 'package:taxes_controller/models/default_lieu.dart';
import 'package:taxes_controller/screens/print_screen.dart';

import 'home_screen.dart';

class ResendScreen extends StatefulWidget {
  @override
  _ResendScreenState createState() => _ResendScreenState();
}

class _ResendScreenState extends State<ResendScreen> {
  static final DateTime now1 = DateTime.now();
  static final DateFormat formatter1 = DateFormat('yyyy-MM-dd');
  var _formKey;
  var _format;
  var _format1;
  bool visible=false;
  final userdata=GetStorage();
  TextEditingController _dateController = TextEditingController();

  TextEditingController _heureController = TextEditingController();
  var _provinceController;

  var _communeController;
  var _zoneController;
  var _lieuController;
  var _libeleController;
  var _montantController;

  final dbHelper = DatabaseUserHelper.instance;

  List<Map<String, dynamic>> rslt_com = [{"": ""}];
  var now = new DateTime.now();

  @override
  void initState() {

    userdata.write('username',"${userdata.read('username')}");
    userdata.write('tel',"${userdata.read('tel')}");
    userdata.write('nom', "${userdata.read('nom')}");
    userdata.write('prenom', "${userdata.read('prenom')}");
    userdata.write('pwd', "${userdata.read('pwd')}");
    userdata.write('email', "${userdata.read('email')}");
    userdata.write('USER_ID_SERVER', "${userdata.read('USER_ID_SERVER')}");

    _format = DateFormat("dd-MM-yyyy");
    _format1 = DateFormat("kk:mm");
    _formKey = GlobalKey<FormState>();
    String _priority = "";
    String _title = "";
    ValueNotifier<DateTime> _dateTimeNotifier = ValueNotifier<DateTime>(
        DateTime.now());

    int dd = DateTime
        .now()
        .year;
    var formatter = new DateFormat('yyyy-MM-dd');
    // String new_date = DateFormat('kk:mm').format(now);
    //

    final String formatted = formatter1.format(now1);

    // print(formatted);

    // TODO: implement initState
    super.initState();
    dbHelper.db;
    // final List<Map<String, dynamic>> rslt_com =loadDatabase();
    loadDatabase();

    _title = "";
    // final List<String> priorities = ['low', 'medium', 'big'];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Colors.blue,
      body: GestureDetector(

        onTap: () => FocusScope.of(context).unfocus(),
        child: SingleChildScrollView(
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 40.0, vertical: 40.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                GestureDetector(
                  onTap: () => Navigator.pop(context),
                  child: Icon(
                    Icons.arrow_back_ios,
                    size: 30.0,
                    color: Theme
                        .of(context)
                        .primaryColor,
                  ),
                ),
                SizedBox(height: 20.0),
                Text(
                  "Réenvoyer Taxe",
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 40.0,
                      fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 10.0),
                Form(
                  key: _formKey,
                  child: Column(
                    children: <Widget>[
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 10.0),
                        child: DateTimeField(
                          format: _format,
                          onShowPicker: (context, currentValue) {
                            return showDatePicker(
                                context: context,
                                firstDate: DateTime(2020),
                                // initialDate: currentValue ?? DateTime.now(),
                                initialDate: currentValue,
                                lastDate: DateTime(2030));
                          },
                          controller: _dateController,
                          style: TextStyle(fontSize: 18.0),
                          decoration: InputDecoration(
                              labelText: "Date",
                              labelStyle: TextStyle(fontSize: 18.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              )),
                          validator: (date) =>
                          date == null
                              ? 'Invalid date'
                              : null,
                          initialValue: DateTime.now(),

                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 10.0),
                        child: DateTimeField(
                          format: _format1,
                          onShowPicker: (context, currentValue) async {
                            final time = await showTimePicker(
                              context: context,
                              initialTime: TimeOfDay.fromDateTime(
                                  // currentValue ?? DateTime.now()),
                                currentValue ),
                            );
                            return DateTimeField.convert(time);
                          },
                          controller: _heureController,
                          style: TextStyle(fontSize: 18.0),
                          decoration: InputDecoration(
                              labelText: "Heure",
                              labelStyle: TextStyle(fontSize: 18.0),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              )),
                          validator: (date) =>
                          date == null
                              ? 'Invalid date'
                              : null,
                          initialValue: DateTime.now(),
                          // onChanged: (date) => setState(() {
                          //   value = date;
                          //   changedCount++;
                          // }),
                          // validator: (value) {
                          //   if (value == null &&_dateController==null) {
                          //     return 'required';
                          //   }
                          //   return null;
                          // },
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 10.0),
                        child: TextFormField(
                          readOnly: true,
                          controller: _provinceController,
                          style: TextStyle(fontSize: 18.0),
                          decoration: InputDecoration(
                              labelText: "province",
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
                          // onSaved: (input) => _title = input!,


                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 10.0),

                        child: TextFormField(
                          readOnly: true,
                          controller: _communeController,
                          style: TextStyle(fontSize: 18.0),
                          decoration: InputDecoration(
                              labelText: "Commune",
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
                          // onSaved: (input) => _title = input!,


                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 10.0),
                        child: TextFormField(
                          readOnly: true,
                          controller: _zoneController,
                          style: TextStyle(fontSize: 18.0),
                          decoration: InputDecoration(
                              labelText: "Zone",
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
                          // onSaved: (input) => _title = input!,


                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 10.0),
                        child: TextFormField(
                          readOnly: true,
                          controller: _lieuController,
                          style: TextStyle(fontSize: 18.0),
                          decoration: InputDecoration(
                              labelText: "Point de collecte(lieu)",
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
                          // onSaved: (input) => _title = input!,


                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 10.0),
                        child: TextFormField(
                          controller: _libeleController,
                          style: TextStyle(fontSize: 18.0),
                          decoration: InputDecoration(
                              labelText: "Libellé",
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
                          // onSaved: (input) => _title = input!,


                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(vertical: 10.0),
                        child: TextFormField(
                          controller: _montantController,
                          keyboardType: TextInputType.number,
                          inputFormatters: <TextInputFormatter>[
                            FilteringTextInputFormatter.digitsOnly
                          ],
                          style: TextStyle(fontSize: 18.0),
                          decoration: InputDecoration(
                              labelText: "Montant",
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
                          // onSaved: (input) => _title = input!,


                        ),
                      ),
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

                      Container(
                        margin: EdgeInsets.symmetric(vertical: 20.0),
                        height: 60.0,
                        width: double.infinity,
                        decoration: BoxDecoration(
                            color: Theme
                                .of(context)
                                .primaryColor,
                            borderRadius: BorderRadius.circular(30.0)),
                        // ignore: deprecated_member_use
                        child: FlatButton(
                          child: Text(
                            "Réenvoyer",
                            style: TextStyle(
                                color: Colors.white, fontSize: 20.0),
                          ),
                          onPressed: () async {
                            var id_taxe =  userdata.read('id_taxe');
                            // Validate returns true if the form is valid, or false otherwise.
                            if (_formKey.currentState!.validate()) {
                              loadProgress(true);
                              // print('$_priority,${_titleController.text},${_dateController.text}');
                              print('ok');
                              Database? dbse1 = await dbHelper.db;

                              List<Map<String,
                                  dynamic>> rslt_default = await dbse1!
                                  .rawQuery(
                                  'SELECT * FROM default_info WHERE USER_ID_SERVER=?',
                                  [userdata.read('USER_ID_SERVER')]);

                              int fact = rslt_default[0]['NUMERO_FACTURE'] + 1;
                              print("${_libeleController.text}");

                              var connectivityResult = await (Connectivity()
                                  .checkConnectivity());


                              if (connectivityResult ==
                                  ConnectivityResult.mobile ||
                                  connectivityResult ==
                                      ConnectivityResult.wifi) {
                                try {


                                  String imei = await ImeiPlugin.getImei();
                                  print(imei);
                                  var connexion_addTaxe = Uri.parse(
                                      Adresses().ADDTAXE_ADRESS);
                                  var response = await http.post(
                                      connexion_addTaxe, body: {
                                    'USER_ID': "${userdata.read(
                                        'USER_ID_SERVER')}",
                                    'MONTANT': '${_montantController.text}',
                                    'DATE': "${_dateController.text}",
                                    "HEURE": "${_heureController.text}",
                                    "PROVINCE_ID": "${rslt_default[0]['PROVINCE_ID']}",
                                    "COMMUNE_ID": "${rslt_default[0]['COMMUNE_ID']}",
                                    "ZONE_ID": "${rslt_default[0]['ZONE_ID']}",
                                    "DESCRIPTION_ENDROIT": "${_lieuController.text}",
                                    "MOTIF": "${_libeleController.text}",
                                    "NUMERO_FACTURE": "${userdata.read('numero_fact')}",
                                    "IMEI": imei
                                  });

                                  var result = response.body;
                                  print(result);
                                  Map valueMap = jsonDecode(result);
                                  if (valueMap['result'] == "ok") {
                                    Taxe taxe1 = Taxe.withId(
                                        TAXE_ID: int.tryParse(userdata.read('id_taxe')),
                                        USER_ID_SERVER: "${userdata.read(
                                            'USER_ID_SERVER')}",
                                        TAXE_ID_SERVER: "0",
                                        MONTANT: "${_montantController.text}",
                                        DATE: "${_dateController.text}",
                                        HEURE: "${_heureController.text}",
                                        PROVINCE_ID: "${rslt_default[0]['PROVINCE_ID']}",
                                        COMMUNE_ID: "${rslt_default[0]['COMMUNE_ID']}",
                                        ZONE_ID: "${rslt_default[0]['ZONE_ID']}",
                                        DESCRIPTION_ENDROIT: "${_lieuController.text}",
                                        STATUT_ENVOYE: "1",
                                        STATUT_IMPRIMER: "1",
                                        MOTIF: "${_libeleController.text}",
                                        NUMERO_FACTURE:int.tryParse(userdata.read('numero_fact')));
                                    dbHelper.updateTaxes(taxe1);
                                    // Default_lieu deft=Default_lieu(USER_ID_SERVER:"${userdata.read('USER_ID_SERVER')}",PROVINCE_ID:"${rslt_default[0]['PROVINCE_ID']}",COMMUNE_ID:"${rslt_default[0]['COMMUNE_ID']}",ZONE_ID:"${rslt_default[0]['ZONE_ID']}",DESCRIPTION_ENDROIT:"${_lieuController.text}",NUMERO_FACTURE:fact);
                                    // dbHelper.updateDefault(deft);
                                    userdata.write('id_taxe',"${id_taxe}");
                                    Navigator.of(context).push(MaterialPageRoute(builder: (context)=>HomeScreen()));
                                    print("bien lancer");
                                  }
                                  loadProgress(false);
                                } catch (e) {
                                  loadProgress(false);
                                  print("probleme");
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
                              }else{
                                loadProgress(false);
                                print("connexion");
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

    );
  }

  loadDatabase() async {
    Database? dbse = await dbHelper.db;

    rslt_com = await dbse!.rawQuery(
        'SELECT * FROM default_info d left join provinces p on d.PROVINCE_ID=p.PROVINCE_ID left join communes c on d.COMMUNE_ID=c.COMMUNE_ID left join zones z on d.ZONE_ID=z.ZONE_ID WHERE USER_ID_SERVER=?',
        [userdata.read('USER_ID_SERVER')]);
// print(rslt_com[0]['COMMUNE_NAME']);
    setState(() {
      _dateController = TextEditingController(
          text: "${DateFormat('dd-MM-yyyy').format(now)}");

      _heureController =
          TextEditingController(text: "${DateFormat('kk:mm').format(now)}");
      _communeController =
          TextEditingController(text: "${rslt_com[0]['COMMUNE_NAME']}");

      _provinceController =
          TextEditingController(text: "${rslt_com[0]['PROVINCE_NAME']}");

      _zoneController =
          TextEditingController(text: "${rslt_com[0]['ZONE_NAME']}");
      _lieuController =
          TextEditingController(text: "${rslt_com[0]['DESCRIPTION_ENDROIT']}");
      _libeleController = TextEditingController(text: userdata.read('motif'));
      _montantController = TextEditingController(text:userdata.read('montant'));
    });
// return rslt_com;
  }

  loadProgress(bool visibility){

    // if(visible == true){
    setState(() {
      visible = visibility;
    });

  }
}
