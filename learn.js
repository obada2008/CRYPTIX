/* CRYPTIX Learn lab — lessons, step visualizer, letter-frequency lab, avalanche demo, password-hashing lab and challenges.
 * All local; nothing is sent anywhere. Pure functions are exported for tests; the UI is built with textContent only. */
(function () {
'use strict';
const core = typeof module !== 'undefined' && module.exports ? require('./app.js') : window.CRYPTIX;
const enc = new TextEncoder();

/* ---------- Texts ---------- */
const LT = {
  en: {
    btn: 'Learn', title: 'Learn lab', close: 'Close',
    'tab.lessons': 'Lessons', 'tab.viz': 'Step visualizer', 'tab.freq': 'Letter frequency', 'tab.avalanche': 'Avalanche effect', 'tab.pbkdf2': 'Password lab', 'tab.challenges': 'Challenges',
    'ls.intro': 'Short lessons (about 3 minutes each) with a quick check at the end.', 'ls.cards': '{n} cards', 'ls.done': 'Completed', 'ls.card': 'Card {n} of {m}', 'ls.prev': 'Back', 'ls.next': 'Next', 'ls.all': 'All lessons',
    'ls.quiz': 'Quick check', 'ls.right': 'Correct! ', 'ls.wrong': 'Not quite. ', 'ls.try': 'Try it', 'ls.ask': 'Ask the assistant',
    'viz.intro': 'Pick an operation and type a short text (up to 12 characters). Reveal the steps one by one to see exactly how the result is built.', 'viz.op': 'Operation', 'viz.text': 'Your text', 'viz.shift': 'Shift',
    'viz.next': 'Next step', 'viz.all': 'Show all', 'viz.reset': 'Start over', 'viz.step': 'Step {n} of {m}', 'viz.result': 'Result', 'viz.same': '✓ Identical to what the {op} tool produces.', 'viz.diff': '✗ Differs from the tool (this should not happen).',
    'col.char': 'Character', 'col.cp': 'Unicode number', 'col.bytes': 'UTF-8 bytes (decimal)', 'col.byte': 'Byte', 'col.bits': '8 bits', 'col.group': '6-bit group', 'col.idx': 'Number (0–63)', 'col.b64': 'Base64 character',
    'col.hi': 'First half (4 bits)', 'col.lo': 'Second half (4 bits)', 'col.hex': 'Hex', 'col.safe': 'Safe as is?', 'col.out': 'Output', 'col.pos': 'Position', 'col.new': 'Position + shift', 'col.letter': 'Letter', 'col.norm': 'Normalized',
    's.chars': 'Text → characters', 'd.chars': 'Every character has a Unicode number (its code point).', 's.bytes': 'Characters → bytes (UTF-8)', 'd.bytes': 'Computers store text as bytes. English letters use 1 byte, Arabic letters usually 2, emoji 4.',
    's.bits': 'Bytes → bits', 'd.bits': 'Each byte is written as 8 binary digits.', 's.groups': 'Bits → 6-bit groups', 'd.groups': 'Base64 reads the bit stream 6 bits at a time. The last group is padded with zeros (marked *).',
    's.b64': 'Groups → Base64 characters', 'd.b64': 'Each group is a number from 0 to 63 that picks a character from A–Z, a–z, 0–9, + and /.', 's.pad': 'Padding', 'd.pad': 'Output length must be a multiple of 4, so {n} "=" sign(s) are added.',
    's.nib': 'Bytes → two halves', 'd.nib': 'Each byte is split into two 4-bit halves (nibbles), each a number from 0 to 15.', 's.hex': 'Halves → hex digits', 'd.hex': 'Numbers 0–9 stay as digits; 10–15 become a–f.',
    's.safe': 'Is each character safe?', 'd.safe': 'Letters, digits and - _ . ! ~ * \' ( ) can stay as they are.', 's.pct': 'Unsafe characters → %XX', 'd.pct': 'Each byte of an unsafe character becomes % followed by two hex digits.',
    's.norm': 'Normalize Arabic letters', 'd.norm': 'Hamza forms, ة, ى, ؤ and ئ are folded to base letters and diacritics are removed.', 's.pos': 'Letters → positions', 'd.pos': 'A = 0, B = 1, …  (other characters stay unchanged).',
    's.add': 'Add the shift', 'd.add': 'Add the shift and wrap around after the last letter (modulo {n}).', 's.let': 'Positions → letters', 'd.let': 'Turn the new positions back into letters.',
    'freq.intro': 'Letters are not used equally. Frequency analysis uses this to break simple ciphers. Bars show your text; the orange line shows a reference profile of the language.', 'freq.lang': 'Language', 'freq.en': 'English', 'freq.ar': 'Arabic',
    'freq.text': 'Text to analyse', 'freq.cipher': 'Apply a cipher first', 'freq.none': 'None (plain text)', 'freq.caesar': 'Caesar', 'freq.atbash': 'Atbash', 'freq.vig': 'Vigenère (English only)', 'freq.key': 'Key', 'freq.shift': 'Shift',
    'freq.shown': 'Text used for the chart', 'freq.ic': 'Index of coincidence: {v}', 'freq.ic.help': 'Random letters give about {r}; the {lang} reference gives about {x}. Caesar and Atbash keep a text\'s value; Vigenère with a longer key pushes it toward random.',
    'freq.top': 'Most frequent letters: {list}', 'freq.n': 'Letters counted: {n}', 'freq.break': 'Best Caesar shift guess: {n} (lowest chi-squared against the reference profile).', 'freq.few': 'Use at least {n} letters for reliable results.',
    'freq.vlen': 'Key-length clue: average index of coincidence when taking every k-th letter', 'freq.vlen.note': 'The true key length (and its multiples) tends to give the highest values.',
    'freq.src': 'Arabic reference: Wikipedia "Arabic letter frequency" (about 5.1 million letters from three classical Arabic books, forms folded into the 28 base letters). Modern or other kinds of text differ. English reference: standard published letter frequencies.', 'freq.chart': 'Letter frequency chart',
    'av.intro': 'Change one character of the input and the hash changes completely. Each square is one bit of the hash; orange outlines mark bits that differ.', 'av.algo': 'Algorithm', 'av.a': 'Input A', 'av.b': 'Input B', 'av.mut': 'Change one character in B',
    'av.diff': '{d} of {t} bits differ ({p}%). A good hash flips about half of its bits.', 'av.ha': 'Hash of A', 'av.hb': 'Hash of B',
    'pw.intro': 'A fast hash lets an attacker test billions of guesses. Password hashing is deliberately slow. This lab measures PBKDF2-HMAC-SHA256 on your own device. Do not type a real password.', 'pw.pass': 'Demo password', 'pw.run': 'Run benchmark', 'pw.busy': 'Running…',
    'pw.iter': 'Iterations', 'pw.ms': 'Time per hash', 'pw.rate': 'Guesses per second', 'pw.mil': 'Time to try 1,000,000 guesses', 'pw.x': 'Slower than 1 iteration',
    'pw.note': 'Attackers use specialised hardware that is far faster than this page, so treat the numbers as a comparison, not a safety estimate. The smallest rows include fixed overhead. OWASP\'s Password Storage Cheat Sheet lists Argon2id first for new systems and PBKDF2-HMAC-SHA256 with at least 600,000 iterations when PBKDF2 is required (checked in October 2026; verify the current guidance).',
    'pw.salt': 'Why salts matter', 'pw.salt.run': 'Hash the same password with two random salts', 'pw.salt.out': 'Different salts give completely different hashes, so one precomputed table cannot crack many users at once.', 'pw.nocrypto': 'Web Crypto is unavailable here (it needs HTTPS or localhost).',
    'u.ms': 'ms', 'u.s': 's', 'u.min': 'min', 'u.h': 'hours', 'u.d': 'days', 'u.y': 'years',
    'ch.intro': 'Decode each message. Answers are checked in your browser and progress is saved on this device. Hints cost stars.', 'ch.solved': '{n} of {m} solved', 'ch.level': 'Level {n}', 'ch.data': 'The message', 'ch.cands': 'Candidate words: {list}',
    'ch.copy': 'Copy', 'ch.copied': 'Copied', 'ch.send': 'Send to workspace', 'ch.hint': 'Show hint ({k}/{m})', 'ch.nohint': 'No more hints', 'ch.ans': 'Your answer (the secret word)', 'ch.check': 'Check',
    'ch.right': '✓ Correct!', 'ch.wrong': '✗ Not quite. Try again or use a hint.', 'ch.stars': '{n} of 3 stars', 'ch.back': 'All levels', 'ch.reset': 'Reset progress', 'ch.confirm': 'Delete all challenge and lesson progress?',
    'ch.how': 'How it works', 'ch.note': 'Answers are stored only as hashes, but the source code is open, so this is a game for learning, not a secure vault.', 'ch.hints': 'Hints', 'ch.todo': 'Not solved yet'
  },
  ar: {
    btn: 'تعلّم', title: 'مختبر التعلّم', close: 'إغلاق',
    'tab.lessons': 'الدروس', 'tab.viz': 'مصوّر الخطوات', 'tab.freq': 'تكرار الحروف', 'tab.avalanche': 'أثر الانهيار', 'tab.pbkdf2': 'مختبر كلمات المرور', 'tab.challenges': 'التحديات',
    'ls.intro': 'دروس قصيرة (نحو 3 دقائق لكل درس) مع سؤال سريع في النهاية.', 'ls.cards': '{n} بطاقات', 'ls.done': 'مكتمل', 'ls.card': 'البطاقة {n} من {m}', 'ls.prev': 'السابق', 'ls.next': 'التالي', 'ls.all': 'كل الدروس',
    'ls.quiz': 'اختبار سريع', 'ls.right': 'صحيح! ', 'ls.wrong': 'ليس تمامًا. ', 'ls.try': 'جرّبه', 'ls.ask': 'اسأل المساعد',
    'viz.intro': 'اختر عملية واكتب نصًا قصيرًا (حتى 12 حرفًا). اكشف الخطوات واحدة تلو الأخرى لترى كيف يُبنى الناتج بالضبط.', 'viz.op': 'العملية', 'viz.text': 'نصك', 'viz.shift': 'الإزاحة',
    'viz.next': 'الخطوة التالية', 'viz.all': 'أظهر الكل', 'viz.reset': 'ابدأ من جديد', 'viz.step': 'الخطوة {n} من {m}', 'viz.result': 'النتيجة', 'viz.same': '✓ مطابق لما تنتجه أداة {op}.', 'viz.diff': '✗ يختلف عن الأداة (لا ينبغي أن يحدث هذا).',
    'col.char': 'الحرف', 'col.cp': 'رقم Unicode', 'col.bytes': 'بايتات UTF-8 (عشري)', 'col.byte': 'البايت', 'col.bits': '8 بتات', 'col.group': 'مجموعة 6 بتات', 'col.idx': 'الرقم (0–63)', 'col.b64': 'حرف Base64',
    'col.hi': 'النصف الأول (4 بتات)', 'col.lo': 'النصف الثاني (4 بتات)', 'col.hex': 'Hex', 'col.safe': 'آمن كما هو؟', 'col.out': 'الناتج', 'col.pos': 'الموضع', 'col.new': 'الموضع + الإزاحة', 'col.letter': 'الحرف', 'col.norm': 'بعد التوحيد',
    's.chars': 'النص ← أحرف', 'd.chars': 'لكل حرف رقم في Unicode (رمزه).', 's.bytes': 'الأحرف ← بايتات (UTF-8)', 'd.bytes': 'تخزّن الحواسيب النص بايتات. الحرف الإنجليزي بايت واحد، والعربي غالبًا بايتان، والإيموجي أربعة.',
    's.bits': 'البايتات ← بتات', 'd.bits': 'يُكتب كل بايت بثماني خانات ثنائية.', 's.groups': 'البتات ← مجموعات من 6 بتات', 'd.groups': 'يقرأ Base64 سلسلة البتات 6 بتات في كل مرة. وتُحشى المجموعة الأخيرة بأصفار (علامتها *).',
    's.b64': 'المجموعات ← أحرف Base64', 'd.b64': 'كل مجموعة رقم من 0 إلى 63 يختار حرفًا من A–Z وa–z و0–9 و+ و/.', 's.pad': 'الحشو', 'd.pad': 'يجب أن يكون طول الناتج من مضاعفات 4، فتُضاف {n} علامة (علامات) "=".',
    's.nib': 'البايتات ← نصفان', 'd.nib': 'يُقسَم كل بايت إلى نصفين من 4 بتات، وكل نصف رقم من 0 إلى 15.', 's.hex': 'الأنصاف ← خانات ست عشرية', 'd.hex': 'الأرقام 0–9 تبقى كما هي، و10–15 تصبح a–f.',
    's.safe': 'هل كل حرف آمن؟', 'd.safe': 'الأحرف والأرقام و - _ . ! ~ * \' ( ) تبقى كما هي.', 's.pct': 'الأحرف غير الآمنة ← %XX', 'd.pct': 'كل بايت من الحرف غير الآمن يصبح % متبوعًا بخانتين ست عشريتين.',
    's.norm': 'توحيد الحروف العربية', 'd.norm': 'تُوحَّد صور الهمزة وة وى وؤ وئ إلى الحروف الأساسية وتُزال الحركات.', 's.pos': 'الحروف ← مواضع', 'd.pos': 'A = 0 وB = 1 …  (وتبقى بقية الرموز كما هي).',
    's.add': 'أضف الإزاحة', 'd.add': 'أضف الإزاحة ثم ارجع إلى البداية بعد آخر حرف (باقي القسمة على {n}).', 's.let': 'المواضع ← حروف', 'd.let': 'حوّل المواضع الجديدة إلى حروف.',
    'freq.intro': 'الحروف لا تُستخدم بالتساوي. وتحليل التكرار يستغل ذلك لكسر الشيفرات البسيطة. تعرض الأعمدة نصك، والخط البرتقالي يعرض نمطًا مرجعيًا للغة.', 'freq.lang': 'اللغة', 'freq.en': 'الإنجليزية', 'freq.ar': 'العربية',
    'freq.text': 'النص المراد تحليله', 'freq.cipher': 'طبّق شيفرة أولًا', 'freq.none': 'بدون (نص عادي)', 'freq.caesar': 'قيصر', 'freq.atbash': 'أتباش', 'freq.vig': 'فيجينير (للإنجليزية فقط)', 'freq.key': 'المفتاح', 'freq.shift': 'الإزاحة',
    'freq.shown': 'النص المستخدم في المخطط', 'freq.ic': 'معامل التطابق: {v}', 'freq.ic.help': 'الحروف العشوائية تعطي نحو {r}، والمرجع {lang} يعطي نحو {x}. قيصر وأتباش يُبقيان قيمة النص، وفيجينير بمفتاح أطول يدفعها نحو العشوائية.',
    'freq.top': 'أكثر الحروف تكرارًا: {list}', 'freq.n': 'عدد الحروف المحسوبة: {n}', 'freq.break': 'أفضل تخمين لإزاحة قيصر: {n} (أقل مربع كاي مقابل النمط المرجعي).', 'freq.few': 'استخدم {n} حرفًا على الأقل لنتائج موثوقة.',
    'freq.vlen': 'مؤشر طول المفتاح: متوسط معامل التطابق عند أخذ كل حرف k-ث', 'freq.vlen.note': 'الطول الحقيقي للمفتاح (ومضاعفاته) يعطي عادة أعلى القيم.',
    'freq.src': 'المرجع العربي: ويكيبيديا "Arabic letter frequency" (نحو 5.1 مليون حرف من ثلاثة كتب عربية تراثية، مع دمج الصور في الحروف الـ28 الأساسية). النصوص الحديثة أو من أنواع أخرى تختلف. المرجع الإنجليزي: جدول تكرار الحروف المنشور المعتاد.', 'freq.chart': 'مخطط تكرار الحروف',
    'av.intro': 'غيّر حرفًا واحدًا من المدخل فتتغير التجزئة كليًا. كل مربع بت واحد من التجزئة، والإطار البرتقالي يعلّم البتات المختلفة.', 'av.algo': 'الخوارزمية', 'av.a': 'المدخل A', 'av.b': 'المدخل B', 'av.mut': 'غيّر حرفًا واحدًا في B',
    'av.diff': 'اختلف {d} من {t} بتًا ({p}%). التجزئة الجيدة تقلب نحو نصف بتاتها.', 'av.ha': 'تجزئة A', 'av.hb': 'تجزئة B',
    'pw.intro': 'التجزئة السريعة تتيح للمهاجم تجربة مليارات التخمينات. أما تجزئة كلمات المرور فبطيئة عمدًا. يقيس هذا المختبر PBKDF2-HMAC-SHA256 على جهازك. لا تكتب كلمة مرور حقيقية.', 'pw.pass': 'كلمة مرور تجريبية', 'pw.run': 'شغّل القياس', 'pw.busy': 'جارٍ التشغيل…',
    'pw.iter': 'عدد التكرارات', 'pw.ms': 'الزمن لكل تجزئة', 'pw.rate': 'تخمينات في الثانية', 'pw.mil': 'زمن تجربة مليون تخمين', 'pw.x': 'أبطأ من تكرار واحد بمقدار',
    'pw.note': 'يستخدم المهاجمون عتادًا متخصصًا أسرع بكثير من هذه الصفحة، فاعتبر الأرقام مقارنة وليست تقديرًا للأمان. الصفوف الأصغر تتضمن زمنًا ثابتًا للتجهيز. دليل OWASP لتخزين كلمات المرور يضع Argon2id أولًا للأنظمة الجديدة، وPBKDF2-HMAC-SHA256 بما لا يقل عن 600,000 تكرار عند الحاجة إلى PBKDF2 (روجع في أكتوبر 2026؛ تحقق من الإرشادات الحالية).',
    'pw.salt': 'لماذا يهم الـ salt', 'pw.salt.run': 'جزّئ كلمة المرور نفسها بـ salt عشوائيين', 'pw.salt.out': 'الـ salt المختلف يعطي تجزئات مختلفة تمامًا، فلا يكفي جدول محسوب مسبقًا واحد لكسر مستخدمين كثيرين دفعة واحدة.', 'pw.nocrypto': 'Web Crypto غير متاح هنا (يحتاج HTTPS أو localhost).',
    'u.ms': 'مللي ثانية', 'u.s': 'ثانية', 'u.min': 'دقيقة', 'u.h': 'ساعة', 'u.d': 'يومًا', 'u.y': 'سنة',
    'ch.intro': 'فك كل رسالة. تُفحص الإجابات في متصفحك ويُحفظ تقدمك على هذا الجهاز. التلميحات تكلّف نجومًا.', 'ch.solved': 'تم حل {n} من {m}', 'ch.level': 'المستوى {n}', 'ch.data': 'الرسالة', 'ch.cands': 'الكلمات المرشحة: {list}',
    'ch.copy': 'نسخ', 'ch.copied': 'تم النسخ', 'ch.send': 'أرسلها إلى مساحة العمل', 'ch.hint': 'أظهر تلميحًا ({k}/{m})', 'ch.nohint': 'لا مزيد من التلميحات', 'ch.ans': 'إجابتك (الكلمة السرية)', 'ch.check': 'تحقق',
    'ch.right': '✓ صحيح!', 'ch.wrong': '✗ ليس تمامًا. حاول مجددًا أو استخدم تلميحًا.', 'ch.stars': '{n} من 3 نجوم', 'ch.back': 'كل المستويات', 'ch.reset': 'تصفير التقدم', 'ch.confirm': 'حذف كل تقدم التحديات والدروس؟',
    'ch.how': 'كيف تعمل', 'ch.note': 'تُخزَّن الإجابات كتجزئات فقط، لكن الكود مفتوح، فهذه لعبة للتعلم وليست خزنة آمنة.', 'ch.hints': 'التلميحات', 'ch.todo': 'لم يُحل بعد'
  }
};

/* ---------- Lessons (4 cards + a quick check each) ---------- */
const LESSONS = [
  { id: 'enc', try: { tab: 'viz', op: 'caesar' }, ask: 'enc',
    en: { title: 'What is encryption? (3 minutes)', cards: [['The problem', 'You want to send a message that only your friend can read, but anyone can look at the envelope while it travels across the internet.'], ['The idea', 'Encryption scrambles the message using a method (the algorithm) and a secret (the key). Without the key, the scrambled text (ciphertext) looks like noise.'], ['An old example', 'Caesar shifted every letter by 3, so A became D. It is easy to break because there are only 25 shifts. Modern encryption such as AES uses keys with an astronomically larger number of possibilities (2^128 or more).'], ['Remember', 'Security should come from keeping the key secret, not from hiding the method. And encryption protects secrecy; it does not prove who sent the message.']],
      quiz: { q: 'What does someone need to read ciphertext?', o: ['The key', 'A faster computer', 'The name of the algorithm'], a: 0, x: 'The algorithm is usually public. Only the key must stay secret.' } },
    ar: { title: 'ما هو التشفير؟ (3 دقائق)', cards: [['المشكلة', 'تريد إرسال رسالة لا يقرؤها إلا صديقك، لكن أي شخص يستطيع النظر إلى الظرف أثناء سفره عبر الإنترنت.'], ['الفكرة', 'التشفير يخلط الرسالة بطريقة (الخوارزمية) وسر (المفتاح). وبدون المفتاح يبدو النص المخلوط (النص المشفّر) كضوضاء.'], ['مثال قديم', 'كان قيصر يزيح كل حرف 3 مواضع فيصير A هو D. كسره سهل لأن الإزاحات الممكنة 25 فقط. أما التشفير الحديث مثل AES فمفاتيحه تملك عددًا هائلًا من الاحتمالات (2^128 أو أكثر).'], ['تذكّر', 'يجب أن يأتي الأمان من سرية المفتاح لا من إخفاء الطريقة. والتشفير يحمي السرية، لكنه لا يثبت من أرسل الرسالة.']],
      quiz: { q: 'ماذا يحتاج الشخص ليقرأ النص المشفّر؟', o: ['المفتاح', 'حاسوبًا أسرع', 'اسم الخوارزمية'], a: 0, x: 'الخوارزمية عادةً علنية، والمفتاح وحده هو الذي يجب أن يبقى سرًا.' } } },
  { id: 'three', try: { tab: 'avalanche' }, ask: 'encvs',
    en: { title: 'Encoding, encryption and hashing', cards: [['Encoding', 'A different way to write the same data so computers can handle it (Base64, URL encoding). There is no secret: anyone can reverse it.'], ['Encryption', 'Hides data using a key. You can get the original back if you have the key.'], ['Hashing', 'A one-way fingerprint. The same input always gives the same hash, and any tiny change gives a completely different one. Used to check that data did not change and to verify passwords.'], ['Cheat sheet', 'Need to hide data? Encrypt. Need to check it did not change? Hash. Need to carry data through a text-only channel? Encode.']],
      quiz: { q: 'Which of these is NOT meant to be reversed?', o: ['Hashing', 'Encoding', 'Encryption'], a: 0, x: 'A hash is a one-way fingerprint; there is no "decode" for it.' } },
    ar: { title: 'الترميز والتشفير والتجزئة', cards: [['الترميز', 'طريقة مختلفة لكتابة البيانات نفسها لتتعامل معها الحواسيب (مثل Base64 وترميز الروابط). لا يوجد سر: يستطيع أي شخص عكسه.'], ['التشفير', 'يخفي البيانات بمفتاح. تستعيد الأصل إذا كان معك المفتاح.'], ['التجزئة', 'بصمة أحادية الاتجاه. المدخل نفسه يعطي دائمًا التجزئة نفسها، وأي تغيير صغير يعطي تجزئة مختلفة كليًا. تُستخدم للتأكد أن البيانات لم تتغير وللتحقق من كلمات المرور.'], ['خلاصة', 'تريد إخفاء البيانات؟ شفّر. تريد التأكد أنها لم تتغير؟ جزّئ. تريد نقلها عبر قناة نصية فقط؟ رمّز.']],
      quiz: { q: 'أي مما يلي ليس مقصودًا أن يُعكس؟', o: ['التجزئة', 'الترميز', 'التشفير'], a: 0, x: 'التجزئة بصمة أحادية الاتجاه، ولا يوجد لها "فك".' } } },
  { id: 'b64', try: { tab: 'viz', op: 'base64' }, ask: 'base64',
    en: { title: 'Why Base64 is not secret', cards: [['What it is', 'Base64 writes any bytes using 64 printable characters, so binary data can travel through text systems such as email or JSON.'], ['How it works', 'It takes 3 bytes (24 bits) and cuts them into four 6-bit groups. Each group picks one character from a fixed table. Open the step visualizer to watch it happen.'], ['Why it is not secret', 'The table is public and there is no key. Anyone can run the steps backwards in a second.'], ['A common mistake', 'Storing a password as Base64 is the same as storing it in plain text. Use a slow salted password hash instead.']],
      quiz: { q: 'Is a Base64-encoded password safe to store in a database?', o: ['Yes, it looks scrambled', 'No, anyone can decode it', 'Only if it is long'], a: 1, x: 'Base64 is an encoding, not encryption.' } },
    ar: { title: 'لماذا Base64 ليس سريًا', cards: [['ما هو', 'يكتب Base64 أي بايتات بـ 64 حرفًا قابلًا للطباعة، لتعبر البيانات الثنائية عبر أنظمة النصوص مثل البريد وJSON.'], ['كيف يعمل', 'يأخذ 3 بايتات (24 بتًا) ويقطّعها إلى أربع مجموعات من 6 بتات، وكل مجموعة تختار حرفًا من جدول ثابت. افتح مصوّر الخطوات لتراه يحدث.'], ['لماذا ليس سريًا', 'الجدول علني ولا يوجد مفتاح. يستطيع أي شخص تنفيذ الخطوات بالعكس في ثانية.'], ['خطأ شائع', 'تخزين كلمة المرور بصيغة Base64 مثل تخزينها كنص عادي تمامًا. استخدم تجزئة بطيئة بـ salt بدلًا من ذلك.']],
      quiz: { q: 'هل يصلح تخزين كلمة مرور مرمّزة بـ Base64 في قاعدة بيانات؟', o: ['نعم، تبدو مخلوطة', 'لا، يستطيع أي شخص فكها', 'فقط إذا كانت طويلة'], a: 1, x: 'Base64 ترميز وليس تشفيرًا.' } } },
  { id: 'freq', try: { tab: 'freq' }, ask: 'breaking',
    en: { title: 'How classical ciphers are broken', cards: [['Letters are not equal', 'In English, E is far more common than Z. In Arabic, ا and ل are the most frequent letters. Every language has a fingerprint like this.'], ['Caesar keeps the pattern', 'A Caesar shift only moves each letter to another one. The tall bars stay tall, just in different places. Comparing the pattern with the language profile reveals the shift.'], ['Vigenère hides it, but not fully', 'A keyword flattens the pattern, but the key repeats. Looking at every 5th letter (for a 5-letter key) brings the pattern back. Try the key-length clue in the lab.'], ['Modern ciphers', 'Good modern ciphers leave no such statistical pattern, which is why attacks like these do not work against AES.']],
      quiz: { q: 'Why does frequency analysis break a Caesar cipher?', o: ['Shifting letters does not change how often each one appears', 'The key is always 3', 'It tries every key on a supercomputer'], a: 0, x: 'The counts only move to different letters, so the pattern stays recognisable.' } },
    ar: { title: 'كيف تُكسر الشيفرات الكلاسيكية', cards: [['الحروف ليست متساوية', 'في الإنجليزية حرف E أكثر شيوعًا بكثير من Z، وفي العربية ا ول أكثر الحروف تكرارًا. لكل لغة بصمة كهذه.'], ['قيصر تُبقي النمط', 'إزاحة قيصر تنقل كل حرف إلى حرف آخر فقط، فتبقى الأعمدة الطويلة طويلة لكن في أماكن مختلفة. ومقارنة النمط بنمط اللغة تكشف الإزاحة.'], ['فيجينير تخفيه لكن ليس كليًا', 'الكلمة المفتاحية تسطّح النمط لكن المفتاح يتكرر. فأخذ كل حرف خامس (لمفتاح من 5 أحرف) يعيد النمط. جرّب مؤشر طول المفتاح في المختبر.'], ['الشيفرات الحديثة', 'الشيفرات الحديثة الجيدة لا تترك نمطًا إحصائيًا كهذا، ولذلك لا تنجح هذه الهجمات ضد AES.']],
      quiz: { q: 'لماذا يكسر تحليل التكرار شيفرة قيصر؟', o: ['لأن إزاحة الحروف لا تغيّر عدد مرات ظهور كل حرف', 'لأن المفتاح دائمًا 3', 'لأنه يجرّب كل المفاتيح بحاسوب خارق'], a: 0, x: 'الأعداد تنتقل إلى حروف أخرى فقط، فيبقى النمط قابلًا للتعرف.' } } }
];

/* ---------- Challenges: text, plus generated data (answers only as SHA-256 hashes) ---------- */
const LEVEL_IDS = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10', 'l11', 'l12'];
const LEVEL_TEXT = {
  en: {
    l1: ['Letters, digits and an equals sign', 'You found a message that uses only letters, digits, + and /, and ends with "=".', ['This looks like Base64.', 'In the workspace choose Base64 and switch to Decode (or press Apply on the Magic banner).'], 'Base64 turns bytes into printable characters. It is an encoding, not encryption: anyone can decode it.'],
    l2: ['Numbers and letters a–f', 'A message made only of 0–9 and a–f.', ['Each pair of characters is one byte written in hexadecimal.', 'Use Hexadecimal → Decode.'], 'Hexadecimal writes each byte as two digits. Again an encoding: no key is involved.'],
    l3: ['Zeros and ones', 'Groups of eight 0s and 1s.', ['Each group of 8 bits is one byte.', 'Use Binary → Decode.'], 'Eight bits make a byte, and bytes spell text through UTF-8.'],
    l4: ['Almost English', 'The letters look like English words, but they are scrambled.', ['Rotate every letter by 13. Doing it twice restores the text.', 'Use ROT13.'], 'ROT13 shifts letters by 13 places. It hides spoilers, not secrets.'],
    l5: ['Unknown shift', 'A Caesar-style message. You do not know the shift.', ['There are only 25 possible shifts, so you can try them all.', 'Use Caesar Brute Force and look for the starred line.'], 'With only 25 keys, Caesar falls to brute force instantly. That is why it is only a teaching cipher.'],
    l6: ['Layers', 'The message was encoded more than once.', ['Decode it, then look at the result again.', 'Paste it into the input: the Magic banner can peel several layers at once.'], 'Encoding the same data again and again adds no secrecy. Magic can undo common layers.'],
    l7: ['Dots and dashes', 'A message made of dots, dashes and slashes.', ['This is Morse code: letters are separated by spaces and words by /.', 'Use Morse Code → Decode.'], 'Morse is a code, not encryption.'],
    l8: ['A mirror', 'The alphabet looks flipped: A and Z have swapped places.', ['Atbash replaces each letter with its mirror letter.', 'Use Atbash Cipher.'], 'Atbash has no key at all, so anyone who knows the method can read it.'],
    l9: ['A keyword', 'A Vigenère message. The key is the name of this site, in lowercase.', ['The site name is CRYPTIX, so the key is cryptix.', 'Use Vigenère → Decrypt with the key cryptix.'], 'Vigenère uses a repeating key. With the key it is easy; without it you must work out the key length first.'],
    l10: ['Arabic Caesar', 'A message in Arabic letters, shifted by a small unknown amount (between 1 and 10).', ['The Arabic alphabet has 28 letters, so there are 27 possible shifts. Try them.', 'Use Arabic Caesar Cipher → Decrypt with shift 5. The text comes back in normalized spelling (ة becomes ه), which the answer check accepts.'], 'Same idea as Caesar, over 28 letters. Frequency analysis works in Arabic too (see the Letter frequency tab).'],
    l11: ['Find the word', 'You know the SHA-256 hash of a secret word, and the word is one of the candidates.', ['A hash cannot be reversed, but you can hash each candidate and compare.', 'Use SHA-256 on each candidate word and compare it with the message.'], 'This is exactly how weak password hashes get cracked: guess, hash, compare. Slow hashes and salts make it far harder.'],
    l12: ['A token', 'A token made of three parts separated by dots. What is hidden in its payload?', ['This is a JWT. Its first two parts are only Base64URL-encoded.', 'Use the JWT Decoder and read the secret field.'], 'A JWT payload can be read by anyone. The signature only proves it was not modified.']
  },
  ar: {
    l1: ['أحرف وأرقام وعلامة يساوي', 'وجدت رسالة تستخدم الأحرف والأرقام و+ و/ فقط، وتنتهي بـ "=".', ['هذا يشبه Base64.', 'في مساحة العمل اختر Base64 وبدّل إلى فك الترميز (أو اضغط تطبيق في شريط Magic).'], 'Base64 يحوّل البايتات إلى أحرف قابلة للطباعة. هو ترميز وليس تشفيرًا: يفكه أي شخص.'],
    l2: ['أرقام وأحرف من a إلى f', 'رسالة مكوّنة من 0–9 وa–f فقط.', ['كل زوج من الأحرف هو بايت واحد مكتوب بالنظام الست عشري.', 'استخدم ست عشري ← فك الترميز.'], 'النظام الست عشري يكتب كل بايت بخانتين. وهو ترميز أيضًا ولا يوجد مفتاح.'],
    l3: ['أصفار وآحاد', 'مجموعات من ثماني خانات 0 و1.', ['كل مجموعة من 8 بتات هي بايت واحد.', 'استخدم الثنائي ← فك الترميز.'], 'ثمانية بتات تصنع بايتًا، والبايتات تكتب النص عبر UTF-8.'],
    l4: ['شبه إنجليزي', 'الأحرف تشبه كلمات إنجليزية لكنها مخلوطة.', ['دوّر كل حرف 13 موضعًا. تكراره مرتين يعيد النص.', 'استخدم ROT13.'], 'ROT13 تزيح الأحرف 13 موضعًا. تُخفي حرق الأحداث وليس الأسرار.'],
    l5: ['إزاحة مجهولة', 'رسالة بأسلوب قيصر ولا تعرف الإزاحة.', ['الإزاحات الممكنة 25 فقط، فيمكنك تجربتها كلها.', 'استخدم كسر شيفرة قيصر وابحث عن السطر ذي النجمة.'], 'مع 25 مفتاحًا فقط تُكسر قيصر بالقوة الغاشمة فورًا، ولهذا هي شيفرة تعليمية فقط.'],
    l6: ['طبقات', 'رُمّزت الرسالة أكثر من مرة.', ['فُكّها ثم انظر إلى الناتج مرة أخرى.', 'الصقها في المدخلات: شريط Magic يستطيع إزالة عدة طبقات دفعة واحدة.'], 'ترميز البيانات نفسها مرارًا لا يضيف سرية. ويستطيع Magic التراجع عن الطبقات الشائعة.'],
    l7: ['نقاط وشرطات', 'رسالة من نقاط وشرطات وخطوط مائلة.', ['هذه شيفرة مورس: تُفصل الأحرف بمسافة والكلمات بـ /.', 'استخدم شيفرة مورس ← فك الترميز.'], 'مورس ترميز وليست تشفيرًا.'],
    l8: ['مرآة', 'الأبجدية تبدو مقلوبة: A وZ تبادلا الموضع.', ['أتباش تستبدل كل حرف بنظيره في المرآة.', 'استخدم شيفرة أتباش.'], 'أتباش بلا مفتاح إطلاقًا، فيقرؤها كل من يعرف الطريقة.'],
    l9: ['كلمة مفتاحية', 'رسالة بشيفرة فيجينير. المفتاح هو اسم هذا الموقع بأحرف صغيرة.', ['اسم الموقع CRYPTIX فالمفتاح هو cryptix.', 'استخدم فيجينير ← فك التشفير بالمفتاح cryptix.'], 'فيجينير تستخدم مفتاحًا متكررًا. مع المفتاح الأمر سهل، وبدونه تحتاج أولًا إلى معرفة طول المفتاح.'],
    l10: ['قيصر العربية', 'رسالة بأحرف عربية مُزاحة بمقدار صغير مجهول (بين 1 و10).', ['الأبجدية العربية 28 حرفًا، فالإزاحات الممكنة 27. جرّبها.', 'استخدم شيفرة قيصر العربية ← فك التشفير بإزاحة 5. يعود النص بكتابة موحّدة (تصبح ة هاءً) ويقبلها فحص الإجابة.'], 'الفكرة نفسها كقيصر لكن على 28 حرفًا. وتحليل التكرار يعمل في العربية أيضًا (انظر تبويب تكرار الحروف).'],
    l11: ['اعثر على الكلمة', 'تعرف تجزئة SHA-256 لكلمة سرية، والكلمة واحدة من الكلمات المرشحة.', ['لا يمكن عكس التجزئة، لكن يمكنك تجزئة كل كلمة مرشحة ومقارنتها.', 'طبّق SHA-256 على كل كلمة مرشحة وقارنها بالرسالة.'], 'هكذا بالضبط تُكسر تجزئات كلمات المرور الضعيفة: تخمين ثم تجزئة ثم مقارنة. والتجزئة البطيئة والـ salt تجعلان ذلك أصعب بكثير.'],
    l12: ['رمز مميّز', 'رمز من ثلاثة أجزاء تفصل بينها نقاط. ماذا يختبئ في حمولته؟', ['هذا JWT، وجزءاه الأولان مرمّزان بـ Base64URL فقط.', 'استخدم قارئ JWT واقرأ حقل secret.'], 'يستطيع أي شخص قراءة حمولة JWT. والتوقيع يثبت فقط أنها لم تُعدَّل.']
  }
};
const LEVEL_DATA = {"l1":{"d":"VGhlIHNlY3JldCB3b3JkIGlzOiBsYW50ZXJu","h":"2a6705d5243337ffa4004d9a4c0b0b1fa63a55182144d587dabf1eb77dea5fa7"},"l2":{"d":"5468652073656372657420776f72642069733a206f7263686964","h":"5578033aac3d7bc7dd526134cee5f83adc3e4f79b620b02d2fa2221f0a313a0b"},"l3":{"d":"01010100 01101000 01100101 00100000 01110111 01101111 01110010 01100100 00100000 01101001 01110011 00111010 00100000 01101101 01100001 01110010 01100010 01101100 01100101","h":"c670b871fdb8ecf8f7cbe67f732d82e4338a299baa273fb1ffdb77da59e5db7c"},"l4":{"d":"Gur frperg jbeq vf: snypba","h":"9b8c27ad3460c148be4c047b4be54bd8612ec0aab31121cf69bdc2e9c6b729b7"},"l5":{"d":"Aol zljyla dvyk pz: jvtwhzz","h":"0b6ec3163130a7ac2e4167dee1c57eb33cd72f9ca4e9babbf167a33e6382935a"},"l6":{"d":"VkdobElITmxZM0psZENCM2IzSmtJR2x6T2lCb1lYSjJaWE4w","h":"b6ff600c06ff0dc7d321e12da7844c472138550285c673dc8f102daf55696527"},"l7":{"d":"- .... . / .-- --- .-. -.. / .. ... / .-. .. ...- . .-.","h":"fd7a308e5d24e6d2e49c1fd16099e5de8a7976544e546d63d2d02c278edfa135"},"l8":{"d":"Gsv hvxivg dliw rh: wvhvig","h":"755b342a6d7642173764f088ecfaff08b4c852a3798ba68375f8b6661c4a46b3"},"l9":{"d":"Vyc hxkogk udkl fu: yyguwo","h":"5dbf068ca19482d4c92961da3f7aa6e19a8a41086eb2cf7489aa065d9c429a89"},"l10":{"d":"حيويات حيظضجت تج بسيت","h":"98fe6b5a429b5d854a22cf5cc24f2900808e558b7cdb14be90692c68b0e0d967"},"l11":{"d":"dc3d50da8dac041f660e4ba85339928995e771d99c33cc868f5829800829e382","h":"b1118edaba6957d6347acde250d5b6d9c00114cf5e70535fefae1d53aa94a4da","c":["moon","river","stone","cloud","flame"]},"l12":{"d":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ3Vlc3QiLCJleHAiOjE5MDAwMDAwMDAsInNlY3JldCI6InNhZmZyb24ifQ.VDlMeLBVulBiaVOAJVws0QID10MdJMuXW8oirtS7pzg","h":"bc76305b5f7439793ee2fa1ced8899261447b39fc2c1fee5f6048fd9b0678857"}};

/* ---------- Pure logic (also used by the tests) ---------- */
const hexOf = core.bytesToHex, EN26 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', AR28 = core.AR_ALPHA;
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const cpHex = (c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0') + ' (' + c.codePointAt(0) + ')';
const bin8 = (b) => b.toString(2).padStart(8, '0');

/* Each stage is {t, d, dp, cols, rows} (translation keys + a table). `final` is built from the stages themselves, never from the real tool. */
function vizStages(op, text, shift) {
  const chars = Array.from(text), bytesOf = (c) => Array.from(enc.encode(c)), all = Array.from(enc.encode(text));
  const charSt = { t: 's.chars', d: 'd.chars', cols: ['col.char', 'col.cp'], rows: chars.map((c) => [c, cpHex(c)]) };
  const byteSt = { t: 's.bytes', d: 'd.bytes', cols: ['col.char', 'col.bytes'], rows: chars.map((c) => [c, bytesOf(c).join(' ')]) };
  const bitSt = { t: 's.bits', d: 'd.bits', cols: ['col.byte', 'col.bits'], rows: all.map((b) => [String(b), bin8(b)]) };
  if (op === 'base64') {
    const stream = all.map(bin8).join(''), groups = stream.match(/.{1,6}/g) || [], padN = (3 - (all.length % 3)) % 3;
    const rows = groups.map((g) => { const p = g.padEnd(6, '0'), v = parseInt(p, 2); return [p + (g.length < 6 ? ' *' : ''), String(v), B64[v]]; });
    const out = groups.map((g) => B64[parseInt(g.padEnd(6, '0'), 2)]).join('') + '='.repeat(padN);
    return { stages: [charSt, byteSt, bitSt, { t: 's.groups', d: 'd.groups', cols: ['col.group'], rows: groups.map((g) => [g.padEnd(6, '0') + (g.length < 6 ? ' *' : '')]) },
      { t: 's.b64', d: 'd.b64', cols: ['col.group', 'col.idx', 'col.b64'], rows }, { t: 's.pad', d: 'd.pad', dp: { n: padN }, cols: ['col.out'], rows: [[out]] }], final: out };
  }
  if (op === 'hex') {
    const D = '0123456789abcdef', out = all.map((b) => D[b >> 4] + D[b & 15]).join('');
    return { stages: [charSt, byteSt, { t: 's.nib', d: 'd.nib', cols: ['col.byte', 'col.hi', 'col.lo'], rows: all.map((b) => [String(b), (b >> 4).toString(2).padStart(4, '0') + ' = ' + (b >> 4), (b & 15).toString(2).padStart(4, '0') + ' = ' + (b & 15)]) },
      { t: 's.hex', d: 'd.hex', cols: ['col.byte', 'col.hex'], rows: all.map((b) => [String(b), D[b >> 4] + D[b & 15]]) }], final: out };
  }
  if (op === 'binary') return { stages: [charSt, byteSt, bitSt], final: all.map(bin8).join(' ') };
  if (op === 'url') {
    const SAFE = /^[A-Za-z0-9\-_.!~*'()]$/, outs = chars.map((c) => (SAFE.test(c) ? c : bytesOf(c).map((b) => '%' + b.toString(16).toUpperCase().padStart(2, '0')).join('')));
    return { stages: [{ t: 's.safe', d: 'd.safe', cols: ['col.char', 'col.safe', 'col.bytes'], rows: chars.map((c) => [c, SAFE.test(c) ? '✓' : '✗', bytesOf(c).join(' ')]) },
      { t: 's.pct', d: 'd.pct', cols: ['col.char', 'col.out'], rows: chars.map((c, i) => [c, outs[i]]) }], final: outs.join('') };
  }
  if (op === 'caesar' || op === 'caesarar') {
    const ar = op === 'caesarar', N = ar ? 28 : 26, A = ar ? AR28 : EN26, src = ar ? Array.from(core.arNormalize(text)) : chars, s = ((Number(shift) % N) + N) % N;
    const pos = src.map((c) => { const i = A.indexOf(ar ? c : c.toUpperCase()); return /[A-Za-z\u0621-\u064A]/.test(c) && i >= 0 ? i : -1; });
    const np = pos.map((p) => (p < 0 ? -1 : (p + s) % N)), low = (c) => c === c.toLowerCase() && !ar;
    const outs = src.map((c, i) => (np[i] < 0 ? c : low(c) ? A[np[i]].toLowerCase() : A[np[i]]));
    const st = [];
    if (ar) st.push({ t: 's.norm', d: 'd.norm', cols: ['col.char', 'col.norm'], rows: chars.map((c) => [c, core.arNormalize(c) || '·']) });
    st.push({ t: 's.pos', d: 'd.pos', cols: ['col.char', 'col.pos'], rows: src.map((c, i) => [c, pos[i] < 0 ? '—' : String(pos[i])]) },
      { t: 's.add', d: 'd.add', dp: { n: N }, cols: ['col.char', 'col.pos', 'col.new'], rows: src.map((c, i) => [c, pos[i] < 0 ? '—' : String(pos[i]), np[i] < 0 ? '—' : pos[i] + ' + ' + s + ' → ' + np[i]]) },
      { t: 's.let', d: 'd.let', cols: ['col.char', 'col.pos', 'col.new', 'col.letter'], rows: src.map((c, i) => [c, pos[i] < 0 ? '—' : String(pos[i]), np[i] < 0 ? '—' : String(np[i]), outs[i]]) });
    return { stages: st, final: outs.join('') };
  }
  return { stages: [], final: '' };
}

/* Letter frequency */
const AR_RAW = { 'ء': 0.31, 'ؤ': 0.09, 'ئ': 0.28, 'ا': 12.5, 'آ': 0.15, 'أ': 2.89, 'إ': 1, 'ب': 4.67, 'ة': 1.42, 'ت': 2.61, 'ث': 0.87, 'ج': 1.23, 'ح': 1.86, 'خ': 0.79, 'د': 2.67, 'ذ': 0.96, 'ر': 4.2, 'ز': 0.52, 'س': 2.47, 'ش': 0.73, 'ص': 1.04, 'ض': 0.44, 'ط': 0.5, 'ظ': 0.18, 'ع': 4.01, 'غ': 0.33, 'ف': 2.84, 'ق': 2.69, 'ك': 2.04, 'ل': 12.07, 'م': 6.52, 'ن': 6.61, 'ه': 5.08, 'و': 5.8, 'ى': 1.29, 'ي': 6.36 };
function foldArabicRef() { /* same folding as the Arabic ciphers, then rescale to 100% over the 28 base letters */
  const sum = new Array(28).fill(0);
  for (const [ch, p] of Object.entries(AR_RAW)) { const i = AR28.indexOf(core.arNormalize(ch)); if (i >= 0) sum[i] += p; }
  const tot = sum.reduce((a, b) => a + b, 0); return sum.map((p) => (p * 100) / tot);
}
const REF = { en: (() => { const t = core.EN_FREQ.reduce((a, b) => a + b, 0); return core.EN_FREQ.map((p) => (p * 100) / t); })(), ar: foldArabicRef() };
const refIoc = (lang) => REF[lang].reduce((a, p) => a + (p / 100) ** 2, 0);
function letterCounts(text, lang) {
  const A = lang === 'ar' ? AR28 : EN26, src = lang === 'ar' ? core.arNormalize(text) : text.toUpperCase(), counts = new Array(A.length).fill(0); let n = 0;
  for (const ch of src) { const i = A.indexOf(ch); if (i >= 0) { counts[i]++; n++; } }
  return { counts, n, alphabet: A };
}
const ioc = (counts, n) => (n < 2 ? 0 : counts.reduce((a, c) => a + c * (c - 1), 0) / (n * (n - 1)));
function bestShift(counts, n, lang) { /* shift s such that cipher letter (i+s) plays the role of plain letter i */
  const N = counts.length, ref = REF[lang]; let best = 0, bc = Infinity;
  for (let s = 0; s < N; s++) { let chi = 0; for (let i = 0; i < N; i++) { const e = (n * ref[i]) / 100; chi += (counts[(i + s) % N] - e) ** 2 / e; } if (chi < bc) { bc = chi; best = s; } }
  return best;
}
function keyLengthClues(text, maxK) {
  const L = text.toUpperCase().replace(/[^A-Z]/g, ''), out = [];
  for (let k = 1; k <= maxK; k++) {
    let sum = 0;
    for (let g = 0; g < k; g++) { let col = ''; for (let i = g; i < L.length; i += k) col += L[i]; const c = letterCounts(col, 'en'); sum += ioc(c.counts, c.n); }
    out.push(sum / k);
  }
  return out;
}
function applyCipher(text, lang, kind, p) {
  try {
    if (kind === 'caesar') return lang === 'ar' ? core.arShift(text, ((p.shift % 28) + 28) % 28) : core.shiftLetters(text, ((p.shift % 26) + 26) % 26);
    if (kind === 'atbash') return core.OP_BY_ID[lang === 'ar' ? 'atbashar' : 'atbash'].process(text, 'transform', {});
    if (kind === 'vigenere' && lang === 'en') return core.vigenere(text, p.key || '', 1);
  } catch (e) { /* invalid key etc.: show the text unchanged */ }
  return text;
}

/* Avalanche */
async function digestHex(alg, text) { return hexOf(new Uint8Array(await crypto.subtle.digest(alg, enc.encode(text)))); }
function bitDiff(hexA, hexB) {
  const bits = (h) => h.split('').map((c) => parseInt(c, 16).toString(2).padStart(4, '0')).join(''), a = bits(hexA), b = bits(hexB), flags = [];
  let diff = 0; for (let i = 0; i < a.length; i++) { const d = a[i] !== b[i]; if (d) diff++; flags.push(d); }
  return { diff, total: a.length, a, b, flags };
}
function mutateText(text) {
  if (!text) return 'a'; const arr = Array.from(text), cp = arr.pop().codePointAt(0); let n = cp + 1;
  if (n > 0x10ffff || (n >= 0xd800 && n <= 0xdfff)) n = cp - 1; arr.push(String.fromCodePoint(n)); return arr.join('');
}

/* Password hashing lab */
async function pbkdf2Hex(password, salt, iterations, bytes) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  return hexOf(new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, (bytes || 32) * 8)));
}
async function timePbkdf2(password, iterations) { /* average ms per hash; cheap settings are repeated to reduce noise */
  const runs = iterations <= 1000 ? 20 : iterations <= 10000 ? 5 : 1, salt = crypto.getRandomValues(new Uint8Array(16)), t0 = performance.now();
  for (let i = 0; i < runs; i++) await pbkdf2Hex(password, salt, iterations, 32);
  return (performance.now() - t0) / runs;
}
function fmtDuration(sec, u) { /* u = unit labels */
  const f = (v) => (v >= 100 ? Math.round(v) : v >= 10 ? v.toFixed(1) : v.toFixed(2)).toString();
  if (sec < 1) return f(sec * 1000) + ' ' + u.ms; if (sec < 60) return f(sec) + ' ' + u.s; if (sec < 3600) return f(sec / 60) + ' ' + u.min;
  if (sec < 86400) return f(sec / 3600) + ' ' + u.h; if (sec < 86400 * 365) return f(sec / 86400) + ' ' + u.d; return f(sec / (86400 * 365)) + ' ' + u.y;
}

/* Challenges */
const normAnswer = (s) => core.arNormalize(String(s).toLowerCase()).replace(/[^\p{L}\p{N}]/gu, '');
async function checkAnswer(id, answer) { return !!LEVEL_DATA[id] && (await digestHex('SHA-256', 'cryptix:' + id + ':' + normAnswer(answer))) === LEVEL_DATA[id].h; }

/* ---------- UI ---------- */
const EN_SAMPLE = 'The quick brown fox jumps over the lazy dog. Frequency analysis is a powerful technique: in English the letter E appears far more often than Z or Q, and patterns like this survive a simple Caesar shift. Cryptography protects messages, but old ciphers leave statistical fingerprints that careful readers can follow to recover the original text without ever knowing the key.';
const AR_SAMPLE = 'علم التشفير هو علم حماية المعلومات وإخفائها عن غير المصرح لهم بالاطلاع عليها. وقد عرف الناس الشيفرات منذ القدم، ومنها شيفرة قيصر التي تزيح كل حرف بمقدار ثابت، لكنها ضعيفة لأن تكرار الحروف في اللغة لا يتغير بل ينتقل فقط من حرف إلى آخر. ولذلك يستطيع المحلل أن يقارن توزيع الحروف في الرسالة المشفرة بتوزيع الحروف المعتاد في اللغة العربية فيكتشف الإزاحة المستخدمة بسهولة.';
const VIZ_OPS = ['base64', 'hex', 'binary', 'url', 'caesar', 'caesarar'], VIZ_SAMPLE = { base64: 'Hi', hex: 'Hi', binary: 'A', url: 'a b', caesar: 'Hello', caesarar: 'مرحبا' };
const TABS = ['lessons', 'viz', 'freq', 'avalanche', 'pbkdf2', 'challenges'];

function initLab() {
  const mk = (tag, props = {}, text) => { const n = document.createElement(tag); Object.assign(n, props); if (text != null) n.textContent = text; return n; };
  let lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const t = (k, p = {}) => (LT[lang][k] ?? LT.en[k] ?? k).replace(/\{(\w+)\}/g, (_, x) => (p[x] != null ? p[x] : ''));
  const opName = (id) => core.I18N[lang]['op.' + id + '.name'] || id;
  const units = () => ({ ms: t('u.ms'), s: t('u.s'), min: t('u.min'), h: t('u.h'), d: t('u.d'), y: t('u.y') });
  const state = { tab: 'lessons', lesson: null, card: 0, quiz: null, viz: { op: 'base64', text: 'Hi', shift: 3, step: 1 }, freq: { lang: 'en', text: EN_SAMPLE, cipher: 'none', shift: 3, key: 'KEY' }, av: { alg: 'SHA-256', a: 'Hello, CRYPTIX!', b: mutateText('Hello, CRYPTIX!'), bAuto: true, seq: 0 }, pw: { password: 'my-secret-password', rows: null, busy: false, salts: null }, ch: { open: null, shown: 0, fb: null } };
  /* progress: which lessons/levels are done (ids and counters only, never any text you typed) */
  const PKEY = 'cryptix-progress';
  const loadP = () => { try { const v = JSON.parse(localStorage.getItem(PKEY) || '{}'); return { ch: v.ch && typeof v.ch === 'object' ? v.ch : {}, ls: v.ls && typeof v.ls === 'object' ? v.ls : {} }; } catch (e) { return { ch: {}, ls: {} }; } };
  const progress = loadP(), saveP = () => { try { localStorage.setItem(PKEY, JSON.stringify(progress)); } catch (e) { /* optional */ } };
  const starsOf = (id) => { const p = progress.ch[id]; return p && p.s ? Math.max(1, Math.min(3, Number(p.st) || 1)) : 0; };

  const btn = mk('button', { type: 'button', className: 'btn', id: 'labBtn' });
  document.querySelector('.top-actions').insertBefore(btn, document.getElementById('fileBtn'));
  const dlg = mk('dialog', { id: 'labDlg', className: 'lab' }); dlg.setAttribute('aria-labelledby', 'labTitle');
  const head = mk('div', { className: 'lab-head' }), title = mk('h2', { id: 'labTitle' }), closeBtn = mk('button', { type: 'button', className: 'btn sm', id: 'labClose' }, '✕');
  const tabs = mk('div', { className: 'lab-tabs' }), panel = mk('div', { className: 'lab-panel', id: 'labPanel', tabIndex: 0 });
  tabs.setAttribute('role', 'tablist'); panel.setAttribute('role', 'tabpanel'); head.append(title, closeBtn); dlg.append(head, tabs, panel); document.body.appendChild(dlg);

  /* small DOM helpers */
  const field = (label, control, id) => { const w = mk('div', { className: 'lab-field' }); if (id) control.id = id; w.append(mk('label', { htmlFor: control.id }, label), control); return w; };
  const select = (id, opts, val, fn) => { const s = mk('select', { id }); opts.forEach(([v, l, dis]) => { const o = mk('option', { value: v }, l); o.selected = v === val; o.disabled = !!dis; s.appendChild(o); }); s.addEventListener('change', () => fn(s.value)); return s; };
  const table = (cols, rows) => {
    const wrap = mk('div', { className: 'vtable' }), tb = mk('table'); tb.setAttribute('dir', 'ltr');
    const hr = mk('tr'); cols.forEach((c) => hr.appendChild(mk('th', {}, t(c)))); tb.appendChild(mk('thead')).appendChild(hr);
    const body = mk('tbody'); rows.forEach((r) => { const tr = mk('tr'); r.forEach((c) => tr.appendChild(mk('td', {}, c))); body.appendChild(tr); }); tb.appendChild(body); wrap.appendChild(tb); return wrap;
  };
  const copyBtn = (getText) => { const b = mk('button', { type: 'button', className: 'btn sm' }, t('ch.copy')); b.addEventListener('click', async () => { try { await navigator.clipboard.writeText(getText()); b.textContent = t('ch.copied'); setTimeout(() => { b.textContent = t('ch.copy'); }, 2000); } catch (e) { /* clipboard unavailable */ } }); return b; };
  const closeLab = () => { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); };

  /* ----- Lessons ----- */
  function buildLessons(root) {
    if (state.lesson === null) {
      root.appendChild(mk('p', { className: 'lab-intro' }, t('ls.intro'))); const grid = mk('div', { className: 'lvl-grid' });
      LESSONS.forEach((ls, i) => { const b = mk('button', { type: 'button', className: 'lvl' }); b.append(mk('b', {}, ls[lang].title), mk('span', {}, t('ls.cards', { n: ls[lang].cards.length }) + (progress.ls[ls.id] ? ' · ✓ ' + t('ls.done') : ''))); b.addEventListener('click', () => { state.lesson = i; state.card = 0; state.quiz = null; render(); }); grid.appendChild(b); });
      root.appendChild(grid); return;
    }
    const ls = LESSONS[state.lesson], L = ls[lang], last = state.card >= L.cards.length;
    const back = mk('button', { type: 'button', className: 'btn sm' }, '← ' + t('ls.all')); back.addEventListener('click', () => { state.lesson = null; render(); }); root.append(back, mk('h3', {}, L.title));
    if (!last) {
      const [ct, cx] = L.cards[state.card]; root.append(mk('p', { className: 'lab-status' }, t('ls.card', { n: state.card + 1, m: L.cards.length })), mk('h4', {}, ct), mk('p', { className: 'lesson-text' }, cx));
    } else {
      const q = L.quiz; root.append(mk('h4', {}, t('ls.quiz')), mk('p', { className: 'lesson-text' }, q.q)); const opts = mk('div', { className: 'quiz-opts' });
      q.o.forEach((o, i) => { const b = mk('button', { type: 'button', className: 'btn' }, o); b.disabled = state.quiz !== null; b.addEventListener('click', () => { state.quiz = i; if (i === q.a) { progress.ls[ls.id] = 1; saveP(); } render(); }); opts.appendChild(b); });
      root.appendChild(opts);
      if (state.quiz !== null) { const right = state.quiz === q.a; root.appendChild(mk('p', { className: 'msg ' + (right ? 'success' : 'error'), role: 'status' }, (right ? '✓ ' + t('ls.right') : '✗ ' + t('ls.wrong')) + q.x)); }
    }
    const nav = mk('div', { className: 'lab-row' }), prev = mk('button', { type: 'button', className: 'btn' }, t('ls.prev')), next = mk('button', { type: 'button', className: 'btn primary' }, t('ls.next'));
    prev.disabled = state.card === 0; next.disabled = last; prev.addEventListener('click', () => { state.card--; state.quiz = null; render(); }); next.addEventListener('click', () => { state.card++; state.quiz = null; render(); }); nav.append(prev, next);
    const tryB = mk('button', { type: 'button', className: 'btn' }, t('ls.try')), askB = mk('button', { type: 'button', className: 'btn' }, t('ls.ask'));
    tryB.addEventListener('click', () => openLab(ls.try.tab, ls.try)); askB.addEventListener('click', () => { closeLab(); if (core.chat) core.chat.showTopic(ls.ask); });
    nav.append(tryB, askB); root.appendChild(nav);
  }

  /* ----- Step visualizer ----- */
  function buildViz(root) {
    const s = state.viz, isC = () => s.op === 'caesar' || s.op === 'caesarar', maxShift = () => (s.op === 'caesarar' ? 27 : 25);
    root.appendChild(mk('p', { className: 'lab-intro' }, t('viz.intro')));
    const row = mk('div', { className: 'lab-row' });
    const sel = select('vizOp', VIZ_OPS.map((id) => [id, opName(id)]), s.op, (v) => { s.op = v; s.text = VIZ_SAMPLE[v]; s.step = 1; s.shift = Math.min(s.shift, maxShift()); txt.value = s.text; shiftF.hidden = !isC(); shiftIn.max = maxShift(); refresh(); });
    const txt = mk('input', { type: 'text', maxLength: 12, value: s.text, autocomplete: 'off' }); txt.setAttribute('dir', 'auto');
    const shiftIn = mk('input', { type: 'number', min: 0, max: maxShift(), value: s.shift }), shiftF = field(t('viz.shift'), shiftIn, 'vizShift'); shiftF.hidden = !isC();
    const next = mk('button', { type: 'button', className: 'btn primary', id: 'vizNext' }, t('viz.next')), all = mk('button', { type: 'button', className: 'btn', id: 'vizAll' }, t('viz.all')), reset = mk('button', { type: 'button', className: 'btn', id: 'vizReset' }, t('viz.reset'));
    row.append(field(t('viz.op'), sel), field(t('viz.text'), txt, 'vizText'), shiftF, next, all, reset);
    const status = mk('p', { className: 'lab-status' }); status.setAttribute('aria-live', 'polite'); const box = mk('div', { id: 'vizStages' }), res = mk('div', { id: 'vizResult' }); root.append(row, status, box, res);
    function refresh() {
      const data = vizStages(s.op, s.text, s.shift), total = data.stages.length; s.step = Math.max(1, Math.min(s.step, total || 1)); box.textContent = ''; res.textContent = '';
      data.stages.slice(0, s.step).forEach((st, i) => { const c = mk('section', { className: 'vcard' }); c.append(mk('h3', {}, (i + 1) + '. ' + t(st.t)), mk('p', {}, t(st.d, st.dp || {})), table(st.cols, st.rows)); box.appendChild(c); });
      status.textContent = total ? t('viz.step', { n: s.step, m: total }) : ''; next.disabled = s.step >= total; all.disabled = s.step >= total;
      if (total && s.step >= total) {
        let tool = ''; try { tool = core.OP_BY_ID[s.op].process(s.text, isC() ? 'encrypt' : 'encode', { shift: s.shift }); } catch (e) { tool = null; }
        const pre = mk('pre', { className: 'viz-final' }, data.final); pre.setAttribute('dir', 'ltr');
        res.append(mk('h3', {}, t('viz.result')), pre, mk('p', { className: 'msg ' + (tool === data.final ? 'success' : 'error') }, tool === data.final ? t('viz.same', { op: opName(s.op) }) : t('viz.diff')));
      }
    }
    txt.addEventListener('input', () => { s.text = txt.value; s.step = 1; refresh(); });
    shiftIn.addEventListener('input', () => { s.shift = Math.min(maxShift(), Math.max(0, Math.round(Number(shiftIn.value) || 0))); refresh(); });
    next.addEventListener('click', () => { s.step++; refresh(); }); all.addEventListener('click', () => { s.step = 99; refresh(); }); reset.addEventListener('click', () => { s.step = 1; refresh(); });
    refresh();
  }

  /* ----- Letter frequency ----- */
  function buildFreq(root) {
    const s = state.freq; root.appendChild(mk('p', { className: 'lab-intro' }, t('freq.intro')));
    const row = mk('div', { className: 'lab-row' }), ta = mk('textarea', { rows: 4, value: s.text }); ta.setAttribute('dir', 'auto');
    const lsel = select('freqLang', [['en', t('freq.en')], ['ar', t('freq.ar')]], s.lang, (v) => { s.lang = v; s.text = v === 'ar' ? AR_SAMPLE : EN_SAMPLE; if (v === 'ar' && s.cipher === 'vigenere') s.cipher = 'none'; render(); });
    const csel = select('freqCipher', [['none', t('freq.none')], ['caesar', t('freq.caesar')], ['atbash', t('freq.atbash')], ['vigenere', t('freq.vig'), s.lang === 'ar']], s.cipher, (v) => { s.cipher = v; shiftF.hidden = v !== 'caesar'; keyF.hidden = v !== 'vigenere'; refresh(); });
    const shiftIn = mk('input', { type: 'number', min: 0, max: 27, value: s.shift }), shiftF = field(t('freq.shift'), shiftIn, 'freqShift'); shiftF.hidden = s.cipher !== 'caesar';
    const keyIn = mk('input', { type: 'text', value: s.key, maxLength: 20, autocomplete: 'off' }), keyF = field(t('freq.key'), keyIn, 'freqKey'); keyF.hidden = s.cipher !== 'vigenere';
    row.append(field(t('freq.lang'), lsel), field(t('freq.cipher'), csel), shiftF, keyF);
    const out = mk('div', { id: 'freqOut' }); root.append(row, field(t('freq.text'), ta, 'freqText'), out, mk('p', { className: 'small' }, t('freq.src')));
    function refresh() {
      const p = { shift: s.shift, key: s.key }, shown = applyCipher(s.text, s.lang, s.cipher, p), { counts, n, alphabet } = letterCounts(shown, s.lang), ref = REF[s.lang];
      out.textContent = ''; const sp = mk('pre', { className: 'viz-final' }, shown.length > 300 ? shown.slice(0, 300) + '…' : shown); sp.setAttribute('dir', 'auto');
      const pct = counts.map((c) => (n ? (c * 100) / n : 0)), scale = Math.max(...pct, ...ref, 1) * 1.1, order = [...pct.keys()].sort((a, b) => pct[b] - pct[a]).slice(0, 5);
      const topList = order.map((i) => alphabet[i] + ' ' + pct[i].toFixed(1) + '%').join('، ').replace(/،/g, lang === 'ar' ? '،' : ',');
      const chart = mk('div', { className: 'fchart' }); chart.setAttribute('role', 'img'); chart.setAttribute('aria-label', t('freq.chart') + '. ' + t('freq.top', { list: topList })); chart.setAttribute('dir', s.lang === 'ar' ? 'rtl' : 'ltr');
      [...alphabet].forEach((ch, i) => { const col = mk('div', { className: 'fcol', title: ch + ': ' + pct[i].toFixed(1) + '% / ' + ref[i].toFixed(1) + '%' }); const bar = mk('div', { className: 'fbar' }); bar.style.height = (pct[i] / scale) * 100 + '%'; const mark = mk('div', { className: 'fref' }); mark.style.bottom = (ref[i] / scale) * 100 + '%'; col.append(bar, mark, mk('span', { className: 'flabel' }, ch)); chart.appendChild(col); });
      const I = ioc(counts, n), few = s.lang === 'ar' ? 80 : 60;
      out.append(mk('h3', {}, t('freq.shown')), sp, chart, mk('p', {}, t('freq.n', { n }) + ' · ' + t('freq.top', { list: topList })), mk('p', { id: 'freqIc' }, t('freq.ic', { v: I.toFixed(4) })), mk('p', { className: 'small' }, t('freq.ic.help', { r: (1 / alphabet.length).toFixed(4), x: refIoc(s.lang).toFixed(4), lang: t('freq.' + s.lang) })));
      if (n < few) out.appendChild(mk('p', { className: 'msg error' }, t('freq.few', { n: few })));
      else out.appendChild(mk('p', { id: 'freqBreak' }, t('freq.break', { n: bestShift(counts, n, s.lang) })));
      if (s.lang === 'en' && n >= 60) {
        const clues = keyLengthClues(shown, 10), best = clues.indexOf(Math.max(...clues)); const box = mk('div', { className: 'vlen' }); box.append(mk('h3', {}, t('freq.vlen')));
        clues.forEach((v, i) => { const r = mk('div', { className: 'vrow' + (i === best ? ' best' : '') }); r.append(mk('span', {}, 'k = ' + (i + 1)), (() => { const b = mk('i'); b.style.width = (v / 0.075) * 100 + '%'; return b; })(), mk('span', {}, v.toFixed(3))); box.appendChild(r); });
        box.appendChild(mk('p', { className: 'small' }, t('freq.vlen.note'))); out.appendChild(box);
      }
    }
    ta.addEventListener('input', () => { s.text = ta.value; refresh(); });
    shiftIn.addEventListener('input', () => { s.shift = Math.min(27, Math.max(0, Math.round(Number(shiftIn.value) || 0))); refresh(); });
    keyIn.addEventListener('input', () => { s.key = keyIn.value; refresh(); }); refresh();
  }

  /* ----- Avalanche ----- */
  function buildAvalanche(root) {
    const s = state.av; root.appendChild(mk('p', { className: 'lab-intro' }, t('av.intro')));
    const sel = select('avAlg', [['SHA-1', 'SHA-1'], ['SHA-256', 'SHA-256'], ['SHA-512', 'SHA-512']], s.alg, (v) => { s.alg = v; refresh(); });
    const ta = mk('textarea', { rows: 2, value: s.a }), tb = mk('textarea', { rows: 2, value: s.b }), mut = mk('button', { type: 'button', className: 'btn', id: 'avMut' }, t('av.mut')); ta.setAttribute('dir', 'auto'); tb.setAttribute('dir', 'auto');
    const out = mk('div', { id: 'avOut' }); root.append(field(t('av.algo'), sel), field(t('av.a'), ta, 'avA'), field(t('av.b'), tb, 'avB'), mut, out);
    const grid = (bits, flags) => { const g = mk('div', { className: 'bits' }); g.setAttribute('aria-hidden', 'true'); [...bits].forEach((b, i) => g.appendChild(mk('i', { className: 'bit' + (b === '1' ? ' one' : '') + (flags && flags[i] ? ' diff' : '') }))); return g; };
    async function refresh() {
      const my = ++s.seq;
      if (!(globalThis.crypto && crypto.subtle)) { out.textContent = t('pw.nocrypto'); return; }
      const [ha, hb] = await Promise.all([digestHex(s.alg, s.a), digestHex(s.alg, s.b)]); if (my !== s.seq) return;
      const d = bitDiff(ha, hb); out.textContent = '';
      const hl = (lbl, h) => { const p = mk('p', { className: 'hashline' }); p.setAttribute('dir', 'ltr'); p.append(mk('b', {}, lbl + ': '), document.createTextNode(h)); return p; };
      const cols = mk('div', { className: 'bitcols' }), c1 = mk('div'), c2 = mk('div'); c1.append(hl(t('av.ha'), ha), grid(d.a)); c2.append(hl(t('av.hb'), hb), grid(d.b, d.flags)); cols.append(c1, c2);
      out.append(cols, mk('p', { id: 'avDiff', className: 'msg success', role: 'status' }, t('av.diff', { d: d.diff, t: d.total, p: ((d.diff * 100) / d.total).toFixed(1) })));
    }
    ta.addEventListener('input', () => { s.a = ta.value; if (s.bAuto) { s.b = mutateText(s.a); tb.value = s.b; } refresh(); });
    tb.addEventListener('input', () => { s.b = tb.value; s.bAuto = false; refresh(); });
    mut.addEventListener('click', () => { s.b = mutateText(s.a); s.bAuto = true; tb.value = s.b; refresh(); }); refresh();
  }

  /* ----- Password lab ----- */
  function buildPbkdf2(root) {
    const s = state.pw; root.appendChild(mk('p', { className: 'lab-intro' }, t('pw.intro')));
    const pass = mk('input', { type: 'text', value: s.password, autocomplete: 'off', maxLength: 60 }), run = mk('button', { type: 'button', className: 'btn primary', id: 'pwRun' }, t('pw.run'));
    const out = mk('div', { id: 'pwOut' }), saltOut = mk('div', { id: 'saltOut' }), saltBtn = mk('button', { type: 'button', className: 'btn', id: 'saltRun' }, t('pw.salt.run'));
    root.append(field(t('pw.pass'), pass, 'pwPass'), run, out, mk('p', { className: 'small' }, t('pw.note')), mk('h3', {}, t('pw.salt')), saltBtn, saltOut);
    const ITER = [1, 1000, 10000, 100000, 600000];
    function showRows() {
      out.textContent = ''; if (!s.rows) return; const base = s.rows[0] || 1;
      out.appendChild(table(['pw.iter', 'pw.ms', 'pw.rate', 'pw.mil', 'pw.x'], s.rows.map(([it, ms]) => [String(it).replace(/\B(?=(\d{3})+(?!\d))/g, ','), ms.toFixed(ms < 10 ? 2 : 0) + ' ' + t('u.ms'), Math.round(1000 / ms).toLocaleString('en-US'), fmtDuration((ms / 1000) * 1e6, units()), '×' + (ms / base < 10 ? (ms / base).toFixed(1) : Math.round(ms / base).toLocaleString('en-US'))])));
    }
    run.addEventListener('click', async () => {
      if (!(globalThis.crypto && crypto.subtle)) { out.textContent = t('pw.nocrypto'); return; } if (s.busy) return;
      s.busy = true; run.disabled = true; run.textContent = t('pw.busy'); s.rows = [];
      for (const it of ITER) { s.rows.push([it, await timePbkdf2(pass.value || 'x', it)]); showRows(); }
      s.busy = false; run.disabled = false; run.textContent = t('pw.run');
    });
    pass.addEventListener('input', () => { s.password = pass.value; });
    saltBtn.addEventListener('click', async () => {
      if (!(globalThis.crypto && crypto.subtle)) { saltOut.textContent = t('pw.nocrypto'); return; }
      const hs = []; for (let i = 0; i < 2; i++) { const salt = crypto.getRandomValues(new Uint8Array(8)); hs.push([hexOf(salt), await pbkdf2Hex(pass.value || 'x', salt, 10000, 32)]); }
      saltOut.textContent = ''; hs.forEach(([salt, h], i) => { const p = mk('p', { className: 'hashline' }); p.setAttribute('dir', 'ltr'); p.append(mk('b', {}, 'salt ' + (i + 1) + ': '), document.createTextNode(salt + '  →  ' + h)); saltOut.appendChild(p); }); saltOut.appendChild(mk('p', { className: 'msg success' }, t('pw.salt.out')));
    });
    showRows();
  }

  /* ----- Challenges ----- */
  function buildChallenges(root) {
    const c = state.ch, solved = LEVEL_IDS.filter((id) => progress.ch[id] && progress.ch[id].s).length;
    if (c.open === null) {
      root.append(mk('p', { className: 'lab-intro' }, t('ch.intro')), mk('p', { className: 'lab-status', id: 'chProgress' }, t('ch.solved', { n: solved, m: LEVEL_IDS.length }))); const grid = mk('div', { className: 'lvl-grid' });
      LEVEL_IDS.forEach((id, i) => { const b = mk('button', { type: 'button', className: 'lvl' + (starsOf(id) ? ' done' : '') }), st = starsOf(id); b.append(mk('b', {}, t('ch.level', { n: i + 1 }) + ': ' + LEVEL_TEXT[lang][id][0]), mk('span', {}, st ? '✓ ' + '★'.repeat(st) + '☆'.repeat(3 - st) : t('ch.todo'))); if (st) b.setAttribute('aria-label', b.textContent + ' ' + t('ch.stars', { n: st })); b.addEventListener('click', () => { c.open = id; c.shown = (progress.ch[id] && progress.ch[id].h) || 0; c.fb = null; render(); }); grid.appendChild(b); });
      const reset = mk('button', { type: 'button', className: 'btn sm', id: 'chReset' }, t('ch.reset')); reset.addEventListener('click', () => { if (Object.keys(progress.ch).length + Object.keys(progress.ls).length && !confirm(t('ch.confirm'))) return; progress.ch = {}; progress.ls = {}; saveP(); render(); });
      root.append(grid, mk('p', { className: 'small' }, t('ch.note')), reset); return;
    }
    const id = c.open, [ttl, story, hints, how] = LEVEL_TEXT[lang][id], n = LEVEL_IDS.indexOf(id) + 1, done = starsOf(id) > 0;
    const back = mk('button', { type: 'button', className: 'btn sm' }, '← ' + t('ch.back')); back.addEventListener('click', () => { c.open = null; render(); });
    root.append(back, mk('h3', {}, t('ch.level', { n }) + ': ' + ttl), mk('p', { className: 'lesson-text' }, story));
    const pre = mk('pre', { className: 'viz-final', id: 'chData' }, LEVEL_DATA[id].d); pre.setAttribute('dir', 'ltr'); const row = mk('div', { className: 'lab-row' }), send = mk('button', { type: 'button', className: 'btn', id: 'chSend' }, t('ch.send'));
    send.addEventListener('click', () => { if (core.ui) core.ui.setInput(LEVEL_DATA[id].d); closeLab(); }); row.append(copyBtn(() => LEVEL_DATA[id].d), send);
    root.append(mk('h4', {}, t('ch.data')), pre, row); if (LEVEL_DATA[id].c) root.appendChild(mk('p', {}, t('ch.cands', { list: LEVEL_DATA[id].c.join(', ') })));
    const hbox = mk('div', { className: 'hints' }); root.append(mk('h4', {}, t('ch.hints')), hbox);
    const hbtn = mk('button', { type: 'button', className: 'btn sm', id: 'chHint' }); const drawHints = () => { hbox.textContent = ''; hints.slice(0, c.shown).forEach((h, i) => hbox.appendChild(mk('p', { className: 'notice' }, (i + 1) + '. ' + h))); hbtn.textContent = c.shown < hints.length ? t('ch.hint', { k: c.shown + 1, m: hints.length }) : t('ch.nohint'); hbtn.disabled = c.shown >= hints.length; }; drawHints();
    hbtn.addEventListener('click', () => { c.shown++; progress.ch[id] = { ...(progress.ch[id] || {}), h: Math.max(c.shown, (progress.ch[id] && progress.ch[id].h) || 0) }; saveP(); drawHints(); }); root.appendChild(hbtn);
    const form = mk('div', { className: 'lab-row' }), ans = mk('input', { type: 'text', autocomplete: 'off', maxLength: 40, id: 'chAns' }), chk = mk('button', { type: 'button', className: 'btn primary', id: 'chCheck' }, t('ch.check')), fb = mk('p', { id: 'chFb', role: 'status' });
    ans.setAttribute('dir', 'auto'); form.append(field(t('ch.ans'), ans), chk); root.append(form, fb);
    const showSolved = () => { const st = starsOf(id); fb.className = 'msg success'; fb.textContent = t('ch.right') + ' ' + t('ch.stars', { n: st }); root.append(mk('h4', {}, t('ch.how')), mk('p', { className: 'lesson-text' }, how)); };
    if (done) showSolved();
    const check = async () => {
      if (await checkAnswer(id, ans.value)) { if (!done) { const h = Math.max(c.shown, (progress.ch[id] && progress.ch[id].h) || 0); progress.ch[id] = { s: 1, h, st: Math.max(1, 3 - Math.min(h, 2)) }; saveP(); } render(); }
      else { fb.className = 'msg error'; fb.textContent = t('ch.wrong'); }
    };
    chk.addEventListener('click', check); ans.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
  }

  const BUILD = { lessons: buildLessons, viz: buildViz, freq: buildFreq, avalanche: buildAvalanche, pbkdf2: buildPbkdf2, challenges: buildChallenges };
  function renderTabs() {
    tabs.textContent = '';
    TABS.forEach((id) => { const b = mk('button', { type: 'button', id: 'labtab-' + id }, t('tab.' + id)); b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', String(id === state.tab)); b.setAttribute('aria-controls', 'labPanel'); b.tabIndex = id === state.tab ? 0 : -1; b.addEventListener('click', () => { state.tab = id; render(); }); tabs.appendChild(b); });
    panel.setAttribute('aria-labelledby', 'labtab-' + state.tab);
  }
  function render() { renderTabs(); panel.textContent = ''; BUILD[state.tab](panel); title.textContent = t('title'); closeBtn.setAttribute('aria-label', t('close')); closeBtn.title = t('close'); btn.textContent = t('btn'); }
  tabs.addEventListener('keydown', (e) => {
    const i = TABS.indexOf(state.tab), rtl = document.documentElement.dir === 'rtl'; let j = null;
    if (e.key === 'ArrowRight') j = i + (rtl ? -1 : 1); else if (e.key === 'ArrowLeft') j = i + (rtl ? 1 : -1); else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = TABS.length - 1;
    if (j === null) return; e.preventDefault(); state.tab = TABS[(j + TABS.length) % TABS.length]; render(); document.getElementById('labtab-' + state.tab).focus();
  });
  function openLab(tab, params = {}) {
    if (TABS.includes(tab)) state.tab = tab;
    if (state.tab === 'viz' && params.op && VIZ_OPS.includes(params.op)) { Object.assign(state.viz, { op: params.op, text: VIZ_SAMPLE[params.op], step: 1 }); state.viz.shift = Math.min(state.viz.shift, params.op === 'caesarar' ? 27 : 25); }
    if (state.tab === 'freq' && params.lang) Object.assign(state.freq, { lang: params.lang, text: params.lang === 'ar' ? AR_SAMPLE : EN_SAMPLE });
    render(); if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); }
  }
  btn.addEventListener('click', () => openLab()); closeBtn.addEventListener('click', closeLab);
  document.addEventListener('cryptix:lang', (e) => { lang = e.detail === 'ar' ? 'ar' : 'en'; render(); });
  core.lab = { open: openLab }; render();
}

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', initLab);
if (typeof module !== 'undefined' && module.exports) module.exports = { vizStages, letterCounts, ioc, refIoc, REF, bestShift, keyLengthClues, applyCipher, digestHex, bitDiff, mutateText, pbkdf2Hex, timePbkdf2, fmtDuration, normAnswer, checkAnswer, LEVEL_DATA, LEVEL_IDS, LESSONS, LEVEL_TEXT, LT };
})();
