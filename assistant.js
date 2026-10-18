/* CRYPTIX assistant — a local, rule-based helper (English / العربية). It is NOT an AI model: it matches questions against a
 * hand-written knowledge base, identifies pasted text with the same detection engine as "Magic", and runs simple commands.
 * Everything happens in the browser; nothing is sent anywhere. All output is inserted with textContent. */
(function () {
'use strict';
const core = typeof module !== 'undefined' && module.exports ? require('./app.js') : window.CRYPTIX;
const { CryptixError } = core;
/* ---------- Knowledge base ----------
 * K(id, titleEN, titleAR, keywords "a|b c|d", answerEN, answerAR, related ids). Multi-word keywords match when every word
 * appears in the question (any order); longer keywords score higher. Written by hand, not generated. */
const TOPICS = [];
const K = (id, ten, tar, kw, aen, aar, rel = []) => TOPICS.push({ id, title: { en: ten, ar: tar }, kw: kw.split('|'), a: { en: aen, ar: aar }, rel });

K('enc', 'What is encryption?', 'ما هو التشفير؟', 'encryption|encrypt|encrypted|encrypting|تشفير|شفر|مشفر|التشفير',
  'Encryption turns readable data (plaintext) into unreadable data (ciphertext) using an algorithm and a secret key. Only someone with the right key can turn it back. Its goal is confidentiality. Modern examples are AES and ChaCha20 (symmetric) and RSA (asymmetric).',
  'التشفير يحوّل البيانات المقروءة (النص الصريح) إلى بيانات غير مقروءة (النص المشفّر) باستخدام خوارزمية ومفتاح سري، ولا يستطيع إعادتها إلا من يملك المفتاح الصحيح. هدفه حماية السرية. من أمثلته الحديثة AES وChaCha20 (متماثل) وRSA (غير متماثل).', ['encvs', 'sym', 'key']);
K('encvs', 'Encoding vs encryption vs hashing', 'الفرق بين الترميز والتشفير والتجزئة', 'encoding encryption|encoding hashing|encryption hashing|difference|versus|vs|ترميز تشفير|ترميز تجزئة|تشفير تجزئة|الفرق|فرق',
  'Encoding changes the format of data so systems can handle it (Base64, URL encoding). Anyone can reverse it; there is no key. Encryption hides data and needs a key to reverse. Hashing is one-way: it produces a fixed-size fingerprint that cannot be directly reversed, used for integrity checks and password verification.',
  'الترميز يغيّر شكل البيانات لتتعامل معها الأنظمة (مثل Base64 وترميز الروابط)، ويستطيع أي شخص عكسه بلا مفتاح. التشفير يخفي البيانات ويحتاج مفتاحًا لعكسه. التجزئة أحادية الاتجاه: تنتج بصمة ثابتة الطول لا يمكن عكسها مباشرة، وتُستخدم للتحقق من سلامة البيانات ومن كلمات المرور.', ['enc', 'hash', 'encoding']);
K('encoding', 'What is encoding?', 'ما هو الترميز؟', 'encoding|encode|decode|decoding|ترميز|فك الترميز',
  'Encoding converts data from one representation to another so it can be stored or sent safely, for example bytes to text with Base64, or special characters to %XX in a URL. It is public and reversible by design, so it provides no secrecy.',
  'الترميز هو تحويل البيانات من تمثيل إلى آخر لتخزينها أو إرسالها بأمان، مثل تحويل البايتات إلى نص بـ Base64 أو تحويل الرموز الخاصة إلى %XX في الروابط. هو علني وقابل للعكس بطبيعته، فلا يوفّر أي سرية.', ['encvs', 'base64', 'hex']);
K('hash', 'What is a hash?', 'ما هي التجزئة (Hash)؟', 'hash|hashing|hashes|digest|fingerprint|تجزئة|هاش|بصمة',
  'A hash function turns any input into a fixed-size fingerprint (digest). The same input always gives the same digest, a tiny change gives a completely different one, and you cannot practically work backwards from the digest. Uses: integrity checks, digital signatures and, with proper password-hashing schemes, password storage. A collision means two different inputs with the same digest.',
  'دالة التجزئة تحوّل أي مدخل إلى بصمة (Digest) ثابتة الطول. المدخل نفسه يعطي دائمًا البصمة نفسها، وأي تغيير صغير يغيّرها كليًا، ولا يمكن عمليًا الرجوع من البصمة إلى المدخل. تُستخدم للتحقق من سلامة الملفات وفي التواقيع الرقمية، ومع مخططات مخصصة لكلمات المرور لتخزينها. التصادم يعني مدخلين مختلفين لهما البصمة نفسها.', ['unhash', 'sha', 'salt']);
K('unhash', 'Can a hash be reversed?', 'هل يمكن عكس التجزئة؟', 'hash reverse|hash reversed|hash reversible|hash decrypt|hash decrypted|hash crack|hash cracking|rainbow table|rainbow|sha256 decrypt|sha1 decrypt|md5 decrypt|sha256 reverse|md5 reverse|md5 crack|فك تجزئة|عكس تجزئة|فك هاش|عكس هاش|فك sha256|فك md5|فك sha1',
  'A hash cannot be mathematically reversed; there is no decrypt button. But attackers can guess inputs, hash each guess and compare. Short or common passwords fall quickly this way, including with precomputed lists such as rainbow tables. That is why passwords need unique salts and deliberately slow hashing.',
  'لا يمكن رياضيًا عكس التجزئة، فلا يوجد زر فك. لكن المهاجم يستطيع تخمين المدخلات وتجزئة كل تخمين ومقارنته. كلمات المرور القصيرة أو الشائعة تُكتشف بسرعة بهذه الطريقة، حتى باستخدام قوائم محسوبة مسبقًا مثل Rainbow Tables. لذلك تحتاج كلمات المرور إلى salt فريد وتجزئة بطيئة عمدًا.', ['salt', 'pass', 'hash']);
K('base64', 'What is Base64?', 'ما هو Base64؟', 'base64|b64|بيس64|base64 encryption|base64 secure|base64 safe|base64 تشفير',
  'Base64 represents bytes using 64 printable characters (A–Z, a–z, 0–9, + and /), with = padding at the end when needed. It lets binary data travel through text-only systems such as email or JSON. It is NOT encryption: anyone can decode it, and it makes data about 33% larger.',
  'Base64 يمثّل البايتات بـ 64 حرفًا قابلًا للطباعة (A–Z وa–z و0–9 و+ و/) مع علامة = للحشو في النهاية عند الحاجة. يتيح تمرير البيانات الثنائية عبر أنظمة النصوص مثل البريد وJSON. هو ليس تشفيرًا: يستطيع أي شخص فكه، ويزيد حجم البيانات بنحو 33%.', ['encoding', 'hex', 'encvs']);
K('hex', 'What is hexadecimal?', 'ما هو النظام الست عشري (Hex)؟', 'hex|hexadecimal|هيكس|ست عشري|ستة عشر|سداسي عشري',
  'Hexadecimal writes each byte as two digits from 0–9 and a–f (00 to ff). For example, "Hello" becomes 48 65 6c 6c 6f. It is a readable way to show raw bytes and hashes. It is an encoding, not encryption.',
  'النظام الست عشري يكتب كل بايت بخانتين من 0–9 وa–f (من 00 إلى ff). مثلًا Hello تصبح 48 65 6c 6c 6f. هو طريقة مقروءة لعرض البايتات الخام والتجزئات. هو ترميز وليس تشفيرًا.', ['binary', 'base64']);
K('binary', 'What is binary?', 'ما هو النظام الثنائي (Binary)؟', 'binary|باينري|ثنائي|bits|bit|byte|bytes|بايت|بت',
  'Computers store everything as bytes (8 bits each). To show text in binary, it is first converted to bytes with UTF-8, then each byte is written as eight 0/1 digits. For example, "A" is 65, which is 01000001. Binary is an encoding, not encryption.',
  'تخزّن الحواسيب كل شيء على شكل بايتات (كل بايت 8 بتات). لعرض النص بالنظام الثنائي يُحوَّل أولًا إلى بايتات بـ UTF-8 ثم يُكتب كل بايت بثماني خانات 0/1. مثلًا الحرف A قيمته 65 أي 01000001. الثنائي ترميز وليس تشفيرًا.', ['hex', 'unicode']);
K('url', 'What is URL encoding?', 'ما هو ترميز الروابط (URL)؟', 'url|percent|encodeuricomponent|رابط|روابط|urls|url encoding|url encode|percent encoding',
  'URL (percent) encoding replaces characters that are not safe in a link with % followed by their UTF-8 bytes in hex. A space becomes %20, and Arabic letters become sequences like %D9%85. It keeps links valid and is not encryption.',
  'ترميز الروابط (النسبة المئوية) يستبدل الأحرف غير الآمنة في الرابط بعلامة % متبوعة ببايتات UTF-8 بالنظام الست عشري. المسافة تصبح %20 والأحرف العربية تصبح تسلسلات مثل %D9%85. يحافظ على صحة الرابط وهو ليس تشفيرًا.', ['encoding', 'unicode']);
K('caesar', 'What is the Caesar cipher?', 'ما هي شيفرة قيصر؟', 'caesar|قيصر|سيزر|سيسر|shift cipher',
  'The Caesar cipher shifts every letter by a fixed number of places in the alphabet (Julius Caesar reportedly used 3, so A becomes D). There are only 25 possible keys, so trying them all, or using letter-frequency analysis, breaks it instantly. In CRYPTIX, try the Caesar Brute Force tool.',
  'شيفرة قيصر تزيح كل حرف بعدد ثابت من المواضع في الأبجدية (يُروى أن يوليوس قيصر استخدم 3 فيصبح A هو D). مفاتيحها الممكنة 25 فقط، لذا تُكسر فورًا بتجربتها كلها أو بتحليل تكرار الأحرف. جرّب أداة "كسر شيفرة قيصر" في CRYPTIX.', ['rot13', 'breaking', 'vigenere']);
K('rot13', 'What is ROT13?', 'ما هو ROT13؟', 'rot13|روت13',
  'ROT13 is a Caesar cipher with a shift of 13. Because the English alphabet has 26 letters, applying it twice returns the original text. It is used to hide spoilers, not to protect secrets.',
  'ROT13 هي شيفرة قيصر بإزاحة 13. ولأن الأبجدية الإنجليزية 26 حرفًا فإن تطبيقها مرتين يعيد النص الأصلي. تُستخدم لإخفاء حرق الأحداث وليس لحماية الأسرار.', ['caesar']);
K('atbash', 'What is the Atbash cipher?', 'ما هي شيفرة أتباش؟', 'atbash|اتباش',
  'Atbash maps each letter to its mirror in the alphabet (A↔Z, B↔Y). It has no key, so it offers no real security; it is a historical teaching cipher.',
  'أتباش تستبدل كل حرف بنظيره المعاكس في الأبجدية (A↔Z وB↔Y). ليس لها مفتاح، فلا توفّر أمانًا حقيقيًا، وهي شيفرة تاريخية للتعلم.', ['caesar']);
K('vigenere', 'What is the Vigenère cipher?', 'ما هي شيفرة فيجينير؟', 'vigenere|فيجينير|فيجنير|polyalphabetic',
  'Vigenère uses a keyword to shift each letter by a different amount, which hides simple letter frequencies. It was once called unbreakable, but it falls to finding the key length (Kasiski examination) and then frequency analysis. Teaching only.',
  'فيجينير تستخدم كلمة مفتاح لإزاحة كل حرف بمقدار مختلف، فتخفي تكرار الأحرف البسيط. كانت تُعدّ لا تُكسر، لكنها تُكسر بتحديد طول المفتاح (اختبار كاسيسكي) ثم تحليل التكرار. للتعلم فقط.', ['caesar', 'breaking']);
K('xor', 'What is XOR and the one-time pad?', 'ما هو XOR والمفتاح لمرة واحدة؟', 'xor|one time pad|otp|perfect secrecy|اكسور|اكس او ار|مفتاح لمره واحده',
  'XOR combines bits: applying XOR with the same key twice restores the original. With a short repeating key it is easy to break. A truly random key as long as the message and used only once (a one-time pad) is unbreakable in theory, but impractical to manage.',
  'XOR تدمج البتات: تطبيقها مرتين بالمفتاح نفسه يعيد البيانات الأصلية. مع مفتاح قصير متكرر يسهل كسرها. أما المفتاح العشوائي تمامًا بطول الرسالة ويُستخدم مرة واحدة فقط (One-Time Pad) فلا يُكسر نظريًا، لكن إدارته غير عملية.', ['key', 'breaking']);
K('sha', 'What is SHA-256 (the SHA family)?', 'ما هو SHA-256 (عائلة SHA)؟', 'sha|sha1|sha2|sha256|sha384|sha512|sha224',
  'SHA is a family of hash functions. SHA-256 outputs 256 bits (64 hex characters) and is widely used for file integrity and certificates; SHA-384 and SHA-512 are longer variants. SHA-1 is considered broken. Plain SHA-256 is not suitable for storing passwords. Hashing is one-way: there is no decode.',
  'SHA عائلة من دوال التجزئة. SHA-256 ناتجه 256 بت (64 خانة ست عشرية) ويُستخدم كثيرًا للتحقق من سلامة الملفات والشهادات، وSHA-384 وSHA-512 نسخ أطول. SHA-1 يُعدّ مكسورًا. SHA-256 البسيط لا يصلح لتخزين كلمات المرور. التجزئة أحادية الاتجاه: لا يوجد فك.', ['hash', 'md5', 'pass']);
K('md5', 'Are MD5 and SHA-1 safe?', 'هل MD5 وSHA-1 آمنان؟', 'md5|md4|collision|collisions|shattered|sha1 broken|sha1 safe|sha1 secure|sha1 collision|md5 sha1|md5 sha-1',
  'No. MD5 collisions have been practical since the mid-2000s, and the first SHA-1 collision was demonstrated in 2017. Do not use them for signatures, certificates or passwords. They are acceptable only for non-security checksums. Use SHA-256 or stronger.',
  'لا. تصادمات MD5 عملية منذ منتصف الألفينيات، وأُثبت أول تصادم في SHA-1 عام 2017. لا تستخدمهما للتواقيع أو الشهادات أو كلمات المرور، وهما مقبولان فقط كمجاميع تحقق غير أمنية. استخدم SHA-256 أو أقوى.', ['sha', 'hash']);
K('sym', 'Symmetric vs asymmetric encryption', 'التشفير المتماثل وغير المتماثل', 'symmetric|asymmetric|public key|private key|متماثل|غير متماثل|مفتاح عام|مفتاح خاص|متناظر|لا متماثل|symmetric encryption|asymmetric encryption|تشفير متماثل|تشفير غير متماثل',
  'Symmetric encryption uses one shared secret key to encrypt and decrypt (AES); it is fast. Asymmetric encryption uses a key pair: a public key anyone can use to encrypt or verify, and a private key you keep secret to decrypt or sign (RSA, elliptic curves). Systems like HTTPS use asymmetric methods to agree on a key, then symmetric encryption for the data.',
  'التشفير المتماثل يستخدم مفتاحًا سريًا واحدًا مشتركًا للتشفير وفكه (مثل AES) وهو سريع. غير المتماثل يستخدم زوج مفاتيح: مفتاح عام يستطيع أي شخص استخدامه للتشفير أو التحقق، ومفتاح خاص تحتفظ به سرًا لفك التشفير أو التوقيع (مثل RSA والمنحنيات الإهليلجية). أنظمة مثل HTTPS تستخدم غير المتماثل للاتفاق على مفتاح ثم المتماثل لنقل البيانات.', ['aes', 'rsa', 'key']);
K('aes', 'What is AES?', 'ما هو AES؟', 'aes|aes256|aes128|advanced encryption standard|gcm|ecb|cbc|chacha',
  'AES is the standard symmetric block cipher, with 128, 192 or 256-bit keys. It is considered secure when used properly: choose an authenticated mode such as GCM, never reuse a nonce with the same key, and avoid ECB mode, which leaks patterns. Use a vetted library rather than writing your own.',
  'AES هو المعيار الحالي للتشفير المتماثل بمفاتيح 128 أو 192 أو 256 بت. يُعدّ آمنًا عند استخدامه بشكل صحيح: اختر وضعًا موثّقًا مثل GCM، ولا تعد استخدام nonce مع المفتاح نفسه، وتجنب وضع ECB لأنه يسرّب الأنماط. استخدم مكتبة موثوقة ولا تكتب التشفير بنفسك.', ['sym', 'key']);
K('rsa', 'What is RSA?', 'ما هو RSA؟', 'rsa|elliptic|ecc|diffie|hellman',
  'RSA is a widely used asymmetric algorithm whose security rests on the difficulty of factoring very large numbers; keys of 2048 bits or more are typical. It is used for key exchange and digital signatures and is too slow for bulk data. Elliptic-curve cryptography gives similar security with smaller keys.',
  'RSA خوارزمية غير متماثلة واسعة الاستخدام، يعتمد أمانها على صعوبة تحليل الأعداد الكبيرة جدًا، والمفاتيح المعتادة 2048 بت أو أكثر. تُستخدم لتبادل المفاتيح والتواقيع الرقمية، وهي بطيئة لتشفير البيانات الكبيرة. تشفير المنحنيات الإهليلجية يعطي أمانًا مماثلًا بمفاتيح أصغر.', ['sym', 'signature']);
K('key', 'What is a cryptographic key?', 'ما هو مفتاح التشفير؟', 'key|keys|مفتاح|مفاتيح|kerckhoffs|key length|encryption key|cryptographic key|مفتاح تشفير',
  'A key is the secret value that controls an encryption algorithm. Good security assumes attackers know the algorithm (Kerckhoffs\'s principle) and depends only on keeping the key secret, long and random. Never hard-code keys or send them over insecure channels.',
  'المفتاح هو القيمة السرية التي تتحكم في خوارزمية التشفير. الأمان الجيد يفترض أن المهاجم يعرف الخوارزمية (مبدأ كيركهوف) ويعتمد فقط على سرية المفتاح وطوله وعشوائيته. لا تكتب المفاتيح داخل الكود ولا ترسلها عبر قنوات غير آمنة.', ['sym', 'salt']);
K('salt', 'What is a salt?', 'ما هو الـ Salt؟', 'salt|salting|ملح|سولت|سالت',
  'A salt is a random value added to each password before hashing and stored next to the hash. It makes identical passwords produce different hashes and makes precomputed tables (rainbow tables) useless. A salt is not secret, but it must be unique per password.',
  'الـ Salt قيمة عشوائية تُضاف إلى كل كلمة مرور قبل تجزئتها وتُخزَّن بجانب التجزئة. تجعل كلمات المرور المتطابقة تعطي تجزئات مختلفة وتُبطل الجداول المحسوبة مسبقًا (Rainbow Tables). الـ Salt ليس سريًا لكن يجب أن يكون فريدًا لكل كلمة مرور.', ['pass', 'unhash']);
K('pass', 'How should passwords be stored?', 'كيف تُخزَّن كلمات المرور بأمان؟', 'store password|password storage|hash password|password hashing|bcrypt|argon2|argon2id|scrypt|pbkdf2|تخزين كلمات المرور|تخزين كلمة المرور|كلمات المرور|كلمة المرور|باسورد|بسورد|password|passwords',
  'Never store passwords in plain text, and do not use a plain hash such as SHA-256 either, because it is too fast to guess against. Use a dedicated slow, salted password-hashing function such as Argon2id, scrypt, bcrypt or PBKDF2 with suitable parameters. As a user, use a password manager with long, unique passwords and two-factor authentication.',
  'لا تخزّن كلمات المرور كنص عادي، ولا تستخدم تجزئة بسيطة مثل SHA-256 لأنها سريعة جدًا فيسهل التخمين عليها. استخدم دالة مخصصة بطيئة وبـ salt مثل Argon2id أو scrypt أو bcrypt أو PBKDF2 بمعاملات مناسبة. وكمستخدم: استخدم مدير كلمات مرور وكلمات طويلة وفريدة مع المصادقة الثنائية.', ['salt', 'unhash', 'key']);
K('https', 'What is HTTPS / TLS?', 'ما هو HTTPS وTLS؟', 'https|tls|ssl|padlock|certificate|شهادة|قفل',
  'HTTPS is HTTP carried over TLS. It encrypts traffic between your browser and the website, verifies the site\'s identity with a certificate, and detects tampering. It protects data in transit only: once data reaches the server, the site\'s own security decides what happens to it.',
  'HTTPS هو HTTP فوق بروتوكول TLS. يشفّر الاتصال بين متصفحك والموقع، ويتحقق من هوية الموقع بشهادة، ويكشف التلاعب. يحمي البيانات أثناء النقل فقط: وعندما تصل إلى الخادم يقرر أمان الموقع نفسه مصيرها.', ['sym', 'e2ee']);
K('hmac', 'What is HMAC?', 'ما هو HMAC؟', 'hmac|mac|message authentication|authentication code',
  'HMAC combines a secret key with a hash function to produce a tag proving that a message was not altered and came from someone who knows the key. It provides integrity and authenticity, not secrecy. CRYPTIX does not include HMAC yet.',
  'HMAC يجمع مفتاحًا سريًا مع دالة تجزئة لإنتاج وسم يثبت أن الرسالة لم تتغير وأنها من شخص يعرف المفتاح. يوفّر السلامة والأصالة وليس السرية. CRYPTIX لا يتضمن HMAC حاليًا.', ['hash', 'signature']);
K('jwt', 'What is a JWT?', 'ما هو JWT؟', 'jwt|json web token|bearer token',
  'A JSON Web Token has three Base64URL parts: header, payload and signature. The first two are only encoded, so anyone can read them; never put secrets in a JWT payload. The signature protects against tampering only if the receiver verifies it with the right key. CRYPTIX\'s JWT decoder reads the contents but does not verify signatures.',
  'رمز JWT له ثلاثة أجزاء بترميز Base64URL: الترويسة والحمولة والتوقيع. الجزءان الأولان مرمّزان فقط فيقرؤهما أي شخص، فلا تضع أسرارًا في الحمولة. التوقيع يحمي من التلاعب فقط إذا تحقق المستلم منه بالمفتاح الصحيح. قارئ JWT في CRYPTIX يقرأ المحتوى لكنه لا يتحقق من التوقيع.', ['base64', 'hmac']);
K('entropy', 'What is entropy?', 'ما هي الإنتروبيا؟', 'entropy|randomness|random|انتروبي|انتروبيا|عشوائية',
  'Entropy measures unpredictability. For data, Shannon entropy ranges from 0 to 8 bits per byte: repeated text scores low, ordinary text moderate, and random, compressed or encrypted data scores close to 8 for long inputs. A high value suggests the data is not plain text, but it cannot tell you which algorithm was used.',
  'الإنتروبيا تقيس عدم القدرة على التنبؤ. في البيانات تتراوح إنتروبيا شانون من 0 إلى 8 بت لكل بايت: النص المكرر منخفضة، والنص العادي متوسطة، والبيانات العشوائية أو المضغوطة أو المشفّرة تقترب من 8 في المدخلات الطويلة. القيمة العالية توحي بأن البيانات ليست نصًا عاديًا لكنها لا تحدد الخوارزمية.', ['breaking']);
K('breaking', 'How are classical ciphers broken?', 'كيف تُكسر الشيفرات الكلاسيكية؟', 'frequency analysis|break cipher|crack cipher|brute force|bruteforce|brute|kasiski|تحليل التكرار|كسر|هجوم|classical cipher|classical ciphers|ciphers broken|broken|breakable|تكسر|يكسر|الشيفرات الكلاسيكية|شيفرات كلاسيكية|كلاسيكية',
  'Classical ciphers fall to simple attacks. Caesar has only 25 keys, so brute force tries them all. Substitution ciphers fall to frequency analysis, since letters like E appear far more often than Z in English. Vigenère can be broken by finding the key length first (Kasiski examination). Modern ciphers like AES resist these attacks.',
  'الشيفرات الكلاسيكية تُكسر بهجمات بسيطة. قيصر لها 25 مفتاحًا فقط فتُجرَّب كلها (القوة الغاشمة). شيفرات الاستبدال تُكسر بتحليل التكرار لأن حروفًا مثل E أكثر ظهورًا من Z في الإنجليزية. فيجينير تُكسر بإيجاد طول المفتاح أولًا (اختبار كاسيسكي). الشيفرات الحديثة مثل AES تقاوم هذه الهجمات.', ['caesar', 'vigenere', 'entropy']);
K('unicode', 'How are Arabic text and emoji handled?', 'كيف يُعالَج النص العربي والإيموجي؟', 'utf8|unicode|arabic|emoji|عربي|عربية|ايموجي|ايموجيات',
  'Text is first converted to bytes with UTF-8: English letters take 1 byte, Arabic letters usually 2, and emoji 4. Base64, Hex, Binary and URL encoding work on those bytes, so Arabic and emoji survive. Caesar, ROT13, Atbash and Vigenère only shift English letters A–Z and leave Arabic unchanged.',
  'يُحوَّل النص أولًا إلى بايتات بـ UTF-8: الحرف الإنجليزي بايت واحد، والعربي غالبًا بايتان، والإيموجي أربعة. ترميزات Base64 وHex والثنائي والروابط تعمل على هذه البايتات فتنجو العربية والإيموجي. أما قيصر وROT13 وأتباش وفيجينير فتزيح الأحرف الإنجليزية A–Z فقط وتترك العربية كما هي.', ['binary', 'url']);
K('morse', 'What is Morse code?', 'ما هي شيفرة مورس؟', 'morse|مورس',
  'Morse code represents letters and digits as short and long signals (dots and dashes). It is a code, not encryption: anyone who knows the table can read it.',
  'شيفرة مورس تمثّل الأحرف والأرقام بإشارات قصيرة وطويلة (نقاط وشرطات). هي ترميز وليست تشفيرًا: يقرؤها أي شخص يعرف الجدول.', ['encoding']);
K('base32', 'What is Base32?', 'ما هو Base32؟', 'base32|totp|authenticator|بيس32',
  'Base32 uses 32 characters (A–Z and 2–7), is case-insensitive and produces longer output than Base64. It is common in authenticator-app secret keys. It is an encoding, not encryption.',
  'Base32 يستخدم 32 حرفًا (A–Z و2–7) ولا يفرّق بين الحروف الكبيرة والصغيرة وناتجه أطول من Base64. شائع في مفاتيح تطبيقات المصادقة. هو ترميز وليس تشفيرًا.', ['base64', 'encoding']);
K('html', 'What are HTML entities?', 'ما هي كيانات HTML؟', 'html|entities|entity|xss|كيانات',
  'HTML entities such as &lt; and &amp; let special characters appear as text instead of being treated as markup. Escaping output helps prevent HTML injection, but it is only one part of defending against XSS, and it is not encryption.',
  'كيانات HTML مثل &lt; و&amp; تجعل الرموز الخاصة تظهر كنص بدل أن تُعامل كوسوم. تهريب المخرجات يساعد على منع حقن HTML، لكنه جزء واحد فقط من الدفاع ضد XSS، وليس تشفيرًا.', ['encoding']);
K('privacy', 'Does CRYPTIX send my text anywhere?', 'هل يرسل CRYPTIX نصي إلى أي مكان؟', 'send|sent|upload|server|logged|track|tracking|privacy|private|offline|local|data*0.5|ارسال|يرسل|سيرفر|خادم|خصوصية|محلي|بياناتي|نصوصي|يخزن',
  'No. CRYPTIX processes text inside your browser and makes no network requests, and this assistant is local too. Only your theme, language and saved recipes (steps and settings, never your text) are stored in your browser. A share link contains your text only if you tick that option. Still, do not paste real passwords or private keys into any website.',
  'لا. CRYPTIX يعالج النص داخل متصفحك ولا يرسل أي طلب عبر الشبكة، وهذا المساعد محلي أيضًا. يُخزَّن في متصفحك فقط المظهر واللغة والوصفات المحفوظة (الخطوات والإعدادات دون نصوصك). رابط المشاركة لا يحتوي نصك إلا إذا فعّلت ذلك الخيار. ومع ذلك لا تلصق كلمات مرور أو مفاتيح خاصة حقيقية في أي موقع.', ['unsafe', 'howto']);
K('howto', 'How do I use CRYPTIX?', 'كيف أستخدم CRYPTIX؟', 'use cryptix|use tool|use site|use website|use app|using cryptix|tutorial|guide|instructions|getting started|magic*2|ماجيك|استخدم cryptix|استخدام cryptix|استخدام الموقع|استخدم الموقع|استخدم الاداة|استخدام الاداة|اكتشاف تلقائي|ربط عمليات|وصفة cryptix|recipe chain|chain operations',
  'Pick an operation on the left to use it alone, or press + to chain several into a recipe: each step feeds the next and shows its own result. Type or paste text, or press "Try an example". If your text looks encoded, the Magic banner suggests how to decode it. "Verify a file" checks a file\'s hash locally. You can also paste encoded text into this chat and I will try to identify it.',
  'اختر عملية من القائمة لاستخدامها وحدها، أو اضغط + لربط عدة عمليات في وصفة: كل خطوة تغذّي التالية وتعرض ناتجها. اكتب نصًا أو الصقه أو اضغط "جرّب مثالًا". إذا بدا نصك مرمّزًا يقترح شريط Magic طريقة فكّه. زر "تحقق من ملف" يفحص تجزئة ملف محليًا. ويمكنك لصق نص مرمّز هنا في المحادثة لأحاول التعرف عليه.', ['privacy', 'decodefail']);
K('unsafe', 'Can I use CRYPTIX to protect real data?', 'هل أستخدم CRYPTIX لحماية بيانات حقيقية؟', 'protect files*1.5|encrypt files|secure data|protect data*1.5|real data*1.5|sensitive|حماية ملفات|تشفير ملفات|حماية بيانات|بيانات حساسة|حساس|حقيقية',
  'No, CRYPTIX is for learning. Its ciphers (Caesar, XOR and so on) are breakable and it has not been audited. To protect real data, use established tools: full-disk encryption (BitLocker, FileVault, LUKS), a reputable password manager, end-to-end encrypted messengers, and vetted libraries with AES-GCM or ChaCha20-Poly1305 instead of home-made code.',
  'لا، CRYPTIX للتعلم فقط. شيفراته (قيصر وXOR وغيرها) يمكن كسرها ولم يخضع لتدقيق أمني. لحماية بيانات حقيقية استخدم أدوات راسخة: تشفير القرص الكامل (BitLocker وFileVault وLUKS)، ومدير كلمات مرور موثوق، وتطبيقات مراسلة بتشفير طرفي، ومكتبات موثوقة تستخدم AES-GCM أو ChaCha20-Poly1305 بدل الكود المنزلي.', ['privacy', 'pass', 'aes']);
K('signature', 'What is a digital signature?', 'ما هو التوقيع الرقمي؟', 'signature|signing|sign|توقيع|توقيع رقمي',
  'A digital signature is created with a private key over a hash of the message and checked with the matching public key. It proves who produced the message and that it was not changed. It does not hide the content.',
  'التوقيع الرقمي يُنشأ بالمفتاح الخاص على تجزئة الرسالة ويُتحقق منه بالمفتاح العام المقابل. يثبت من أنتج الرسالة وأنها لم تتغير، ولا يخفي محتواها.', ['rsa', 'hash', 'hmac']);
K('e2ee', 'What is end-to-end encryption?', 'ما هو التشفير الطرفي (E2EE)؟', 'end to end|e2e|e2ee|تشفير طرفي|طرف الى طرف|طرفي|whatsapp|واتساب|signal',
  'In end-to-end encryption only the communicating devices hold the keys, so the service provider in the middle cannot read the messages. This differs from encryption in transit (HTTPS), where the provider can still read data once it arrives.',
  'في التشفير الطرفي تملك الأجهزة المتراسلة وحدها المفاتيح، فلا يستطيع مزوّد الخدمة في المنتصف قراءة الرسائل. هذا يختلف عن التشفير أثناء النقل (HTTPS) حيث يستطيع المزوّد قراءة البيانات بعد وصولها.', ['https', 'sym']);
K('terms', 'Plaintext, ciphertext and cipher', 'النص الصريح والنص المشفّر والشيفرة', 'plaintext|ciphertext|cipher|cipher text|plain text|نص صريح|نص مشفر|شيفرة|خوارزمية|algorithm',
  'Plaintext is the readable original data; ciphertext is the encrypted result. A cipher is the algorithm that transforms one into the other, controlled by a key. Decryption reverses encryption with the right key. "Cipher" is also used loosely for classical methods like Caesar.',
  'النص الصريح (Plaintext) هو البيانات الأصلية المقروءة، والنص المشفّر (Ciphertext) هو الناتج بعد التشفير. الشيفرة (Cipher) هي الخوارزمية التي تحوّل أحدهما إلى الآخر بالاعتماد على مفتاح. فك التشفير يعكس التشفير بالمفتاح الصحيح. وتُستخدم كلمة شيفرة أيضًا بشكل عام للطرق الكلاسيكية مثل قيصر.', ['enc', 'key']);
K('checksum', 'How do I verify a downloaded file?', 'كيف أتحقق من ملف نزّلته؟', 'checksum|verify|integrity|file hash|verify file|تحقق|سلامة|تحقق ملف|فحص ملف|اتحقق|نتحقق|اتحقق ملف',
  'Publishers often list a SHA-256 hash next to a download. After downloading, hash the file and compare: if they match, the file was not corrupted or altered (as long as the published hash itself came from a trusted source). CRYPTIX\'s "Verify a file" button does this locally.',
  'ينشر الناشرون غالبًا تجزئة SHA-256 بجانب رابط التنزيل. بعد التنزيل احسب تجزئة الملف وقارنها: إذا تطابقتا فالملف لم يتلف ولم يُعدَّل (بشرط أن تكون التجزئة المنشورة نفسها من مصدر موثوق). زر "تحقق من ملف" في CRYPTIX يفعل ذلك محليًا.', ['sha', 'hash']);
K('decodefail', 'Why does decoding fail or show garbage?', 'لماذا يفشل الفك أو تظهر رموز غريبة؟', 'invalid|error|fails|failed|not working|wrong output|garbage|gibberish|لا يعمل|خطأ|فشل|رموز غريبة|حروف غريبة|ما زبط|ما اشتغل|مش راضي|fail|garbage*2|gibberish*2',
  'Common reasons: you picked the wrong format (check the Magic suggestion), characters are extra or missing (truncated data, missing = padding), the data is binary rather than text, or, for ciphers, the key or shift is wrong. In a recipe, look at each step\'s own result to see where it breaks.',
  'الأسباب الشائعة: اخترت صيغة خاطئة (راجع اقتراح Magic)، أو هناك أحرف زائدة أو ناقصة (بيانات مقطوعة أو علامة = ناقصة)، أو البيانات ثنائية وليست نصًا، أو المفتاح أو الإزاحة خاطئة في الشيفرات. في الوصفة انظر إلى ناتج كل خطوة لتعرف أين يحدث الخلل.', ['howto', 'encoding']);
K('about', 'What is CRYPTIX?', 'ما هو CRYPTIX؟', 'cryptix|about|who made|creator|developer|مطور|مين عمل|من صنع',
  'CRYPTIX is an educational, browser-only toolkit for encoding, classical ciphers, hashing and simple analysis. Its recipe and Magic ideas are inspired by CyberChef, but it is an independent project.',
  'CRYPTIX أداة تعليمية تعمل في المتصفح فقط للترميز والشيفرات الكلاسيكية والتجزئة والتحليل البسيط. فكرتا الوصفة وMagic مستوحاتان من CyberChef لكنه مشروع مستقل.', ['howto', 'privacy']);

K('arabic', 'Arabic ciphers and Abjad', 'الشيفرات العربية وحساب الجمل', 'arabic cipher|arabic caesar|arabic atbash|abjad*2|abjadi|jummal|gematria|شيفرة عربية|شيفرات عربية|قيصر العربية|أتباش العربية|ابجد*2|حساب الجمل*2|الجمل*2',
  'CRYPTIX has Arabic versions of the classical ciphers. Arabic Caesar shifts letters inside the 28-letter Arabic alphabet (27 useful keys), and Arabic Atbash mirrors the alphabet (ا↔ي, ب↔و). Both first fold hamza forms, ة, ى, ؤ and ئ to base letters and remove diacritics. Abjad (حساب الجمل) is a traditional numeral code (ا=1, ب=2, ج=3 … غ=1000), not encryption. Frequency analysis works in Arabic too: ا and ل are the most common letters.',
  'يتضمن CRYPTIX نسخًا عربية من الشيفرات الكلاسيكية. قيصر العربية تزيح الحروف داخل الأبجدية العربية (28 حرفًا، و27 مفتاحًا مفيدًا)، وأتباش العربية تعكس الأبجدية (ا↔ي وب↔و). وتوحّد كلتاهما أولًا صور الهمزة وة وى وؤ وئ إلى حروف أساسية وتزيل الحركات. أما حساب الجمل (أبجد) فهو ترميز عددي تقليدي (ا=1 وب=2 وج=3 … غ=1000) وليس تشفيرًا. وتحليل التكرار يعمل في العربية أيضًا: ا وَل أكثر الحروف تكرارًا.', ['caesar', 'breaking', 'unicode']);
K('lessons', 'Where can I learn step by step?', 'أين أتعلم خطوة بخطوة؟', 'lessons*2|lesson*2|learn*2|teach*2|course|study|دروس*2|درس*2|علمني*2|تعلم*2|تعلّم*2|مختبر|lab|visualizer|step step*1.5|خطوة بخطوة*2|اتعلم*2|نتعلم*2|مصور الخطوات*2|avalanche*2|انهيار*2',
  'Open the Learn button at the top. It has short lessons with a quick check, a step visualizer that shows how Base64, Hex, Binary, URL encoding and Caesar are built, a letter-frequency lab (English and Arabic), an avalanche demo for hashes, a password-hashing lab, and challenges.',
  'افتح زر "تعلّم" في الأعلى. فيه دروس قصيرة مع سؤال سريع، ومصوّر خطوات يعرض كيف يُبنى Base64 وHex والثنائي وترميز الروابط وقيصر، ومختبر تكرار الحروف (بالإنجليزية والعربية)، وعرض أثر الانهيار للتجزئة، ومختبر لتجزئة كلمات المرور، وتحديات.', ['howto', 'challenges']);
K('challenges', 'What are the challenges?', 'ما هي التحديات؟', 'challenge*2|challenges*2|puzzle*2|puzzles*2|game*2|ctf*2|تحدي*2|تحديات*2|لغز*2|الغاز*2|لعبة*2|العاب*2',
  'The Learn lab has 12 levels. Each gives you an encoded message and you find the secret word: Base64, hex, binary, ROT13, an unknown Caesar shift, stacked layers, Morse, Atbash, Vigenère, Arabic Caesar, guessing a hashed word, and reading a JWT. Hints cost stars, and progress is saved only on your device. Answers are stored as hashes, but the code is open, so it is a learning game, not a vault.',
  'في مختبر التعلّم 12 مستوى. يعطيك كل مستوى رسالة مرمّزة وعليك إيجاد الكلمة السرية: Base64 وHex والثنائي وROT13 وإزاحة قيصر مجهولة وطبقات متراكبة ومورس وأتباش وفيجينير وقيصر العربية وتخمين كلمة من تجزئتها وقراءة JWT. التلميحات تكلّف نجومًا، ويُحفظ تقدمك على جهازك فقط. تُخزَّن الإجابات كتجزئات لكن الكود مفتوح، فهي لعبة للتعلم وليست خزنة.', ['lessons', 'howto']);

/* ---------- Text matching ---------- */
const AR = /[\u0600-\u06FF]/;
const stripAr = (s) => s.replace(/[\u064B-\u0652\u0640]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي');
const norm = (s) => stripAr(s.toLowerCase()).replace(/(sha|base|rot|aes|rsa|md|des|روت|بيس)[\s-]*(\d+)/g, '$1$2').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
const STOP = new Set(('what is are the a an of in to for how do does did i me my you your can could about explain tell mean meaning define please why and or with it this that between there be as on at by from if so should would will we us they them just like some any ' +
  'ما ماهو ماهي هو هي هل شو ايش وش يعني معني عن في من علي الي هاد هذا هذه هاذا اشرح لي ممكن بين او ثم انا انت لو').split(' '));
function variants(tok) {
  const v = new Set([tok]);
  for (const p of ['وال', 'بال', 'كال', 'فال', 'لل', 'ال']) if (tok.startsWith(p) && tok.length > p.length + 1) v.add(tok.slice(p.length));
  if (AR.test(tok) && tok.length >= 4 && /^[وبلف]/.test(tok)) v.add(tok.slice(1));
  if (/^[a-z]{4,}s$/.test(tok)) v.add(tok.slice(0, -1)); /* ciphers -> cipher */
  return [...v];
}
const GENERIC = { enc: 0.8, encoding: 0.8, hash: 0.8, key: 0.8, terms: 0.8 }; /* generic topics lose ties against specific ones */
TOPICS.forEach((tp) => {
  tp.w = GENERIC[tp.id] || 1;
  tp.nkw = tp.kw.map((k) => { const m = k.match(/^(.*)\*([\d.]+)$/), words = norm(m ? m[1] : k).split(' ').map((w) => (w.startsWith('ال') && w.length > 3 ? w.slice(2) : w)).filter((w) => w && !STOP.has(w)); return { words, mul: m ? Number(m[2]) : 1 }; }).filter((x) => x.words.length);
});
const VOCAB = new Set(TOPICS.flatMap((tp) => tp.nkw.flatMap((x) => x.words)).filter((w) => w.length >= 5 && !/\d/.test(w)));
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) { d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); }
  return d[a.length][b.length];
}
function fixTypo(tok) { /* tolerate small spelling mistakes in longer words */
  if (tok.length < 5 || /\d/.test(tok) || STOP.has(tok) || VOCAB.has(tok)) return tok;
  const max = tok.length >= 8 ? 2 : 1; let best = tok, bd = max + 1;
  for (const w of VOCAB) { if (Math.abs(w.length - tok.length) > max) continue; const d = lev(tok, w); if (d < bd) { bd = d; best = w; } }
  return best;
}
function scoreTopics(msg) {
  const toks = norm(msg).split(' ').filter((w) => w.length > 1 && !STOP.has(w)).map(fixTypo);
  const set = new Set(toks.flatMap(variants)); const out = [];
  for (const tp of TOPICS) { let s = 0; for (const { words, mul } of tp.nkw) if (words.every((w) => set.has(w))) s += words.length * mul; s *= tp.w; if (s) out.push({ tp, s }); }
  return out.sort((a, b) => b.s - a.s);
}
const topicById = (id) => TOPICS.find((t) => t.id === id);

/* ---------- Texts ---------- */
const T = {
  en: {
    hello: 'Hi! I\'m the CRYPTIX assistant. I run entirely in your browser using built-in knowledge and rules (not an AI model), so I can only help with what I was built for:\n• Questions about encryption, encoding, hashing and the tools on this site\n• Identifying text you paste (Base64, Hex, Binary, URL, JWT, hashes…)\n• Simple commands, e.g. encode "Hello" in Base64\nPlease don\'t paste real passwords or private keys.',
    fallback: 'I\'m not sure I understood that, and I\'d rather not guess. I can answer questions about encryption, encoding, hashing and classical ciphers, identify pasted text, or run simple commands. Try one of these:',
    thanks: 'You\'re welcome!', paste: 'Paste the text you want me to look at, for example: what is this: SGVsbG8=',
    magic: 'This looks like {chain}. That is my best guess from the pattern, and the decoded result reads as text, but I can\'t be 100% sure.',
    hash: 'This looks like a hexadecimal hash of {bits} bits ({len} characters). That length matches {algos}, but length alone can\'t prove which algorithm was used. A hash is one-way: it can\'t be decoded, only guessed and compared.',
    pwhash: 'This is a {name} password hash. It is one-way and already contains its salt and cost settings. It can\'t be decoded; the only way to "crack" it is to guess passwords.',
    jwt: 'This looks like a JWT (algorithm: {alg}). Its header and payload are only Base64URL-encoded, so anyone can read them. I can decode them, but I can\'t verify the signature.',
    pem: 'This is a PEM block ({label}).', pemPriv: '⚠ A private key must never be shared or pasted into websites. If this is a real key, treat it as exposed and replace it.',
    bin: 'If this is {fmt}, it decodes to {n} bytes that are not readable text. {sig}', sigYes: 'The first bytes match {type}.', sigNo: 'It could be compressed, encrypted or other binary data; the text alone can\'t tell which.',
    caesar: 'The letters look like a shifted alphabet. Best guess: Caesar shift {n}{rot}. Decrypted text:', rot: ' (that is ROT13)',
    unknown: 'I couldn\'t match this to a known encoding. It might be encrypted, compressed, a random token or a key. The text alone doesn\'t reveal the algorithm, so I won\'t guess one. If you know where it came from, tell me and I can help more.',
    plain: 'This looks like ordinary readable text, not encoded data.',
    done: 'Done: {op} ({mode}).', fail: 'That didn\'t work: {err}', why: 'Why: {why}', errExplain: 'That message means: {err}', unexpected: 'Something unexpected went wrong.',
    tooLong: 'That text is too long for me. Please paste up to {n} characters.'
  },
  ar: {
    hello: 'أهلًا! أنا مساعد CRYPTIX. أعمل بالكامل داخل متصفحك بمعرفة وقواعد مدمجة (ولست نموذج ذكاء اصطناعي)، لذلك أستطيع المساعدة فيما صُمِّمت له فقط:\n• أسئلة عن التشفير والترميز والتجزئة وأدوات الموقع\n• التعرف على نص تلصقه (Base64 وHex وBinary وURL وJWT والتجزئات…)\n• أوامر بسيطة مثل: رمّز "مرحبا" بـ Base64\nمن فضلك لا تلصق كلمات مرور أو مفاتيح خاصة حقيقية.',
    fallback: 'لست متأكدًا أنني فهمت، وأفضّل ألا أخمّن. أستطيع الإجابة عن أسئلة التشفير والترميز والتجزئة والشيفرات الكلاسيكية، أو التعرف على نص تلصقه، أو تنفيذ أوامر بسيطة. جرّب أحد هذه:',
    thanks: 'على الرحب والسعة!', paste: 'الصق النص الذي تريدني أن أفحصه، مثلًا: ما هذا: SGVsbG8=',
    magic: 'يبدو أن هذا {chain}. هذا أفضل تخمين لي من النمط، والناتج بعد الفك يبدو نصًا مقروءًا، لكنني لا أستطيع الجزم 100%.',
    hash: 'يبدو أن هذه تجزئة (Hash) بالنظام الست عشري طولها {bits} بت ({len} خانة). هذا الطول يطابق {algos}، لكن الطول وحده لا يثبت الخوارزمية. التجزئة أحادية الاتجاه: لا يمكن فكّها، بل تخمين مدخلات ومقارنتها.',
    pwhash: 'هذه تجزئة كلمة مرور بصيغة {name}. هي أحادية الاتجاه وتحتوي أصلًا على الـ salt وإعدادات التكلفة. لا يمكن فكّها؛ الطريقة الوحيدة لكسرها هي تخمين كلمات المرور.',
    jwt: 'يبدو أن هذا رمز JWT (الخوارزمية: {alg}). الترويسة والحمولة مرمّزتان بـ Base64URL فقط فيقرؤهما أي شخص. أستطيع فكّهما لكنني لا أستطيع التحقق من التوقيع.',
    pem: 'هذه كتلة PEM ({label}).', pemPriv: '⚠ المفتاح الخاص يجب ألا يُشارَك أو يُلصق في المواقع. إذا كان هذا مفتاحًا حقيقيًا فاعتبره مكشوفًا واستبدله.',
    bin: 'إذا كان هذا {fmt} فإنه يُفَك إلى {n} بايت ليست نصًا مقروءًا. {sig}', sigYes: 'أول البايتات تطابق {type}.', sigNo: 'قد تكون بيانات مضغوطة أو مشفّرة أو ثنائية أخرى؛ النص وحده لا يحدد ذلك.',
    caesar: 'الأحرف تبدو أبجدية مُزاحة. أفضل تخمين: شيفرة قيصر بإزاحة {n}{rot}. النص بعد الفك:', rot: ' (أي ROT13)',
    unknown: 'لم أستطع مطابقة هذا مع ترميز معروف. قد يكون مشفّرًا أو مضغوطًا أو رمزًا عشوائيًا أو مفتاحًا. النص وحده لا يكشف الخوارزمية، لذلك لن أخمّن واحدة. إذا كنت تعرف مصدره فأخبرني لأساعدك أكثر.',
    plain: 'يبدو هذا نصًا عاديًا مقروءًا وليس بيانات مرمّزة.',
    done: 'تم: {op} ({mode}).', fail: 'لم ينجح ذلك: {err}', why: 'السبب: {why}', errExplain: 'معنى هذه الرسالة: {err}', unexpected: 'حدث خطأ غير متوقع.',
    tooLong: 'هذا النص طويل عليّ. الصق حتى {n} حرف.'
  }
};
const tpl = (lang, key, p = {}) => T[lang][key].replace(/\{(\w+)\}/g, (_, k) => (p[k] != null ? p[k] : ''));
/* "Why it happens / how to fix" for the errors the tools can raise */
const WHY = {
  en: { b64chars: 'Base64 only uses A–Z, a–z, 0–9, + and /, with = at the end. Spaces and line breaks are fine; other symbols are not (and the URL-safe variant with - and _ is not supported here).', b64len: 'A valid Base64 string never has a length of 4n+1 characters. This usually means characters were cut off or added.', b64pad: 'The = padding must complete the last group of 4 characters: at most two =, and only at the end.', hexchars: 'Hex uses only 0–9 and a–f. Look for letters beyond f or a prefix such as 0x.', hexodd: 'Each byte needs two hex digits, so the digit count must be even. A digit may be missing.', binchars: 'Binary input may contain only 0 and 1 (plus spaces).', binlen: 'Binary needs groups of exactly 8 digits per byte; some bits are missing or extra.', urlbad: 'A % must be followed by two hex digits, and together they must form valid UTF-8 (for example %D9%85).', utf8: 'The decoded bytes are not valid UTF-8 text. The data may be binary, or the format or key may be wrong.', b32chars: 'Base32 only uses A–Z and 2–7, with optional = padding.', b32len: 'This length is impossible for Base32; characters are probably missing.', morse: 'Use English letters, digits and common punctuation. In Morse input, separate letters with spaces and words with /.', jwt: 'A JWT has two or three parts separated by dots, and the first two must be Base64URL-encoded JSON.', json: 'JSON needs double-quoted keys and strings, no trailing commas, and balanced brackets.', htmlnum: 'The number in &#…; is not a valid Unicode character.', abjad: 'Abjad encoding accepts Arabic letters and spaces only; decoding needs numbers like 1, 2, 3 … 1000 separated by spaces.', shift28: 'The Arabic shift must be a whole number from 0 to 27.' },
  ar: { b64chars: 'Base64 يستخدم فقط A–Z وa–z و0–9 و+ و/ مع = في النهاية. المسافات وفواصل الأسطر مقبولة، أما الرموز الأخرى فلا (ولا تُدعم هنا نسخة URL-safe التي فيها - و_).', b64len: 'نص Base64 الصالح لا يكون طوله 4n+1 خانة أبدًا. هذا يعني عادة أن أحرفًا قُطعت أو أُضيفت.', b64pad: 'علامة الحشو = يجب أن تُكمل آخر مجموعة من 4 أحرف: علامتان كحد أقصى وفي النهاية فقط.', hexchars: 'Hex يستخدم فقط 0–9 وa–f. ابحث عن أحرف بعد f أو بادئة مثل 0x.', hexodd: 'كل بايت يحتاج خانتين ست عشريتين، فيجب أن يكون عدد الخانات زوجيًا. قد تكون خانة ناقصة.', binchars: 'المدخل الثنائي يجب أن يحتوي 0 و1 فقط (ومسافات).', binlen: 'الثنائي يحتاج مجموعات من 8 خانات بالضبط لكل بايت؛ بعض البتات ناقصة أو زائدة.', urlbad: 'يجب أن يتبع % رقمان ست عشريان، ويكوّنان معًا UTF-8 صالحًا (مثل %D9%85).', utf8: 'البايتات الناتجة ليست نص UTF-8 صالحًا. قد تكون البيانات ثنائية أو الصيغة أو المفتاح خاطئًا.', b32chars: 'Base32 يستخدم فقط A–Z و2–7 مع حشو = اختياري.', b32len: 'هذا الطول مستحيل في Base32؛ غالبًا هناك أحرف ناقصة.', morse: 'استخدم الأحرف الإنجليزية والأرقام وعلامات الترقيم الشائعة. وفي مدخل مورس افصل الأحرف بمسافة والكلمات بـ /.', jwt: 'رمز JWT له جزءان أو ثلاثة مفصولة بنقاط، والجزءان الأولان JSON بترميز Base64URL.', json: 'JSON يحتاج مفاتيح ونصوصًا بين علامات اقتباس مزدوجة، وبدون فاصلة زائدة في النهاية، وأقواسًا متوازنة.', htmlnum: 'الرقم داخل &#…; ليس محرفًا صالحًا في Unicode.', abjad: 'الترميز بالأبجد يقبل الحروف العربية والمسافات فقط، والفك يحتاج أرقامًا مثل 1 و2 و3 … 1000 مفصولة بمسافات.', shift28: 'يجب أن تكون الإزاحة العربية عددًا صحيحًا من 0 إلى 27.' }
};
const errText = (lang, key) => core.I18N[lang]['err.' + key] || '';
const opName = (lang, id) => core.I18N[lang]['op.' + id + '.name'];
const modeName = (lang, m) => core.I18N[lang]['mode.' + m] || m;
const detectLang = (msg, ui) => (AR.test(msg) ? 'ar' : /\b(what|how|why|is|are|does|do|the|can|an?|of|to|my|in|and|between|should|explain|tell|this|it|hi|hello)\b/i.test(msg) ? 'en' : ui);
const chipsFor = (lang, ids) => ids.map((id) => ({ label: topicById(id).title[lang], topic: id }));
const START_IDS = ['enc', 'encvs', 'base64', 'pass', 'privacy', 'howto'];

/* ---------- Commands: encode "Hello" in Base64, sha256 of abc, رمّز "مرحبا" بـ Base64 ---------- */
const tol = (w) => w.split('').join('[\\u064B-\\u0652\\u0640]*');
const ALIASES = { base64: ['base64', 'b64', 'بيس64'], hex: ['hex', 'hexadecimal', 'هيكس', 'ست عشري'], binary: ['binary', 'باينري', 'ثنائي'], url: ['url', 'percent'], base32: ['base32', 'بيس32'], html: ['html'], morse: ['morse', 'مورس'], caesar: ['caesar', 'قيصر', 'سيزر'], rot13: ['rot13', 'روت13'], atbash: ['atbash', 'اتباش'], sha1: ['sha1'], sha256: ['sha256'], sha384: ['sha384'], sha512: ['sha512'] };
const VERB_DEC = /^(decode|decrypt|فك|حل)/, VERB_ENC = /^(encode|encrypt|رمز|شفر|ترميز|تشفير)/, VERB_HASH = /^(hash|احسب|تجزيه|هاش)/;
function findOp(head) {
  const toks = norm(head).split(' ');
  for (const [id, al] of Object.entries(ALIASES)) for (const a of al) { const w = norm(a); if (toks.includes(w) || (w.includes(' ') && norm(head).includes(w))) return id; }
  return null;
}
function parseCommand(msg) {
  let head = '', payload = null, m;
  if ((m = msg.match(/["“”«»`]([^"“”«»`]+)["“”«»`]/))) { payload = m[1]; head = msg.replace(m[0], ' '); }
  else if ((m = msg.match(/^([^:：]{2,60})[:：]\s*([\s\S]+)$/))) { head = m[1]; payload = m[2].trim(); }
  else {
    const V = '(encode|decode|encrypt|decrypt|hash|' + ['رمز', 'فك', 'شفر', 'احسب'].map(tol).join('|') + ')';
    const P = '(?:in|to|as|with|using|into|ب|بـ|الى|إلى|عبر|بواسطة)';
    if ((m = msg.match(new RegExp('^\\s*' + V + '\\S*\\s+([\\s\\S]+?)\\s+' + P + '\\s*(\\S+(?:\\s*\\d+)?)\\s*$', 'i')))) { head = m[1] + ' ' + m[3]; payload = m[2]; }
    else if ((m = msg.match(new RegExp('^\\s*' + V + '\\S*\\s+(\\S+)\\s+(?:of|for|ل\\u0640?)\\s*([\\s\\S]+)$', 'i')))) { head = m[1] + ' ' + m[2]; payload = m[3].trim(); }
    else if ((m = msg.match(/^\s*(sha\s*-?\s*(?:1|256|384|512))\s+(?:of|for|لـ|ل)?\s*([\s\S]+)$/i))) { head = m[1]; payload = m[2].trim(); }
  }
  if (!payload) return null;
  const op = findOp(head); if (!op) return null;
  const o = core.OP_BY_ID[op], nh = norm(head), verb = nh.split(' ').find((w) => VERB_DEC.test(w) || VERB_ENC.test(w) || VERB_HASH.test(w)) || '';
  let mode;
  if (o.modes[0] === 'hash') mode = 'hash'; else if (o.modes[0] === 'transform') mode = 'transform';
  else if (VERB_DEC.test(verb)) mode = o.modes.includes('decode') ? 'decode' : 'decrypt';
  else if (VERB_ENC.test(verb)) mode = o.modes.includes('encode') ? 'encode' : 'encrypt';
  else return null;
  const sm = (head.match(/(?:shift|by|بإزاحة|ازاحة|إزاحة)\s*(\d{1,2})/i) || head.match(/(\d{1,2})\s*$/));
  return { op, mode, payload, settings: op === 'caesar' ? { shift: sm ? Number(sm[1]) : 3 } : {} };
}
async function runCommand(cmd, lang) {
  if (cmd.payload.length > MAX_LEN) return { text: tpl(lang, 'tooLong', { n: MAX_LEN }) };
  const o = core.OP_BY_ID[cmd.op];
  try {
    const out = await o.process(cmd.payload, cmd.mode, cmd.settings, { t: (k) => core.I18N.en[k] });
    return { text: tpl(lang, 'done', { op: opName(lang, cmd.op), mode: modeName(lang, cmd.mode) }), result: out, actions: [{ chain: [{ op: cmd.op, mode: cmd.mode, settings: cmd.settings }], input: cmd.payload }] };
  } catch (e) { return explainError(e, lang, 'fail'); }
}
function explainError(e, lang, tplKey) {
  if (!(e instanceof CryptixError)) return { text: tpl(lang, 'unexpected') };
  const why = WHY[lang][e.key];
  return { text: tpl(lang, tplKey, { err: errText(lang, e.key) }) + (why ? '\n' + tpl(lang, 'why', { why }) : '') };
}
/* If the user pastes one of the tool's own error messages, explain it. */
function findErrorKey(msg) {
  const n = norm(msg); if (n.length < 15) return null;
  for (const lang of ['en', 'ar']) for (const k of Object.keys(core.I18N[lang])) {
    if (!k.startsWith('err.')) continue; const e = norm(core.I18N[lang][k]);
    if (n.includes(e.slice(0, 22)) || (n.length > 20 && e.startsWith(n.slice(0, 40)))) return k.slice(4);
  }
  return null;
}

/* ---------- Analysis of pasted text ---------- */
const HASHLEN = { 32: [128, 'MD5 (or NTLM)'], 40: [160, 'SHA-1'], 56: [224, 'SHA-224 (or SHA3-224)'], 64: [256, 'SHA-256 (or SHA3-256, BLAKE2s…)'], 96: [384, 'SHA-384'], 128: [512, 'SHA-512 (or BLAKE2b, Whirlpool…)'] };
const SIGS = [[[0x1f, 0x8b], 'gzip'], [[0x50, 0x4b, 3, 4], 'ZIP (also DOCX, XLSX, JAR, APK)'], [[0x89, 0x50, 0x4e, 0x47], 'PNG image'], [[0xff, 0xd8, 0xff], 'JPEG image'], [[0x25, 0x50, 0x44, 0x46], 'PDF'], [[0x47, 0x49, 0x46, 0x38], 'GIF image'], [[0x53, 0x61, 0x6c, 0x74, 0x65, 0x64, 0x5f, 0x5f], 'OpenSSL "Salted__" encrypted data']];
const PWHASH = [[/^\$2[abxy]?\$\d{2}\$[./A-Za-z0-9]{53}$/, 'bcrypt'], [/^\$argon2(?:id|i|d)\$/, 'Argon2'], [/^\$pbkdf2/, 'PBKDF2'], [/^\$[156]\$/, 'crypt(3)'], [/^\$scrypt\$/, 'scrypt']];
function asBytes(t) {
  const c = t.replace(/\s+/g, '');
  if (c.length >= 8 && !/[ \t]/.test(t) && /^[A-Za-z0-9+/]+={0,2}$/.test(c)) { try { return { fmt: 'Base64', bytes: core.base64ToBytes(c) }; } catch (e) { /* not Base64 */ } }
  if (c.length >= 16 && /^(?:[0-9a-fA-F]{2})+$/.test(c)) return { fmt: 'hex', bytes: core.hexToBytes(c) };
  return null;
}
function caesarGuess(t, lang) {
  if ((t.match(/[A-Za-z]/g) || []).length < 20) return null;
  const orig = core.chiSquared(t); let best = 0, bs = Infinity;
  for (let s = 1; s <= 25; s++) { const c = core.chiSquared(core.shiftLetters(t, 26 - s)); if (c < bs) { bs = c; best = s; } }
  if (!(orig > 2.5 * bs && bs < 100)) return null;
  return { text: tpl(lang, 'caesar', { n: best, rot: best === 13 ? tpl(lang, 'rot') : '' }), result: core.shiftLetters(t, 26 - best), actions: [{ chain: [best === 13 ? { op: 'rot13', mode: 'transform' } : { op: 'caesar', mode: 'decrypt', settings: { shift: best } }], input: t }] };
}
/* "Strong" data is unmistakable (PEM, password hashes, JWT, hash-length hex, anything Magic can decode): analyse it before answering questions. */
const strongData = (d) => /-----BEGIN [A-Z0-9 ]+-----/.test(d) || PWHASH.some(([re]) => re.test(d.trim())) || /^[A-Za-z0-9_-]{4,}\.[A-Za-z0-9_-]{4,}(\.[A-Za-z0-9_-]*)?$/.test(d.trim()) || (/^[0-9a-fA-F\s]+$/.test(d) && HASHLEN[d.replace(/\s+/g, '').length]) || !!core.detectMagic(d);
function analyze(data, lang, explicit) {
  const t = data.trim(), L = (k, p) => tpl(lang, k, p); let m;
  if ((m = t.match(/-----BEGIN ([A-Z0-9 ]+)-----/))) return { text: L('pem', { label: m[1] }) + (/PRIVATE/.test(m[1]) ? '\n' + L('pemPriv') : '') };
  for (const [re, name] of PWHASH) if (re.test(t)) return { text: L('pwhash', { name }) };
  if ((m = t.match(/^([A-Za-z0-9_-]{4,})\.([A-Za-z0-9_-]{4,})(?:\.([A-Za-z0-9_-]*))?$/))) {
    try { const h = JSON.parse(core.bytesToText(core.base64ToBytes(m[1].replace(/-/g, '+').replace(/_/g, '/')))); if (h && typeof h === 'object' && h.alg) return { text: L('jwt', { alg: String(h.alg) }), actions: [{ chain: [{ op: 'jwt', mode: 'analyze' }], input: t }] }; } catch (e) { /* not a JWT */ }
  }
  const mg = core.detectMagic(t);
  if (mg) return { text: L('magic', { chain: mg.chain.map((c) => opName(lang, c.op) + ' (' + modeName(lang, c.mode) + ')').join(' → ') }), result: mg.output, actions: [{ chain: mg.chain.map((c) => ({ op: c.op, mode: c.mode })), input: t }] };
  const hx = t.replace(/\s+/g, '');
  if (/^[0-9a-fA-F]+$/.test(hx) && HASHLEN[hx.length]) return { text: L('hash', { bits: HASHLEN[hx.length][0], len: hx.length, algos: HASHLEN[hx.length][1] }) };
  const ab = asBytes(t);
  if (ab) { const sig = SIGS.find(([s]) => s.every((b, i) => ab.bytes[i] === b)); return { text: L('bin', { fmt: ab.fmt, n: ab.bytes.length, sig: sig ? L('sigYes', { type: sig[1] }) : L('sigNo') }) }; }
  const cg = caesarGuess(t, lang); if (cg) return cg;
  if (explicit && /\s/.test(t) && core.textiness(t) >= 0.9) return { text: L('plain') };
  return { text: L('unknown'), actions: [{ chain: [{ op: 'stats', mode: 'analyze' }], input: t }] };
}
/* Pull the thing to analyse out of a message: after "what is this:", or a data-looking token/sequence. */
const PREFIX = /(?:what(?:'s| is) (?:this|the encoding|it)|which (?:encoding|cipher)|analy[sz]e|identify|detect|ما هذا|ما هو هذا|شو هاد|ايش هاد|بماذا مشفر|بشو مشفر|ما نوع (?:هذا )?التشفير|حلل|حللي)\s*[:：]?\s*([\s\S]*)$/i;
function extractData(msg) {
  const t = msg.trim(), p = t.match(PREFIX);
  if (p) return { data: p[1].replace(/^(?:\s|[:：]|هاد|هذا|هذه|هالنص|النص|this|text|it)+/i, '').trim(), explicit: true };
  if (/-----BEGIN [A-Z0-9 ]+-----/.test(t)) return { data: t };
  let r = t.match(/(?:\b[01]{8}\b\s*){2,}/) || t.match(/(?:\b[0-9a-fA-F]{2}\b\s+){3,}[0-9a-fA-F]{2}\b/) || t.match(/(?:[.\-]{1,6}\s+){2,}[.\-]{1,6}(?:\s*\/\s*(?:[.\-]{1,6}\s*)+)*/);
  if (r) return { data: r[0].trim() };
  for (const raw of t.split(/\s+/)) {
    const tok = raw.replace(/[?!,;]+$/, '');
    if (tok.length >= 8 && /^[A-Za-z0-9+/_=.,\-%$:{}]+$/.test(tok) && /[A-Za-z]/.test(tok) && /[0-9+/=%$_.]/.test(tok) && !/^https?:/i.test(tok)) return { data: tok };
  }
  return null;
}

const MAX_LEN = 5000;
const GREET = /^(hi|hello|hey|salam|hola|مرحبا|مرحبتين|اهلا|أهلا|هلا|السلام عليكم|سلام|صباح الخير|مساء الخير)(?=\s|$|[!.,؟?])/i, THANKS = /^(thanks|thank you|thx|شكرا|شكرًا|يعطيك العافية|مشكور)/i, HELP = /^(help|مساعدة|ساعدني|what can you do|شو بتعمل|شو بتقدر|ماذا تستطيع|ايش تقدر)/i;
/* Topics that have something to try in the Learn lab get an "open in the lab" button. */
const TOPIC_LAB = { base64: { lab: 'viz', op: 'base64' }, hex: { lab: 'viz', op: 'hex' }, binary: { lab: 'viz', op: 'binary' }, url: { lab: 'viz', op: 'url' }, caesar: { lab: 'viz', op: 'caesar' }, arabic: { lab: 'freq', lang: 'ar' }, hash: { lab: 'avalanche' }, sha: { lab: 'avalanche' },
  unhash: { lab: 'avalanche' }, salt: { lab: 'pbkdf2' }, pass: { lab: 'pbkdf2' }, breaking: { lab: 'freq' }, entropy: { lab: 'freq' }, enc: { lab: 'lessons' }, encvs: { lab: 'lessons' }, lessons: { lab: 'lessons' }, challenges: { lab: 'challenges' }, vigenere: { lab: 'freq' } };
const topicReply = (id, lang) => { const tp = topicById(id), r = { kind: 'topic', topic: id, lang, text: tp.a[lang], chips: chipsFor(lang, tp.rel) }; if (TOPIC_LAB[id]) r.actions = [{ ...TOPIC_LAB[id] }]; return r; };
const welcome = (lang) => ({ kind: 'welcome', lang, text: tpl(lang, 'hello'), chips: [...chipsFor(lang, START_IDS), { label: lang === 'ar' ? 'حلّل نصًا ألصقه' : 'Identify text I paste', hint: true }] });

/* The main entry point. Returns { kind, lang, text, result?, actions?, chips? }. */
async function reply(message, uiLang) {
  const msg = String(message || '').trim(), lang = detectLang(msg, uiLang === 'ar' ? 'ar' : 'en');
  if (!msg) return null;
  if (msg.length > MAX_LEN) return { kind: 'error', lang, text: tpl(lang, 'tooLong', { n: MAX_LEN }) };
  try {
    const short = msg.length <= 30;
    if (short && THANKS.test(msg)) return { kind: 'thanks', lang, text: tpl(lang, 'thanks') };
    if (short && HELP.test(msg)) return welcome(lang);
    if (short && GREET.test(msg) && norm(msg).split(' ').length <= 3) return welcome(lang);
    const ek = findErrorKey(msg);
    if (ek) { const why = WHY[lang][ek]; return { kind: 'error-explain', lang, text: tpl(lang, 'errExplain', { err: errText(lang, ek) }) + (why ? '\n' + tpl(lang, 'why', { why }) : ''), chips: chipsFor(lang, ['decodefail']) }; }
    const cmd = parseCommand(msg);
    if (cmd) return { kind: 'command', lang, ...(await runCommand(cmd, lang)) };
    const ex = extractData(msg);
    if (ex && ex.explicit && !ex.data) return { kind: 'ask-paste', lang, text: tpl(lang, 'paste') };
    const scored = scoreTopics(msg);
    if (ex && ex.explicit) return { kind: 'analysis', lang, ...analyze(ex.data, lang, true) };
    if (ex && strongData(ex.data)) return { kind: 'analysis', lang, ...analyze(ex.data, lang, false) };
    const top = scored[0];
    if (top && (top.s >= 2 || !ex) && !(msg.split(/\s+/).length === 1 && msg.length >= 14)) return topicReply(top.tp.id, lang);
    if (ex) return { kind: 'analysis', lang, ...analyze(ex.data, lang, false) };
    const cg = caesarGuess(msg, lang); if (cg) return { kind: 'analysis', lang, ...cg };
    return { kind: 'fallback', lang, text: tpl(lang, 'fallback'), chips: chipsFor(lang, START_IDS) };
  } catch (e) { return { kind: 'error', lang, text: tpl(lang, 'unexpected') }; }
}

/* ---------- Chat UI ---------- */
const UI = {
  en: { fab: 'Ask the assistant', title: 'CRYPTIX Assistant', close: 'Close assistant', clear: 'Clear chat', ph: 'Ask a question or paste text…', send: 'Send',
    note: 'Local assistant: built-in knowledge and rules, not an AI model. Nothing leaves your browser. Do not paste real passwords or keys.', open: 'Open in workspace', lab: { viz: 'Open the step visualizer', freq: 'Open the letter-frequency lab', avalanche: 'See the avalanche effect', pbkdf2: 'Open the password lab', lessons: 'Open the lessons', challenges: 'Open the challenges' }, copy: 'Copy', copied: 'Copied', copyfail: 'Select the text and copy it manually.', you: 'You', bot: 'Assistant' },
  ar: { fab: 'اسأل المساعد', title: 'مساعد CRYPTIX', close: 'إغلاق المساعد', clear: 'مسح المحادثة', ph: 'اسأل سؤالًا أو الصق نصًا…', send: 'إرسال',
    note: 'مساعد محلي: معرفة وقواعد مدمجة وليس نموذج ذكاء اصطناعي. لا يغادر شيء متصفحك. لا تلصق كلمات مرور أو مفاتيح حقيقية.', open: 'افتحه في مساحة العمل', lab: { viz: 'افتح مصوّر الخطوات', freq: 'افتح مختبر تكرار الحروف', avalanche: 'شاهد أثر الانهيار', pbkdf2: 'افتح مختبر كلمات المرور', lessons: 'افتح الدروس', challenges: 'افتح التحديات' }, copy: 'نسخ', copied: 'تم النسخ', copyfail: 'حدّد النص وانسخه يدويًا.', you: 'أنت', bot: 'المساعد' }
};
function initChat() {
  const mk = (tag, props = {}, text) => { const n = document.createElement(tag); Object.assign(n, props); if (text != null) n.textContent = text; return n; };
  let lang = document.documentElement.lang === 'ar' ? 'ar' : 'en', welcomeOnly = true;
  const fab = mk('button', { type: 'button', id: 'chatFab', className: 'chat-fab' });
  fab.setAttribute('aria-expanded', 'false'); fab.setAttribute('aria-controls', 'chatPanel');
  fab.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 4h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg><span></span>'; // static markup only
  const panel = mk('section', { id: 'chatPanel', className: 'chat-panel', hidden: true }); panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-labelledby', 'chatTitle');
  const head = mk('div', { className: 'chat-head' }), title = mk('h2', { id: 'chatTitle' }), clearBtn = mk('button', { type: 'button', className: 'btn sm', id: 'chatClear' }), closeBtn = mk('button', { type: 'button', className: 'btn sm', id: 'chatClose' }, '✕');
  head.append(title, clearBtn, closeBtn);
  const note = mk('p', { className: 'chat-note' }), log = mk('div', { id: 'chatLog', className: 'chat-log' }); log.setAttribute('role', 'log'); log.setAttribute('aria-live', 'polite');
  const form = mk('form', { id: 'chatForm', className: 'chat-form' }), input = mk('textarea', { id: 'chatInput', rows: 1, maxLength: 5000, autocomplete: 'off' }), send = mk('button', { type: 'submit', className: 'btn primary', id: 'chatSend' });
  const lbl = mk('label', { htmlFor: 'chatInput', className: 'sr' });
  form.append(lbl, input, send); panel.append(head, note, log, form); document.body.append(fab, panel);

  function labels() {
    const u = UI[lang]; fab.querySelector('span').textContent = u.fab; title.textContent = u.title; closeBtn.setAttribute('aria-label', u.close); closeBtn.title = u.close;
    clearBtn.textContent = u.clear; input.placeholder = u.ph; lbl.textContent = u.ph; send.textContent = u.send; note.textContent = u.note; panel.setAttribute('aria-label', u.title);
  }
  const scroll = () => { log.scrollTop = log.scrollHeight; };
  function trim() { while (log.children.length > 60) log.removeChild(log.firstChild); }
  function addUser(text) { welcomeOnly = false; const d = mk('div', { className: 'chat-msg user' }); d.setAttribute('dir', 'auto'); d.appendChild(mk('p', { className: 'chat-text' }, text)); log.appendChild(d); trim(); scroll(); }
  function addBot(res) {
    log.querySelectorAll('.chat-chips').forEach((n) => n.remove()); // only the latest suggestions stay clickable
    const u = UI[res.lang === 'ar' ? 'ar' : 'en'], d = mk('div', { className: 'chat-msg bot' }); d.setAttribute('dir', res.lang === 'ar' ? 'rtl' : 'ltr');
    d.appendChild(mk('p', { className: 'chat-text' }, res.text));
    if (res.result != null && res.result !== '') {
      const box = mk('div', { className: 'chat-res' }), pre = mk('pre', {}, res.result), cp = mk('button', { type: 'button', className: 'btn sm' }, u.copy); pre.setAttribute('dir', 'auto');
      cp.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(res.result); cp.textContent = u.copied; } catch (e) { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); cp.textContent = u.copyfail; }
        setTimeout(() => { cp.textContent = u.copy; }, 2500);
      });
      box.append(pre, cp); d.appendChild(box);
    }
    (res.actions || []).forEach((a) => {
      const b = mk('button', { type: 'button', className: 'btn sm primary' }, a.lab ? u.lab[a.lab] : u.open);
      b.addEventListener('click', () => { if (a.lab) { if (core.lab) core.lab.open(a.lab, a); } else if (core.ui) core.ui.openChain(a.chain, a.input); if (window.innerWidth <= 700) toggle(false); });
      d.appendChild(b);
    });
    if (res.chips && res.chips.length) {
      const row = mk('div', { className: 'chat-chips' });
      res.chips.forEach((c) => {
        const b = mk('button', { type: 'button', className: 'chip-btn' }, c.label);
        b.addEventListener('click', () => { addUser(c.label); addBot(c.topic ? topicReply(c.topic, res.lang) : { kind: 'ask-paste', lang: res.lang, text: tpl(res.lang, 'paste') }); input.focus(); });
        row.appendChild(b);
      });
      d.appendChild(row);
    }
    log.appendChild(d); trim(); scroll();
  }
  function showWelcome() { log.textContent = ''; welcomeOnly = true; addBot(welcome(lang)); }
  function toggle(open) {
    panel.hidden = !open; fab.setAttribute('aria-expanded', String(open)); fab.hidden = open && window.innerWidth <= 700;
    if (open) { if (!log.children.length) showWelcome(); input.focus(); } else { fab.hidden = false; fab.focus(); }
  }
  async function submit() {
    const text = input.value.trim(); if (!text) return;
    input.value = ''; input.style.height = ''; addUser(text);
    try { const r = await reply(text, lang); if (r) addBot(r); } catch (e) { addBot({ lang, text: tpl(lang, 'unexpected') }); }
  }
  core.chat = { showTopic: (id) => { if (!topicById(id)) return; toggle(true); addUser(topicById(id).title[lang]); addBot(topicReply(id, lang)); } };
  fab.addEventListener('click', () => toggle(panel.hidden));
  closeBtn.addEventListener('click', () => toggle(false));
  clearBtn.addEventListener('click', () => { showWelcome(); input.focus(); });
  form.addEventListener('submit', (e) => { e.preventDefault(); submit(); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); submit(); } });
  input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 120) + 'px'; });
  panel.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); toggle(false); } });
  document.addEventListener('cryptix:lang', (e) => { lang = e.detail === 'ar' ? 'ar' : 'en'; labels(); if (welcomeOnly && log.children.length) showWelcome(); });
  labels();
}

if (typeof module !== 'undefined' && module.exports) module.exports = { reply, welcome, topicReply, TOPICS, norm, scoreTopics, extractData, parseCommand, detectLang };
if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', initChat);
})();
