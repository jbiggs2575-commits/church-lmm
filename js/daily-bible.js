const dailyVerses = [
  { text: "The LORD is my shepherd; I shall not want.", reference: "Psalm 23:1 (KJV)" },
  { text: "Be still, and know that I am God.", reference: "Psalm 46:10 (KJV)" },
  { text: "Thy word is a lamp unto my feet, and a light unto my path.", reference: "Psalm 119:105 (KJV)" },
  { text: "I can do all things through Christ which strengtheneth me.", reference: "Philippians 4:13 (KJV)" },
  { text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.", reference: "Proverbs 3:5 (KJV)" },
  { text: "The LORD is my strength and my shield; my heart trusted in him, and I am helped.", reference: "Psalm 28:7 (KJV)" },
  { text: "Let all your things be done with charity.", reference: "1 Corinthians 16:14 (KJV)" }
];

const verseText = document.querySelector("#daily-verse-text");
const verseReference = document.querySelector("#daily-verse-reference");
const verseDate = document.querySelector("#daily-verse-date");

if (verseText && verseReference && verseDate) {
  const now = new Date();
  const startOfYear = Date.UTC(now.getFullYear(), 0, 1);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const dayOfYear = Math.floor((today - startOfYear) / 86_400_000);
  const verse = dailyVerses[dayOfYear % dailyVerses.length];
  const localDate = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");

  verseText.textContent = `“${verse.text}”`;
  verseReference.textContent = verse.reference;
  verseDate.dateTime = localDate;
  verseDate.textContent = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(now);
}
