import Image from "next/image";
import Number from "./Number";
import React, { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import LoadingDots from "./LoadingDots";
import { validateConfig } from "next/dist/server/config-shared";

type Image = {
  url: string;
};

type Data = Image[];

const imageStyles = [
  "Portrait",
  "Digital Art",
  "Landscape",
  "Abstract",
  "Realism",
  "Impressionism",
  "Expressionism",
  "Minimalism",
  "Pop Art",
  "Surrealism",
];

const artists: string[] = [
  "Albert Bierstadt",
  "Andy Warhol",
  "Asaf Hanuka",
  "Aubrey Beardsley",
  "Claude Monet",
  "Diego Rivera",
  "Frida Kahlo",
  "Greg Rutkowski",
  "Hayao Miyazaki",
  "Hieronymus Bosch",
  "Jackson Pollock",
  "Leonardo da Vinci",
  "Michelangelo",
  "Pablo Picasso",
  "Salvador Dali",
  "Stanley Artgerm",
  "Thomas Kinkade",
  "Vincent van Gogh",
  "Banksy",
  "Rembrandt",
  "Georgia O'Keeffe",
];

const modifierStyles = [
  "Minimalist",
  "Retro",
  "Gothic",
  "Futuristic",
  "Industrial",
  "Bohemian",
  "Art Deco",
  "Mid-Century Modern",
  "Vintage",
  "Scandinavian",
];

const Artistic = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [selectedValue, setSelectedValue] = useState<string>("Small");
  const [images, setImages] = useState<Data>([]);
  const [image, setImage] = useState<string>("");
  const [selectedImageStyle, setSelectedImageStyle] =
    useState<string>("Portrait");
  const [selectedArtistStyle, setSelectedArtistsStyle] =
    useState<string>("Claude Monet");
  const [selectedModifierStyle, setSelectedModifierStyle] =
    useState<string>("Minimalist");
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredNumber = parseInt(e.target.value);
    if (enteredNumber > 10) {
      toast("You can generate a maximum of 10 images at once", {
        icon: "❌",
      });
      setNumber(10);
    } else {
      setNumber(enteredNumber);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedImageStyle(event.target.value);
    console.log(selectedImageStyle);
  };

  const handleArtistsStyleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedArtistsStyle(event.target.value);
    console.log(selectedArtistStyle);
  };

  const handleModifierStyleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedModifierStyle(event.target.value);
    console.log(selectedModifierStyle);
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text === "") {
      toast(t("alert"), {
        icon: "❌",
      });
      return;
    }

    setImages([]);

    let size = selectedValue;

    setLoading(true);

    let prompt = `Create an image that incorporates the image style of ${selectedImageStyle}, artist style of ${selectedArtistStyle}, and modifier style of ${selectedModifierStyle}. Use the following description as your guide: ${text} `;

    console.log(prompt);

    try {
      const response = await fetch(
        "https://justizcar.onrender.com/generate-images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number,
            prompt,
            size,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setImages(data.data as Data);
      } else {
        toast(t("error"), {
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast(t("error"), {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <form className="max-w-xl w-full" onSubmit={onSubmit}>
      <Number number={1} title={t("title1")} />
      <textarea
        className="block p-2.5 mt-2 mb-3 w-full h-[100px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
        placeholder="Write your prompt here..."
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <Number number={2} title={t("title2")} />

      <select
        value={selectedValue}
        onChange={handleSelectChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
      >
        <option value="Small">Small (256x256)</option>
        <option value="Medium">Medium (512x512)</option>
        <option value="Large">Large (1024x1024)</option>
      </select>

      <div className="mt-3" />

      <Number number={3} title={t("title5")} />

      <div className="grid grid-cols-2 gap-2 mt-4">
        <label className="block my-2 text-sm text-left font-medium text-gray-900 dark:text-white">
          Image Style:
        </label>
        <select
          onChange={handleStyleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
        >
          {imageStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
        <label className="block my-2 text-sm text-left font-medium text-gray-900 dark:text-white">
          Artist Style:
        </label>
        <select
          onChange={handleArtistsStyleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
        >
          {artists.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
        <label className="block my-2 text-sm text-left font-medium text-gray-900 dark:text-white">
          Modifers Style:
        </label>
        <select
          onChange={handleModifierStyleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
        >
          {modifierStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
        <div className="mb-2" />
      </div>

      <Number number={4} title={t("title3")} />

      <input
        onChange={handleNumberChange}
        type="number"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black"
      />

      {!loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          value="Generate"
          type="submit"
        >
          {t("generate")} &rarr;
        </button>
      )}
      {loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          disabled
        >
          <LoadingDots color="white" style="large" />
        </button>
      )}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {images.map((image) => (
          <div
            className="relative cursor-pointer transform transition-transform hover:scale-110"
            onClick={() => {
              setImage(image.url);
              openModal();
            }}
          >
            <img
              src={image.url}
              key={image.url}
              alt="Generated image"
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>

      <Modal isOpen={modalIsOpen} onClose={closeModal} imageUrl={image} />
    </form>
  );
};

export default Artistic;
