class Communes {
  int? ID;
  String? PROVINCE_ID;
  String? COMMUNE_ID;
  String? COMMUNE_NAME;


  Communes(
      {
        this.COMMUNE_ID,
        this.PROVINCE_ID,
        this.COMMUNE_NAME,
      });

  Communes.withId(
      {this.ID,
        this.COMMUNE_ID,
        this.PROVINCE_ID,
        this.COMMUNE_NAME,
      });

  Map<String, dynamic> toMap() {
    final map = Map<String, dynamic>();

    if (ID != null) map['ID'] = ID;
    map['COMMUNE_ID'] = COMMUNE_ID;
    map['PROVINCE_ID'] = PROVINCE_ID;
    map['COMMUNE_NAME'] = COMMUNE_NAME;


    return map;
  }

  factory Communes.fromMap(Map<String, dynamic> map) {
    return Communes.withId(
      ID: map['ID'],
      COMMUNE_ID: map['COMMUNE_ID'],
      PROVINCE_ID: map['PROVINCE_ID'],
      COMMUNE_NAME: map['COMMUNE_NAME'],
    );
  }
}
