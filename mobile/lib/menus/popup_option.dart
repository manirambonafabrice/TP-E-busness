import 'package:confirm_dialog/confirm_dialog.dart';
import 'package:flutter/material.dart';
import 'package:taxes_controller/screens/authentification.dart';

enum MenuOption { Deconnexion }

class PopupOption extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return PopupMenuButton<MenuOption>(
      onSelected: (result) async{
        if (result == MenuOption.Deconnexion) {


            if (await confirm(context)) {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => Authentification()),
              );
            }
            return null;
        }
      },
      itemBuilder: (BuildContext context) {
        return <PopupMenuEntry<MenuOption>>[
          PopupMenuItem(
              child: Text('Déconnexion',style: TextStyle(color: Colors.red)), value: MenuOption.Deconnexion),
        ];
      },
    );
  }
}
