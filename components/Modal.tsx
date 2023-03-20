import React from "react";
import ReactModal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl }) => {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img src={imageUrl} alt="Generated image" width={600} height={600} />
      <div className="mt-2 flex justify-around">
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-5 font-semibold py-3 rounded-md"
        >
          Close
        </button>
        <button
          className="bg-green-500 text-white font-semibold p-2 rounded-md"
          onClick={() => downloadImage(imageUrl)}
        >
          Download
        </button>
      </div>
    </ReactModal>
  );
};

export default Modal;
