class Default_lieu{
  int? DEFAULT_ID;
  String? USER_ID_SERVER;
  String? PROVINCE_ID;
  String? COMMUNE_ID;
  String? ZONE_ID;
  int? NUMERO_FACTURE;
  String? DESCRIPTION_ENDROIT;

  Default_lieu({this.USER_ID_SERVER,this.PROVINCE_ID,this.COMMUNE_ID,this.ZONE_ID,this.DESCRIPTION_ENDROIT,this.NUMERO_FACTURE});

  Default_lieu.withId({this.DEFAULT_ID,this.USER_ID_SERVER,this.PROVINCE_ID,this.COMMUNE_ID,this.ZONE_ID,this.DESCRIPTION_ENDROIT,this.NUMERO_FACTURE});

  Map<String, dynamic> toMap() {
    final map = Map<String, dynamic>();

    if(DEFAULT_ID!=null)map['DEFAULT_ID'] = DEFAULT_ID;

    map['USER_ID_SERVER']=USER_ID_SERVER;
    map['DESCRIPTION_ENDROIT']=DESCRIPTION_ENDROIT;
    map['PROVINCE_ID']=PROVINCE_ID;
    map['COMMUNE_ID']=COMMUNE_ID;
    map['ZONE_ID']=ZONE_ID;
    map['NUMERO_FACTURE']=NUMERO_FACTURE;
    return map;
  }

  factory Default_lieu.fromMap(Map<String, dynamic> map) {
    return Default_lieu.withId(
      DEFAULT_ID: map['DEFAULT_ID'],
      USER_ID_SERVER: map['USER_ID_SERVER'],
      DESCRIPTION_ENDROIT: map['DESCRIPTION_ENDROIT'],
      PROVINCE_ID: map['PROVINCE_ID'],
      COMMUNE_ID: map['COMMUNE_ID'],
      ZONE_ID: map['ZONE_ID'],
      NUMERO_FACTURE: map['NUMERO_FACTURE'],
    );
  }

}