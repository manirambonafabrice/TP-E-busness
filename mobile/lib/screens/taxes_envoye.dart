
import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:sqflite/sqflite.dart';
import 'package:taxes_controller/db/database_user_helpe.dart';
import 'package:taxes_controller/menus/drawer_navigation.dart';
import 'package:taxes_controller/menus/popup_option.dart';
import 'package:taxes_controller/screens/add_taxe_screen.dart';
import 'package:taxes_controller/screens/print_screen.dart';
import 'package:taxes_controller/screens/resend_screen.dart';



class Taxes_envoye extends StatefulWidget {

  int id=0;

  @override
  _Taxes_envoyeState createState() => _Taxes_envoyeState();
}

class _Taxes_envoyeState extends State<Taxes_envoye> {
  final userdata=GetStorage();
  final items = List<String>.generate(10000, (i) => "Item $i");

  final dbHelper = DatabaseUserHelper.instance;
  Database? dbse1 =null;
  List<Map<String,
      dynamic>> taxes =[{"": ""}];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    loadDatabase();
  }
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

        body: ListView.builder(
          // itemCount: items.length,
          // itemBuilder: (context, index) {
          //   return ListTile(
          //     title: Text('${items[index]}'),
          //   );
          // },
          itemBuilder: (context, position) {
            if(taxes[position]['STATUT_ENVOYE']=="0") {
              return Column(

                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Padding(
                              padding:
                              const EdgeInsets.fromLTRB(12.0, 12.0, 12.0, 6.0),
                              child: Text(
                                "${taxes[position]['MOTIF']}",
                                style: TextStyle(
                                    fontSize: 22.0, fontWeight: FontWeight.bold),
                              ),
                            ),
                            Padding(
                              padding:
                              const EdgeInsets.fromLTRB(12.0, 6.0, 12.0, 12.0),
                              child: Text(
                                "${taxes[position]['MONTANT']}BIF",
                                style: TextStyle(fontSize: 18.0),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Expanded(
                        flex: 1,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: <Widget>[
                            Text(
                              "${taxes[position]['DATE']} ${taxes[position]['HEURE']}",
                              style: TextStyle(color: Colors.grey),
                            ),
                            Row(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(5.0),
                                  child: IconButton(
                                    icon: Icon(
                                        Icons.report_problem, color: Colors.red),
                                    onPressed: () {

                                    },
                                  ),
                                ),
                                // if(items[position]==""){
                                Padding(
                                  padding: const EdgeInsets.all(5.0),

                                  child: IconButton(
                                    icon: Icon(Icons.print, color: Colors.black),
                                    onPressed: () {
                                      userdata.write('id_taxe',"${taxes[position]['TAXE_ID']}");
                                      Navigator.of(context).push(MaterialPageRoute(builder: (context)=>PrintScreen()));
                                    },
                                  ),
                                ),
                                // }
                                Padding(
                                  padding: const EdgeInsets.all(5.0),
                                  child: IconButton(
                                    icon: Icon(Icons.send, color: Colors.grey),
                                    onPressed: () {
                                      userdata.write('id_taxe',"${taxes[position]['TAXE_ID']}");
                                      userdata.write('montant',"${taxes[position]['MONTANT']}");
                                      userdata.write('motif',"${taxes[position]['MOTIF']}");
                                      Navigator.of(context).push(MaterialPageRoute(builder: (context)=>ResendScreen()));

                                    },
                                  ),
                                ),
                              ],
                            ),

                          ],
                        ),
                      ),

                    ],
                  ),
                  Divider(
                    height: 2.0,
                    color: Colors.grey,
                  )
                ],
              );
            }else{
              return Column(
                mainAxisSize: MainAxisSize.max,
                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,

                          children: <Widget>[
                            Padding(
                              padding:
                              const EdgeInsets.fromLTRB(12.0, 12.0, 12.0, 6.0),
                              child: Text(

                                "${taxes[position]['MOTIF']}",
                                style: TextStyle(
                                    fontSize: 22.0, fontWeight: FontWeight.bold),
                              ),
                            ),
                            Padding(
                              padding:
                              const EdgeInsets.fromLTRB(12.0, 6.0, 12.0, 12.0),
                              child: Text(
                                "${taxes[position]['MONTANT']}BIF",
                                style: TextStyle(fontSize: 18.0),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Expanded(
                        flex: 1,
                        child: Padding(
                          padding: const EdgeInsets.all(5.0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: <Widget>[
                              Text(
                                "${taxes[position]['DATE']} ${taxes[position]['HEURE']}",
                                style: TextStyle(color: Colors.grey),
                              ),
                              Row(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.all(5.0),
                                    child:IconButton(
                                      icon: Icon(Icons.done_all,color: Colors.green),
                                      onPressed: () {

                                      },
                                    ),
                                  ),
                                  // if(items[position]==""){
                                  Padding(
                                    padding: const EdgeInsets.all(5.0),

                                    child:IconButton(
                                      icon: Icon(Icons.print,color: Colors.black),
                                      onPressed: () {
                                        userdata.write('id_taxe',"${taxes[position]['TAXE_ID']}");
                                        Navigator.of(context).push(MaterialPageRoute(builder: (context)=>PrintScreen()));
                                      },
                                    ),
                                  ),
                                  // }

                                  Padding(
                                    padding: const EdgeInsets.all(1.0),

                                    child:IconButton(

                                      icon: Icon(Icons.send,color: Colors.white10),
                                      onPressed: () {

                                      },
                                    ),
                                  ),
                                ],
                              ),

                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                  Divider(
                    height: 2.0,
                    color: Colors.grey,
                  )
                ],
              );
            }
          },
          itemCount: taxes.length,
        )


    );
  }

  loadDatabase() async {

    Database? dbse = await dbHelper.db;

    taxes = await dbse!
        .rawQuery(
        'SELECT * FROM taxes WHERE USER_ID_SERVER=? AND STATUT_ENVOYE=? ORDER BY TAXE_ID DESC',
        [userdata.read('USER_ID_SERVER'),"1"]);
    setState(() {
      // print(taxes);
    });

  }
}
