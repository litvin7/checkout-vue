export const messages = {
  card: 'Оплата картой',
  card_number: 'Номер карты',
  expiry_date: 'Действительна до',
  cvv2: 'CVV2',
  cvv2_question: '{0} цифры с оборотноой стороны карты',
  email: 'Email',

  regular: 'Регулярный платеж',
  regular_every: 'Периодичность',
  regular_period: '&nbsp;',
  regular_amount: 'Сума к оплате',
  regular_start_time: 'Начать с',
  day: 'День',
  week: 'Неделя',
  month: 'Месяц',
  year: 'Год',

  emoney: 'Электроные деньги',
  emoney_t: 'Выебрите платежный сервис из списка:',

  ibank: 'Интернет–банки',
  ibank_t: 'Выберите ваш банк:',

  cash: 'Наличные',
  cash_t: 'Чем платить будете?',

  sepa: 'Международные платежи',
  sepa_t: 'Надо какой–то текст',
  sender_name: 'Имя',
  sender_familyName: 'Фамилия',
  bic: 'BIC',
  iban: 'IBAN',

  info: 'Даные платежа',
  amount: 'Сумма платежа:',
  fee: 'Комиссия:',
  methods: 'Методы оплаты',
  methods_m: 'Выберите способ оплаты',
  fast: 'Быстрый доступ к методам оплаты:',
  offer: 'оферта',
  offer_t: 'Я согласен с <a href="{0}" target="_blank">условиями оферты</a>',
  other: 'Другие способы',
  declined: 'Неуспешно',
  approved: 'Успешно',
  number_payment: '№ платежа в {0}:',
  payment_system: 'платежной системе',
  continue: 'Продолжить',
  cancel: 'Отменить',
  code: 'Проверочный код',
  pay: 'Оплатить',

  p24: 'Приват 24',
  platba24: 'Платба 24',
  raiffeisen: 'Райффайзен Банк Аваль',
  paypal: 'PayPal',
  qiwi: 'QIWI',
  webmoney: 'WebMoney',
  yamoney: 'Яндекс.Деньги',
  liqpay: 'LiqPay',

  ru: 'Русский',
  en: 'English',
  uk: 'Українською',
  lv: 'Latviešu',
  fr: 'Français',
  cs: 'Čeština',
  sk: 'Slovenský'
}

export const validate = {
  after: (field, [target]) => `В поле ${field} должна быть дата после ${target}.`,
  alpha_dash: (field) => `Поле ${field} может содержать только буквы, цифры и дефис.`,
  alpha_num: (field) => `Поле ${field} может содержать только буквы и цифры.`,
  alpha_spaces: (field) => `Поле ${field} может содержать только буквы и пробелы.`,
  alpha: (field) => `Поле ${field} может содержать только буквы.`,
  before: (field, [target]) => `В поле ${field} должна быть дата до ${target}.`,
  between: (field, [min, max]) => `Поле ${field} должно быть между ${min} и ${max}.`,
  confirmed: (field, [confirmedField]) => `Поле ${field} не совпадает с ${confirmedField}.`,
  credit_card: (field) => `Поле ${field} должно быть действительным номером карты`,
  date_between: (field, [min, max]) => `Поле ${field} должно быть между ${min} и ${max}.`,
  date_format: (field, [format]) => `Поле ${field} должно быть в формате ${format}.`,
  decimal: (field, [decimals = '*'] = []) => `Поле ${field} должно быть числовым и может содержать ${decimals === '*' ? '' : decimals} десятичных числа.`,
  digits: (field, [length]) => `Поле ${field} должно быть числовым и точно содержать ${length} цифры.`,
  dimensions: (field, [width, height]) => `Поле ${field} должно быть ${width} пикселей на ${height} пикселей.`,
  email: (field) => `Поле ${field} должно быть действительным электронным адресом.`,
  image: (field) => `Поле ${field} должно быть изображением.`,
  in: (field) => `Поле ${field} должно быть допустимым значением.`,
  max: (field, [length]) => `Поле ${field} не может быть более ${length} символов.`,
  max_value: (field, [max]) => `Поле ${field} должно быть ${max} или менее.`,
  mimes: (field, [...args]) => `Поле ${field} должно иметь действительный тип файла. (${args})`,
  min: (field, [length]) => `Поле ${field} должно быть не менее ${length} символов.`,
  min_value: (field, [min]) => `Поле ${field} должно быть ${min} или больше.`,
  not_in: (field) => `Поле ${field} должно быть допустимым значением.`,
  numeric: (field) => `Поле ${field} должно быть числом.`,
  regex: (field) => `Поле ${field} имеет ошибочный формат.`,
  required: (field) => `Поле ${field} обязательно для заполнения.`,
  url: (field) => `Поле ${field} имеет ошибочный формат URL.`
}
