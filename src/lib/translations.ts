
import type { CallRequestType } from '@/types/call-requests';

export type LanguageCode = 'en' | 'es';

interface CallRequestTranslationStructure {
  type: CallRequestType;
  label: {
    [key in LanguageCode]: string;
  };
}

export const appTranslations = {
  page: {
    title: { en: "iControlBell", es: "iControlBell" },
    description: {
      en: "Focus your gaze on the button below that best describes your need to call for assistance, or use the soundboard to speak.",
      es: "Concentre su mirada en el botón de abajo que mejor describa su necesidad de pedir ayuda, o use el panel de sonido para hablar."
    },
    languageSelectorLabel: { en: "Select Language:", es: "Seleccionar Idioma:"}
  },
  callRequestGrid: {
    statusCallingFor: { en: "Calling for", es: "Llamando por" },
    toastSuccessTitle: { en: "Success!", es: "¡Éxito!" },
    toastSuccessRequestSent: { en: "request sent. Help is on the way.", es: "solicitud enviada. La ayuda está en camino." },
    toastErrorTitle: { en: "Error", es: "Error" },
    toastFailedToSend: { en: "Failed to send", es: "Error al enviar" }, // Used like "Failed to send {requestType} request: {error}"
    toastSystemErrorTitle: { en: "System Error", es: "Error del Sistema" },
    toastCouldNotProcess: { en: "Could not process", es: "No se pudo procesar" }, // Used like "Could not process {requestType} request: {errorMessage}"
    audioErrorToastTitle: { en: "Audio Alert", es: "Alerta de Audio" },
    audioErrorAborted: { en: "Audio loading was aborted by the browser.", es: "La carga del audio fue cancelada por el navegador." },
    audioErrorNetwork: { en: "A network error prevented the sound from loading.", es: "Un error de red impidió que el sonido se cargara." },
    audioErrorDecode: { en: "The sound file may be corrupted or unreadable.", es: "El archivo de sonido podría estar corrupto o ilegible." },
    audioErrorSrcNotSupported: { en: "Audio format not supported or file missing/corrupted. Check '/sounds/success.mp3'.", es: "Formato de audio no compatible o archivo faltante/corrupto. Verifique '/sounds/success.mp3'." },
    audioErrorDefault: { en: "Call sound effect could not be loaded.", es: "No se pudo cargar el efecto de sonido de la llamada." },
    audioErrorUnexpected: { en: "An unexpected audio loading error occurred.", es: "Ocurrió un error inesperado al cargar el audio."}
  },
  soundboard: {
    title: { en: "Soundboard", es: "Panel de Sonido" },
    description: { en: "Select a phrase below to have it spoken aloud.", es: "Seleccione una frase de abajo para que se diga en voz alta." },
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
      ]
    },
    speechNotSupportedTitle: {en: "Soundboard Not Available", es: "Panel de Sonido No Disponible"},
    speechNotSupportedDescription: {en: "Text-to-speech is not supported by your browser.", es: "Su navegador no admite la conversión de texto a voz."},
    speechErrorToastTitle: {en: "Speech Error", es: "Error de Voz"},
    speechErrorToastDescription: {en: "Could not speak the phrase.", es: "No se pudo decir la frase."},
    speechErrorToastDescriptionInitiate: {en: "Could not initiate text-to-speech. Please ensure browser permissions are allowed.", es: "No se pudo iniciar la conversión de texto a voz. Asegúrese de que los permisos del navegador estén permitidos."}
  },
  // This structure defines the request types and their translated labels.
  // It's used by CallRequestGrid to get the display label for each button.
  callRequestOptions: [
    { type: 'Water', label: { en: "Water", es: "Agua" } },
    { type: 'Restroom', label: { en: "Restroom", es: "Baño" } },
    { type: 'Reposition', label: { en: "Reposition", es: "Cambio de Posición" } }, // Adjusted Spanish
    { type: 'Pain', label: { en: "Pain", es: "Dolor" } },
    { type: 'General', label: { en: "General Help", es: "Ayuda General" } },
  ] as CallRequestTranslationStructure[]
};

export const bcp47LangMap: Record<LanguageCode, string> = {
    en: 'en-US',
    es: 'es-ES',
};
