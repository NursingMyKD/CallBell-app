
import type { CallRequestType } from '@/types/call-requests';

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ja' | 'nl';

interface CallRequestTranslationStructure {
  type: CallRequestType;
  label: {
    [key in LanguageCode]: string;
  };
}

export const appTranslations = {
  page: {
    title: { en: "iControlBell", es: "iControlBell", fr: "iControlBell", de: "iControlBell", pt: "iControlBell", it: "iControlBell", ja: "iControlBell", nl: "iControlBell" },
    description: {
      en: "Focus your gaze on the button below that best describes your need to call for assistance, or use the soundboard to speak.",
      es: "Concentre su mirada en el botón de abajo que mejor describa su necesidad de pedir ayuda, o use el panel de sonido para hablar.",
      fr: "Concentrez votre regard sur le bouton ci-dessous qui décrit le mieux votre besoin d'appeler à l'aide, ou utilisez la table d'harmonie pour parler.",
      de: "Fokussieren Sie Ihren Blick auf die Schaltfläche unten, die Ihren Hilfebedarf am besten beschreibt, oder verwenden Sie das Soundboard, um zu sprechen.",
      pt: "Concentre o seu olhar no botão abaixo que melhor descreve a sua necessidade de chamar por assistência, ou use o soundboard para falar.",
      it: "Concentra lo sguardo sul pulsante sottostante che descrive meglio la tua necessità di chiamare assistenza, oppure usa la tavola armonica per parlare.",
      ja: "下のボタンに視線を集中させて、支援を求める必要性を最もよく説明しているものを選択するか、サウンドボードを使って話してください。",
      nl: "Richt uw blik op de onderstaande knop die uw behoefte aan assistentie het beste omschrijft, of gebruik het soundboard om te spreken."
    },
    languageSelectorLabel: { en: "Select Language:", es: "Seleccionar Idioma:", fr: "Choisir la langue:", de: "Sprache auswählen:", pt: "Selecionar Idioma:", it: "Seleziona Lingua:", ja: "言語を選択:", nl: "Selecteer Taal:" }
  },
  callRequestGrid: {
    statusCallingFor: { en: "Calling for", es: "Llamando por", fr: "Appel pour", de: "Rufe nach", pt: "Chamando por", it: "Chiamata per", ja: "呼び出し中", nl: "Oproep voor" },
    toastSuccessTitle: { en: "Success!", es: "¡Éxito!", fr: "Succès!", de: "Erfolg!", pt: "Sucesso!", it: "Successo!", ja: "成功!", nl: "Succes!" },
    toastSuccessRequestSent: { en: "request sent. Help is on the way.", es: "solicitud enviada. La ayuda está en camino.", fr: "requête envoyée. L'aide est en route.", de: "Anfrage gesendet. Hilfe ist unterwegs.", pt: "solicitação enviada. A ajuda está a caminho.", it: "richiesta inviata. L'aiuto è in arrivo.", ja: "リクエストが送信されました。助けが向かっています。", nl: "verzoek verzonden. Hulp is onderweg." },
    toastErrorTitle: { en: "Error", es: "Error", fr: "Erreur", de: "Fehler", pt: "Erro", it: "Errore", ja: "エラー", nl: "Fout" },
    toastFailedToSend: { en: "Failed to send", es: "Error al enviar", fr: "Échec de l'envoi", de: "Senden fehlgeschlagen", pt: "Falha ao enviar", it: "Invio non riuscito", ja: "送信に失敗しました", nl: "Verzenden mislukt" },
    toastSystemErrorTitle: { en: "System Error", es: "Error del Sistema", fr: "Erreur Système", de: "Systemfehler", pt: "Erro de Sistema", it: "Errore di Sistema", ja: "システムエラー", nl: "Systeemfout" },
    toastCouldNotProcess: { en: "Could not process", es: "No se pudo procesar", fr: "Impossible de traiter", de: "Konnte nicht verarbeitet werden", pt: "Não foi possível processar", it: "Impossibile elaborare", ja: "処理できませんでした", nl: "Kon niet verwerken" },
    audioErrorToastTitle: { en: "Audio Alert", es: "Alerta de Audio", fr: "Alerte Audio", de: "Audio-Warnung", pt: "Alerta de Áudio", it: "Avviso Audio", ja: "音声アラート", nl: "Audiomelding" },
    audioErrorAborted: { en: "Audio loading was aborted by the browser.", es: "La carga del audio fue cancelada por el navegador.", fr: "Le chargement audio a été interrompu par le navigateur.", de: "Das Laden des Audios wurde vom Browser abgebrochen.", pt: "O carregamento do áudio foi abortado pelo navegador.", it: "Caricamento audio interrotto dal browser.", ja: "オーディオの読み込みがブラウザによって中止されました。", nl: "Het laden van audio is afgebroken door de browser." },
    audioErrorNetwork: { en: "A network error prevented the sound from loading.", es: "Un error de red impidió que el sonido se cargara.", fr: "Une erreur réseau a empêché le chargement du son.", de: "Ein Netzwerkfehler verhinderte das Laden des Tons.", pt: "Um erro de rede impediu o carregamento do som.", it: "Un errore di rete ha impedito il caricamento del suono.", ja: "ネットワークエラーによりサウンドを読み込めませんでした。", nl: "Een netwerkfout heeft het laden van het geluid verhinderd." },
    audioErrorDecode: { en: "The sound file may be corrupted or unreadable.", es: "El archivo de sonido podría estar corrupto o ilegible.", fr: "Le fichier son est peut-être corrompu ou illisible.", de: "Die Audiodatei ist möglicherweise beschädigt oder unlesbar.", pt: "O arquivo de som pode estar corrompido ou ilegível.", it: "Il file audio potrebbe essere corrotto o illeggibile.", ja: "サウンドファイルが破損しているか、読み取れない可能性があります。", nl: "Het geluidsbestand is mogelijk beschadigd of onleesbaar." },
    audioErrorSrcNotSupported: { en: "Audio format not supported or file missing/corrupted. Check '/sounds/success.mp3'.", es: "Formato de audio no compatible o archivo faltante/corrupto. Verifique '/sounds/success.mp3'.", fr: "Format audio non pris en charge ou fichier manquant/corrompu. Vérifiez '/sounds/success.mp3'.", de: "Audioformat nicht unterstützt oder Datei fehlt/beschädigt. Überprüfen Sie '/sounds/success.mp3'.", pt: "Formato de áudio não suportado ou ficheiro em falta/corrompido. Verifique '/sounds/success.mp3'.", it: "Formato audio non supportato o file mancante/corrotto. Controlla '/sounds/success.mp3'.", ja: "オーディオ形式がサポートされていないか、ファイルが見つからないか破損しています。'/sounds/success.mp3' を確認してください。", nl: "Audioformaat niet ondersteund of bestand ontbreekt/is beschadigd. Controleer '/sounds/success.mp3'." },
    audioErrorDefault: { en: "Call sound effect could not be loaded.", es: "No se pudo cargar el efecto de sonido de la llamada.", fr: "L'effet sonore de l'appel n'a pas pu être chargé.", de: "Der Anruf-Soundeffekt konnte nicht geladen werden.", pt: "Não foi possível carregar o efeito sonoro da chamada.", it: "Impossibile caricare l'effetto sonoro della chiamata.", ja: "通話効果音を読み込めませんでした。", nl: "Het geluidseffect van de oproep kon niet worden geladen." },
    audioErrorUnexpected: { en: "An unexpected audio loading error occurred.", es: "Ocurrió un error inesperado al cargar el audio.", fr: "Une erreur de chargement audio inattendue s'est produite.", de: "Ein unerwarteter Fehler beim Laden des Audios ist aufgetreten.", pt: "Ocorreu um erro inesperado no carregamento do áudio.", it: "Si è verificato un errore imprevisto durante il caricamento dell'audio.", ja: "オーディオの読み込み中に予期しないエラーが発生しました。", nl: "Er is een onverwachte fout opgetreden bij het laden van de audio." }
  },
  soundboard: {
    title: { en: "Soundboard", es: "Panel de Sonido", fr: "Table d'Harmonie", de: "Soundboard", pt: "Soundboard", it: "Tavola Armonica", ja: "サウンドボード", nl: "Soundboard" },
    description: { en: "Select a phrase below to have it spoken aloud.", es: "Seleccione una frase de abajo para que se diga en voz alta.", fr: "Sélectionnez une phrase ci-dessous pour la faire prononcer à voix haute.", de: "Wählen Sie einen Satz aus, um ihn laut aussprechen zu lassen.", pt: "Selecione uma frase abaixo para que seja dita em voz alta.", it: "Seleziona una frase qui sotto per farla pronunciare ad alta voce.", ja: "下のフレーズを選択して、声に出して読んでもらいます。", nl: "Selecteer hieronder een zin om deze hardop te laten uitspreken." },
    voiceSelectorLabel: { en: "Select Voice:", es: "Seleccionar Voz:", fr: "Choisir la Voix:", de: "Stimme auswählen:", pt: "Selecionar Voz:", it: "Seleziona Voce:", ja: "音声を選択:", nl: "Selecteer Stem:" },
    defaultVoiceName: { en: "Default Voice", es: "Voz Predeterminada", fr: "Voix par Défaut", de: "Standardstimme", pt: "Voz Padrão", it: "Voce Predefinita", ja: "デフォルトの音声", nl: "Standaardstem" },
    phrases: {
      en: [ "Yes", "No", "I'm thirsty", "I'm in pain", "I need to use the restroom", "I'm uncomfortable", "Can you adjust my pillow?", "Thank you", "Hello", "I need help", "I'm cold", "I'm hot" ],
      es: [ "Sí", "No", "Tengo sed", "Tengo dolor", "Necesito usar el baño", "Estoy incómodo/a", "¿Puede ajustar mi almohada?", "Gracias", "Hola", "Necesito ayuda", "Tengo frío", "Tengo calor" ],
      fr: [ "Oui", "Non", "J'ai soif", "J'ai mal", "J'ai besoin d'aller aux toilettes", "Je suis inconfortable", "Pouvez-vous ajuster mon oreiller ?", "Merci", "Bonjour", "J'ai besoin d'aide", "J'ai froid", "J'ai chaud" ],
      de: [ "Ja", "Nein", "Ich habe Durst", "Ich habe Schmerzen", "Ich muss auf die Toilette", "Mir ist unwohl", "Können Sie mein Kissen richten?", "Danke", "Hallo", "Ich brauche Hilfe", "Mir ist kalt", "Mir ist heiß" ],
      pt: [ "Sim", "Não", "Estou com sede", "Estou com dor", "Preciso de ir à casa de banho", "Estou desconfortável", "Pode ajustar a minha almofada?", "Obrigado/a", "Olá", "Preciso de ajuda", "Estou com frio", "Estou com calor" ],
      it: [ "Sì", "No", "Ho sete", "Ho dolore", "Devo usare il bagno", "Sono a disagio", "Puoi sistemarmi il cuscino?", "Grazie", "Ciao", "Ho bisogno di aiuto", "Ho freddo", "Ho caldo" ],
      ja: [ "はい", "いいえ", "喉が渇きました", "痛いです", "トイレに行きたいです", "不快です", "枕を直してくれますか？", "ありがとう", "こんにちは", "助けが必要です", "寒いです", "暑いです" ],
      nl: [ "Ja", "Nee", "Ik heb dorst", "Ik heb pijn", "Ik moet naar het toilet", "Ik voel me ongemakkelijk", "Kunt u mijn kussen verstellen?", "Dank u", "Hallo", "Ik heb hulp nodig", "Ik heb het koud", "Ik heb het warm" ]
    },
    speechNotSupportedTitle: {en: "Soundboard Not Available", es: "Panel de Sonido No Disponible", fr: "Table d'Harmonie Indisponible", de: "Soundboard nicht verfügbar", pt: "Soundboard Indisponível", it: "Tavola Armonica Non Disponibile", ja: "サウンドボードは利用できません", nl: "Soundboard niet beschikbaar"},
    speechNotSupportedDescription: {en: "Text-to-speech is not supported by your browser.", es: "Su navegador no admite la conversión de texto a voz.", fr: "La synthèse vocale n'est pas prise en charge par votre navigateur.", de: "Text-zu-Sprache wird von Ihrem Browser nicht unterstützt.", pt: "A conversão de texto em fala não é suportada pelo seu navegador.", it: "La sintesi vocale non è supportata dal tuo browser.", ja: "テキスト読み上げは、お使いのブラウザではサポートされていません。", nl: "Tekst-naar-spraak wordt niet ondersteund door uw browser."},
    speechErrorToastTitle: {en: "Speech Error", es: "Error de Voz", fr: "Erreur Vocale", de: "Sprachfehler", pt: "Erro de Fala", it: "Errore Vocale", ja: "音声エラー", nl: "Spraakfout"},
    speechErrorToastDescription: {en: "Could not speak the phrase.", es: "No se pudo decir la frase.", fr: "Impossible de prononcer la phrase.", de: "Der Satz konnte nicht ausgesprochen werden.", pt: "Não foi possível falar a frase.", it: "Impossibile pronunciare la frase.", ja: "フレーズを話せませんでした。", nl: "Kon de zin niet uitspreken."},
    speechErrorToastDescriptionInitiate: {en: "Could not initiate text-to-speech. Please ensure browser permissions are allowed.", es: "No se pudo iniciar la conversión de texto a voz. Asegúrese de que los permisos del navegador estén permitidos.", fr: "Impossible d'initier la synthèse vocale. Veuillez vérifier que les autorisations du navigateur sont accordées.", de: "Text-zu-Sprache konnte nicht initiiert werden. Bitte stellen Sie sicher, dass die Browser-Berechtigungen erteilt sind.", pt: "Não foi possível iniciar a conversão de texto em fala. Por favor, garanta que as permissões do navegador estão ativadas.", it: "Impossibile avviare la sintesi vocale. Assicurati che le autorizzazioni del browser siano consentite.", ja: "テキスト読み上げを開始できませんでした。ブラウザの権限が許可されていることを確認してください。", nl: "Kan tekst-naar-spraak niet starten. Zorg ervoor dat de browsertoestemmingen zijn toegestaan."}
  },
  callRequestOptions: [
    { type: 'Water', label: { en: "Water", es: "Agua", fr: "Eau", de: "Wasser", pt: "Água", it: "Acqua", ja: "水", nl: "Water" } },
    { type: 'Restroom', label: { en: "Restroom", es: "Baño", fr: "Toilettes", de: "Toilette", pt: "Casa de Banho", it: "Bagno", ja: "トイレ", nl: "Toilet" } },
    { type: 'Reposition', label: { en: "Reposition", es: "Cambio de Posición", fr: "Changer de Position", de: "Umlagern", pt: "Reposicionar", it: "Cambio Posizione", ja: "体位交換", nl: "Verplaatsen" } },
    { type: 'Pain', label: { en: "Pain", es: "Dolor", fr: "Douleur", de: "Schmerzen", pt: "Dor", it: "Dolore", ja: "痛み", nl: "Pijn" } },
    { type: 'General', label: { en: "General Help", es: "Ayuda General", fr: "Aide Générale", de: "Allgemeine Hilfe", pt: "Ajuda Geral", it: "Aiuto Generale", ja: "一般的な助け", nl: "Algemene Hulp" } },
  ] as CallRequestTranslationStructure[]
};

export const bcp47LangMap: Record<LanguageCode, string> = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    pt: 'pt-BR',
    it: 'it-IT',
    ja: 'ja-JP',
    nl: 'nl-NL'
};

    