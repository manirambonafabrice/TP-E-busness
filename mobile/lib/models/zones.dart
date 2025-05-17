class Zones {
  int? ID;
  String? ZONE_ID;
  String? COMMUNE_ID;
  String? ZONE_NAME;


  Zones(
      {
        this.COMMUNE_ID,
        this.ZONE_ID,
        this.ZONE_NAME,
      });

  Zones.withId(
      {this.ID,
        this.COMMUNE_ID,
        this.ZONE_ID,
        this.ZONE_NAME,
      });

  Map<String, dynamic> toMap() {
    final map = Map<String, dynamic>();

    if (ID != null) map['ID'] = ID;
    map['COMMUNE_ID'] = COMMUNE_ID;
    map['ZONE_ID'] = ZONE_ID;
    map['ZONE_NAME'] = ZONE_NAME;


    return map;
  }

  factory Zones.fromMap(Map<String, dynamic> map) {
    return Zones.withId(
      ID: map['ID'],
      COMMUNE_ID: map['COMMUNE_ID'],
      ZONE_ID: map['ZONE_ID'],
      ZONE_NAME: map['ZONE_NAME'],
    );
  }
}
