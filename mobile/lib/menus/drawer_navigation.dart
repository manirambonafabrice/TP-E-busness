import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:taxes_controller/screens/home_screen.dart';
import 'package:taxes_controller/screens/sychroniser.dart';
import 'package:taxes_controller/screens/taxes_NoEnvoye.dart';
import 'package:taxes_controller/screens/taxes_envoye.dart';
// import 'package:flutter_sqlite/screens/categorie.dart';

class Drawer_navigation extends StatefulWidget {
  @override
  _Drawer_navigationState createState() => _Drawer_navigationState();
}

class _Drawer_navigationState extends State<Drawer_navigation> {
  final userdata=GetStorage();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    userdata.write('username',"${userdata.read('username')}");
    userdata.write('tel',"${userdata.read('tel')}");
    userdata.write('nom', "${userdata.read('nom')}");
    userdata.write('prenom', "${userdata.read('prenom')}");
    userdata.write('pwd', "${userdata.read('pwd')}");
    userdata.write('email', "${userdata.read('email')}");
    userdata.write('USER_ID_SERVER', "${userdata.read('USER_ID_SERVER')}");
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Drawer(
        child: ListView(
          children: <Widget>[
            UserAccountsDrawerHeader(
              currentAccountPicture: CircleAvatar(
                backgroundImage: NetworkImage("https://investpaytechnologies.com/img/invest_logo.PNG"),
                // backgroundImage:AssetImage('assets/Logo.png'),
              ),
              accountName: Text("${userdata.read('prenom')} ${userdata.read('nom')}"),
              accountEmail: Text("${userdata.read('tel')}"),
              decoration: BoxDecoration(color: Theme.of(context).primaryColor),
            ),
            ListTile(
                leading: Icon(Icons.home),
                title: Text("Taxes recoltées par ${userdata.read('nom')}"),
                onTap: ()=>Navigator.of(context).push(MaterialPageRoute(builder: (context)=>HomeScreen()))
            ),
            ListTile(
                leading: Icon(Icons.done_all,color: Colors.green),
                title: Text("Taxes deja envoyées au serveur"),
                onTap:  ()=>Navigator.of(context).push(MaterialPageRoute(builder: (context)=>Taxes_envoye()))
            ),
            ListTile(
                leading: Icon(Icons.report_problem,color: Colors.red),
                title: Text("Taxes non envoyées"),
                onTap:  ()=>Navigator.of(context).push(MaterialPageRoute(builder: (context)=>Taxes_Nonenvoye()))
            ),
            ListTile(
                leading: Icon(Icons.autorenew,color: Colors.black),
                title: Text("Synchroniser avec le serveur"),
                onTap:  ()=>Navigator.of(context).push(MaterialPageRoute(builder: (context)=>SynchScreen()))
            ),

          ],

        ),
      ),
    );
  }
}
