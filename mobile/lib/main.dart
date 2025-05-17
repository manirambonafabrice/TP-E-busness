// @dart=2.12
import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';

import 'screens/authentification.dart';

void main() async{
  await GetStorage.init();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Taxes controller',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: Authentification(),
    );
  }
}
