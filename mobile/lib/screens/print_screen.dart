import 'package:flutter/material.dart';
import 'package:taxes_controller/menus/drawer_navigation.dart';
import 'package:taxes_controller/menus/popup_option.dart';
import 'package:taxes_controller/screens/add_taxe_screen.dart';
import 'package:get_storage/get_storage.dart';
import 'dart:typed_data';
import 'package:flutter/material.dart' hide Image;
import 'package:esc_pos_utils/esc_pos_utils.dart';
import 'package:flutter/services.dart';

import 'dart:io' show Platform;
import 'package:blue_thermal_printer/blue_thermal_printer.dart';
import 'dart:io';
// import 'dart:typed_data';

// import 'package:flutter/material.dart';
import 'dart:async';
// import 'package:blue_thermal_printer/blue_thermal_printer.dart';
// import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';
import 'package:taxes_controller/db/database_user_helpe.dart';


class PrintScreen extends StatefulWidget {
  int id = 0;

  @override
  _PrintScreenState createState() => _PrintScreenState();
}

class _PrintScreenState extends State<PrintScreen> {
  final userdata = GetStorage();
  BlueThermalPrinter bluetooth = BlueThermalPrinter.instance;

  List<BluetoothDevice> _devices = [];
  BluetoothDevice? _device;
  bool _connected = false;
  String? pathImage;
  // var id_taxe=userdata.read('id_taxe');
  final dbHelper = DatabaseUserHelper.instance;
  // Database? dbse = await dbHelper.db;
  List<Map<String,
      dynamic>> taxe =[{"": ""}];
  // TestPrint testPrint;
  @override
  void initState() {
    // TODO: implement initState
    initPlatformState();
    initSavetoPath();
    // testPrint= TestPrint();
    loadDatabase();
    super.initState();

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        backgroundColor: Theme
            .of(context)
            .primaryColor,
        child: Icon(Icons.add),
        // onPressed:null ,
        onPressed: () =>
            Navigator.push(
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
      body: Container(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: ListView(
            children: <Widget>[
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  SizedBox(width: 10,),
                  Text(
                    'Device:',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(width: 30,),
                  Expanded(
                    child: DropdownButton(
                      items: _getDeviceItems(),
                      onChanged: (value) => setState(() => _device = value as BluetoothDevice?),
                      value: _device,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 10,),
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  RaisedButton(
                    color: Colors.black,
                    onPressed:(){
                      initPlatformState();
                    },
                    child: Text('Refresh', style: TextStyle(color: Colors.white),),
                  ),
                  SizedBox(width: 20,),
                  RaisedButton(
                    color: _connected ?Colors.red:Colors.green,
                    onPressed:
                    _connected ? _disconnect : _connect,
                    child: Text(_connected ? 'Disconnect' : 'Connect', style: TextStyle(color: Colors.white),),
                  ),
                ],
              ),
              SizedBox(height: 30.0),
          InkWell(
                    onTap: () {
                      _tesPrint();
                    },
                    child: Container(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(20.0),
                        child: Image.asset('assets/printer.png',
                            width: 150.0, height: 150.0),
                      ),),
                  ),

            ],
          ),
        ),
      ),

    );
  }





  Future<Ticket> _ticket(PaperSize paper) async {
    final ticket = Ticket(paper);
    int total = 0;

    // Image assets
    final ByteData data = await rootBundle.load('assets/Logo.png');
    final Uint8List bytes = data.buffer.asUint8List();
    // final Image image = decodeImage(bytes);
    // ticket.image(image);
    ticket.text(
      'TAXES',
      styles: PosStyles(align: PosAlign.center,
          height: PosTextSize.size2,
          width: PosTextSize.size2),
      linesAfter: 1,
    );

    for (var i = 0; i < 2; i++) {
      total += 1;
      ticket.text("widget.data[i]['title']");
      ticket.row([
        PosColumn(
            text: '1 x 2',
            width: 6),
        PosColumn(text: 'Rp ', width: 6),
      ]);
    }

    ticket.feed(1);
    ticket.row([
      PosColumn(text: 'Total', width: 6, styles: PosStyles(bold: true)),
      PosColumn(text: 'Rp $total', width: 6, styles: PosStyles(bold: true)),
    ]);
    ticket.feed(2);
    ticket.text(
        'Thank You', styles: PosStyles(align: PosAlign.center, bold: true));
    ticket.cut();

    return ticket;
  }




  initSavetoPath()async{
    //read and write
    //image max 300px X 300px
    final filename = 'img.png';
    var bytes = await rootBundle.load("assets/img.png");
    String dir = (await getApplicationDocumentsDirectory()).path;
    writeToFile(bytes,'$dir/$filename');
    setState(() {
      pathImage='$dir/$filename';
    });
  }


  Future<void> initPlatformState() async {
    bool? isConnected=await bluetooth.isConnected;
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

    if(isConnected as bool) {
      setState(() {
        _connected=true;
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

    bluetooth.isConnected.then((isConnected) {
      if (isConnected as bool) {
        bluetooth.printCustom("TAXE COMMUNE", 2, 1);
        bluetooth.printNewLine();
        bluetooth.printImage("${pathImage}");
        bluetooth.printLeftRight("", "No ${taxe[0]['NUMERO_FACTURE']}", 2);
        // bluetooth.printNewLine();
        bluetooth.printCustom("${taxe[0]['MOTIF']} ", 1, 0);
        bluetooth.printLeftRight("${taxe[0]['MONTANT']} BIF", " ", 2);
        // bluetooth.printLeftRight("LEFT", "RIGHT", 1);

        bluetooth.printNewLine();
        bluetooth.printCustom( "Date: ${taxe[0]['DATE']} ${taxe[0]['HEURE']}", 0,2);
        // bluetooth.printCustom("Body left", 1, 0);
        // bluetooth.printCustom("Body right", 0, 2);
        bluetooth.printNewLine();
        bluetooth.printCustom("Par ${userdata.read('prenom')} ${userdata.read('nom')}", 1, 1);
        bluetooth.printCustom(" ${userdata.read('tel')}", 1, 1);
        bluetooth.printNewLine();
        // bluetooth.printQRcode("Insert Your Own Text to Generate");
        bluetooth.printNewLine();
        bluetooth.printNewLine();
        bluetooth.paperCut();
      }
      });
    }


  loadDatabase() async {

    Database? dbse = await dbHelper.db;

    taxe = await dbse!.rawQuery(
        'SELECT * FROM taxes WHERE TAXE_ID=?',[userdata.read('id_taxe')]);
    setState(() {
      // print(taxes);
    });

  }

        }
