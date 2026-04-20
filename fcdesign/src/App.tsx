import { useState } from 'react';
import { Menu, X, ArrowRight, ArrowLeft, Shield, Users, Search, TrendingUp, Globe, ChevronRight, ChevronDown, MessageCircle, Building2, GraduationCap, Banknote, CheckCircle, Clock, FileText, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import fcLogo from './assets/images/fc_logo.svg';

interface Program {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  fullDescription: string;
  objectives: string[];
  budget: string;
  period: string;
  participants: string;
  conditions: string;
  results: string;
}

interface HeaderProps {
  onNav: (target: string, data?: Program | null) => void;
  currentPage: string;
}

interface ProgramPageProps {
  program: Program;
  onBack: () => void;
}

interface HomePageProps {
  onNav: (target: string, data?: Program | null) => void;
}

const programs = [
  {
    id: 1,
    title: "Название Госпрограммы 1",
    description: "Краткое описание программы. Здесь будет информация о целях, условиях участия и ключевых преимуществах.",
    category: "Образование",
    image: "https://picsum.photos/id/1015/1920/1080",
    fullDescription: "Государственная программа в сфере образования направлена на повышение качества и доступности образования для всех граждан Республики Казахстан. Программа охватывает все уровни образования — от дошкольного до высшего.",
    objectives: ["Повышение качества образовательных услуг", "Цифровизация учебных процессов", "Подготовка кадров для новых отраслей экономики"],
    budget: "250 млрд тенге",
    period: "2024–2026",
    participants: "1,2 млн человек",
    conditions: "Гражданство РК, возраст 16–35 лет, прохождение конкурсного отбора.",
    results: "Ожидается охват 1,2 млн участников, запуск 300 новых учебных центров по всей стране.",
  },
  {
    id: 2,
    title: "Название Госпрограммы 2",
    description: "Краткое описание второй программы. Можно менять текст под конкретную госпрограмму.",
    category: "Бизнес и предпринимательство",
    image: "https://picsum.photos/id/201/1920/1080",
    fullDescription: "Программа поддержки малого и среднего бизнеса обеспечивает предпринимателям доступ к льготному финансированию, гарантийным инструментам и нефинансовым мерам поддержки.",
    objectives: ["Снижение барьеров для старта бизнеса", "Расширение экспортного потенциала МСБ", "Создание новых рабочих мест"],
    budget: "180 млрд тенге",
    period: "2025–2027",
    participants: "85 000 предпринимателей",
    conditions: "Регистрация как ИП или ТОО, оборот не более 10 млрд тенге в год.",
    results: "Создание не менее 50 000 новых рабочих мест, рост МСБ-сектора на 15%.",
  },
  {
    id: 3,
    title: "Название Госпрограммы 3",
    description: "Ещё одна госпрограмма. Описание можно легко заменить на реальное.",
    category: "Жильё",
    image: "https://picsum.photos/id/133/1920/1080",
    fullDescription: "Жилищная программа обеспечивает доступное жильё для граждан через механизмы льготного ипотечного кредитования, аренды и субсидирования строительства.",
    objectives: ["Обеспечение доступным жильём очередников", "Развитие арендного рынка", "Стимулирование жилищного строительства"],
    budget: "400 млрд тенге",
    period: "2024–2028",
    participants: "120 000 семей",
    conditions: "Постановка на учёт нуждающихся, отсутствие собственного жилья, соответствие доходным критериям.",
    results: "Обеспечение жильём 120 000 семей, ввод 6 млн кв. м жилья.",
  },
  {
    id: 4,
    title: "Название Госпрограммы 4",
    description: "Описание четвёртой программы с моковыми данными.",
    category: "Инвестиции",
    image: "https://picsum.photos/id/106/1920/1080",
    fullDescription: "Инвестиционная программа направлена на привлечение прямых иностранных инвестиций и стимулирование внутренних капитальных вложений в приоритетные отрасли экономики.",
    objectives: ["Привлечение ПИИ в объёме $10 млрд", "Создание индустриальных зон", "Поддержка высокотехнологичных проектов"],
    budget: "600 млрд тенге",
    period: "2025–2030",
    participants: "500 инвестиционных проектов",
    conditions: "Минимальный объём инвестиций от 500 млн тенге, реализация в приоритетных секторах.",
    results: "Привлечение не менее $10 млрд ПИИ, создание 30 000 рабочих мест.",
  },
];

const newsPhoto = "https://i.pinimg.com/736x/48/b4/40/48b4403d23b4ca939067d9de85177f51.jpg";

const hotNews = [
  { id: 1, title: "Запущена новая программа поддержки МСБ «Іскер аймақ»", date: "15 апреля 2026", excerpt: "Правительство утвердило единую программу поддержки малого и среднего бизнеса с расширенными гарантиями и льготами." },
  { id: 2, title: "Финансовый центр обработал свыше 1,2 трлн тенге в 2025 году", date: "10 апреля 2026", excerpt: "Значительный рост объёмов финансирования по сравнению с предыдущим периодом." },
  { id: 3, title: "Расширение гарантий по образовательным кредитам", date: "5 апреля 2026", excerpt: "Упрощена процедура получения образовательных кредитов для студентов и их родителей." },
];

const allNews = [
  ...hotNews,
  { id: 4, title: "Подписано соглашение с Министерством финансов РК", date: "2 апреля 2026", excerpt: "Новое соглашение позволит повысить эффективность мониторинга государственных расходов." },
  { id: 5, title: "Цифровая платформа Финансового центра получила международное признание", date: "28 марта 2026", excerpt: "Платформа вошла в топ-10 лучших решений по прозрачности бюджетных процессов." },
  { id: 6, title: "Начало приёма заявок по программе «Келешек» на новый учебный год", date: "20 марта 2026", excerpt: "Родители могут начать формировать накопления для образования детей уже сейчас." },
];

const allTeamMembers = [
  { name: "Иванов Иван Иванович", position: "Председатель правления", department: "Руководство", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Султанова Айгуль Ерлановна", position: "Руководитель департамента мониторинга", department: "Мониторинг", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Каримов Ерлан Бакытович", position: "Главный аналитик", department: "Аналитика", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Ахметова Мария Сергеевна", position: "Директор по цифровизации", department: "IT", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Нурланов Асхат Маратович", position: "Финансовый директор", department: "Финансы", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Джаксыбекова Дина Кайратовна", position: "Руководитель юридического департамента", department: "Юридический", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Сейткали Нурсултан Болатович", position: "Директор инвестиционного департамента", department: "Инвестиции", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Кенжебаева Алия Темировна", position: "Руководитель PR и коммуникаций", department: "PR", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Омаров Серик Жаксыбекович", position: "Руководитель отдела безопасности", department: "Безопасность", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Байжанова Гульнара Аскаровна", position: "Директор операционного департамента", department: "Операции", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Тлеуов Данияр Русланович", position: "Руководитель отдела риск-менеджмента", department: "Риски", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
  { name: "Мусина Зарина Берикбековна", position: "Главный бухгалтер", department: "Финансы", image: "https://i.pinimg.com/1200x/40/1e/23/401e2392dab4fe24fd6f87af326cf978.jpg" },
];

const teamMembers = allTeamMembers.slice(0, 4);

const faqs = [
  {
    category: "Общее",
    q: "Что такое Финансовый центр?",
    a: "Это государственный интегратор финансирования программ Республики Казахстан. Мы обеспечиваем прозрачность и эффективность использования бюджетных средств, объединяя всех участников на единой цифровой платформе.",
  },
  {
    category: "Участие",
    q: "Как участвовать в госпрограммах?",
    a: "Через портал egov.kz или напрямую на платформе Финансового центра. Для подачи заявки требуется ЭЦП. Выберите подходящую программу, ознакомьтесь с условиями и нажмите «Подать заявку».",
  },
  {
    category: "Отчётность",
    q: "Где можно посмотреть отчёты?",
    a: "В разделе «Отчёты и аналитика» после авторизации или в открытых данных на сайте. Авторизация осуществляется через ЭЦП на портале egov.kz.",
  },
  {
    category: "Участие",
    q: "Какие документы нужны для подачи заявки?",
    a: "Список документов зависит от программы. Как правило, необходимы: удостоверение личности, ЭЦП, документы, подтверждающие соответствие условиям. Полный перечень указан на странице каждой программы.",
  },
  {
    category: "Инвестиции",
    q: "Как стать партнёром или инвестором?",
    a: "Направьте заявку на электронный адрес info@fincenter.kz с описанием предлагаемого сотрудничества. Наш департамент партнёрства рассмотрит заявку в течение 5 рабочих дней и свяжется с вами.",
  },
  {
    category: "Общее",
    q: "В каких городах работает Финансовый центр?",
    a: "Головной офис расположен в Астане. Региональные представительства работают во всех областных центрах Казахстана. Большинство услуг доступны онлайн через платформу.",
  },
];

const faqCategories = ["Все", "Общее", "Участие", "Отчётность", "Инвестиции"];

// Investor FAQ
const investorFaqs = [
  {
    q: "Какова минимальная сумма инвестиций в общежития?",
    a: "Минимальный порог входа составляет 50 млн тенге. При этом инвестор получает фиксированную доходность и гарантию выкупа со стороны государства по истечении срока договора.",
  },
  {
    q: "Какую доходность я могу ожидать от инвестиций в частные школы?",
    a: "Доходность составляет от 12% до 16% годовых в зависимости от региона и формата объекта. Выплаты осуществляются ежеквартально в течение всего срока инвестирования.",
  },
  {
    q: "Чем обеспечена надёжность вложений?",
    a: "Инвестиции застрахованы и обеспечены государственными гарантиями. Финансовый центр выступает агентом Министерства финансов РК, что гарантирует исполнение обязательств перед инвесторами.",
  },
  {
    q: "Как проходит процесс заключения договора?",
    a: "После подачи заявки наши специалисты проводят консультацию и формируют индивидуальное предложение. Договор заключается в течение 10 рабочих дней с момента одобрения заявки.",
  },
  {
    q: "Могут ли иностранные инвесторы участвовать в программах?",
    a: "Да. Иностранные юридические и физические лица могут участвовать в инвестиционных программах при наличии необходимой документации и прохождении проверки в соответствии с законодательством РК.",
  },
  {
    q: "Как осуществляется мониторинг объекта инвестирования?",
    a: "Инвесторы получают доступ к личному кабинету на платформе Финансового центра, где в режиме реального времени доступны финансовые показатели объекта, отчёты и аналитика.",
  },
  {
    q: "Можно ли досрочно выйти из инвестиционного проекта?",
    a: "Условия досрочного выхода прописаны в договоре. В большинстве программ предусмотрена возможность переуступки прав требования или частичного погашения начиная со второго года инвестирования.",
  },
  {
    q: "Какие налоговые преференции предусмотрены для инвесторов?",
    a: "Инвесторы в объекты социальной инфраструктуры пользуются льготами в соответствии с Налоговым кодексом РК: освобождение от КПН на период до 5 лет и снижение ставки НДС для отдельных категорий проектов.",
  },
];

const investors = [
  { name: "АО «Самрук-Казына»", type: "Фонд национального благосостояния", logo: "СК", volume: "₸2,4 трлн", share: "38%" },
  { name: "Национальный банк РК", type: "Центральный банк", logo: "НБ", volume: "₸1,1 трлн", share: "17%" },
  { name: "АIFMD Kazakhstan", type: "Альтернативные инвестиции", logo: "AI", volume: "₸780 млрд", share: "12%" },
  { name: "ЕБРР", type: "Международный банк развития", logo: "EB", volume: "₸620 млрд", share: "10%" },
  { name: "АБР", type: "Азиатский банк развития", logo: "АБ", volume: "₸450 млрд", share: "7%" },
  { name: "Частные инвесторы", type: "Институциональные участники", logo: "ЧИ", volume: "₸1,0 трлн", share: "16%" },
];

// Investment directions (fincenter.kz style)
const investmentDirections = [
  {
    icon: Building2,
    title: "Инвестиции в общежития",
    description: "Финансирование строительства и реконструкции студенческих общежитий при государственных вузах. Стабильный арендный поток, обеспеченный государством.",
    yield: "до 14% годовых",
    term: "7–10 лет",
    minInvest: "от ₸50 млн",
    guarantee: "Государственная гарантия",
    color: "from-sky-600/20 to-sky-900/10",
    border: "border-sky-500/30",
    accent: "text-sky-400",
  },
  {
    icon: GraduationCap,
    title: "Инвестиции в частные школы",
    description: "Участие в создании современных частных школ по государственно-частному партнёрству. Высокая социальная значимость и привлекательная доходность.",
    yield: "до 16% годовых",
    term: "10–15 лет",
    minInvest: "от ₸200 млн",
    guarantee: "ГЧП-соглашение с МОН РК",
    color: "from-emerald-600/20 to-emerald-900/10",
    border: "border-emerald-500/30",
    accent: "text-emerald-400",
  },
  {
    icon: Banknote,
    title: "Депозит «AQYL»",
    description: "Образовательный накопительный вклад с государственной премией. Инструмент долгосрочных накоплений для финансирования образования детей.",
    yield: "Премия государства 5–7%",
    term: "от 3 лет",
    minInvest: "от ₸1 млн",
    guarantee: "Гарантия КФГД",
    color: "from-amber-600/20 to-amber-900/10",
    border: "border-amber-500/30",
    accent: "text-amber-400",
  },
];

const investSteps = [
  { step: "01", title: "Заявка", desc: "Заполните форму заявки на сайте или позвоните нам. Специалист свяжется с вами в течение 1 рабочего дня." },
  { step: "02", title: "Консультация", desc: "Проведём детальный разбор условий, ответим на все вопросы и подберём подходящий инструмент." },
  { step: "03", title: "Документация", desc: "Подготовим пакет документов и согласуем условия договора с учётом ваших целей и горизонта инвестирования." },
  { step: "04", title: "Подписание", desc: "Заключение договора в электронном или офлайн-формате. Поступление средств и начало начисления дохода." },
];

// ── HEADER ────────────────────────────────────────────────────────────────────
const Header: React.FC<HeaderProps> = ({ onNav, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <img
          src={fcLogo}
          alt="Финансовый центр"
          onClick={() => onNav('home')}
          className="h-14 w-auto cursor-pointer hover:opacity-70 transition-opacity brightness-0 invert"
        />
        {currentPage === 'home' && (
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {['about','programs','investors','news','team','faq','contacts'].map(id => (
              <a key={id} href={`#${id}`} className="hover:text-sky-400 transition-colors capitalize">
                {id === 'about' ? 'О нас' : id === 'programs' ? 'Госпрограммы' : id === 'investors' ? 'Инвесторам' : id === 'news' ? 'Новости' : id === 'team' ? 'Команда' : id === 'faq' ? 'FAQ' : 'Контакты'}
              </a>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm border border-zinc-700 rounded-full hover:bg-zinc-800 transition-colors">
            <Search size={18} /> Поиск
          </button>
          {currentPage !== 'home' && (
            <button onClick={() => onNav('home')} className="text-sky-400 hover:text-sky-300 flex items-center gap-2 text-sm">
              ← На главную
            </button>
          )}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-6 py-6 flex flex-col gap-4 text-sm">
          {['О нас','Госпрограммы','Инвесторам','Новости','Команда','FAQ','Контакты'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g,'')}`} className="hover:text-sky-400">{item}</a>
          ))}
        </div>
      )}
    </header>
  );
};

// ── PROGRAM DETAIL PAGE ───────────────────────────────────────────────────────
const ProgramPage: React.FC<ProgramPageProps> = ({ program, onBack }) => (
  <div className="bg-zinc-950 text-zinc-200 min-h-screen font-sans">
    <div className="relative h-[55vh] w-full overflow-hidden">
      <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/60 to-black/20" />
      <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl">
        <div className="inline-block bg-sky-600 px-5 py-1.5 text-xs tracking-widest mb-4 rounded-full">{program.category}</div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">{program.title}</h1>
      </div>
    </div>
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <div className="grid grid-cols-3 gap-6">
        {[
          { label: "Бюджет программы", value: program.budget },
          { label: "Период реализации", value: program.period },
          { label: "Участников", value: program.participants },
        ].map((s, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
            <div className="text-3xl font-bold text-sky-400 mb-2">{s.value}</div>
            <div className="text-zinc-400 text-sm">{s.label}</div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-6">О программе</h2>
        <p className="text-zinc-300 text-lg leading-relaxed">{program.fullDescription}</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-6">Цели и задачи</h2>
        <div className="space-y-4">
          {program.objectives.map((obj: string, i: number) => (
            <div key={i} className="flex items-start gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="w-8 h-8 rounded-full bg-sky-600/20 text-sky-400 flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
              <p className="text-zinc-300">{obj}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><Shield className="text-sky-400" size={20} />Условия участия</h3>
          <p className="text-zinc-400 leading-relaxed">{program.conditions}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><TrendingUp className="text-sky-400" size={20} />Ожидаемые результаты</h3>
          <p className="text-zinc-400 leading-relaxed">{program.results}</p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-sky-900/40 to-zinc-900 border border-sky-500/20 rounded-3xl p-10 text-center">
        <h3 className="text-3xl font-bold mb-4">Готовы подать заявку?</h3>
        <p className="text-zinc-400 mb-8">Подайте заявку через портал egov.kz или обратитесь в наш офис</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://egov.kz" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-medium transition-all">
            Подать заявку <ChevronRight size={18} />
          </a>
          <button onClick={onBack}
            className="inline-flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-2xl font-medium transition-all">
            ← Назад
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ── NEWS PAGE ─────────────────────────────────────────────────────────────────
const NewsPage = () => (
  <div className="max-w-7xl mx-auto px-6 py-16">
    <h1 className="text-5xl font-bold mb-4">Все новости</h1>
    <p className="text-zinc-400 mb-12">Последние события и объявления Финансового центра</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {allNews.map((news) => (
        <div key={news.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-sky-500/30 transition group">
          <img src={newsPhoto} alt={news.title} className="w-full h-56 object-cover group-hover:scale-105 transition duration-500" />
          <div className="p-8">
            <div className="text-xs text-zinc-500 mb-3">{news.date}</div>
            <h3 className="text-2xl font-semibold leading-tight mb-4">{news.title}</h3>
            <p className="text-zinc-400 line-clamp-4">{news.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── TEAM PAGE ─────────────────────────────────────────────────────────────────
const TeamPage = () => (
  <div className="max-w-7xl mx-auto px-6 py-16">
    <h1 className="text-5xl font-bold mb-4">Наша команда</h1>
    <p className="text-zinc-400 mb-12">Профессионалы в сфере государственного финансирования</p>
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
      {allTeamMembers.map((member, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="text-center group"
        >
          <div className="overflow-hidden rounded-3xl mb-4 shadow-xl">
            <img src={member.image} alt={member.name} className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500" />
          </div>
          <div className="inline-block text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full mb-2">{member.department}</div>
          <h3 className="font-semibold text-lg leading-tight">{member.name}</h3>
          <p className="text-sky-400 text-sm mt-1">{member.position}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// ── DORMITORY PAGE ────────────────────────────────────────────────────────────
const DormitoryPage = () => {
  const [beds, setBeds] = useState('');
  const [rate, setRate] = useState<'195' | '230' | '92' | '47'>('195');

  const rateValues: Record<string, number> = { '195': 195, '230': 230, '92': 92, '47': 47 };
  const mrpYears: Record<number, number> = { 2025: 3932, 2026: 4325, 2027: 4670, 2028: 5000, 2029: 5350, 2030: 5730 };
  const bedsNum = parseInt(beds) || 0;
  const rateNum = rateValues[rate];

  const gosSteps = [
    { n: 1, text: "Потенциальный поставщик (частный предприниматель) или юридическое лицо (за исключением ГУ) подаёт заявление на заключение предварительного договора на участие в механизме в АО «Финансовый центр» с правоустанавливающими и идентификационными документами." },
    { n: 2, text: "Подготовленный предварительный договор подписывается двумя сторонами: АО «Финансовый центр» и Предприниматель." },
    { n: 3, text: "Частный предприниматель производит строительно-монтажные работы и вводит объект в эксплуатацию." },
    { n: 4, text: "С частным предпринимателем заключается соглашение о неизменности целевого назначения объекта сроком на 20 лет и регистрируется в органах юстиции." },
    { n: 5, text: "Заключение двухстороннего договора госзаказа на выплаты между частным предпринимателем и АО «Финансовый центр»." },
  ];

  const psdItems = [
    { label: "ПСД на 500 мест", href: "#" },
    { label: "ПСД на 244 места", href: "#" },
    { label: "ПСД на 184 места", href: "#" },
    { label: "ПСД на 144 места", href: "#" },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-200 min-h-screen">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-sky-600/6 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-sky-400 text-xs tracking-widest uppercase mb-6 bg-sky-900/20 border border-sky-500/20 px-4 py-2 rounded-full">
            <Building2 size={13} /> Инвестиции в общежития
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
            className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Инвестиции<br />в студенческие общежития
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Финансирование строительства и реконструкции общежитий при государственных вузах. Стабильный госзаказ, государственная гарантия выплат.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center">
            <a href="#dormitory-calc"
              className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-medium transition-all shadow-lg shadow-sky-600/20">
              Рассчитать доход <ArrowRight size={18} />
            </a>
            <a href="#dormitory-steps"
              className="inline-flex items-center gap-3 border border-zinc-700 hover:border-sky-500/40 hover:text-sky-400 px-8 py-4 rounded-2xl font-medium transition-all">
              Алгоритм участия
            </a>
          </motion.div>
        </div>
      </div>

      {/* Статистика */}
      <div className="max-w-5xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Статистика</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { value: "7", label: "Введённые койко-места", sub: "тыс." },
            { value: "27", label: "Планируемые койко-места", sub: "тыс." },
            { value: "23 тыс", label: "Дефицит койко-мест", sub: "" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
              <div className="text-4xl font-bold text-sky-400 mb-2">{s.value}</div>
              <div className="text-zinc-300 font-medium mt-3">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Размеры госзаказа */}
      <div className="bg-zinc-900 py-20 mb-0">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-zinc-400 text-sm mb-10 max-w-2xl mx-auto">
            Первые 12 месяцев госзаказ выплачивается с учётом поправочного коэффициента (количество проживающих студентов умножается на 2, но не более проектной мощности)
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Реконструкция */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
              <div className="text-zinc-400 text-sm mb-4 font-medium">Размеры госзаказа на реконструкцию</div>
              <div className="mb-6">
                <div className="text-5xl font-bold text-sky-400 mb-1">47 МРП</div>
                <div className="text-sky-500 text-sm font-medium">(173 ТЫС. ТЕНГЕ*)</div>
              </div>
              <div className="h-px bg-zinc-800 mb-6" />
              <div className="text-zinc-400 text-sm mb-3">Для городов Астана и Алматы</div>
              <div className="text-4xl font-bold text-sky-400 mb-1">92 МРП</div>
              <div className="text-sky-500 text-sm font-medium">(339 ТЫС. ТЕНГЕ*)</div>
            </div>
            {/* Строительство */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
              <div className="text-zinc-400 text-sm mb-4 font-medium">Размеры госзаказа на строительство</div>
              <div className="mb-6">
                <div className="text-5xl font-bold text-sky-400 mb-1">195 МРП</div>
                <div className="text-sky-500 text-sm font-medium">(720 ТЫС. ТЕНГЕ*)</div>
              </div>
              <div className="h-px bg-zinc-800 mb-6" />
              <div className="text-zinc-400 text-sm mb-3">Для города Алматы</div>
              <div className="text-4xl font-bold text-sky-400 mb-1">230 МРП</div>
              <div className="text-sky-500 text-sm font-medium">(849 ТЫС. ТЕНГЕ*)</div>
            </div>
          </div>
          <p className="text-center text-zinc-500 text-xs mt-6">*Расчёт по МРП 2025 года: 3 932 тенге</p>
        </div>
      </div>

      {/* Калькулятор */}
      <div id="dormitory-calc" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-3">Расчёт объёма подушевого финансирования</h2>
        <p className="text-zinc-400 mb-10">строительства общежитий</p>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-zinc-400 text-sm mb-2 block">Проектная мощность общежития, мест проживания</label>
              <input
                type="number"
                placeholder="Количество мест"
                value={beds}
                onChange={e => setBeds(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-2 block">Территориальная принадлежность</label>
              <select
                value={rate}
                onChange={e => setRate(e.target.value as '195' | '230' | '92' | '47')}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-zinc-200 focus:outline-none focus:border-sky-500 transition"
              >
                <option value="195">195 МРП — для всех регионов (после 2023 г.)</option>
                <option value="230">230 МРП — для г. Алматы (строительство)</option>
                <option value="92">92 МРП — Астана и Алматы (реконструкция)</option>
                <option value="47">47 МРП — остальные регионы (реконструкция)</option>
              </select>
            </div>
          </div>

          {/* Таблица */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">ГОД</th>
                  {[2025, 2026, 2027, 2028, 2029, 2030].map(y => (
                    <th key={y} className="text-center py-3 px-3 text-zinc-400 font-medium">
                      {y}<br />{y >= 2027 && <span className="text-zinc-600 text-xs font-normal">план</span>}
                    </th>
                  ))}
                  <th className="text-center py-3 px-4 text-zinc-400 font-medium">Млн. тенге<br />ИТОГО</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 px-4 font-semibold">МРП</td>
                  {[2025, 2026, 2027, 2028, 2029, 2030].map(y => (
                    <td key={y} className="text-center py-3 px-3 text-zinc-300">{mrpYears[y].toLocaleString('ru')}</td>
                  ))}
                  <td className="text-center py-3 px-4 text-zinc-500">—</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold">бюджет</td>
                  {[2025, 2026, 2027, 2028, 2029, 2030].map(y => {
                    const val = bedsNum > 0 ? ((rateNum * mrpYears[y] * bedsNum) / 1_000_000).toFixed(1) : '0,0';
                    return <td key={y} className="text-center py-3 px-3 text-zinc-300">{val}</td>;
                  })}
                  <td className="text-center py-3 px-4 text-sky-400 font-bold">
                    {bedsNum > 0
                      ? ([2025, 2026, 2027, 2028, 2029, 2030].reduce((s, y) => s + rateNum * mrpYears[y] * bedsNum / 1_000_000, 0)).toFixed(1)
                      : '0,0'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-zinc-500 text-xs mt-4">Расчёт: {rateNum} × 1 МРП × {bedsNum} мест</p>
        </div>
      </div>

      {/* Алгоритм */}
      <div id="dormitory-steps" className="bg-zinc-900 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">Алгоритм размещения госзаказа</h2>
          {/* Верхний ряд: 1, 3, 5 */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[gosSteps[0], gosSteps[2], gosSteps[4]].map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full border-2 border-sky-500 flex items-center justify-center text-sky-400 font-bold text-lg">{step.n}</div>
                  <span className="text-zinc-400 text-sm">шаг</span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">{step.text}</p>
                {step.n === 1 && (
                  <a href="https://fincenter.kz" target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 mt-6 bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                    Подать заявление <ChevronRight size={14} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
          {/* Нижний ряд: 2, 4 */}
          <div className="grid md:grid-cols-2 gap-6 md:px-[16.67%]">
            {[gosSteps[1], gosSteps[3]].map((step, i) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.2 }}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full border-2 border-sky-400/50 flex items-center justify-center text-sky-400 font-bold text-lg">{step.n}</div>
                  <span className="text-zinc-400 text-sm">шаг</span>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Банк ПСД */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Банк ПСД</h2>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {psdItems.map((item, i) => (
              <motion.a key={i} href={item.href} whileHover={{ y: -4 }}
                className="bg-zinc-950 border border-zinc-800 hover:border-sky-500/40 rounded-2xl p-6 text-center transition group">
                <span className="text-sky-400 font-medium text-sm group-hover:text-sky-300 transition underline underline-offset-2">{item.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div id="invest-contact" className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-br from-sky-900/40 via-zinc-900 to-zinc-950 border border-sky-500/20 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-zinc-400 mb-10 max-w-xl mx-auto">Оставьте заявку — наши специалисты свяжутся с вами в течение одного рабочего дня</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:invest@fincenter.kz"
              className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-medium transition-all shadow-lg shadow-sky-600/20">
              <FileText size={18} /> Оставить заявку
            </a>
            <a href="tel:+77172777777"
              className="inline-flex items-center gap-3 border border-zinc-700 hover:border-sky-500/40 hover:text-sky-400 px-8 py-4 rounded-2xl font-medium transition-all">
              <Phone size={18} /> +7 (7172) 77-77-77
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── INVESTORS PAGE ────────────────────────────────────────────────────────────
const InvestorsPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeDormitory, setActiveDormitory] = useState(false);

  if (activeDormitory) return <DormitoryPage />;

  return (
    <div className="bg-zinc-950 text-zinc-200 min-h-screen">
      {/* Hero */}
      <div className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-sky-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-emerald-600/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-sky-400 text-xs tracking-widest uppercase mb-6 bg-sky-900/20 border border-sky-500/20 px-4 py-2 rounded-full">
            <TrendingUp size={13} /> Инвесторам
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Инвестируйте<br />в развитие страны
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Финансовый центр предлагает надёжные инструменты с государственной поддержкой для институциональных и частных инвесторов
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center">
            <a href="#invest-directions"
              className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-medium transition-all shadow-lg shadow-sky-600/20">
              Направления инвестирования <ArrowRight size={18} />
            </a>
            <a href="#invest-contact"
              className="inline-flex items-center gap-3 border border-zinc-700 hover:border-sky-500/40 hover:text-sky-400 px-8 py-4 rounded-2xl font-medium transition-all">
              Заказать консультацию
            </a>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "₸6,35 трлн", label: "Суммарный объём инвестиций" },
            { value: "6", label: "Ключевых инвесторов" },
            { value: "4", label: "Активных программы" },
            { value: "14%", label: "Средняя доходность" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
              <div className="text-3xl font-bold text-sky-400 mb-2">{s.value}</div>
              <div className="text-zinc-500 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Investment Directions */}
      <div id="invest-directions" className="max-w-7xl mx-auto px-6 mb-24">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Направления инвестирования</h2>
          <p className="text-zinc-400 text-lg max-w-2xl">Выберите подходящий инструмент с гарантированной доходностью и государственной поддержкой</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {investmentDirections.map((dir, i) => {
            const Icon = dir.icon;
            const isDormitory = i === 0;
            return (
              <motion.div key={i} whileHover={{ y: -8 }}
                className={`bg-gradient-to-br ${dir.color} border ${dir.border} rounded-3xl p-8 transition group relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/2 rounded-full -translate-y-16 translate-x-16" />
                <div className={`w-14 h-14 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center ${dir.accent} mb-6`}>
                  <Icon size={26} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{dir.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">{dir.description}</p>
                <div className="space-y-3 mb-8">
                  {[
                    { label: "Доходность", value: dir.yield, accent: true },
                    { label: "Срок", value: dir.term, accent: false },
                    { label: "Мин. инвестиция", value: dir.minInvest, accent: false },
                    { label: "Гарантия", value: dir.guarantee, accent: false },
                  ].map((row, j) => (
                    <div key={j} className="flex items-center justify-between text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-zinc-500">{row.label}</span>
                      <span className={row.accent ? `${dir.accent} font-semibold` : 'text-zinc-300 font-medium'}>{row.value}</span>
                    </div>
                  ))}
                </div>
                {isDormitory ? (
                  <button onClick={() => setActiveDormitory(true)}
                    className={`inline-flex items-center gap-2 text-sm font-medium ${dir.accent} hover:gap-3 transition-all`}>
                    Подробнее <ChevronRight size={16} />
                  </button>
                ) : (
                  <a href="#invest-contact"
                    className={`inline-flex items-center gap-2 text-sm font-medium ${dir.accent} hover:gap-3 transition-all`}>
                    Подробнее <ChevronRight size={16} />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* How to start */}
      <div className="bg-zinc-900 py-24 mb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Как начать инвестировать</h2>
            <p className="text-zinc-400 text-lg">Простой процесс в 4 шага</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {investSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative">
                {i < investSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-sky-500/40 to-transparent z-0" />
                )}
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 relative z-10">
                  <div className="text-5xl font-bold text-sky-600/30 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Existing investors */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Партнёры и инвесторы</h2>
          <p className="text-zinc-400 text-lg">Широкая коалиция национальных и международных институциональных инвесторов</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investors.map((inv, i) => (
            <motion.div key={i} whileHover={{ y: -6 }}
              className="bg-zinc-900 border border-zinc-800 hover:border-sky-500/30 rounded-3xl p-8 transition group">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-900/40 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-lg flex-shrink-0">{inv.logo}</div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{inv.name}</h3>
                  <p className="text-zinc-500 text-sm mt-1">{inv.type}</p>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div><div className="text-2xl font-bold text-white">{inv.volume}</div><div className="text-zinc-500 text-xs mt-1">Объём вложений</div></div>
                <div className="text-right"><div className="text-2xl font-bold text-sky-400">{inv.share}</div><div className="text-zinc-500 text-xs mt-1">Доля</div></div>
              </div>
              <div className="mt-5 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-full" style={{ width: inv.share }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Investor FAQ */}
      <div className="bg-zinc-900 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-sky-400 text-xs tracking-widest uppercase mb-5 bg-sky-900/20 border border-sky-500/20 px-4 py-2 rounded-full">
              <MessageCircle size={13} /> Вопросы инвесторов
            </div>
            <h2 className="text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
            <p className="text-zinc-400">Всё, что нужно знать перед инвестированием</p>
          </div>
          <div className="space-y-3">
            {investorFaqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaq === i ? 'border-sky-500/40 bg-zinc-950' : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left">
                  <span className={`text-base font-medium leading-snug ${openFaq === i ? 'text-white' : 'text-zinc-200'}`}>{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}
                    className={`flex-shrink-0 ${openFaq === i ? 'text-sky-400' : 'text-zinc-500'}`}>
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
                      <div className="px-7 pb-6">
                        <div className="h-px bg-zinc-800 mb-5" />
                        <p className="text-zinc-400 leading-relaxed text-sm">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div id="invest-contact" className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-br from-sky-900/40 via-zinc-900 to-zinc-950 border border-sky-500/20 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">Оставьте заявку — наши специалисты свяжутся с вами в течение одного рабочего дня и подберут оптимальный инструмент</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:invest@fincenter.kz"
              className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-medium transition-all shadow-lg shadow-sky-600/20">
              <FileText size={18} /> Оставить заявку
            </a>
            <a href="tel:+77172777777"
              className="inline-flex items-center gap-3 border border-zinc-700 hover:border-sky-500/40 hover:text-sky-400 px-8 py-4 rounded-2xl font-medium transition-all">
              <Phone size={18} /> +7 (7172) 77-77-77
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── FAQ ITEM ──────────────────────────────────────────────────────────────────
const FaqItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? 'border-sky-500/40 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left group"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 transition-colors ${
            open ? 'bg-sky-600/20 text-sky-400' : 'bg-zinc-800 text-zinc-500'
          }`}>
            {faq.category}
          </span>
          <span className={`text-base font-medium leading-snug transition-colors ${open ? 'text-white' : 'text-zinc-200'}`}>
            {faq.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 transition-colors ${open ? 'text-sky-400' : 'text-zinc-500'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-7 pb-6">
              <div className="h-px bg-zinc-800 mb-5" />
              <p className="text-zinc-400 leading-relaxed text-sm">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── FAQ SECTION ───────────────────────────────────────────────────────────────
const FaqSection = () => {
  const [activeCategory, setActiveCategory] = useState("Все");
  const filtered = activeCategory === "Все" ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="py-28 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-600/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sky-400 text-xs tracking-widest uppercase mb-5 bg-sky-900/20 border border-sky-500/20 px-4 py-2 rounded-full"
          >
            <MessageCircle size={13} /> Помощь и поддержка
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="text-5xl font-bold mb-4"
          >
            Часто задаваемые<br />вопросы
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-zinc-400 text-lg"
          >
            Нашли ответы на {faqs.length} самых популярных вопросов
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {filtered.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold mb-2">Не нашли свой вопрос?</div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Наши специалисты готовы ответить на любой вопрос — напишите нам или позвоните, и мы поможем разобраться.
            </p>
          </div>
          <a
            href="#contacts"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 active:scale-95 text-white px-8 py-4 rounded-2xl font-medium transition-all shadow-lg shadow-sky-600/20 whitespace-nowrap"
          >
            Связаться с нами <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
const HomePage: React.FC<HomePageProps> = ({ onNav }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToProgram = (direction: 'prev' | 'next') => {
    const container = document.querySelector('.hero-scroll') as HTMLElement | null;
    if (!container) return;
    const newIndex = direction === 'next'
      ? Math.min(currentIndex + 1, programs.length - 1)
      : Math.max(currentIndex - 1, 0);
    container.scrollTo({ left: newIndex * window.innerWidth, behavior: 'smooth' });
    setCurrentIndex(newIndex);
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === programs.length - 1;

  return (
    <>
      {/* HERO */}
      <section id="programs" className="relative h-screen w-full bg-black overflow-hidden">
        <div className="hero-scroll flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.15 }}
              className="min-w-full h-full relative flex-shrink-0 bg-cover bg-center snap-start"
              style={{ backgroundImage: `url(${program.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
                <div className="inline-block bg-sky-600 px-5 py-1.5 text-xs tracking-widest mb-6 rounded-full">{program.category}</div>
                <h1 className="text-5xl md:text-7xl font-bold leading-none mb-6">{program.title}</h1>
                <p className="text-lg md:text-xl text-zinc-300 max-w-xl mb-10">{program.description}</p>
                <button
                  onClick={() => onNav('program', program)}
                  className="inline-flex items-center gap-3 bg-white text-black hover:bg-sky-400 hover:text-white px-8 py-4 rounded-2xl text-lg font-medium transition-all group"
                >
                  Подробнее <ArrowRight className="group-hover:translate-x-1 transition" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => scrollToProgram('prev')}
          disabled={isFirst}
          className={`absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 backdrop-blur-md p-4 md:p-5 rounded-2xl transition-all border shadow-xl
            ${isFirst ? 'bg-black/20 border-white/5 text-white/20 cursor-not-allowed' : 'bg-black/70 hover:bg-black/90 text-white hover:scale-110 active:scale-95 border-white/10'}`}
        >
          <ArrowLeft size={32} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => scrollToProgram('next')}
          disabled={isLast}
          className={`absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 backdrop-blur-md p-4 md:p-5 rounded-2xl transition-all border shadow-xl
            ${isLast ? 'bg-black/20 border-white/5 text-white/20 cursor-not-allowed' : 'bg-black/70 hover:bg-black/90 text-white hover:scale-110 active:scale-95 border-white/10'}`}
        >
          <ArrowRight size={32} strokeWidth={2.5} />
        </button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {programs.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white scale-125' : 'bg-white/40'}`} />
          ))}
        </div>
      </section>

      {/* О НАС */}
      <section id="about" className="py-24 bg-zinc-900">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold leading-tight mb-8">Государственный интегратор<br />финансирования программ</h2>
              <p className="text-xl text-zinc-400">Мы обеспечиваем прозрачное и эффективное управление средствами, выделяемыми на реализацию государственных программ Республики Казахстан.</p>
            </div>
            <div className="space-y-10">
              <div className="flex gap-6">
                <Shield className="w-12 h-12 text-sky-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-2xl mb-3">Прозрачность</h3>
                  <p className="text-zinc-400">Полный мониторинг распределения бюджетных средств в реальном времени.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <Users className="w-12 h-12 text-sky-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-2xl mb-3">Эффективность</h3>
                  <p className="text-zinc-400">От простого распределения — к управлению результатами.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ИНВЕСТОРАМ — preview block */}
      <section id="investors" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-3 text-sky-400 text-sm tracking-widest uppercase mb-6 bg-sky-900/20 border border-sky-500/20 px-5 py-2 rounded-full">
              <TrendingUp size={16} /> Инвесторам
            </div>
            <h2 className="text-5xl font-bold mb-4">Инвестируйте с нами</h2>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto">Надёжные инструменты с государственной поддержкой и гарантированной доходностью</p>
          </div>

          {/* Direction preview cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {investmentDirections.map((dir, i) => {
              const Icon = dir.icon;
              return (
                <motion.div key={i} whileHover={{ y: -6 }}
                  className={`bg-gradient-to-br ${dir.color} border ${dir.border} rounded-3xl p-7 transition`}>
                  <div className={`w-12 h-12 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center ${dir.accent} mb-5`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{dir.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4">{dir.description.slice(0, 80)}...</p>
                  <span className={`text-lg font-bold ${dir.accent}`}>{dir.yield}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-sky-900/30 to-zinc-900 border border-sky-500/20 rounded-3xl p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-zinc-400 text-sm mb-2 uppercase tracking-widest">Суммарный объём инвестиций</div>
              <div className="text-6xl font-bold text-white">₸6,35 <span className="text-sky-400">трлн</span></div>
            </div>
            <div className="flex gap-10 text-center">
              <div><div className="text-3xl font-bold text-white">6</div><div className="text-zinc-400 text-sm mt-1">Ключевых инвесторов</div></div>
              <div><div className="text-3xl font-bold text-white">4</div><div className="text-zinc-400 text-sm mt-1">Программы</div></div>
              <div><div className="text-3xl font-bold text-white">2026</div><div className="text-zinc-400 text-sm mt-1">Отчётный год</div></div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {/* onNav passed via prop — see below */}}
              className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white px-8 py-4 rounded-2xl font-medium transition-all shadow-lg shadow-sky-600/20"
              id="investors-page-btn"
            >
              Раздел для инвесторов <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* НОВОСТИ */}
      <section id="news" className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-5xl font-bold">Новости</h2>
            <button onClick={() => onNav('news')} className="flex items-center gap-3 text-sky-400 hover:text-sky-300 text-lg group transition">
              Все новости <ArrowRight className="group-hover:translate-x-1 transition" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {hotNews.map((news) => (
              <motion.div key={news.id} whileHover={{ y: -8 }}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden hover:border-sky-500/30 transition group">
                <img src={newsPhoto} alt={news.title} className="w-full h-56 object-cover group-hover:scale-105 transition duration-500" />
                <div className="p-8">
                  <div className="text-xs text-zinc-500 mb-4">{news.date}</div>
                  <h3 className="text-2xl font-semibold leading-tight mb-4 line-clamp-2">{news.title}</h3>
                  <p className="text-zinc-400 line-clamp-3">{news.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* КОМАНДА */}
      <section id="team" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-5xl font-bold">Наша команда</h2>
            <button onClick={() => onNav('team')} className="flex items-center gap-3 text-sky-400 hover:text-sky-300 text-lg group transition">
              Все сотрудники <ArrowRight className="group-hover:translate-x-1 transition" />
            </button>
          </div>
          <p className="text-zinc-400 mb-16">Профессионалы в сфере государственного финансирования</p>
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="text-center group">
                <div className="overflow-hidden rounded-3xl mb-6 shadow-xl">
                  <img src={member.image} alt={member.name} className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <h3 className="font-semibold text-xl">{member.name}</h3>
                <p className="text-sky-400 text-sm mt-1">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">Свяжитесь с нами</h2>
          <p className="text-xl text-zinc-400 mb-12">По всем вопросам работы платформы</p>
          <div className="flex flex-col md:flex-row gap-8 justify-center text-lg">
            <a href="tel:+77172777777" className="hover:text-sky-400">+7 (7172) 77-77-77</a>
            <a href="mailto:info@fincenter.kz" className="hover:text-sky-400">info@fincenter.kz</a>
          </div>
        </div>
      </section>

      <footer className="bg-zinc-900 py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-zinc-500 text-sm">
          © 2026 АО «Финансовый центр». Все права защищены.<br />
          Государственный интегратор финансирования государственных программ Республики Казахстан
        </div>
      </footer>
    </>
  );
};

// We need a wrapper that passes onNav to the investors button
const HomePageWrapper: React.FC<HomePageProps> = ({ onNav }) => {
  // patch the button after render
  useState(() => {
    setTimeout(() => {
      const btn = document.getElementById('investors-page-btn');
      if (btn) btn.onclick = () => onNav('investors');
    }, 200);
  });
  return <HomePage onNav={onNav} />;
};

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const onNav = (target: string, data: Program | null = null) => {
    if (target === 'program') {
      setSelectedProgram(data);
      setPage('program');
      window.scrollTo(0, 0);
    } else {
      setPage(target);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-zinc-950 text-zinc-200 min-h-screen font-sans overflow-x-hidden">
      <Header onNav={onNav} currentPage={page} />
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomePageWrapper onNav={onNav} />
          </motion.div>
        )}
        {page === 'news' && (
          <motion.div key="news" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-zinc-950 min-h-screen">
            <NewsPage />
          </motion.div>
        )}
        {page === 'team' && (
          <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-zinc-950 min-h-screen">
            <TeamPage />
          </motion.div>
        )}
        {page === 'investors' && (
          <motion.div key="investors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-zinc-950 min-h-screen">
            <InvestorsPage />
          </motion.div>
        )}
        {page === 'program' && selectedProgram && (
          <motion.div key="program" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProgramPage program={selectedProgram} onBack={() => onNav('home')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
