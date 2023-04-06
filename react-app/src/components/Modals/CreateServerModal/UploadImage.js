// import React, { useState } from "react";
// import "./UploadImage.css";

// const UploadImage = ({ setServerImg }) => {
//   const [image, setImage] = useState(null);
//   const [imageLoading, setImageLoading] = useState(false);
//   const [uploadedImg, setUploadImg] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [errors, setErrors] = useState([]);

//   const handleSubmit = async (image) => {
//     const formData = new FormData();

//     setImageLoading(true);

//     formData.append("image", image);
//     const res = await fetch("/api/images/", {
//       method: "POST",
//       body: formData,
//     });
//     if (res.ok) {
//       const imgUrl = await res.json();
//       setImageLoading(false);
//       setServerImg(imgUrl.url);
//       setUploadImg(true);
//       setPreviewImage(imgUrl.url);
//     } else if (res.status < 500) {
//       setImageLoading(false);

//       const error = [];
//       error.push("Could not upload file correctly.");
//       window.alert(error[0]);
//     }
//   };

//   const updateImage = async (e) => {
//     const file = e.target.files[0];
//     handleSubmit(file);
//   };

//   return (
//     <>
//       {uploadedImg && (
//         <>
//           <div className="preview-img-container">
//             <button
//               className="preview-img-button"
//               onClick={() => document.getElementById("file").click()}
//             >
//               <img src={previewImage} className="preview-img" />
//             </button>
//           </div>
//           <div className="error-container">
//             {errors.map((error, idx) => (
//               <div key={idx} className="error-message">
//                 {error}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//       <div className="modal-container">
//         {!uploadedImg && (
//           <button
//             class="upload-button"
//             onClick={() => document.getElementById("file").click()}
//           >
//             <i
//               class="fa-solid fa-camera fa-3x"
//               style={{ marginTop: "5px" }}
//             ></i>
//             <div class="upload-text-container">
//               <h1 class="upload-text">UPLOAD</h1>
//             </div>
//           </button>
//         )}
//       </div>

//       <form onSubmit={handleSubmit}>
//         {imageLoading && <p>Loading...</p>}
//         <div className="upload-photo">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={updateImage}
//             style={{ display: "none" }}
//             id="file"
//           />
//         </div>
//       </form>
//     </>
//   );
// };

// export default UploadImage;
