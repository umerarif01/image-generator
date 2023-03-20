import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const lngs = [
  { code: "de", native: "German" },
  { code: "en", native: "English" },
];

export default function Header() {
  const [currentLangCode, setCurrentLangCode] = useState<string>(lngs[0].code);
  const { t, i18n } = useTranslation();

  const handleTrans = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLangCode = event.target.value;
    setCurrentLangCode(selectedLangCode);
    i18n.changeLanguage(selectedLangCode);
  };

  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/logoimg.png"
          className="sm:w-16 sm:h-14 w-12 h-12"
          width={250}
          height={250}
        />
        <h1 className="sm:text-4xl text-2xl font-semibold ml-2 mt-1 tracking-tight">
          JUSTIZCAR
        </h1>
      </Link>
      <select
        id="language"
        name="language"
        className="w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleTrans}
        value={currentLangCode}
      >
        {lngs.map((lng) => (
          <option key={lng.code} value={lng.code}>
            {lng.native}
          </option>
        ))}
      </select>
    </header>
  );
}
