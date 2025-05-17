class Provinces {
  int? ID;
  String? PROVINCE_ID;
  String? PROVINCE_NAME;


  Provinces(
      {this.PROVINCE_ID,
        this.PROVINCE_NAME,
        });

  Provinces.withId(
      {this.ID,
        this.PROVINCE_ID,
        this.PROVINCE_NAME,
        });

  Map<String, dynamic> toMap() {
    final map = Map<String, dynamic>();

    if (ID != null) map['ID'] = ID;
    map['PROVINCE_ID'] = PROVINCE_ID;
    map['PROVINCE_NAME'] = PROVINCE_NAME;


    return map;
  }

  factory Provinces.fromMap(Map<String, dynamic> map) {
    return Provinces.withId(
        ID: map['ID'],
        PROVINCE_ID: map['PROVINCE_ID'],
        PROVINCE_NAME: map['PROVINCE_NAME'],
        );
  }
}
