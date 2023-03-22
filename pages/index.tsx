import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";
import Regenerate from "../components/Regenerate";
import Generate from "../components/Generate";
import Artistic from "../components/Artistic";

const btn =
  "p-3 text-md font-semibold bg-black text-white rounded-md transform transition-transform hover:scale-105";

const Home: NextPage = () => {
  const [mode, setMode] = useState<string>("");
  const { t } = useTranslation();

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen ">
      <Head>
        <title>Image Generator</title>
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mb-[100px] sm:mt-20">
        <h1 className="sm:text-5xl text-3xl max-w-4xl font-bold text-slate-900">
          {t("heroTitle")}
        </h1>

        {!mode && (
          <div className="mt-3 flex flex-col space-y-2 w-1/2 ">
            <p className="font-semibold text-sm 2xl:text-lg">Select Option:</p>
            <button className={btn} onClick={() => setMode("generation")}>
              {t("gbutton")}
            </button>
            <button className={btn} onClick={() => setMode("artist")}>
              {t("abutton")}
            </button>
            <button className={btn} onClick={() => setMode("regeneration")}>
              {t("rgbutton")}
            </button>
          </div>
        )}

        <div className="mt-5" />

        {mode === "generation" ? (
          <Generate />
        ) : mode === "artist" ? (
          <Artistic />
        ) : mode === "regeneration" ? (
          <Regenerate />
        ) : null}

        {mode && (
          <button
            className="bg-black rounded-md text-white font-medium px-5 py-2 sm:mt-10 mt-8 hover:bg-black"
            onClick={() => setMode("")}
          >
            &#8592; Go back
          </button>
        )}
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
