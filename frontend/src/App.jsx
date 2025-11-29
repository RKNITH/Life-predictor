import React, { useState } from 'react';
import {
  Star,
  Calendar,
  Sparkles,
  Briefcase,
  Heart,
  Activity,
  BookOpen,
  Sun,
  Moon,
  Zap,
  ShieldAlert,
  Gem
} from 'lucide-react';

// --- Numerology Logic ---

const reduceToSingleDigit = (num) => {
  if (num === 11 || num === 22 || num === 33) return num;
  if (num < 10) return num;

  const sum = num.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
  return reduceToSingleDigit(sum);
};

const calculateLifePath = (day, month, year) => {
  const rMonth = reduceToSingleDigit(month);
  const rDay = reduceToSingleDigit(day);
  const rYear = reduceToSingleDigit(year);

  let total = rMonth + rDay + rYear;
  return reduceToSingleDigit(total);
};

const calculatePersonalYear = (day, month, targetYear) => {
  const rDay = reduceToSingleDigit(day);
  const rMonth = reduceToSingleDigit(month);
  const rYear = reduceToSingleDigit(targetYear);

  let total = rDay + rMonth + rYear;
  return reduceToSingleDigit(total);
};

// --- Detailed Hindi Data Dictionaries ---

const lifePathMeanings = {
  1: {
    title: "मूलांक 1: सूर्य (The Leader)",
    archetype: "स्वतंत्र और महत्वाकांक्षी",
    description: "आप एक जन्मजात नेता हैं। आपके अंदर ऊर्जा का अपार भंडार है। आप किसी के अधीन काम करना पसंद नहीं करते, बल्कि अपना खुद का रास्ता बनाना पसंद करते हैं। आपका व्यक्तित्व चुम्बकीय है और लोग स्वाभाविक रूप से आपका अनुसरण करते हैं। आप जीवन में चुनौतियों से नहीं डरते और हर बाधा को पार करने की क्षमता रखते हैं।",
    strengths: ["आत्मविश्वास", "नेतृत्व क्षमता", "साहस", "दृढ़ संकल्प", "नवाचार"],
    weaknesses: ["अहंकार", "जिद्दीपन", "दूसरों की बात न सुनना", "जल्दबाजी", "क्रोध"],
    career: "आप प्रबंधन, राजनीति, व्यवसाय (Business), सेना, या किसी भी ऐसे क्षेत्र में सफल होंगे जहाँ आपको निर्णय लेने की स्वतंत्रता हो। आप एक बेहतरीन उद्यमी (Entrepreneur) बन सकते हैं।",
    love: "प्रेम में आप बहुत भावुक होते हैं, लेकिन आप अपने साथी पर हावी होने की कोशिश कर सकते हैं। आपको एक ऐसे साथी की जरूरत है जो आपके व्यक्तित्व को समझे लेकिन अपनी पहचान भी बनाए रखे।",
    gem: "माणिक्य (Ruby)",
    planet: "सूर्य (Sun)",
    luckyColors: "सुनहरा, पीला, नारंगी"
  },
  2: {
    title: "मूलांक 2: चंद्रमा (The Peacemaker)",
    archetype: "संवेदनशील और सहयोगी",
    description: "आप अत्यंत संवेदनशील, भावुक और शांतिप्रिय व्यक्ति हैं। आप दिल से सोचते हैं, दिमाग से नहीं। आप में दूसरों के दर्द को महसूस करने की अद्भुत क्षमता है। आप झगड़ों से दूर रहते हैं और हमेशा समझौता कराने में विश्वास रखते हैं। आप एक अच्छे श्रोता हैं और लोग अपनी समस्याएं लेकर आपके पास आना पसंद करते हैं।",
    strengths: ["कूटनीति", "सहयोग", "दयालुता", "अंतर्ज्ञान (Intuition)", "धैर्य"],
    weaknesses: ["अत्यधिक संवेदनशीलता", "निर्णय लेने में कठिनाई", "आत्मविश्वास की कमी", "दूसरों पर निर्भरता"],
    career: "आपके लिए काउंसलिंग, मनोविज्ञान, अध्यापन, कला, संगीत, नर्सिंग या सामाजिक कार्य (Social Work) सर्वोत्तम हैं। जहाँ टीम वर्क की जरूरत हो, वहां आप चमकते हैं।",
    love: "आप बहुत रोमांटिक और वफादार साथी होते हैं। आप रिश्ते में भावनात्मक सुरक्षा चाहते हैं। छोटी-छोटी बातें भी आपको चोट पहुँचा सकती हैं, इसलिए आपको एक कोमल हृदय वाले साथी की जरूरत है।",
    gem: "मोती (Pearl)",
    planet: "चंद्रमा (Moon)",
    luckyColors: "सफेद, क्रीम, हल्का हरा"
  },
  3: {
    title: "मूलांक 3: बृहस्पति (The Communicator)",
    archetype: "रचनात्मक और मिलनसार",
    description: "आप रचनात्मकता और उत्साह का पावरहाउस हैं। आप जहाँ भी जाते हैं, खुशियाँ और हँसी बिखेर देते हैं। आपकी वाणी में जादू है और आप अपनी बातों से किसी को भी प्रभावित कर सकते हैं। आप जीवन को एक उत्सव की तरह जीते हैं। आप बहुत आशावादी हैं और विफलता से जल्दी उबर जाते हैं।",
    strengths: ["रचनात्मकता", "संचार कौशल", "हास्य बोध", "आशावाद", "आकर्षण"],
    weaknesses: ["बिखरा हुआ ध्यान", "गंभीरता की कमी", "फिजूलखर्ची", "गपशप करना"],
    career: "मीडिया, लेखन, अभिनय, विज्ञापन, वकालत या बिक्री (Sales)। कोई भी क्षेत्र जहाँ आपको बोलने और व्यक्त करने का मौका मिले, आपके लिए उत्तम है।",
    love: "प्रेम में आप चंचल और मजेदार होते हैं। आपको एक ऐसा साथी चाहिए जो आपके रोमांच और उत्साह में आपका साथ दे सके। बोरिंग रिश्ते आपको पसंद नहीं हैं।",
    gem: "पुखराज (Yellow Sapphire)",
    planet: "बृहस्पति (Jupiter)",
    luckyColors: "पीला, बैंगनी, गुलाबी"
  },
  4: {
    title: "मूलांक 4: राहु/हर्षल (The Builder)",
    archetype: "व्यावहारिक और अनुशासित",
    description: "आप समाज की नींव हैं। आप अत्यंत मेहनती, व्यावहारिक और नियम-कायदों को मानने वाले व्यक्ति हैं। आप हवा में महल नहीं बनाते, बल्कि जमीन पर काम करते हैं। आप बहुत व्यवस्थित हैं और हर काम योजना बनाकर करते हैं। आप पर आँख बंद करके भरोसा किया जा सकता है।",
    strengths: ["अनुशासन", "ईमानदारी", "वफादारी", "कड़ी मेहनत", "प्रबंधन"],
    weaknesses: ["कठोरता (Rigidity)", "बदलाव से डर", "संकीर्ण सोच", "अत्यधिक गंभीरता"],
    career: "इंजीनियरिंग, आर्किटेक्चर, अकाउंटिंग, बैंकिंग, निर्माण (Construction) या सरकारी नौकरी। तकनीकी और योजनाबद्ध कार्य आपके लिए बेहतरीन हैं।",
    love: "आप प्रेम में स्थिरता और वफादारी चाहते हैं। आप फ्लर्ट करना पसंद नहीं करते। आप एक गंभीर और लंबे समय तक चलने वाले रिश्ते में विश्वास रखते हैं।",
    gem: "गोमेद (Hessonite)",
    planet: "राहु (Rahu)",
    luckyColors: "नीला, खाकी, भूरा"
  },
  5: {
    title: "मूलांक 5: बुध (The Adventurer)",
    archetype: "स्वतंत्र और बहुमुखी",
    description: "स्वतंत्रता आपकी सांस है। आपको बंधन पसंद नहीं हैं। आप बहुत बुद्धिमान और बहुमुखी प्रतिभा के धनी हैं। आपको घूमना-फिरना और नई चीजें सीखना पसंद है। आप बहुत जल्दी बोर हो जाते हैं, इसलिए आपको जीवन में निरंतर बदलाव और रोमांच चाहिए। आप जोखिम लेने से नहीं डरते।",
    strengths: ["अनुकूलनशीलता", "तेज बुद्धि", "साहस", "संचार", "बहुमुखी प्रतिभा"],
    weaknesses: ["बेचैनी", "अस्थिरता", "जिम्मेदारी से भागना", "आवेगपूर्ण निर्णय"],
    career: "ट्रेवल और टूरिज्म, मार्केटिंग, पत्रकारिता, आयात-निर्यात, या जुआ/सट्टा (Risk taking jobs)। जहाँ हर दिन कुछ नया हो, वह काम आपके लिए है।",
    love: "प्रेम में आपको स्पेस चाहिए। आप एक ऐसे साथी की तलाश करते हैं जो आपको बांधे नहीं, बल्कि आपके साथ उड़े। आप बहुत आकर्षक होते हैं और आसानी से दोस्त बना लेते हैं।",
    gem: "पन्ना (Emerald)",
    planet: "बुध (Mercury)",
    luckyColors: "हरा, हल्का भूरा"
  },
  6: {
    title: "मूलांक 6: शुक्र (The Nurturer)",
    archetype: "जिम्मेदार और प्रेमी",
    description: "आप परिवार और समाज के रक्षक हैं। आपके लिए जिम्मेदारी सबसे पहले आती है। आप बहुत कलात्मक और सौंदर्य प्रेमी हैं। आप चाहते हैं कि आपके आसपास सब कुछ सुंदर और सामंजस्यपूर्ण हो। आप दूसरों की मदद करने के लिए हमेशा तैयार रहते हैं, कभी-कभी अपनी जरूरतों को भूलकर भी।",
    strengths: ["प्रेम", "जिम्मेदारी", "संरक्षण", "कलात्मकता", "निस्वार्थता"],
    weaknesses: ["हस्तक्षेप करना", "दूसरों पर अपनी राय थोपना", "चिंता", "ना न कह पाना"],
    career: "इंटीरियर डिजाइनिंग, फैशन, होटल मैनेजमेंट, शिक्षण, चिकित्सा या समाज सेवा। विलासिता (Luxury) से जुड़े काम भी आपको लाभ देंगे।",
    love: "आप एक आदर्श प्रेमी और माता-पिता हैं। घर और परिवार ही आपका स्वर्ग है। आप अपने साथी की बहुत देखभाल करते हैं, लेकिन कभी-कभी आप बहुत ज्यादा पजेसिव हो सकते हैं।",
    gem: "हीरा (Diamond) या ओपल",
    planet: "शुक्र (Venus)",
    luckyColors: "सफेद, हल्का नीला, गुलाबी"
  },
  7: {
    title: "मूलांक 7: केतु/नेपच्यून (The Seeker)",
    archetype: "दार्शनिक और विश्लेषक",
    description: "आप एक गहरे विचारक हैं। आप जो दिखता है, उस पर विश्वास नहीं करते, बल्कि गहराई में जाकर सच्चाई खोजते हैं। आप थोड़े अंतर्मुखी (Introvert) हैं और एकांत पसंद करते हैं। आपकी अंतर्ज्ञान शक्ति (Intuition) बहुत तेज है। आप भीड़ का हिस्सा बनना पसंद नहीं करते।",
    strengths: ["विश्लेषण क्षमता", "आध्यात्मिकता", "ज्ञान", "शोध", "गहन सोच"],
    weaknesses: ["संदेह करना", "सामाजिक अलगाव", "निराशावाद", "बातचीत में कठिनाई"],
    career: "वैज्ञानिक, शोधकर्ता (Researcher), जासूस, दार्शनिक, लेखक, या आध्यात्मिक गुरु। तकनीकी या आईटी क्षेत्र भी आपके लिए अच्छा है।",
    love: "आपको समझना मुश्किल है। आप अपनी भावनाएं आसानी से व्यक्त नहीं करते। आपको एक बुद्धिमान साथी चाहिए जो आपके मौन और एकांत का सम्मान करे।",
    gem: "लहसुनिया (Cat's Eye)",
    planet: "केतु (Ketu)",
    luckyColors: "सलेटी (Grey), बहुरंगी"
  },
  8: {
    title: "मूलांक 8: शनि (The Powerhouse)",
    archetype: "शासक और कर्मठ",
    description: "आप शक्ति, पैसा और सफलता के प्रतीक हैं। आप बहुत महत्वाकांक्षी हैं और बड़े लक्ष्य रखते हैं। जीवन में आपको सफलता आसानी से नहीं मिलती, बहुत संघर्ष करना पड़ता है, लेकिन अंत में आप शीर्ष पर पहुँचते हैं। आप एक अच्छे प्रबंधक हैं और बड़ी जिम्मेदारियां निभा सकते हैं।",
    strengths: ["प्रबंधन", "महत्वाकांक्षा", "दूरदर्शिता", "धैर्य", "व्यावहारिक निर्णय"],
    weaknesses: ["भौतिकवाद", "कठोरता", "सत्ता का नशा", "काम का नशा (Workaholic)"],
    career: "बड़ा व्यवसाय (Big Business), राजनीति, रियल एस्टेट, वित्त (Finance), कानून या उच्च प्रशासनिक पद। आप छोटे स्तर पर काम करने के लिए नहीं बने हैं।",
    love: "आप प्रेम में भी व्यावहारिक होते हैं। आप अपने साथी को सुरक्षा और विलासिता प्रदान करते हैं, लेकिन हो सकता है कि आप भावनात्मक रूप से ज्यादा अभिव्यक्त न हों।",
    gem: "नीलम (Blue Sapphire)",
    planet: "शनि (Saturn)",
    luckyColors: "काला, गहरा नीला"
  },
  9: {
    title: "मूलांक 9: मंगल (The Humanitarian)",
    archetype: "दयालु और योद्धा",
    description: "आप मानवतावादी हैं। आपका दिल बहुत बड़ा है और आप दुनिया का भला करना चाहते हैं। आप साहसी भी हैं और दयालु भी। आप अन्याय बर्दाश्त नहीं कर सकते। आपके जीवन में बहुत उतार-चढ़ाव आते हैं, लेकिन आप हमेशा हारकर भी जीतना जानते हैं। आप एक पुरानी आत्मा (Old Soul) हैं।",
    strengths: ["दया", "साहस", "उदारता", "कलात्मकता", "क्षमाशीलता"],
    weaknesses: ["अत्यधिक भावुकता", "गुस्सा", "जल्दबाजी", "हकीकत से दूर रहना"],
    career: "सेना, पुलिस, समाज सेवा, चिकित्सा (Surgeon), एनजीओ, या कला जगत। जहाँ भी साहस और सेवा का मिश्रण हो, वह काम आपके लिए है।",
    love: "आप बहुत रोमांटिक होते हैं लेकिन थोड़े नाटकीय (Dramatic) भी हो सकते हैं। आप बहुत गहराई से प्यार करते हैं और अपने साथी के लिए कुछ भी कर सकते हैं।",
    gem: "मूँगा (Coral)",
    planet: "मंगल (Mars)",
    luckyColors: "लाल, मैरून"
  },
  11: {
    title: "मास्टर नंबर 11 (The Illuminator)",
    archetype: "आध्यात्मिक संदेशवाहक",
    description: "यह एक विशेष 'मास्टर नंबर' है। आप बहुत सहज और आध्यात्मिक हैं। आप में दूसरों को प्रेरित करने की अद्भुत शक्ति है। आप एक सपने देखने वाले व्यक्ति हैं। आपका जीवन आसान नहीं होता क्योंकि आपसे ब्रह्मांड को बहुत उम्मीदें हैं।",
    strengths: ["दूरदर्शिता", "अध्यात्म", "प्रेरणा"],
    weaknesses: ["तनाव", "व्यावहारिकता की कमी"],
    career: "आध्यात्मिक गुरु, कलाकार, आविष्कारक, वक्ता।",
    love: "आपको एक ऐसे साथी की जरूरत है जो आपकी आध्यात्मिकता को समझे और आपको जमीन से जोड़े रखे।",
    gem: "चांदी (Silver Metal)",
    planet: "चंद्रमा (Moon)",
    luckyColors: "सफेद, वायलेट"
  },
  22: {
    title: "मास्टर नंबर 22 (The Master Builder)",
    archetype: "महान निर्माता",
    description: "यह सबसे शक्तिशाली नंबरों में से एक है। आपमें सपनों को हकीकत में बदलने की ताकत है। आप केवल अपने लिए नहीं, बल्कि मानवता के लिए बड़े निर्माण करने आए हैं। आप एक व्यावहारिक आदर्शवादी हैं।",
    strengths: ["विशाल सोच", "कार्यान्वयन", "नेतृत्व"],
    weaknesses: ["दबाव", "अत्यधिक काम"],
    career: "राजनयिक, वैश्विक उद्यमी, आर्किटेक्ट।",
    love: "आपको एक ऐसा साथी चाहिए जो आपके बड़े विजन (Vision) का समर्थन करे।",
    gem: "कोरल (Coral)",
    planet: "प्लूटो (Pluto)",
    luckyColors: "लाल, काला"
  }
};

const personalYearMeanings = {
  1: {
    theme: "नई शुरुआत और बीज बोने का समय",
    description: "यह वर्ष आपके लिए एक नया चक्र शुरू कर रहा है। पिछले 9 वर्षों का चक्र समाप्त हो चुका है। अब नए लक्ष्य बनाने, नई परियोजनाएं शुरू करने और साहसिक कदम उठाने का समय है। आपकी ऊर्जा बहुत अधिक रहेगी।",
    advice: "आत्मविश्वास के साथ आगे बढ़ें। अकेले काम करने से न डरें।",
    caution: "आलस्य न करें, यह समय आराम का नहीं है।"
  },
  2: {
    theme: "धैर्य, साझेदारी और सहयोग",
    description: "पिछले साल आपने जो शुरुआत की थी, अब उसे पोषण देने का समय है। चीजें थोड़ी धीमी गति से बढ़ेंगी। यह वर्ष रिश्तों को सुधारने और टीम वर्क पर ध्यान देने का है। आक्रामक होने की बजाय विनम्र बनें।",
    advice: "शांति बनाए रखें और दूसरों का सहयोग लें।",
    caution: "भावुक होकर निर्णय न लें और जल्दबाजी न करें।"
  },
  3: {
    theme: "रचनात्मकता, खुशी और सामाजिकता",
    description: "यह आनंद लेने और खुद को अभिव्यक्त करने का वर्ष है। आपका सामाजिक जीवन बहुत सक्रिय रहेगा। पुरानी दोस्तों से मिलना और नए दोस्त बनाना संभव है। अगर आप लेखन या कला में हैं, तो यह साल बेहतरीन है।",
    advice: "खुल कर जिएं, यात्रा करें और अपनी हॉबी पर ध्यान दें।",
    caution: "पैसे की बर्बादी से बचें और वाणी पर संयम रखें।"
  },
  4: {
    theme: "कड़ी मेहनत, नींव और व्यवस्था",
    description: "पार्टी खत्म हो गई है, अब काम पर लौटने का समय है। यह वर्ष अनुशासन और व्यवस्था मांगता है। आपको अपने करियर, घर और स्वास्थ्य की नींव मजबूत करनी होगी। यह साल थोड़ा बोझिल लग सकता है, लेकिन यह भविष्य के लिए जरूरी है।",
    advice: "बजट बनाएं, समय का पालन करें और शॉर्टकट न लें।",
    caution: "स्वास्थ्य को नजरअंदाज न करें और काम से जी न चुराएं।"
  },
  5: {
    theme: "बदलाव, स्वतंत्रता और रोमांच",
    description: "तैयार हो जाइए, इस साल बड़े बदलाव आ सकते हैं! नौकरी बदलना, घर बदलना या विदेश यात्रा—सब कुछ संभव है। पिछले साल की नीरसता खत्म होगी। आप बहुत ऊर्जावान और आजाद महसूस करेंगे।",
    advice: "बदलाव का विरोध न करें, उसे स्वीकार करें।",
    caution: "जोखिम लें लेकिन जुआ न खेलें। अति-उत्साह से बचें।"
  },
  6: {
    theme: "परिवार, जिम्मेदारी और सेवा",
    description: "यह वर्ष घर और परिवार पर केंद्रित है। शादी, बच्चे का जन्म या घर का नवीनीकरण (Renovation) हो सकता है। लोग आपसे मदद और सलाह मांगेंगे। आपको दूसरों की सेवा करनी होगी।",
    advice: "परिवार के साथ समय बिताएं और रिश्तों को मजबूत करें।",
    caution: "दूसरों के मामलों में जरूरत से ज्यादा दखल न दें।"
  },
  7: {
    theme: "आत्म-चिंतन, अध्यात्म और एकांत",
    description: "यह बाहरी दुनिया से थोड़ा कटकर अपने भीतर झांकने का समय है। यह वर्ष व्यापार के विस्तार के लिए अच्छा नहीं है, बल्कि सीखने और शोध करने के लिए है। आप अकेलापन महसूस कर सकते हैं, लेकिन यह आत्म-विकास के लिए है।",
    advice: "ध्यान (Meditation) करें, किताबें पढ़ें और खुद को जानें।",
    caution: "व्यापार में बड़े निवेश से बचें और डिप्रेशन से दूर रहें।"
  },
  8: {
    theme: "सफलता, शक्ति और धन",
    description: "यह कर्मों का फल पाने का वर्ष है। यदि आपने पिछले वर्षों में मेहनत की है, तो इस साल आपको बड़ी सफलता, प्रमोशन और पैसा मिलेगा। यह साल करियर और बिजनेस के लिए सबसे शक्तिशाली है।",
    advice: "बड़े निर्णय लें और अपनी महत्वाकांक्षाओं को पूरा करें।",
    caution: "घमंड से बचें और अपनी शक्ति का दुरुपयोग न करें।"
  },
  9: {
    theme: "समापन, त्याग और दान",
    description: "यह 9 साल के चक्र का अंतिम वर्ष है। जो चीजें या लोग अब आपके जीवन में जरूरी नहीं हैं, वे दूर हो जाएंगे। यह सफाई का समय है ताकि अगले साल नई शुरुआत हो सके। यह परोपकार और क्षमा का वर्ष है।",
    advice: "अतीत को जाने दें और भविष्य के लिए जगह बनाएं।",
    caution: "नई शुरुआत अभी न करें, सिर्फ पुरानी चीजों को समेटें।"
  },
  11: { theme: "आध्यात्मिक जागृति (Master Year)", description: "यह एक सामान्य वर्ष नहीं है। आपकी अंतर्ज्ञान शक्ति चरम पर होगी।", advice: "अपने दिल की सुनें।", caution: "तनाव से बचें।" },
  22: { theme: "महान निर्माण (Master Year)", description: "आप इस वर्ष कुछ बहुत बड़ा हासिल कर सकते हैं।", advice: "बड़े सपने देखें।", caution: "खुद पर शक न करें।" }
};

// --- Helper for Day Analysis ---
const getDayAnalysisHindi = (day) => {
  const single = reduceToSingleDigit(day);
  const map = {
    1: "आप किसी भी महीने की 1, 10, 19 या 28 तारीख को जन्मे हैं। इसका मतलब है कि आप सूर्य से प्रभावित हैं। आप भीड़ में अलग दिखना पसंद करते हैं।",
    2: "आप किसी भी महीने की 2, 11, 20 या 29 तारीख को जन्मे हैं। आप चंद्रमा से प्रभावित हैं। आप भावुक हैं और रिश्तों को बहुत महत्व देते हैं।",
    3: "आप किसी भी महीने की 3, 12, 21 या 30 तारीख को जन्मे हैं। आप बृहस्पति से प्रभावित हैं। आप रचनात्मक हैं और ज्ञान के भूखे हैं।",
    4: "आप किसी भी महीने की 4, 13, 22 या 31 तारीख को जन्मे हैं। आप राहु से प्रभावित हैं। आप लीक से हटकर सोचते हैं और मेहनती हैं।",
    5: "आप किसी भी महीने की 5, 14 या 23 तारीख को जन्मे हैं। आप बुध से प्रभावित हैं। आप बहुत बातूनी हैं और जल्दी दोस्त बना लेते हैं।",
    6: "आप किसी भी महीने की 6, 15 या 24 तारीख को जन्मे हैं। आप शुक्र से प्रभावित हैं। आप लग्जरी और सुंदरता के प्रेमी हैं।",
    7: "आप किसी भी महीने की 7, 16 या 25 तारीख को जन्मे हैं। आप केतु से प्रभावित हैं। आप रहस्मयी हैं और हर बात की गहराई में जाते हैं।",
    8: "आप किसी भी महीने की 8, 17 या 26 तारीख को जन्मे हैं। आप शनि से प्रभावित हैं। आप जीवन को गंभीरता से लेते हैं और संघर्ष से नहीं डरते।",
    9: "आप किसी भी महीने की 9, 18 या 27 तारीख को जन्मे हैं। आप मंगल से प्रभावित हैं। आप ऊर्जावान हैं और हमेशा एक्टिव रहना पसंद करते हैं।"
  };
  return map[single];
};

// --- Main Component ---

export default function NumerologyApp() {
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    year: '',
    targetYear: new Date().getFullYear().toString()
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculate = (e) => {
    e.preventDefault();
    const d = parseInt(formData.day);
    const m = parseInt(formData.month);
    const y = parseInt(formData.year);
    const ty = parseInt(formData.targetYear);

    if (!d || !m || !y || !ty) return;

    const lp = calculateLifePath(d, m, y);
    const py = calculatePersonalYear(d, m, ty);
    const dayAnalysis = getDayAnalysisHindi(d);

    setResult({
      lifePath: lp,
      personalYear: py,
      dayAnalysis: dayAnalysis,
      targetYear: ty
    });
  };

  return (
    <div className="min-h-screen bg-[#1a0b2e] bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#432371] text-white font-sans p-4 md:p-8">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 overflow-visible animate-fade-in-down">

        {/* Top Icon */}
        <div className="flex justify-center mb-6 overflow-visible">
          <div className="bg-purple-500/20 p-5 rounded-full border border-purple-400/30 shadow-[0_0_40px_rgba(168,85,247,0.4)] animate-pulse-slow overflow-visible">
            <Star className="w-12 h-12 text-yellow-300" />
          </div>
        </div>

        {/* Title */}
        <div className="mt-10 overflow-visible">
          <h1 className="leading-normal text-4xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 mb-4 drop-shadow-lg">
            ब्रह्मांडीय अंकशास्त्र
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-purple-200/80 text-lg md:text-xl font-medium">
          अपनी जन्मतिथि से जानें अपने जीवन का रहस्य और भविष्य
        </p>

      </div>


      {/* Input Form */}
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl mb-16 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

        <form onSubmit={calculate} className="space-y-8">

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-purple-200 uppercase tracking-wider">दिन (Day)</label>
              <input
                name="day"
                type="number"
                max="31"
                placeholder="12"
                value={formData.day}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-4 text-center text-xl font-bold focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all shadow-inner"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-purple-200 uppercase tracking-wider">माह (Month)</label>
              <input
                name="month"
                type="number"
                max="12"
                placeholder="12"
                value={formData.month}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-4 text-center text-xl font-bold focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all shadow-inner"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-purple-200 uppercase tracking-wider">वर्ष (Year)</label>
              <input
                name="year"
                type="number"
                placeholder="2012"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-4 text-center text-xl font-bold focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all shadow-inner"
                required
              />
            </div>
          </div>

          <div className="relative pt-2">
            <div className="absolute top-5 left-4 pointer-events-none">
              <Calendar className="h-6 w-6 text-purple-300/70" />
            </div>
            <input
              name="targetYear"
              type="number"
              placeholder="किस वर्ष का भविष्य जानना है? (e.g. 2025)"
              value={formData.targetYear}
              onChange={handleInputChange}
              className="w-full bg-black/30 border border-purple-500/30 rounded-xl pl-12 p-4 text-lg font-medium focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-5 rounded-xl shadow-lg transform transition active:scale-95 hover:shadow-pink-500/25 flex items-center justify-center gap-3 text-lg"
          >
            <Sparkles className="w-6 h-6 animate-spin-slow" />
            मेरा भविष्य दिखाएं
          </button>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="max-w-5xl mx-auto space-y-12 animate-fade-in-up pb-20">

          {/* Life Path Card - Detailed */}
          <div className="bg-[#1e1035] border border-purple-500/20 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 p-40 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Hero Section of Card */}
            <div className="bg-gradient-to-r from-[#2a1b4a] to-[#3a225e] p-8 md:p-12 border-b border-white/5">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-full border-[6px] border-purple-400/50 flex items-center justify-center bg-black/40 shadow-[0_0_50px_rgba(192,132,252,0.3)] group-hover:shadow-[0_0_70px_rgba(192,132,252,0.6)] transition-all duration-500">
                    <span className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-300">
                      {result.lifePath}
                    </span>
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-1.5 rounded-full uppercase tracking-widest font-bold shadow-lg whitespace-nowrap">
                    मूलांक (Life Path)
                  </div>
                </div>

                <div className="text-center md:text-left flex-1 space-y-4">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{lifePathMeanings[result.lifePath].title}</h2>
                    <p className="text-pink-300 text-xl font-medium italic">"{lifePathMeanings[result.lifePath].archetype}"</p>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-purple-500/50 pl-4">
                    {lifePathMeanings[result.lifePath].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Grid */}
            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Strengths & Weaknesses */}
              <div className="space-y-6">
                <div className="bg-green-900/10 p-6 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-500/20 p-2 rounded-lg">
                      <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-green-100">शक्तियां (Strengths)</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lifePathMeanings[result.lifePath].strengths.map((s, i) => (
                      <span key={i} className="bg-green-500/10 text-green-300 px-3 py-1.5 rounded-lg text-sm font-medium border border-green-500/10">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-red-900/10 p-6 rounded-2xl border border-red-500/20 hover:border-red-500/40 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-500/20 p-2 rounded-lg">
                      <ShieldAlert className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-red-100">कमजोरियां (Challenges)</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lifePathMeanings[result.lifePath].weaknesses.map((w, i) => (
                      <span key={i} className="bg-red-500/10 text-red-300 px-3 py-1.5 rounded-lg text-sm font-medium border border-red-500/10">{w}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Career & Love */}
              <div className="space-y-6 col-span-1 lg:col-span-2">
                <div className="bg-blue-900/10 p-6 rounded-2xl border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-blue-100">करियर और व्यवसाय</h3>
                  </div>
                  <p className="text-blue-200/80 leading-relaxed">
                    {lifePathMeanings[result.lifePath].career}
                  </p>
                </div>

                <div className="bg-pink-900/10 p-6 rounded-2xl border border-pink-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6 text-pink-400" />
                    <h3 className="text-xl font-bold text-pink-100">प्रेम और संबंध</h3>
                  </div>
                  <p className="text-pink-200/80 leading-relaxed">
                    {lifePathMeanings[result.lifePath].love}
                  </p>
                </div>
              </div>

              {/* Day Analysis */}
              <div className="bg-purple-900/20 p-6 rounded-2xl border border-purple-500/20 col-span-1 lg:col-span-3">
                <div className="flex items-center gap-3 mb-3">
                  <Sun className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-purple-100">जन्म दिन का प्रभाव</h3>
                </div>
                <p className="text-gray-300 italic">
                  "{result.dayAnalysis}"
                </p>
              </div>

              {/* Lucky Elements Footer */}
              <div className="col-span-1 lg:col-span-3 flex flex-wrap gap-4 justify-between items-center bg-black/20 p-6 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Gem className="text-purple-400" />
                  <span className="text-gray-400 text-sm uppercase tracking-wider">शुभ रत्न:</span>
                  <span className="font-bold text-white">{lifePathMeanings[result.lifePath].gem}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="text-yellow-400" />
                  <span className="text-gray-400 text-sm uppercase tracking-wider">स्वामी ग्रह:</span>
                  <span className="font-bold text-white">{lifePathMeanings[result.lifePath].planet}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-yellow-500"></div>
                  <span className="text-gray-400 text-sm uppercase tracking-wider">शुभ रंग:</span>
                  <span className="font-bold text-white">{lifePathMeanings[result.lifePath].luckyColors}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Personal Year Prediction - Detailed */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="bg-[#25153f] border border-white/10 rounded-3xl p-8 md:p-12 relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-pink-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-pink-400 w-6 h-6" />
                    <h3 className="text-lg font-bold uppercase tracking-widest text-pink-300/80">
                      भविष्यफल: वर्ष {result.targetYear}
                    </h3>
                  </div>

                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-4">
                      व्यक्तिगत वर्ष {result.personalYear}
                      <span className="text-lg font-normal bg-white/10 px-3 py-1 rounded-full border border-white/20 text-gray-300">
                        (Personal Year)
                      </span>
                    </h2>
                    <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-bold shadow-lg mb-6">
                      मुख्य विषय: {personalYearMeanings[result.personalYear].theme}
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-xl text-gray-200 leading-relaxed">
                      {personalYearMeanings[result.personalYear].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="bg-green-500/10 p-5 rounded-xl border-l-4 border-green-500">
                      <h4 className="font-bold text-green-300 mb-2">सलाह (Advice)</h4>
                      <p className="text-green-100/80 text-sm">{personalYearMeanings[result.personalYear].advice}</p>
                    </div>
                    <div className="bg-yellow-500/10 p-5 rounded-xl border-l-4 border-yellow-500">
                      <h4 className="font-bold text-yellow-300 mb-2">सावधानी (Caution)</h4>
                      <p className="text-yellow-100/80 text-sm">{personalYearMeanings[result.personalYear].caution}</p>
                    </div>
                  </div>
                </div>

                {/* Visual Cycle Indicator */}
                <div className="flex flex-col justify-center items-center bg-black/20 p-8 rounded-2xl border border-white/5 min-w-[250px]">
                  <h4 className="text-purple-200 mb-6 font-medium">9 वर्षीय जीवन चक्र</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <div
                        key={num}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl transition-all duration-300 relative
                          ${num === result.personalYear
                            ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] scale-110 z-10 ring-2 ring-white/30'
                            : 'bg-white/5 text-gray-600 hover:bg-white/10'
                          }`}
                      >
                        {num}
                        {num === result.personalYear && (
                          <span className="absolute -top-2 -right-2 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500"></span>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-6 max-w-[200px]">
                    आप वर्तमान में इस चक्र के {result.personalYear}वें चरण में हैं।
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-purple-300/40 text-sm">
            <p>ज्योतिष केवल एक मार्गदर्शन है, आपके कर्म ही आपका असली भाग्य बनाते हैं।</p>
          </div>

        </div>
      )}
    </div>
  );
}