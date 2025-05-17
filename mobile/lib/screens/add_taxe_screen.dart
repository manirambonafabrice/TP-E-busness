import 'dart:convert';
import 'package:blue_thermal_printer/blue_thermal_printer.dart';
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
import 'package:taxes_controller/screens/home_screen.dart';
import 'package:taxes_controller/screens/print_screen.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io' show Platform;
import 'package:blue_thermal_printer/blue_thermal_printer.dart';
import 'dart:io';

class AddTaxeScreen extends StatefulWidget {
  @override
  _AddTaxeScreenState createState() => _AddTaxeScreenState();
}

class _AddTaxeScreenState extends State<AddTaxeScreen> {
  static final DateTime now1 = DateTime.now();
  static final DateFormat formatter1 = DateFormat('yyyy-MM-dd');
  var _formKey;
  var _format;
  var _format1;
  bool visible = false;
  final userdata = GetStorage();
  TextEditingController _dateController = TextEditingController();

  TextEditingController _heureController = TextEditingController();
  var _provinceController;

  var _communeController;
  var _zoneController;
  var _lieuController;
  var _libeleController;
  var _montantController;

  final dbHelper = DatabaseUserHelper.instance;

  List<Map<String, dynamic>> rslt_com = [
    {"": ""}
  ];
  var now = new DateTime.now();

  int fact=0;

//Printer variables
  BlueThermalPrinter bluetooth = BlueThermalPrinter.instance;

  List<BluetoothDevice> _devices = [];
  BluetoothDevice? _device;
  bool _connected = false;
  String? pathImage;

  // var id_taxe=userdata.read('id_taxe');
  // final dbHelper = DatabaseUserHelper.instance;
  // Database? dbse = await dbHelper.db;
  List<Map<String, dynamic>> taxe = [
    {"": ""}
  ];

  //

  @override
  void initState() {
    userdata.write('username', "${userdata.read('username')}");
    userdata.write('tel', "${userdata.read('tel')}");
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
    ValueNotifier<DateTime> _dateTimeNotifier =
        ValueNotifier<DateTime>(DateTime.now());

    int dd = DateTime.now().year;
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

//printer
    initPlatformState();
    initSavetoPath();
    // testPrint= TestPrint();
    loadDatabase();
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
                  onTap: () => Navigator.of(context)
                      .push(MaterialPageRoute(builder: (context) => HomeScreen())),
                  child: Icon(
                    Icons.arrow_back_ios,
                    size: 30.0,
                    color: Theme.of(context).primaryColor,
                  ),
                ),
                SizedBox(height: 20.0),
                Text(
                  "Taxes",
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
                              date == null ? 'Invalid date' : null,
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
                              date == null ? 'Invalid date' : null,
                          initialValue: DateTime.now(),
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
                              child: CircularProgressIndicator())),
                      Row(
                        children: <Widget>[
                          Expanded(
                            flex: 1,
                            child: Container(
                              margin: EdgeInsets.symmetric(vertical: 20.0),
                              height: 60.0,
                              width: double.infinity,
                              decoration: BoxDecoration(
                                  color: Theme.of(context).primaryColor,
                                  borderRadius: BorderRadius.circular(10.0)),
                              // ignore: deprecated_member_use

                              child: FlatButton(
                                child: Text(
                                  "Save",
                                  style: TextStyle(
                                      color: Colors.white, fontSize: 20.0),
                                ),
                                onPressed: () async {
                                  enregister(0);
                                },
                              ),
                            ),
                          ),
                          Expanded(
                            flex: 1,
                            child: Container(
                              margin: EdgeInsets.symmetric(vertical: 20.0),
                              height: 60.0,
                              width: double.infinity,
                              decoration: BoxDecoration(
                                  color: Colors.black,
                                  borderRadius: BorderRadius.circular(10.0)),
                              // ignore: deprecated_member_use

                              child: FlatButton(
                                child: new Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  mainAxisSize: MainAxisSize.min,
                                  children: <Widget>[
                                    new Text(
                                      'Save and ',
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 20.0,
                                          fontWeight: FontWeight.bold),
                                    ),
                                    new Icon(Icons.print,
                                        color: Colors.white, size: 20.0),
                                  ],
                                ),
                                onPressed: () async {
                                  if (_connected == false) {
                                    showDialog(
                                      context: context,
                                      builder: (BuildContext context) {
                                        return AlertDialog(
                                          title: new Text("Echec! IMPRIMENTE N'EST PAS CONNECTEE."),
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
                                  }else{
                                    enregister(1);
                                    _tesPrint();
                                  }

                                },
                              ),
                            ),
                          ),
                        ],
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
      _libeleController = TextEditingController();
      _montantController = TextEditingController();
    });
// return rslt_com;
  }

  loadProgress(bool visibility) {
    // if(visible == true){
    setState(() {
      visible = visibility;
    });
  }

  enregister(int x) async {
    // Validate returns true if the form is valid, or false otherwise.
    if (_formKey.currentState!.validate()) {
      loadProgress(true);
      // print('$_priority,${_titleController.text},${_dateController.text}');
      print('ok');
      Database? dbse1 = await dbHelper.db;

      List<Map<String, dynamic>> rslt_default = await dbse1!.rawQuery(
          'SELECT * FROM default_info WHERE USER_ID_SERVER=?',
          [userdata.read('USER_ID_SERVER')]);

       fact = rslt_default[0]['NUMERO_FACTURE'];
      int fact1 = fact + 1;

      print("${_libeleController.text}");

      Taxe taxe = Taxe(
          USER_ID_SERVER: "${userdata.read('USER_ID_SERVER')}",
          TAXE_ID_SERVER: "0",
          MONTANT: "${_montantController.text}",
          DATE: "${_dateController.text}",
          HEURE: "${_heureController.text}",
          PROVINCE_ID: "${rslt_default[0]['PROVINCE_ID']}",
          COMMUNE_ID: "${rslt_default[0]['COMMUNE_ID']}",
          ZONE_ID: "${rslt_default[0]['ZONE_ID']}",
          DESCRIPTION_ENDROIT: "${_lieuController.text}",
          STATUT_ENVOYE: "0",
          STATUT_IMPRIMER: "1",
          MOTIF: "${_libeleController.text}",
          NUMERO_FACTURE: fact);
      var id_taxe = await dbHelper.insertTaxes(taxe);
      Default_lieu deft1 = Default_lieu(
          USER_ID_SERVER: "${userdata.read('USER_ID_SERVER')}",
          PROVINCE_ID: "${rslt_default[0]['PROVINCE_ID']}",
          COMMUNE_ID: "${rslt_default[0]['COMMUNE_ID']}",
          ZONE_ID: "${rslt_default[0]['ZONE_ID']}",
          DESCRIPTION_ENDROIT: "${_lieuController.text}",
          NUMERO_FACTURE: fact1);
      dbHelper.updateDefault(deft1);
      var connectivityResult = await (Connectivity().checkConnectivity());

      if (connectivityResult == ConnectivityResult.mobile ||
          connectivityResult == ConnectivityResult.wifi) {
        try {
          String imei = await ImeiPlugin.getImei();
          print(imei);
          var connexion_addTaxe = Uri.parse(Adresses().ADDTAXE_ADRESS);
          var response = await http.post(connexion_addTaxe, body: {
            'USER_ID': "${userdata.read('USER_ID_SERVER')}",
            'MONTANT': '${_montantController.text}',
            'DATE': "${_dateController.text}",
            "HEURE": "${_heureController.text}",
            "PROVINCE_ID": "${rslt_default[0]['PROVINCE_ID']}",
            "COMMUNE_ID": "${rslt_default[0]['COMMUNE_ID']}",
            "ZONE_ID": "${rslt_default[0]['ZONE_ID']}",
            "DESCRIPTION_ENDROIT": "${_lieuController.text}",
            "MOTIF": "${_libeleController.text}",
            "NUMERO_FACTURE": "${fact1}",
            "IMEI": imei
          });

          var result = response.body;
          if (response.statusCode == 200) {
            print(result);
            Map valueMap = jsonDecode(result);
            if (valueMap['result'] == "ok") {
              Taxe taxe1 = Taxe.withId(
                  TAXE_ID: id_taxe.toInt(),
                  USER_ID_SERVER: "${userdata.read('USER_ID_SERVER')}",
                  TAXE_ID_SERVER: "0",
                  MONTANT: "${_montantController.text}",
                  DATE: "${_dateController.text}",
                  HEURE: "${_heureController.text}",
                  PROVINCE_ID: "${rslt_default[0]['PROVINCE_ID']}",
                  COMMUNE_ID: "${rslt_default[0]['COMMUNE_ID']}",
                  ZONE_ID: "${rslt_default[0]['ZONE_ID']}",
                  DESCRIPTION_ENDROIT: "${_lieuController.text}",
                  STATUT_ENVOYE: "1",
                  STATUT_IMPRIMER: "0",
                  MOTIF: "${_libeleController.text}",
                  NUMERO_FACTURE: fact);
              dbHelper.updateTaxes(taxe1);
              Default_lieu deft = Default_lieu(
                  USER_ID_SERVER: "${userdata.read('USER_ID_SERVER')}",
                  PROVINCE_ID: "${rslt_default[0]['PROVINCE_ID']}",
                  COMMUNE_ID: "${rslt_default[0]['COMMUNE_ID']}",
                  ZONE_ID: "${rslt_default[0]['ZONE_ID']}",
                  DESCRIPTION_ENDROIT: "${_lieuController.text}",
                  NUMERO_FACTURE: fact1);
              dbHelper.updateDefault(deft);

              print("bien lancer");
            }
          }
          loadProgress(false);
        } catch (e) {
          loadProgress(false);
          print(e);
        }
      } else {
        loadProgress(false);
      }

      userdata.write('id_taxe', "${id_taxe}");
      if(x==0){
        Navigator.of(context)
            .push(MaterialPageRoute(builder: (context) => PrintScreen()));
      }else{
        Navigator.of(context)
            .push(MaterialPageRoute(builder: (context) => AddTaxeScreen()));
      }

    }
  }

  initSavetoPath() async {
    //read and write
    //image max 300px X 300px
    final filename = 'img.png';
    var bytes = await rootBundle.load("assets/img.png");
    String dir = (await getApplicationDocumentsDirectory()).path;
    writeToFile(bytes, '$dir/$filename');
    setState(() {
      pathImage = '$dir/$filename';
    });
  }

  Future<void> initPlatformState() async {
    bool? isConnected = await bluetooth.isConnected;
    List<BluetoothDevice> devices = [];
    try {
      devices = await bluetooth.getBondedDevices();
    } on PlatformException {
      // TODO - Error
    }

    bluetooth.onStateChanged().listen((state) {
      switch (state) {
        case BlueThermalPrinter.CONNECTED:
          setState(() {
            _connected = true;
          });
          break;
        case BlueThermalPrinter.DISCONNECTED:
          setState(() {
            _connected = false;
          });
          break;
        default:
          print(state);
          break;
      }
    });

    if (!mounted) return;
    setState(() {
      _devices = devices;
    });

    if (isConnected as bool) {
      setState(() {
        _connected = true;
      });
    }
  }

  List<DropdownMenuItem<BluetoothDevice>> _getDeviceItems() {
    List<DropdownMenuItem<BluetoothDevice>> items = [];
    if (_devices.isEmpty) {
      items.add(DropdownMenuItem(
        child: Text('NONE'),
      ));
    } else {
      _devices.forEach((device) {
        items.add(DropdownMenuItem(
          child: Text(device.name as String),
          value: device,
        ));
      });
    }
    return items;
  }

  void _connect() {
    if (_device == null) {
      show('No device selected.');
    } else {
      bluetooth.isConnected.then((isConnected) {
        if (!isConnected!) {
          bluetooth.connect(_device as BluetoothDevice).catchError((error) {
            setState(() => _connected = false);
          });
          setState(() => _connected = true);
        }
      });
    }
  }

  void _disconnect() {
    bluetooth.disconnect();
    setState(() => _connected = true);
  }

//write to app path
  Future<void> writeToFile(ByteData data, String path) {
    final buffer = data.buffer;
    return new File(path).writeAsBytes(
        buffer.asUint8List(data.offsetInBytes, data.lengthInBytes));
  }

  Future show(
    String message, {
    Duration duration: const Duration(seconds: 3),
  }) async {
    await new Future.delayed(new Duration(milliseconds: 100));
    Scaffold.of(context).showSnackBar(
      new SnackBar(
        content: new Text(
          message,
          style: new TextStyle(
            color: Colors.white,
          ),
        ),
        duration: duration,
      ),
    );
  }

  void _tesPrint() async {
    Database? dbse1 = await dbHelper.db;

    List<Map<String, dynamic>> rslt_default = await dbse1!.rawQuery(
        'SELECT * FROM default_info WHERE USER_ID_SERVER=?',
        [userdata.read('USER_ID_SERVER')]);

    fact = rslt_default[0]['NUMERO_FACTURE'];
    bluetooth.isConnected.then((isConnected) {
      if (isConnected as bool) {
        bluetooth.printCustom("TAXE COMMUNE", 2, 1);
        bluetooth.printNewLine();
        bluetooth.printImage("${pathImage}");
        bluetooth.printLeftRight("", "No ${fact}", 2);
        // bluetooth.printNewLine();
        bluetooth.printCustom("${_libeleController.text} ", 1, 0);
        bluetooth.printLeftRight("${_montantController.text} BIF", " ", 2);
        // bluetooth.printLeftRight("LEFT", "RIGHT", 1);

        bluetooth.printNewLine();
        bluetooth.printCustom(
            "Date: ${_dateController.text} ${_heureController.text}", 0, 2);
        // bluetooth.printCustom("Body left", 1, 0);
        // bluetooth.printCustom("Body right", 0, 2);
        bluetooth.printNewLine();
        bluetooth.printCustom(
            "Par ${userdata.read('prenom')} ${userdata.read('nom')}", 1, 1);
        bluetooth.printCustom(" ${userdata.read('tel')}", 1, 1);
        bluetooth.printNewLine();
        // bluetooth.printQRcode("Insert Your Own Text to Generate");
        bluetooth.printNewLine();
        bluetooth.printNewLine();
        bluetooth.paperCut();
      }
    });
  }
}
