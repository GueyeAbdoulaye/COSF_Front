export class Constante {
   
    private constructor() {};

    public static readonly TITLE = {
        PLAN_ACCES: "Plan d'accès COSF",
        CALENDAR: "Calendrier",
        CONTACT_US: "Nous Contacter",
        INSCRIPTION_ASK: "Demande d'inscription",
        EFFECTIF: "EFFECTIF", 
        INSCRIPTION: "Inscription au Club",
    };

    public static readonly ACCESS = {
        location: "location_on",
        address: "14 rue des falaises, 69190 Saint-Fons",
        phone: "09 83 03 12 55",
        transport: "En Transport", 
        stop: "Arrêt Cimetière de Saint-Fons"
    }

    public static readonly MAP = {
        open_in_maps: "Ouvrir dans Google Maps"
    };

    public static readonly BUTTONS = {
        directions_bus: "directions_bus",
        tram: "tram",
        call: "call",
        open: "open_in_new",
        message: "Envoyer le message",
        logout: "logout"

    };

    public static readonly MATCH = {
        loading: "Chargement...",
        no_matches: "Aucun match disponible pour le moment",
        all_matches: "Tous les matchs",
        upcoming_matches: "Matchs à venir",
        played_matches: "Matchs passés"
    };

    public static readonly TEXT = {
        ffbb: "FFBB",
        cosf: "COSF",
        team: "Équipe",
        required_lastname: "Le nom est requis",
        required_firstname: "Le prénom est requis",
        required_email: "L'email est requis",
        required_message: "Le message est requis",
        email_form: "Format d'email invalide",
        lastname: "Nom",
        firstname: "Prenom",
        message: "Message",
        sex: "Sexe",
        male: "Homme",
        female: "Femme",
        mutated: "Muté",
        yes: "Oui",
        no: "Non",
        birthDate: "Date de naissance",
        address: "Adresse",
        postalCode: "Code postal",
        city: "Ville",
        country: "Pays",
        email: "Email",
        phone: "Téléphone",
        lastGame: "Dernier Match",
        nextGame: "Prochain Match",
    }

    public static readonly FOOTER = {
        phone: "09 83 03 12 55",
        email: "contact@saint-fons.com",
        terms: "© 2025 COSF Basket. Tous droits réservés",
        instagram:"&#64;cosf_basket"
    }

    public static readonly HEADER = {
        title: "COSF Basket",
        logo: "/images/cosf_logo.jpeg"
    }


}