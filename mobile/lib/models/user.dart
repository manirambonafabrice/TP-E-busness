class Users{
  int? USER_ID;
  String? USER_ID_SERVER;
  String? NOM_USER;
  String? PRENOM_USER;
  String? EMAIL;
  String? TELEPHONE;
  String? USERNAME;
  String? PASSWORD;
  String? FOTO;
  String? PROVINCE_ID;
  String? COMMUNE_ID;
  String? ZONE_ID;
  String? ADRESSE;

  Users( {this.USER_ID_SERVER,this.NOM_USER,this.PRENOM_USER,this.EMAIL,this.TELEPHONE,this.USERNAME,this.PASSWORD,this.FOTO,this.PROVINCE_ID,this.COMMUNE_ID,this.ZONE_ID,this.ADRESSE});

  Users.withId({this.USER_ID,this.USER_ID_SERVER,this.NOM_USER,this.PRENOM_USER,this.EMAIL,this.TELEPHONE,this.USERNAME,this.PASSWORD,this.FOTO,this.PROVINCE_ID,this.COMMUNE_ID,this.ZONE_ID,this.ADRESSE});

  Map<String, dynamic> toMap() {
    final map = Map<String, dynamic>();

    if(USER_ID!=null)map['USER_ID'] = USER_ID;
    map['USER_ID_SERVER']=USER_ID_SERVER;
    map['NOM_USER']=NOM_USER;
    map['PRENOM_USER']=PRENOM_USER;
    map['EMAIL']=EMAIL;
    map['TELEPHONE']=TELEPHONE;
    map['USERNAME']=USERNAME;
    map['PASSWORD']=PASSWORD;
    map['FOTO']=FOTO;
    map['PROVINCE_ID']=PROVINCE_ID;
    map['COMMUNE_ID']=COMMUNE_ID;
    map['ZONE_ID']=ZONE_ID;
    map['ADRESSE']=ADRESSE;

    return map;
  }

  factory Users.fromMap(Map<String, dynamic> map) {
    return Users.withId(
        USER_ID: map['USER_ID'],
        USER_ID_SERVER: map['USER_ID_SERVER'],
        NOM_USER: map['NOM_USER'],
        PRENOM_USER: map['PRENOM_USER'],
      EMAIL: map['EMAIL'],
      TELEPHONE: map['TELEPHONE'],
      USERNAME: map['USERNAME'],
      PASSWORD: map['PASSWORD'],
      FOTO: map['FOTO'],
      PROVINCE_ID: map['PROVINCE_ID'],
      COMMUNE_ID: map['COMMUNE_ID'],
      ZONE_ID: map['ZONE_ID'],
      ADRESSE: map['ADRESSE'],
    );
  }
}