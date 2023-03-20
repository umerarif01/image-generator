import Number from "./Number";
import React, { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import LoadingDots from "./LoadingDots";

const endpoint = "https://api.openai.com/v1/images/variations";

type Image = {
  url: string;
};

type Data = Image[];

const Regenerate = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );
  const [images, setImages] = useState<Data>([]);
  const [number, setNumber] = useState<number | undefined>(undefined);
  const [selectedValue, setSelectedValue] = useState<string>("Small");
  const [image, setImage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
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

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image() as any;
        img.src = reader.result as string;
        img.onload = () => {
          if (img.width === img.height) {
            setSelectedImage(file);
            setMessage("Good");
          } else {
            setMessage(
              "Image is not square, images generated may not be accurate."
            );
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (context) {
              const maxSize = Math.max(img.width, img.height);
              canvas.width = maxSize;
              canvas.height = maxSize;
              context.drawImage(
                img,
                (maxSize - img.width) / 2,
                (maxSize - img.height) / 2,
                img.width,
                img.height,
                0,
                0,
                maxSize,
                maxSize
              );
              canvas.toBlob(
                (blob) => {
                  if (blob) {
                    const squareImage = new File([blob], file.name, {
                      type: file.type || "image/png",
                    });
                    setSelectedImage(squareImage);
                  }
                },
                file.type || "image/png",
                1
              );
            }
          }
        };
      };
    }
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedImage) {
      toast(t("alert"), {
        icon: "❌",
      });
      return;
    }

    setImages([]);

    const imageSize =
      selectedValue === "Small"
        ? "256x256"
        : selectedValue === "Medium"
        ? "512x512"
        : "1024x1024";

    setLoading(true);

    const headers = new Headers();
    headers.append(
      "Authorization",
      `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    );
    const formData = new FormData();
    if (selectedImage) {
      formData.append("image", selectedImage);
    } else {
      console.log("Image not found");
      return;
    }

    formData.append("n", String(number));
    formData.append("size", imageSize);
    formData.append("response_format", "url");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: headers,
      });
      const data = await response.json();
      console.log(data.data);
      setImages(data.data as Data);
    } catch (error) {
      console.error(error);
      throw error;
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
      <Number number={1} title={t("title4")} />

      <label className="block my-1 ml-1 text-sm text-left font-medium text-gray-900 dark:text-white">
        Upload file:
      </label>

      <input
        className="block mb-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        accept=".png"
        onChange={handleImageSelect}
      />

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
        {t("note")}
      </p>

      {message && message == "Good" ? (
        <p className=" text-sm font-semibold text-green-500 dark:text-gray-300">
          {" "}
          Image is square 👍
        </p>
      ) : (
        <p className=" text-sm font-semibold text-yellow-400 dark:text-gray-300">
          {" "}
          {message}
        </p>
      )}

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
            key={image.url}
            onClick={() => {
              setImage(image.url);
              openModal();
            }}
          >
            <img
              src={image.url}
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

export default Regenerate;
