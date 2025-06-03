
import type { CallRequestType } from '@/types/call-requests';

export type LanguageCode = 'en' | 'es' | 'fr'; // Added 'fr'

interface CallRequestTranslationStructure {
  type: CallRequestType;
  label: {
    [key in LanguageCode]: string;
  };
}

export const appTranslations = {
  page: {
    title: { en: "iControlBell", es: "iControlBell", fr: "iControlBell" },
    description: {
      en: "Focus your gaze on the button below that best describes your need to call for assistance, or use the soundboard to speak.",
      es: "Concentre su mirada en el botón de abajo que mejor describa su necesidad de pedir ayuda, o use el panel de sonido para hablar.",
      fr: "Concentrez votre regard sur le bouton ci-dessous qui décrit le mieux votre besoin d'appeler à l'aide, ou utilisez la table d'harmonie pour parler."
    },
    languageSelectorLabel: { en: "Select Language:", es: "Seleccionar Idioma:", fr: "Choisir la langue:"}
  },
  callRequestGrid: {
    statusCallingFor: { en: "Calling for", es: "Llamando por", fr: "Appel pour" },
    toastSuccessTitle: { en: "Success!", es: "¡Éxito!", fr: "Succès!" },
    toastSuccessRequestSent: { en: "request sent. Help is on the way.", es: "solicitud enviada. La ayuda está en camino.", fr: "requête envoyée. L'aide est en route." },
    toastErrorTitle: { en: "Error", es: "Error", fr: "Erreur" },
    toastFailedToSend: { en: "Failed to send", es: "Error al enviar", fr: "Échec de l'envoi" }, // Used like "Failed to send {requestType} request: {error}"
    toastSystemErrorTitle: { en: "System Error", es: "Error del Sistema", fr: "Erreur Système" },
    toastCouldNotProcess: { en: "Could not process", es: "No se pudo procesar", fr: "Impossible de traiter" }, // Used like "Could not process {requestType} request: {errorMessage}"
    audioErrorToastTitle: { en: "Audio Alert", es: "Alerta de Audio", fr: "Alerte Audio" },
    audioErrorAborted: { en: "Audio loading was aborted by the browser.", es: "La carga del audio fue cancelada por el navegador.", fr: "Le chargement audio a été interrompu par le navigateur." },
    audioErrorNetwork: { en: "A network error prevented the sound from loading.", es: "Un error de red impidió que el sonido se cargara.", fr: "Une erreur réseau a empêché le chargement du son." },
    audioErrorDecode: { en: "The sound file may be corrupted or unreadable.", es: "El archivo de sonido podría estar corrupto o ilegible.", fr: "Le fichier son est peut-être corrompu ou illisible." },
    audioErrorSrcNotSupported: { en: "Audio format not supported or file missing/corrupted. Check '/sounds/success.mp3'.", es: "Formato de audio no compatible o archivo faltante/corrupto. Verifique '/sounds/success.mp3'.", fr: "Format audio non pris en charge ou fichier manquant/corrompu. Vérifiez '/sounds/success.mp3'." },
    audioErrorDefault: { en: "Call sound effect could not be loaded.", es: "No se pudo cargar el efecto de sonido de la llamada.", fr: "L'effet sonore de l'appel n'a pas pu être chargé." },
    audioErrorUnexpected: { en: "An unexpected audio loading error occurred.", es: "Ocurrió un error inesperado al cargar el audio.", fr: "Une erreur de chargement audio inattendue s'est produite."}
  },
  soundboard: {
    title: { en: "Soundboard", es: "Panel de Sonido", fr: "Table d'Harmonie" },
    description: { en: "Select a phrase below to have it spoken aloud.", es: "Seleccione una frase de abajo para que se diga en voz alta.", fr: "Sélectionnez une phrase ci-dessous pour la faire prononcer à voix haute." },
    voiceSelectorLabel: { en: "Select Voice:", es: "Seleccionar Voz:", fr: "Choisir la Voix:" },
    defaultVoiceName: { en: "Default Voice", es: "Voz Predeterminada", fr: "Voix par Défaut"},
    phrases: {
      en: [
        "Yes", "No", "I'm thirsty", "I'm in pain", "I need to use the restroom",
        "I'm uncomfortable", "Can you adjust my pillow?", "Thank you", "Hello",
        "I need help", "I'm cold", "I'm hot"
      ],
      es: [
        "Sí", "No", "Tengo sed", "Tengo dolor", "Necesito usar el baño",
        "Estoy incómodo/a", "¿Puede ajustar mi almohada?", "Gracias", "Hola",
        "Necesito ayuda", "Tengo frío", "Tengo calor"
      ],
      fr: [
        "Oui", "Non", "J'ai soif", "J'ai mal", "J'ai besoin d'aller aux toilettes",
        "Je suis inconfortable", "Pouvez-vous ajuster mon oreiller ?", "Merci", "Bonjour",
        "J'ai besoin d'aide", "J'ai froid", "J'ai chaud"
      ]
    },
    speechNotSupportedTitle: {en: "Soundboard Not Available", es: "Panel de Sonido No Disponible", fr: "Table d'Harmonie Indisponible"},
    speechNotSupportedDescription: {en: "Text-to-speech is not supported by your browser.", es: "Su navegador no admite la conversión de texto a voz.", fr: "La synthèse vocale n'est pas prise en charge par votre navigateur."},
    speechErrorToastTitle: {en: "Speech Error", es: "Error de Voz", fr: "Erreur Vocale"},
    speechErrorToastDescription: {en: "Could not speak the phrase.", es: "No se pudo decir la frase.", fr: "Impossible de prononcer la phrase."},
    speechErrorToastDescriptionInitiate: {en: "Could not initiate text-to-speech. Please ensure browser permissions are allowed.", es: "No se pudo iniciar la conversión de texto a voz. Asegúrese de que los permisos del navegador estén permitidos.", fr: "Impossible d'initier la synthèse vocale. Veuillez vérifier que les autorisations du navigateur sont accordées."}
  },
  callRequestOptions: [
    { type: 'Water', label: { en: "Water", es: "Agua", fr: "Eau" } },
    { type: 'Restroom', label: { en: "Restroom", es: "Baño", fr: "Toilettes" } },
    { type: 'Reposition', label: { en: "Reposition", es: "Cambio de Posición", fr: "Changer de Position" } },
    { type: 'Pain', label: { en: "Pain", es: "Dolor", fr: "Douleur" } },
    { type: 'General', label: { en: "General Help", es: "Ayuda General", fr: "Aide Générale" } },
  ] as CallRequestTranslationStructure[]
};

export const bcp47LangMap: Record<LanguageCode, string> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
};
