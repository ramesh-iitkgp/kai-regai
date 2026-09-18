/**
 * Full Native-Language Content for the Landing Page of Kai RegAI.
 * Covers Hero, How It Works, 5 Explore Dimensions, Value Pillars, and Closing CTA.
 */

export interface LandingLocaleData {
  tagline1: string;
  tagline2: string;
  subtitle: string;
  scanCta: string;
  seeHowItWorks: string;
  stepsBadge: string;
  howItWorksTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  exploreBadge: string;
  exploreTitle: string;
  exploreSubtitle: string;
  themes: {
    love: { title: string; subtitle: string; lineName: string };
    career: { title: string; subtitle: string; lineName: string };
    money: { title: string; subtitle: string; lineName: string };
    mind: { title: string; subtitle: string; lineName: string };
    life: { title: string; subtitle: string; lineName: string };
  };
  trustBadge: string;
  trustTitle: string;
  pillars: Array<{ title: string; desc: string }>;
  closingTitle: string;
  closingDesc: string;
  closingCta: string;
}

export const LANDING_LOCALES: Record<string, LandingLocaleData> = {
  // 1. ENGLISH
  en: {
    tagline1: 'Discover the story',
    tagline2: 'in your hands.',
    subtitle: 'Instant, respectful palm interpretation synthesized from classical Samudrika principles by vision AI.',
    scanCta: 'Scan My Palm',
    seeHowItWorks: 'See How It Works',
    stepsBadge: 'Simple 3-Step Flow',
    howItWorksTitle: 'How Kai RegAI Works',
    step1Title: 'Capture your palm',
    step1Desc: 'Take a clear photo with your phone camera or upload from your gallery.',
    step2Title: 'AI reads visible palm features',
    step2Desc: 'Vision algorithms locate heart, head, and life lines plus mount prominences.',
    step3Title: 'Discover your personalized reading',
    step3Desc: 'Receive non-deterministic, source-grounded insights for reflection and shareable card.',
    exploreBadge: '5 Life Dimensions',
    exploreTitle: 'What Kai Can Explore',
    exploreSubtitle: 'Traced from traditional palmistry landmarks',
    themes: {
      love: { title: 'Love & Relationships', subtitle: 'Emotional depth, empathy & bonding style', lineName: 'Heart Line' },
      career: { title: 'Career & Ambition', subtitle: 'Vocational drive, autonomy & mastery', lineName: 'Fate Line' },
      money: { title: 'Money & Prosperity', subtitle: 'Abundance mindset & resource retention', lineName: 'Sun Line' },
      mind: { title: 'Innate Personality', subtitle: 'Cognitive focus & mental imagination', lineName: 'Head Line' },
      life: { title: 'Life Themes & Vitality', subtitle: 'Physical stamina, ojas & resilience', lineName: 'Life Line' },
    },
    trustBadge: 'Source-Grounded AI',
    trustTitle: 'Why Trust Kai RegAI',
    pillars: [
      { title: 'AI-Powered Palm Analysis', desc: 'Computer vision maps real palm contours, crease depth, and mount elevations in seconds.' },
      { title: 'Traditional Interpretations', desc: 'Grounded in classical Indian Samudrika Shastra & 19th-century Western Chiromancy sources.' },
      { title: 'Personalized Reading', desc: 'Synthesized strictly from your unique hand structure — no canned horoscope text.' },
      { title: '12 Indian Languages', desc: 'Read comfortably in Hindi, Tamil, Telugu, Bengali, Marathi, and 7 other regional languages.' },
      { title: 'Private & Simple', desc: 'Never sold or used for public training. Erase your scan at any time with one tap.' },
    ],
    closingTitle: 'Your hands carry patterns shaped over a lifetime',
    closingDesc: 'Discover the classical reflections held in your palm with modern AI.',
    closingCta: 'Begin Your Reading',
  },

  // 2. HINDI (हिन्दी)
  hi: {
    tagline1: 'जानिए आपकी हथेली',
    tagline2: 'क्या कहती है।',
    subtitle: 'प्राचीन सामुद्रिक शास्त्र और प्रामाणिक ग्रंथों पर आधारित आधुनिक एआई हस्तरेखा विश्लेषण।',
    scanCta: 'हथेली स्कैन करें',
    seeHowItWorks: 'जानिए यह कैसे काम करता है',
    stepsBadge: 'सरल 3-चरणीय प्रक्रिया',
    howItWorksTitle: 'Kai RegAI कैसे काम करता है',
    step1Title: 'हथेली की फोटो लें',
    step1Desc: 'अपने फोन कैमरे से साफ फोटो खींचें या गैलरी से अपलोड करें।',
    step2Title: 'एआई मुख्य रेखाओं की पहचान करता है',
    step2Desc: 'कंप्यूटर विज़न हृदय, मस्तिष्क, जीवन रेखा और ग्रह पर्वतों का सटीक विश्लेषण करता है।',
    step3Title: 'अपना व्यक्तिगत फलकथन पाएं',
    step3Desc: 'आत्म-चिंतन के लिए प्रामाणिक ग्रंथों पर आधारित सम्मानजनक अंतर्दृष्टि प्राप्त करें।',
    exploreBadge: '5 जीवन आयाम',
    exploreTitle: 'Kai क्या विश्लेषित कर सकता है',
    exploreSubtitle: 'पारंपरिक सामुद्रिक लक्षणों द्वारा पहचाना गया',
    themes: {
      love: { title: 'प्रेम एवं संबंध', subtitle: 'भावनात्मक गहराई, संवेदनशीलता और संबंध शैली', lineName: 'हृदय रेखा' },
      career: { title: 'करियर एवं महत्वाकांक्षा', subtitle: 'कार्य दिशा, स्वतंत्रता और सफलता की प्रेरणा', lineName: 'भाग्य रेखा' },
      money: { title: 'धन एवं समृद्धि', subtitle: 'संसाधन प्रतिधारण और समृद्धि की मानसिकता', lineName: 'सूर्य रेखा' },
      mind: { title: 'मूल स्वभाव एवं बुद्धि', subtitle: 'मानसिक एकाग्रता, निर्णय क्षमता और कल्पनाशीलता', lineName: 'मस्तिष्क रेखा' },
      life: { title: 'जीवन शक्ति एवं स्वास्थ्य', subtitle: 'शारीरिक ऊर्जा, ओज और सहनशीलता', lineName: 'जीवन रेखा' },
    },
    trustBadge: 'प्रामाणिक शास्त्रीय एआई',
    trustTitle: 'Kai RegAI पर विश्वास क्यों?',
    pillars: [
      { title: 'एआई आधारित हस्त विश्लेषण', desc: 'कंप्यूटर विज़न द्वारा हथेली के आकार और रेखाओं का सटीक मानचित्रण।' },
      { title: 'पारंपरिक शास्त्रीय व्याख्या', desc: 'प्राचीन सामुद्रिक शास्त्र और प्रामाणिक पाश्चात्य ग्रंथों पर आधारित।' },
      { title: 'व्यक्तिगत फलकथन', desc: 'आपकी अनूठी हस्त संरचना से तैयार — कोई सामान्य या दोहराया गया राशिफल नहीं।' },
      { title: '12 भारतीय भाषाएं', desc: 'हिन्दी, தமிழ், తెలుగు, বাংলা सहित अपनी मातृभाषा में सहज पढ़ें।' },
      { title: 'गोपनीय व सुरक्षित', desc: 'डेटा कभी बेचा नहीं जाता। एक क्लिक में अपनी फोटो हटाएं।' },
    ],
    closingTitle: 'आपकी हथेलियों में जीवन के अनुभव अंकित हैं',
    closingDesc: 'आधुनिक एआई की सहायता से अपनी हथेली के शास्त्रीय फलकथन को समझें।',
    closingCta: 'अपना विश्लेषण शुरू करें',
  },

  // 3. TAMIL (தமிழ்)
  ta: {
    tagline1: 'உங்கள் கைரேகை சொல்லும்',
    tagline2: 'கதையை அறியுங்கள்.',
    subtitle: 'பண்டைய சாமுத்ரிகா சாஸ்திரம் மற்றும் வரலாற்று நூல்களின் அடிப்படையில் நவீன ஏஐ கைரேகை பலன்கள்.',
    scanCta: 'கைரேகை ஸ்கேன் செய்',
    seeHowItWorks: 'இது எவ்வாறு இயங்குகிறது',
    stepsBadge: 'எளிய 3-படிகள்',
    howItWorksTitle: 'Kai RegAI செயல்படும் விதம்',
    step1Title: 'கைரேகையை படம் பிடிக்கவும்',
    step1Desc: 'உங்கள் போன் கேமரா மூலம் தெளிவான படத்தை எடுக்கவும் அல்லது கேலரியில் இருந்து பதிவேற்றவும்.',
    step2Title: 'ஏஐ முக்கிய ரேகைகளை ஆராய்கிறது',
    step2Desc: 'இதய ரேகை, புத்தி ரேகை, ஆயுள் ரேகை மற்றும் மேடுகளை நுட்பமாக கணக்கிடுகிறது.',
    step3Title: 'உங்கள் பிரத்யேக பலனைப் பெறுங்கள்',
    step3Desc: 'பண்டைய சாஸ்திர ஆதாரங்களுடன் கூடிய தனிப்பயனாக்கப்பட்ட பலன்களை உடனடியாகப் படியுங்கள்.',
    exploreBadge: '5 வாழ்க்கை பரிமாணங்கள்',
    exploreTitle: 'Kai என்ன ஆராய்கிறது',
    exploreSubtitle: 'பாரம்பரிய கைரேகை அமைப்பிலிருந்து பெறப்பட்டது',
    themes: {
      love: { title: 'அன்பு & உறவுகள்', subtitle: 'உணர்ச்சி ஆழம் மற்றும் பாசப் பிணைப்பு விதம்', lineName: 'இதய ரேகை' },
      career: { title: 'தொழில் & லட்சியம்', subtitle: 'தொழில் முனைவு, சுயாட்சி மற்றும் ஆற்றல்', lineName: 'விதி ரேகை' },
      money: { title: 'செல்வம் & வளம்', subtitle: 'வளங்களைத் தக்கவைக்கும் மனநிலை மற்றும் செழிப்பு', lineName: 'சூரிய ரேகை' },
      mind: { title: 'இயல்பான ஆளுமை', subtitle: 'கூர்மையான சிந்தனை மற்றும் அறிவுக்கூர்மை', lineName: 'புத்தி ரேகை' },
      life: { title: 'ஆயுள் & உயிர்சக்தி', subtitle: 'உடல் உறுதி, ஓஜஸ் மற்றும் சகிப்புத்தன்மை', lineName: 'ஆயுள் ரேகை' },
    },
    trustBadge: 'சாஸ்திர அடிப்படையிலான ஏஐ',
    trustTitle: 'Kai RegAI மீது ஏன் நம்பிக்கை வைக்க வேண்டும்?',
    pillars: [
      { title: 'ஏஐ கைரேகை பகுப்பாய்வு', desc: 'நொடிகள் தோறும் துல்லியமாக ரேகைகளையும் மேடுகளையும் கணக்கிடுகிறது.' },
      { title: 'பாரம்பரிய சாமுத்ரிக விளக்கம்', desc: 'பண்டைய சாமுத்ரிகா சாஸ்திரம் மற்றும் 19-ஆம் நூற்றாண்டு நூல்களின் அடிப்படை.' },
      { title: 'தனிப்பயனாக்கப்பட்ட வாசிப்பு', desc: 'பொதுவான ஜோதிடமல்ல — உங்கள் தனித்துவமான கை அமைப்பின் பகுப்பாய்வு.' },
      { title: '12 இந்திய மொழிகள்', desc: 'தமிழ், இந்தி, தெலுங்கு உள்ளிட்ட மொழிகளில் உங்கள் தாய்மொழியில் படியுங்கள்.' },
      { title: 'தனியுரிமை & பாதுகாப்பு', desc: 'உங்கள் படம் பகிரப்படாது. ஒரு கிளிக்கில் உடனே நீக்கலாம்.' },
    ],
    closingTitle: 'உங்கள் கைகளில் வாழ்க்கை வரைபடம் மறைந்துள்ளது',
    closingDesc: 'நவீன ஏஐ மூலம் உங்கள் கைரேகையின் சாஸ்திர பலன்களை இப்போதே கண்டறியுங்கள்.',
    closingCta: 'பலன்களைப் பார்க்கத் தொடங்குங்கள்',
  },

  // 4. TELUGU (తెలుగు)
  te: {
    tagline1: 'మీ అరచేతి రేఖలు',
    tagline2: 'చెప్పే కథను తెలుసుకోండి.',
    subtitle: 'సాముద్రిక శాస్త్రం మరియు ప్రాచీన గ్రంథాల ఆధారంగా ఆధునిక ఏఐ హస్తరేఖ విశ్లేషణ.',
    scanCta: 'హస్తం స్కాన్ చేయండి',
    seeHowItWorks: 'ఇది ఎలా పనిచేస్తుంది',
    stepsBadge: 'సులువైన 3 దశలు',
    howItWorksTitle: 'Kai RegAI ఎలా పనిచేస్తుంది',
    step1Title: 'అరచేతి ఫోటో తీయండి',
    step1Desc: 'మీ ఫోన్ కెమెరాతో స్పష్టమైన ఫోటో తీయండి లేదా గ్యాలరీ నుండి అప్‌లోడ్ చేయండి.',
    step2Title: 'ఏఐ ముఖ్య రేఖలను గుర్తిస్తుంది',
    step2Desc: 'హృదయ, మస్తిష్క, జీవన రేఖలు మరియు పర్వతాల ఉబ్బెత్తును విశ్లేషిస్తుంది.',
    step3Title: 'మీ వ్యక్తిగత ఫలితాలను చూడండి',
    step3Desc: 'ప్రాచీన గ్రంథాల ఆధారిత వ్యక్తిగత అంతర్దృష్టిని క్షణాల్లో పొందండి.',
    exploreBadge: '5 జీవన కోణాలు',
    exploreTitle: 'Kai ఏమి విశ్లేషిస్తుంది',
    exploreSubtitle: 'సాంప్రదాయ హస్తరేఖా గుర్తుల నుండి పరిశీలించబడింది',
    themes: {
      love: { title: 'ప్రేమ & సంబంధాలు', subtitle: 'భావోద్వేగ తీవ్రత మరియు అనుబంధ శైలి', lineName: 'హృదయ రేఖ' },
      career: { title: 'కెరీర్ & ఆశయాలు', subtitle: 'ఉద్యోగ సంకల్పం మరియు విజయోత్సాహం', lineName: 'భాగ్య రేఖ' },
      money: { title: 'ధనం & సమృద్ధి', subtitle: 'వనరులను నిలుపుకునే ఆలోచనా ధోరణి', lineName: 'సూర్య రేఖ' },
      mind: { title: 'వ్యక్తిత్వం & మేధస్సు', subtitle: 'ఏకాగ్రత మరియు నిర్ణయాత్మక సామర్థ్యం', lineName: 'మస్తిష్క రేఖ' },
      life: { title: 'ఆయుష్షు & శక్తి', subtitle: 'శారీరక సామర్థ్యం మరియు తేజస్సు', lineName: 'జీవన రేఖ' },
    },
    trustBadge: 'శాస్త్ర ప్రమాణ ఏఐ',
    trustTitle: 'Kai RegAI పై నమ్మకం ఎందుకు?',
    pillars: [
      { title: 'ఏఐ హస్త విశ్లేషణ', desc: 'అరచేతి రూపురేఖలను కంప్యూటర్ విజన్ క్షణాల్లో మ్యాప్ చేస్తుంది.' },
      { title: 'సాంప్రదాయ వివరణలు', desc: 'ప్రాచీన భారతీయ సాముద్రిక శాస్త్ర మూలాల ఆధారంగా.' },
      { title: 'వ్యక్తిగత ఫలితాలు', desc: 'మీ ప్రత్యేకమైన చేయి ఆధారంగా రూపొందించబడింది.' },
      { title: '12 భారతీయ భాషలు', desc: 'తెలుగు, హిందీ, తమిళం సహా మీ మాతృభాషలో చదవండి.' },
      { title: 'గోప్యత & భద్రత', desc: 'మీ ఫోటో ఎప్పుడూ భద్రంగా ఉంటుంది. ఒక్క క్లిక్‌తో తొలగించవచ్చు.' },
    ],
    closingTitle: 'మీ చేతుల్లో జీవిత అనుభవాల ముద్రలు ఉన్నాయి',
    closingDesc: 'ఆధునిక ఏఐ సాంకేతికతతో మీ హస్తరేఖ రహస్యాలను తెలుసుకోండి.',
    closingCta: 'విశ్లేషణ ప్రారంభించండి',
  },

  // 5. BENGALI (বাংলা)
  bn: {
    tagline1: 'আপনার হাতের রেখা',
    tagline2: 'কী বলে জেনে নিন।',
    subtitle: 'প্রাচীন সমুদ্র শাস্ত্র ও প্রামাণ্য শাস্ত্রগ্রন্থের ভিত্তিতে আধুনিক এআই হস্তরেখা বিশ্লেষণ।',
    scanCta: 'হাতের তালু স্ক্যান করুন',
    seeHowItWorks: 'কীভাবে কাজ করে দেখুন',
    stepsBadge: 'সহজ ৩টি ধাপ',
    howItWorksTitle: 'Kai RegAI কীভাবে কাজ করে',
    step1Title: 'হাতের ছবি তুলুন',
    step1Desc: 'আপনার ফোন ক্যামেরা দিয়ে পরিষ্কার ছবি তুলুন অথবা গ্যালারি থেকে আপলোড করুন।',
    step2Title: 'এআই প্রধান রেখাগুলি চিহ্নিত করে',
    step2Desc: 'হৃদয়, মস্তিষ্ক ও জীবন রেখা এবং বিভিন্ন পর্বতের গভীরতা বিশ্লেষণ করে।',
    step3Title: 'ব্যক্তিগত ফল জেনে নিন',
    step3Desc: 'শাস্ত্রসম্মত অন্তর্দৃষ্টি এবং শেয়ার করার মতো কার্ড এক নিমেষে পান।',
    exploreBadge: '৫টি জীবন ক্ষেত্র',
    exploreTitle: 'Kai কী কী অন্বেষণ করতে পারে',
    exploreSubtitle: 'ঐতিহ্যবাহী সমুদ্রবিদ্যার লক্ষণ দ্বারা চিহ্নিত',
    themes: {
      love: { title: 'ভালোবাসা ও সম্পর্ক', subtitle: 'আবেগপ্রবণতা ও সম্পর্কের গভীরতা', lineName: 'হৃদয় রেখা' },
      career: { title: 'কর্মজীবন ও আকাঙ্ক্ষা', subtitle: 'কাজের লক্ষ্য ও আত্মনির্ভরশীলতা', lineName: 'ভাগ্য রেখা' },
      money: { title: 'ধন ও সমৃদ্ধি', subtitle: 'সম্পদ বৃদ্ধি ও প্রাচুর্যের মনোভাব', lineName: 'রবি রেখা' },
      mind: { title: 'ব্যক্তিত্ব ও বুদ্ধি', subtitle: 'মানসিক একাগ্রতা ও বুদ্ধিবৃত্তিক ক্ষমতা', lineName: 'মস্তিষ্ক রেখা' },
      life: { title: 'জীবনশক্তি ও স্বাস্থ্য', subtitle: 'শারীরিক শক্তি ও দীর্ঘায়ু ভাব', lineName: 'জীবন রেখা' },
    },
    trustBadge: 'শাস্ত্রসম্মত এআই',
    trustTitle: 'কেন Kai RegAI বিশ্বাসযোগ্য?',
    pillars: [
      { title: 'এআই হস্তরেখা বিশ্লেষণ', desc: 'কম্পিউটার ভিশন নিখুঁতভাবে হাতের রেখাগুলি পর্যবেক্ষণ করে।' },
      { title: 'ঐতিহ্যবাহী ব্যাখ্যা', desc: 'প্রাচীন ভারতীয় সমুদ্র শাস্ত্রের প্রামাণিক সূত্রের উপর প্রতিষ্ঠিত।' },
      { title: 'ব্যক্তিগত পাঠ', desc: 'আপনার হাতের অনন্য গঠনের ভিত্তিতে তৈরি — কোনো সাধারণ রাশিফল নয়।' },
      { title: '১২টি ভারতীয় ভাষা', desc: 'বাংলা, হিন্দি, তামিল সহ নিজের মাতৃভাষায় পড়ুন।' },
      { title: 'সম্পূর্ণ গোপনীয়', desc: 'আপনার ছবি সম্পূর্ণ সুরক্ষিত এবং একক ক্লিকে মুছে ফেলা যায়।' },
    ],
    closingTitle: 'আপনার হাতের রেখায় জীবনের প্রতিচ্ছবি আঁকা',
    closingDesc: 'আধুনিক কৃত্রিম বুদ্ধিমত্তার মাধ্যমে আপনার হস্তরেখার শাস্ত্রীয় রহস্য উন্মোচন করুন।',
    closingCta: 'বিশ্লেষণ শুরু করুন',
  },
};

export function getLandingLocale(langId: string): LandingLocaleData {
  if (LANDING_LOCALES[langId]) {
    return LANDING_LOCALES[langId];
  }
  // Default to English with graceful fallback
  return LANDING_LOCALES['en'];
}
