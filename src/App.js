import React, { useEffect, useState } from 'react';
import  Loader  from 'react-loader-spinner';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast} from "react-toastify";
import { getImages } from "./components/api-service";


import SearchBar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Placeholder from './components/Placeholder';
import Container from './components/Container'


const STATUS = {
  IDEL: "idel",
  REJECTED: "rejected",
  RESOLVED: "resolved",
}

export default function App() {
  const [status, setStatus] = useState(STATUS.IDEL);
  const [nameImag, setNameImag] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalContent, setModalContent] = useState(null);
   
  
  useEffect(() => {
    
    if (nameImag === "") {
      return;
    }
    if (page === 1) {
      setImages([])
    }
    setLoader(true);
            
    getImages(page, nameImag)
      .then((data) => {
        if (data.hits.length < 12) {
          toast("Больше нет изображений для загрузки((")
        }

        setImages((prev) => [...prev, ...data.hits]);
        setStatus(STATUS.RESOLVED)
        })
        
      .catch(() => setStatus(STATUS.REJECTED))
      .finally(() => {
          setLoader(false);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
      })   
  }, [page, nameImag]);

  const setNameImage = (val) => {
     
    if (nameImag === val.toLowerCase()) {
      toast("Попробуйте что-то другое");
      return;
    }
   
    setNameImag(val.toLowerCase());
    setPage(1);
  };


  const onImgClick = (id) => {
    const modalImg = images.find((img) => img.id === id);
    setModalContent(modalImg);
    setShowModal((prev) => !prev);
  };

  return (
      <Container>
        <SearchBar onSubmit={setNameImage} />
        {status === "resolved" ? (
          <>
            <ImageGallery images={images} onImgClick={onImgClick} />
            <Button onClick={() => setPage((prev) => prev + 1)} />
          </>
        ) : null}
        {loader && (
          <Loader
            className="Loader"
            type="Grid"
            color="#9900cc"
            height={180}
            width={180}
          />
        )}
        {status === "rejectid" ? (
          <Placeholder text="Произошла ошибка при получении изображения" />
        ) : null}
        {showModal && (
          <Modal showModal={() => setShowModal((prev) => !prev)}>
            <img src={modalContent.largeImageURL} alt={modalContent.tags} />
          </Modal>
        )}
        

        <ToastContainer autoClose={3000}/>
      </Container>
    );
}

