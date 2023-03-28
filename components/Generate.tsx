import Image from "next/image";
import Number from "./Number";
import React, { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import LoadingDots from "./LoadingDots";

type Image = {
  url: string;
};

type Data = Image[];

const Generate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [selectedValue, setSelectedValue] = useState<string>("Small");
  const [images, setImages] = useState<Data>([]);
  const [image, setImage] = useState<string>("");

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

    let prompt = text;

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

      <Number number={3} title={t("title3")} />

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

export default Generate;
