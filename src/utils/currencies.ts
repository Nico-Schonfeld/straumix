// Configuración de monedas soportadas
export const CURRENCY_CONFIG = {
  ARS: {
    code: "ARS",
    symbol: "$",
    name: "Peso Argentino",
    locale: "es-AR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "Dólar Estadounidense",
    locale: "en-US",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    locale: "de-DE",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  BRL: {
    code: "BRL",
    symbol: "R$",
    name: "Real Brasileño",
    locale: "pt-BR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  CLP: {
    code: "CLP",
    symbol: "$",
    name: "Peso Chileno",
    locale: "es-CL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  COP: {
    code: "COP",
    symbol: "$",
    name: "Peso Colombiano",
    locale: "es-CO",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  MXN: {
    code: "MXN",
    symbol: "$",
    name: "Peso Mexicano",
    locale: "es-MX",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  PEN: {
    code: "PEN",
    symbol: "S/",
    name: "Sol Peruano",
    locale: "es-PE",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  UYU: {
    code: "UYU",
    symbol: "$",
    name: "Peso Uruguayo",
    locale: "es-UY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  VES: {
    code: "VES",
    symbol: "Bs",
    name: "Bolívar Venezolano",
    locale: "es-VE",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  CAD: {
    code: "CAD",
    symbol: "C$",
    name: "Dólar Canadiense",
    locale: "en-CA",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "Libra Esterlina",
    locale: "en-GB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  JPY: {
    code: "JPY",
    symbol: "¥",
    name: "Yen Japonés",
    locale: "ja-JP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  CNY: {
    code: "CNY",
    symbol: "¥",
    name: "Yuan Chino",
    locale: "zh-CN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    name: "Dólar Australiano",
    locale: "en-AU",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  CHF: {
    code: "CHF",
    symbol: "CHF",
    name: "Franco Suizo",
    locale: "de-CH",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  SEK: {
    code: "SEK",
    symbol: "kr",
    name: "Corona Sueca",
    locale: "sv-SE",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  NOK: {
    code: "NOK",
    symbol: "kr",
    name: "Corona Noruega",
    locale: "nb-NO",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  DKK: {
    code: "DKK",
    symbol: "kr",
    name: "Corona Danesa",
    locale: "da-DK",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  PLN: {
    code: "PLN",
    symbol: "zł",
    name: "Zloty Polaco",
    locale: "pl-PL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  CZK: {
    code: "CZK",
    symbol: "Kč",
    name: "Corona Checa",
    locale: "cs-CZ",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  HUF: {
    code: "HUF",
    symbol: "Ft",
    name: "Forint Húngaro",
    locale: "hu-HU",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  RUB: {
    code: "RUB",
    symbol: "₽",
    name: "Rublo Ruso",
    locale: "ru-RU",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Rupia India",
    locale: "en-IN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  KRW: {
    code: "KRW",
    symbol: "₩",
    name: "Won Surcoreano",
    locale: "ko-KR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  SGD: {
    code: "SGD",
    symbol: "S$",
    name: "Dólar de Singapur",
    locale: "en-SG",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  HKD: {
    code: "HKD",
    symbol: "HK$",
    name: "Dólar de Hong Kong",
    locale: "en-HK",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  NZD: {
    code: "NZD",
    symbol: "NZ$",
    name: "Dólar Neozelandés",
    locale: "en-NZ",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  ZAR: {
    code: "ZAR",
    symbol: "R",
    name: "Rand Sudafricano",
    locale: "en-ZA",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  TRY: {
    code: "TRY",
    symbol: "₺",
    name: "Lira Turca",
    locale: "tr-TR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  ILS: {
    code: "ILS",
    symbol: "₪",
    name: "Shekel Israelí",
    locale: "he-IL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  AED: {
    code: "AED",
    symbol: "د.إ",
    name: "Dirham de los Emiratos Árabes Unidos",
    locale: "ar-AE",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  SAR: {
    code: "SAR",
    symbol: "ر.س",
    name: "Riyal Saudí",
    locale: "ar-SA",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  QAR: {
    code: "QAR",
    symbol: "ر.ق",
    name: "Riyal Catarí",
    locale: "ar-QA",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  KWD: {
    code: "KWD",
    symbol: "د.ك",
    name: "Dinar Kuwaití",
    locale: "ar-KW",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  },
  BHD: {
    code: "BHD",
    symbol: "د.ب",
    name: "Dinar Bahreiní",
    locale: "ar-BH",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  },
  OMR: {
    code: "OMR",
    symbol: "ر.ع.",
    name: "Rial Omaní",
    locale: "ar-OM",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  },
  JOD: {
    code: "JOD",
    symbol: "د.ا",
    name: "Dinar Jordaniano",
    locale: "ar-JO",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  },
  LBP: {
    code: "LBP",
    symbol: "ل.ل",
    name: "Libra Libanesa",
    locale: "ar-LB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  EGP: {
    code: "EGP",
    symbol: "ج.م",
    name: "Libra Egipcia",
    locale: "ar-EG",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  MAD: {
    code: "MAD",
    symbol: "د.م.",
    name: "Dirham Marroquí",
    locale: "ar-MA",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  TND: {
    code: "TND",
    symbol: "د.ت",
    name: "Dinar Tunecino",
    locale: "ar-TN",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  },
  DZD: {
    code: "DZD",
    symbol: "د.ج",
    name: "Dinar Argelino",
    locale: "ar-DZ",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  NGN: {
    code: "NGN",
    symbol: "₦",
    name: "Naira Nigeriana",
    locale: "en-NG",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  KES: {
    code: "KES",
    symbol: "KSh",
    name: "Chelín Keniano",
    locale: "en-KE",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  UGX: {
    code: "UGX",
    symbol: "USh",
    name: "Chelín Ugandés",
    locale: "en-UG",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  TZS: {
    code: "TZS",
    symbol: "TSh",
    name: "Chelín Tanzano",
    locale: "en-TZ",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  ETB: {
    code: "ETB",
    symbol: "Br",
    name: "Birr Etíope",
    locale: "am-ET",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  GHS: {
    code: "GHS",
    symbol: "₵",
    name: "Cedi Ghanés",
    locale: "en-GH",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  XOF: {
    code: "XOF",
    symbol: "CFA",
    name: "Franco CFA de África Occidental",
    locale: "fr-SN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  XAF: {
    code: "XAF",
    symbol: "FCFA",
    name: "Franco CFA de África Central",
    locale: "fr-CM",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
} as const;

export type CurrencyCode = keyof typeof CURRENCY_CONFIG;

/**
 * Formatea un monto según la moneda especificada
 */
export const formatCurrency = (
  amount: number,
  currencyCode: CurrencyCode = "ARS"
): string => {
  const config = CURRENCY_CONFIG[currencyCode];

  if (!config) {
    // Fallback a ARS si la moneda no está soportada
    const fallbackConfig = CURRENCY_CONFIG.ARS;
    return new Intl.NumberFormat(fallbackConfig.locale, {
      style: "currency",
      currency: fallbackConfig.code,
      minimumFractionDigits: fallbackConfig.minimumFractionDigits,
      maximumFractionDigits: fallbackConfig.maximumFractionDigits,
    }).format(amount);
  }

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    minimumFractionDigits: config.minimumFractionDigits,
    maximumFractionDigits: config.maximumFractionDigits,
  }).format(amount);
};

/**
 * Obtiene la configuración de una moneda específica
 */
export const getCurrencyConfig = (currencyCode: CurrencyCode) => {
  return CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG.ARS;
};

/**
 * Obtiene el símbolo de una moneda específica
 */
export const getCurrencySymbol = (currencyCode: CurrencyCode) => {
  return getCurrencyConfig(currencyCode).symbol;
};

/**
 * Obtiene el nombre de una moneda específica
 */
export const getCurrencyName = (currencyCode: CurrencyCode) => {
  return getCurrencyConfig(currencyCode).name;
};
