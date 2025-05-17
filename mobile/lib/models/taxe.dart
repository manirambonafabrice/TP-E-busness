class Taxe {
  int? TAXE_ID;
  String? USER_ID_SERVER;
  String? TAXE_ID_SERVER;
  String? MONTANT;
  String? DATE;
  String? HEURE;
  String? PROVINCE_ID;
  String? COMMUNE_ID;
  String? ZONE_ID;
  String? DESCRIPTION_ENDROIT;
  String? STATUT_ENVOYE;
  String? STATUT_IMPRIMER;
  String? MOTIF;
  int? NUMERO_FACTURE;

  Taxe(
      {this.USER_ID_SERVER,
      this.TAXE_ID_SERVER,
      this.MONTANT,
      this.DATE,
      this.HEURE,
      this.PROVINCE_ID,
      this.COMMUNE_ID,
      this.ZONE_ID,
      this.DESCRIPTION_ENDROIT,
      this.STATUT_ENVOYE,
      this.STATUT_IMPRIMER,
      this.MOTIF,
      this.NUMERO_FACTURE});

  Taxe.withId(
      {this.TAXE_ID,
      this.USER_ID_SERVER,
      this.TAXE_ID_SERVER,
      this.MONTANT,
      this.DATE,
      this.HEURE,
      this.PROVINCE_ID,
      this.COMMUNE_ID,
      this.ZONE_ID,
      this.DESCRIPTION_ENDROIT,
      this.STATUT_ENVOYE,
      this.STATUT_IMPRIMER,
        this.MOTIF,
      this.NUMERO_FACTURE});

  Map<String, dynamic> toMap() {
    final map = Map<String, dynamic>();

    if (TAXE_ID != null) map['TAXE_ID'] = TAXE_ID;
    map['USER_ID_SERVER'] = USER_ID_SERVER;
    map['TAXE_ID_SERVER'] = TAXE_ID_SERVER;
    map['MONTANT'] = MONTANT;
    map['DATE'] = DATE;
    map['HEURE'] = HEURE;
    map['DESCRIPTION_ENDROIT'] = DESCRIPTION_ENDROIT;
    map['PROVINCE_ID'] = PROVINCE_ID;
    map['COMMUNE_ID'] = COMMUNE_ID;
    map['ZONE_ID'] = ZONE_ID;
    map['STATUT_ENVOYE'] = STATUT_ENVOYE;
    map['STATUT_IMPRIMER'] = STATUT_IMPRIMER;
    map['MOTIF'] = MOTIF;
    map['NUMERO_FACTURE'] = NUMERO_FACTURE;
    return map;
  }

  factory Taxe.fromMap(Map<String, dynamic> map) {
    return Taxe.withId(
        TAXE_ID: map['TAXE_ID'],
        USER_ID_SERVER: map['USER_ID_SERVER'],
        TAXE_ID_SERVER: map['TAXE_ID_SERVER'],
        MONTANT: map['MONTANT'],
        DATE: map['DATE'],
        HEURE: map['HEURE'],
        DESCRIPTION_ENDROIT: map['DESCRIPTION_ENDROIT'],
        PROVINCE_ID: map['PROVINCE_ID'],
        COMMUNE_ID: map['COMMUNE_ID'],
        ZONE_ID: map['ZONE_ID'],
        STATUT_ENVOYE: map['STATUT_ENVOYE'],
        STATUT_IMPRIMER: map['ATUT_IMPRIMER'],
        MOTIF: map['MOTIF'],
        NUMERO_FACTURE: map['NUMERO_FACTURE']);
  }
}
