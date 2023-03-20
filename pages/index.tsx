import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import Regenerate from "../components/Regenerate";
import Generate from "../components/Generate";

const Home: NextPage = () => {
  const [mode, setMode] = useState<Boolean>(true);
  const { t } = useTranslation();

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Image Generator</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mb-[100px] sm:mt-20">
        <h1 className="sm:text-5xl text-3xl max-w-4xl font-bold text-slate-900">
          {t("heroTitle")}
        </h1>

        <div className="flex mt-5 mb-[-5px]">
          <button
            className={`px-4 py-2  font-semibold ${
              mode ? "bg-black text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setMode(!mode)}
          >
            {t("gbutton")}
          </button>
          <button
            className={`px-7 py-2  font-semibold ${
              !mode ? "bg-black text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setMode(!mode)}
          >
            {t("rgbutton")}
          </button>
        </div>

        <div className="mt-4" />

        {mode ? <Generate /> : <Regenerate />}

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="mb-[-50px]" />
      </main>
      <footer className="w-full ">
        <p className="border-t-2 flex justify-center font-semibold py-2">
          {t("footer")}
        </p>
      </footer>
    </div>
  );
};

export default Home;
