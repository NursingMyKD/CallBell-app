#!/usr/bin/env python3

# Script to generate comprehensive SoundboardCategories.plist

plist_header = '''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<array>'''

plist_footer = '''
</array>
</plist>'''

# Language codes and their display names
languages = {
    'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German', 'pt': 'Portuguese', 
    'it': 'Italian', 'ja': 'Japanese', 'nl': 'Dutch', 'ru': 'Russian', 'zh': 'Chinese',
    'hi': 'Hindi', 'ar': 'Arabic', 'bn': 'Bengali', 'ko': 'Korean', 'tr': 'Turkish',
    'pl': 'Polish', 'sv': 'Swedish', 'vi': 'Vietnamese', 'id': 'Indonesian', 'ur': 'Urdu',
    'tl': 'Filipino', 'th': 'Thai', 'el': 'Greek', 'cs': 'Czech', 'hu': 'Hungarian',
    'ro': 'Romanian', 'da': 'Danish', 'fi': 'Finnish'
}

# Category display names in all languages
category_names = {
    'greetings': {
        'en': 'Greetings', 'es': 'Saludos', 'fr': 'Salutations', 'de': 'Grüße', 'pt': 'Saudações',
        'it': 'Saluti', 'ja': '挨拶', 'nl': 'Begroetingen', 'ru': 'Приветствия', 'zh': '问候',
        'hi': 'अभिवादन', 'ar': 'التحيات', 'bn': 'শুভেচ্ছা', 'ko': '인사', 'tr': 'Selamlar',
        'pl': 'Pozdrowienia', 'sv': 'Hälsningar', 'vi': 'Lời chào', 'id': 'Salam', 'ur': 'سلام',
        'tl': 'Pagbati', 'th': 'การทักทาย', 'el': 'Χαιρετισμοί', 'cs': 'Pozdravy', 'hu': 'Üdvözlések',
        'ro': 'Salutări', 'da': 'Hilsner', 'fi': 'Tervehdykset'
    },
    'needs': {
        'en': 'Needs', 'es': 'Necesidades', 'fr': 'Besoins', 'de': 'Bedürfnisse', 'pt': 'Necessidades',
        'it': 'Bisogni', 'ja': '必要', 'nl': 'Behoeften', 'ru': 'Потребности', 'zh': '需要',
        'hi': 'आवश्यकताएं', 'ar': 'الاحتياجات', 'bn': 'প্রয়োজন', 'ko': '필요', 'tr': 'İhtiyaçlar',
        'pl': 'Potrzeby', 'sv': 'Behov', 'vi': 'Nhu cầu', 'id': 'Kebutuhan', 'ur': 'ضروریات',
        'tl': 'Pangangailangan', 'th': 'ความต้องการ', 'el': 'Ανάγκες', 'cs': 'Potřeby', 'hu': 'Szükségletek',
        'ro': 'Nevoi', 'da': 'Behov', 'fi': 'Tarpeet'
    },
    'comfort': {
        'en': 'Comfort', 'es': 'Comodidad', 'fr': 'Confort', 'de': 'Komfort', 'pt': 'Conforto',
        'it': 'Comfort', 'ja': '快適', 'nl': 'Comfort', 'ru': 'Комфорт', 'zh': '舒适',
        'hi': 'आराम', 'ar': 'الراحة', 'bn': 'আরাম', 'ko': '편안함', 'tr': 'Konfor',
        'pl': 'Komfort', 'sv': 'Komfort', 'vi': 'Thoải mái', 'id': 'Kenyamanan', 'ur': 'آرام',
        'tl': 'Ginhawa', 'th': 'ความสะดวกสบาย', 'el': 'Άνεση', 'cs': 'Pohodlí', 'hu': 'Kényelem',
        'ro': 'Confort', 'da': 'Komfort', 'fi': 'Mukavuus'
    },
    'feelings': {
        'en': 'Feelings', 'es': 'Sentimientos', 'fr': 'Sentiments', 'de': 'Gefühle', 'pt': 'Sentimentos',
        'it': 'Sentimenti', 'ja': '感情', 'nl': 'Gevoelens', 'ru': 'Чувства', 'zh': '感受',
        'hi': 'भावनाएं', 'ar': 'المشاعر', 'bn': 'অনুভূতি', 'ko': '감정', 'tr': 'Duygular',
        'pl': 'Uczucia', 'sv': 'Känslor', 'vi': 'Cảm xúc', 'id': 'Perasaan', 'ur': 'احساسات',
        'tl': 'Damdamin', 'th': 'ความรู้สึก', 'el': 'Συναισθήματα', 'cs': 'Pocity', 'hu': 'Érzések',
        'ro': 'Sentimente', 'da': 'Følelser', 'fi': 'Tunteet'
    },
    'responses': {
        'en': 'Responses', 'es': 'Respuestas', 'fr': 'Réponses', 'de': 'Antworten', 'pt': 'Respostas',
        'it': 'Risposte', 'ja': '返答', 'nl': 'Antwoorden', 'ru': 'Ответы', 'zh': '回应',
        'hi': 'उत्तर', 'ar': 'الردود', 'bn': 'প্রতিক্রিয়া', 'ko': '응답', 'tr': 'Cevaplar',
        'pl': 'Odpowiedzi', 'sv': 'Svar', 'vi': 'Phản hồi', 'id': 'Tanggapan', 'ur': 'جوابات',
        'tl': 'Mga tugon', 'th': 'การตอบสนอง', 'el': 'Απαντήσεις', 'cs': 'Odpovědi', 'hu': 'Válaszok',
        'ro': 'Răspunsuri', 'da': 'Svar', 'fi': 'Vastaukset'
    }
}

def generate_category_dict(category_id, category_names, phrases_dict):
    """Generate a category dictionary with all language support"""
    result = f'''
    <dict>
        <key>id</key><string>{category_id}</string>
        <key>displayNames</key>
        <dict>'''
    
    # Add all language display names
    for lang_code, name in category_names.items():
        result += f'''
            <key>{lang_code}</key><string>{name}</string>'''
    
    result += '''
        </dict>
        <key>phrases</key>
        <dict>'''
    
    # Add phrases for each language
    for lang_code, phrases in phrases_dict.items():
        result += f'''
            <key>{lang_code}</key><array>'''
        for phrase in phrases:
            result += f'''
                <string>{phrase}</string>'''
        result += '''
            </array>'''
    
    result += '''
        </dict>
    </dict>'''
    
    return result

# Define all phrases for each category in all languages
def get_phrases_for_category(category_id):
    """Get all phrases for a given category in all languages"""
    
    if category_id == 'greetings':
        return {
            'en': ['Hello', 'Goodbye', 'My name is...', 'You\'re welcome'],
            'es': ['Hola', 'Adiós', 'Mi nombre es...', 'De nada'],
            'fr': ['Bonjour', 'Au revoir', 'Je m\'appelle...', 'De rien'],
            'de': ['Hallo', 'Auf Wiedersehen', 'Mein Name ist...', 'Gern geschehen'],
            'pt': ['Olá', 'Tchau', 'Meu nome é...', 'De nada'],
            'it': ['Ciao', 'Arrivederci', 'Il mio nome è...', 'Prego'],
            'ja': ['こんにちは', 'さようなら', '私の名前は...', 'どういたしまして'],
            'nl': ['Hallo', 'Tot ziens', 'Mijn naam is...', 'Graag gedaan'],
            'ru': ['Привет', 'До свидания', 'Меня зовут...', 'Пожалуйста'],
            'zh': ['你好', '再见', '我的名字是...', '不客气'],
            'hi': ['नमस्ते', 'अलविदा', 'मेरा नाम है...', 'स्वागत है'],
            'ar': ['مرحبا', 'وداعا', 'اسمي...', 'على الرحب والسعة'],
            'bn': ['হ্যালো', 'বিদায়', 'আমার নাম...', 'স্বাগতম'],
            'ko': ['안녕하세요', '안녕히 가세요', '제 이름은...', '천만에요'],
            'tr': ['Merhaba', 'Hoşçakal', 'Benim adım...', 'Rica ederim'],
            'pl': ['Cześć', 'Do widzenia', 'Nazywam się...', 'Nie ma za co'],
            'sv': ['Hej', 'Hej då', 'Mitt namn är...', 'Varsågod'],
            'vi': ['Xin chào', 'Tạm biệt', 'Tên tôi là...', 'Không có gì'],
            'id': ['Halo', 'Selamat tinggal', 'Nama saya...', 'Sama-sama'],
            'ur': ['سلام', 'خدا حافظ', 'میرا نام...', 'خوش آمدید'],
            'tl': ['Kumusta', 'Paalam', 'Ang pangalan ko ay...', 'Walang anuman'],
            'th': ['สวัสดี', 'ลาก่อน', 'ชื่อของฉันคือ...', 'ไม่เป็นไร'],
            'el': ['Γεια σας', 'Αντίο', 'Το όνομά μου είναι...', 'Παρακαλώ'],
            'cs': ['Ahoj', 'Na shledanou', 'Jmenuji se...', 'Prosím'],
            'hu': ['Szia', 'Viszlát', 'A nevem...', 'Szívesen'],
            'ro': ['Salut', 'La revedere', 'Numele meu este...', 'Cu plăcere'],
            'da': ['Hej', 'Farvel', 'Mit navn er...', 'Så lidt'],
            'fi': ['Moi', 'Näkemiin', 'Nimeni on...', 'Ei kestä']
        }
    elif category_id == 'needs':
        return {
            'en': ['I need water', 'I need food', 'I need help', 'I need to go to the bathroom'],
            'es': ['Necesito agua', 'Necesito comida', 'Necesito ayuda', 'Necesito ir al baño'],
            'fr': ['J\'ai besoin d\'eau', 'J\'ai besoin de nourriture', 'J\'ai besoin d\'aide', 'J\'ai besoin d\'aller aux toilettes'],
            'de': ['Ich brauche Wasser', 'Ich brauche Essen', 'Ich brauche Hilfe', 'Ich muss auf die Toilette'],
            'pt': ['Preciso de água', 'Preciso de comida', 'Preciso de ajuda', 'Preciso ir ao banheiro'],
            'it': ['Ho bisogno di acqua', 'Ho bisogno di cibo', 'Ho bisogno di aiuto', 'Ho bisogno di andare in bagno'],
            'ja': ['水が必要です', '食べ物が必要です', '助けが必要です', 'トイレに行く必要があります'],
            'nl': ['Ik heb water nodig', 'Ik heb eten nodig', 'Ik heb hulp nodig', 'Ik moet naar de wc'],
            'ru': ['Мне нужна вода', 'Мне нужна еда', 'Мне нужна помощь', 'Мне нужно в туалет'],
            'zh': ['我需要水', '我需要食物', '我需要帮助', '我需要去洗手间'],
            'hi': ['मुझे पानी चाहिए', 'मुझे खाना चाहिए', 'मुझे मदद चाहिए', 'मुझे बाथरूम जाना है'],
            'ar': ['أحتاج إلى الماء', 'أحتاج إلى الطعام', 'أحتاج إلى المساعدة', 'أحتاج إلى الذهاب إلى الحمام'],
            'bn': ['আমার পানি দরকার', 'আমার খাবার দরকার', 'আমার সাহায্য দরকার', 'আমার বাথরুমে যেতে হবে'],
            'ko': ['물이 필요해요', '음식이 필요해요', '도움이 필요해요', '화장실에 가야 해요'],
            'tr': ['Suya ihtiyacım var', 'Yiyeceğe ihtiyacım var', 'Yardıma ihtiyacım var', 'Tuvalete gitmem gerekiyor'],
            'pl': ['Potrzebuję wody', 'Potrzebuję jedzenia', 'Potrzebuję pomocy', 'Muszę iść do łazienki'],
            'sv': ['Jag behöver vatten', 'Jag behöver mat', 'Jag behöver hjälp', 'Jag behöver gå på toaletten'],
            'vi': ['Tôi cần nước', 'Tôi cần thức ăn', 'Tôi cần giúp đỡ', 'Tôi cần đi vệ sinh'],
            'id': ['Saya butuh air', 'Saya butuh makanan', 'Saya butuh bantuan', 'Saya perlu ke kamar mandi'],
            'ur': ['مجھے پانی چاہیے', 'مجھے کھانا چاہیے', 'مجھے مدد چاہیے', 'مجھے باتھ روم جانا ہے'],
            'tl': ['Kailangan ko ng tubig', 'Kailangan ko ng pagkain', 'Kailangan ko ng tulong', 'Kailangan kong pumunta sa banyo'],
            'th': ['ฉันต้องการน้ำ', 'ฉันต้องการอาหาร', 'ฉันต้องการความช่วยเหลือ', 'ฉันต้องไปห้องน้ำ'],
            'el': ['Χρειάζομαι νερό', 'Χρειάζομαι φαγητό', 'Χρειάζομαι βοήθεια', 'Χρειάζομαι να πάω στο μπάνιο'],
            'cs': ['Potřebuji vodu', 'Potřebuji jídlo', 'Potřebuji pomoc', 'Potřebuji jít na toaletu'],
            'hu': ['Vízre van szükségem', 'Ételre van szükségem', 'Segítségre van szükségem', 'Mosdóba kell mennem'],
            'ro': ['Am nevoie de apă', 'Am nevoie de mâncare', 'Am nevoie de ajutor', 'Trebuie să merg la baie'],
            'da': ['Jeg har brug for vand', 'Jeg har brug for mad', 'Jeg har brug for hjælp', 'Jeg skal på toilettet'],
            'fi': ['Tarvitsen vettä', 'Tarvitsen ruokaa', 'Tarvitsen apua', 'Minun täytyy mennä wc:hen']
        }
    elif category_id == 'comfort':
        return {
            'en': ['I\'m cold', 'I\'m hot', 'I\'m tired'],
            'es': ['Tengo frío', 'Tengo calor', 'Estoy cansado'],
            'fr': ['J\'ai froid', 'J\'ai chaud', 'Je suis fatigué'],
            'de': ['Mir ist kalt', 'Mir ist heiß', 'Ich bin müde'],
            'pt': ['Estou com frio', 'Estou com calor', 'Estou cansado'],
            'it': ['Ho freddo', 'Ho caldo', 'Sono stanco'],
            'ja': ['寒いです', '暑いです', '疲れています'],
            'nl': ['Ik heb het koud', 'Ik heb het warm', 'Ik ben moe'],
            'ru': ['Мне холодно', 'Мне жарко', 'Я устал'],
            'zh': ['我冷', '我热', '我累了'],
            'hi': ['मुझे ठंड लग रही है', 'मुझे गर्मी लग रही है', 'मैं थक गया हूँ'],
            'ar': ['أنا بارد', 'أنا حار', 'أنا متعب'],
            'bn': ['আমার ঠান্ডা লাগছে', 'আমার গরম লাগছে', 'আমি ক্লান্ত'],
            'ko': ['추워요', '더워요', '피곤해요'],
            'tr': ['Üşüyorum', 'Sıcak', 'Yorgunum'],
            'pl': ['Jest mi zimno', 'Jest mi gorąco', 'Jestem zmęczony'],
            'sv': ['Jag fryser', 'Jag är varm', 'Jag är trött'],
            'vi': ['Tôi lạnh', 'Tôi nóng', 'Tôi mệt'],
            'id': ['Saya kedinginan', 'Saya kepanasan', 'Saya lelah'],
            'ur': ['مجھے سردی لگ رہی ہے', 'مجھے گرمی لگ رہی ہے', 'میں تھک گیا ہوں'],
            'tl': ['Ginaw ako', 'Mainit ako', 'Pagod ako'],
            'th': ['ฉันหนาว', 'ฉันร้อน', 'ฉันเหนื่อย'],
            'el': ['Κρυώνω', 'Ζεσταίνομαι', 'Είμαι κουρασμένος'],
            'cs': ['Je mi zima', 'Je mi horko', 'Jsem unavený'],
            'hu': ['Fázom', 'Melegem van', 'Fáradt vagyok'],
            'ro': ['Îmi este frig', 'Îmi este cald', 'Sunt obosit'],
            'da': ['Jeg fryser', 'Jeg er varm', 'Jeg er træt'],
            'fi': ['Minulla on kylmä', 'Minulla on kuuma', 'Olen väsynyt']
        }
    elif category_id == 'feelings':
        return {
            'en': ['I\'m happy', 'I\'m sad', 'I\'m angry', 'I\'m scared'],
            'es': ['Estoy feliz', 'Estoy triste', 'Estoy enojado', 'Tengo miedo'],
            'fr': ['Je suis heureux', 'Je suis triste', 'Je suis en colère', 'J\'ai peur'],
            'de': ['Ich bin glücklich', 'Ich bin traurig', 'Ich bin wütend', 'Ich habe Angst'],
            'pt': ['Estou feliz', 'Estou triste', 'Estou bravo', 'Tenho medo'],
            'it': ['Sono felice', 'Sono triste', 'Sono arrabbiato', 'Ho paura'],
            'ja': ['幸せです', '悲しいです', '怒っています', '怖いです'],
            'nl': ['Ik ben blij', 'Ik ben verdrietig', 'Ik ben boos', 'Ik ben bang'],
            'ru': ['Я счастлив', 'Мне грустно', 'Я сержусь', 'Мне страшно'],
            'zh': ['我很开心', '我很难过', '我很生气', '我很害怕'],
            'hi': ['मैं खुश हूँ', 'मैं दुखी हूँ', 'मैं गुस्से में हूँ', 'मैं डर गया हूँ'],
            'ar': ['أنا سعيد', 'أنا حزين', 'أنا غاضب', 'أنا خائف'],
            'bn': ['আমি খুশি', 'আমি দুঃখিত', 'আমি রাগান্বিত', 'আমি ভয় পেয়েছি'],
            'ko': ['행복해요', '슬퍼요', '화나요', '무서워요'],
            'tr': ['Mutluyum', 'Üzgünüm', 'Kızgınım', 'Korkuyorum'],
            'pl': ['Jestem szczęśliwy', 'Jestem smutny', 'Jestem zły', 'Boję się'],
            'sv': ['Jag är glad', 'Jag är ledsen', 'Jag är arg', 'Jag är rädd'],
            'vi': ['Tôi vui', 'Tôi buồn', 'Tôi giận', 'Tôi sợ'],
            'id': ['Saya senang', 'Saya sedih', 'Saya marah', 'Saya takut'],
            'ur': ['میں خوش ہوں', 'میں اداس ہوں', 'میں غصے میں ہوں', 'میں ڈر گیا ہوں'],
            'tl': ['Masaya ako', 'Malungkot ako', 'Galit ako', 'Takot ako'],
            'th': ['ฉันมีความสุข', 'ฉันเศร้า', 'ฉันโกรธ', 'ฉันกลัว'],
            'el': ['Είμαι χαρούμενος', 'Είμαι λυπημένος', 'Είμαι θυμωμένος', 'Φοβάμαι'],
            'cs': ['Jsem šťastný', 'Jsem smutný', 'Jsem rozzlobený', 'Bojím se'],
            'hu': ['Boldog vagyok', 'Szomorú vagyok', 'Mérges vagyok', 'Félek'],
            'ro': ['Sunt fericit', 'Sunt trist', 'Sunt supărat', 'Mi-e frică'],
            'da': ['Jeg er glad', 'Jeg er ked af det', 'Jeg er sur', 'Jeg er bange'],
            'fi': ['Olen iloinen', 'Olen surullinen', 'Olen vihainen', 'Pelkään']
        }
    elif category_id == 'responses':
        return {
            'en': ['Yes', 'No', 'Maybe'],
            'es': ['Sí', 'No', 'Quizás'],
            'fr': ['Oui', 'Non', 'Peut-être'],
            'de': ['Ja', 'Nein', 'Vielleicht'],
            'pt': ['Sim', 'Não', 'Talvez'],
            'it': ['Sì', 'No', 'Forse'],
            'ja': ['はい', 'いいえ', 'たぶん'],
            'nl': ['Ja', 'Nee', 'Misschien'],
            'ru': ['Да', 'Нет', 'Может быть'],
            'zh': ['是', '不', '也许'],
            'hi': ['हाँ', 'नहीं', 'शायद'],
            'ar': ['نعم', 'لا', 'ربما'],
            'bn': ['হ্যাঁ', 'না', 'সম্ভবত'],
            'ko': ['예', '아니요', '아마도'],
            'tr': ['Evet', 'Hayır', 'Belki'],
            'pl': ['Tak', 'Nie', 'Może'],
            'sv': ['Ja', 'Nej', 'Kanske'],
            'vi': ['Có', 'Không', 'Có lẽ'],
            'id': ['Ya', 'Tidak', 'Mungkin'],
            'ur': ['ہاں', 'نہیں', 'شاید'],
            'tl': ['Oo', 'Hindi', 'Siguro'],
            'th': ['ใช่', 'ไม่', 'อาจจะ'],
            'el': ['Ναι', 'Όχι', 'Ίσως'],
            'cs': ['Ano', 'Ne', 'Možná'],
            'hu': ['Igen', 'Nem', 'Talán'],
            'ro': ['Da', 'Nu', 'Poate'],
            'da': ['Ja', 'Nej', 'Måske'],
            'fi': ['Kyllä', 'Ei', 'Ehkä']
        }
    
    return {}

def main():
    """Generate the complete SoundboardCategories.plist file"""
    
    # Start with the header
    plist_content = plist_header
    
    # Generate each category
    categories = ['greetings', 'needs', 'comfort', 'feelings', 'responses']
    
    for category_id in categories:
        category_display_names = category_names[category_id]
        phrases = get_phrases_for_category(category_id)
        
        plist_content += generate_category_dict(category_id, category_display_names, phrases)
    
    # Add the footer
    plist_content += plist_footer
    
    # Write to file
    output_file = '/Users/shanestone/Documents/CallBell-app/iControlBell/iControlbell/Resources/SoundboardCategories.plist'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(plist_content)
    
    print(f"Successfully generated SoundboardCategories.plist with {len(categories)} categories and {len(languages)} languages")

if __name__ == "__main__":
    main()
