
import type { CallRequestType } from '@/types/call-requests';

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ja' | 'nl' | 'ru' | 'zh' | 'hi' | 'ar' | 'bn' | 'ko' | 'tr' | 'pl' | 'sv' | 'vi';

interface CallRequestTranslationStructure {
  type: CallRequestType;
  label: {
    [key in LanguageCode]: string;
  };
}

export const appTranslations = {
  page: {
    title: { en: "iControlBell", es: "iControlBell", fr: "iControlBell", de: "iControlBell", pt: "iControlBell", it: "iControlBell", ja: "iControlBell", nl: "iControlBell", ru: "iControlBell", zh: "iControlBell", hi: "iControlBell", ar: "iControlBell", bn: "iControlBell", ko: "iControlBell", tr: "iControlBell", pl: "iControlBell", sv: "iControlBell", vi: "iControlBell" },
    description: {
      en: "Focus your gaze on the button below that best describes your need to call for assistance, or use the soundboard to speak.",
      es: "Concentre su mirada en el botón de abajo que mejor describa su necesidad de pedir ayuda, o use el panel de sonido para hablar.",
      fr: "Concentrez votre regard sur le bouton ci-dessous qui décrit le mieux votre besoin d'appeler à l'aide, ou utilisez la table d'harmonie pour parler.",
      de: "Fokussieren Sie Ihren Blick auf die Schaltfläche unten, die Ihren Hilfebedarf am besten beschreibt, oder verwenden Sie das Soundboard, um zu sprechen.",
      pt: "Concentre o seu olhar no botão abaixo que melhor descreve a sua necessidade de chamar por assistência, ou use o soundboard para falar.",
      it: "Concentra lo sguardo sul pulsante sottostante che descrive meglio la tua necessità di chiamare assistenza, oppure usa la tavola armonica per parlare.",
      ja: "下のボタンに視線を集中させて、支援を求める必要性を最もよく説明しているものを選択するか、サウンドボードを使って話してください。",
      nl: "Richt uw blik op de onderstaande knop die uw behoefte aan assistentie het beste omschrijft, of gebruik het soundboard om te spreken.",
      ru: "Сфокусируйте взгляд на кнопке ниже, которая лучше всего описывает вашу потребность в помощи, или используйте звуковую панель для речи.",
      zh: "请将目光集中在下方最能描述您呼叫援助需求的按钮上，或使用音板说话。",
      hi: "सहायता के लिए अपनी ज़रूरत का सबसे अच्छा वर्णन करने वाले नीचे दिए गए बटन पर अपनी नज़र केंद्रित करें, या बोलने के लिए साउंडबोर्ड का उपयोग करें।",
      ar: "ركز نظرك على الزر أدناه الذي يصف حاجتك لطلب المساعدة بشكل أفضل، أو استخدم لوحة الصوت للتحدث.",
      bn: "সহায়তার জন্য আপনার প্রয়োজন সবচেয়ে ভালোভাবে বর্ণনা করে এমন নিচের বোতামে আপনার দৃষ্টি নিবদ্ধ করুন, অথবা কথা বলার জন্য সাউন্ডবোর্ড ব্যবহার করুন।",
      ko: "도움이 필요한 상황을 가장 잘 설명하는 아래 버튼에 시선을 집중하거나 사운드보드를 사용하여 말하십시오.",
      tr: "Yardım çağırma ihtiyacınızı en iyi tanımlayan aşağıdaki düğmeye bakın veya konuşmak için ses tahtasını kullanın.",
      pl: "Skup wzrok na przycisku poniżej, który najlepiej opisuje Twoją potrzebę wezwania pomocy, lub użyj tablicy dźwiękowej, aby mówić.",
      sv: "Fokusera blicken på knappen nedan som bäst beskriver ditt behov av att tillkalla hjälp, eller använd ljudbrädan för att tala.",
      vi: "Tập trung ánh nhìn vào nút bên dưới mô tả đúng nhất nhu cầu gọi hỗ trợ của bạn, hoặc sử dụng bảng âm thanh để nói."
    },
    languageSelectorLabel: { en: "Select Language:", es: "Seleccionar Idioma:", fr: "Choisir la langue:", de: "Sprache auswählen:", pt: "Selecionar Idioma:", it: "Seleziona Lingua:", ja: "言語を選択:", nl: "Selecteer Taal:", ru: "Выберите язык:", zh: "选择语言：", hi: "भाषा चुनें:", ar: "اختار اللغة:", bn: "ভাষা নির্বাচন করুন:", ko: "언어 선택:", tr: "Dil Seçin:", pl: "Wybierz język:", sv: "Välj språk:", vi: "Chọn ngôn ngữ:" }
  },
  callRequestGrid: {
    statusCallingFor: { en: "Calling for", es: "Llamando por", fr: "Appel pour", de: "Rufe nach", pt: "Chamando por", it: "Chiamata per", ja: "呼び出し中", nl: "Oproep voor", ru: "Вызов для", zh: "正在呼叫", hi: "के लिए कॉल कर रहे हैं", ar: "جارٍ الاتصال بـ", bn: "এর জন্য কল করা হচ্ছে", ko: "요청 중", tr: "için aranıyor", pl: "Wzywanie", sv: "Ringer efter", vi: "Đang gọi" },
    toastSuccessTitle: { en: "Success!", es: "¡Éxito!", fr: "Succès!", de: "Erfolg!", pt: "Sucesso!", it: "Successo!", ja: "成功!", nl: "Succes!", ru: "Успешно!", zh: "成功！", hi: "सफलता!", ar: "نجاح!", bn: "সফল!", ko: "성공!", tr: "Başarılı!", pl: "Sukces!", sv: "Lyckades!", vi: "Thành công!" },
    toastSuccessRequestSent: { en: "request sent. Help is on the way.", es: "solicitud enviada. La ayuda está en camino.", fr: "requête envoyée. L'aide est en route.", de: "Anfrage gesendet. Hilfe ist unterwegs.", pt: "solicitação enviada. A ajuda está a caminho.", it: "richiesta inviata. L'aiuto è in arrivo.", ja: "リクエストが送信されました。助けが向かっています。", nl: "verzoek verzonden. Hulp is onderweg.", ru: "запрос отправлен. Помощь уже в пути.", zh: "请求已发送。帮助正在路上。", hi: "अनुरोध भेजा गया। मदद रास्ते में है।", ar: "تم إرسال الطلب. المساعدة في الطريق.", bn: "অনুরোধ পাঠানো হয়েছে। সাহায্য আসছে।", ko: "요청이 전송되었습니다. 도움이 오고 있습니다.", tr: "istek gönderildi. Yardım yolda.", pl: "prośba wysłana. Pomoc jest w drodze.", sv: "förfrågan skickad. Hjälp är på väg.", vi: "yêu cầu đã được gửi. Trợ giúp đang đến." },
    toastErrorTitle: { en: "Error", es: "Error", fr: "Erreur", de: "Fehler", pt: "Erro", it: "Errore", ja: "エラー", nl: "Fout", ru: "Ошибка", zh: "错误", hi: "त्रुटि", ar: "خطأ", bn: "ত্রুটি", ko: "오류", tr: "Hata", pl: "Błąd", sv: "Fel", vi: "Lỗi" },
    toastFailedToSend: { en: "Failed to send", es: "Error al enviar", fr: "Échec de l'envoi", de: "Senden fehlgeschlagen", pt: "Falha ao enviar", it: "Invio non riuscito", ja: "送信に失敗しました", nl: "Verzenden mislukt", ru: "Не удалось отправить", zh: "发送失败", hi: "भेजने में विफल", ar: "فشل الإرسال", bn: "পাঠাতে ব্যর্থ", ko: "전송 실패", tr: "Gönderilemedi", pl: "Nie udało się wysłać", sv: "Misslyckades att skicka", vi: "Gửi thất bại" },
    toastSystemErrorTitle: { en: "System Error", es: "Error del Sistema", fr: "Erreur Système", de: "Systemfehler", pt: "Erro de Sistema", it: "Errore di Sistema", ja: "システムエラー", nl: "Systeemfout", ru: "Системная ошибка", zh: "系统错误", hi: "सिस्टम त्रुटि", ar: "خطأ في النظام", bn: "সিস্টেমের ত্রুটি", ko: "시스템 오류", tr: "Sistem Hatası", pl: "Błąd systemu", sv: "Systemfel", vi: "Lỗi hệ thống" },
    toastCouldNotProcess: { en: "Could not process", es: "No se pudo procesar", fr: "Impossible de traiter", de: "Konnte nicht verarbeitet werden", pt: "Não foi possível processar", it: "Impossibile elaborare", ja: "処理できませんでした", nl: "Kon niet verwerken", ru: "Не удалось обработать", zh: "无法处理", hi: "संसाधित नहीं किया जा सका", ar: "تعذرت المعالجة", bn: "প্রক্রিয়া করা যায়নি", ko: "처리할 수 없습니다", tr: "İşlenemedi", pl: "Nie można przetworzyć", sv: "Kunde inte behandla", vi: "Không thể xử lý" },
    audioErrorToastTitle: { en: "Audio Alert", es: "Alerta de Audio", fr: "Alerte Audio", de: "Audio-Warnung", pt: "Alerta de Áudio", it: "Avviso Audio", ja: "音声アラート", nl: "Audiomelding", ru: "Аудиооповещение", zh: "音频警报", hi: "ऑडियो अलर्ट", ar: "تنبيه صوتي", bn: "অডিও সতর্কতা", ko: "오디오 알림", tr: "Sesli Uyarı", pl: "Alert dźwiękowy", sv: "Ljudvarning", vi: "Cảnh báo âm thanh" },
    audioErrorAborted: { en: "Audio loading was aborted by the browser.", es: "La carga del audio fue cancelada por el navegador.", fr: "Le chargement audio a été interrompu par le navigateur.", de: "Das Laden des Audios wurde vom Browser abgebrochen.", pt: "O carregamento do áudio foi abortado pelo navegador.", it: "Caricamento audio interrotto dal browser.", ja: "オーディオの読み込みがブラウザによって中止されました。", nl: "Het laden van audio is afgebroken door de browser.", ru: "Загрузка аудио была прервана браузером.", zh: "音频加载被浏览器中止。", hi: "ब्राउज़र द्वारा ऑडियो लोडिंग रद्द कर दिया गया था।", ar: "تم إحباط تحميل الصوت بواسطة المتصفح.", bn: "অডিও লোডিং ব্রাউজার দ্বারা বাতিল করা হয়েছে।", ko: "브라우저에서 오디오 로드를 중단했습니다.", tr: "Ses yüklemesi tarayıcı tarafından iptal edildi.", pl: "Ładowanie dźwięku zostało przerwane przez przeglądarkę.", sv: "Laddning av ljud avbröts av webbläsaren.", vi: "Tải âm thanh đã bị trình duyệt hủy bỏ." },
    audioErrorNetwork: { en: "A network error prevented the sound from loading.", es: "Un error de red impidió que el sonido se cargara.", fr: "Une erreur réseau a empêché le chargement du son.", de: "Ein Netzwerkfehler verhinderte das Laden des Tons.", pt: "Um erro de rede impediu o carregamento do som.", it: "Un errore di rete ha impedito il caricamento del suono.", ja: "ネットワークエラーによりサウンドを読み込めませんでした。", nl: "Een netwerkfout heeft het laden van het geluid verhinderd.", ru: "Сетевая ошибка помешаala загрузке звука.", zh: "网络错误导致声音无法加载。", hi: "नेटवर्क त्रुटि के कारण ध्वनि लोड नहीं हो सकी।", ar: "منع خطأ في الشبكة تحميل الصوت.", bn: "একটি নেটওয়ার্ক ত্রুটি শব্দ লোড হতে বাধা দিয়েছে।", ko: "네트워크 오류로 인해 사운드를 로드할 수 없습니다.", tr: "Bir ağ hatası sesin yüklenmesini engelledi.", pl: "Błąd sieci uniemożliwił załadowanie dźwięku.", sv: "Ett nätverksfel förhindrade ljudet från att laddas.", vi: "Lỗi mạng đã ngăn không cho tải âm thanh." },
    audioErrorDecode: { en: "The sound file may be corrupted or unreadable.", es: "El archivo de sonido podría estar corrupto o ilegible.", fr: "Le fichier son est peut-être corrompu ou illisible.", de: "Die Audiodatei ist möglicherweise beschädigt oder unlesbar.", pt: "O arquivo de som pode estar corrompido ou ilegível.", it: "Il file audio potrebbe essere corrotto o illeggibile.", ja: "サウンドファイルが破損しているか、読み取れない可能性があります。", nl: "Het geluidsbestand is mogelijk beschadigd of onleesbaar.", ru: "Звуковой файл может быть поврежден или нечитаем.", zh: "声音文件可能已损坏或无法读取。", hi: "ध्वनि फ़ाइल दूषित या अपठनीय हो सकती है।", ar: "قد يكون ملف الصوت تالفًا أو غير قابل للقراءة.", bn: "শব্দ ফাইলটি দুর্নীতিগ্রস্ত বা অপঠনযোগ্য হতে পারে।", ko: "사운드 파일이 손상되었거나 읽을 수 없습니다.", tr: "Ses dosyası bozuk veya okunamıyor olabilir.", pl: "Plik dźwiękowy może być uszkodzony lub nieczytelny.", sv: "Ljudfilen kan vara skadad eller oläsbar.", vi: "Tệp âm thanh có thể bị hỏng hoặc không thể đọc được." },
    audioErrorSrcNotSupported: { en: "Audio format not supported or file missing/corrupted. Check '/sounds/success.mp3'.", es: "Formato de audio no compatible o archivo faltante/corrupto. Verifique '/sounds/success.mp3'.", fr: "Format audio non pris en charge ou fichier manquant/corrompu. Vérifiez '/sounds/success.mp3'.", de: "Audioformat nicht unterstützt oder Datei fehlt/beschädigt. Überprüfen Sie '/sounds/success.mp3'.", pt: "Formato de áudio não suportado ou ficheiro em falta/corrompido. Verifique '/sounds/success.mp3'.", it: "Formato audio non supportato o file mancante/corrotto. Controlla '/sounds/success.mp3'.", ja: "オーディオ形式がサポートされていないか、ファイルが見つからないか破損しています。'/sounds/success.mp3' を確認してください。", nl: "Audioformaat niet ondersteund of bestand ontbreekt/is beschadigd. Controleer '/sounds/success.mp3'.", ru: "Формат аудио не поддерживается, либо файл отсутствует/поврежден. Проверьте '/sounds/success.mp3'.", zh: "不支持的音频格式或文件丢失/损坏。请检查 '/sounds/success.mp3'。", hi: "ऑडियो प्रारूप समर्थित नहीं है या फ़ाइल गुम/दूषित है। '/sounds/success.mp3' की जाँच करें।", ar: "تنسيق الصوت غير مدعوم أو الملف مفقود/تالف. تحقق من '/sounds/success.mp3'.", bn: "অডিও ফরম্যাট সমর্থিত নয় বা ফাইল অনুপস্থিত/ত্রুটিপূর্ণ। '/sounds/success.mp3' চেক করুন।", ko: "오디오 형식이 지원되지 않거나 파일이 없거나 손상되었습니다. '/sounds/success.mp3'를 확인하십시오.", tr: "Ses formatı desteklenmiyor veya dosya eksik/bozuk. '/sounds/success.mp3' dosyasını kontrol edin.", pl: "Format audio nie jest obsługiwany lub plik jest brakujący/uszkodzony. Sprawdź '/sounds/success.mp3'.", sv: "Ljudformatet stöds inte eller filen saknas/är skadad. Kontrollera '/sounds/success.mp3'.", vi: "Định dạng âm thanh không được hỗ trợ hoặc tệp bị thiếu/hỏng. Kiểm tra '/sounds/success.mp3'." },
    audioErrorDefault: { en: "Call sound effect could not be loaded.", es: "No se pudo cargar el efecto de sonido de la llamada.", fr: "L'effet sonore de l'appel n'a pas pu être chargé.", de: "Der Anruf-Soundeffekt konnte nicht geladen werden.", pt: "Não foi possível carregar o efeito sonoro da chamada.", it: "Impossibile caricare l'effetto sonoro della chiamata.", ja: "通話効果音を読み込めませんでした。", nl: "Het geluidseffect van de oproep kon niet worden geladen.", ru: "Не удалось загрузить звуковой эффект вызова.", zh: "无法加载呼叫声音效果。", hi: "कॉल ध्वनि प्रभाव लोड नहीं किया जा सका।", ar: "تعذر تحميل تأثير صوت المكالمة.", bn: "কল সাউন্ড এফেক্ট লোড করা যায়নি।", ko: "통화 음향 효과를 로드할 수 없습니다.", tr: "Arama ses efekti yüklenemedi.", pl: "Nie można załadować efektu dźwiękowego połączenia.", sv: "Samtalsljudeffekten kunde inte laddas.", vi: "Không thể tải hiệu ứng âm thanh cuộc gọi." },
    audioErrorUnexpected: { en: "An unexpected audio loading error occurred.", es: "Ocurrió un error inesperado al cargar el audio.", fr: "Une erreur de chargement audio inattendue s'est produite.", de: "Ein unerwarteter Fehler beim Laden des Audios ist aufgetreten.", pt: "Ocorreu um erro inesperado no carregamento do áudio.", it: "Si è verificato un errore imprevisto durante il caricamento dell'audio.", ja: "オーディオの読み込み中に予期しないエラーが発生しました。", nl: "Er is een onverwachte fout opgetreden bij het laden van de audio.", ru: "Произошла непредвиденная ошибка загрузки аудио.", zh: "发生意外的音频加载错误。", hi: "एक अप्रत्याशित ऑडियो लोडिंग त्रुटि हुई।", ar: "حدث خطأ غير متوقع في تحميل الصوت.", bn: "একটি অপ্রত্যাশিত অডিও লোডিং ত্রুটি ঘটেছে।", ko: "예상치 못한 오디오 로드 오류가 발생했습니다.", tr: "Beklenmedik bir ses yükleme hatası oluştu.", pl: "Wystąpił nieoczekiwany błąd ładowania dźwięku.", sv: "Ett oväntat ljudladdningsfel inträffade.", vi: "Đã xảy ra lỗi tải âm thanh không mong muốn." }
  },
  soundboard: {
    title: { en: "Soundboard", es: "Panel de Sonido", fr: "Table d'Harmonie", de: "Soundboard", pt: "Soundboard", it: "Tavola Armonica", ja: "サウンドボード", nl: "Soundboard", ru: "Звуковая панель", zh: "音板", hi: "साउंडबोर्ड", ar: "لوحة الصوت", bn: "সাউন্ডবোর্ড", ko: "사운드보드", tr: "Ses Tahtası", pl: "Tablica dźwiękowa", sv: "Ljudbräda", vi: "Bảng âm thanh" },
    description: { en: "Select a category and a phrase to have it spoken aloud.", es: "Seleccione una categoría y una frase para que se diga en voz alta.", fr: "Sélectionnez une catégorie et une phrase pour la faire prononcer à voix haute.", de: "Wählen Sie eine Kategorie und einen Satz aus, um ihn laut aussprechen zu lassen.", pt: "Selecione uma categoria e uma frase para que seja dita em voz alta.", it: "Seleziona una categoria e una frase per farla pronunciare ad alta voce.", ja: "カテゴリとフレーズを選択して、声に出して読んでもらいます。", nl: "Selecteer een categorie en een zin om deze hardop te laten uitspreken.", ru: "Выберите категорию и фразу, чтобы она была произнесена вслух.", zh: "选择一个类别和一个短语，让它大声说出来。", hi: "इसे जोर से बोलने के लिए एक श्रेणी और एक वाक्यांश चुनें।", ar: "اختر فئة وعبارة ليتم نطقها بصوت عالٍ.", bn: "এটি উচ্চস্বরে বলার জন্য একটি বিভাগ এবং একটি বাক্যাংশ নির্বাচন করুন।", ko: "카테고리와 문구를 선택하여 소리 내어 말하게 하십시오.", tr: "Yüksek sesle söylenmesi için bir kategori ve bir ifade seçin.", pl: "Wybierz kategorię i frazę, aby została wypowiedziana na głos.", sv: "Välj en kategori och en fras för att få den uppläst.", vi: "Chọn một danh mục và một cụm từ để được đọc to." },
    voiceSelectorLabel: { en: "Select Voice:", es: "Seleccionar Voz:", fr: "Choisir la Voix:", de: "Stimme auswählen:", pt: "Selecionar Voz:", it: "Seleziona Voce:", ja: "音声を選択:", nl: "Selecteer Stem:", ru: "Выберите голос:", zh: "选择声音：", hi: "आवाज चुनें:", ar: "اختر الصوت:", bn: "ভয়েস নির্বাচন করুন:", ko: "음성 선택:", tr: "Ses Seçin:", pl: "Wybierz głos:", sv: "Välj röst:", vi: "Chọn giọng nói:" },
    defaultVoiceName: { en: "Default Voice", es: "Voz Predeterminada", fr: "Voix par Défaut", de: "Standardstimme", pt: "Voz Padrão", it: "Voce Predefinita", ja: "デフォルトの音声", nl: "Standaardstem", ru: "Голос по умолчанию", zh: "默认声音", hi: "डिफ़ॉल्ट आवाज", ar: "الصوت الافتراضي", bn: "ডিফল্ট ভয়েস", ko: "기본 음성", tr: "Varsayılan Ses", pl: "Głos domyślny", sv: "Standardröst", vi: "Giọng nói mặc định" },
    categories: {
      greetings: {
        title: { en: "Greetings", es: "Saludos", fr: "Salutations", de: "Grüße", pt: "Saudações", it: "Saluti", ja: "挨拶", nl: "Groeten", ru: "Приветствия", zh: "问候", hi: "अभिवादन", ar: "تحيات", bn: "শুভেচ্ছা", ko: "인사", tr: "Selamlar", pl: "Pozdrowienia", sv: "Hälsningar", vi: "Chào hỏi" },
        phrases: {
          en: [ "Hello", "Goodbye", "Thank you", "Please", "How are you?", "My name is..." ],
          es: [ "Hola", "Adiós", "Gracias", "Por favor", "¿Cómo está?", "Mi nombre es..." ],
          fr: [ "Bonjour", "Au revoir", "Merci", "S'il vous plaît", "Comment allez-vous ?", "Je m'appelle..." ],
          de: [ "Hallo", "Auf Wiedersehen", "Danke", "Bitte", "Wie geht es Ihnen?", "Mein Name ist..." ],
          pt: [ "Olá", "Adeus", "Obrigado/a", "Por favor", "Como está?", "O meu nome é..." ],
          it: [ "Ciao", "Arrivederci", "Grazie", "Per favore", "Come sta?", "Mi chiamo..." ],
          ja: [ "こんにちは", "さようなら", "ありがとう", "お願いします", "お元気ですか？", "私の名前は..." ],
          nl: [ "Hallo", "Tot ziens", "Dank u", "Alstublieft", "Hoe gaat het met u?", "Mijn naam is..." ],
          ru: [ "Здравствуйте", "До свидания", "Спасибо", "Пожалуйста", "Как дела?", "Меня зовут..." ],
          zh: [ "你好", "再见", "谢谢", "请", "你好吗？", "我的名字是..." ],
          hi: [ "नमस्ते", "अलविदा", "धन्यवाद", "कृपया", "आप कैसे हैं?", "मेरा नाम है..." ],
          ar: [ "مرحبا", "مع السلامة", "شكرا لك", "من فضلك", "كيف حالك؟", "اسمي..." ],
          bn: [ "হ্যালো", "বিদায়", "ধন্যবাদ", "অনুগ্রহ করে", "আপনি কেমন আছেন?", "আমার নাম..." ],
          ko: [ "안녕하세요", "안녕히 가세요", "감사합니다", "부탁합니다", "어떻게 지내세요?", "제 이름은..." ],
          tr: [ "Merhaba", "Hoşça kalın", "Teşekkür ederim", "Lütfen", "Nasılsınız?", "Benim adım..." ],
          pl: [ "Cześć", "Do widzenia", "Dziękuję", "Proszę", "Jak się masz?", "Mam na imię..." ],
          sv: [ "Hej", "Hejdå", "Tack", "Snälla", "Hur mår du?", "Jag heter..." ],
          vi: [ "Xin chào", "Tạm biệt", "Cảm ơn", "Làm ơn", "Bạn khỏe không?", "Tên tôi là..." ],
        }
      },
      needs: {
        title: { en: "Needs", es: "Necesidades", fr: "Besoins", de: "Bedürfnisse", pt: "Necessidades", it: "Bisogni", ja: "必要", nl: "Behoeften", ru: "Потребности", zh: "需求", hi: "ज़रूरतें", ar: "احتياجات", bn: "প্রয়োজন", ko: "필요", tr: "İhtiyaçlar", pl: "Potrzeby", sv: "Behov", vi: "Nhu cầu" },
        phrases: {
          en: [ "I'm thirsty", "I'm hungry", "I need to use the restroom", "I need to wash up" ],
          es: [ "Tengo sed", "Tengo hambre", "Necesito usar el baño", "Necesito lavarme" ],
          fr: [ "J'ai soif", "J'ai faim", "J'ai besoin d'aller aux toilettes", "J'ai besoin de me laver" ],
          de: [ "Ich habe Durst", "Ich habe Hunger", "Ich muss auf die Toilette", "Ich muss mich waschen" ],
          pt: [ "Estou com sede", "Estou com fome", "Preciso de ir à casa de banho", "Preciso de me lavar" ],
          it: [ "Ho sete", "Ho fame", "Devo usare il bagno", "Devo lavarmi" ],
          ja: [ "喉が渇きました", "お腹が空きました", "トイレに行きたいです", "体を洗いたいです" ],
          nl: [ "Ik heb dorst", "Ik heb honger", "Ik moet naar het toilet", "Ik moet me wassen" ],
          ru: [ "Я хочу пить", "Я голоден/голодна", "Мне нужно в туалет", "Мне нужно умыться" ],
          zh: [ "我渴了", "我饿了", "我要上厕所", "我需要洗漱" ],
          hi: [ "मुझे प्यास लगी है", "मुझे भूख लगी है", "मुझे शौचालय जाना है", "मुझे हाथ-मुंह धोना है" ],
          ar: [ "أنا عطشان", "أنا جائع", "أحتاج إلى استخدام الحمام", "أحتاج أن أغسل" ],
          bn: [ "আমি তৃষ্ণার্ত", "আমি ক্ষুধার্ত", "আমাকে বাথরুমে যেতে হবে", "আমার নিজেকে ধুতে হবে" ],
          ko: [ "목이 말라요", "배가 고파요", "화장실에 가야 해요", "씻어야 해요" ],
          tr: [ "Susadım", "Açım", "Tuvaleti kullanmam gerek", "Yıkanmam gerek" ],
          pl: [ "Chce mi się pić", "Jestem głodny/głodna", "Muszę skorzystać z toalety", "Muszę się umyć" ],
          sv: [ "Jag är törstig", "Jag är hungrig", "Jag måste gå på toaletten", "Jag måste tvätta mig" ],
          vi: [ "Tôi khát", "Tôi đói", "Tôi cần đi vệ sinh", "Tôi cần tắm rửa" ],
        }
      },
      comfort: {
        title: { en: "Comfort", es: "Comodidad", fr: "Confort", de: "Komfort", pt: "Conforto", it: "Comfort", ja: "快適さ", nl: "Comfort", ru: "Комфорт", zh: "舒适", hi: "आराम", ar: "راحة", bn: "আরাম", ko: "편안함", tr: "Konfor", pl: "Komfort", sv: "Komfort", vi: "Sự thoải mái" },
        phrases: {
          en: [ "I'm uncomfortable", "Can you adjust my pillow?", "Can you raise the bed?", "Can you lower the bed?", "I'm cold", "I'm hot" ],
          es: [ "Estoy incómodo/a", "¿Puede ajustar mi almohada?", "¿Puede subir la cama?", "¿Puede bajar la cama?", "Tengo frío", "Tengo calor" ],
          fr: [ "Je suis inconfortable", "Pouvez-vous ajuster mon oreiller ?", "Pouvez-vous monter le lit ?", "Pouvez-vous baisser le lit ?", "J'ai froid", "J'ai chaud" ],
          de: [ "Mir ist unwohl", "Können Sie mein Kissen richten?", "Können Sie das Bett hochstellen?", "Können Sie das Bett runterstellen?", "Mir ist kalt", "Mir ist heiß" ],
          pt: [ "Estou desconfortável", "Pode ajustar a minha almofada?", "Pode subir a cama?", "Pode descer a cama?", "Estou com frio", "Estou com calor" ],
          it: [ "Sono a disagio", "Puoi sistemarmi il cuscino?", "Puoi alzare il letto?", "Puoi abbassare il letto?", "Ho freddo", "Ho caldo" ],
          ja: [ "不快です", "枕を直してくれますか？", "ベッドを上げてもらえますか？", "ベッドを下げてもらえますか？", "寒いです", "暑いです" ],
          nl: [ "Ik voel me ongemakkelijk", "Kunt u mijn kussen verstellen?", "Kunt u het bed omhoog doen?", "Kunt u het bed omlaag doen?", "Ik heb het koud", "Ik heb het warm" ],
          ru: [ "Мне неудобно", "Вы можете поправить мою подушку?", "Вы можете поднять кровать?", "Вы можете опустить кровать?", "Мне холодно", "Мне жарко" ],
          zh: [ "我不舒服", "你能帮我调整一下枕头吗？", "你能把床升起来吗？", "你能把床降下来吗？", "我冷", "我热" ],
          hi: [ "मैं असहज हूँ", "क्या आप मेरा तकिया ठीक कर सकते हैं?", "क्या आप बिस्तर उठा सकते हैं?", "क्या आप बिस्तर नीचे कर सकते हैं?", "मुझे ठंड लग रही है", "मुझे गर्मी लग रही है" ],
          ar: [ "أنا غير مرتاح", "هل يمكنك تعديل وسادتي؟", "هل يمكنك رفع السرير؟", "هل يمكنك خفض السرير؟", "أنا بردان", "أنا حران" ],
          bn: [ "আমি অস্বস্তিতে আছি", "আপনি কি আমার বালিশটা ঠিক করে দিতে পারেন?", "আপনি কি বিছানাটা তুলতে পারবেন?", "আপনি কি বিছানাটা নামাতে পারবেন?", "আমার ঠান্ডা লাগছে", "আমার গরম লাগছে" ],
          ko: [ "불편해요", "베개를 고쳐 주실 수 있나요?", "침대를 올려 주시겠어요?", "침대를 내려 주시겠어요?", "추워요", "더워요" ],
          tr: [ "Rahatsızım", "Yastığımı düzeltebilir misiniz?", "Yatağı yükseltebilir misiniz?", "Yatağı alçaltabilir misiniz?", "Üşüyorum", "Sıcakladım" ],
          pl: [ "Czuję się nieswojo", "Czy możesz poprawić moją poduszkę?", "Czy możesz podnieść łóżko?", "Czy możesz opuścić łóżko?", "Jest mi zimno", "Jest mi gorąco" ],
          sv: [ "Jag är obekväm", "Kan du rätta till min kudde?", "Kan du höja sängen?", "Kan du sänka sängen?", "Jag fryser", "Jag är varm" ],
          vi: [ "Tôi không thoải mái", "Bạn có thể chỉnh lại gối cho tôi không?", "Bạn có thể nâng giường lên không?", "Bạn có thể hạ giường xuống không?", "Tôi lạnh", "Tôi nóng" ],
        }
      },
      feelings: {
        title: { en: "Feelings", es: "Sentimientos", fr: "Sentiments", de: "Gefühle", pt: "Sentimentos", it: "Sentimenti", ja: "感情", nl: "Gevoelens", ru: "Чувства", zh: "感受", hi: "भावनाएं", ar: "مشاعر", bn: "অনুভূতি", ko: "감정", tr: "Hisler", pl: "Uczucia", sv: "Känslor", vi: "Cảm xúc" },
        phrases: {
          en: [ "I'm in pain", "I'm feeling dizzy", "I'm feeling nauseous", "I'm tired", "I'm feeling better", "I'm feeling worse" ],
          es: [ "Tengo dolor", "Me siento mareado/a", "Tengo náuseas", "Estoy cansado/a", "Me siento mejor", "Me siento peor" ],
          fr: [ "J'ai mal", "J'ai des vertiges", "J'ai la nausée", "Je suis fatigué(e)", "Je me sens mieux", "Je me sens moins bien" ],
          de: [ "Ich habe Schmerzen", "Mir ist schwindelig", "Mir ist übel", "Ich bin müde", "Mir geht es besser", "Mir geht es schlechter" ],
          pt: [ "Estou com dor", "Estou tonto/a", "Estou com náuseas", "Estou cansado/a", "Sinto-me melhor", "Sinto-me pior" ],
          it: [ "Ho dolore", "Mi gira la testa", "Ho la nausea", "Sono stanco/a", "Mi sento meglio", "Mi sento peggio" ],
          ja: [ "痛いです", "めまいがします", "吐き気がします", "疲れています", "気分が良くなりました", "気分が悪化しました" ],
          nl: [ "Ik heb pijn", "Ik voel me duizelig", "Ik ben misselijk", "Ik ben moe", "Ik voel me beter", "Ik voel me slechter" ],
          ru: [ "Мне больно", "У меня кружится голова", "Меня тошнит", "Я устал/устала", "Мне лучше", "Мне хуже" ],
          zh: [ "我疼", "我头晕", "我想吐", "我累了", "我感觉好多了", "我感觉更糟了" ],
          hi: [ "मुझे दर्द हो रहा है", "मुझे चक्कर आ रहा है", "मुझे मतली आ रही है", "मैं थक गया/गई हूँ", "मुझे बेहतर महसूस हो रहा है", "मुझे और बुरा महसूस हो रहा है" ],
          ar: [ "أشعر بألم", "أشعر بالدوار", "أشعر بالغثيان", "أنا متعب", "أشعر بتحسن", "أشعر بسوء" ],
          bn: [ "আমার ব্যথা করছে", "আমার মাথা ঘুরছে", "আমার বমি বমি ভাব হচ্ছে", "আমি ক্লান্ত", "আমার ভালো লাগছে", "আমার আরও খারাপ লাগছে" ],
          ko: [ "아파요", "어지러워요", "메스꺼워요", "피곤해요", "기분이 나아졌어요", "기분이 더 나빠졌어요" ],
          tr: [ "Ağrım var", "Başım dönüyor", "Mide bulantım var", "Yorgunum", "Daha iyi hissediyorum", "Daha kötü hissediyorum" ],
          pl: [ "Boli mnie", "Kręci mi się w głowie", "Mam mdłości", "Jestem zmęczony/zmęczona", "Czuję się lepiej", "Czuję się gorzej" ],
          sv: [ "Jag har ont", "Jag är yr", "Jag mår illa", "Jag är trött", "Jag mår bättre", "Jag mår sämre" ],
          vi: [ "Tôi bị đau", "Tôi cảm thấy chóng mặt", "Tôi cảm thấy buồn nôn", "Tôi mệt", "Tôi cảm thấy tốt hơn", "Tôi cảm thấy tệ hơn" ],
        }
      },
      responses: {
        title: { en: "Responses", es: "Respuestas", fr: "Réponses", de: "Antworten", pt: "Respostas", it: "Risposte", ja: "返事", nl: "Antwoorden", ru: "Ответы", zh: "回应", hi: "जवाब", ar: "ردود", bn: "উত্তর", ko: "응답", tr: "Yanıtlar", pl: "Odpowiedzi", sv: "Svar", vi: "Phản hồi" },
        phrases: {
          en: [ "Yes", "No", "Okay", "I don't know", "Please wait" ],
          es: [ "Sí", "No", "De acuerdo", "No sé", "Por favor, espere" ],
          fr: [ "Oui", "Non", "D'accord", "Je ne sais pas", "Veuillez patienter" ],
          de: [ "Ja", "Nein", "Okay", "Ich weiß nicht", "Bitte warten Sie" ],
          pt: [ "Sim", "Não", "Ok", "Não sei", "Por favor, espere" ],
          it: [ "Sì", "No", "Ok", "Non lo so", "Per favore, aspetti" ],
          ja: [ "はい", "いいえ", "はい、わかりました", "わかりません", "少々お待ちください" ],
          nl: [ "Ja", "Nee", "Oké", "Ik weet het niet", "Wacht alstublieft" ],
          ru: [ "Да", "Нет", "Хорошо", "Я не знаю", "Пожалуйста, подождите" ],
          zh: [ "是", "不是", "好的", "我不知道", "请稍等" ],
          hi: [ "हाँ", "नहीं", "ठीक है", "मुझे नहीं पता", "कृपया प्रतीक्षा करें" ],
          ar: [ "نعم", "لا", "حسنًا", "لا أعرف", "انتظر من فضلك" ],
          bn: [ "হ্যাঁ", "না", "ঠিক আছে", "আমি জানি না", "অনুগ্রহ করে অপেক্ষা করুন" ],
          ko: [ "예", "아니요", "알겠습니다", "모르겠어요", "잠시만 기다려 주세요" ],
          tr: [ "Evet", "Hayır", "Tamam", "Bilmiyorum", "Lütfen bekleyin" ],
          pl: [ "Tak", "Nie", "Okej", "Nie wiem", "Proszę czekać" ],
          sv: [ "Ja", "Nej", "Okej", "Jag vet inte", "Vänta, snälla" ],
          vi: [ "Có", "Không", "Được rồi", "Tôi không biết", "Vui lòng đợi" ],
        }
      }
    },
    speechNotSupportedTitle: {en: "Soundboard Not Available", es: "Panel de Sonido No Disponible", fr: "Table d'Harmonie Indisponible", de: "Soundboard nicht verfügbar", pt: "Soundboard Indisponível", it: "Tavola Armonica Non Disponibile", ja: "サウンドボードは利用できません", nl: "Soundboard niet beschikbaar", ru: "Звуковая панель недоступна", zh: "音板不可用", hi: "साउंडबोर्ड उपलब्ध नहीं है", ar: "لوحة الصوت غير متوفرة", bn: "সাউন্ডবোর্ড উপলব্ধ নয়", ko: "사운드보드를 사용할 수 없습니다", tr: "Ses Tahtası Mevcut Değil", pl: "Tablica dźwiękowa niedostępna", sv: "Ljudbrädan är inte tillgänglig", vi: "Bảng âm thanh không khả dụng"},
    speechNotSupportedDescription: {en: "Text-to-speech is not supported by your browser.", es: "Su navegador no admite la conversión de texto a voz.", fr: "La synthèse vocale n'est pas prise en charge par votre navigateur.", de: "Text-zu-Sprache wird von Ihrem Browser nicht unterstützt.", pt: "A conversão de texto em fala não é suportada pelo seu navegador.", it: "La sintesi vocale non è supportata dal tuo browser.", ja: "テキスト読み上げは、お使いのブラウザではサポートされていません。", nl: "Tekst-naar-spraak wordt niet ondersteund door uw browser.", ru: "Преобразование текста в речь не поддерживается вашим браузером.", zh: "您的浏览器不支持文本转语音功能。", hi: "टेक्स्ट-टू-स्पीच आपके ब्राउज़र द्वारा समर्थित नहीं है।", ar: "تحويل النص إلى كلام غير مدعوم من قبل متصفحك.", bn: "আপনার ব্রাউজার টেক্সট-টু-স্পিচ সমর্থন করে না।", ko: "사용 중인 브라우저에서 텍스트 음성 변환을 지원하지 않습니다.", tr: "Metin okuma tarayıcınız tarafından desteklenmiyor.", pl: "Synteza mowy nie jest obsługiwana przez Twoją przeglądarkę.", sv: "Text-till-tal stöds inte av din webbläsare.", vi: "Chuyển văn bản thành giọng nói không được trình duyệt của bạn hỗ trợ."},
    speechErrorToastTitle: {en: "Speech Error", es: "Error de Voz", fr: "Erreur Vocale", de: "Sprachfehler", pt: "Erro de Fala", it: "Errore Vocale", ja: "音声エラー", nl: "Spraakfout", ru: "Ошибка синтеза речи", zh: "语音错误", hi: "भाषण त्रुटि", ar: "خطأ في الكلام", bn: "কথোপকথন ত্রুটি", ko: "음성 오류", tr: "Konuşma Hatası", pl: "Błąd mowy", sv: "Tal-fel", vi: "Lỗi giọng nói"},
    speechErrorToastDescription: {en: "Could not speak the phrase.", es: "No se pudo decir la frase.", fr: "Impossible de prononcer la phrase.", de: "Der Satz konnte nicht ausgesprochen werden.", pt: "Não foi possível falar a frase.", it: "Impossibile pronunciare la frase.", ja: "フレーズを話せませんでした。", nl: "Kon de zin niet uitspreken.", ru: "Не удалось произнести фразу.", zh: "无法说出该短语。", hi: "वाक्यांश नहीं बोल सका।", ar: "تعذر نطق العبارة.", bn: "শব্দগুচ্ছ বলা যায়নি।", ko: "문구를 말할 수 없습니다.", tr: "İfade söylenemedi.", pl: "Nie można było wypowiedzieć frazy.", sv: "Kunde inte uttala frasen.", vi: "Không thể nói cụm từ."},
    speechErrorToastDescriptionInitiate: {en: "Could not initiate text-to-speech. Please ensure browser permissions are allowed.", es: "No se pudo iniciar la conversión de texto a voz. Asegúrese de que los permisos del navegador estén permitidos.", fr: "Impossible d'initier la synthèse vocale. Veuillez vérifier que les autorisations du navigateur sont accordées.", de: "Text-zu-Sprache konnte nicht initiiert werden. Bitte stellen Sie sicher, dass die Browser-Berechtigungen erteilt sind.", pt: "Não foi possível iniciar a conversão de texto em fala. Por favor, garanta que as permissões do navegador estão ativadas.", it: "Impossibile avviare la sintesi vocale. Assicurati che le autorizzazioni del browser siano consentite.", ja: "テキスト読み上げを開始できませんでした。ブラウザの権限が許可されていることを確認してください。", nl: "Kan tekst-naar-spraak niet starten. Zorg ervoor dat de browsertoestemmingen zijn toegestaan.", ru: "Не удалось запустить синтез речи. Убедитесь, что разрешения браузера предоставлены.", zh: "无法启动文本转语音。请确保浏览器权限已允许。", hi: "टेक्स्ट-टू-स्पीच शुरू नहीं किया जा सका। कृपया सुनिश्चित करें कि ब्राउज़र अनुमतियाँ दी गई हैं।", ar: "تعذر بدء تحويل النص إلى كلام. يرجى التأكد من السماح بأذونات المتصفح.", bn: "টেক্সট-টু-স্পিচ শুরু করা যায়নি। অনুগ্রহ করে ব্রাউজারের অনুমতি দেওয়া আছে কিনা তা নিশ্চিত করুন।", ko: "텍스트 음성 변환을 시작할 수 없습니다. 브라우저 권한이 허용되었는지 확인하십시오.", tr: "Metin okuma başlatılamadı. Lütfen tarayıcı izinlerinin verildiğinden emin olun.", pl: "Nie można zainicjować syntezy mowy. Upewnij się, że uprawnienia przeglądarki są dozwolone.", sv: "Kunde inte initiera text-till-tal. Se till att webbläsarens behörigheter är tillåtna.", vi: "Không thể khởi tạo chuyển văn bản thành giọng nói. Vui lòng đảm bảo đã cho phép quyền của trình duyệt."}
  },
  callRequestOptions: [
    { type: 'Water', label: { en: "Water", es: "Agua", fr: "Eau", de: "Wasser", pt: "Água", it: "Acqua", ja: "水", nl: "Water", ru: "Вода", zh: "水", hi: "पानी", ar: "ماء", bn: "জল", ko: "물", tr: "Su", pl: "Woda", sv: "Vatten", vi: "Nước" } },
    { type: 'Restroom', label: { en: "Restroom", es: "Baño", fr: "Toilettes", de: "Toilette", pt: "Casa de Banho", it: "Bagno", ja: "トイレ", nl: "Toilet", ru: "Туалет", zh: "洗手间", hi: "शौचालय", ar: "حمام", bn: "শৌচাগার", ko: "화장실", tr: "Tuvalet", pl: "Toaleta", sv: "Toalett", vi: "Nhà vệ sinh" } },
    { type: 'Reposition', label: { en: "Reposition", es: "Cambio de Posición", fr: "Changer de Position", de: "Umlagern", pt: "Reposicionar", it: "Cambio Posizione", ja: "体位交換", nl: "Verplaatsen", ru: "Сменить положение", zh: "调整位置", hi: "स्थिति बदलें", ar: "تغيير الوضعية", bn: "অবস্থান পরিবর্তন", ko: "자세 변경", tr: "Pozisyon Değiştir", pl: "Zmiana pozycji", sv: "Ändra position", vi: "Thay đổi tư thế" } },
    { type: 'Pain', label: { en: "Pain", es: "Dolor", fr: "Douleur", de: "Schmerzen", pt: "Dor", it: "Dolore", ja: "痛み", nl: "Pijn", ru: "Боль", zh: "疼痛", hi: "दर्द", ar: "ألم", bn: "ব্যথা", ko: "통증", tr: "Ağrı", pl: "Ból", sv: "Smärta", vi: "Đau" } },
    { type: 'General', label: { en: "General Help", es: "Ayuda General", fr: "Aide Générale", de: "Allgemeine Hilfe", pt: "Ajuda Geral", it: "Aiuto Generale", ja: "一般的な助け", nl: "Algemene Hulp", ru: "Общая помощь", zh: "一般帮助", hi: "सामान्य सहायता", ar: "مساعدة عامة", bn: "সাধারণ সাহায্য", ko: "일반 도움", tr: "Genel Yardım", pl: "Pomoc ogólna", sv: "Allmän hjälp", vi: "Trợ giúp chung" } },
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
    nl: 'nl-NL',
    ru: 'ru-RU',
    zh: 'zh-CN',
    hi: 'hi-IN',
    ar: 'ar-SA',
    bn: 'bn-BD',
    ko: 'ko-KR',
    tr: 'tr-TR',
    pl: 'pl-PL',
    sv: 'sv-SE',
    vi: 'vi-VN'
};
