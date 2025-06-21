
import type { CallRequestType } from '@/types/call-requests';

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'pt'; // Added 'de' and 'pt'

interface CallRequestTranslationStructure {
  type: CallRequestType;
  label: {
    [key in LanguageCode]: string;
  };
}

export const appTranslations = {
  page: {
    title: { en: "iControlBell", es: "iControlBell", fr: "iControlBell", de: "iControlBell", pt: "iControlBell" },
    description: {
      en: "Focus your gaze on the button below that best describes your need to call for assistance, or use the soundboard to speak.",
      es: "Concentre su mirada en el botón de abajo que mejor describa su necesidad de pedir ayuda, o use el panel de sonido para hablar.",
      fr: "Concentrez votre regard sur le bouton ci-dessous qui décrit le mieux votre besoin d'appeler à l'aide, ou utilisez la table d'harmonie pour parler.",
      de: "Fokussieren Sie Ihren Blick auf die Schaltfläche unten, die Ihren Hilfebedarf am besten beschreibt, oder verwenden Sie das Soundboard, um zu sprechen.",
      pt: "Concentre o seu olhar no botão abaixo que melhor descreve a sua necessidade de chamar por assistência, ou use o soundboard para falar."
    },
    languageSelectorLabel: { en: "Select Language:", es: "Seleccionar Idioma:", fr: "Choisir la langue:", de: "Sprache auswählen:", pt: "Selecionar Idioma:"}
  },
  callRequestGrid: {
    statusCallingFor: { en: "Calling for", es: "Llamando por", fr: "Appel pour", de: "Rufe nach", pt: "Chamando por" },
    toastSuccessTitle: { en: "Success!", es: "¡Éxito!", fr: "Succès!", de: "Erfolg!", pt: "Sucesso!" },
    toastSuccessRequestSent: { en: "request sent. Help is on the way.", es: "solicitud enviada. La ayuda está en camino.", fr: "requête envoyée. L'aide est en route.", de: "Anfrage gesendet. Hilfe ist unterwegs.", pt: "solicitação enviada. A ajuda está a caminho." },
    toastErrorTitle: { en: "Error", es: "Error", fr: "Erreur", de: "Fehler", pt: "Erro" },
    toastFailedToSend: { en: "Failed to send", es: "Error al enviar", fr: "Échec de l'envoi", de: "Senden fehlgeschlagen", pt: "Falha ao enviar" }, // Used like "Failed to send {requestType} request: {error}"
    toastSystemErrorTitle: { en: "System Error", es: "Error del Sistema", fr: "Erreur Système", de: "Systemfehler", pt: "Erro de Sistema" },
    toastCouldNotProcess: { en: "Could not process", es: "No se pudo procesar", fr: "Impossible de traiter", de: "Konnte nicht verarbeitet werden", pt: "Não foi possível processar" }, // Used like "Could not process {requestType} request: {errorMessage}"
    audioErrorToastTitle: { en: "Audio Alert", es: "Alerta de Audio", fr: "Alerte Audio", de: "Audio-Warnung", pt: "Alerta de Áudio" },
    audioErrorAborted: { en: "Audio loading was aborted by the browser.", es: "La carga del audio fue cancelada por el navegador.", fr: "Le chargement audio a été interrompu par le navigateur.", de: "Das Laden des Audios wurde vom Browser abgebrochen.", pt: "O carregamento do áudio foi abortado pelo navegador." },
    audioErrorNetwork: { en: "A network error prevented the sound from loading.", es: "Un error de red impidió que el sonido se cargara.", fr: "Une erreur réseau a empêché le chargement du son.", de: "Ein Netzwerkfehler verhinderte das Laden des Tons.", pt: "Um erro de rede impediu o carregamento do som." },
    audioErrorDecode: { en: "The sound file may be corrupted or unreadable.", es: "El archivo de sonido podría estar corrupto o ilegible.", fr: "Le fichier son est peut-être corrompu ou illisible.", de: "Die Audiodatei ist möglicherweise beschädigt oder unlesbar.", pt: "O arquivo de som pode estar corrompido ou ilegível." },
    audioErrorSrcNotSupported: { en: "Audio format not supported or file missing/corrupted. Check '/sounds/success.mp3'.", es: "Formato de audio no compatible o archivo faltante/corrupto. Verifique '/sounds/success.mp3'.", fr: "Format audio non pris en charge ou fichier manquant/corrompu. Vérifiez '/sounds/success.mp3'.", de: "Audioformat nicht unterstützt oder Datei fehlt/beschädigt. Überprüfen Sie '/sounds/success.mp3'.", pt: "Formato de áudio não suportado ou ficheiro em falta/corrompido. Verifique '/sounds/success.mp3'." },
    audioErrorDefault: { en: "Call sound effect could not be loaded.", es: "No se pudo cargar el efecto de sonido de la llamada.", fr: "L'effet sonore de l'appel n'a pas pu être chargé.", de: "Der Anruf-Soundeffekt konnte nicht geladen werden.", pt: "Não foi possível carregar o efeito sonoro da chamada." },
    audioErrorUnexpected: { en: "An unexpected audio loading error occurred.", es: "Ocurrió un error inesperado al cargar el audio.", fr: "Une erreur de chargement audio inattendue s'est produite.", de: "Ein unerwarteter Fehler beim Laden des Audios ist aufgetreten.", pt: "Ocorreu um erro inesperado no carregamento do áudio."}
  },
  soundboard: {
    title: { en: "Soundboard", es: "Panel de Sonido", fr: "Table d'Harmonie", de: "Soundboard", pt: "Soundboard" },
    description: { en: "Select a phrase below to have it spoken aloud.", es: "Seleccione una frase de abajo para que se diga en voz alta.", fr: "Sélectionnez une phrase ci-dessous pour la faire prononcer à voix haute.", de: "Wählen Sie einen Satz aus, um ihn laut aussprechen zu lassen.", pt: "Selecione uma frase abaixo para que seja dita em voz alta." },
    voiceSelectorLabel: { en: "Select Voice:", es: "Seleccionar Voz:", fr: "Choisir la Voix:", de: "Stimme auswählen:", pt: "Selecionar Voz:" },
    defaultVoiceName: { en: "Default Voice", es: "Voz Predeterminada", fr: "Voix par Défaut", de: "Standardstimme", pt: "Voz Padrão"},
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
      ],
      de: [
        "Ja", "Nein", "Ich habe Durst", "Ich habe Schmerzen", "Ich muss auf die Toilette",
        "Mir ist unwohl", "Können Sie mein Kissen richten?", "Danke", "Hallo",
        "Ich brauche Hilfe", "Mir ist kalt", "Mir ist heiß"
      ],
      pt: [
        "Sim", "Não", "Estou com sede", "Estou com dor", "Preciso de ir à casa de banho",
        "Estou desconfortável", "Pode ajustar a minha almofada?", "Obrigado/a", "Olá",
        "Preciso de ajuda", "Estou com frio", "Estou com calor"
      ]
    },
    speechNotSupportedTitle: {en: "Soundboard Not Available", es: "Panel de Sonido No Disponible", fr: "Table d'Harmonie Indisponible", de: "Soundboard nicht verfügbar", pt: "Soundboard Indisponível"},
    speechNotSupportedDescription: {en: "Text-to-speech is not supported by your browser.", es: "Su navegador no admite la conversión de texto a voz.", fr: "La synthèse vocale n'est pas prise en charge par votre navigateur.", de: "Text-zu-Sprache wird von Ihrem Browser nicht unterstützt.", pt: "A conversão de texto em fala não é suportada pelo seu navegador."},
    speechErrorToastTitle: {en: "Speech Error", es: "Error de Voz", fr: "Erreur Vocale", de: "Sprachfehler", pt: "Erro de Fala"},
    speechErrorToastDescription: {en: "Could not speak the phrase.", es: "No se pudo decir la frase.", fr: "Impossible de prononcer la phrase.", de: "Der Satz konnte nicht ausgesprochen werden.", pt: "Não foi possível falar a frase."},
    speechErrorToastDescriptionInitiate: {en: "Could not initiate text-to-speech. Please ensure browser permissions are allowed.", es: "No se pudo iniciar la conversión de texto a voz. Asegúrese de que los permisos del navegador estén permitidos.", fr: "Impossible d'initier la synthèse vocale. Veuillez vérifier que les autorisations du navigateur sont accordées.", de: "Text-zu-Sprache konnte nicht initiiert werden. Bitte stellen Sie sicher, dass die Browser-Berechtigungen erteilt sind.", pt: "Não foi possível iniciar a conversão de texto em fala. Por favor, garanta que as permissões do navegador estão ativadas."}
  },
  callRequestOptions: [
    { type: 'Water', label: { en: "Water", es: "Agua", fr: "Eau", de: "Wasser", pt: "Água" } },
    { type: 'Restroom', label: { en: "Restroom", es: "Baño", fr: "Toilettes", de: "Toilette", pt: "Casa de Banho" } },
    { type: 'Reposition', label: { en: "Reposition", es: "Cambio de Posición", fr: "Changer de Position", de: "Umlagern", pt: "Reposicionar" } },
    { type: 'Pain', label: { en: "Pain", es: "Dolor", fr: "Douleur", de: "Schmerzen", pt: "Dor" } },
    { type: 'General', label: { en: "General Help", es: "Ayuda General", fr: "Aide Générale", de: "Allgemeine Hilfe", pt: "Ajuda Geral" } },
  ] as CallRequestTranslationStructure[]
};

export const bcp47LangMap: Record<LanguageCode, string> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    pt: 'pt-BR'
};
