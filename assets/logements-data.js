/* ══════════════════════════════════════════════════════════════
   LOGEMENTS — fichier de données (le seul fichier à modifier
   pour ajouter / changer un logement)

   Champs :
   - id          : identifiant unique, sert aussi de lien direct
                   (ex. logements.html#t1bis-centre)
   - surface     : en m² (laisser null si inconnue → masquée)
   - voyageurs, chambres, lits : laisser null si inconnu → masqué
   - prix        : prix « à partir de » par nuit, en euros
   - note / avis : note et nombre d'avis Airbnb (laisser null si aucun)
   - horaires    : arrivée / départ (laisser '' pour masquer)
   - airbnb      : lien vers une annonce externe (laisser '' = aucun lien)
   - gps         : position APPROXIMATIVE pour la carte (jamais l'adresse exacte)
   - widget      : RÉSERVATION EN DIRECT — quand vous aurez un logiciel
                   (Smoobu, Superhote, Beds24…), collez ici l'URL de son
                   module de réservation : il remplacera automatiquement le
                   formulaire de demande. Laisser '' en attendant.
   - photos      : fichiers dans /images (sans extension), dans l'ordre
                   d'affichage. Pour chaque photo il faut 2 versions :
                   nom.webp (1600 px) et nom-800.webp (800 px).
                   Les cartes n'affichent que les 8 premières.
══════════════════════════════════════════════════════════════ */
var LOGEMENTS = [
  {
    id: 't1bis-centre',
    nom: 'T1 bis Cosy — Centre Libourne',
    type: 'T1 bis',
    surface: 21,
    ville: 'Libourne',
    quartier: 'Centre-ville',
    accroche: 'À 3 min à pied de la gare',
    voyageurs: 2,
    chambres: 1,
    lits: 1,
    prix: 55,
    note: null,        // note masquée volontairement
    avis: null,
    horaires: '',
    equipements: ['Wifi', 'Cuisine équipée', 'Lave-linge', 'Espace bureau', 'Parking gratuit', 'Arrivée autonome', 'Télévision', 'Four et micro-ondes', 'Linge de lit fourni', 'Cafetière'],
    description: [
      "Un T1 bis de 21 m², en plein centre de Libourne et à 3 minutes à pied de la gare : commerces, restaurants et marché sont accessibles à pied.",
      "Le coin nuit, séparé par une verrière, accueille un lit double escamotable confortable. Le logement dispose d'une cuisine équipée (four, micro-ondes, plaques, lave-linge), d'un espace bureau et d'une salle d'eau moderne avec douche vitrée.",
      "Parking gratuit à 2 minutes et arrivée autonome grâce à une boîte à clé sécurisée. Idéal pour un couple, un voyageur seul ou un déplacement professionnel."
    ],
    airbnb: '',
    gps: [44.9152, -0.2385],
    widget: '',
    photos: [
      { f: 't1bis-01', alt: 'Pièce de vie lumineuse avec canapé et coin télévision' },
      { f: 't1bis-02', alt: 'Lit double escamotable dans le coin nuit' },
      { f: 't1bis-03', alt: 'Canapé et lit escamotable replié' },
      { f: 't1bis-04', alt: 'Cuisine équipée et table à manger' },
      { f: 't1bis-05', alt: 'Vue sur la cuisine depuis la pièce de vie' },
      { f: 't1bis-06', alt: 'Cuisine : four, plaques de cuisson et lave-linge' },
      { f: 't1bis-07', alt: 'Salle d’eau avec vasque' },
      { f: 't1bis-08', alt: 'Douche vitrée' },
      { f: 't1bis-09', alt: 'WC suspendu et rangements' },
      { f: 't1bis-10', alt: 'Plan 3D de l’appartement' },
      { f: 't1bis-11', alt: 'Coin repas et rangements' },
      { f: 't1bis-12', alt: 'Espace bureau et télévision' },
      { f: 't1bis-13', alt: 'Coin nuit séparé par une verrière' },
      { f: 't1bis-14', alt: 'Rafraîchisseur d’air pour l’été' }
    ]
  },
  {
    id: 'studio-saint-brevin',
    nom: 'Studio à 200 m de la plage — Saint-Brevin',
    type: 'Studio',
    surface: null,     // À COMPLÉTER si vous la connaissez
    ville: 'Saint-Brevin-les-Pins',
    quartier: 'Centre-ville',
    accroche: 'Plage à 200 m · centre à 5 min à pied',
    voyageurs: 2,
    chambres: null,
    lits: 1,
    prix: 55,          // À VÉRIFIER (Airbnb : 119 € les 2 nuits mi-novembre, frais compris)
    note: '5,0',
    avis: 9,
    horaires: 'Arrivée dès 17 h · départ avant 10 h',
    equipements: ['Plage à 200 m', 'Grand balcon', 'Wifi', 'Kitchenette équipée', 'Parking gratuit', 'Arrivée autonome', 'Espace de travail', 'Linge de lit et serviettes fournis', 'Télévision', 'Cafetière'],
    description: [
      "Un studio chaleureux dans une résidence calme, à seulement 200 m de la plage et à 5 minutes à pied du centre de Saint-Brevin-les-Pins : tout se fait à pied, de la balade en bord de mer aux restaurants.",
      "Son grand balcon meublé, ouvert sur les pins, est parfait pour le petit-déjeuner ou un verre au coucher du soleil. À l'intérieur : un lit double, une kitchenette équipée (plaques, réfrigérateur, cafetière), un coin repas, un espace de travail et une salle d'eau avec douche.",
      "Linge de lit et serviettes fournis, stationnement gratuit dans la rue et arrivée autonome grâce à une boîte à clé sécurisée. Arrivée anticipée ou départ tardif possibles selon disponibilité, avec supplément."
    ],
    airbnb: '',
    gps: [47.2466, -2.1672],
    widget: '',
    photos: [
      { f: 'saint-brevin-01', alt: 'Pièce de vie lumineuse avec lit double, ouverte sur le balcon' },
      { f: 'saint-brevin-05', alt: 'Grand balcon meublé avec vue sur les pins' },
      { f: 'saint-brevin-04', alt: 'Kitchenette équipée' },
      { f: 'saint-brevin-03', alt: 'Coin repas avec table haute et tabourets' },
      { f: 'saint-brevin-02', alt: 'Accès au balcon depuis le studio' },
      { f: 'saint-brevin-06', alt: 'Vue d’ensemble du studio' },
      { f: 'saint-brevin-14', alt: 'Salle d’eau avec douche et WC' },
      { f: 'saint-brevin-11', alt: 'Balcon : banquette, fauteuils et table basse' },
      { f: 'saint-brevin-08', alt: 'Espace nuit avec lit double' },
      { f: 'saint-brevin-09', alt: 'Coin repas et étagère de rangement' },
      { f: 'saint-brevin-17', alt: 'Studio ouvert sur le balcon' },
      { f: 'saint-brevin-12', alt: 'Salon de jardin sur le balcon' },
      { f: 'saint-brevin-19', alt: 'Kitchenette et espace nuit' },
      { f: 'saint-brevin-22', alt: 'Kitchenette : plaques de cuisson et réfrigérateur' },
      { f: 'saint-brevin-21', alt: 'Vaisselle et rangements' },
      { f: 'saint-brevin-20', alt: 'Table haute et tabourets' },
      { f: 'saint-brevin-13', alt: 'Lavabo de la salle d’eau' },
      { f: 'saint-brevin-15', alt: 'Lavabo et porte-serviettes' },
      { f: 'saint-brevin-16', alt: 'Douche' },
      { f: 'saint-brevin-10', alt: 'Entrée du studio' },
      { f: 'saint-brevin-07', alt: 'Penderie et rangements' },
      { f: 'saint-brevin-18', alt: 'Penderie' }
    ]
  }
];
