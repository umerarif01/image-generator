import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  lng: "de",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  // language resources
  resources: {
    en: {
      translation: {
        logo: "Logo Here",
        heroTitle: "Empower Your Imagination with AI Image Generation",
        footer: "Powered by Dall-2 E API",
        gbutton: "Generate Image",
        rgbutton: "Regenerate Image",
        alert: "Please type something in the input field",
        title1: "Enter Image Prompt (or tell us your idea):",
        title2: "Select Image Size:",
        title3: "Select Number of images you want to generate:",
        title4: "Select image you want to regenerate:",
        title5: "Select the following options: (Optional)",
        generate: "Generate",
        generating: "Generating...",
        error: "Images was unable to generate",
        note: "Note: The image selected should be png,less then 4 mb and square",
      },
    },
    de: {
      translation: {
        logo: "Logo hier",
        heroTitle: "Beleben Sie Ihre Fantasie mit AI-Bildgenerierung",
        footer: "Angetrieben von Dall-2 E API",
        gbutton: "Bild generieren",
        rgbutton: "Bild erneut generieren",
        alert: "Bitte geben Sie etwas in das Eingabefeld ein",
        title1: "Geben Sie das Bildprompt ein (oder sagen Sie uns Ihre Idee):",
        title2: "Wählen Sie die Bildgröße:",
        title3: "Wählen Sie die Anzahl der zu generierenden Bilder aus:",
        title4: "Wählen Sie das Bild aus, das Sie erneut generieren möchten:",
        title5: "Wählen Sie die folgenden Optionen: (Optional)",
        generate: "Generieren",
        generating: "Generieren...",
        note: "Hinweis: Das ausgewählte Bild sollte im PNG-Format sein, weniger als 4 MB groß sein und quadratisch sein.",
      },
    },
  },
});

export default i18n;
