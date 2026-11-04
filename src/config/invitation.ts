// ============================================================
// EDIT THE INVITATION HERE. All content lives in this file.
// Every text is { ne: Nepali, en: English }. The guest switches language
// with the toggle; a link ending in ?lang=en opens it in English.
// ============================================================

import type { Bi, Lang } from "@/lib/i18n";
import type { Theme } from "@/lib/theme";

export const invitation = {
  defaultLang: "ne" as Lang,
  defaultTheme: "dark" as Theme, // "light" or "dark"; guests can switch, ?theme=dark opens dark

  // This invitation is sent by the bride's family (Dhungel side).
  couple: {
    groom: {
      name: { ne: "आशय बि.सी.", en: "Aashaya B.C." },
      short: { ne: "आशय", en: "Aashaya" },
    }, 
    bride: {
      name: { ne: "श्रीषा पौडेल", en: "Srisha Poudel" },
      short: { ne: "श्रीषा", en: "Srisha" },
    },
  },

  families: {
    bride: {
      relation: { ne: "की सुपुत्री", en: "Daughter of" },
      parents: {
        ne: "श्री दिपक कुमार पौडेल तथा श्रीमती सुभद्रा पौडेल",
        en: "Mr.Dipak Kumar Poudel & Mrs. Subhadra Poudel",
      },
      home: { ne: "महालक्ष्मी-५, टिकाथली, ललितपुर", en: "Mahalaxmi-5, Tikathali, Lalitpur" },
    },
    groom: {
      relation: { ne: "का सुपुत्र", en: "Son of" },
      parents: {
        ne: "श्री टोप बहादुर बि.सी. तथा श्रीमती यक्ष बि.सी.",
        en: "Mr. Top Bahadur B.C. & Mrs. Yaksha B.C.",
      },
      home: { ne: "गुर्जुधारा, चन्द्रागिरी", en: "Gurjudhara, Chandragiri" },
    },
  },

  wedding: {
    // ISO date-time with Nepal offset. 2083 Mangsir 19 BS = 5 December 2026 AD.
    startsAt: "2026-11-25T11:00:00+05:45",
    // Used only for the calendar file until a real end time is known.
    calendarHours: 5,
    bs: { day: 9, month: { ne: "मंसिर", en: "Mangsir" }, year: 2083 },
    weekday: { ne: "बुधबार", en: "Wednesday" },
    time: { ne: "बिहान १०:3० बजे", en: "10:30 AM" },
    schedule: [
      {
        time: { ne: "बिहान १०:३० बजे", en: "10:30 AM" },
        title: { ne: "शुभ विवाह", en: "Wedding ceremony" },
      },
      { time: { ne: "बिहान ११:०० बजे", en: "11:00 AM" }, title: { ne: "प्रीतिभोज", en: "Lunch" } },
    ],
  },

  venue: {
    name: { ne: "क्विक २० इभेन्ट्स", en: "Quick 20 Events" },
    address: { ne: "धापाखेल, ललितपुर", en: "Dhapakhel, Lalitpur" },
  },

  rsvp: {
    // WhatsApp number in international digits. Empty = RSVP shows "coming soon".
    whatsapp: "9779840405822",
    deadline: null as Bi | null, // e.g. { ne: "मंसिर १० गतेभित्र", en: "by 26 November" }
    maxGuests: 6,
  },

  // Shown as call buttons. Numbers are Nepal mobiles without the +977 prefix.
  contacts: [
    {
      name: { ne: "श्रीषा", en: "Srisha" },
      role: { ne: "दुलही", en: "Bride" },
      phones: ["9840405822", "9801140704"],
    },
    {
      name: { ne: "दिपक कुमार पौडेल", en: "Dipak Kumar Poudel" },
      role: { ne: "बुबा", en: "Father" },
      phones: ["9851088258"],
    },
    {
      name: { ne: "सुभद्रा पौडेल", en: "Subhadra Poudel" },
      role: { ne: "आमा", en: "Mother" },
      phones: ["9851034620"],
    },
  ],

  // Royalty-free or licensed track placed in /public, e.g. { src: "/music.mp3" }. null hides music.
  music: { src: "/music/nepali-wedding-dhun.mp3" } as null | { src: string },

  letter: {
    // Written by the bride's parents
    salutation: { ne: "आदरणीय आफन्तजन तथा शुभचिन्तकहरू,", en: "Dear family and friends," },
    paragraphs: [
      {
        ne: "हाम्री सुपुत्री श्रीषाको शुभ विवाह श्री टोप बहादुर बि. सी. तथा श्रीमती यक्ष बि. सी. सुपुत्र आशय बि. सी.सँग हुन गइरहेको सुखद समाचार तपाईंसँग साझा गर्न पाउँदा हामी अत्यन्त हर्षित छौं।",
        en: "With great joy, we share the news of the wedding of our daughter Srisha to Aashaya B.C., son of Mr. Top Bahadur B.C. and Mrs. Yaksha B.C.",
      },
      {
        ne: "यस शुभ अवसरमा सपरिवार उपस्थित भई नवदम्पतीलाई आशीर्वाद दिनुहुन हार्दिक अनुरोध गर्दछौं।",
        en: "We warmly request the pleasure of your company, with your family, to bless the couple on this auspicious day.",
      },
    ],
    signoff: { ne: "निमन्त्रणाकर्ता", en: "With warm regards," },
    signature: { ne: "दिपक कुमार पौडेल तथा सुभद्रा पौडेल", en: "Dipak Kumar Poudel & Subhadra Poudel" },
  },

  copy: {
    title: { ne: "शुभ विवाह", en: "Wedding Invitation" },
    blessing: { ne: "॥ श्री गणेशाय नमः ॥", en: "With the blessings of Lord Ganesh" },
    together: {
      ne: "पौडेल परिवारको हार्दिक निमन्त्रणा",
      en: "The Poudel family invites you to the wedding of",
    },
    heroLine: {
      ne: "यस शुभ अवसरमा तपाईंको उपस्थिति र आशीर्वादको हार्दिक अपेक्षा गर्दछौं।",
      en: "Your presence and blessings would mean the world to us.",
    },
    open: { ne: "निमन्त्रणा खोल्नुहोस्", en: "Open invitation" },
    scrollHint: { ne: "निमन्त्रणा हेर्न तल सार्नुहोस्", en: "Scroll to discover the invitation" },
    openWithMusic: { ne: "संगीतसहित खोल्नुहोस्", en: "Open with music" },

    secretEyebrow: { ne: "तपाईंका लागि एउटा सानो रहस्य", en: "A little secret, for you" },
    dateTitle: { ne: "यो दिन सम्झनुहोला", en: "Hold this day close" },
    dayLabel: { ne: "गते", en: "Day" },
    monthLabel: { ne: "महिना", en: "Month" },
    yearLabel: { ne: "साल", en: "Year" },
    scratchHint: {
      ne: "सुनौलो पत्र कोरेर मिति हेर्नुहोस्",
      en: "Scratch the gold to reveal our date",
    },
    scratchCover: { ne: "यहाँ कोर्नुहोस्", en: "Scratch here" },
    revealDate: { ne: "मिति देखाउनुहोस्", en: "Reveal the date" },
    addToCalendar: { ne: "पात्रोमा राख्नुहोस्", en: "Add to calendar" },

    countdownTitle: { ne: "शुभ घडी नजिकिँदै", en: "Until we say yes" },
    days: { ne: "दिन", en: "Days" },
    hours: { ne: "घण्टा", en: "Hours" },
    minutes: { ne: "मिनेट", en: "Minutes" },
    seconds: { ne: "सेकेन्ड", en: "Seconds" },
    started: { ne: "आज हाम्रो शुभ दिन हो", en: "Today is the day" },
    finished: {
      ne: "हाम्रो खुसीमा साथ दिनुभएकोमा हार्दिक धन्यवाद",
      en: "Thank you for celebrating with us",
    },

    letterTitle: { ne: "हार्दिक निमन्त्रणा", en: "You are invited" },
    openLetter: { ne: "पत्र खोल्नुहोस्", en: "Open our letter" },

    familiesTitle: { ne: "हाम्रा परिवार", en: "Our families" },
    familiesSign: { ne: "पौडेल परिवार", en: "The Poudel family" },
    bride: { ne: "दुलही", en: "The Bride" },
    groom: { ne: "दुलाहा", en: "The Groom" },

    ceremonyTitle: { ne: "विवाह स्थल", en: "Where we gather" },
    scheduleTitle: { ne: "शुभ दिनको कार्यक्रम", en: "The day, hour by hour" },
    closingTitle: { ne: "आभार र मायासहित", en: "With love and gratitude" },

    rsvpTitle: { ne: "उपस्थितिको जानकारी", en: "Kindly reply" },
    rsvpIntro: {
      ne: "कृपया आफ्नो उपस्थिति जानकारी गराइदिनुहोला।",
      en: "Please let us know if you can join us.",
    },
    rsvpPending: {
      ne: "उपस्थिति जनाउने सुविधा छिट्टै उपलब्ध हुनेछ।",
      en: "RSVP details will be available soon.",
    },
    nameLabel: { ne: "तपाईंको नाम", en: "Your name" },
    attendLabel: { ne: "आउन सक्नुहुन्छ?", en: "Will you attend?" },
    accept: { ne: "खुसीसाथ आउँछु", en: "Joyfully accept" },
    decline: { ne: "आउन असमर्थ छु", en: "Unable to attend" },
    guestsLabel: { ne: "तपाईंसहित जम्मा अतिथि", en: "Guests, including you" },
    noteLabel: { ne: "शुभकामना सन्देश (ऐच्छिक)", en: "A message (optional)" },
    sendReply: { ne: "WhatsApp मा जवाफ पठाउनुहोस्", en: "Reply on WhatsApp" },
    // WhatsApp message the guest sends. {couple}, {name}, {n}, {note} are filled in.
    rsvpMessage: {
      greeting: {
        ne: "नमस्ते! {couple}को शुभ विवाहको निमन्त्रणाको जवाफ:",
        en: "Hello! RSVP for {couple}'s wedding:",
      },
      name: { ne: "नाम: {name}", en: "Name: {name}" },
      attending: { ne: "म उपस्थित हुनेछु।", en: "I will be attending." },
      declining: { ne: "माफ गर्नुहोला, आउन असमर्थ छु।", en: "Sorry, unable to attend." },
      note: { ne: "सन्देश: {note}", en: "Message: {note}" },
    },
    replyReady: {
      ne: "जवाफ तयार छ। WhatsApp मा Send थिच्नुहोस्।",
      en: "Your reply is ready. Press Send in WhatsApp.",
    },
    editReply: { ne: "जवाफ सम्पादन", en: "Edit reply" },
    nameRequired: { ne: "कृपया आफ्नो नाम लेख्नुहोस्।", en: "Please enter your name." },
    replyBy: { ne: "जवाफ दिने अन्तिम मिति", en: "Reply by" },

    closingMessage: {
      ne: "तपाईंको उपस्थिति र आशीर्वादको प्रतीक्षामा।",
      en: "We look forward to your presence and blessings.",
    },
    withLove: { ne: "स्नेहसहित", en: "With love" },
    share: { ne: "निमन्त्रणा पठाउनुहोस्", en: "Share invitation" },
    copyLink: { ne: "लिङ्क कपी गर्नुहोस्", en: "Copy link" },
    linkCopied: { ne: "लिङ्क कपी भयो", en: "Invitation link copied" },
    copyFailed: { ne: "लिङ्क कपी हुन सकेन", en: "Couldn't copy the link" },
    questions: { ne: "जानकारीका लागि", en: "For any questions" },

    playMusic: { ne: "संगीत बजाउनुहोस्", en: "Play music" },
    pauseMusic: { ne: "संगीत रोक्नुहोस्", en: "Pause music" },
    switchLang: { ne: "Switch to English", en: "नेपालीमा हेर्नुहोस्" },
    languageGroup: { ne: "भाषा", en: "Language" },
    themeLight: { ne: "उज्यालो रूप", en: "Light look" },
    themeDark: { ne: "गाढा रूप", en: "Dark look" },
  },
};

export type Invitation = typeof invitation;
