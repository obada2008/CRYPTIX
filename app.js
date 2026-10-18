/* CRYPTIX — local text transformation toolkit (English / العربية). Vanilla JS, no dependencies.
 * Sections: (1) translations, (2) helpers, (3) operation registry, (4) recipes + Magic detection, (5) UI.
 * To add an operation: append to OPERATIONS and add its op.<id>.* strings in both languages. */
'use strict';

/* ---------- 1. Translations ---------- */
const I18N = {
  en: {
    "skip": "Skip to workspace",
    "tagline": "Transform. Analyze. Understand.",
    "menu": "Show or hide operations",
    "lang.label": "Language",
    "theme.light": "Light theme",
    "theme.dark": "Dark theme",
    "clear": "Clear all",
    "about": "About",
    "nav.ops": "Operations",
    "search.label": "Search operations",
    "search.ph": "Search operations…",
    "search.none": "No operations match \"{q}\".",
    "cat.enc": "Encoding & Decoding",
    "cat.classic": "Classical ciphers",
    "cat.hash": "Hashing",
    "type.enc": "Encoding (not encryption)",
    "type.cipher": "Classical cipher (weak)",
    "type.hash": "One-way hash",
    "step.1": "Choose direction",
    "step.2": "Enter your text",
    "step.3": "Result",
    "modes": "Mode",
    "input": "Input",
    "output": "Output",
    "ph.in": "Type or paste your text here",
    "ph.out": "The result appears here",
    "ex.btn": "Try an example",
    "clear.input": "Clear input",
    "copy": "Copy result",
    "download": "Download .txt",
    "swap": "Swap",
    "swap.title": "Move the result into the input and reverse the direction",
    "swap.off": "Swap is unavailable: hashing is one-way",
    "shortcut": "Shortcut:",
    "size": "{c} characters · {b} bytes (UTF-8)",
    "osize": "{c} characters",
    "st.ready": "Ready",
    "st.busy": "Processing…",
    "st.done": "Done",
    "st.fail": "Failed",
    "st.op": "Recipe: {v}",
    "st.mode": "Auto-run: {v}",
    "st.in": "Input: {c} chars / {b} B",
    "st.out": "Output: {c} chars",
    "msg.empty": "Enter some text first.",
    "msg.copied": "Result copied.",
    "msg.copyfail": "Copy failed. Select the result and copy it manually.",
    "msg.nocopy": "There is no result to copy.",
    "msg.nodl": "There is no result to download.",
    "msg.downloaded": "File downloaded.",
    "msg.noswap": "Nothing to swap yet. Process some text first.",
    "msg.swapoff": "Swap is not available for one-way operations.",
    "msg.done": "{label} completed successfully.",
    "msg.unexpected": "Unexpected processing error.",
    "msg.ok": "Success: ",
    "msg.err": "Error: ",
    "confirm.clear": "Clear all input and output?",
    "about.title": "About CRYPTIX",
    "about.close": "Close",
    "about.p1": "CRYPTIX is an educational tool for transforming text and computing hashes. Everything runs inside your browser; your text is never uploaded or stored.",
    "about.l1": "Encoding (Base64, Hex, URL, Binary) only changes how data looks. It is not encryption.",
    "about.l2": "Classical ciphers (Caesar, ROT13) are easy to break.",
    "about.l3": "SHA-256 is a one-way hash: it cannot be reversed and is not enough on its own to store passwords.",
    "about.p2": "This site has not had a professional security audit. Do not use it to protect sensitive data.",
    "mode.encode": "Encode",
    "mode.decode": "Decode",
    "mode.encrypt": "Encrypt",
    "mode.decrypt": "Decrypt",
    "mode.transform": "Transform",
    "mode.hash": "Hash",
    "btn.encode": "Encode",
    "btn.decode": "Decode",
    "btn.encrypt": "Encrypt",
    "btn.decrypt": "Decrypt",
    "btn.transform": "Transform",
    "btn.hash": "Generate Hash",
    "d.text": "Text",
    "d.plain": "Plain text",
    "d.cipher": "Cipher text",
    "d.rot": "ROT13 text",
    "d.digest": "SHA-256 digest",
    "fmt.base64": "Base64",
    "fmt.hex": "Hex",
    "fmt.url": "URL-encoded",
    "fmt.binary": "Binary",
    "set.shift": "Shift (0–25)",
    "set.shift.help": "how many places each letter moves",
    "err.b64chars": "Invalid Base64: use only A–Z, a–z, 0–9, + and /, with optional = padding at the end.",
    "err.b64len": "Invalid Base64: the length is not valid.",
    "err.b64pad": "Invalid Base64: the = padding is incorrect.",
    "err.utf8": "The resulting bytes are not valid UTF-8 text, so they cannot be shown as text.",
    "err.hexchars": "Invalid hexadecimal: only 0–9 and A–F are allowed (spaces between bytes are optional).",
    "err.hexodd": "Incomplete byte: hexadecimal needs an even number of digits (two per byte).",
    "err.urlbad": "Malformed percent-encoding: each % must be followed by two hex digits and form valid UTF-8.",
    "err.binchars": "Invalid binary: only 0 and 1 are allowed (spaces between bytes are optional).",
    "err.binlen": "Incomplete byte: binary must be a multiple of 8 bits (eight digits per byte).",
    "err.shift": "Shift must be a whole number from 0 to 25.",
    "err.nocrypto": "Web Crypto is unavailable. SHA-256 needs a secure context (HTTPS or localhost) and a modern browser.",
    "op.base64.name": "Base64",
    "op.base64.desc": "Turns bytes into printable ASCII text. Safe for UTF-8, Arabic and emoji.",
    "op.base64.note": "This is an encoding, not encryption: anyone can reverse it without a key.",
    "op.hex.name": "Hexadecimal",
    "op.hex.desc": "Shows the UTF-8 bytes of your text as hex pairs, or turns them back into text.",
    "op.hex.note": "This is an encoding, not encryption. When decoding, upper or lower case and optional spaces between bytes are accepted.",
    "op.url.name": "URL Encoding",
    "op.url.desc": "Percent-encodes text so it can be used inside a URL (encodeURIComponent).",
    "op.url.note": "This is an encoding, not encryption: anyone can reverse it.",
    "op.binary.name": "Binary",
    "op.binary.desc": "Shows each UTF-8 byte as eight binary digits separated by spaces.",
    "op.binary.note": "This is an encoding, not encryption. When decoding, use groups of exactly 8 bits; spaces between bytes are optional.",
    "op.caesar.name": "Caesar Cipher",
    "op.caesar.desc": "Moves every English letter forward by a fixed amount. Other characters stay as they are.",
    "op.caesar.note": "A classical teaching cipher with only 25 useful keys. It does not protect anything sensitive. English letters A–Z only.",
    "op.rot13.name": "ROT13",
    "op.rot13.desc": "Rotates English letters by 13 places. Applying it twice restores the original.",
    "op.rot13.note": "ROT13 is its own inverse and gives no real security. English letters A–Z only.",
    "op.sha256.name": "SHA-256",
    "op.sha256.desc": "Computes the 64-character hexadecimal SHA-256 digest of your text (UTF-8).",
    "op.sha256.note": "One-way hash: the digest cannot be directly reversed, and hashing does not provide confidentiality. Plain SHA-256 is not suitable for storing passwords (use Argon2id, scrypt or salted PBKDF2). Empty input hashes the empty string. Needs HTTPS or localhost.",
    "recipe.title": "Build your recipe",
    "recipe.empty": "Your recipe is empty. Click an operation on the left to start.",
    "recipe.hint": "Click an operation to use it alone, or press + to add it after your current steps.",
    "add.title": "Add to recipe",
    "step.label": "Step {n}",
    "line.label": "Line {n}",
    "step.up": "Move up",
    "step.down": "Move down",
    "step.remove": "Remove step",
    "step.disable": "Skip this step",
    "step.about": "About this step",
    "step.result": "Result of this step",
    "step.skipped": "Skipped",
    "tb.auto": "Run automatically",
    "tb.perline": "Apply to each line",
    "tb.save": "Save / load",
    "tb.share": "Share",
    "tb.clear": "Clear recipe",
    "save.title": "Save or load a recipe",
    "save.name": "Recipe name",
    "save.btn": "Save",
    "save.none": "No saved recipes yet.",
    "save.note": "Only steps and settings are stored in this browser. Your text is never saved, but keys typed in steps are stored as plain text.",
    "load.btn": "Load",
    "del.btn": "Delete",
    "close": "Close",
    "msg.saved": "Recipe saved.",
    "msg.loaded": "Recipe loaded.",
    "msg.deleted": "Recipe deleted.",
    "msg.noname": "Enter a name for the recipe.",
    "msg.storefail": "Browser storage is not available.",
    "share.title": "Share this recipe",
    "share.link": "Link",
    "share.input": "Include my input text in the link",
    "share.warn": "Anyone with the link can read the included text. Keys typed in steps are included too. Do not share real secrets.",
    "share.copy": "Copy link",
    "msg.linkcopied": "Link copied.",
    "msg.badlink": "The shared link is not valid and was ignored.",
    "magic.title": "Magic",
    "magic.found": "This looks like {chain}. Preview: {preview}",
    "magic.apply": "Apply these steps",
    "msg.magic": "Recipe set from Magic detection.",
    "vf.btn": "Verify a file",
    "vf.title": "Verify a file",
    "vf.drop": "Drop a file here, or choose one",
    "vf.choose": "Choose file",
    "vf.expected": "Expected hash (from the download page)",
    "vf.match": "Match: {alg}",
    "vf.nomatch": "No match with any computed hash.",
    "vf.name": "{n} ({b} bytes)",
    "vf.big": "This file is larger than 100 MB.",
    "vf.note": "The file is read and hashed inside your browser. It is never uploaded.",
    "btn.run": "Run recipe",
    "cat.analysis": "Analysis & formatting",
    "type.analysis": "Analysis tool",
    "st.on": "on",
    "st.off": "off",
    "mode.beautify": "Beautify",
    "mode.minify": "Minify",
    "mode.analyze": "Analyze",
    "btn.beautify": "Beautify",
    "btn.minify": "Minify",
    "btn.analyze": "Analyze",
    "d.json": "JSON text",
    "d.pretty": "Formatted JSON",
    "d.report": "Report",
    "d.morse": "Morse code",
    "d.jwt": "JWT token",
    "d.shifts": "All 25 shifts",
    "d.xor": "XOR bytes (hex)",
    "d.sha1": "SHA-1 digest",
    "d.sha384": "SHA-384 digest",
    "d.sha512": "SHA-512 digest",
    "fmt.base32": "Base32",
    "fmt.html": "HTML entities",
    "set.key": "Key",
    "set.vigkey.help": "letters A–Z only",
    "set.xorkey.help": "any text, repeated over the data",
    "stat.chars": "Characters",
    "stat.bytes": "Bytes (UTF-8)",
    "stat.words": "Words",
    "stat.lines": "Lines",
    "stat.unique": "Unique characters",
    "stat.entropy": "Entropy (bits per byte)",
    "jwt.header": "Header",
    "jwt.payload": "Payload",
    "jwt.warn": "Signature NOT verified.",
    "bf.best": "most likely English",
    "err.b32chars": "Invalid Base32: use only A–Z and 2–7, with optional = padding at the end.",
    "err.b32len": "Invalid Base32: the length is not valid.",
    "err.htmlnum": "Invalid numeric HTML entity.",
    "err.morse": "Unsupported character or Morse sequence. Use English letters, digits and common punctuation; separate letters with spaces and words with /.",
    "err.vigkey": "The key must contain at least one letter A–Z.",
    "err.xorkey": "Enter a key (any text).",
    "err.jwt": "Not a valid JWT: expected two or three dot-separated parts, with Base64URL-encoded JSON in the first two.",
    "err.json": "Invalid JSON.",
    "note.enc": "This is an encoding, not encryption: anyone can reverse it without a key.",
    "note.sha1": "SHA-1 is considered broken for security (practical collisions exist). Use it only for legacy checksums, never for signatures or passwords. It is a one-way hash and cannot be reversed. Needs HTTPS or localhost.",
    "op.base32.name": "Base32",
    "op.base32.desc": "Represents bytes with A–Z and 2–7 (RFC 4648). Safe for UTF-8, Arabic and emoji.",
    "op.html.name": "HTML Entities",
    "op.html.desc": "Replaces & < > \" ' with HTML entities, or turns common entities back into characters.",
    "op.html.note": "Encoding for displaying text in HTML. It is not encryption and not a complete defence against XSS by itself.",
    "op.morse.name": "Morse Code",
    "op.morse.desc": "Turns letters, digits and common punctuation into dots and dashes. Letters are separated by spaces and words by /.",
    "op.morse.note": "This is a code, not encryption. English letters, digits and common punctuation only.",
    "op.atbash.name": "Atbash Cipher",
    "op.atbash.desc": "Replaces each English letter with its mirror (A↔Z, B↔Y…). Applying it twice restores the text.",
    "op.atbash.note": "A classical teaching cipher with no key, so it gives no real security. English letters A–Z only.",
    "op.vigenere.name": "Vigenère Cipher",
    "op.vigenere.desc": "Shifts each English letter by the matching letter of a repeating key word.",
    "op.vigenere.note": "A classical cipher that frequency analysis can break. Teaching only. English letters A–Z only; the key must contain letters.",
    "op.xor.name": "XOR",
    "op.xor.desc": "XORs the UTF-8 bytes of your text with a repeating key and shows the result as hex.",
    "op.xor.note": "XOR with a short repeating key is easy to break. It is a teaching tool, not real encryption.",
    "op.sha1.name": "SHA-1",
    "op.sha1.desc": "Computes the 40-character hexadecimal SHA-1 digest of your text (UTF-8).",
    "op.sha384.name": "SHA-384",
    "op.sha384.desc": "Computes the 96-character hexadecimal SHA-384 digest of your text (UTF-8).",
    "op.sha512.name": "SHA-512",
    "op.sha512.desc": "Computes the 128-character hexadecimal SHA-512 digest of your text (UTF-8).",
    "op.brute.name": "Caesar Brute Force",
    "op.brute.desc": "Tries all 25 Caesar shifts and marks the one that looks most like English.",
    "op.brute.note": "Uses English letter frequencies, so it needs a reasonable amount of English text to guess well. Teaching tool.",
    "op.stats.name": "Text Statistics",
    "op.stats.desc": "Counts characters, bytes, words and lines, and measures Shannon entropy.",
    "op.stats.note": "Entropy is in bits per byte (0–8). Random or compressed data scores high, ordinary text lower. A high score does not prove data is encrypted.",
    "op.jwt.name": "JWT Decoder",
    "op.jwt.desc": "Reads the header and payload of a JSON Web Token.",
    "op.jwt.note": "Decoding only. The signature is NOT verified, so never trust the contents just because they can be read.",
    "op.json.name": "JSON Formatter",
    "op.json.desc": "Indents JSON so it is easy to read, or compresses it to one line. Invalid JSON is reported.",
    "op.json.note": "Formatting only. Nothing is uploaded.",
    "op.caesarar.name": "Arabic Caesar Cipher",
    "op.caesarar.desc": "Shifts each Arabic letter within the 28-letter Arabic alphabet by a fixed amount. Other characters stay as they are.",
    "op.caesarar.note": "A classical teaching cipher with only 27 useful keys. Letters are normalized first (أ إ آ → ا, ة → ه, ى → ي, ؤ → و, ئ → ي) and diacritics are removed, so decryption returns the normalized spelling. Not secure.",
    "op.atbashar.name": "Arabic Atbash Cipher",
    "op.atbashar.desc": "Replaces each Arabic letter with its mirror in the 28-letter alphabet (ا↔ي, ب↔و…). Applying it twice restores the (normalized) text.",
    "op.atbashar.note": "A keyless classical cipher, so it gives no real security. Letters are normalized first, as in the Arabic Caesar cipher.",
    "op.abjad.name": "Abjad Numerals",
    "op.abjad.desc": "Writes each Arabic letter as its traditional Abjad value (ا=1, ب=2, ج=3 … غ=1000). Letters are separated by spaces and words by /.",
    "op.abjad.note": "A traditional numeral code (the Eastern/Mashriqi order), not encryption. Letters are normalized first; only Arabic letters and spaces are supported.",
    "set.shift28": "Shift (0–27)",
    "d.abjad": "Abjad numbers",
    "err.shift28": "Shift must be a whole number from 0 to 27.",
    "err.abjad": "Unsupported input. Encoding accepts Arabic letters and spaces; decoding accepts numbers such as 1, 2, 3 … 1000 separated by spaces (words separated by /)."
  },
  ar: {
    "skip": "انتقل إلى منطقة العمل",
    "tagline": "حوّل. حلّل. افهم.",
    "menu": "إظهار أو إخفاء العمليات",
    "lang.label": "اللغة",
    "theme.light": "الوضع الفاتح",
    "theme.dark": "الوضع الداكن",
    "clear": "مسح الكل",
    "about": "حول الموقع",
    "nav.ops": "العمليات",
    "search.label": "بحث في العمليات",
    "search.ph": "ابحث عن عملية…",
    "search.none": "لا توجد عمليات مطابقة لـ \"{q}\".",
    "cat.enc": "الترميز وفك الترميز",
    "cat.classic": "الشيفرات الكلاسيكية",
    "cat.hash": "التجزئة (Hash)",
    "type.enc": "ترميز (ليس تشفيرًا)",
    "type.cipher": "شيفرة كلاسيكية (ضعيفة)",
    "type.hash": "تجزئة أحادية الاتجاه",
    "step.1": "اختر الاتجاه",
    "step.2": "أدخل النص",
    "step.3": "النتيجة",
    "modes": "الوضع",
    "input": "المدخلات",
    "output": "المخرجات",
    "ph.in": "اكتب النص أو الصقه هنا",
    "ph.out": "ستظهر النتيجة هنا",
    "ex.btn": "جرّب مثالًا",
    "clear.input": "مسح المدخلات",
    "copy": "نسخ النتيجة",
    "download": "تنزيل كملف TXT",
    "swap": "تبديل",
    "swap.title": "انقل النتيجة إلى المدخلات واعكس الاتجاه",
    "swap.off": "التبديل غير متاح: التجزئة أحادية الاتجاه",
    "shortcut": "اختصار:",
    "size": "{c} حرف · {b} بايت (UTF-8)",
    "osize": "{c} حرف",
    "st.ready": "جاهز",
    "st.busy": "جارٍ المعالجة…",
    "st.done": "تمت",
    "st.fail": "فشلت",
    "st.op": "الوصفة: {v}",
    "st.mode": "التشغيل التلقائي: {v}",
    "st.in": "المدخلات: {c} حرف / {b} بايت",
    "st.out": "المخرجات: {c} حرف",
    "msg.empty": "أدخل نصًا أولًا.",
    "msg.copied": "تم نسخ النتيجة.",
    "msg.copyfail": "تعذّر النسخ. حدّد النتيجة وانسخها يدويًا.",
    "msg.nocopy": "لا توجد نتيجة للنسخ.",
    "msg.nodl": "لا توجد نتيجة للتنزيل.",
    "msg.downloaded": "تم تنزيل الملف.",
    "msg.noswap": "لا توجد نتيجة للتبديل بعد. عالج نصًا أولًا.",
    "msg.swapoff": "التبديل غير متاح للعمليات أحادية الاتجاه.",
    "msg.done": "تمت العملية بنجاح ({label}).",
    "msg.unexpected": "حدث خطأ غير متوقع أثناء المعالجة.",
    "msg.ok": "نجاح: ",
    "msg.err": "خطأ: ",
    "confirm.clear": "هل تريد مسح كل المدخلات والمخرجات؟",
    "about.title": "حول CRYPTIX",
    "about.close": "إغلاق",
    "about.p1": "CRYPTIX أداة تعليمية لتحويل النصوص وحساب التجزئة (Hash). كل المعالجة تتم داخل متصفحك، ولا يُرسل نصك إلى أي خادم ولا يُخزَّن.",
    "about.l1": "الترميز (Base64 وHex وURL وBinary) يغيّر شكل البيانات فقط، وليس تشفيرًا.",
    "about.l2": "الشيفرات الكلاسيكية (قيصر وROT13) يسهل كسرها.",
    "about.l3": "SHA-256 تجزئة أحادية الاتجاه: لا يمكن عكسها، ولا تكفي وحدها لتخزين كلمات المرور.",
    "about.p2": "لم يخضع الموقع لتدقيق أمني احترافي. لا تستخدمه لحماية بيانات حساسة.",
    "mode.encode": "ترميز",
    "mode.decode": "فك الترميز",
    "mode.encrypt": "تشفير",
    "mode.decrypt": "فك التشفير",
    "mode.transform": "تحويل",
    "mode.hash": "تجزئة",
    "btn.encode": "ترميز",
    "btn.decode": "فك الترميز",
    "btn.encrypt": "تشفير",
    "btn.decrypt": "فك التشفير",
    "btn.transform": "تحويل",
    "btn.hash": "احسب التجزئة",
    "d.text": "نص",
    "d.plain": "نص عادي",
    "d.cipher": "نص مشفّر",
    "d.rot": "نص ROT13",
    "d.digest": "ناتج SHA-256",
    "fmt.base64": "Base64",
    "fmt.hex": "ست عشري (Hex)",
    "fmt.url": "نص بترميز URL",
    "fmt.binary": "ثنائي (Binary)",
    "set.shift": "الإزاحة (0–25)",
    "set.shift.help": "عدد المواضع التي يتحرك بها كل حرف",
    "err.b64chars": "Base64 غير صالح: استخدم فقط الأحرف A–Z وa–z والأرقام 0–9 والرمزين + و / ، مع علامة = اختيارية للحشو في النهاية.",
    "err.b64len": "Base64 غير صالح: طول النص غير صحيح.",
    "err.b64pad": "Base64 غير صالح: علامات الحشو = غير صحيحة.",
    "err.utf8": "البايتات الناتجة ليست نصًا صالحًا بترميز UTF-8، لذلك لا يمكن عرضها كنص.",
    "err.hexchars": "Hex غير صالح: المسموح فقط 0–9 وA–F (والمسافات بين البايتات اختيارية).",
    "err.hexodd": "بايت ناقص: يجب أن يكون عدد الخانات الست عشرية زوجيًا (خانتان لكل بايت).",
    "err.urlbad": "ترميز نسبة مئوية غير صالح: يجب أن يتبع كل % رقمان ست عشريان وأن يكوّنا UTF-8 صالحًا.",
    "err.binchars": "ثنائي غير صالح: المسموح فقط 0 و 1 (والمسافات بين البايتات اختيارية).",
    "err.binlen": "بايت ناقص: يجب أن يكون عدد الخانات من مضاعفات 8 (ثماني خانات لكل بايت).",
    "err.shift": "يجب أن تكون الإزاحة عددًا صحيحًا من 0 إلى 25.",
    "err.nocrypto": "Web Crypto غير متاح. يحتاج SHA-256 إلى سياق آمن (HTTPS أو localhost) ومتصفح حديث.",
    "op.base64.name": "Base64",
    "op.base64.desc": "يحوّل البايتات إلى نص ASCII قابل للطباعة. يدعم UTF-8 والعربية والإيموجي.",
    "op.base64.note": "هذا ترميز وليس تشفيرًا: يمكن لأي شخص عكسه بدون مفتاح.",
    "op.hex.name": "ست عشري (Hex)",
    "op.hex.desc": "يعرض بايتات UTF-8 للنص كأزواج ست عشرية، أو يعيدها إلى نص.",
    "op.hex.note": "هذا ترميز وليس تشفيرًا. عند الفك تُقبل الأحرف الكبيرة والصغيرة ومسافات اختيارية بين البايتات.",
    "op.url.name": "ترميز الروابط (URL)",
    "op.url.desc": "يحوّل النص بنظام النسبة المئوية (%) ليصلح داخل الروابط (encodeURIComponent).",
    "op.url.note": "هذا ترميز وليس تشفيرًا: يمكن لأي شخص عكسه.",
    "op.binary.name": "ثنائي (Binary)",
    "op.binary.desc": "يعرض كل بايت UTF-8 كثماني خانات ثنائية مفصولة بمسافات.",
    "op.binary.note": "هذا ترميز وليس تشفيرًا. عند الفك استخدم مجموعات من 8 خانات بالضبط، والمسافات بين البايتات اختيارية.",
    "op.caesar.name": "شيفرة قيصر",
    "op.caesar.desc": "تحرّك كل حرف إنجليزي إلى الأمام بمقدار ثابت، وتبقى بقية الرموز كما هي.",
    "op.caesar.note": "شيفرة كلاسيكية للتعلم، مفاتيحها المفيدة 25 فقط، ولا تحمي أي شيء حساس. تعمل على الأحرف الإنجليزية A–Z فقط (لا تعمل على العربية).",
    "op.rot13.name": "ROT13",
    "op.rot13.desc": "تدوّر الأحرف الإنجليزية 13 موضعًا. تطبيقها مرتين يعيد النص الأصلي.",
    "op.rot13.note": "ROT13 معكوسة نفسها ولا توفر أي أمان حقيقي. تعمل على الأحرف الإنجليزية A–Z فقط (لا تعمل على العربية).",
    "op.sha256.name": "SHA-256",
    "op.sha256.desc": "يحسب ناتج SHA-256 (64 خانة ست عشرية) لنصك بترميز UTF-8.",
    "op.sha256.note": "تجزئة أحادية الاتجاه: لا يمكن عكس الناتج مباشرة، والتجزئة لا توفر السرية. لا يصلح SHA-256 البسيط لتخزين كلمات المرور (استخدم Argon2id أو scrypt أو PBKDF2 مع salt). النص الفارغ يعطي تجزئة النص الفارغ. يحتاج HTTPS أو localhost.",
    "recipe.title": "ابنِ وصفتك",
    "recipe.empty": "الوصفة فارغة. اضغط على عملية من القائمة لتبدأ.",
    "recipe.hint": "اضغط على عملية لاستخدامها وحدها، أو اضغط + لإضافتها بعد خطواتك الحالية.",
    "add.title": "أضف إلى الوصفة",
    "step.label": "الخطوة {n}",
    "line.label": "السطر {n}",
    "step.up": "للأعلى",
    "step.down": "للأسفل",
    "step.remove": "حذف الخطوة",
    "step.disable": "تخطَّ هذه الخطوة",
    "step.about": "عن هذه الخطوة",
    "step.result": "ناتج هذه الخطوة",
    "step.skipped": "تم التخطي",
    "tb.auto": "تشغيل تلقائي",
    "tb.perline": "طبّق على كل سطر",
    "tb.save": "حفظ / تحميل",
    "tb.share": "مشاركة",
    "tb.clear": "مسح الوصفة",
    "save.title": "حفظ وصفة أو تحميلها",
    "save.name": "اسم الوصفة",
    "save.btn": "حفظ",
    "save.none": "لا توجد وصفات محفوظة بعد.",
    "save.note": "تُخزَّن الخطوات والإعدادات فقط في هذا المتصفح. نصوصك لا تُحفظ أبدًا، لكن المفاتيح المكتوبة داخل الخطوات تُخزَّن كنص عادي.",
    "load.btn": "تحميل",
    "del.btn": "حذف",
    "close": "إغلاق",
    "msg.saved": "تم حفظ الوصفة.",
    "msg.loaded": "تم تحميل الوصفة.",
    "msg.deleted": "تم حذف الوصفة.",
    "msg.noname": "أدخل اسمًا للوصفة.",
    "msg.storefail": "تخزين المتصفح غير متاح.",
    "share.title": "مشاركة هذه الوصفة",
    "share.link": "الرابط",
    "share.input": "ضمّن نص المدخلات في الرابط",
    "share.warn": "أي شخص يملك الرابط يستطيع قراءة النص المضمَّن. المفاتيح المكتوبة في الخطوات تُضمَّن أيضًا. لا تشارك أسرارًا حقيقية.",
    "share.copy": "نسخ الرابط",
    "msg.linkcopied": "تم نسخ الرابط.",
    "msg.badlink": "رابط المشاركة غير صالح وتم تجاهله.",
    "magic.title": "اكتشاف تلقائي (Magic)",
    "magic.found": "يبدو أن هذا {chain}. معاينة: {preview}",
    "magic.apply": "طبّق هذه الخطوات",
    "msg.magic": "تم ضبط الوصفة من الاكتشاف التلقائي.",
    "vf.btn": "تحقق من ملف",
    "vf.title": "تحقق من ملف",
    "vf.drop": "أفلت ملفًا هنا، أو اخترْ واحدًا",
    "vf.choose": "اختر ملفًا",
    "vf.expected": "التجزئة المتوقعة (من صفحة التنزيل)",
    "vf.match": "مطابقة: {alg}",
    "vf.nomatch": "لا تطابق أي تجزئة محسوبة.",
    "vf.name": "{n} ({b} بايت)",
    "vf.big": "حجم الملف أكبر من 100 ميغابايت.",
    "vf.note": "تتم قراءة الملف وحساب تجزئته داخل متصفحك، ولا يُرفع إلى أي مكان.",
    "btn.run": "شغّل الوصفة",
    "cat.analysis": "التحليل والتنسيق",
    "type.analysis": "أداة تحليل",
    "st.on": "مفعّل",
    "st.off": "متوقف",
    "mode.beautify": "تنسيق",
    "mode.minify": "ضغط",
    "mode.analyze": "تحليل",
    "btn.beautify": "نسّق",
    "btn.minify": "اضغط",
    "btn.analyze": "حلّل",
    "d.json": "نص JSON",
    "d.pretty": "JSON منسّق",
    "d.report": "تقرير",
    "d.morse": "شيفرة مورس",
    "d.jwt": "رمز JWT",
    "d.shifts": "كل الإزاحات الـ25",
    "d.xor": "بايتات XOR (ست عشري)",
    "d.sha1": "ناتج SHA-1",
    "d.sha384": "ناتج SHA-384",
    "d.sha512": "ناتج SHA-512",
    "fmt.base32": "Base32",
    "fmt.html": "كيانات HTML",
    "set.key": "المفتاح",
    "set.vigkey.help": "أحرف A–Z فقط",
    "set.xorkey.help": "أي نص، يتكرر على البيانات",
    "stat.chars": "الأحرف",
    "stat.bytes": "البايتات (UTF-8)",
    "stat.words": "الكلمات",
    "stat.lines": "الأسطر",
    "stat.unique": "الأحرف الفريدة",
    "stat.entropy": "الإنتروبيا (بت لكل بايت)",
    "jwt.header": "الترويسة (Header)",
    "jwt.payload": "الحمولة (Payload)",
    "jwt.warn": "التوقيع لم يُتحقق منه.",
    "bf.best": "الأرجح أنه إنجليزي",
    "err.b32chars": "Base32 غير صالح: استخدم فقط الأحرف A–Z والأرقام 2–7، مع علامة = اختيارية للحشو في النهاية.",
    "err.b32len": "Base32 غير صالح: طول النص غير صحيح.",
    "err.htmlnum": "كيان HTML رقمي غير صالح.",
    "err.morse": "حرف أو تسلسل مورس غير مدعوم. استخدم الأحرف الإنجليزية والأرقام وعلامات الترقيم الشائعة، وافصل الأحرف بمسافة والكلمات بـ /.",
    "err.vigkey": "يجب أن يحتوي المفتاح على حرف واحد على الأقل من A–Z.",
    "err.xorkey": "أدخل مفتاحًا (أي نص).",
    "err.jwt": "ليس JWT صالحًا: المتوقع جزءان أو ثلاثة مفصولة بنقاط، والجزءان الأولان JSON بترميز Base64URL.",
    "err.json": "JSON غير صالح.",
    "note.enc": "هذا ترميز وليس تشفيرًا: يمكن لأي شخص عكسه بدون مفتاح.",
    "note.sha1": "يُعتبر SHA-1 مكسورًا أمنيًا (توجد تصادمات عملية). استخدمه فقط لمجاميع التحقق القديمة، وليس للتواقيع أو كلمات المرور. هو تجزئة أحادية الاتجاه لا يمكن عكسها. يحتاج HTTPS أو localhost.",
    "op.base32.name": "Base32",
    "op.base32.desc": "يمثّل البايتات بالأحرف A–Z والأرقام 2–7 (RFC 4648). يدعم UTF-8 والعربية والإيموجي.",
    "op.html.name": "كيانات HTML",
    "op.html.desc": "يستبدل الرموز & < > \" ' بكيانات HTML، أو يعيد الكيانات الشائعة إلى حروف.",
    "op.html.note": "ترميز لعرض النص داخل HTML. ليس تشفيرًا، وليس وحده حماية كاملة من XSS.",
    "op.morse.name": "شيفرة مورس",
    "op.morse.desc": "يحوّل الأحرف والأرقام وعلامات الترقيم الشائعة إلى نقاط وشرطات. تُفصل الأحرف بمسافة والكلمات بـ /.",
    "op.morse.note": "هذه شيفرة ترميز وليست تشفيرًا. للأحرف الإنجليزية والأرقام وعلامات الترقيم الشائعة فقط.",
    "op.atbash.name": "شيفرة أتباش",
    "op.atbash.desc": "يستبدل كل حرف إنجليزي بنظيره المعاكس (A↔Z وB↔Y…). تطبيقه مرتين يعيد النص.",
    "op.atbash.note": "شيفرة كلاسيكية للتعلم بلا مفتاح، فلا توفر أمانًا حقيقيًا. للأحرف الإنجليزية A–Z فقط.",
    "op.vigenere.name": "شيفرة فيجينير",
    "op.vigenere.desc": "يزيح كل حرف إنجليزي بمقدار الحرف المقابل له في كلمة مفتاح تتكرر.",
    "op.vigenere.note": "شيفرة كلاسيكية يمكن كسرها بتحليل التكرار. للتعلم فقط. للأحرف A–Z فقط، ويجب أن يحتوي المفتاح على حروف.",
    "op.xor.name": "XOR",
    "op.xor.desc": "يطبّق XOR بين بايتات UTF-8 لنصك ومفتاح متكرر، ويعرض الناتج بالنظام الست عشري.",
    "op.xor.note": "XOR بمفتاح قصير متكرر سهل الكسر. أداة تعليمية وليست تشفيرًا حقيقيًا.",
    "op.sha1.name": "SHA-1",
    "op.sha1.desc": "يحسب ناتج SHA-1 (40 خانة ست عشرية) لنصك بترميز UTF-8.",
    "op.sha384.name": "SHA-384",
    "op.sha384.desc": "يحسب ناتج SHA-384 (96 خانة ست عشرية) لنصك بترميز UTF-8.",
    "op.sha512.name": "SHA-512",
    "op.sha512.desc": "يحسب ناتج SHA-512 (128 خانة ست عشرية) لنصك بترميز UTF-8.",
    "op.brute.name": "كسر شيفرة قيصر",
    "op.brute.desc": "يجرّب كل إزاحات قيصر الخمس والعشرين ويعلّم الأقرب إلى الإنجليزية.",
    "op.brute.note": "يعتمد على تكرار الأحرف الإنجليزية، لذا يحتاج كمية معقولة من النص الإنجليزي ليخمّن جيدًا. أداة تعليمية.",
    "op.stats.name": "إحصاءات النص",
    "op.stats.desc": "يحسب الأحرف والبايتات والكلمات والأسطر ويقيس إنتروبيا شانون.",
    "op.stats.note": "الإنتروبيا بوحدة بت لكل بايت (0–8). البيانات العشوائية أو المضغوطة تسجّل قيمة عالية والنص العادي أقل. القيمة العالية لا تثبت أن البيانات مشفّرة.",
    "op.jwt.name": "قارئ JWT",
    "op.jwt.desc": "يقرأ الترويسة والحمولة في رمز JSON Web Token.",
    "op.jwt.note": "قراءة فقط. التوقيع لا يُتحقق منه، فلا تثق بالمحتوى لمجرد أنه قابل للقراءة.",
    "op.json.name": "منسّق JSON",
    "op.json.desc": "ينسّق JSON بمسافات ليسهل قراءته، أو يضغطه في سطر واحد، ويبلّغ عن الأخطاء.",
    "op.json.note": "تنسيق فقط. لا يُرفع شيء إلى أي مكان.",
    "op.caesarar.name": "شيفرة قيصر العربية",
    "op.caesarar.desc": "تزيح كل حرف عربي بمقدار ثابت داخل الأبجدية العربية (28 حرفًا). تبقى بقية الرموز كما هي.",
    "op.caesarar.note": "شيفرة كلاسيكية للتعلم، مفاتيحها المفيدة 27 فقط. تُوحَّد الحروف أولًا (أ إ آ ← ا، ة ← ه، ى ← ي، ؤ ← و، ئ ← ي) وتُزال الحركات، لذا يعيد الفك الكتابة الموحّدة. غير آمنة.",
    "op.atbashar.name": "شيفرة أتباش العربية",
    "op.atbashar.desc": "تستبدل كل حرف عربي بنظيره المعاكس في الأبجدية (ا↔ي وب↔و…). تطبيقها مرتين يعيد النص (بعد توحيده).",
    "op.atbashar.note": "شيفرة كلاسيكية بلا مفتاح فلا توفر أمانًا حقيقيًا. تُوحَّد الحروف أولًا كما في قيصر العربية.",
    "op.abjad.name": "حساب الجُمَّل (أبجد)",
    "op.abjad.desc": "يكتب كل حرف عربي بقيمته التقليدية في حساب الجمل (ا=1 وب=2 وج=3 … غ=1000). تُفصل الحروف بمسافة والكلمات بـ /.",
    "op.abjad.note": "ترميز عددي تقليدي (الترتيب المشرقي)، وليس تشفيرًا. تُوحَّد الحروف أولًا، ويُدعم الحروف العربية والمسافات فقط.",
    "set.shift28": "الإزاحة (0–27)",
    "d.abjad": "أرقام الجمل (أبجد)",
    "err.shift28": "يجب أن تكون الإزاحة عددًا صحيحًا من 0 إلى 27.",
    "err.abjad": "مدخل غير مدعوم. الترميز يقبل الحروف العربية والمسافات، والفك يقبل أرقامًا مثل 1 و2 و3 … 1000 مفصولة بمسافات (والكلمات بـ /)."
  }
};

/* ---------- 2. Helpers ---------- */
/* Errors carry a translation key (err.<key>) so the UI can show them in the active language. */
class CryptixError extends Error { constructor(key) { super(key); this.key = key; } }
const fail = (key) => { throw new CryptixError(key); };
const encoder = new TextEncoder();
const utf8Bytes = (s) => encoder.encode(s);
const byteLength = (s) => utf8Bytes(s).length;
/* ctx = { t } is passed by the UI so analysis operations can label their output in the active language. */
const tr = (ctx, key) => (ctx && ctx.t ? ctx.t(key) : I18N.en[key]);

function bytesToText(bytes) {
  try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); } catch (e) { return fail('utf8'); }
}
function bytesToBase64(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
function base64ToBytes(str) {
  const clean = str.replace(/\s+/g, '');
  if (!clean) return new Uint8Array(0);
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(clean)) fail('b64chars');
  const body = clean.replace(/=+$/, '');
  if (body.length % 4 === 1) fail('b64len');
  if (clean.length !== body.length && clean.length % 4 !== 0) fail('b64pad');
  const bin = atob(body + '='.repeat((4 - (body.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}
const bytesToHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
function hexToBytes(str) {
  const clean = str.replace(/\s+/g, '');
  if (/[^0-9a-fA-F]/.test(clean)) fail('hexchars');
  if (clean.length % 2) fail('hexodd');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.substr(i * 2, 2), 16);
  return out;
}
const bytesToBinary = (bytes) => Array.from(bytes, (b) => b.toString(2).padStart(8, '0')).join(' ');
function binaryToBytes(str) {
  const clean = str.replace(/\s+/g, '');
  if (/[^01]/.test(clean)) fail('binchars');
  if (clean.length % 8) fail('binlen');
  const out = new Uint8Array(clean.length / 8);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.substr(i * 8, 8), 2);
  return out;
}
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function bytesToBase32(bytes) {
  let bits = 0, val = 0, out = '';
  for (const b of bytes) {
    val = (val << 8) | b; bits += 8;
    while (bits >= 5) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; }
    val &= (1 << bits) - 1;
  }
  if (bits) out += B32[(val << (5 - bits)) & 31];
  while (out.length % 8) out += '=';
  return out;
}
function base32ToBytes(str) {
  const clean = str.replace(/\s+/g, '').toUpperCase();
  if (!clean) return new Uint8Array(0);
  if (!/^[A-Z2-7]+=*$/.test(clean)) fail('b32chars');
  const body = clean.replace(/=+$/, '');
  if ([1, 3, 6].includes(body.length % 8)) fail('b32len');
  const out = []; let bits = 0, val = 0;
  for (const ch of body) {
    val = (val << 5) | B32.indexOf(ch); bits += 5;
    if (bits >= 8) { out.push((val >>> (bits - 8)) & 255); bits -= 8; val &= (1 << bits) - 1; }
  }
  return Uint8Array.from(out);
}
/* HTML entities are handled with plain string replacement; nothing is ever inserted as HTML. */
const HTML_ENC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const HTML_NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' };
const htmlEncode = (s) => s.replace(/[&<>"']/g, (c) => HTML_ENC[c]);
function htmlDecode(s) {
  return s.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (m, body) => {
    if (body[0] === '#') {
      const cp = body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      if (!(cp > 0 && cp <= 0x10ffff) || (cp >= 0xd800 && cp <= 0xdfff)) fail('htmlnum');
      return String.fromCodePoint(cp);
    }
    return Object.prototype.hasOwnProperty.call(HTML_NAMED, body) ? HTML_NAMED[body] : m;
  });
}
const MORSE = { A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.' };
const MORSE_REV = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));
const morseEncode = (s) => Array.from(s.trim().replace(/\s+/g, ' ').toUpperCase()).map((c) => (c === ' ' ? '/' : MORSE[c] || fail('morse'))).join(' ');
const morseDecode = (s) => s.trim().split(/\s+/).filter(Boolean).map((tk) => (tk === '/' ? ' ' : MORSE_REV[tk] || fail('morse'))).join('');
/* English letters only: shift by n (0–25); every other character is preserved. */
function shiftLetters(text, n) {
  return text.replace(/[A-Za-z]/g, (ch) => {
    const base = ch <= 'Z' ? 65 : 97;
    return String.fromCharCode(((ch.charCodeAt(0) - base + n) % 26) + base);
  });
}
const atbash = (s) => s.replace(/[A-Za-z]/g, (ch) => { const b = ch <= 'Z' ? 65 : 97; return String.fromCharCode(b + 25 - (ch.charCodeAt(0) - b)); });
/* Arabic: 28-letter alphabet. Hamza forms, ة, ى, ؤ, ئ are folded first and diacritics removed (documented in the UI). */
const AR_ALPHA = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي';
const AR_FOLD = { 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ٱ': 'ا', 'ة': 'ه', 'ى': 'ي', 'ؤ': 'و', 'ئ': 'ي' };
const arNormalize = (s) => s.replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[أإآٱةىؤئ]/g, (c) => AR_FOLD[c]);
const arMap = (text, f) => arNormalize(text).replace(/[\u0621-\u064A]/g, (c) => { const i = AR_ALPHA.indexOf(c); return i < 0 ? c : AR_ALPHA[f(i)]; });
const arShift = (text, n) => arMap(text, (i) => (i + n) % 28);
const arAtbash = (text) => arMap(text, (i) => 27 - i);
const ABJAD = { 'ا': 1, 'ب': 2, 'ج': 3, 'د': 4, 'ه': 5, 'و': 6, 'ز': 7, 'ح': 8, 'ط': 9, 'ي': 10, 'ك': 20, 'ل': 30, 'م': 40, 'ن': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100, 'ر': 200, 'ش': 300, 'ت': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000 };
const ABJAD_REV = Object.fromEntries(Object.entries(ABJAD).map(([k, v]) => [String(v), k]));
const abjadEncode = (s) => Array.from(arNormalize(s).trim().replace(/\s+/g, ' ')).map((c) => (c === ' ' ? '/' : ABJAD[c] !== undefined ? String(ABJAD[c]) : fail('abjad'))).join(' ');
const abjadDecode = (s) => s.trim().split(/\s+/).filter(Boolean).map((tk) => (tk === '/' ? ' ' : ABJAD_REV[tk] || fail('abjad'))).join('');
function vigenere(text, key, dir) {
  const k = key.toUpperCase().replace(/[^A-Z]/g, ''); if (!k) fail('vigkey');
  let j = 0;
  return text.replace(/[A-Za-z]/g, (ch) => {
    const b = ch <= 'Z' ? 65 : 97, s = (k.charCodeAt(j++ % k.length) - 65) * dir;
    return String.fromCharCode((((ch.charCodeAt(0) - b + s) % 26) + 26) % 26 + b);
  });
}
function xorBytes(bytes, key) {
  const k = utf8Bytes(key); if (!k.length) fail('xorkey');
  return bytes.map((b, i) => b ^ k[i % k.length]);
}
async function digestHex(alg, text) {
  if (!(globalThis.crypto && crypto.subtle)) fail('nocrypto');
  return bytesToHex(new Uint8Array(await crypto.subtle.digest(alg, utf8Bytes(text))));
}
/* Caesar brute force: score every shift against English letter frequencies (chi-squared; lower = closer). */
const EN_FREQ = [8.167, 1.492, 2.782, 4.253, 12.702, 2.228, 2.015, 6.094, 6.966, 0.153, 0.772, 4.025, 2.406, 6.749, 7.507, 1.929, 0.095, 5.987, 6.327, 9.056, 2.758, 0.978, 2.36, 0.15, 1.974, 0.074];
function chiSquared(text) {
  const counts = new Array(26).fill(0); let n = 0;
  for (const ch of text.toLowerCase()) { const c = ch.charCodeAt(0) - 97; if (c >= 0 && c < 26 && ch.length === 1) { counts[c]++; n++; } }
  if (!n) return Infinity;
  return counts.reduce((sum, c, i) => { const e = (EN_FREQ[i] / 100) * n; return sum + ((c - e) ** 2) / e; }, 0);
}
function bruteCaesar(text, ctx) {
  const rows = []; let best = 1, bestScore = Infinity;
  for (let s = 1; s <= 25; s++) {
    const cand = shiftLetters(text, 26 - s), sc = chiSquared(cand);
    rows.push([s, cand]); if (sc < bestScore) { bestScore = sc; best = s; }
  }
  return rows.map(([s, c]) => 'Shift ' + s + ': ' + c + (s === best && bestScore < Infinity ? '  ★ ' + tr(ctx, 'bf.best') : '')).join('\n');
}
function textStats(s, ctx) {
  const bytes = utf8Bytes(s), freq = new Array(256).fill(0); bytes.forEach((b) => freq[b]++);
  const entropy = bytes.length ? -freq.reduce((a, c) => (c ? a + (c / bytes.length) * Math.log2(c / bytes.length) : a), 0) : 0;
  const rows = [['stat.chars', Array.from(s).length], ['stat.bytes', bytes.length], ['stat.words', s.trim() ? s.trim().split(/\s+/).length : 0],
    ['stat.lines', s ? s.split('\n').length : 0], ['stat.unique', new Set(Array.from(s)).size], ['stat.entropy', entropy.toFixed(3)]];
  return rows.map(([k, v]) => tr(ctx, k) + ': ' + v).join('\n');
}
function jwtDecode(input, ctx) {
  const parts = input.trim().split('.');
  if (parts.length < 2 || parts.length > 3) fail('jwt');
  try {
    const dec = (p) => JSON.parse(bytesToText(base64ToBytes(p.replace(/-/g, '+').replace(/_/g, '/'))));
    return tr(ctx, 'jwt.header') + ':\n' + JSON.stringify(dec(parts[0]), null, 2) + '\n\n' + tr(ctx, 'jwt.payload') + ':\n' + JSON.stringify(dec(parts[1]), null, 2) + '\n\n' + tr(ctx, 'jwt.warn');
  } catch (e) { return fail('jwt'); }
}
function jsonFormat(s, mode) {
  let v; try { v = JSON.parse(s); } catch (e) { return fail('json'); }
  return mode === 'beautify' ? JSON.stringify(v, null, 2) : JSON.stringify(v);
}
const b64url = (str) => bytesToBase64(utf8Bytes(str)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64url = (s) => bytesToText(base64ToBytes(s.replace(/-/g, '+').replace(/_/g, '/')));

/* ---------- 3. Operation registry ----------
 * id, cat (category key), type (enc|cipher|hash|analysis), modes, flow (mode -> [from, to] translation keys),
 * sample (example text per language), settings [{id,label,help,type:'range'|'text',...}], reversible (usable by Swap),
 * manualOnly (never auto-runs), allowEmpty (empty input is meaningful), process(input, mode, settings, ctx) */
const ED = ['encode', 'decode'], hashOp = (id, alg, extra = {}) => ({ id, cat: 'cat.hash', type: 'hash', modes: ['hash'], reversible: false, manualOnly: true, allowEmpty: true,
  sample: { en: 'abc', ar: 'abc' }, flow: { hash: ['d.text', 'd.' + id] }, process: (i) => digestHex(alg, i), ...extra });
const OPERATIONS = [
  { id: 'base64', cat: 'cat.enc', type: 'enc', modes: ED, reversible: true, sample: { en: 'Hello', ar: 'مرحبا' }, flow: { encode: ['d.text', 'fmt.base64'], decode: ['fmt.base64', 'd.text'] },
    process: (i, m) => (m === 'encode' ? bytesToBase64(utf8Bytes(i)) : bytesToText(base64ToBytes(i))) },
  { id: 'hex', cat: 'cat.enc', type: 'enc', modes: ED, reversible: true, sample: { en: 'Hello', ar: 'مرحبا' }, flow: { encode: ['d.text', 'fmt.hex'], decode: ['fmt.hex', 'd.text'] },
    process: (i, m) => (m === 'encode' ? bytesToHex(utf8Bytes(i)) : bytesToText(hexToBytes(i))) },
  { id: 'url', cat: 'cat.enc', type: 'enc', modes: ED, reversible: true, sample: { en: 'hello world!', ar: 'مرحبا بالعالم' }, flow: { encode: ['d.text', 'fmt.url'], decode: ['fmt.url', 'd.text'] },
    process: (i, m) => { if (m === 'encode') return encodeURIComponent(i); try { return decodeURIComponent(i); } catch (e) { return fail('urlbad'); } } },
  { id: 'binary', cat: 'cat.enc', type: 'enc', modes: ED, reversible: true, sample: { en: 'A', ar: 'مرحبا' }, flow: { encode: ['d.text', 'fmt.binary'], decode: ['fmt.binary', 'd.text'] },
    process: (i, m) => (m === 'encode' ? bytesToBinary(utf8Bytes(i)) : bytesToText(binaryToBytes(i))) },
  { id: 'base32', cat: 'cat.enc', type: 'enc', modes: ED, reversible: true, sample: { en: 'Hello', ar: 'مرحبا' }, noteKey: 'note.enc', flow: { encode: ['d.text', 'fmt.base32'], decode: ['fmt.base32', 'd.text'] },
    process: (i, m) => (m === 'encode' ? bytesToBase32(utf8Bytes(i)) : bytesToText(base32ToBytes(i))) },
  { id: 'html', cat: 'cat.enc', type: 'enc', modes: ED, reversible: true, sample: { en: '<b>Tom & "Jerry"</b>', ar: '<b>Tom & "Jerry"</b>' }, flow: { encode: ['d.text', 'fmt.html'], decode: ['fmt.html', 'd.text'] },
    process: (i, m) => (m === 'encode' ? htmlEncode(i) : htmlDecode(i)) },
  { id: 'morse', cat: 'cat.enc', type: 'enc', modes: ED, reversible: true, sample: { en: 'SOS', ar: 'SOS' }, flow: { encode: ['d.text', 'd.morse'], decode: ['d.morse', 'd.text'] },
    process: (i, m) => (m === 'encode' ? morseEncode(i) : morseDecode(i)) },
  { id: 'caesar', cat: 'cat.classic', type: 'cipher', modes: ['encrypt', 'decrypt'], reversible: true, sample: { en: 'Hello, World!', ar: 'Hello, World!' }, flow: { encrypt: ['d.plain', 'd.cipher'], decrypt: ['d.cipher', 'd.plain'] },
    settings: [{ id: 'shift', label: 'set.shift', help: 'set.shift.help', type: 'range', min: 0, max: 25, value: 3 }],
    process: (i, m, s) => { const n = Number(s.shift); if (!Number.isInteger(n) || n < 0 || n > 25) fail('shift'); return shiftLetters(i, m === 'encrypt' ? n : (26 - n) % 26); } },
  { id: 'rot13', cat: 'cat.classic', type: 'cipher', modes: ['transform'], reversible: true, sample: { en: 'Hello', ar: 'Hello' }, flow: { transform: ['d.text', 'd.rot'] }, process: (i) => shiftLetters(i, 13) },
  { id: 'atbash', cat: 'cat.classic', type: 'cipher', modes: ['transform'], reversible: true, sample: { en: 'Hello', ar: 'Hello' }, flow: { transform: ['d.text', 'd.cipher'] }, process: (i) => atbash(i) },
  { id: 'vigenere', cat: 'cat.classic', type: 'cipher', modes: ['encrypt', 'decrypt'], reversible: true, sample: { en: 'Attack at dawn', ar: 'Attack at dawn' }, flow: { encrypt: ['d.plain', 'd.cipher'], decrypt: ['d.cipher', 'd.plain'] },
    settings: [{ id: 'key', label: 'set.key', help: 'set.vigkey.help', type: 'text', value: 'LEMON' }],
    process: (i, m, s) => vigenere(i, String(s.key || ''), m === 'encrypt' ? 1 : -1) },
  { id: 'xor', cat: 'cat.classic', type: 'cipher', modes: ['encrypt', 'decrypt'], reversible: true, sample: { en: 'Hello', ar: 'مرحبا' }, flow: { encrypt: ['d.plain', 'd.xor'], decrypt: ['d.xor', 'd.plain'] },
    settings: [{ id: 'key', label: 'set.key', help: 'set.xorkey.help', type: 'text', value: 'key' }],
    process: (i, m, s) => (m === 'encrypt' ? bytesToHex(xorBytes(utf8Bytes(i), String(s.key || ''))) : bytesToText(xorBytes(hexToBytes(i), String(s.key || '')))) },
  { id: 'caesarar', cat: 'cat.classic', type: 'cipher', modes: ['encrypt', 'decrypt'], reversible: true, sample: { en: 'مرحبا بالعالم', ar: 'مرحبا بالعالم' }, flow: { encrypt: ['d.plain', 'd.cipher'], decrypt: ['d.cipher', 'd.plain'] },
    settings: [{ id: 'shift', label: 'set.shift28', help: 'set.shift.help', type: 'range', min: 0, max: 27, value: 3 }],
    process: (i, m, s) => { const n = Number(s.shift); if (!Number.isInteger(n) || n < 0 || n > 27) fail('shift28'); return arShift(i, m === 'encrypt' ? n : (28 - n) % 28); } },
  { id: 'atbashar', cat: 'cat.classic', type: 'cipher', modes: ['transform'], reversible: true, sample: { en: 'مرحبا بالعالم', ar: 'مرحبا بالعالم' }, flow: { transform: ['d.text', 'd.cipher'] }, process: (i) => arAtbash(i) },
  { id: 'abjad', cat: 'cat.classic', type: 'enc', modes: ED, reversible: true, sample: { en: 'محمد', ar: 'محمد' }, flow: { encode: ['d.text', 'd.abjad'], decode: ['d.abjad', 'd.text'] },
    process: (i, m) => (m === 'encode' ? abjadEncode(i) : abjadDecode(i)) },
  hashOp('sha1', 'SHA-1', { noteKey: 'note.sha1' }),
  hashOp('sha256', 'SHA-256', { flow: { hash: ['d.text', 'd.digest'] } }),
  hashOp('sha384', 'SHA-384', { noteKey: 'op.sha256.note' }),
  hashOp('sha512', 'SHA-512', { noteKey: 'op.sha256.note' }),
  { id: 'brute', cat: 'cat.analysis', type: 'analysis', modes: ['analyze'], reversible: false, sample: { en: 'Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj', ar: 'Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj' }, flow: { analyze: ['d.cipher', 'd.shifts'] }, process: (i, m, s, c) => bruteCaesar(i, c) },
  { id: 'stats', cat: 'cat.analysis', type: 'analysis', modes: ['analyze'], reversible: false, allowEmpty: true, sample: { en: 'Hello, CRYPTIX!', ar: 'مرحبا بالعالم' }, flow: { analyze: ['d.text', 'd.report'] }, process: (i, m, s, c) => textStats(i, c) },
  { id: 'jwt', cat: 'cat.analysis', type: 'analysis', modes: ['analyze'], reversible: false, flow: { analyze: ['d.jwt', 'd.report'] },
    sample: { en: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', ar: '' }, process: (i, m, s, c) => jwtDecode(i, c) },
  { id: 'json', cat: 'cat.analysis', type: 'analysis', modes: ['beautify', 'minify'], reversible: true, sample: { en: '{"name":"CRYPTIX","tags":["a","b"]}', ar: '{"name":"CRYPTIX","tags":["a","b"]}' }, flow: { beautify: ['d.json', 'd.pretty'], minify: ['d.pretty', 'd.json'] },
    process: (i, m) => jsonFormat(i, m) }
];
OPERATIONS.find((o) => o.id === 'jwt').sample.ar = OPERATIONS.find((o) => o.id === 'jwt').sample.en;
const OP_BY_ID = Object.fromEntries(OPERATIONS.map((o) => [o.id, o]));
const OPPOSITE = { encode: 'decode', decode: 'encode', encrypt: 'decrypt', decrypt: 'encrypt', beautify: 'minify', minify: 'beautify' };
const INVERSE_MODES = new Set(['decode', 'decrypt', 'minify']);

/* ---------- 4. Recipes: run, validate, Magic detection ---------- */
const newStep = (id) => { const o = OP_BY_ID[id], s = {}; (o.settings || []).forEach((x) => { s[x.id] = x.value; }); return { op: id, mode: o.modes[0], settings: s, disabled: false }; };
async function runSteps(text, recipe, ctx) {
  const steps = []; let cur = text;
  for (let i = 0; i < recipe.length; i++) {
    const r = recipe[i];
    if (r.disabled) { steps.push({ out: cur, skipped: true }); continue; }
    try { cur = await OP_BY_ID[r.op].process(cur, r.mode, { ...r.settings }, ctx); steps.push({ out: cur }); }
    catch (err) { steps.push({ err }); return { steps, output: '', error: { step: i, err } }; }
  }
  return { steps, output: cur };
}
/* perLine = "Fork": run the whole recipe separately on every line of the input. */
async function runRecipe(input, recipe, perLine, ctx) {
  if (!perLine) return runSteps(input, recipe, ctx);
  const per = recipe.map(() => []), outs = [], lines = input.split('\n');
  const merge = (a) => (!a.length ? {} : a.find((s) => s.err) ? { err: a.find((s) => s.err).err } : { out: a.map((s) => s.out).join('\n'), skipped: a.every((s) => s.skipped) });
  for (let n = 0; n < lines.length; n++) {
    if (lines[n] === '') { outs.push(''); per.forEach((a) => a.push({ out: '' })); continue; }
    const r = await runSteps(lines[n], recipe, ctx);
    r.steps.forEach((s, i) => per[i].push(s));
    if (r.error) return { steps: per.map(merge), output: '', error: { ...r.error, line: n + 1 } };
    outs.push(r.output);
  }
  return { steps: per.map(merge), output: outs.join('\n') };
}
const serializeRecipe = (recipe, perLine) => ({ s: recipe.map((r) => [r.op, r.mode, r.settings, r.disabled ? 1 : 0]), l: perLine ? 1 : 0 });
/* Validates untrusted data (saved recipes, shared links) against the registry; returns null if invalid. */
function deserializeRecipe(d) {
  if (!d || !Array.isArray(d.s) || d.s.length > 30) return null;
  const recipe = [];
  for (const row of d.s) {
    if (!Array.isArray(row)) return null;
    const [op, mode, settings, dis] = row, o = OP_BY_ID[op];
    if (!o || !o.modes.includes(mode)) return null;
    const step = newStep(op); step.mode = mode; step.disabled = dis === 1;
    for (const def of o.settings || []) {
      const v = settings && settings[def.id];
      if (def.type === 'range' && Number.isInteger(v) && v >= def.min && v <= def.max) step.settings[def.id] = v;
      if (def.type === 'text' && typeof v === 'string' && v.length <= 200) step.settings[def.id] = v;
    }
    recipe.push(step);
  }
  return { recipe, perLine: d.l === 1 };
}
/* Magic: pattern-match the input against known encodings, speculatively decode, keep only results that look like
 * readable text, and recurse (bounded depth). Returns { chain: [{op, mode}], output } or null. */
const printableRatio = (s) => { let ok = 0, n = 0; for (const ch of s) { n++; const c = ch.codePointAt(0); if (c === 9 || c === 10 || c === 13 || (c >= 32 && c !== 127 && !(c >= 0x80 && c < 0xa0))) ok++; } return n ? ok / n : 0; };
const textiness = (s) => { let ok = 0, n = 0; for (const ch of s) { n++; if (/[\p{L}\p{N}\s.,;:!?'"(){}\[\]<>/_@=&\-]/u.test(ch)) ok++; } return n ? ok / n : 0; };
const MAGIC = [
  ['base64', /^[A-Za-z0-9+/\s]{4,}={0,2}\s*$/], ['hex', /^(?:[0-9a-fA-F]{2}\s*){2,}$/], ['binary', /^(?:[01]{8}\s*)+$/],
  ['url', /%[0-9a-fA-F]{2}/], ['base32', /^[A-Z2-7\s]{8,}=*\s*$/], ['html', /&(?:#x?[0-9a-fA-F]+|[a-zA-Z]+);/], ['morse', /^[.\-/\s]+$/]
];
function magicSearch(text, chain, depth) {
  const found = [];
  for (const [op, re] of MAGIC) {
    if (!re.test(text)) continue;
    let out; try { out = OP_BY_ID[op].process(text, 'decode', {}); } catch (e) { continue; }
    if (!out || out === text || printableRatio(out) < 0.95 || textiness(out) < 0.8) continue;
    const next = [...chain, { op, mode: 'decode' }];
    found.push({ chain: next, output: out });
    if (depth < 4) found.push(...magicSearch(out, next, depth + 1));
  }
  return found;
}
function detectMagic(input) {
  if (!input || input.length > 200000) return null;
  const all = magicSearch(input.trim(), [], 1);
  if (!all.length) return null;
  all.sort((a, b) => b.chain.length - a.chain.length || textiness(b.output) - textiness(a.output));
  return all[0];
}

/* ---------- 5. UI ---------- */
function initUI() {
  const $ = (id) => document.getElementById(id);
  const el = { input: $('input'), output: $('output'), msg: $('msg'), run: $('runBtn'), swap: $('swapBtn'), search: $('search'), sidebar: $('sidebar'), recipe: $('recipe') };
  const state = { recipe: [], perLine: false, auto: true, seq: 0, timer: null, magicTimer: null, lang: 'en', msg: null, phase: 'st.ready', magic: null, file: null };
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  $('kbd').textContent = isMac ? 'Cmd' : 'Ctrl';

  const t = (key, p = {}) => (I18N[state.lang][key] ?? I18N.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => (p[k] != null ? p[k] : ''));
  const mk = (tag, props = {}, text) => { const n = document.createElement(tag); Object.assign(n, props); if (text != null) n.textContent = text; return n; };
  const opText = (o, f) => t(f === 'note' && o.noteKey ? o.noteKey : 'op.' + o.id + '.' + f);
  const errKey = (e) => (e instanceof CryptixError ? 'err.' + e.key : 'msg.unexpected');
  const autoAllowed = () => state.auto && !state.recipe.some((r) => !r.disabled && OP_BY_ID[r.op].manualOnly);
  const openDlg = (id) => { const d = $(id); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); };
  const trunc = (s, n) => (s.length > n ? s.slice(0, n) + '…' : s);

  function toast(kind, text) {
    const n = mk('div', { className: 'toast ' + kind }, t(kind === 'error' ? 'msg.err' : 'msg.ok') + text);
    $('toasts').appendChild(n); setTimeout(() => n.remove(), 3500);
  }
  /* message = {kind, key, params, step, line}; stored so it can be re-translated when the language changes */
  function setMsg(kind, key, params, extra) { state.msg = kind ? { kind, key, params, ...extra } : null; renderMsg(); }
  function renderMsg() {
    const m = state.msg; el.msg.hidden = !m; if (!m) { el.msg.textContent = ''; return; }
    el.msg.className = 'msg ' + m.kind;
    const where = m.step != null ? t('step.label', { n: m.step + 1 }) + (m.line ? ' · ' + t('line.label', { n: m.line }) : '') + ': ' : '';
    el.msg.textContent = t(m.kind === 'error' ? 'msg.err' : 'msg.ok') + where + t(m.key, m.params);
  }

  function renderSidebar() {
    const q = el.search.value.trim().toLowerCase(), list = $('opList'); list.textContent = '';
    const hits = OPERATIONS.filter((o) => (opText(o, 'name') + ' ' + opText(o, 'desc') + ' ' + I18N.en['op.' + o.id + '.name'] + ' ' + t(o.cat)).toLowerCase().includes(q));
    if (!hits.length) { list.appendChild(mk('p', { className: 'empty' }, t('search.none', { q: el.search.value }))); return; }
    let cat = '';
    hits.forEach((o) => {
      if (o.cat !== cat) { cat = o.cat; list.appendChild(mk('h2', { className: 'cat' }, t(cat))); }
      const row = mk('div', { className: 'op-row' });
      const b = mk('button', { type: 'button', className: 'op' });
      b.append(mk('b', {}, opText(o, 'name')), mk('span', {}, opText(o, 'desc')));
      b.setAttribute('aria-current', String(state.recipe.some((r) => r.op === o.id)));
      b.addEventListener('click', () => { useOp(o.id); closeMenu(); });
      const add = mk('button', { type: 'button', className: 'add', title: t('add.title') }, '+');
      add.setAttribute('aria-label', t('add.title') + ': ' + opText(o, 'name'));
      add.addEventListener('click', () => { addOp(o.id); closeMenu(); });
      row.append(b, add); list.appendChild(row);
    });
  }
  function closeMenu() { el.sidebar.classList.remove('open'); $('menuBtn').setAttribute('aria-expanded', 'false'); }

  function renderRecipe() {
    el.recipe.textContent = '';
    if (!state.recipe.length) { el.recipe.appendChild(mk('p', { className: 'empty-recipe' }, t('recipe.empty'))); updateControls(); return; }
    state.recipe.forEach((r, i) => {
      const o = OP_BY_ID[r.op], card = mk('article', { className: 'rs' + (r.disabled ? ' skipped' : '') });
      const head = mk('div', { className: 'rs-h' });
      head.append(mk('span', { className: 'n' }, String(i + 1)), mk('h3', {}, opText(o, 'name')), mk('span', { className: 'chip ' + o.type }, t('type.' + o.type)));
      const tools = mk('div', { className: 'rs-tools' });
      const skip = mk('label', { className: 'chk' }), cb = mk('input', { type: 'checkbox', checked: r.disabled });
      cb.addEventListener('change', () => { r.disabled = cb.checked; renderRecipe(); updateStatus(); if (el.input.value) schedule(0); });
      skip.append(cb, mk('span', {}, t('step.disable')));
      const btn = (txt, key, off, fn) => { const b = mk('button', { type: 'button', className: 'btn sm', title: t(key), disabled: off }, txt); b.setAttribute('aria-label', t(key) + ' (' + t('step.label', { n: i + 1 }) + ')'); b.addEventListener('click', fn); return b; };
      const move = (d) => { const j = i + d; [state.recipe[i], state.recipe[j]] = [state.recipe[j], state.recipe[i]]; recipeChanged(); };
      tools.append(skip, btn('↑', 'step.up', i === 0, () => move(-1)), btn('↓', 'step.down', i === state.recipe.length - 1, () => move(1)),
        btn('✕', 'step.remove', false, () => { state.recipe.splice(i, 1); recipeChanged(); }));
      head.appendChild(tools);

      const ctl = mk('div', { className: 'controls' });
      if (o.modes.length > 1) {
        const modes = mk('div', { className: 'modes', role: 'group' }); modes.setAttribute('aria-label', t('modes'));
        o.modes.forEach((m) => {
          const b = mk('button', { type: 'button' }, t('mode.' + m)); b.setAttribute('aria-pressed', String(m === r.mode));
          b.addEventListener('click', () => { r.mode = m; renderRecipe(); updateStatus(); if (el.input.value) schedule(0); });
          modes.appendChild(b);
        });
        ctl.appendChild(modes);
      }
      const [from, to] = o.flow[r.mode], flow = mk('div', { className: 'flow' });
      flow.append(mk('b', {}, t(from)), mk('span', { className: 'arr', ariaHidden: 'true' }, '→'), mk('b', {}, t(to))); ctl.appendChild(flow);
      const set = mk('div', { className: 'settings' });
      (o.settings || []).forEach((s) => {
        const id = 's' + i + '_' + s.id;
        set.appendChild(mk('label', { htmlFor: id }, t(s.label)));
        if (s.type === 'range') {
          const range = mk('input', { type: 'range', id, min: s.min, max: s.max, value: r.settings[s.id] });
          const num = mk('input', { type: 'number', min: s.min, max: s.max, value: r.settings[s.id] }); num.setAttribute('aria-label', t(s.label));
          const link = (src, dst) => src.addEventListener('input', () => { const v = Math.min(s.max, Math.max(s.min, Math.round(Number(src.value) || 0))); r.settings[s.id] = v; dst.value = v; schedule(100); });
          link(range, num); link(num, range); set.append(range, num);
        } else {
          const inp = mk('input', { type: 'text', id, value: r.settings[s.id], maxLength: 200, autocomplete: 'off', spellcheck: false });
          inp.addEventListener('input', () => { r.settings[s.id] = inp.value; schedule(250); }); set.appendChild(inp);
        }
        set.appendChild(mk('small', {}, '(' + t(s.help) + ')'));
      });
      ctl.appendChild(set);

      const about = mk('details'); about.open = state.recipe.length === 1;
      about.append(mk('summary', {}, t('step.about')), mk('p', {}, opText(o, 'desc')), mk('p', { className: 'notice' }, opText(o, 'note')));
      const out = mk('div', { className: 'rs-out', dir: 'auto' }); out.dataset.label = t('step.result');
      card.append(head, ctl, about, out); el.recipe.appendChild(card);
    });
    updateControls();
  }
  function updateStepOutputs(res) {
    [...el.recipe.querySelectorAll('.rs')].forEach((card, i) => {
      const s = res && res.steps[i], out = card.querySelector('.rs-out');
      out.className = 'rs-out'; card.classList.toggle('err', !!(s && s.err));
      out.dataset.label = s && s.skipped ? t('step.skipped') : t('step.result');
      out.textContent = !s ? '' : s.err ? t(errKey(s.err)) : trunc(s.out || '', 400);
      if (s && s.err) { out.classList.add('bad'); out.dataset.label = t('msg.err').trim(); }
    });
  }
  function updateControls() {
    const rec = state.recipe, canSwap = rec.length > 0 && rec.every((r) => OP_BY_ID[r.op].reversible);
    el.run.textContent = rec.length === 1 ? t('btn.' + rec[0].mode) : t('btn.run');
    el.swap.disabled = !canSwap; el.swap.title = canSwap ? t('swap.title') : t('swap.off');
    updateStatus();
  }
  function recipeChanged() { renderSidebar(); renderRecipe(); if (el.input.value) schedule(0); }

  function updateStatus(phase) {
    if (phase) state.phase = phase;
    const i = el.input.value, o = el.output.value, ib = byteLength(i);
    $('inMeta').textContent = t('size', { c: i.length, b: ib }); $('outMeta').textContent = t('osize', { c: o.length });
    $('stOp').textContent = t('st.op', { v: trunc(state.recipe.map((r) => opText(OP_BY_ID[r.op], 'name')).join(' → ') || '—', 70) });
    $('stMode').textContent = t('st.mode', { v: t(autoAllowed() ? 'st.on' : 'st.off') });
    $('stIn').textContent = t('st.in', { c: i.length, b: ib }); $('stOut').textContent = t('st.out', { c: o.length });
    $('stState').textContent = t(state.phase);
  }

  function useOp(id) { state.recipe = [newStep(id)]; el.output.value = ''; setMsg(null); recipeChanged(); }
  function addOp(id) { state.recipe.push(newStep(id)); recipeChanged(); }

  /* source: 'manual' (button/shortcut) shows toasts and missing-input errors; 'auto' is quiet. */
  async function run(source) {
    const rec = state.recipe, input = el.input.value, my = ++state.seq, ctx = { t };
    if (!rec.length) { el.output.value = ''; updateStatus('st.ready'); if (source === 'manual') setMsg('error', 'recipe.empty'); return; }
    const allowEmpty = rec.some((r) => !r.disabled && OP_BY_ID[r.op].allowEmpty);
    if (!input && !allowEmpty) {
      el.output.value = ''; updateStepOutputs(null); updateStatus('st.ready');
      if (source === 'manual') setMsg('error', 'msg.empty'); else setMsg(null);
      return;
    }
    updateStatus('st.busy'); const lock = rec.some((r) => OP_BY_ID[r.op].manualOnly); if (lock) el.run.disabled = true;
    try {
      const res = await runRecipe(input, rec, state.perLine, ctx);
      if (my !== state.seq) return; // superseded by a newer run
      updateStepOutputs(res);
      if (res.error) {
        el.output.value = ''; const key = errKey(res.error.err);
        setMsg('error', key, {}, { step: res.error.step, line: res.error.line }); updateStatus('st.fail');
        if (source === 'manual') toast('error', t(key));
      } else {
        el.output.value = res.output; setMsg(null);
        if (source === 'manual') { const label = rec.length === 1 ? t('mode.' + rec[0].mode) : t('btn.run'); setMsg('success', 'msg.done', { label }); toast('success', t('msg.done', { label })); }
        updateStatus('st.done');
      }
    } finally { if (my === state.seq) el.run.disabled = false; }
  }
  /* When auto-run is off (or the recipe contains a hash), a change makes the old result stale: clear it so the
   * output on screen always belongs to the current input and recipe. The user presses Run to refresh it. */
  function markStale() { clearTimeout(state.timer); state.seq++; el.output.value = ''; updateStepOutputs(null); setMsg(null); updateStatus('st.ready'); }
  function schedule(delay) { if (!autoAllowed()) { markStale(); return; } clearTimeout(state.timer); state.timer = setTimeout(() => run('auto'), delay); }
  function scheduleMagic() {
    clearTimeout(state.magicTimer);
    state.magicTimer = setTimeout(() => { state.magic = detectMagic(el.input.value); renderMagic(); }, 400);
  }
  function renderMagic() {
    const m = state.magic; $('magic').hidden = !m; if (!m) return;
    const chain = m.chain.map((c) => opText(OP_BY_ID[c.op], 'name') + ' (' + t('mode.' + c.mode) + ')').join(' → ');
    $('magicText').textContent = t('magic.found', { chain, preview: trunc(m.output, 60) });
  }

  async function useExample() {
    const first = state.recipe.find((r) => !r.disabled) || state.recipe[0]; if (!first) return;
    const o = OP_BY_ID[first.op], text = o.sample[state.lang];
    try { el.input.value = INVERSE_MODES.has(first.mode) ? await o.process(text, OPPOSITE[first.mode], { ...first.settings }, { t }) : text; } catch (e) { el.input.value = text; }
    el.input.focus(); scheduleMagic(); run('manual');
  }
  async function copyText(text, okMsg, field) {
    try { await navigator.clipboard.writeText(text); return toast('success', okMsg); } catch (e) { /* fall back */ }
    try { field.focus(); field.select(); if (document.execCommand('copy')) return toast('success', okMsg); } catch (e) { /* ignore */ }
    toast('error', t('msg.copyfail'));
  }
  function copyOutput() { if (!el.output.value) return toast('error', t('msg.nocopy')); copyText(el.output.value, t('msg.copied'), el.output); }
  function downloadOutput() {
    const text = el.output.value; if (!text) return toast('error', t('msg.nodl'));
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const a = mk('a', { href: url, download: 'cryptix-' + (state.recipe.length === 1 ? state.recipe[0].op : 'recipe') + '-output.txt' });
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('success', t('msg.downloaded'));
  }
  /* Swap works on whole recipes: output becomes input, steps run in reverse order with each mode inverted. */
  function swap() {
    const rec = state.recipe;
    if (!rec.length || !rec.every((r) => OP_BY_ID[r.op].reversible)) return toast('error', t('msg.swapoff'));
    if (!el.output.value) return toast('error', t('msg.noswap'));
    el.input.value = el.output.value;
    state.recipe = rec.slice().reverse().map((r) => ({ ...r, settings: { ...r.settings }, mode: OPPOSITE[r.mode] || r.mode }));
    renderSidebar(); renderRecipe(); run('auto');
  }
  function clearAll() {
    if (el.input.value.length > 500 && !confirm(t('confirm.clear'))) return;
    state.seq++; el.input.value = ''; el.output.value = ''; state.magic = null; renderMagic(); updateStepOutputs(null); setMsg(null); updateStatus('st.ready'); el.input.focus();
  }

  /* --- saved recipes (steps + settings only; never the text) --- */
  const STORE = 'cryptix-recipes';
  function readStore() { try { const v = JSON.parse(localStorage.getItem(STORE) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return null; } }
  function writeStore(list) { try { localStorage.setItem(STORE, JSON.stringify(list)); return true; } catch (e) { toast('error', t('msg.storefail')); return false; } }
  function renderSaved() {
    const ul = $('savedList'); ul.textContent = ''; const list = readStore() || [];
    if (!list.length) { ul.appendChild(mk('li', {}, t('save.none'))); return; }
    list.forEach((item) => {
      const li = mk('li'), load = mk('button', { type: 'button', className: 'btn sm' }, t('load.btn')), del = mk('button', { type: 'button', className: 'btn sm' }, t('del.btn'));
      load.addEventListener('click', () => {
        const r = deserializeRecipe(item.d); if (!r) return toast('error', t('msg.badlink'));
        state.recipe = r.recipe; state.perLine = r.perLine; $('lineChk').checked = r.perLine; $('saveDlg').close(); recipeChanged(); toast('success', t('msg.loaded'));
      });
      del.addEventListener('click', () => { writeStore((readStore() || []).filter((x) => x.n !== item.n)); renderSaved(); toast('success', t('msg.deleted')); });
      li.append(mk('span', {}, item.n), load, del); ul.appendChild(li);
    });
  }
  function saveRecipe() {
    const name = $('recipeName').value.trim().slice(0, 60); if (!name) return toast('error', t('msg.noname'));
    const list = readStore(); if (list === null) return toast('error', t('msg.storefail'));
    const next = list.filter((x) => x.n !== name); next.push({ n: name, d: serializeRecipe(state.recipe, state.perLine) });
    if (writeStore(next)) { $('recipeName').value = ''; renderSaved(); toast('success', t('msg.saved')); }
  }
  /* --- share link: recipe only by default; the text is added only if the user ticks the box --- */
  function buildLink() {
    let h = '#recipe=' + b64url(JSON.stringify(serializeRecipe(state.recipe, state.perLine)));
    if ($('shareInput').checked && el.input.value) h += '&input=' + b64url(el.input.value);
    return location.href.split('#')[0] + h;
  }
  function loadFromHash() {
    if (!location.hash.startsWith('#recipe=')) return;
    try {
      const params = new URLSearchParams(location.hash.slice(1)), r = deserializeRecipe(JSON.parse(unb64url(params.get('recipe'))));
      if (!r) throw new Error('bad');
      state.recipe = r.recipe; state.perLine = r.perLine; $('lineChk').checked = r.perLine;
      if (params.has('input')) el.input.value = unb64url(params.get('input'));
    } catch (e) { setMsg('error', 'msg.badlink'); }
    history.replaceState(null, '', location.pathname + location.search); // keep shared text out of the address bar and history
  }
  /* --- file verification (hashed locally with Web Crypto; the file never leaves the browser) --- */
  async function hashFile(file) {
    state.file = null;
    if (file.size > 100 * 1024 * 1024) { state.file = { error: 'vf.big' }; return renderFile(); }
    if (!(globalThis.crypto && crypto.subtle)) { state.file = { error: 'err.nocrypto' }; return renderFile(); }
    const buf = await file.arrayBuffer(), hashes = {};
    for (const a of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) hashes[a] = bytesToHex(new Uint8Array(await crypto.subtle.digest(a, buf)));
    state.file = { name: file.name, size: file.size, hashes }; renderFile();
  }
  function renderFile() {
    const f = state.file, ul = $('fileHashes'), box = $('fileMatch'); ul.textContent = ''; box.hidden = true;
    $('fileName').textContent = !f ? '' : f.error ? t(f.error) : t('vf.name', { n: f.name, b: f.size });
    if (!f || f.error) return;
    Object.entries(f.hashes).forEach(([a, h]) => { const li = mk('li'); li.append(mk('b', {}, a + ': '), document.createTextNode(h)); ul.appendChild(li); });
    const m = $('expected').value.toLowerCase().match(/[0-9a-f]{40,128}/);
    if (!m) { if ($('expected').value.trim()) { box.hidden = false; box.className = 'msg error'; box.textContent = '✗ ' + t('vf.nomatch'); } return; }
    const alg = Object.keys(f.hashes).find((a) => f.hashes[a] === m[0]); box.hidden = false;
    box.className = 'msg ' + (alg ? 'success' : 'error'); box.textContent = alg ? '✓ ' + t('vf.match', { alg }) : '✗ ' + t('vf.nomatch');
  }

  function applyTheme(th) {
    document.documentElement.dataset.theme = th; $('themeBtn').textContent = t(th === 'dark' ? 'theme.light' : 'theme.dark');
    $('themeBtn').setAttribute('aria-pressed', String(th === 'light'));
    try { localStorage.setItem('cryptix-theme', th); } catch (e) { /* optional */ }
  }
  function applyLang(lang) {
    state.lang = lang; const d = document.documentElement; d.lang = lang; d.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach((n) => { n.placeholder = t(n.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-aria]').forEach((n) => { n.setAttribute('aria-label', t(n.dataset.i18nAria)); });
    $('langEn').setAttribute('aria-pressed', String(lang === 'en')); $('langAr').setAttribute('aria-pressed', String(lang === 'ar'));
    document.title = 'CRYPTIX — ' + t('tagline');
    try { localStorage.setItem('cryptix-lang', lang); } catch (e) { /* optional */ }
    applyTheme(d.dataset.theme); renderSidebar(); renderRecipe(); renderMagic(); renderMsg(); renderSaved(); renderFile();
    if (el.input.value && (autoAllowed() || el.output.value)) run('auto');
    document.dispatchEvent(new CustomEvent('cryptix:lang', { detail: lang })); // lets the assistant follow the interface language
  }

  /* Used by the assistant: validate a chain of steps, load it with an input, and run it. */
  function openChain(chain, input) {
    const r = deserializeRecipe({ s: (chain || []).map((c) => [c.op, c.mode, c.settings || {}, 0]), l: 0 }); if (!r || !r.recipe.length) return;
    state.recipe = r.recipe; state.perLine = false; $('lineChk').checked = false; el.input.value = String(input || '').slice(0, 200000);
    state.magic = null; renderMagic(); el.output.value = ''; setMsg(null); renderSidebar(); renderRecipe(); run(autoAllowed() ? 'auto' : 'manual');
  }

  /* Used by the Learn lab: put text in the input box without changing the recipe. */
  function setInput(text) { el.input.value = String(text || '').slice(0, 200000); el.output.value = ''; setMsg(null); updateStatus('st.ready'); scheduleMagic(); if (autoAllowed() && el.input.value) schedule(0); }

  el.input.addEventListener('input', () => { updateStatus(); schedule(250); scheduleMagic(); });
  el.run.addEventListener('click', () => run('manual'));
  el.swap.addEventListener('click', swap);
  $('exBtn').addEventListener('click', useExample);
  $('clearInBtn').addEventListener('click', () => { el.input.value = ''; state.magic = null; renderMagic(); el.input.focus(); run('auto'); });
  $('copyBtn').addEventListener('click', copyOutput);
  $('downloadBtn').addEventListener('click', downloadOutput);
  $('clearBtn').addEventListener('click', clearAll);
  $('clearRecipe').addEventListener('click', () => { state.recipe = []; el.output.value = ''; updateStepOutputs(null); setMsg(null); recipeChanged(); });
  $('autoChk').addEventListener('change', (e) => { state.auto = e.target.checked; updateStatus(); if (state.auto && el.input.value) schedule(0); });
  $('lineChk').addEventListener('change', (e) => { state.perLine = e.target.checked; if (el.input.value) schedule(0); });
  $('magicBtn').addEventListener('click', () => {
    const m = state.magic; if (!m) return;
    state.recipe = m.chain.map((c) => { const s = newStep(c.op); s.mode = c.mode; return s; }); state.magic = null; renderMagic();
    renderSidebar(); renderRecipe(); run('auto'); toast('success', t('msg.magic'));
  });
  $('saveOpen').addEventListener('click', () => { renderSaved(); openDlg('saveDlg'); });
  $('saveBtn').addEventListener('click', saveRecipe);
  $('recipeName').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); saveRecipe(); } });
  $('shareOpen').addEventListener('click', () => { $('shareLink').value = buildLink(); openDlg('shareDlg'); });
  $('shareInput').addEventListener('change', () => { $('shareLink').value = buildLink(); });
  $('shareCopy').addEventListener('click', () => copyText($('shareLink').value, t('msg.linkcopied'), $('shareLink')));
  $('fileBtn').addEventListener('click', () => openDlg('fileDlg'));
  $('fileInput').addEventListener('change', (e) => { if (e.target.files[0]) hashFile(e.target.files[0]); });
  $('expected').addEventListener('input', renderFile);
  const drop = $('drop');
  ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', (e) => { const f = e.dataTransfer && e.dataTransfer.files[0]; if (f) hashFile(f); });
  ['dragover', 'drop'].forEach((ev) => window.addEventListener(ev, (e) => e.preventDefault())); // never navigate away on a stray drop
  $('langEn').addEventListener('click', () => applyLang('en'));
  $('langAr').addEventListener('click', () => applyLang('ar'));
  $('themeBtn').addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  $('aboutBtn').addEventListener('click', () => openDlg('aboutDlg'));
  $('menuBtn').addEventListener('click', () => { const open = el.sidebar.classList.toggle('open'); $('menuBtn').setAttribute('aria-expanded', String(open)); });
  el.search.addEventListener('input', renderSidebar);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (isMac ? e.metaKey : e.ctrlKey) && !e.altKey && !e.shiftKey && !e.isComposing) { e.preventDefault(); run('manual'); }
    if (e.key === 'Escape') closeMenu();
  });

  let theme = 'dark', lang = (navigator.language || 'en').toLowerCase().startsWith('ar') ? 'ar' : 'en';
  try { theme = localStorage.getItem('cryptix-theme') === 'light' ? 'light' : 'dark'; lang = localStorage.getItem('cryptix-lang') || lang; } catch (e) { /* ignore */ }
  document.documentElement.dataset.theme = theme;
  if (typeof window !== 'undefined' && window.CRYPTIX) window.CRYPTIX.ui = { openChain, setInput, lang: () => state.lang };
  state.recipe = [newStep('base64')]; loadFromHash();
  applyLang(lang === 'ar' ? 'ar' : 'en');
  if (el.input.value) { scheduleMagic(); schedule(0); }
}

/* Shared with assistant.js (browser: window.CRYPTIX; Node tests: require). */
const CORE = { OPERATIONS, OP_BY_ID, I18N, CryptixError, runRecipe, detectMagic, deserializeRecipe, serializeRecipe, newStep, chiSquared, shiftLetters, textiness, printableRatio, base64ToBytes, hexToBytes, bytesToText, utf8Bytes, bytesToBase64, bytesToHex, bytesToBinary, EN_FREQ, AR_ALPHA, arNormalize, arShift, vigenere, atbash, ui: null, lab: null, chat: null };
if (typeof window !== 'undefined') window.CRYPTIX = CORE;
if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', initUI);
if (typeof module !== 'undefined') module.exports = CORE;
