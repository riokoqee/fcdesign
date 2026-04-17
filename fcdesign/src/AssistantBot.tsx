import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

// ── TYPES ─────────────────────────────────────────────────────────────────────

interface QAItem {
  triggers: string[];
  answer: string;
  quick: string[];
}

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

// ── KNOWLEDGE BASE ────────────────────────────────────────────────────────────

const qa: QAItem[] = [
  {
    triggers: ['что такое', 'финансовый центр', 'о вас', 'кто вы', 'расскажи'],
    answer:
      'Финансовый центр — государственный интегратор финансирования программ РК. Мы обеспечиваем прозрачное и эффективное распределение бюджетных средств по всем госпрограммам страны. 🏛️',
    quick: ['Как участвовать?', 'Инвесторы', 'Отчёты'],
  },
  {
    triggers: ['как участвовать', 'подать заявк', 'госпрограмм', 'как попасть', 'вступить'],
    answer:
      'Подать заявку можно двумя способами:\n1. Через портал egov.kz (нужна ЭЦП)\n2. В нашем офисе по адресу: г. Астана, ул. Мәңгілік Ел, 55\n\nВыберите интересующую программу в разделе «Госпрограммы» и нажмите «Подать заявку». ✅',
    quick: ['Условия участия', 'Нужна ЭЦП?', 'Программы'],
  },
  {
    triggers: ['образование', 'учёба', 'студент', 'вуз', 'школа'],
    answer:
      'Программа «Образование» охватывает уровни от дошкольного до высшего. Бюджет: 250 млрд тенге, период 2024–2026. Участники — граждане РК 16–35 лет. Конкурсный отбор через egov.kz. 🎓',
    quick: ['Другие программы', 'Как подать заявку?'],
  },
  {
    triggers: ['бизнес', 'предприниматель', 'мсб', 'малый', 'открыть'],
    answer:
      'Программа поддержки МСБ: льготное финансирование, гарантии, нефинансовые меры. Бюджет 180 млрд тенге (2025–2027). Условие — регистрация ИП или ТОО, оборот до 10 млрд тенге/год. 💼',
    quick: ['Как оформить?', 'Жильё', 'Инвестиции'],
  },
  {
    triggers: ['жильё', 'квартира', 'ипотека', 'жилищная', 'дом'],
    answer:
      'Жилищная программа предоставляет доступное жильё через льготную ипотеку, аренду и субсидии. Бюджет: 400 млрд тенге, 2024–2028. Требуется постановка на учёт нуждающихся. 🏠',
    quick: ['Условия', 'Другие программы'],
  },
  {
    triggers: ['инвестици', 'инвестор', 'вложени', 'партнёр', 'иностранн'],
    answer:
      'Суммарный объём инвестиций — ₸6,35 трлн. Ключевые партнёры: Самрук-Казына, Нацбанк РК, ЕБРР, АБР и другие. Хотите стать партнёром? Обратитесь через раздел «Контакты». 💹',
    quick: ['Контакты', 'Как стать партнёром?'],
  },
  {
    triggers: ['отчёт', 'аналитик', 'данные', 'статистик', 'открытые данные'],
    answer:
      'Отчёты и аналитика доступны в личном кабинете после авторизации. Открытые данные — на нашем сайте в разделе «Отчёты». Авторизация через ЭЦП на egov.kz. 📊',
    quick: ['ЭЦП', 'Контакты'],
  },
  {
    triggers: ['эцп', 'электронн', 'подпись', 'как авторизоват'],
    answer:
      'ЭЦП (электронная цифровая подпись) нужна для подачи заявок и входа в личный кабинет. Получить её можно бесплатно в ЦОНе или через мобильное приложение eGov Mobile. 🔏',
    quick: ['Как подать заявку?', 'Контакты'],
  },
  {
    triggers: ['контакт', 'телефон', 'адрес', 'почта', 'офис', 'позвонить', 'написать'],
    answer:
      'Наши контакты:\n📞 +7 (7172) 77-77-77\n📧 info@fincenter.kz\n🏢 г. Астана, ул. Мәңгілік Ел, 55\n\nРабочие часы: Пн–Пт, 9:00–18:00. ✉️',
    quick: ['Подать заявку', 'О центре'],
  },
  {
    triggers: ['привет', 'здравствуй', 'хай', 'добрый', 'салам', 'hello'],
    answer:
      'Привет! 👋 Я Ассистент Финансового центра. Могу рассказать о государственных программах, условиях участия, инвесторах и многом другом. Чем помочь?',
    quick: ['О Финцентре', 'Госпрограммы', 'Контакты'],
  },
  {
    triggers: ['спасибо', 'благодар', 'рахмет', 'пока', 'до свидания'],
    answer:
      'Всегда рад помочь! 😊 Если возникнут ещё вопросы — обращайтесь. Желаю успехов! 🌟',
    quick: ['Ещё вопрос', 'О Финцентре'],
  },
];

const DEFAULT_QUICK = ['О Финцентре', 'Госпрограммы', 'Как участвовать?', 'Контакты'];
const FALLBACK =
  'Хм, не совсем понял вопрос 🤔 Попробуйте переформулировать или выберите тему ниже. Я знаю о госпрограммах, условиях участия, инвесторах и контактах.';
const GREETING =
  'Привет! 👋 Я Ассистент Финансового центра. Задайте любой вопрос о госпрограммах или выберите тему ниже.';

function findAnswer(text: string): QAItem | null {
  const lower = text.toLowerCase();
  return qa.find((item) => item.triggers.some((t) => lower.includes(t))) ?? null;
}

// ── CHARACTER SVG ─────────────────────────────────────────────────────────────

const CharacterSVG = () => (
  <svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* glow circle */}
    <circle cx="36" cy="36" r="36" fill="#0ea5e9" opacity="0.12" />
    {/* shadow */}
    <ellipse cx="36" cy="72" rx="20" ry="6" fill="#0ea5e9" opacity="0.12" />

    {/* body / suit */}
    <rect x="20" y="40" width="32" height="26" rx="8" fill="#1e293b" />
    {/* shirt */}
    <rect x="28" y="40" width="16" height="12" rx="2" fill="#ffffff" />
    {/* tie */}
    <polygon points="36,42 34,48 36,50 38,48" fill="#0ea5e9" />
    {/* lapels */}
    <polygon points="28,40 22,52 28,52" fill="#334155" />
    <polygon points="44,40 50,52 44,52" fill="#334155" />

    {/* head */}
    <ellipse cx="36" cy="30" rx="13" ry="14" fill="#fcd34d" />
    {/* hair */}
    <ellipse cx="36" cy="18" rx="13" ry="7" fill="#1e293b" />
    {/* ears */}
    <ellipse cx="22" cy="30" rx="3" ry="4" fill="#fbbf24" />
    <ellipse cx="50" cy="30" rx="3" ry="4" fill="#fbbf24" />

    {/* eyes whites */}
    <ellipse cx="30" cy="30" rx="3" ry="3.5" fill="#ffffff" />
    <ellipse cx="42" cy="30" rx="3" ry="3.5" fill="#ffffff" />
    {/* pupils */}
    <circle cx="31" cy="31" r="1.8" fill="#1e293b" />
    <circle cx="43" cy="31" r="1.8" fill="#1e293b" />
    {/* eye shine */}
    <circle cx="31.5" cy="30.3" r="0.7" fill="#ffffff" />
    <circle cx="43.5" cy="30.3" r="0.7" fill="#ffffff" />

    {/* smile */}
    <path d="M30 36 Q36 41 42 36" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* arms */}
    <rect x="8" y="42" width="12" height="7" rx="4" fill="#1e293b" transform="rotate(-20 14 45)" />
    <rect x="52" y="42" width="12" height="7" rx="4" fill="#1e293b" transform="rotate(20 58 45)" />
    {/* hands */}
    <ellipse cx="10" cy="51" rx="4" ry="4" fill="#fcd34d" />
    <ellipse cx="62" cy="51" rx="4" ry="4" fill="#fcd34d" />

    {/* legs */}
    <rect x="23" y="64" width="10" height="8" rx="4" fill="#1e293b" />
    <rect x="39" y="64" width="10" height="8" rx="4" fill="#1e293b" />
    {/* shoes */}
    <ellipse cx="28" cy="71" rx="7" ry="3" fill="#0f172a" />
    <ellipse cx="44" cy="71" rx="7" ry="3" fill="#0f172a" />
  </svg>
);

// ── TYPING INDICATOR ──────────────────────────────────────────────────────────

const TypingDots = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-zinc-400"
        style={{ animation: `botBounce 1s ${i * 0.15}s infinite` }}
      />
    ))}
  </div>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function AssistantBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [quickLabels, setQuickLabels] = useState<string[]>(DEFAULT_QUICK);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgCounter = useRef(0);

  // hide tooltip after 6s
  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // greeting on first open
  useEffect(() => {
    if (open && !initialized) {
      setInitialized(true);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addBotMsg(GREETING, DEFAULT_QUICK);
      }, 900);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  function addBotMsg(text: string, quick: string[]) {
    const id = ++msgCounter.current;
    setMessages((prev) => [...prev, { id, type: 'bot', text }]);
    setQuickLabels(quick);
  }

  function handleUserMsg(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setInputVal('');
    setQuickLabels([]);

    const id = ++msgCounter.current;
    setMessages((prev) => [...prev, { id, type: 'user', text: trimmed }]);

    const match = findAnswer(trimmed);
    setIsTyping(true);
    setTimeout(
      () => {
        setIsTyping(false);
        addBotMsg(match ? match.answer : FALLBACK, match ? match.quick : DEFAULT_QUICK);
      },
      850 + Math.random() * 350,
    );
  }

  return (
    <>
      {/* keyframes injected once */}
      <style>{`
        @keyframes botFloat {
          0%,100% { transform: translateY(0) rotate(-3deg); }
          50%      { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes botBounce {
          0%,60%,100% { transform: translateY(0); }
          30%          { transform: translateY(-6px); }
        }
      `}</style>

      <div className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-4">

        {/* ── CHAT WINDOW ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="w-80 bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
              style={{ maxHeight: '480px', transformOrigin: 'bottom right' }}
            >
              {/* header */}
              <div className="flex items-center gap-3 bg-sky-600 px-4 py-3 flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl select-none">
                  🧑‍💼
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold leading-tight">Ассистент Финцентра</p>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Онлайн · всегда рядом
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white transition p-1"
                >
                  <X size={18} />
                </button>
              </div>

              {/* messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-zinc-900/60">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={[
                      'max-w-[88%] text-sm leading-relaxed px-3 py-2 rounded-2xl whitespace-pre-line',
                      msg.type === 'bot'
                        ? 'bg-zinc-800 text-zinc-100 self-start rounded-bl-sm border border-zinc-700'
                        : 'bg-sky-600 text-white self-end rounded-br-sm',
                    ].join(' ')}
                  >
                    {msg.text}
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="self-start bg-zinc-800 border border-zinc-700 rounded-2xl rounded-bl-sm"
                  >
                    <TypingDots />
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* quick reply buttons */}
              <AnimatePresence>
                {quickLabels.length > 0 && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-wrap gap-1.5 px-4 pt-2 pb-1 bg-zinc-900/60 flex-shrink-0"
                  >
                    {quickLabels.map((label) => (
                      <button
                        key={label}
                        onClick={() => handleUserMsg(label)}
                        className="text-xs px-3 py-1.5 rounded-full border border-sky-500/50 text-sky-400 hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all"
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* input */}
              <div className="flex gap-2 px-3 py-3 border-t border-zinc-800 bg-zinc-950 flex-shrink-0">
                <input
                  ref={inputRef}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUserMsg(inputVal)}
                  placeholder="Напишите вопрос..."
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-sky-500 transition-colors"
                />
                <button
                  onClick={() => handleUserMsg(inputVal)}
                  disabled={!inputVal.trim() || isTyping}
                  className="w-9 h-9 rounded-full bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-90 flex-shrink-0"
                >
                  <Send size={15} className="text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── TOOLTIP ── */}
        <AnimatePresence>
          {showTooltip && !open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.2, duration: 0.3 }}
              className="bg-sky-600 text-white text-xs px-3 py-2 rounded-xl rounded-br-none shadow-lg whitespace-nowrap mr-2 select-none pointer-events-none"
            >
              Привет! Чем помочь? 👋
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CHARACTER BUTTON ── */}
        <motion.button
          onClick={() => {
            setOpen((v) => !v);
            setShowTooltip(false);
          }}
          animate={open ? { rotate: [0, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-[72px] h-[72px] relative cursor-pointer select-none focus:outline-none"
          style={{
            animation: open ? 'none' : 'botFloat 3s ease-in-out infinite',
            filter: 'drop-shadow(0 4px 14px rgba(14,165,233,0.4))',
          }}
          whileHover={{ scale: 1.12, rotate: 5 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Открыть помощника"
        >
          <CharacterSVG />
        </motion.button>
      </div>
    </>
  );
}
