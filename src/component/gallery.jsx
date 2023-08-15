import React, { useState, useEffect } from "react";
import axios from "axios";

function Gallery() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const isAdmin = localStorage.getItem("role") === "admin";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await axios.get("http://localhost:3001/images");
    setImages(response.data);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setTitle(image.title);
  };

  const handleDeleteClick = async (image) => {
    await axios.delete(`http://localhost:3001/images/${image.id}`);
    fetchImages();
  };

  function base64ToImage(base64String) {
    const imageData = atob(base64String.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(imageData.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < imageData.length; i++) {
      uint8Array[i] = imageData.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);
    return url;
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (title.trim() === "" || (!selectedImage && !file)) {
      alert("Veuillez entrer un titre et choisir une image");
      return;
    }

    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }

    // Ce code autorise que les jpeg (les requetes a 10000 environ)
    const base64Image = await fileToBase64(file);
    console.log(base64Image.length);
    const data = {
      title,
      image: base64Image,
    };

    if (selectedImage) {
      await axios.put(`http://localhost:3001/images/${selectedImage.id}`, data);
    } else {
      await axios.post("http://localhost:3001/images", data);
    }

    setSelectedImage(null);
    setTitle("");
    setFile(null);
    fetchImages();
  };

  return (
    <>
      {isAdmin && (
        <form className="add_image_form_container" onSubmit={handleFormSubmit}>
          <div className="FormGroup">
            <label htmlFor="title">Title :</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label htmlFor="image">Image :</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange}
            />
          </div>
          <p>Assurez-vous que votre image fasse moin de 11000 Ko</p>
          <button type="submit">
            {selectedImage ? "Modifier" : "Ajouter"}
          </button>
        </form>
      )}
      <div className="grid_container_flex"> 
        <ul className="grid_container">
          {images.map((image) => (
            <li
              className="image_restaurant"
              key={image.id}
              onClick={() => handleImageClick(image)}
            >
              <img
                className="single_image_restaurant"
                src={base64ToImage(image.image)}
                alt={image.title}
                style={{ height: "300px", width: "350px" }}
              />
              <div className="container_image_text_restaurant">
                <p className="single_image_text_restaurant">{image.title}</p>
                {isAdmin && (
                <button onClick={() => handleDeleteClick(image)}>
                  Supprimer
                </button>
              )}
              </div>
              
            </li>
          ))}
        </ul>
      </div>
      <button className="reservation_btn">
        <a href="/reservation">Réserver une table <i className="bi bi-calendar"></i></a>
      </button>
      
    </>
  );
}

export default Gallery;
