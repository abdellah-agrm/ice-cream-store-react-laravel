import Marquee from "react-fast-marquee";

export default function ScrollingBar() {
  const languages = [
    'Welcome',            // English
    'Bienvenido',         // Spanish
    'Bienvenue',          // French
    'Willkommen',         // German
    'Benvenuto',          // Italian
    'ようこそ',            // Japanese
    '환영합니다',          // Korean
    'Добро пожаловать',   // Russian
    '欢迎',               // Chinese (Simplified)
    'مرحبا',              // Arabic
    'स्वागत है',          // Hindi
    'Selamat datang',      // Indonesian
    'Välkommen',          // Swedish
    'καλωσόρισμα',        // Greek
    'ברוך הבא',          // Hebrew
  ];

  return (
    <div className="py-10 border-t-[1px] border-cream-600 bg-transparent">
      <Marquee>
        {languages.map((word, index) => (
          <span className="text-2xl sm:text-3x1 md:text-4xl text-cream-600 font-bold mx-3 md:mx-4" key={index}>{word}</span>
        ))}
      </Marquee>
    </div>
  );
}