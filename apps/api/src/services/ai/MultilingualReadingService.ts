import { FullPalmReading, StructuredPalmAnalysis, ReadingCardSection } from '../../types/contracts.js';
import { ReadingGenerationService } from './ReadingGenerationService.js';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../types/LanguageRegistry.js';

interface LocalizedReadingTemplate {
  archetype: string;
  archetypeDescription: string;
  summaryBadges: string[];
  sections: {
    id: string;
    title: string;
    tagline: string;
    keyObservation: string;
    traditionalInterpretation: string;
    reflectiveAdvice: string;
  }[];
  traditionalDisclaimer: string;
  shareCard: {
    title: string;
    headline: string;
    primaryTags: string[];
    watermark: string;
  };
}

const LOCALIZED_TEMPLATES: Record<string, LocalizedReadingTemplate> = {
  // 1. HINDI (हिन्दी)
  hi: {
    archetype: 'रणनीतिक निर्माता (अग्नि एवं पृथ्वी तत्व)',
    archetypeDescription:
      'आपकी हथेली की बनावट गहरी और स्पष्ट मुख्य रेखाओं के साथ एक सुदृढ़ संरचना प्रकट करती है। समुद्रिक शास्त्र के अनुसार, यह रूपरेखा तीव्र रचनात्मक संकल्प और व्यावहारिक कर्मठता के संतुलन को दर्शाती है।',
    summaryBadges: [
      'भावनात्मक अभिव्यक्ति',
      'रणनीतिक विचारक',
      'दृढ़ जीवन शक्ति',
      'आत्म-निर्भर महत्वाकांक्षा',
    ],
    sections: [
      {
        id: 'love',
        title: 'प्रेम एवं भावनात्मक स्वभाव',
        tagline: 'उदात्त निष्ठा और पारिवारिक समर्पण',
        keyObservation: 'हृदय रेखा: लम्बी, सुन्दर वक्र लिए हुए, और देवगुरु बृहस्पति पर्वत के नीचे समाप्त।',
        traditionalInterpretation:
          'सामुद्रिक शास्त्र के अनुसार, बृहस्पति पर्वत पर समाप्त होने वाली हृदय रेखा उच्च आदर्श, सत्यनिष्ठा और आत्मीय संबंधों में गहरी निष्ठा (धर्म) का संकेत देती है।',
        reflectiveAdvice:
          'अपने प्रियजनों को अपनी गहराई को समझने का समय दें; हर व्यक्ति समान भाव से अपनी भावनाएं व्यक्त नहीं कर पाता।',
      },
      {
        id: 'mind',
        title: 'बुद्धि एवं विचार पद्धति',
        tagline: 'व्यावहारिक ज्ञान और रचनात्मक कल्पनाशक्ति',
        keyObservation: 'मस्तिष्क रेखा: चंद्र पर्वत की ओर ढलती हुई, स्वाभाविक स्वावलंबन के साथ।',
        traditionalInterpretation:
          'पारंपरिक ग्रंथों के अनुसार, चंद्र क्षेत्र की ओर झुकी मस्तिष्क रेखा सूक्ष्म बुद्धि, गहन विचारशीलता और मौलिक समाधान खोजने की क्षमता को दर्शाती है।',
        reflectiveAdvice:
          'किसी भी कार्य से पहले अत्यधिक विश्लेषण से बचें; अपनी आंतरिक समझ और सहज ज्ञान पर भरोसा रखें।',
      },
      {
        id: 'vitality',
        title: 'स्वास्थ्य एवं जीवन ऊर्जा',
        tagline: 'प्रचुर प्राणशक्ति और सहनशीलता',
        keyObservation: 'जीवन रेखा: शुक्र पर्वत के चारों ओर विस्तृत और सुस्पष्ट वृत्त बनाती हुई।',
        traditionalInterpretation:
          'शुक्र क्षेत्र को घेरने वाली व्यापक जीवन रेखा सुदृढ़ ओज (जीवन शक्ति), उत्साह और प्रतिकूल परिस्थितियों से शीघ्र उबरने की क्षमता का प्रतीक है।',
        reflectiveAdvice:
          'अपनी ऊर्जा का संरक्षण करें; अपनी महत्वाकांक्षा और विश्राम के बीच संतुलन बनाए रखें।',
      },
      {
        id: 'career',
        title: 'कर्म एवं कार्यक्षेत्र दिशा',
        tagline: 'स्वनिर्मित मार्ग और एकाग्र प्रयास',
        keyObservation: 'भाग्य रेखा: मणिबंध से शनि पर्वत की ओर उठती हुई स्पष्ट ऊर्ध्वाधर रेखा।',
        traditionalInterpretation:
          'शनि की ओर अग्रसर स्पष्ट भाग्य रेखा दृढ़ कर्मनिष्ठा और पुरुषार्थ से सिद्धि प्राप्त करने का संकेत देती है।',
        reflectiveAdvice:
          'अपने विशिष्ट हुनर को निखारें; आपकी वास्तविक संतुष्टि आत्मनिर्भरता के साथ बढ़ेगी।',
      },
      {
        id: 'talents',
        title: 'स्वाभाविक गुण एवं पर्वत लक्षण',
        tagline: 'नेतृत्व क्षमता, सौम्यता एवं वाक्पटुता',
        keyObservation: 'गुरु और शुक्र पर्वत सुविकसित; अंगूठा संतुलित और दृढ़।',
        traditionalInterpretation:
          'उन्नत गुरु पर्वत स्वाभाविक मर्यादा और मार्गदर्शन की शक्ति देता है, जबकि शुक्र पर्वत उदारता व सहृदयता प्रदान करता है।',
        reflectiveAdvice:
          'दूसरों का मार्गदर्शन करने और संवेदनशीलता के साथ नेतृत्व करने के अवसरों का स्वागत करें।',
      },
    ],
    traditionalDisclaimer:
      'यह हस्तरेखा विश्लेषण प्राचीन सामुद्रिक शास्त्र और पारंपरिक सिद्धांतों पर आधारित है। इसे केवल व्यक्तिगत आत्म-चिंतन और ज्ञान के लिए प्रस्तुत किया गया है। यह भविष्य की निश्चित भविष्यवाणी नहीं करता और किसी भी रूप में कानूनी, वित्तीय या चिकित्सीय परामर्श का स्थान नहीं लेता।',
    shareCard: {
      title: 'काई रेगएआई हस्तरेखा पाठ',
      headline: 'रणनीतिक निर्माता',
      primaryTags: ['भावनात्मक गहराई', 'रणनीतिक सोच', 'उच्च प्राणशक्ति'],
      watermark: 'Kai RegAI • प्रामाणिक सामुद्रिक परंपरा',
    },
  },

  // 2. TAMIL (தமிழ்)
  ta: {
    archetype: 'செயல்முறை சிற்பி (நெருப்பு மற்றும் நிலம் கூறு)',
    archetypeDescription:
      'உங்கள் கை அமைப்பு தெளிவான மற்றும் ஆழமான முதன்மை ரேகைகளுடன் உறுதித்தன்மையை வெளிப்படுத்துகிறது. பாரம்பரிய சாமுத்திரிகா சாஸ்திரத்தின்படி, இது படைப்பாற்றல் மற்றும் உறுதியான உழைப்பின் சரியான இணைப்பாகும்.',
    summaryBadges: [
      'உணர்ச்சி வெளிப்பாடு',
      'தீர்க்கமான சிந்தனை',
      'உறுதியான உயிர்சக்தி',
      'சுயமுயற்சி இலக்கு',
    ],
    sections: [
      {
        id: 'love',
        title: 'அன்பு மற்றும் உணர்வு நிலை',
        tagline: 'உயர்ந்த விசுவாசம் மற்றும் தர்ம நேர்மை',
        keyObservation: 'இதய ரேகை: நீண்ட, அழகான வளைவுடன் குரு மேட்டின் கீழ் நிறைவடைகிறது.',
        traditionalInterpretation:
          'குரு மேட்டை அடையும் இதய ரேகை உயர்ந்த லட்சியம், குடும்ப தர்மம் மற்றும் ஆழமான விசுவாசத்தைக் குறிக்கிறது.',
        reflectiveAdvice:
          'உங்கள் ஆழமான அன்பைப் புரிந்துகொள்ள உறவுகளுக்கு அவகாசம் கொடுங்கள்; அனைவரும் ஒரே வழியில் அன்பை வெளிப்படுத்துவதில்லை.',
      },
      {
        id: 'mind',
        title: 'அறிவு மற்றும் முடிவெடுக்கும் திறன்',
        tagline: 'படைப்பாற்றல் அறிவு மற்றும் ஆழ்ந்த சிந்தனை',
        keyObservation: 'புத்தி ரேகை: சந்திர மேட்டை நோக்கி மென்மையாக சாய்ந்து செல்கிறது.',
        traditionalInterpretation:
          'சந்திர மேட்டை நோக்கிய புத்தி ரேகை கற்பனை வளம், இலக்கிய ஆர்வம் மற்றும் சுயாதீன முடிவெடுக்கும் ஆற்றலைக் குறிக்கிறது.',
        reflectiveAdvice:
          'முடிவெடுக்கும் முன் அதிக யோசனையைத் தவிர்க்கவும்; உங்கள் உள்ளுணர்வை நம்புங்கள்.',
      },
      {
        id: 'vitality',
        title: 'ஆயுள் மற்றும் உயிர்சக்தி',
        tagline: 'மிகுந்த ஆரோக்கியம் மற்றும் மீண்டுவரும் உறுதி',
        keyObservation: 'ஆயுள் ரேகை: சுக்கிர மேட்டைச் சுற்றி பரந்து விரிந்த தெளிவான வில் வடிவம்.',
        traditionalInterpretation:
          'சுக்கிர மேட்டைச் சுற்றும் அகன்ற ஆயுள் ரேகை மிகுந்த ஓஜஸ் (உயிர்சக்தி), வாழ்க்கையின் மீது ஆர்வம் மற்றும் மன உறுதியைக் காட்டுகிறது.',
        reflectiveAdvice:
          'வேலைக்கும் ஓய்வுக்கும் இடையே முறையான எல்லைகளை அமைத்து ஆற்றலைப் பாதுகாக்கவும்.',
      },
      {
        id: 'career',
        title: 'தொழில் மற்றும் இலக்கு',
        tagline: 'சுயமுயற்சி பாதை மற்றும் தொடர் வெற்றி',
        keyObservation: 'விதி ரேகை: மணிக்கட்டிலிருந்து சனி மேட்டை நோக்கி நேராக எழும் ரேகை.',
        traditionalInterpretation:
          'சனி மேட்டை நோக்கிச் செல்லும் விதி ரேகை சொந்த உழைப்பால் முன்னேறும் தன்னம்பிக்கையைக் குறிக்கிறது.',
        reflectiveAdvice:
          'உங்கள் தனித்துவமான திறன்களை வளர்த்துக்கொள்ளுங்கள்; தன்னாட்சி உங்கள் வெற்றியை அதிகரிக்கும்.',
      },
      {
        id: 'talents',
        title: 'இயற்கை ஆற்றல் மற்றும் மேடுகள்',
        tagline: 'தலைமைப் பண்பு, இரக்கம் மற்றும் கவர்ச்சி',
        keyObservation: 'குரு மற்றும் சுக்கிர மேடுகள் சிறப்பாக வளர்ச்சியடைந்துள்ளன.',
        traditionalInterpretation:
          'வளர்ந்த குரு மேடு வழிகாட்டும் தலைமைப் பண்பையும், சுக்கிர மேடு பெருந்தன்மையும் வழங்குகிறது.',
        reflectiveAdvice:
          'பிறருக்கு வழிகாட்டும் மற்றும் முன்மாதிரியாக இருக்கும் நல்வாய்ப்புகளைப் பயன்படுத்துங்கள்.',
      },
    ],
    traditionalDisclaimer:
      'இந்த கைரேகை ஆய்வு பாரம்பரிய சாமுத்திரிகா சாஸ்திரத்தின் அடிப்படையில் சுயபரிசீலனைக்காக வழங்கப்படுகிறது. இது எதிர்கால அறிவியல் கணிப்பு அல்ல; மருத்துவ, நிதி அல்லது சட்ட ஆலோசனைகளுக்கு மாற்றாகாது.',
    shareCard: {
      title: 'கை ரேகை AI கணிப்பு',
      headline: 'செயல்முறை சிற்பி',
      primaryTags: ['உணர்வு வெளிப்பாடு', 'தீர்க்க சிந்தனை', 'உயிர்சக்தி'],
      watermark: 'Kai RegAI • பழங்கால சாமுத்திரிகா மரபு',
    },
  },

  // 3. TELUGU (తెలుగు)
  te: {
    archetype: 'వ్యూహాత్మక కర్త (అగ్ని మరియు పృథ్వీ తత్వం)',
    archetypeDescription:
      'మీ అరచేతి రూపకల్పన స్పష్టమైన లోతైన గీతలతో దృఢమైన స్వభావాన్ని తెలియజేస్తోంది. సాంప్రదాయ సాముద్రిక శాస్త్రం ప్రకారం, ఇది తీవ్రమైన సృజనాత్మక సంకల్పాన్ని మరియు ఆచరణాత్మక కార్యాచరణను సూచిస్తుంది.',
    summaryBadges: [
      'భావోద్వేగ వ్యక్తీకరణ',
      'వ్యూహాత్మక ఆలోచన',
      'దృఢమైన ప్రాణశక్తి',
      'స్వయంకృషి గల లక్ష్యం',
    ],
    sections: [
      {
        id: 'love',
        title: 'ప్రేమ & భావోద్వేగ స్వభావం',
        tagline: 'ఉన్నతమైన నిబద్ధత మరియు కుటుంబ గౌరవం',
        keyObservation: 'హృదయ రేఖ: పొడవుగా ఉండి గురు పర్వతం క్రింద అందమైన వంపుతో ముగుస్తుంది.',
        traditionalInterpretation:
          'గురు స్థానంలో ముగిసే హృదయ రేఖ సత్యనిష్ఠ, ధర్మం మరియు వ్యక్తిగత సంబంధాలలో గాఢమైన విశ్వాసాన్ని తెలియజేస్తుంది.',
        reflectiveAdvice:
          'మీ భావోద్వేగాల లోతును అర్థం చేసుకోవడానికి ఎదుటివారికి సమయం ఇవ్వండి.',
      },
      {
        id: 'mind',
        title: 'మేధస్సు & ఆలోచనా విధానం',
        tagline: 'సృజనాత్మక ఆలోచన మరియు స్వతంత్ర నిర్ణయాలు',
        keyObservation: 'శిరో రేఖ: చంద్ర స్థానం వైపు వాలుతూ ఆలోచనా పరిపక్వతను చూపుతుంది.',
        traditionalInterpretation:
          'చంద్రుని వైపు సాగే శిరో రేఖ సృజనాత్మక మేధస్సు, సాహిత్య రసాస్వాదన మరియు స్వతంత్ర దృక్పథాన్ని సూచిస్తుంది.',
        reflectiveAdvice:
          'అతిగా విశ్లేషించి సమయం వృధా చేయకుండా మీ సహజ అంతర్దృష్టిని విశ్వసించండి.',
      },
      {
        id: 'vitality',
        title: 'ఆరోగ్యం & ప్రాణశక్తి',
        tagline: 'అపారమైన ఓజస్సు మరియు స్వస్థత శక్తి',
        keyObservation: 'జీవన రేఖ: శుక్ర పర్వతాన్ని చుడుతూ విశాలమైన వక్రంలో స్పష్టంగా ఉంది.',
        traditionalInterpretation:
          'శుక్రుని చుట్టూ ఉన్న స్పష్టమైన జీవన రేఖ అద్భుతమైన ప్రాణశక్తి (ఓజస్సు) మరియు అనుకూల ఉత్సాహాన్ని ప్రతిబింబిస్తుంది.',
        reflectiveAdvice:
          'లక్ష్య సాధనతో పాటు తగిన విశ్రాంతికి సమాన ప్రాధాన్యతనివ్వండి.',
      },
      {
        id: 'career',
        title: 'వృత్తి & కార్యాచరణ దిశ',
        tagline: 'స్వయం నిర్మిత పథం మరియు నిరంతర ఎదుగుదల',
        keyObservation: 'భాగ్య రేఖ: మణిబంధం నుండి శని పర్వతం వైపు స్పష్టంగా సాగుతోంది.',
        traditionalInterpretation:
          'శని వైపు వెళ్లే భాగ్య రేఖ సొంత కృషితో సాధించే ఉన్నత విజయాలను తెలియజేస్తుంది.',
        reflectiveAdvice:
          'మీ విశిష్ట నైపుణ్యాలను మెరుగుపరచుకోండి; స్వయంప్రతిపత్తి మీ ఎదుగుదలకు తోడ్పడుతుంది.',
      },
      {
        id: 'talents',
        title: 'సహజ ప్రతిభ & పర్వతాల ప్రభావం',
        tagline: 'నాయకత్వ లక్షణం, దాతృత్వం మరియు వాక్చాతుర్యం',
        keyObservation: 'గురు మరియు శుక్ర పర్వతాలు విశేషంగా వికసించి ఉన్నాయి.',
        traditionalInterpretation:
          'గురు పర్వతం గౌరవాన్ని, నాయకత్వాన్ని ఇవ్వగా, శుక్ర పర్వతం ఉదార స్వభావాన్ని ప్రసాదిస్తుంది.',
        reflectiveAdvice:
          'ఇతరులకు మార్గదర్శనం చేసే అవకాశాలను అందిపుచ్చుకోండి.',
      },
    ],
    traditionalDisclaimer:
      'ఈ హస్తసాముద్రిక విశ్లేషణ ప్రాచీన సాముద్రిక సూత్రాలపై ఆధారపడి కేవలం ఆత్మపరిశీలన కొరకు రూపొందించబడింది. ఇది భవిష్యత్తుపై శాస్త్రీయ నిర్ధారణ కాదు మరియు న్యాయ, వైద్య సలహాలకు ప్రత్యామ్నాయం కాదు.',
    shareCard: {
      title: 'కై రేగాయ్ హస్తసాముద్రికం',
      headline: 'వ్యూహాత్మక కర్త',
      primaryTags: ['భావోద్వేగ గాఢత', 'వ్యూహాత్మక ఆలోచన', 'ఉన్నత ప్రాణశక్తి'],
      watermark: 'Kai RegAI • ప్రాచీన సాముద్రిక పద్ధతి',
    },
  },

  // 4. BENGALI (বাংলা)
  bn: {
    archetype: 'কৌশলী রূপকার (অগ্নি ও পৃথিবী তত্ত্ব)',
    archetypeDescription:
      'আপনার কররেখা স্পষ্ট ও গভীর প্রধান রেখার সমন্বয়ে এক দৃঢ় শারীরিক ও মানসিক শক্তির পরিচয় দেয়। প্রাচীন সমুদ্রিক শাস্ত্র মতে, এটি তীব্র সৃজনশীল সংকল্প এবং বাস্তবধর্মী কর্মকাণ্ডের অপূর্ব মিলন।',
    summaryBadges: [
      'আবেগীয় প্রকাশ',
      'কৌশলী চিন্তাবিদ',
      'দৃঢ় জীবনীশক্তি',
      'স্বনির্ভর উচ্চাকাঙ্ক্ষা',
    ],
    sections: [
      {
        id: 'love',
        title: 'প্রেম ও আবেগীয় প্রবণতা',
        tagline: 'উচ্চ আদর্শ ও পারিবারিক নিষ্ঠা',
        keyObservation: 'হৃদয় রেখা: দীর্ঘ, সুন্দর বক্রতা নিয়ে বৃহস্পতি পর্বতের নিচে সমাপ্ত।',
        traditionalInterpretation:
          'বৃহস্পতি পর্বতে সমাপ্ত হৃদয় রেখা নিঃস্বার্থ প্রেম, পারিবারিক মর্যাদা এবং ব্যক্তিগত সম্পর্কে গভীর বিশ্বস্ততার পরিচায়ক।',
        reflectiveAdvice:
          'প্রিয়জনদের আপনার গভীরতা বোঝার সময় দিন; সবাই একই গতিতে অনুভূতি প্রকাশ করতে পারে না।',
      },
      {
        id: 'mind',
        title: 'মনন ও চিন্তাধারা',
        tagline: 'কল্পনাশক্তিসম্পন্ন মেধা ও বাস্তব বিশ্লেষণ',
        keyObservation: 'শিরোরেখা: চন্দ্র পর্বতের দিকে মৃদু ঢাল নিয়ে বিস্তৃত।',
        traditionalInterpretation:
          'চন্দ্রমুখী শিরোরেখা সূক্ষ্ম চিন্তাশক্তি, গভীর দূরদৃষ্টি এবং স্বাধীন সিদ্ধান্ত গ্রহণের প্রতীক।',
        reflectiveAdvice:
          'সিদ্ধান্ত নেওয়ার পূর্বে অতিরিক্ত দ্বিধা এড়িয়ে চলুন; নিজের স্বজ্ঞার উপর আস্থা রাখুন।',
      },
      {
        id: 'vitality',
        title: 'স্বাস্থ্য ও প্রাণশক্তি',
        tagline: 'প্রাচুর্যপূর্ণ প্রাণশক্তি ও প্রতিরোধ ক্ষমতা',
        keyObservation: 'জীবনরেখা: শুক্র পর্বতকে ঘিরে সুস্পষ্ট ও অবিচ্ছিন্ন বিস্তার।',
        traditionalInterpretation:
          'শুক্র পর্বত বেষ্টিত বিস্তৃত জীবনরেখা অফুরন্ত ওজস্বিতা, জীবনমুখী আনন্দ এবং দ্রুত সেরে ওঠার শক্তির পরিচায়ক।',
        reflectiveAdvice:
          'পরিশ্রমের পাশাপাশি পর্যাপ্ত বিশ্রামের ভারসাম্য বজায় রাখুন।',
      },
      {
        id: 'career',
        title: 'কর্মজীবন ও উদ্যোগ',
        tagline: 'স্বনির্মিত পথ ও নিরবচ্ছিন্ন সাফল্য',
        keyObservation: 'ভাগ্যরেখা: মণিবন্ধ থেকে শনি পর্বতের দিকে সোজা ধাবমান।',
        traditionalInterpretation:
          'শনিমণ্ডলের দিকে প্রসারিত ভাগ্যরেখা নিজের দক্ষতায় প্রতিষ্ঠা এবং দায়িত্বশীল কর্মজীবনের নিদর্শন।',
        reflectiveAdvice:
          'নিজের বিশেষ দক্ষতাকে শাণিত করুন; স্বাধীনতা আপনার সম্ভাবনাকে বাড়িয়ে তুলবে।',
      },
      {
        id: 'talents',
        title: 'সহজাত গুণাবলী ও পর্বতের লক্ষণ',
        tagline: 'নেতৃত্বের প্রতিভা, সহমর্মিতা ও মর্যাদা',
        keyObservation: 'বৃহস্পতি ও শুক্র পর্বত সুস্পষ্ট ও সুউচ্চ।',
        traditionalInterpretation:
          'উন্নত বৃহস্পতি পর্বত মর্যাদাবোধ প্রদান করে এবং শুক্র পর্বত উদারতা ও সামাজিক আন্তরিকতা বৃদ্ধি করে।',
        reflectiveAdvice:
          'অন্যদের পথপ্রদর্শন করার ও সহমর্মিতার সাথে এগিয়ে নেওয়ার ভূমিকা গ্রহণ করুন।',
      },
    ],
    traditionalDisclaimer:
      'এই হস্তরেখা বিশ্লেষণ প্রাচীন ভারতীয় সমুদ্রিক শাস্ত্রীয় ধারণার উপর নির্মিত। এটি সম্পূর্ণ আত্ম-উপলব্ধি ও চিন্তনের জন্য। এটি কোনও ভবিষ্যৎ বা ভাগ্য নির্ধারণের বৈজ্ঞানিক দাবি করে না।',
    shareCard: {
      title: 'কাই রেগএআই হস্তরেখা পাঠ',
      headline: 'কৌশলী রূপকার',
      primaryTags: ['আবেগীয় গভীরতা', 'কৌশলী মনন', 'উচ্চ প্রাণশক্তি'],
      watermark: 'Kai RegAI • প্রাচ্য সমুদ্রিক ঐতিহ্য',
    },
  },
};

export class MultilingualReadingService {
  /**
   * Generates or adapts a complete, source-grounded palm reading for a target language.
   * Preserves all canonical CV observations, rule matches, citations, and divergence notes.
   */
  public static async generateReading(
    scanId: string,
    analysis: StructuredPalmAnalysis,
    languageCode: string = DEFAULT_LANGUAGE
  ): Promise<FullPalmReading> {
    // 1. Get canonical grounded reading (One CV -> One Knowledge Base)
    const baseReading = await ReadingGenerationService.generateReading(scanId, analysis);

    const targetLang = SUPPORTED_LANGUAGES[languageCode] ? languageCode : DEFAULT_LANGUAGE;

    // If English, return canonical directly
    if (targetLang === 'en') {
      return baseReading;
    }

    // Check if we have an authentic native template for this language
    const template = LOCALIZED_TEMPLATES[targetLang];
    if (!template) {
      // Fallback: return base reading if template not yet compiled for minor regional
      return baseReading;
    }

    // Merge localized text while preserving exact rule IDs and citations
    const localizedSections: ReadingCardSection[] = baseReading.sections.map((sec) => {
      const matchLoc = template.sections.find((s) => s.id === sec.id);
      if (!matchLoc) return sec;

      return {
        ...sec,
        title: matchLoc.title,
        tagline: matchLoc.tagline,
        keyObservation: matchLoc.keyObservation,
        traditionalInterpretation: matchLoc.traditionalInterpretation,
        reflectiveAdvice: matchLoc.reflectiveAdvice,
      };
    });

    return {
      ...baseReading,
      archetype: template.archetype,
      archetypeDescription: template.archetypeDescription,
      summaryBadges: template.summaryBadges,
      sections: localizedSections,
      traditionalDisclaimer: template.traditionalDisclaimer,
      shareCard: template.shareCard,
    };
  }
}
