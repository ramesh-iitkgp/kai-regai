/**
 * Native-Language Translation Dictionaries for Kai RegAI.
 * Written with culturally authentic phrasing rather than mechanical word-for-word translation.
 */

export interface TranslationSchema {
  nav: {
    brand: string;
    tagline: string;
    notice: string;
    sources: string;
    language: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    price: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  handSelect: {
    title: string;
    subtitle: string;
    rightTitle: string;
    rightDesc: string;
    leftTitle: string;
    leftDesc: string;
    confirmBtn: string;
    backBtn: string;
  };
  scanner: {
    title: string;
    alignGuide: string;
    switchCamera: string;
    uploadPhoto: string;
    takePhoto: string;
    backBtn: string;
    instructionFlat: string;
    instructionLight: string;
    instructionFingers: string;
  };
  preview: {
    title: string;
    subtitle: string;
    sharpnessLabel: string;
    lightingLabel: string;
    retakeBtn: string;
    analyzeBtn: string;
  };
  loading: {
    analyzingTitle: string;
    synthesizingTitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  overlay: {
    badge: string;
    title: string;
    subtitle: string;
    detectedLinesTitle: string;
    unlockBtn: string;
  };
  payment: {
    title: string;
    subtitle: string;
    amount: string;
    amountNote: string;
    upiPrompt: string;
    payBtn: string;
    secureNote: string;
  };
  reading: {
    badge: string;
    title: string;
    rightHandLabel: string;
    leftHandLabel: string;
    tabReading: string;
    tabLines: string;
    archetypeLabel: string;
    whySeeingThisBtn: string;
    shareBtn: string;
    newScanBtn: string;
    purgeBtn: string;
    purgeSuccess: string;
    disclaimer: string;
  };
  modal: {
    whyTitle: string;
    observationLabel: string;
    traditionalLabel: string;
    variationTitle: string;
    citationsLabel: string;
    byAuthor: string;
    disclaimerNote: string;
    closeBtn: string;
  };
}

export const TRANSLATIONS: Record<string, TranslationSchema> = {
  // 1. ENGLISH
  en: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'Traditional Palmistry',
      notice: 'Notice',
      sources: 'Sources',
      language: 'Language',
    },
    hero: {
      badge: 'Verified Classical Chiromancy & Samudrika',
      title1: 'Discover What Your',
      title2: 'Palm Reveals',
      subtitle: 'Instant AI palm reading grounded in authentic 19th-century treatises and ancient Samudrika Shastra.',
      cta: 'Start Palm Scan',
      price: '₹10',
      trust1: 'Private & Secure',
      trust2: 'Pre-1928 Classical Sources',
      trust3: 'Instant UPI Access',
    },
    handSelect: {
      title: 'Choose Which Hand to Read',
      subtitle: 'In traditional palmistry, each hand reflects a distinct dimension of your life story.',
      rightTitle: 'Right Palm (Active Path)',
      rightDesc: 'Reflects your conscious decisions, career focus, and outward life journey (Karma).',
      leftTitle: 'Left Palm (Innate Potential)',
      leftDesc: 'Reflects inherited strengths, emotional constitution, and subconscious instincts (Prarabdha).',
      confirmBtn: 'Continue with Selected Hand',
      backBtn: 'Back',
    },
    scanner: {
      title: 'Align Your Palm',
      alignGuide: 'Position your hand inside the golden outline',
      switchCamera: 'Switch Camera',
      uploadPhoto: 'Upload Photo',
      takePhoto: 'Take Photo',
      backBtn: 'Back',
      instructionFlat: 'Keep your palm flat towards the camera',
      instructionLight: 'Use clear, direct lighting',
      instructionFingers: 'Keep fingers naturally spread',
    },
    preview: {
      title: 'Review Your Palm Photo',
      subtitle: 'Ensure all primary creases are clearly visible without heavy shadows.',
      sharpnessLabel: 'Image Sharpness',
      lightingLabel: 'Lighting Exposure',
      retakeBtn: 'Retake Photo',
      analyzeBtn: 'Analyze Palm',
    },
    loading: {
      analyzingTitle: 'Analyzing Palm Creases',
      synthesizingTitle: 'Synthesizing Your Reading',
      step1: 'Mapping Heart Line, Head Line, and Life Line...',
      step2: 'Evaluating planetary mount elevations...',
      step3: 'Consulting classical Samudrika & Western treatises...',
      step4: 'Synthesizing source-grounded personal reflections...',
    },
    overlay: {
      badge: 'Features Detected',
      title: 'Your Palm Blueprint',
      subtitle: 'Primary energy lines and planetary mounts detected by biometric vision.',
      detectedLinesTitle: 'Detected Lines',
      unlockBtn: 'Unlock Complete Reading (₹10)',
    },
    payment: {
      title: 'Unlock Your Complete Reading',
      subtitle: 'Access detailed interpretations for Love, Career, Vitality, Mind, and Mounts.',
      amount: '₹10',
      amountNote: 'One-time payment • No subscription',
      upiPrompt: 'Pay securely via any UPI app',
      payBtn: 'Pay ₹10 via UPI',
      secureNote: '100% Secure Checkout • Instant Access',
    },
    reading: {
      badge: 'Verified Classical Synthesis',
      title: 'Your AI Palm Reading',
      rightHandLabel: 'Right Palm (Active Path)',
      leftHandLabel: 'Left Palm (Innate Potential)',
      tabReading: 'Detailed Reading',
      tabLines: 'Illuminated Lines',
      archetypeLabel: 'Palm Archetype',
      whySeeingThisBtn: 'Why am I seeing this? (View Classical Sources)',
      shareBtn: 'Share Reading Card',
      newScanBtn: 'New Scan',
      purgeBtn: 'Purge Palm Photo',
      purgeSuccess: 'Your palm photograph has been securely erased from active memory.',
      disclaimer: 'This palmistry reading is for personal reflection and entertainment based on historical texts. It does not make deterministic predictions or provide scientific or medical diagnosis.',
    },
    modal: {
      whyTitle: 'Why Am I Seeing This?',
      observationLabel: 'Physical Palm Observation',
      traditionalLabel: 'Traditional Interpretation',
      variationTitle: 'Notice of Traditional Variation',
      citationsLabel: 'Historical Citations',
      byAuthor: 'by',
      disclaimerNote: 'Grounding Note: Kai RegAI maps physical features directly to verified classical texts.',
      closeBtn: 'Close',
    },
  },

  // 2. HINDI (हिन्दी)
  hi: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'पारंपरिक हस्तरेखा शास्त्र',
      notice: 'सूचना',
      sources: 'प्रामाणिक ग्रंथ',
      language: 'भाषा',
    },
    hero: {
      badge: 'प्रमाणित शास्त्रीय सामुद्रिक एवं हस्तरेखा ज्ञान',
      title1: 'जानिए आपकी हथेली',
      title2: 'क्या कहती है',
      subtitle: 'प्रामाणिक 19वीं सदी के पाश्चात्य ग्रंथों एवं प्राचीन सामुद्रिक शास्त्र पर आधारित तत्काल एआई हस्तरेखा विश्लेषण।',
      cta: 'हथेली स्कैन करें',
      price: '₹10',
      trust1: 'गोपनीय व सुरक्षित',
      trust2: '1928 से पूर्व के मूल ग्रंथ',
      trust3: 'तत्काल यूपीआई द्वारा',
    },
    handSelect: {
      title: 'किस हाथ का विश्लेषण करना चाहते हैं?',
      subtitle: 'पारंपरिक हस्तरेखा शास्त्र में दोनों हाथों का अलग-अलग जीवन महत्व है।',
      rightTitle: 'दायां हाथ (कर्म व वर्तमान मार्ग)',
      rightDesc: 'यह आपके सचेत निर्णयों, करियर एवं वर्तमान जीवन दिशा (कर्म) को दर्शाता है।',
      leftTitle: 'बायां हाथ (जन्मजात क्षमता)',
      leftDesc: 'यह आपकी अंतर्निहित शक्तियों, मूल स्वभाव एवं प्रारब्ध क्षमता को दर्शाता है।',
      confirmBtn: 'चयनित हाथ से आगे बढ़ें',
      backBtn: 'पीछे जाएं',
    },
    scanner: {
      title: 'हथेली को सीध में लाएं',
      alignGuide: 'हथेली को सुनहरी रूपरेखा के अंदर रखें',
      switchCamera: 'कैमरा बदलें',
      uploadPhoto: 'फोटो अपलोड करें',
      takePhoto: 'फोटो खींचें',
      backBtn: 'पीछे जाएं',
      instructionFlat: 'हथेली को कैमरे के सामने सीधा रखें',
      instructionLight: 'पर्याप्त रोशनी का उपयोग करें',
      instructionFingers: 'उंगलियों को हल्का सा खुला रखें',
    },
    preview: {
      title: 'हथेली की फोटो जांचें',
      subtitle: 'सुनिश्चित करें कि मुख्य रेखाएं बिना गहरी छाया के स्पष्ट दिख रही हैं।',
      sharpnessLabel: 'फोटो स्पष्टता',
      lightingLabel: 'रोशनी की स्थिति',
      retakeBtn: 'दोबारा फोटो लें',
      analyzeBtn: 'विश्लेषण शुरू करें',
    },
    loading: {
      analyzingTitle: 'हस्त रेखाओं का विश्लेषण जारी है',
      synthesizingTitle: 'आपकी रीडिंग तैयार हो रही है',
      step1: 'हृदय, मस्तिष्क एवं जीवन रेखा का मानचित्रण...',
      step2: 'ग्रह पर्वतों (गुरु, शुक्र, शनि) का मूल्यांकन...',
      step3: 'शास्त्रीय सामुद्रिक ग्रंथों से मिलान...',
      step4: 'प्रामाणिक पारंपरिक फलकथन तैयार हो रहा है...',
    },
    overlay: {
      badge: 'पहचाने गए लक्षण',
      title: 'आपकी हथेली का मानचित्र',
      subtitle: 'कंप्यूटर विज़न द्वारा पहचानी गई मुख्य रेखाएं और पर्वत।',
      detectedLinesTitle: 'पहचानी गई रेखाएं',
      unlockBtn: 'पूरी रीडिंग देखें (₹10)',
    },
    payment: {
      title: 'अपनी संपूर्ण रीडिंग प्राप्त करें',
      subtitle: 'प्रेम, करियर, जीवन शक्ति, मस्तिष्क एवं पर्वतों का विस्तृत शास्त्रीय फलकथन।',
      amount: '₹10',
      amountNote: 'केवल एक बार भुगतान • कोई सदस्यता नहीं',
      upiPrompt: 'किसी भी यूपीआई ऐप से सुरक्षित भुगतान करें',
      payBtn: '₹10 का भुगतान करें',
      secureNote: '100% सुरक्षित भुगतान • तुरंत रीडिंग उपलब्ध',
    },
    reading: {
      badge: 'प्रमाणित शास्त्रीय विश्लेषण',
      title: 'आपका एआई हस्तरेखा फलकथन',
      rightHandLabel: 'दायां हाथ (कर्म मार्ग)',
      leftHandLabel: 'बायां हाथ (प्रारब्ध स्वभाव)',
      tabReading: 'विस्तृत फलकथन',
      tabLines: 'रेखाओं का विवरण',
      archetypeLabel: 'हस्त प्रकृति',
      whySeeingThisBtn: 'यह फलकथन क्यों दिखा? (मूल ग्रंथ व श्लोक देखें)',
      shareBtn: 'रीडिंग कार्ड शेयर करें',
      newScanBtn: 'नया स्कैन',
      purgeBtn: 'फोटो तुरंत हटाएं',
      purgeSuccess: 'आपकी हथेली की फोटो सर्वर मेमोरी से सुरक्षित रूप से मिटा दी गई है।',
      disclaimer: 'यह हस्तरेखा फलकथन पारंपरिक ग्रंथों पर आधारित है और केवल आत्म-चिंतन व मनोरंजन हेतु है। यह भविष्य की निश्चित भविष्यवाणी या कोई वैज्ञानिक/चिकित्सकीय निदान नहीं करता।',
    },
    modal: {
      whyTitle: 'यह फलकथन क्यों दिखा?',
      observationLabel: 'हथेली का भौतिक अवलोकन',
      traditionalLabel: 'पारंपरिक शास्त्रीय व्याख्या',
      variationTitle: 'परंपरागत मतभेद / भिन्नता की सूचना',
      citationsLabel: 'ऐतिहासिक ग्रंथ संदर्भ',
      byAuthor: 'लेखक:',
      disclaimerNote: 'पारदर्शिता: Kai RegAI हथेली के लक्षणों को सीधे ऐतिहासिक ग्रंथों से जोड़ता है।',
      closeBtn: 'बंद करें',
    },
  },

  // 3. BENGALI (বাংলা)
  bn: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'ঐতিহ্যবাহী সামুদ্রিক হস্তরেখা',
      notice: 'বিজ্ঞপ্তি',
      sources: 'আকর গ্রন্থ',
      language: 'ভাষা',
    },
    hero: {
      badge: 'যাচাইকৃত ঐতিহ্যবাহী হস্তরেখা ও সামুদ্রিক জ্ঞান',
      title1: 'জানুন আপনার হাতের তালু',
      title2: 'কী বলছে',
      subtitle: 'প্রামাণ্য ক্লাসিক্যাল গ্রন্থ ও প্রাচীন সামুদ্রিক শাস্ত্রের ভিত্তিতে আপনার হাতের তালুর তাৎক্ষণিক এআই বিশ্লেষণ।',
      cta: 'হাতের তালু স্ক্যান করুন',
      price: '₹১০',
      trust1: 'গোপনীয় ও সুরক্ষিত',
      trust2: '১৯২৮ সালের পূর্বের মূল গ্রন্থ',
      trust3: 'তাত্ক্ষণিক ইউপিআই পেমেন্ট',
    },
    handSelect: {
      title: 'কোন হাতটি দেখতে চান?',
      subtitle: 'হস্তরেখা শাস্ত্রে দুটি হাতের আলাদা তাৎপর্য রয়েছে।',
      rightTitle: 'ডান হাত (কর্ম ও বর্তমান পথ)',
      rightDesc: 'আপনার সচেতন সিদ্ধান্ত, কর্মজীবন ও বাস্তব জীবনধারা (কর্ম) প্রকাশ করে।',
      leftTitle: 'বাঁ হাত (জন্মগত সম্ভাবনা)',
      leftDesc: 'আপনার অন্তর্নিহিত প্রতিভা, জন্মগত স্বভাব ও সুপ্ত সম্ভাবনা (প্রারব্ধ) প্রকাশ করে।',
      confirmBtn: 'নির্বাচিত হাত নিয়ে এগিয়ে যান',
      backBtn: 'পেছনে যান',
    },
    scanner: {
      title: 'হাতের তালু ঠিকভাবে রাখুন',
      alignGuide: 'সোনালী রেখার মধ্যে হাত রাখুন',
      switchCamera: 'ক্যামেরা পরিবর্তন',
      uploadPhoto: 'ছবি আপলোড করুন',
      takePhoto: 'ছবি তুলুন',
      backBtn: 'পেছনে যান',
      instructionFlat: 'হাতের তালু ক্যামেরার সামনে সমান রাখুন',
      instructionLight: 'উজ্জ্বল আলো ব্যবহার করুন',
      instructionFingers: 'আঙুলগুলো স্বাভাবিকভাবে ফাঁক রাখুন',
    },
    preview: {
      title: 'হাতের ছবি যাচাই করুন',
      subtitle: 'নিশ্চিত করুন প্রধান রেখাগুলো ছায়া ছাড়া পরিষ্কার দেখা যাচ্ছে।',
      sharpnessLabel: 'ছবির স্পষ্টতা',
      lightingLabel: 'আলোর অবস্থা',
      retakeBtn: 'আবার ছবি তুলুন',
      analyzeBtn: 'বিশ্লেষণ করুন',
    },
    loading: {
      analyzingTitle: 'রেখাগুলো বিশ্লেষণ করা হচ্ছে',
      synthesizingTitle: 'আপনার রিডিং তৈরি হচ্ছে',
      step1: 'হৃদয় রেখা, মস্তিষ্ক রেখা ও জীবন রেখা চিহ্নিতকরণ...',
      step2: 'বৃহস্পতি ও শুক্র পর্বতের উচ্চতা মূল্যায়ন...',
      step3: 'সামুদ্রিক শাস্ত্রের মূল গ্রন্থের সাথে মেলানো হচ্ছে...',
      step4: 'প্রামাণ্য ফলাফল প্রস্তুত হচ্ছে...',
    },
    overlay: {
      badge: 'চিহ্নিত বৈশিষ্ট্য',
      title: 'আপনার হাতের তালুর মানচিত্র',
      subtitle: 'কম্পিউটার ভিশনের মাধ্যমে প্রধান রেখা ও পর্বতের অবস্থান।',
      detectedLinesTitle: 'চিহ্নিত রেখাসমূহ',
      unlockBtn: 'সম্পূর্ণ রিডিং দেখুন (₹১০)',
    },
    payment: {
      title: 'আপনার সম্পূর্ণ রিডিং আনলক করুন',
      subtitle: 'সম্পর্ক, ক্যারিয়ার, জীবনীশক্তি ও মেধার পুঙ্খানুপুঙ্খ ঐতিহ্যবাহী বিশ্লেষণ।',
      amount: '₹১০',
      amountNote: 'এককালীন পেমেন্ট • কোনো সাবস্ক্রিপশন নেই',
      upiPrompt: 'যেকোনো ইউপিআই অ্যাপ দিয়ে নিরাপদ পেমেন্ট করুন',
      payBtn: '₹১০ পেমেন্ট করুন',
      secureNote: '১০০% নিরাপদ লেনদেন • তাৎক্ষণিক রিডিং',
    },
    reading: {
      badge: 'যাচাইকৃত সামুদ্রিক বিশ্লেষণ',
      title: 'আপনার এআই হস্তরেখা ফল',
      rightHandLabel: 'ডান হাত (কর্ম পথ)',
      leftHandLabel: 'বাঁ হাত (প্রারব্ধ সম্ভাবনা)',
      tabReading: 'বিস্তারিত রিডিং',
      tabLines: 'রেখার মানচিত্র',
      archetypeLabel: 'হস্তের প্রকৃতি',
      whySeeingThisBtn: 'এই ফলাফল কেন এল? (আকর গ্রন্থ ও সূত্র দেখুন)',
      shareBtn: 'রিডিং কার্ড শেয়ার করুন',
      newScanBtn: 'নতুন স্ক্যান',
      purgeBtn: 'ছবি মুছে ফেলুন',
      purgeSuccess: 'আপনার হাতের ছবি সার্ভার থেকে সম্পূর্ণ মুছে ফেলা হয়েছে।',
      disclaimer: 'এই হস্তরেখা বিশ্লেষণ কেবল আত্ম-অনুসন্ধান ও সাংস্কৃতিক আগ্রহের জন্য। এটি কোনো বৈজ্ঞানিক ভবিষ্যদ্বাণী বা চিকিৎসাগত সিদ্ধান্ত নয়।',
    },
    modal: {
      whyTitle: 'এই ফলাফল কেন এল?',
      observationLabel: 'হাতের শারীরিক লক্ষণ',
      traditionalLabel: 'ঐতিহ্যবাহী ব্যাখ্যা',
      variationTitle: 'ঐতিহ্যগত মতভেদের বিজ্ঞপ্তি',
      citationsLabel: 'গ্রন্থের সূত্র ও উদ্ধৃতি',
      byAuthor: 'লেখক:',
      disclaimerNote: 'Kai RegAI প্রতিটি ফলাফল ঐতিহাসিক গ্রন্থের সূত্রের সাথে যুক্ত করে।',
      closeBtn: 'বন্ধ করুন',
    },
  },

  // 4. TAMIL (தமிழ்)
  ta: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'பாரம்பரிய கைரேகை ஜோதிடம்',
      notice: 'அறிவிப்பு',
      sources: 'ஆதார நூல்கள்',
      language: 'மொழி',
    },
    hero: {
      badge: 'சான்றளிக்கப்பட்ட சாமுத்ரிகா மற்றும் கைரேகை ஞானம்',
      title1: 'உங்கள் உள்ளங்கை',
      title2: 'என்ன சொல்கிறது?',
      subtitle: 'பண்டைய சாமுத்ரிகா சாஸ்திரம் மற்றும் 19-ஆம் நூற்றாண்டு நூல்களின் அடிப்படையில் உடனடி ஏஐ கைரேகை பலன்.',
      cta: 'கைரேகை ஸ்கேன் செய்க',
      price: '₹10',
      trust1: 'ரகசியமானது & பாதுகாப்பானது',
      trust2: '1928-க்கு முந்தைய மூல நூல்கள்',
      trust3: 'உடனடி UPI பரிவர்த்தனை',
    },
    handSelect: {
      title: 'எந்தக் கையை பார்க்க விரும்புகிறீர்கள்?',
      subtitle: 'பாரம்பரிய சாஸ்திரத்தில் இரு கைகளுக்கும் தனித்துவமான பொருள் உண்டு.',
      rightTitle: 'வலது கை (செயல் & கர்ம வழி)',
      rightDesc: 'உங்கள் நனவான முடிவுகள், தொழில் மற்றும் தற்போதைய வாழ்க்கை பாதையை குறிக்கிறது.',
      leftTitle: 'இடது கை (இயற்கை ஆற்றல்)',
      leftDesc: 'உங்கள் பிறவி குணங்கள், பரம்பரை பலங்கள் மற்றும் உள்ளுணர்வை குறிக்கிறது.',
      confirmBtn: 'தேர்ந்தெடுத்த கையுடன் தொடர்க',
      backBtn: 'பின்செல்க',
    },
    scanner: {
      title: 'கையை நேராக வைக்கவும்',
      alignGuide: 'தங்க நிற வழிகாட்டியில் உள்ளங்கையை பொருத்தவும்',
      switchCamera: 'கேமரா மாற்று',
      uploadPhoto: 'புகைப்படம் பதிவேற்றவும்',
      takePhoto: 'படம் எடுக்கவும்',
      backBtn: 'பின்செல்க',
      instructionFlat: 'கையை கேமராவுக்கு நேராக தட்டையாக வைக்கவும்',
      instructionLight: 'நல்ல வெளிச்சத்தில் படம் எடுக்கவும்',
      instructionFingers: 'விரல்களை லேசாக விரித்து வைக்கவும்',
    },
    preview: {
      title: 'படத்தை சரிபார்க்கவும்',
      subtitle: 'முக்கிய ரேகைகள் நிழல் இல்லாமல் தெளிவாக உள்ளதா என்பதை உறுதிப்படுத்தவும்.',
      sharpnessLabel: 'படத்தின் தெளிவு',
      lightingLabel: 'வெளிச்சத்தின் அளவு',
      retakeBtn: 'மீண்டும் படம் எடுக்கவும்',
      analyzeBtn: 'ரேகை பார்க்க',
    },
    loading: {
      analyzingTitle: 'ரேகைகள் ஆராயப்படுகின்றன',
      synthesizingTitle: 'உங்கள் பலன் தயாராகிறது',
      step1: 'இதய ரேகை, அறிவு ரேகை, ஆயுள் ரேகை வரைபடம்...',
      step2: 'குரு மற்றும் சுக்கிர மேடுகளின் அளவீடு...',
      step3: 'பாரம்பரிய சாமுத்ரிகா சாஸ்திர குறிப்புகளுடன் ஒப்பீடு...',
      step4: 'நம்பகமான கைரேகை பலன் தயாராகிறது...',
    },
    overlay: {
      badge: 'கண்டறியப்பட்ட ரேகைகள்',
      title: 'உங்கள் உள்ளங்கை வரைபடம்',
      subtitle: 'கணினி பார்வை மூலம் கண்டறியப்பட்ட முதன்மை ரேகைகள் மற்றும் மேடுகள்.',
      detectedLinesTitle: 'கண்டறியப்பட்ட ரேகைகள்',
      unlockBtn: 'முழு பலனையும் காண்க (₹10)',
    },
    payment: {
      title: 'உங்கள் முழு பலனையும் திறக்கவும்',
      subtitle: 'காதல், தொழில், ஆயுள், அறிவு மற்றும் மேடுகளின் விரிவான பலன்கள்.',
      amount: '₹10',
      amountNote: 'ஒருமுறை கட்டணம் • சந்தா இல்லை',
      upiPrompt: 'எந்தவொரு UPI ஆப் மூலமும் பாதுகாப்பாக செலுத்தலாம்',
      payBtn: '₹10 செலுத்துக',
      secureNote: '100% பாதுகாப்பானது • உடனடி பலன்',
    },
    reading: {
      badge: 'சான்றளிக்கப்பட்ட சாமுத்ரிகா பலன்',
      title: 'உங்கள் ஏஐ கைரேகை பலன்',
      rightHandLabel: 'வலது கை (செயல் வழி)',
      leftHandLabel: 'இடது கை (பிறவி வழி)',
      tabReading: 'விரிவான பலன்கள்',
      tabLines: 'ரேகை வரைபடம்',
      archetypeLabel: 'கைரேகை தத்துவம்',
      whySeeingThisBtn: 'இந்த பலன் ஏன் வந்தது? (மூல நூல்கள் காண்க)',
      shareBtn: 'கார்டை பகிர்க',
      newScanBtn: 'புதிய ஸ்கேன்',
      purgeBtn: 'படத்தை அழிக்கவும்',
      purgeSuccess: 'உங்கள் உள்ளங்கை படம் சேவையக நினைவகத்திலிருந்து பாதுகாப்பாக அழிக்கப்பட்டது.',
      disclaimer: 'இந்த கைரேகை பலன் சுய சிந்தனை மற்றும் பொழுதுபோக்கு நோக்கத்திற்காக மட்டுமே. இது அறிவியல் ரீதியான எதிர்கால கணிப்பு அல்ல.',
    },
    modal: {
      whyTitle: 'இந்த பலன் ஏன் வந்தது?',
      observationLabel: 'உள்ளங்கையின் உடல் அமைப்பு',
      traditionalLabel: 'பாரம்பரிய சாஸ்திர விளக்கம்',
      variationTitle: 'பாரம்பரிய கருத்து வேறுபாடுகள்',
      citationsLabel: 'நூல் குறிப்புகள் மற்றும் மேற்கோள்கள்',
      byAuthor: 'ஆசிரியர்:',
      disclaimerNote: 'Kai RegAI உடல் பண்புகளை நேரடியாக பாரம்பரிய நூல்களுடன் இணைக்கிறது.',
      closeBtn: 'மூடுக',
    },
  },

  // 5. TELUGU (తెలుగు)
  te: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'సాంప్రదాయ హస్తసాముద్రికం',
      notice: 'గమనిక',
      sources: 'ప్రామాణిక గ్రంథాలు',
      language: 'భాష',
    },
    hero: {
      badge: 'ప్రామాణిక సాముద్రిక శాస్త్ర జ్ఞానం',
      title1: 'మీ అరచేతి రేఖలు',
      title2: 'ఏమి చెబుతున్నాయో తెలుసుకోండి',
      subtitle: 'ప్రాచీన సాముద్రిక శాస్త్రం మరియు ప్రామాణిక గ్రంథాల ఆధారంగా తక్షణ ఏఐ హస్తసాముద్రిక విశ్లేషణ.',
      cta: 'హస్తం స్కాన్ చేయండి',
      price: '₹10',
      trust1: 'గోప్యమైనది & సురక్షితం',
      trust2: '1928 పూర్వ ప్రామాణిక గ్రంథాలు',
      trust3: 'తక్షణ UPI చెల్లింపు',
    },
    handSelect: {
      title: 'ఏ చేతిని చూడాలనుకుంటున్నారు?',
      subtitle: 'సాంప్రదాయ హస్తసాముద్రికంలో ప్రతి చేతికి ఒక ప్రత్యేక అర్థం ఉంది.',
      rightTitle: 'కుడి చేయి (కర్మ & ప్రస్తుత మార్గం)',
      rightDesc: 'మీ స్పృహ నిర్ణయాలు, కెరీర్ మరియు ప్రస్తుత జీవిత మార్గాన్ని ప్రతిబింబిస్తుంది.',
      leftTitle: 'ఎడమ చేయి (జన్మతః సామర్థ్యం)',
      leftDesc: 'మీ అంతర్గత బలాలు, సహజ స్వభావం మరియు ప్రారబ్ధాన్ని ప్రతిబింబిస్తుంది.',
      confirmBtn: 'ఎంచుకున్న చేతితో కొనసాగండి',
      backBtn: 'వెనుకకు',
    },
    scanner: {
      title: 'అరచేతిని సరైన స్థానంలో ఉంచండి',
      alignGuide: 'బంగారు రూపురేఖల లోపల అరచేతిని ఉంచండి',
      switchCamera: 'కెమెరా మార్చండి',
      uploadPhoto: 'ఫోటో అప్‌లోడ్ చేయండి',
      takePhoto: 'ఫోటో తీయండి',
      backBtn: 'వెనుకకు',
      instructionFlat: 'అరచేతిని కెమెరాకు సమాంతరంగా ఉంచండి',
      instructionLight: 'మంచి వెలుతురులో ఫోటో తీయండి',
      instructionFingers: 'వేళ్లను కొద్దిగా వేరు చేసి ఉంచండి',
    },
    preview: {
      title: 'ఫోటోను సరిచూసుకోండి',
      subtitle: 'ముఖ్యమైన రేఖలు నీడలు లేకుండా స్పష్టంగా ఉన్నాయో లేదో నిర్ధారించుకోండి.',
      sharpnessLabel: 'చిత్ర స్పష్టత',
      lightingLabel: 'వెలుతురు స్థాయి',
      retakeBtn: 'మళ్లీ తీయండి',
      analyzeBtn: 'విశ్లేషించండి',
    },
    loading: {
      analyzingTitle: 'రేఖల విశ్లేషణ జరుగుతోంది',
      synthesizingTitle: 'మీ ఫలితాలు సిద్ధమవుతున్నాయి',
      step1: 'హృదయ, శిరో మరియు ఆయుష్షు రేఖల గుర్తింపు...',
      step2: 'బృహస్పతి, శుక్ర పర్వతాల పరిశీలన...',
      step3: 'ప్రాచీన సాముద్రిక శ్లోకాలతో సరిపోల్చడం...',
      step4: 'ప్రామాణిక హస్తసాముద్రిక ఫలితం సిద్ధం...',
    },
    overlay: {
      badge: 'గుర్తించబడిన లక్షణాలు',
      title: 'మీ అరచేతి నమూనా',
      subtitle: 'కంప్యూటర్ విజన్ ద్వారా గుర్తించబడిన ముఖ్య రేఖలు మరియు పర్వతాలు.',
      detectedLinesTitle: 'గుర్తించబడిన రేఖలు',
      unlockBtn: 'పూర్తి ఫలితాలు చూడండి (₹10)',
    },
    payment: {
      title: 'మీ పూర్తి ఫలితాన్ని అన్‌లాక్ చేయండి',
      subtitle: 'ప్రేమ, కెరీర్, ఆరోగ్యం మరియు పర్వతాల సమగ్ర సాంప్రదాయ విశ్లేషణ.',
      amount: '₹10',
      amountNote: 'ఒకసారి చెల్లింపు మాత్రమే • సబ్‌స్క్రిప్షన్ లేదు',
      upiPrompt: 'ఏదైనా UPI యాప్ ద్వారా సురక్షితంగా చెల్లించండి',
      payBtn: '₹10 చెల్లించండి',
      secureNote: '100% సురక్షితం • తక్షణ ఫలితాలు',
    },
    reading: {
      badge: 'ప్రామాణిక సాముద్రిక విశ్లేషణ',
      title: 'మీ ఏఐ హస్తసాముద్రిక ఫలితం',
      rightHandLabel: 'కుడి చేయి (కర్మ మార్గం)',
      leftHandLabel: 'ఎడమ చేయి (జన్మతః మార్గం)',
      tabReading: 'వివరమైన ఫలితం',
      tabLines: 'రేఖల పటం',
      archetypeLabel: 'హస్త తత్వం',
      whySeeingThisBtn: 'ఈ ఫలితం ఎందుకు వచ్చింది? (మూల గ్రంథాలు చూడండి)',
      shareBtn: 'కార్డును షేర్ చేయండి',
      newScanBtn: 'కొత్త స్కాన్',
      purgeBtn: 'ఫోటోను తొలగించండి',
      purgeSuccess: 'మీ అరచేతి ఫోటో సర్వర్ మెమరీ నుండి శాశ్వతంగా తొలగించబడింది.',
      disclaimer: 'ఈ హస్తసాముద్రిక ఫలితం సాంప్రదాయ గ్రంథాలపై ఆధారపడినది మరియు కేవలం ఆత్మపరిశీలనకు మాత్రమే. ఇది భవిష్యత్తును ఖచ్చితంగా నిర్ణయించదు.',
    },
    modal: {
      whyTitle: 'ఈ ఫలితం ఎందుకు వచ్చింది?',
      observationLabel: 'అరచేతి భౌతిక పరిశీలన',
      traditionalLabel: 'సాంప్రదాయ వివరణ',
      variationTitle: 'వివిధ సంప్రదాయాల భేదాలు',
      citationsLabel: 'చారిత్రక గ్రంథ సూచనలు',
      byAuthor: 'రచయిత:',
      disclaimerNote: 'Kai RegAI శారీరక లక్షణాలను నేరుగా ప్రామాణిక గ్రంథాలతో అనుసంధానిస్తుంది.',
      closeBtn: 'మూసివేయండి',
    },
  },

  // 6. MARATHI (मराठी)
  mr: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'पारंपरिक हस्तरेषा शास्त्र',
      notice: 'सूचना',
      sources: 'मूळ ग्रंथ',
      language: 'भाषा',
    },
    hero: {
      badge: 'प्रमाणित शास्त्रीय सामुद्रिक ज्ञान',
      title1: 'जाणून घ्या आपल्या हाताच्या रेषा',
      title2: 'काय सांगतात',
      subtitle: '१९व्या शतकातील पाश्चात्य ग्रंथ आणि प्राचीन सामुद्रिक शास्त्रावर आधारित झटपट हस्तरेषा वाचन.',
      cta: 'हात स्कॅन करा',
      price: '₹१०',
      trust1: 'सुरक्षित व गोपनीय',
      trust2: '१९२८ पूर्वीचे अस्सल ग्रंथ',
      trust3: 'झटपट UPI पेमेंट',
    },
    handSelect: {
      title: 'कोणत्या हाताचे वाचन करायचे आहे?',
      subtitle: 'हस्तरेषा शास्त्रामध्ये दोन्ही हातांचे वेगवेगळे महत्त्व आहे.',
      rightTitle: 'उजवा हात (कर्म व वर्तमान मार्ग)',
      rightDesc: 'आपले जागरूक निर्णय, करिअर आणि सध्याची वाटचाल (कर्म) दर्शवतो.',
      leftTitle: 'डावा हात (जन्मजात क्षमता)',
      leftDesc: 'आपली मूळ स्वभाववैशिष्ट्ये, आंतरिक प्रतिभा व प्रारब्ध दर्शवतो.',
      confirmBtn: 'निवडलेल्या हाताने पुढे जा',
      backBtn: 'मागे जा',
    },
    scanner: {
      title: 'हात योग्य स्थितीत धरा',
      alignGuide: 'सोनेरी चौकटीत हात ठेवा',
      switchCamera: 'कॅमेरा बदला',
      uploadPhoto: 'फोटो अपलोड करा',
      takePhoto: 'फोटो काढा',
      backBtn: 'मागे जा',
      instructionFlat: 'हात कॅमेऱ्यासमोर सपाट ठेवा',
      instructionLight: 'योग्य प्रकाशात फोटो घ्या',
      instructionFingers: 'बोटे किंचित दूर ठेवा',
    },
    preview: {
      title: 'फोटो तपासा',
      subtitle: 'सर्व मुख्य रेषा सावलीशिवाय स्पष्ट दिसत असल्याची खात्री करा.',
      sharpnessLabel: 'स्पष्टता',
      lightingLabel: 'प्रकाश',
      retakeBtn: 'पुन्हा फोटो घ्या',
      analyzeBtn: 'विश्लेषण करा',
    },
    loading: {
      analyzingTitle: 'रेषांचे विश्लेषण सुरू आहे',
      synthesizingTitle: 'वाचन तयार होत आहे',
      step1: 'हृदय, मस्तक आणि आयुष्य रेषेचे मॅपिंग...',
      step2: 'ग्रह पर्वतांचे मोजमाप...',
      step3: 'सामुद्रिक शास्त्राशी तुलना...',
      step4: 'अस्सल फलकथन तयार होत आहे...',
    },
    overlay: {
      badge: 'ओळखलेली वैशिष्ट्ये',
      title: 'आपल्या हाताचा नकाशा',
      subtitle: 'मुख्य रेषा व पर्वत ओळखण्यात आले आहेत.',
      detectedLinesTitle: 'ओळखलेल्या रेषा',
      unlockBtn: 'संपूर्ण वाचन अनलॉक करा (₹१०)',
    },
    payment: {
      title: 'आपले संपूर्ण वाचन उघडा',
      subtitle: 'प्रेम, करिअर, आरोग्य आणि बुद्धिमत्तेचे सविस्तर पारंपरिक विश्लेषण.',
      amount: '₹१०',
      amountNote: 'एकवेळ पेमेंट • कोणतेही सबस्क्रिप्शन नाही',
      upiPrompt: 'कोणत्याही UPI ॲपवरून सुरक्षित पेमेंट करा',
      payBtn: '₹१० भरा',
      secureNote: '१००% सुरक्षित • झटपट वाचन',
    },
    reading: {
      badge: 'प्रमाणित शास्त्रीय विश्लेषण',
      title: 'आपले एआय हस्तरेषा वाचन',
      rightHandLabel: 'उजवा हात (कर्म मार्ग)',
      leftHandLabel: 'डावा हात (प्रारब्ध स्वभाव)',
      tabReading: 'सविस्तर वाचन',
      tabLines: 'रेषांचा नकाशा',
      archetypeLabel: 'हस्त प्रकृती',
      whySeeingThisBtn: 'हे वाचन का दिसले? (मूळ संदर्भ ग्रंथ पहा)',
      shareBtn: 'कार्ड शेअर करा',
      newScanBtn: 'नवीन स्कॅन',
      purgeBtn: 'फोटो हटवा',
      purgeSuccess: 'आपल्या हाताचा फोटो सर्व्हरवरून पूर्णपणे मिटवला आहे.',
      disclaimer: 'हे हस्तरेषा वाचन पारंपरिक ग्रंथांवर आधारित असून केवळ आत्मपरीक्षणासाठी आहे.',
    },
    modal: {
      whyTitle: 'हे वाचन का दिसले?',
      observationLabel: 'हाताचे प्रत्यक्ष निरीक्षण',
      traditionalLabel: 'पारंपरिक अर्थ',
      variationTitle: 'परंपरांमधील भिन्नतेची नोंद',
      citationsLabel: 'ऐतिहासिक ग्रंथ संदर्भ',
      byAuthor: 'लेखक:',
      disclaimerNote: 'Kai RegAI थेट अस्सल ग्रंथांमधील संदर्भांवर आधारित काम करते.',
      closeBtn: 'बंद करा',
    },
  },

  // 7. GUJARATI (ગુજરાતી)
  gu: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'પરંપરાગત હસ્તરેખા શાસ્ત્ર',
      notice: 'સૂચના',
      sources: 'મૂળ ગ્રંથો',
      language: 'ભાષા',
    },
    hero: {
      badge: 'પ્રમાણિત શાસ્ત્રીય સામુદ્રિક જ્ઞાન',
      title1: 'જાણો તમારા હાથની રેખાઓ',
      title2: 'શું કહે છે',
      subtitle: 'પ્રાચીન સામુદ્રિક શાસ્ત્ર અને ૧૯મી સદીના પ્રમાણભૂત ગ્રંથો પર આધારિત ઝડપી હસ્તરેખા વિશ્લેષણ.',
      cta: 'હથેળી સ્કેન કરો',
      price: '₹૧૦',
      trust1: 'ખાનગી અને સુરક્ષિત',
      trust2: '૧૯૨૮ પહેલાંના મૂળ ગ્રંથો',
      trust3: 'ત્વરિત UPI ચુકવણી',
    },
    handSelect: {
      title: 'કયા હાથનું વાચન કરવું છે?',
      subtitle: 'હસ્તરેખા શાસ્ત્રમાં બંને હાથનું અલગ મહત્વ છે.',
      rightTitle: 'જમણો હાથ (કર્મ અને વર્તમાન માર્ગ)',
      rightDesc: 'તમારા જાગૃત નિર્ણયો, કારકિર્દી અને જીવનની દિશા (કર્મ) દર્શાવે છે.',
      leftTitle: 'ડાબો હાથ (જન્મજાત ક્ષમતા)',
      leftDesc: 'તમારી આંતરિક શક્તિઓ અને પ્રારબ્ધ ક્ષમતા દર્શાવે છે.',
      confirmBtn: 'પસંદ કરેલા હાથથી આગળ વધો',
      backBtn: 'પાછા જાઓ',
    },
    scanner: {
      title: 'હથેળીને યોગ્ય રીતે ગોઠવો',
      alignGuide: 'સોનેરી આઉટલાઇનની અંદર હથેળી રાખો',
      switchCamera: 'કેમેરા બદલો',
      uploadPhoto: 'ફોટો અપલોડ કરો',
      takePhoto: 'ફોટો લો',
      backBtn: 'પાછા જાઓ',
      instructionFlat: 'હથેળીને કેમેરા સામે સીધી રાખો',
      instructionLight: 'સારા પ્રકાશમાં ફોટો લો',
      instructionFingers: 'આંગળીઓ સહેજ ખુલ્લી રાખો',
    },
    preview: {
      title: 'ફોટો ચકાસો',
      subtitle: 'ખાતરી કરો કે મુખ્ય રેખાઓ પડછાયા વગર સ્પષ્ટ દેખાય છે.',
      sharpnessLabel: 'ચિત્ર સ્પષ્ટતા',
      lightingLabel: 'પ્રકાશ સ્થિતિ',
      retakeBtn: 'ફરીથી ફોટો લો',
      analyzeBtn: 'વિશ્લેષણ કરો',
    },
    loading: {
      analyzingTitle: 'રેખાઓનું વિશ્લેષણ ચાલુ છે',
      synthesizingTitle: 'વાચન તૈયાર થઈ રહ્યું છે',
      step1: 'હૃદય, મસ્તક અને જીવન રેખાનું મેપિંગ...',
      step2: 'પર્વતોનું મૂલ્યાંકન...',
      step3: 'સામુદ્રિક ગ્રંથો સાથે સરખામણી...',
      step4: 'પરંપરાગત ફળકથન તૈયાર...',
    },
    overlay: {
      badge: 'ઓળખાયેલા લક્ષણો',
      title: 'તમારી હથેળીનો નકશો',
      subtitle: 'કમ્પ્યુટર વિઝન દ્વારા શોધાયેલ મુખ્ય રેખાઓ અને પર્વતો.',
      detectedLinesTitle: 'ઓળખાયેલ રેખાઓ',
      unlockBtn: 'સંપૂર્ણ વાચન ખોલો (₹૧૦)',
    },
    payment: {
      title: 'તમારું સંપૂર્ણ વાચન અનલૉક કરો',
      subtitle: 'પ્રેમ, કારકિર્દી, સ્વાસ્થ્ય અને પ્રતિભાનું ઊંડાણપૂર્વક વિશ્લેષણ.',
      amount: '₹૧૦',
      amountNote: 'એક વખતનું પેમેન્ટ • કોઈ સબ્સ્ક્રિપ્શન નહીં',
      upiPrompt: 'કોઈપણ UPI એપ દ્વારા સુરક્ષિત ચુકવણી કરો',
      payBtn: '₹૧૦ ચૂકવો',
      secureNote: '૧૦૦% સુરક્ષિત • ત્વરિત વાચન',
    },
    reading: {
      badge: 'પ્રમાણિત સામુદ્રિક વિશ્લેષણ',
      title: 'તમારું હસ્તરેખા વાચન',
      rightHandLabel: 'જમણો હાથ (કર્મ માર્ગ)',
      leftHandLabel: 'ડાબો હાથ (પ્રારબ્ધ માર્ગ)',
      tabReading: 'વિગતવાર વાચન',
      tabLines: 'રેખાઓનો નકશો',
      archetypeLabel: 'હસ્ત પ્રકૃતિ',
      whySeeingThisBtn: 'આ પરિણામ કેમ આવ્યું? (મૂળ સંદર્ભ જુઓ)',
      shareBtn: 'શેર કરો',
      newScanBtn: 'નવો સ્કેન',
      purgeBtn: 'ફોટો ડિલીટ કરો',
      purgeSuccess: 'તમારો ફોટો સર્વરમાંથી કાયમ માટે કાઢી નાખવામાં આવ્યો છે.',
      disclaimer: 'આ હસ્તરેખા વાચન પરંપરાગત ગ્રંથો પર આધારિત છે અને માત્ર સ્વ-અધ્યયન માટે છે.',
    },
    modal: {
      whyTitle: 'આ પરિણામ કેમ આવ્યું?',
      observationLabel: 'હથેળીનું પ્રત્યક્ષ નિરીક્ષણ',
      traditionalLabel: 'પરંપરાગત અર્થઘટન',
      variationTitle: 'પરંપરાગત ભિન્નતાની નોંધ',
      citationsLabel: 'ઐતિહાસિક ગ્રંથ સંદર્ભ',
      byAuthor: 'લેખક:',
      disclaimerNote: 'Kai RegAI શારીરિક લક્ષણોને સીધા શાસ્ત્રીય ગ્રંથો સાથે જોડે છે.',
      closeBtn: 'બંધ કરો',
    },
  },

  // 8. KANNADA (ಕನ್ನಡ)
  kn: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'ಸಾಂಪ್ರದಾಯಿಕ ಹಸ್ತಸಾಮುದ್ರಿಕ',
      notice: 'ಸೂಚನೆ',
      sources: 'ಮೂಲ ಗ್ರಂಥಗಳು',
      language: 'ಭಾಷೆ',
    },
    hero: {
      badge: 'ದೃಢೀಕರಿಸಿದ ಸಾಮುದ್ರಿಕ ಜ್ಞಾನ',
      title1: 'ನಿಮ್ಮ ಅಂಗೈ ರೇಖೆಗಳು',
      title2: 'ಏನು ಹೇಳುತ್ತವೆ ತಿಳಿಯಿರಿ',
      subtitle: 'ಪ್ರಾಚೀನ ಸಾಮುದ್ರಿಕ ಶಾಸ್ತ್ರ ಮತ್ತು ಪ್ರಸಿದ್ಧ ಗ್ರಂಥಗಳ ಆಧಾರದ ಮೇಲೆ ತತ್ಕ್ಷಣದ ಹಸ್ತಸಾಮುದ್ರಿಕ ಓದುವಿಕೆ.',
      cta: 'ಅಂಗೈ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      price: '₹10',
      trust1: 'ಖಾಸಗಿ ಮತ್ತು ಸುರಕ್ಷಿತ',
      trust2: '1928 ರ ಹಿಂದಿನ ಮೂಲ ಗ್ರಂಥಗಳು',
      trust3: 'ತತ್ಕ್ಷಣದ UPI ಪಾವತಿ',
    },
    handSelect: {
      title: 'ಯಾವ ಕೈಯನ್ನು ನೋಡಲು ಬಯಸುತ್ತೀರಿ?',
      subtitle: 'ಹಸ್ತಸಾಮುದ್ರಿಕದಲ್ಲಿ ಪ್ರತಿ ಕೈಗೂ ವಿಶಿಷ್ಟವಾದ ಅರ್ಥವಿದೆ.',
      rightTitle: 'ಬಲಗೈ (ಕರ್ಮ ಮತ್ತು ಪ್ರಸ್ತುತ ಪಥ)',
      rightDesc: 'ನಿಮ್ಮ ಪ್ರಜ್ಞಾಪೂರ್ವಕ ನಿರ್ಧಾರಗಳು, ವೃತ್ತಿ ಮತ್ತು ಜೀವನ ಮಾರ್ಗವನ್ನು (ಕರ್ಮ) ತೋರಿಸುತ್ತದೆ.',
      leftTitle: 'ಎಡಗೈ (ಹುಟ್ಟು ಸಾಮರ್ಥ್ಯ)',
      leftDesc: 'ನಿಮ್ಮ ಸಹಜ ಗುಣಗಳು, ಪ್ರತಿಭೆ ಮತ್ತು ಪ್ರಾರಬ್ಧವನ್ನು ತೋರಿಸುತ್ತದೆ.',
      confirmBtn: 'ಆಯ್ಕೆಮಾಡಿದ ಕೈಯಿಂದ ಮುಂದುವರಿಯಿರಿ',
      backBtn: 'ಹಿಂದಕ್ಕೆ',
    },
    scanner: {
      title: 'ಅಂಗೈಯನ್ನು ಸರಿಯಾಗಿ ಇರಿಸಿ',
      alignGuide: 'ಚಿನ್ನದ ಗೆರೆಯೊಳಗೆ ಅಂಗೈಯನ್ನು ಇರಿಸಿ',
      switchCamera: 'ಕ್ಯಾಮೆರಾ ಬದಲಾಯಿಸಿ',
      uploadPhoto: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      takePhoto: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
      backBtn: 'ಹಿಂದಕ್ಕೆ',
      instructionFlat: 'ಅಂಗೈಯನ್ನು ಕ್ಯಾಮೆರಾಗೆ ನೇರವಾಗಿ ಸಮತಟ್ಟಾಗಿ ಇರಿಸಿ',
      instructionLight: 'ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ಫೋಟೋ ತೆಗೆಯಿರಿ',
      instructionFingers: 'ಬೆರಳುಗಳನ್ನು ಸ್ವಲ್ಪ ಅಗಲವಾಗಿ ಇರಿಸಿ',
    },
    preview: {
      title: 'ಫೋಟೋ ಪರಿಶೀಲಿಸಿ',
      subtitle: 'ಮುಖ್ಯ ರೇಖೆಗಳು ನೆರಳಿಲ್ಲದೆ ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣಿಸುತ್ತಿವೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
      sharpnessLabel: 'ಸ್ಪಷ್ಟತೆ',
      lightingLabel: 'ಬೆಳಕು',
      retakeBtn: 'ಮತ್ತೆ ತೆಗೆಯಿರಿ',
      analyzeBtn: 'ವಿಶ್ಲೇಷಿಸಿ',
    },
    loading: {
      analyzingTitle: 'ರೇಖೆಗಳ ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ',
      synthesizingTitle: 'ಫಲಿತಾಂಶ ಸಿದ್ಧವಾಗುತ್ತಿದೆ',
      step1: 'ಹೃದಯ, ಮಸ್ತಿಷ್ಕ ಮತ್ತು ಆಯುಷ್ಯ ರೇಖೆಗಳ ಗುರುತಿಸುವಿಕೆ...',
      step2: 'ಗ್ರಹ ಪರ್ವತಗಳ ಪರಿಶೀಲನೆ...',
      step3: 'ಸಾಮುದ್ರಿಕ ಶಾಸ್ತ್ರದೊಂದಿಗೆ ಹೋಲಿಕೆ...',
      step4: 'ಪ್ರಮಾಣಿತ ಫಲಿತಾಂಶ ಸಿದ್ಧ...',
    },
    overlay: {
      badge: 'ಗುರುತಿಸಲಾದ ರೇಖೆಗಳು',
      title: 'ನಿಮ್ಮ ಅಂಗೈ ನಕ್ಷೆ',
      subtitle: 'ಕಂಪ್ಯೂಟರ್ ದೃಷ್ಟಿಯಿಂದ ಗುರುತಿಸಲಾದ ಪ್ರಮುಖ ರೇಖೆಗಳು.',
      detectedLinesTitle: 'ಗುರುತಿಸಲಾದ ರೇಖೆಗಳು',
      unlockBtn: 'ಸಂಪೂರ್ಣ ಫಲಿತಾಂಶ ನೋಡಿ (₹10)',
    },
    payment: {
      title: 'ಸಂಪೂರ್ಣ ಫಲಿತಾಂಶ ಅನ್‌ಲಾಕ್ ಮಾಡಿ',
      subtitle: 'ಪ್ರೀತಿ, ವೃತ್ತಿ, ಆರೋಗ್ಯ ಮತ್ತು ಪ್ರತಿಭೆಯ ಆಳವಾದ ಸಾಂಪ್ರದಾಯಿಕ ವಿಶ್ಲೇಷಣೆ.',
      amount: '₹10',
      amountNote: 'ಒಮ್ಮೆ ಮಾತ್ರ ಪಾವತಿ • ಯಾವುದೇ ಚಂದಾದಾರಿಕೆ ಇಲ್ಲ',
      upiPrompt: 'ಯಾವುದೇ UPI ಆ್ಯಪ್ ಮೂಲಕ ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸಿ',
      payBtn: '₹10 ಪಾವತಿಸಿ',
      secureNote: '100% ಸುರಕ್ಷಿತ • ತತ್ಕ್ಷಣ ಲಭ್ಯ',
    },
    reading: {
      badge: 'ಪ್ರಮಾಣಿತ ಸಾಮುದ್ರಿಕ ಫಲಿತಾಂಶ',
      title: 'ನಿಮ್ಮ ಹಸ್ತಸಾಮುದ್ರಿಕ ಫಲಿತಾಂಶ',
      rightHandLabel: 'ಬಲಗೈ (ಕರ್ಮ ಪಥ)',
      leftHandLabel: 'ಎಡಗೈ (ಪ್ರಾರಬ್ಧ ಪಥ)',
      tabReading: 'ವಿವರವಾದ ಫಲಿತಾಂಶ',
      tabLines: 'ರೇಖೆಗಳ ನಕ್ಷೆ',
      archetypeLabel: 'ಹಸ್ತ ಪ್ರಕೃತಿ',
      whySeeingThisBtn: 'ಈ ಫಲಿತಾಂಶ ಏಕೆ ಬಂತು? (ಮೂಲ ಗ್ರಂಥಗಳನ್ನು ವೀಕ್ಷಿಸಿ)',
      shareBtn: 'ಹಂಚಿಕೊಳ್ಳಿ',
      newScanBtn: 'ಹೊಸ ಸ್ಕ್ಯಾನ್',
      purgeBtn: 'ಫೋಟೋ ಅಳಿಸಿ',
      purgeSuccess: 'ನಿಮ್ಮ ಅಂಗೈ ಫೋಟೋವನ್ನು ಸರ್ವರ್‌ನಿಂದ ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಲಾಗಿದೆ.',
      disclaimer: 'ಈ ಫಲಿತಾಂಶವು ಸಾಂಪ್ರದಾಯಿಕ ಗ್ರಂಥಗಳ ಆಧಾರದ ಮೇಲಿದ್ದು, ಕೇವಲ ಸ್ವಯಂ-ಚಿಂತನೆಗಾಗಿ ಮಾತ್ರ.',
    },
    modal: {
      whyTitle: 'ಈ ಫಲಿತಾಂಶ ಏಕೆ ಬಂತು?',
      observationLabel: 'ಅಂಗೈಯ ಭೌತಿಕ ಲಕ್ಷಣಗಳು',
      traditionalLabel: 'ಸಾಂಪ್ರದಾಯಿಕ ವಿವರಣೆ',
      variationTitle: 'ಸಂಪ್ರದಾಯ ಭಿನ್ನತೆಯ ವಿವರ',
      citationsLabel: 'ಐತಿಹಾಸಿಕ ಗ್ರಂಥ ಉಲ್ಲೇಖಗಳು',
      byAuthor: 'ಲೇಖಕರು:',
      disclaimerNote: 'Kai RegAI ದೈಹಿಕ ಲಕ್ಷಣಗಳನ್ನು ನೇರವಾಗಿ ಸಾಂಪ್ರದಾಯಿಕ ಗ್ರಂಥಗಳಿಗೆ ಲಿಂಕ್ ಮಾಡುತ್ತದೆ.',
      closeBtn: 'ಮುಚ್ಚಿ',
    },
  },

  // 9. MALAYALAM (മലയാളം)
  ml: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'പാരമ്പര്യ ഹസ്തരേഖാശാസ്ത്രം',
      notice: 'വിവരം',
      sources: 'പ്രമാണ ഗ്രന്ഥങ്ങൾ',
      language: 'ഭാഷ',
    },
    hero: {
      badge: 'ആധികാരിക സാമുദ്രിക ശാസ്ത്രം',
      title1: 'നിങ്ങളുടെ കൈരേഖകൾ',
      title2: 'എന്താണ് പറയുന്നത്?',
      subtitle: 'പുരാതന സാമുദ്രിക ശാസ്ത്രത്തെയും ആധികാരിക ഗ്രന്ഥങ്ങളെയും അടിസ്ഥാനമാക്കിയുള്ള തത്സമയ എഐ ഹസ്തരേഖാ വിശകലനം.',
      cta: 'കൈ സ്കാൻ ചെയ്യുക',
      price: '₹10',
      trust1: 'രഹസ്യാത്മകവും സുരക്ഷിതവും',
      trust2: '1928-ന് മുമ്പുള്ള ആധികാരിക ഗ്രന്ഥങ്ങൾ',
      trust3: 'തത്സമയ UPI പെയ്‌മെന്റ്',
    },
    handSelect: {
      title: 'ഏത് കൈയാണ് നോക്കേണ്ടത്?',
      subtitle: 'ഹസ്തരേഖാശാസ്ത്രത്തിൽ ഓരോ കൈയ്ക്കും വ്യത്യസ്ത അർത്ഥങ്ങളുണ്ട്.',
      rightTitle: 'വലതു കൈ (കർമ്മ പഥം)',
      rightDesc: 'നിങ്ങളുടെ ബോധപൂർവമായ തീരുമാനങ്ങൾ, തൊഴിൽ, ജീവിത ദിശ (കർമ്മം) എന്നിവ പ്രതിഫലിപ്പിക്കുന്നു.',
      leftTitle: 'ഇടതു കൈ (ജന്മസിദ്ധമായ കഴിവുകൾ)',
      leftDesc: 'നിങ്ങളുടെ സഹജമായ കഴിവുകൾ, സ്വഭാവം, പ്രാരബ്ധം എന്നിവ കാണിക്കുന്നു.',
      confirmBtn: 'തിരഞ്ഞെടുത്ത കൈയുമായി തുടരുക',
      backBtn: 'പിന്നോട്ട്',
    },
    scanner: {
      title: 'കൈപ്പത്തി ക്രമീകരിക്കുക',
      alignGuide: 'സുവർണ്ണ രൂപരേഖയ്ക്കുള്ളിൽ കൈ വയ്ക്കുക',
      switchCamera: 'ക്യാമറ മാറ്റുക',
      uploadPhoto: 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
      takePhoto: 'ഫോട്ടോ എടുക്കുക',
      backBtn: 'പിന്നോട്ട്',
      instructionFlat: 'കൈ ക്യാമറയ്ക്ക് നേരെ പരത്തിപ്പിടിക്കുക',
      instructionLight: 'നല്ല വെളിച്ചത്തിൽ ഫോട്ടോ എടുക്കുക',
      instructionFingers: 'വിരലുകൾ ചെറുതായി അകറ്റി വയ്ക്കുക',
    },
    preview: {
      title: 'ഫോട്ടോ പരിശോധിക്കുക',
      subtitle: 'പ്രധാന രേഖകൾ നിഴലുകളില്ലാതെ വ്യക്തമാണെന്ന് ഉറപ്പുവരുത്തുക.',
      sharpnessLabel: 'വ്യക്തത',
      lightingLabel: 'വെളിച്ചം',
      retakeBtn: 'വീണ്ടും എടുക്കുക',
      analyzeBtn: 'വിശകലനം ചെയ്യുക',
    },
    loading: {
      analyzingTitle: 'രേഖകൾ പരിശോധിക്കുന്നു',
      synthesizingTitle: 'ഫലം തയ്യാറാകുന്നു',
      step1: 'ഹൃദയരേഖ, ബുദ്ധിരേഖ, ആയുർരേഖ എന്നിവ കണ്ടെത്തുന്നു...',
      step2: 'ഗ്രഹ പർവ്വതങ്ങളുടെ പരിശോധന...',
      step3: 'സാമുദ്രിക ശാസ്ത്ര ഗ്രന്ഥങ്ങളുമായി ഒത്തുനോക്കുന്നു...',
      step4: 'ആധികാരിക ഫലം തയ്യാറാക്കുന്നു...',
    },
    overlay: {
      badge: 'കണ്ടെത്തിയ രേഖകൾ',
      title: 'നിങ്ങളുടെ കൈപ്പത്തി ഭൂപടം',
      subtitle: 'കമ്പ്യൂട്ടർ വിഷൻ വഴി കണ്ടെത്തിയ പ്രധാന രേഖകളും പർവ്വതങ്ങളും.',
      detectedLinesTitle: 'കണ്ടെത്തിയ രേഖകൾ',
      unlockBtn: 'പൂർണ്ണ ഫലം കാണുക (₹10)',
    },
    payment: {
      title: 'പൂർണ്ണ ഫലം അൺലോക്ക് ചെയ്യുക',
      subtitle: 'സ്നേഹം, തൊഴിൽ, ആരോഗ്യം, പ്രതിഭ എന്നിവയെക്കുറിച്ചുള്ള സമഗ്രമായ വിശകലനം.',
      amount: '₹10',
      amountNote: 'ഒറ്റത്തവണ പേയ്‌മെന്റ് മാത്രം',
      upiPrompt: 'ഏതെങ്കിലും UPI ആപ്പ് വഴി സുരക്ഷിതമായി പണമടയ്ക്കുക',
      payBtn: '₹10 അടയ്ക്കുക',
      secureNote: '100% സുരക്ഷിതം • തത്സമയ ഫലം',
    },
    reading: {
      badge: 'ആധികാരിക സാമുദ്രിക ഫലം',
      title: 'നിങ്ങളുടെ ഹസ്തരേഖാ ഫലം',
      rightHandLabel: 'വലതു കൈ (കർമ്മ പഥം)',
      leftHandLabel: 'ഇടതു കൈ (ജന്മ പഥം)',
      tabReading: 'വിശദമായ ഫലം',
      tabLines: 'രേഖാ ഭൂപടം',
      archetypeLabel: 'ഹസ്ത പ്രകൃതി',
      whySeeingThisBtn: 'എന്തുകൊണ്ട് ഈ ഫലം വന്നു? (മൂലഗ്രന്ഥങ്ങൾ കാണുക)',
      shareBtn: 'പങ്കുവെക്കുക',
      newScanBtn: 'പുതിയ സ്കാൻ',
      purgeBtn: 'ഫോട്ടോ നീക്കം ചെയ്യുക',
      purgeSuccess: 'നിങ്ങളുടെ ഫോട്ടോ സെർവറിൽ നിന്ന് പൂർണ്ണമായി നീക്കം ചെയ്തു.',
      disclaimer: 'ഈ ഫലം പരമ്പരാഗത ഗ്രന്ഥങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്, ആത്മപരിശോധനയ്ക്ക് മാത്രമുള്ളതാണ്.',
    },
    modal: {
      whyTitle: 'എന്തുകൊണ്ട് ഈ ഫലം വന്നു?',
      observationLabel: 'കൈപ്പത്തിയുടെ ഭൗതിക രൂപം',
      traditionalLabel: 'പരമ്പരാഗത വ്യാഖ്യാനം',
      variationTitle: 'പരമ്പരാഗത വ്യത്യാസങ്ങൾ',
      citationsLabel: 'ഗ്രന്ഥ സൂചനകളും ഉദ്ധരണികളും',
      byAuthor: 'രചയിതാവ്:',
      disclaimerNote: 'Kai RegAI ശാരീരിക ലക്ഷണങ്ങളെ നേരിട്ട് പുരാതന ഗ്രന്ഥങ്ങളുമായി ബന്ധിപ്പിക്കുന്നു.',
      closeBtn: 'അടയ്ക്കുക',
    },
  },

  // 10. PUNJABI (ਪੰਜਾਬੀ)
  pa: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'ਪਾਰੰਪਰਿਕ ਹੱਥ ਰੇਖਾ ਗਿਆਨ',
      notice: 'ਸੂਚਨਾ',
      sources: 'ਪ੍ਰਮਾਣਿਤ ਗ੍ਰੰਥ',
      language: 'ਭਾਸ਼ਾ',
    },
    hero: {
      badge: 'ਪ੍ਰਮਾਣਿਤ ਸਾਮੁਦਰਿਕ ਸ਼ਾਸਤਰ ਗਿਆਨ',
      title1: 'ਜਾਣੋ ਤੁਹਾਡੇ ਹੱਥ ਦੀਆਂ ਰੇਖਾਵਾਂ',
      title2: 'ਕੀ ਕਹਿੰਦੀਆਂ ਹਨ',
      subtitle: 'ਪੁਰਾਤਨ ਸਾਮੁਦਰਿਕ ਸ਼ਾਸਤਰ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਗ੍ਰੰਥਾਂ \'ਤੇ ਅਧਾਰਤ ਤੁਰੰਤ ਏਆਈ ਹੱਥ ਰੇਖਾ ਵਿਸ਼ਲੇਸ਼ਣ।',
      cta: 'ਹੱਥ ਸਕੈਨ ਕਰੋ',
      price: '₹10',
      trust1: 'ਨਿੱਜੀ ਅਤੇ ਸੁਰੱਖਿਅਤ',
      trust2: '1928 ਤੋਂ ਪਹਿਲਾਂ ਦੇ ਅਸਲ ਗ੍ਰੰਥ',
      trust3: 'ਤੁਰੰਤ UPI ਭੁਗਤਾਨ',
    },
    handSelect: {
      title: 'ਕਿਹੜੇ ਹੱਥ ਦੀ ਰੇਖਾ ਦੇਖਣੀ ਹੈ?',
      subtitle: 'ਹੱਥ ਰੇਖਾ ਸ਼ਾਸਤਰ ਵਿੱਚ ਦੋਵਾਂ ਹੱਥਾਂ ਦਾ ਵੱਖਰਾ ਮਹੱਤਵ ਹੈ।',
      rightTitle: 'ਸੱਜਾ ਹੱਥ (ਕਰਮ ਅਤੇ ਮੌਜੂਦਾ ਮਾਰਗ)',
      rightDesc: 'ਤੁਹਾਡੇ ਫੈਸਲੇ, ਕਰੀਅਰ ਅਤੇ ਮੌਜੂਦਾ ਜੀਵਨ ਦਿਸ਼ਾ (ਕਰਮ) ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।',
      leftTitle: 'ਖੱਬਾ ਹੱਥ (ਕੁਦਰਤੀ ਸਮਰੱਥਾ)',
      leftDesc: 'ਤੁਹਾਡੀ ਅੰਦਰੂਨੀ ਪ੍ਰਤਿਭਾ ਅਤੇ ਪ੍ਰਾਰਬਧ ਸੁਭਾਅ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।',
      confirmBtn: 'ਚੁਣੇ ਹੋਏ ਹੱਥ ਨਾਲ ਅੱਗੇ ਵਧੋ',
      backBtn: 'ਪਿੱਛੇ ਜਾਓ',
    },
    scanner: {
      title: 'ਹੱਥ ਨੂੰ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਰੱਖੋ',
      alignGuide: 'ਸੁਨਹਿਰੀ ਲਾਈਨ ਦੇ ਅੰਦਰ ਹੱਥ ਰੱਖੋ',
      switchCamera: 'ਕੈਮਰਾ ਬਦਲੋ',
      uploadPhoto: 'ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ',
      takePhoto: 'ਫੋਟੋ ਖਿੱਚੋ',
      backBtn: 'ਪਿੱਛੇ ਜਾਓ',
      instructionFlat: 'ਹੱਥ ਨੂੰ ਕੈਮਰੇ ਦੇ ਸਾਹਮਣੇ ਸਿੱਧਾ ਰੱਖੋ',
      instructionLight: 'ਚੰਗੀ ਰੋਸ਼ਨੀ ਵਿੱਚ ਫੋਟੋ ਲਓ',
      instructionFingers: 'ਉਂਗਲਾਂ ਨੂੰ ਥੋੜ੍ਹਾ ਖੁੱਲ੍ਹਾ ਰੱਖੋ',
    },
    preview: {
      title: 'ਫੋਟੋ ਦੀ ਜਾਂਚ ਕਰੋ',
      subtitle: 'ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਮੁੱਖ ਰੇਖਾਵਾਂ ਬਿਨਾਂ ਪਰਛਾਵੇਂ ਦੇ ਸਾਫ਼ ਦਿਖਾਈ ਦੇ ਰਹੀਆਂ ਹਨ।',
      sharpnessLabel: 'ਸਪੱਸ਼ਟਤਾ',
      lightingLabel: 'ਰੋਸ਼ਨੀ',
      retakeBtn: 'ਦੁਬਾਰਾ ਫੋਟੋ ਲਓ',
      analyzeBtn: 'ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    },
    loading: {
      analyzingTitle: 'ਰੇਖਾਵਾਂ ਦੀ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ',
      synthesizingTitle: 'ਤੁਹਾਡਾ ਨਤੀਜਾ ਤਿਆਰ ਹੋ ਰਿਹਾ ਹੈ',
      step1: 'ਦਿਲ, ਦਿਮਾਗ ਅਤੇ ਜੀਵਨ ਰੇਖਾ ਦੀ ਪਛਾਣ...',
      step2: 'ਗ੍ਰਹਿ ਪਰਬਤਾਂ ਦਾ ਮੁਲਾਂਕਣ...',
      step3: 'ਸਾਮੁਦਰਿਕ ਸ਼ਾਸਤਰ ਨਾਲ ਮਿਲਾਨ...',
      step4: 'ਪ੍ਰਮਾਣਿਤ ਨਤੀਜਾ ਤਿਆਰ...',
    },
    overlay: {
      badge: 'ਪਛਾਣੀਆਂ ਗਈਆਂ ਰੇਖਾਵਾਂ',
      title: 'ਤੁਹਾਡੇ ਹੱਥ ਦਾ ਨਕਸ਼ਾ',
      subtitle: 'ਕੰਪਿਊਟਰ ਵਿਜ਼ਨ ਦੁਆਰਾ ਪਛਾਣੀਆਂ ਗਈਆਂ ਮੁੱਖ ਰੇਖਾਵਾਂ।',
      detectedLinesTitle: 'ਪਛਾਣੀਆਂ ਗਈਆਂ ਰੇਖਾਵਾਂ',
      unlockBtn: 'ਪੂਰਾ ਨਤੀਜਾ ਦੇਖੋ (₹10)',
    },
    payment: {
      title: 'ਆਪਣਾ ਪੂਰਾ ਨਤੀਜਾ ਅਨਲੌਕ ਕਰੋ',
      subtitle: 'ਪਿਆਰ, ਕਰੀਅਰ, ਸਿਹਤ ਅਤੇ ਬੁੱਧੀ ਦਾ ਵਿਸਤ੍ਰਿਤ ਵਿਸ਼ਲੇਸ਼ਣ।',
      amount: '₹10',
      amountNote: 'ਸਿਰਫ਼ ਇੱਕ ਵਾਰ ਭੁਗਤਾਨ • ਕੋਈ ਸਬਸਕ੍ਰਿਪਸ਼ਨ ਨਹੀਂ',
      upiPrompt: 'ਕਿਸੇ ਵੀ UPI ਐਪ ਰਾਹੀਂ ਸੁਰੱਖਿਅਤ ਭੁਗਤਾਨ ਕਰੋ',
      payBtn: '₹10 ਭੁਗਤਾਨ ਕਰੋ',
      secureNote: '100% ਸੁਰੱਖਿਅਤ • ਤੁਰੰਤ ਨਤੀਜਾ',
    },
    reading: {
      badge: 'ਪ੍ਰਮਾਣਿਤ ਸਾਮੁਦਰਿਕ ਵਿਸ਼ਲੇਸ਼ਣ',
      title: 'ਤੁਹਾਡਾ ਹੱਥ ਰੇਖਾ ਨਤੀਜਾ',
      rightHandLabel: 'ਸੱਜਾ ਹੱਥ (ਕਰਮ ਮਾਰਗ)',
      leftHandLabel: 'ਖੱਬਾ ਹੱਥ (ਪ੍ਰਾਰਬਧ ਮਾਰਗ)',
      tabReading: 'ਵਿਸਤ੍ਰਿਤ ਨਤੀਜਾ',
      tabLines: 'ਰੇਖਾਵਾਂ ਦਾ ਨਕਸ਼ਾ',
      archetypeLabel: 'ਹੱਥ ਦੀ ਪ੍ਰਕਿਰਤੀ',
      whySeeingThisBtn: 'ਇਹ ਨਤੀਜਾ ਕਿਉਂ ਆਇਆ? (ਅਸਲ ਗ੍ਰੰਥ ਵੇਖੋ)',
      shareBtn: 'ਕਾਰਡ ਸ਼ੇਅਰ ਕਰੋ',
      newScanBtn: 'ਨਵਾਂ ਸਕੈਨ',
      purgeBtn: 'ਫੋਟੋ ਹਟਾਓ',
      purgeSuccess: 'ਤੁਹਾਡੀ ਹੱਥ ਦੀ ਫੋਟੋ ਸਰਵਰ ਤੋਂ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਹਟਾ ਦਿੱਤੀ ਗਈ ਹੈ।',
      disclaimer: 'ਇਹ ਨਤੀਜਾ ਪਾਰੰਪਰਿਕ ਗ੍ਰੰਥਾਂ \'ਤੇ ਅਧਾਰਤ ਹੈ ਅਤੇ ਕੇਵਲ ਆਤਮ-ਚਿੰਤਨ ਲਈ ਹੈ।',
    },
    modal: {
      whyTitle: 'ਇਹ ਨਤੀਜਾ ਕਿਉਂ ਆਇਆ?',
      observationLabel: 'ਹੱਥ ਦਾ ਭੌਤਿਕ ਨਿਰੀਖਣ',
      traditionalLabel: 'ਪਾਰੰਪਰਿਕ ਅਰਥ',
      variationTitle: 'ਵੱਖ-ਵੱਖ ਪਰੰਪਰਾਵਾਂ ਦੇ ਭੇਦ',
      citationsLabel: 'ਇਤਿਹਾਸਕ ਗ੍ਰੰਥ ਹਵਾਲੇ',
      byAuthor: 'ਲੇਖਕ:',
      disclaimerNote: 'Kai RegAI ਹੱਥ ਦੇ ਲੱਛਣਾਂ ਨੂੰ ਸਿੱਧਾ ਪੁਰਾਤਨ ਗ੍ਰੰਥਾਂ ਨਾਲ ਜੋੜਦਾ ਹੈ।',
      closeBtn: 'ਬੰਦ ਕਰੋ',
    },
  },

  // 11. ODIA (ଓଡ଼ିଆ)
  or: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'ପାରମ୍ପରିକ ହସ୍ତରେଖା ଶାସ୍ତ୍ର',
      notice: 'ସୂଚନା',
      sources: 'ପ୍ରାମାଣିକ ଗ୍ରନ୍ଥ',
      language: 'ଭାଷା',
    },
    hero: {
      badge: 'ପ୍ରାମାଣିକ ସାମୁଦ୍ରିକ ଶାସ୍ତ୍ର ଜ୍ଞାନ',
      title1: 'ଜାଣନ୍ତୁ ଆପଣଙ୍କ ହାତର ରେଖା',
      title2: 'କଣ କହୁଛି',
      subtitle: 'ପ୍ରାଚୀନ ସାମୁଦ୍ରିକ ଶାସ୍ତ୍ର ଏବଂ ପ୍ରାମାଣିକ ଗ୍ରନ୍ଥ ଉପରେ ଆଧାରିତ ତତ୍କାଳ ଏଆଇ ହସ୍ତରେଖା ବିଶ୍ଳେଷଣ।',
      cta: 'ହାତ ସ୍କାନ କରନ୍ତୁ',
      price: '₹10',
      trust1: 'ଗୋପନୀୟ ଏବଂ ସୁରକ୍ଷିତ',
      trust2: '1928 ପୂର୍ବର ମୂଳ ଗ୍ରନ୍ଥ',
      trust3: 'ତତ୍କାଳ UPI ପେମେଣ୍ଟ',
    },
    handSelect: {
      title: 'କେଉଁ ହାତ ଦେଖିବାକୁ ଚାହାଁନ୍ତି?',
      subtitle: 'ହସ୍ତରେଖା ଶାସ୍ତ୍ରରେ ଦୁଇଟି ହାତର ଭିନ୍ନ ଭିନ୍ନ ମହତ୍ତ୍ୱ ରହିଛି।',
      rightTitle: 'ଡାହାଣ ହାତ (କର୍ମ ଓ ବର୍ତ୍ତମାନ ପଥ)',
      rightDesc: 'ଆପଣଙ୍କର ସଚେତନ ନିଷ୍ପତ୍ତି, କ୍ୟାରିୟର ଏବଂ ଜୀବନର ଦିଗ (କର୍ମ) ଦର୍ଶାଏ।',
      leftTitle: 'ବାମ ହାତ (ଜନ୍ମଗତ ସାମର୍ଥ୍ୟ)',
      leftDesc: 'ଆପଣଙ୍କର ସହଜାତ ପ୍ରତିଭା, ପ୍ରକୃତି ଏବଂ ପ୍ରାରବ୍ଧ ଦର୍ଶାଏ।',
      confirmBtn: 'ମନୋନୀତ ହାତ ସହିତ ଆଗକୁ ବଢ଼ନ୍ତୁ',
      backBtn: 'ପଛକୁ',
    },
    scanner: {
      title: 'ହାତକୁ ଠିକ ଭାବେ ରଖନ୍ତୁ',
      alignGuide: 'ସୁନେଲି ଗାର ଭିତରେ ହାତ ରଖନ୍ତୁ',
      switchCamera: 'କ୍ୟାମେରା ବଦଳାନ୍ତୁ',
      uploadPhoto: 'ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ',
      takePhoto: 'ଫଟୋ ଉଠାନ୍ତୁ',
      backBtn: 'ପଛକୁ',
      instructionFlat: 'ହାତକୁ କ୍ୟାମେରା ସମ୍ମୁଖରେ ସିଧା ରଖନ୍ତୁ',
      instructionLight: 'ଭଲ ଆଲୋକରେ ଫଟୋ ନିଅନ୍ତୁ',
      instructionFingers: 'ଆଙ୍ଗୁଠିଗୁଡ଼ିକୁ ଟିକେ ଖୋଲା ରଖନ୍ତୁ',
    },
    preview: {
      title: 'ଫଟୋ ଯାଞ୍ଚ କରନ୍ତୁ',
      subtitle: 'ମୁଖ୍ୟ ରେଖାଗୁଡ଼ିକ ଛାଇ ବିନା ସ୍ପଷ୍ଟ ଦେଖାଯାଉଛି କି ନାହିଁ ନିଶ୍ଚିତ କରନ୍ତୁ।',
      sharpnessLabel: 'ସ୍ପଷ୍ଟତା',
      lightingLabel: 'ଆଲୋକ',
      retakeBtn: 'ପୁଣି ଫଟୋ ନିଅନ୍ତୁ',
      analyzeBtn: 'ବିଶ୍ଳେଷଣ କରନ୍ତୁ',
    },
    loading: {
      analyzingTitle: 'ରେଖାଗୁଡ଼ିକ ବିଶ୍ଳେଷଣ ହେଉଛି',
      synthesizingTitle: 'ଫଳାଫଳ ପ୍ରସ୍ତୁତ ହେଉଛି',
      step1: 'ହୃଦୟ, ମସ୍ତିଷ୍କ ଓ ଜୀବନ ରେଖା ଚିହ୍ନଟ...',
      step2: 'ଗ୍ରହ ପର୍ବତଗୁଡ଼ିକର ମୂଲ୍ୟାଙ୍କନ...',
      step3: 'ସାମୁଦ୍ରିକ ଶାସ୍ତ୍ର ସହିତ ମେଳନ...',
      step4: 'ପ୍ରାମାଣିକ ଫଳାଫଳ ପ୍ରସ୍ତୁତ...',
    },
    overlay: {
      badge: 'ଚିହ୍ନଟ ହୋଇଥିବା ରେଖା',
      title: 'ଆପଣଙ୍କ ହାତର ନକ୍ସା',
      subtitle: 'କମ୍ପ୍ୟୁଟର ଭିଜନ ଦ୍ୱାରା ଚିହ୍ନଟ ପ୍ରମୁଖ ରେଖାଗୁଡ଼ିକ।',
      detectedLinesTitle: 'ଚିହ୍ନଟ ରେଖା',
      unlockBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ଫଳାଫଳ ଦେଖନ୍ତୁ (₹10)',
    },
    payment: {
      title: 'ଆପଣଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ଫଳାଫଳ ଅନଲକ୍ କରନ୍ତୁ',
      subtitle: 'ପ୍ରେମ, କ୍ୟାରିୟର, ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ବୁଦ୍ଧିର ବିସ୍ତୃତ ବିଶ୍ଳେଷଣ।',
      amount: '₹10',
      amountNote: 'ଥରେ ମାତ୍ର ପେମେଣ୍ଟ • କୌଣସି ସବସ୍କ୍ରିପସନ ନାହିଁ',
      upiPrompt: 'ଯେକୌଣସି UPI ଆପ୍ ମାଧ୍ୟମରେ ସୁରକ୍ଷିତ ପେମେଣ୍ଟ କରନ୍ତୁ',
      payBtn: '₹10 ପେମେଣ୍ଟ କରନ୍ତୁ',
      secureNote: '100% ସୁରକ୍ଷିତ • ତତ୍କାଳ ଫଳାଫଳ',
    },
    reading: {
      badge: 'ପ୍ରାମାଣିକ ସାମୁଦ୍ରିକ ବିଶ୍ଳେଷଣ',
      title: 'ଆପଣଙ୍କ ହସ୍ତରେଖା ଫଳାଫଳ',
      rightHandLabel: 'ଡାହାଣ ହାତ (କର୍ମ ପଥ)',
      leftHandLabel: 'ବାମ ହାତ (ପ୍ରାରବ୍ଧ ପଥ)',
      tabReading: 'ବିସ୍ତୃତ ଫଳାଫଳ',
      tabLines: 'ରେଖା ନକ୍ସା',
      archetypeLabel: 'ହସ୍ତ ପ୍ରକୃତି',
      whySeeingThisBtn: 'ଏହି ଫଳାଫଳ କାହିଁକି ଆସିଲା? (ମୂଳ ଗ୍ରନ୍ଥ ଦେଖନ୍ତୁ)',
      shareBtn: 'କାର୍ଡ ଶେୟାର କରନ୍ତୁ',
      newScanBtn: 'ନୂଆ ସ୍କାନ',
      purgeBtn: 'ଫଟୋ ହଟାନ୍ତୁ',
      purgeSuccess: 'ଆପଣଙ୍କ ହାତର ଫଟୋ ସର୍ଭରରୁ ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ହଟାଇ ଦିଆଯାଇଛି।',
      disclaimer: 'ଏହି ଫଳାଫଳ ପାରମ୍ପରିକ ଗ୍ରନ୍ଥ ଉପରେ ଆଧାରିତ ଏବଂ କେବଳ ଆତ୍ମ-ଅନୁସନ୍ଧାନ ପାଇଁ ଉଦ୍ଦିଷ୍ଟ।',
    },
    modal: {
      whyTitle: 'ଏହି ଫଳାଫଳ କାହିଁକି ଆସିଲା?',
      observationLabel: 'ହାତର ଭୌତିକ ନିରୀକ୍ଷଣ',
      traditionalLabel: 'ପାରମ୍ପରିକ ବ୍ୟାଖ୍ୟା',
      variationTitle: 'ପରମ୍ପରାଗତ ପାର୍ଥକ୍ୟର ସୂଚନା',
      citationsLabel: 'ଗ୍ରନ୍ଥ ଉଦ୍ଧୃତି ଓ ସୂତ୍ର',
      byAuthor: 'ଲେଖକ:',
      disclaimerNote: 'Kai RegAI ଶାରୀରିକ ଲକ୍ଷଣଗୁଡ଼ିକୁ ସିଧାସଳଖ ପ୍ରାମାଣିକ ଗ୍ରନ୍ଥ ସହିତ ଯୋଡ଼ିଥାଏ।',
      closeBtn: 'ବନ୍ଦ କରନ୍ତୁ',
    },
  },

  // 12. ASSAMESE (অসমীয়া)
  as: {
    nav: {
      brand: 'Kai RegAI',
      tagline: 'পাৰম্পৰিক হস্তৰেখা বিদ্যা',
      notice: 'বিজ্ঞপ্তি',
      sources: 'আকৰ গ্ৰন্থ',
      language: 'ভাষা',
    },
    hero: {
      badge: 'প্ৰমাণিত সামুদ্ৰিক শাস্ত্ৰ জ্ঞান',
      title1: 'জানো আহক আপোনাৰ হাতৰ তলুৱা',
      title2: 'কি কৈছে',
      subtitle: 'প্ৰাচীন সামুদ্ৰিক শাস্ত্ৰ আৰু প্ৰামাণিক গ্ৰন্থৰ ওপৰত আধাৰিত ক্ষিপ্ৰ এআই হস্তৰেখা বিশ্লেষণ।',
      cta: 'হাত স্কেন কৰক',
      price: '₹১০',
      trust1: 'গোপনীয় আৰু সুৰক্ষিত',
      trust2: '১৯২৮ চনৰ পূৰ্বৰ মূল গ্ৰন্থ',
      trust3: 'তৎক্ষণাৎ UPI পেমেণ্ট',
    },
    handSelect: {
      title: 'কোনখন হাত চাব বিচাৰে?',
      subtitle: 'হস্তৰেখা শাস্ত্ৰত দুয়োখন হাতৰ সুকীয়া গুৰুত্ব আছে।',
      rightTitle: 'সোঁহাত (কৰ্ম আৰু বৰ্তমান পথ)',
      rightDesc: 'আপোনাৰ সচেতন সিদ্ধান্ত, কৰ্মজীৱন আৰু জীৱনৰ পথ (কৰ্ম) প্ৰকাশ কৰে।',
      leftTitle: 'বাওঁহাত (জন্মগত সম্ভাৱনা)',
      leftDesc: 'আপোনাৰ অন্তৰ্নিহিত প্ৰতিভা আৰু প্ৰাৰব্ধ প্ৰকৃতি প্ৰকাশ কৰে।',
      confirmBtn: 'নিৰ্বাচিত হাতৰ সৈতে আগবাঢ়ক',
      backBtn: 'পিছলৈ',
    },
    scanner: {
      title: 'হাতখন সঠিকভাৱে ৰাখক',
      alignGuide: 'সোণালী সীমাৰ ভিতৰত হাতখন ৰাখক',
      switchCamera: 'কেমেৰা সলনি কৰক',
      uploadPhoto: 'ফটো আপলোড কৰক',
      takePhoto: 'ফটো তোলক',
      backBtn: 'পিছলৈ',
      instructionFlat: 'হাতখন কেমেৰাৰ সন্মুখত পোনকৈ ৰাখক',
      instructionLight: 'উজ্জ্বল পোহৰত ফটো তোলক',
      instructionFingers: 'আঙুলিবোৰ সামান্য মেলি ৰাখক',
    },
    preview: {
      title: 'ফটো পৰীক্ষা কৰক',
      subtitle: 'নিশ্চিত কৰক যে প্ৰধান ৰেখাবোৰ ছাঁ নপৰাকৈ স্পষ্ট দেখা গৈছে।',
      sharpnessLabel: 'স্পষ্টতা',
      lightingLabel: 'পোহৰৰ অৱস্থা',
      retakeBtn: 'পুনৰ ফটো তোলক',
      analyzeBtn: 'বিশ্লেষণ কৰক',
    },
    loading: {
      analyzingTitle: 'ৰেখাবোৰ বিশ্লেষণ কৰা হৈছে',
      synthesizingTitle: 'ফলাফল প্ৰস্তুত হৈছে',
      step1: 'হৃদয়, মস্তিষ্ক আৰু জীৱন ৰেখা চিনাক্তকৰণ...',
      step2: 'গ্ৰহ পৰ্বতবোৰৰ মূল্যাঙ্কন...',
      step3: 'সামুদ্ৰিক শাস্ত্ৰৰ সৈতে তুলনা...',
      step4: 'প্ৰামাণিক ফলাফল সাজু হৈছে...',
    },
    overlay: {
      badge: 'চিনাক্ত ৰেখাসমূহ',
      title: 'আপোনাৰ হাতৰ মানচিত্ৰ',
      subtitle: 'কম্পিউটাৰ ভিজনৰ দ্বাৰা চিনাক্ত কৰা প্ৰধান ৰেখাসমূহ।',
      detectedLinesTitle: 'চিনাক্ত ৰেখা',
      unlockBtn: 'সম্পূৰ্ণ ফলাফল চাওক (₹১০)',
    },
    payment: {
      title: 'আপোনাৰ সম্পূৰ্ণ ফলাফল আনলক কৰক',
      subtitle: 'প্ৰেম, কেৰিয়াৰ, স্বাস্থ্য আৰু প্ৰতিভাৰ বিস্তৃত বিশ্লেষণ।',
      amount: '₹১০',
      amountNote: 'কেৱল এবাৰ পেমেণ্ট • কোনো ছাবস্ক্ৰিপচন নাই',
      upiPrompt: 'যিকোনো UPI এপৰ জৰিয়তে সুৰক্ষিত পেমেণ্ট কৰক',
      payBtn: '₹১০ পৰিশোধ কৰক',
      secureNote: '১০০% সুৰক্ষিত • ক্ষিপ্ৰ ফলাফল',
    },
    reading: {
      badge: 'প্ৰমাণিত সামুদ্ৰিক বিশ্লেষণ',
      title: 'আপোনাৰ হস্তৰেখা ফলাফল',
      rightHandLabel: 'সোঁহাত (কৰ্ম পথ)',
      leftHandLabel: 'বাওঁহাত (প্ৰাৰব্ধ পথ)',
      tabReading: 'বিস্তাৰিত ফলাফল',
      tabLines: 'ৰেখাৰ মানচিত্ৰ',
      archetypeLabel: 'হস্ত প্ৰকৃতি',
      whySeeingThisBtn: 'এই ফলাফল কিয় আহিল? (মূল গ্ৰন্থ চাওক)',
      shareBtn: 'কাৰ্ড শ্বেয়াৰ কৰক',
      newScanBtn: 'নতুন স্কেন',
      purgeBtn: 'ফটো মচি পেলাওক',
      purgeSuccess: 'আপোনাৰ হাতৰ ফটো চাৰ୍ভাৰৰ পৰা সম্পূৰ্ণভাৱে মচি পেলোৱা হৈছে।',
      disclaimer: 'এই ফলাফল পাৰম্পৰিক গ্ৰন্থৰ ওপৰত আধাৰিত আৰু কেৱল আত্ম-অনুসন্ধানৰ বাবেহে।',
    },
    modal: {
      whyTitle: 'এই ফলাফল কিয় আহিল?',
      observationLabel: 'হাতৰ ভৌতিক নিৰীক্ষণ',
      traditionalLabel: 'পাৰম্পৰিক ব্যাখ্যা',
      variationTitle: 'পৰম্পৰাগত পাৰ্থক্যৰ জাননী',
      citationsLabel: 'ঐতিহাসিক গ্ৰন্থৰ সূত্ৰ',
      byAuthor: 'লেখক:',
      disclaimerNote: 'Kai RegAI শাৰীৰিক লক্ষণবোৰ পোনপটীয়াকৈ প্ৰামাণিক গ্ৰন্থৰ সৈতে সংযোগ কৰে।',
      closeBtn: 'বন্ধ কৰক',
    },
  },
};
