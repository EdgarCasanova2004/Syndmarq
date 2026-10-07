import {

  useCallback,

  useEffect,

  useState,

  type ChangeEvent,

  type FormEvent,

} from "react";

import { useNavigate } from "react-router-dom";

import Cropper from "react-easy-crop";

import type { Area } from "react-easy-crop";

import { getCroppedImage } from "../utils/cropImage";

import "../App.css";

interface ProfileNameParts {
  name: string;
  paternalSurname: string;
  maternalSurname: string;
}

const getProfileNamePartsKey = () => {
  let accountKey = "current";

  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    accountKey = String(user.id ?? user.username ?? "current");
  } catch (error) {
    console.error("No se pudo identificar la cuenta local", error);
  }

  return `portavia:profile-name-parts:${accountKey}`;
};

const normalizeFullName = (value: string) =>
  value.trim().replace(/\s+/g, " ").toLocaleLowerCase("es-MX");

const profileStyles = `

  .pv-profile, .pv-profile * { box-sizing: border-box; }

  .pv-profile {

    min-height: 100vh;

    min-height: 100svh;

    padding: 28px clamp(16px, 4vw, 54px) 48px;

    color: #203447;

    background:

      radial-gradient(ellipse at 88% 0%, rgb(204 222 237 / 50%), transparent 30rem),

      #f2f5f8;

    font-family: inherit;

  }

  .pv-profile__shell {

    width: min(1180px, 100%);

    margin: 0 auto;

  }

  .pv-profile__header {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 18px;

    margin-bottom: 26px;

  }

  .pv-profile__brand {

    display: flex;

    align-items: center;

    gap: 11px;

    color: #24394c;

    text-decoration: none;

  }

  .pv-profile__brand-mark {

    width: 38px;

    height: 38px;

    display: grid;

    place-items: center;

    border: 1px solid rgb(255 255 255 / 88%);

    border-radius: 13px;

    color: #fff;

    background: linear-gradient(145deg, #314e67, #203a52);

    box-shadow: 0 6px 16px rgb(28 52 73 / 15%);

    font-size: 20px;

    font-weight: 650;

  }

  .pv-profile__brand-name {

    font-size: 15px;

    font-weight: 650;

    letter-spacing: .02em;

  }

  .pv-profile__back {

    display: inline-flex;

    align-items: center;

    gap: 8px;

    min-height: 39px;

    padding: 0 13px;

    border: 1px solid rgb(255 255 255 / 90%);

    border-radius: 10px;

    color: #486276;

    background: rgb(255 255 255 / 68%);

    box-shadow: 0 5px 16px rgb(32 52 71 / 5%);

    font: inherit;

    font-size: 11px;

    font-weight: 600;

    cursor: pointer;

    transition: background .2s, transform .2s;

  }

  .pv-profile__back:hover {

    transform: translateY(-1px);

    background: #fff;

  }

  .pv-profile__back svg {

    width: 15px;

    height: 15px;

  }

  .pv-profile__heading {

    margin: 0 0 22px;

    animation: pv-profile-rise .55s both;

  }

  .pv-profile__eyebrow {

    margin: 0 0 7px;

    color: #73889a;

    font-size: 9px;

    font-weight: 700;

    letter-spacing: .16em;

    text-transform: uppercase;

  }

  .pv-profile__heading h1 {

    margin: 0;

    color: #203447;

    font-size: clamp(27px, 4vw, 36px);

    font-weight: 570;

    letter-spacing: -.045em;

  }

  .pv-profile__heading p {

    max-width: 580px;

    margin: 8px 0 0;

    color: #718191;

    font-size: 12px;

    line-height: 1.65;

  }

  .pv-profile__layout {

    display: grid;

    grid-template-columns: minmax(0, 1fr) 310px;

    align-items: start;

    gap: 17px;

  }

  .pv-profile__editor,

  .pv-profile__preview {

    border: 1px solid rgb(255 255 255 / 90%);

    border-radius: 19px;

    background: rgb(255 255 255 / 78%);

    box-shadow: 0 12px 34px rgb(30 54 74 / 6%);

    backdrop-filter: blur(18px);

    animation: pv-profile-rise .65s .06s both;

  }

  .pv-profile__editor {

    padding: clamp(20px, 3vw, 31px);

  }

  .pv-profile__section-title {

    margin: 0 0 5px;

    color: #273d50;

    font-size: 15px;

    font-weight: 650;

  }

  .pv-profile__section-copy {

    margin: 0 0 22px;

    color: #81909d;

    font-size: 11px;

    line-height: 1.55;

  }

  .pv-profile__photo-row {

    display: flex;

    align-items: center;

    gap: 16px;

    margin-bottom: 22px;

    padding: 15px;

    border: 1px solid #e7edf2;

    border-radius: 14px;

    background: linear-gradient(120deg, #f9fbfc, #f0f5f8);

  }

  .pv-profile__photo {

    width: 68px;

    height: 68px;

    flex: none;

    display: grid;

    place-items: center;

    overflow: hidden;

    border: 2px solid #fff;

    border-radius: 50%;

    color: #36546d;

    background: #dce8f0;

    box-shadow: 0 3px 12px rgb(31 55 76 / 12%);

    font-family: Georgia, "Times New Roman", serif;

    font-size: 27px;

  }

  .pv-profile__photo img {

    width: 100%;

    height: 100%;

    object-fit: cover;

  }

  .pv-profile__photo-copy {

    min-width: 0;

  }

  .pv-profile__photo-copy strong {

    display: block;

    margin-bottom: 5px;

    color: #31485b;

    font-size: 11px;

  }

  .pv-profile__photo-copy p {

    margin: 0 0 9px;

    color: #82909c;

    font-size: 10px;

    line-height: 1.5;

  }

  .pv-profile__file-label {

    display: inline-flex;

    align-items: center;

    gap: 6px;

    color: #42657f;

    font-size: 10px;

    font-weight: 700;

    cursor: pointer;

  }

  .pv-profile__file-label:hover {

    color: #203f58;

    text-decoration: underline;

  }

  .pv-profile__file-input {

    position: absolute;

    width: 1px;

    height: 1px;

    overflow: hidden;

    clip: rect(0, 0, 0, 0);

    white-space: nowrap;

    clip-path: inset(50%);

  }

  .pv-profile__remove-photo {

    margin-left: 11px;

    padding: 0;

    border: 0;

    color: #8b6c6b;

    background: transparent;

    font: inherit;

    font-size: 10px;

    cursor: pointer;

  }

  .pv-profile__remove-photo:hover {

    text-decoration: underline;

  }

  .pv-profile__form {

    display: grid;

    gap: 16px;

  }

  .pv-profile__field label {

    display: block;

    margin-bottom: 7px;

    color: #344a5d;

    font-size: 11px;

    font-weight: 650;

  }

  .pv-profile__field input,

  .pv-profile__field textarea {

    width: 100%;

    border: 1px solid #dfe7ed;

    border-radius: 10px;

    outline: 0;

    background: rgb(255 255 255 / 78%);

    color: #23394b;

    font: inherit;

    font-size: 12px;

    transition: border-color .2s, box-shadow .2s, background .2s;

  }

  .pv-profile__field input {

    min-height: 44px;

    padding: 0 12px;

  }

  .pv-profile__field textarea {

    min-height: 132px;

    padding: 11px 12px;

    resize: vertical;

    line-height: 1.6;

  }

  .pv-profile__field input:focus,

  .pv-profile__field textarea:focus {

    border-color: #819eb4;

    background: #fff;

    box-shadow: 0 0 0 4px rgb(105 146 174 / 12%);

  }

  .pv-profile__field input::placeholder,

  .pv-profile__field textarea::placeholder {

    color: #a0acb5;

  }

  .pv-profile__field-help {

    display: block;

    margin: 7px 0 0;

    color: #8191a0;

    font-size: 10px;

    line-height: 1.55;

  }

  .pv-profile__message {

    margin: 0;

    padding: 10px 12px;

    border: 1px solid #dce7ef;

    border-radius: 10px;

    color: #536c80;

    background: #f2f7fa;

    font-size: 10px;

    line-height: 1.5;

  }

  .pv-profile__message--error {

    border-color: #efd9d6;

    color: #804944;

    background: #fff6f4;

  }

  .pv-profile__message--success {

    border-color: #d5e8dc;

    color: #37644b;

    background: #f2faf5;

  }

  .pv-profile__save {

    min-height: 45px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 8px;

    margin-top: 2px;

    padding: 0 17px;

    border: 1px solid rgb(255 255 255 / 20%);

    border-radius: 10px;

    color: #fff;

    background: linear-gradient(110deg, #263f56, #3a5d78);

    box-shadow: 0 7px 17px rgb(38 63 86 / 17%);

    font: inherit;

    font-size: 11px;

    font-weight: 650;

    cursor: pointer;

    transition: transform .2s, box-shadow .2s, opacity .2s;

  }

  .pv-profile__save:hover:not(:disabled) {

    transform: translateY(-2px);

    box-shadow: 0 11px 22px rgb(38 63 86 / 24%);

  }

  .pv-profile__save:disabled {

    opacity: .68;

    cursor: wait;

  }

  .pv-profile__preview {

    position: sticky;

    top: 22px;

    overflow: hidden;

    animation-delay: .13s;

  }

  .pv-profile__preview-cover {

    height: 92px;

    background:

      radial-gradient(ellipse at 80% 5%, rgb(213 229 241 / 75%), transparent 12rem),

      linear-gradient(120deg, #29465f, #657f94);

  }

  .pv-profile__preview-body {

    padding: 0 20px 20px;

  }

  .pv-profile__preview-avatar {

    width: 75px;

    height: 75px;

    display: grid;

    place-items: center;

    overflow: hidden;

    margin-top: -38px;

    border: 4px solid #fff;

    border-radius: 50%;

    color: #35536b;

    background: #dce8f0;

    box-shadow: 0 4px 15px rgb(26 48 68 / 12%);

    font-family: Georgia, "Times New Roman", serif;

    font-size: 30px;

  }

  .pv-profile__preview-avatar img {

    width: 100%;

    height: 100%;

    object-fit: cover;

  }

  .pv-profile__preview h2 {

    margin: 13px 0 4px;

    color: #263d50;

    font-size: 16px;

    font-weight: 650;

    letter-spacing: -.02em;

    overflow-wrap: anywhere;

  }

  .pv-profile__profession {

    margin: 0;

    color: #607b90;

    font-size: 11px;

  }

  .pv-profile__preview-bio {

    min-height: 55px;

    margin: 15px 0 17px;

    color: #7b8995;

    font-size: 10px;

    line-height: 1.65;

    white-space: pre-wrap;

    overflow-wrap: anywhere;

  }

  .pv-profile__preview-label {

    display: block;

    padding-top: 13px;

    border-top: 1px solid #e9eef2;

    color: #8795a0;

    font-size: 9px;

    font-weight: 700;

    letter-spacing: .12em;

  }

  .pv-profile__loading {

    width: min(480px, 100%);

    margin: 12vh auto;

    padding: 28px;

    border: 1px solid rgb(255 255 255 / 90%);

    border-radius: 18px;

    color: #5e7487;

    background: rgb(255 255 255 / 75%);

    box-shadow: 0 12px 34px rgb(30 54 74 / 6%);

    text-align: center;

  }

  .pv-profile__crop-overlay {

    position: fixed;

    inset: 0;

    z-index: 1000;

    display: grid;

    place-items: center;

    overflow-y: auto;

    padding: 20px;

    background: rgb(13 26 40 / 70%);

    backdrop-filter: blur(12px);

    animation: pv-profile-fade .2s both;

  }

  .pv-profile__crop-dialog {

    width: min(520px, 100%);

    overflow: hidden;

    border: 1px solid rgb(255 255 255 / 72%);

    border-radius: 20px;

    background: #f8fafc;

    box-shadow: 0 28px 90px rgb(0 0 0 / 32%);

    animation: pv-profile-rise .3s both;

  }

  .pv-profile__crop-header {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 15px;

    padding: 18px 21px;

  }

  .pv-profile__crop-header p {

    margin: 0 0 4px;

    color: #8292a0;

    font-size: 9px;

    font-weight: 700;

    letter-spacing: .14em;

  }

  .pv-profile__crop-header h2 {

    margin: 0;

    color: #263d50;

    font-size: 18px;

    font-weight: 650;

  }

  .pv-profile__crop-close {

    width: 34px;

    height: 34px;

    border: 1px solid #e2e9ee;

    border-radius: 50%;

    color: #5f7485;

    background: #fff;

    font-size: 21px;

    cursor: pointer;

  }

  .pv-profile__crop-area {

    position: relative;

    height: min(54vh, 340px);

    min-height: 230px;

    background: #1b2d3e;

  }

  .pv-profile__crop-controls {

    padding: 15px 21px 0;

  }

  .pv-profile__crop-controls label {

    display: block;

    margin-bottom: 8px;

    color: #455c70;

    font-size: 10px;

    font-weight: 650;

  }

  .pv-profile__crop-controls input {

    width: 100%;

    accent-color: #52758f;

  }

  .pv-profile__crop-help {

    margin: 10px 21px 0;

    color: #7c8b98;

    font-size: 10px;

    line-height: 1.5;

  }

  .pv-profile__crop-actions {

    display: flex;

    justify-content: flex-end;

    gap: 9px;

    padding: 17px 21px 20px;

  }

  .pv-profile__crop-actions button {

    min-height: 38px;

    padding: 0 14px;

    border-radius: 9px;

    font: inherit;

    font-size: 10px;

    font-weight: 650;

    cursor: pointer;

  }

  .pv-profile__crop-cancel {

    border: 1px solid #dfe7ed;

    color: #536b7e;

    background: #fff;

  }

  .pv-profile__crop-apply {

    border: 1px solid #304e66;

    color: #fff;

    background: #304e66;

  }

  @keyframes pv-profile-rise {

    from { opacity: 0; transform: translateY(12px); }

    to { opacity: 1; transform: translateY(0); }

  }

  @keyframes pv-profile-fade {

    from { opacity: 0; }

    to { opacity: 1; }

  }

  @media (max-width: 820px) {

    .pv-profile__layout {

      grid-template-columns: minmax(0, 1fr) 265px;

      gap: 13px;

    }

    .pv-profile__preview-body {

      padding-inline: 16px;

    }

  }

  @media (max-width: 680px) {

    .pv-profile {

      padding: 16px 14px 30px;

    }

    .pv-profile__header {

      margin-bottom: 23px;

    }

    .pv-profile__layout {

      grid-template-columns: 1fr;

    }

    .pv-profile__preview {

      position: static;

      grid-row: 1;

    }

    .pv-profile__preview-cover {

      height: 70px;

    }

    .pv-profile__preview-body {

      display: grid;

      grid-template-columns: 60px minmax(0, 1fr);

      column-gap: 13px;

      padding: 0 15px 15px;

    }

    .pv-profile__preview-avatar {

      width: 60px;

      height: 60px;

      grid-row: span 3;

      margin-top: -30px;

      border-width: 3px;

      font-size: 24px;

    }

    .pv-profile__preview h2 {

      margin: 8px 0 3px;

      font-size: 14px;

    }

    .pv-profile__profession {

      font-size: 10px;

    }

    .pv-profile__preview-bio {

      min-height: 0;

      grid-column: 1 / -1;

      margin: 12px 0 0;

    }

    .pv-profile__preview-label {

      grid-column: 1 / -1;

      margin-top: 12px;

      padding-top: 10px;

    }

  }

  @media (max-width: 420px) {

    .pv-profile {

      padding-inline: 11px;

    }

    .pv-profile__brand-mark {

      width: 34px;

      height: 34px;

    }

    .pv-profile__brand-name {

      font-size: 13px;

    }

    .pv-profile__back {

      min-height: 35px;

      gap: 5px;

      padding-inline: 9px;

      font-size: 9px;

    }

    .pv-profile__heading h1 {

      font-size: 27px;

    }

    .pv-profile__editor {

      padding: 17px 14px;

    }

    .pv-profile__photo-row {

      gap: 11px;

      padding: 12px;

    }

    .pv-profile__photo {

      width: 58px;

      height: 58px;

    }

    .pv-profile__crop-overlay {

      padding: 12px;

    }

    .pv-profile__crop-header,

    .pv-profile__crop-controls {

      padding-inline: 15px;

    }

    .pv-profile__crop-help {

      margin-inline: 15px;

    }

    .pv-profile__crop-actions {

      padding-inline: 15px;

    }

  }

  @media (prefers-reduced-motion: reduce) {

    .pv-profile *, .pv-profile *::before, .pv-profile *::after {

      animation-duration: .01ms !important;

      animation-iteration-count: 1 !important;

      transition-duration: .01ms !important;

    }

  }

`;

function Profile() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [paternalSurname, setPaternalSurname] = useState("");

  const [maternalSurname, setMaternalSurname] = useState("");

  const fullName = [name, paternalSurname, maternalSurname]

    .map((part) => part.trim())

    .filter(Boolean)

    .join(" ");

  const [profession, setProfession] = useState("");

  const [bio, setBio] = useState("");

  const [profileImageUrl, setProfileImageUrl] = useState("");

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const [profileImagePreview, setProfileImagePreview] = useState("");

  const [selectedImage, setSelectedImage] = useState("");

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [showCropper, setShowCropper] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState<"info" | "error" | "success">("info");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {

    if (!message || messageType !== "success") return;

    const timeoutId = window.setTimeout(() => {

      setMessage("");

      setMessageType("info");

    }, 3000);

    return () => window.clearTimeout(timeoutId);

  }, [message, messageType]);

  useEffect(() => {

    const loadProfile = async () => {

      const token = localStorage.getItem("token");

      if (!token) {

        navigate("/login");

        setLoading(false);

        return;

      }

      try {

        const response = await fetch("https://portavia-api.onrender.com/api/profile", {

          method: "GET",

          headers: { Authorization: `Bearer ${token}` },

        });

        const data = await response.json();

        if (!response.ok) {

          localStorage.removeItem("token");

          localStorage.removeItem("user");

          navigate("/login");

          return;

        }

        const savedFullName = data.user.name || "";
        let restoredNameParts = false;

        if (typeof data.user.given_names === "string" && data.user.given_names.trim()) {
          setName(data.user.given_names);
          setPaternalSurname(data.user.paternal_surname || "");
          setMaternalSurname(data.user.maternal_surname || "");
          restoredNameParts = true;
        }

        if (!restoredNameParts) {
          try {
            const savedPartsRaw = localStorage.getItem(getProfileNamePartsKey());

            if (savedPartsRaw) {
              const savedParts = JSON.parse(savedPartsRaw) as ProfileNameParts;
              const combinedSavedName = [
                savedParts.name,
                savedParts.paternalSurname,
                savedParts.maternalSurname,
              ]
                .map((part) => part?.trim() || "")
                .filter(Boolean)
                .join(" ");

              if (normalizeFullName(combinedSavedName) === normalizeFullName(savedFullName)) {
                setName(savedParts.name || "");
                setPaternalSurname(savedParts.paternalSurname || "");
                setMaternalSurname(savedParts.maternalSurname || "");
                restoredNameParts = true;
              }
            }
          } catch (error) {
            console.error("No se pudieron recuperar los campos del nombre", error);
          }
        }

        if (!restoredNameParts) {
          setName(savedFullName);
          setPaternalSurname("");
          setMaternalSurname("");
        }

        setProfession(data.user.profession || "");

        setBio(data.user.bio || "");

        setProfileImageUrl(data.user.profile_image_url || "");

        setProfileImagePreview(data.user.profile_image_url || "");

      } catch (error) {

        console.error(error);

        setMessage("No se pudo cargar el perfil");

        setMessageType("error");

      } finally {

        setLoading(false);

      }

    };

    loadProfile();

  }, [navigate]);

  useEffect(() => {

    return () => {

      if (selectedImage.startsWith("blob:")) {

        URL.revokeObjectURL(selectedImage);

      }

    };

  }, [selectedImage]);

  useEffect(() => {

    return () => {

      if (profileImagePreview.startsWith("blob:")) {

        URL.revokeObjectURL(profileImagePreview);

      }

    };

  }, [profileImagePreview]);

  const onCropComplete = useCallback(

    (_croppedArea: Area, croppedPixels: Area) => {

      setCroppedAreaPixels(croppedPixels);

    },

    [],

  );

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {

      setMessage("Solo se permiten imágenes JPG, PNG o WEBP");

      setMessageType("error");

      event.target.value = "";

      return;

    }

    if (file.size > 5 * 1024 * 1024) {

      setMessage("La imagen no puede superar los 5 MB");

      setMessageType("error");

      event.target.value = "";

      return;

    }

    setSelectedImage(URL.createObjectURL(file));

    setCrop({ x: 0, y: 0 });

    setZoom(1);

    setShowCropper(true);

    setMessage("");

  };

  const handleApplyCrop = async () => {

    if (!selectedImage || !croppedAreaPixels) return;

    try {

      const croppedFile = await getCroppedImage(

        selectedImage,

        croppedAreaPixels,

      );

      setProfileImageFile(croppedFile);

      setProfileImagePreview(URL.createObjectURL(croppedFile));

      setShowCropper(false);

      setSelectedImage("");

      setMessage("Encuadre aplicado. Guarda los cambios para actualizar tu foto.");

      setMessageType("info");

    } catch (error) {

      console.error(error);

      setMessage("No se pudo recortar la imagen");

      setMessageType("error");

    }

  };

  const handleCancelCrop = () => {

    setShowCropper(false);

    setSelectedImage("");

    setCrop({ x: 0, y: 0 });

    setZoom(1);

    const input = document.getElementById("profileImage") as HTMLInputElement | null;

    if (input) input.value = "";

  };

  const uploadProfileImage = async () => {

    if (!profileImageFile) return profileImageUrl;

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("image", profileImageFile);

    const response = await fetch("https://portavia-api.onrender.com/api/uploads/image", {

      method: "POST",

      headers: { Authorization: `Bearer ${token}` },

      body: formData,

    });

    const data = await response.json();

    if (!response.ok) {

      throw new Error(data.message || "No se pudo subir la imagen");

    }

    return data.imageUrl;

  };

  const handleRemoveImage = () => {

    setProfileImageFile(null);

    setProfileImageUrl("");

    setProfileImagePreview("");

    const input = document.getElementById("profileImage") as HTMLInputElement | null;

    if (input) input.value = "";

  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    setSaving(true);

    setMessage(profileImageFile ? "Subiendo imagen..." : "Guardando...");

    setMessageType("info");

    try {

      const uploadedImageUrl = await uploadProfileImage();

      const response = await fetch("https://portavia-api.onrender.com/api/profile", {

        method: "PUT",

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,

        },

        body: JSON.stringify({

          name: fullName,
          givenNames: name.trim(),
          paternalSurname: paternalSurname.trim(),
          maternalSurname: maternalSurname.trim(),

          profession,

          bio,

          profileImageUrl: uploadedImageUrl,

        }),

      });

      const data = await response.json();

      if (!response.ok) {

        setMessage(data.message || "Ocurrió un error");

        setMessageType("error");

        return;

      }

      const savedFullName = data.user.name || fullName;

      try {
        localStorage.setItem(
          getProfileNamePartsKey(),
          JSON.stringify({
            name: name.trim(),
            paternalSurname: paternalSurname.trim(),
            maternalSurname: maternalSurname.trim(),
          }),
        );
      } catch (error) {
        console.error("No se pudieron guardar los campos del nombre", error);
      }

      const savedImageUrl = data.user.profile_image_url || "";

      setProfileImageUrl(savedImageUrl);

      setProfileImagePreview(savedImageUrl);

      setProfileImageFile(null);

      const storedUser = localStorage.getItem("user");

      if (storedUser) {

        try {

          const currentUser = JSON.parse(storedUser);

          localStorage.setItem(

            "user",

            JSON.stringify({

              ...currentUser,

              name: savedFullName,

              profile_image_url: data.user.profile_image_url,

            }),

          );

        } catch (error) {

          console.error(error);

        }

      }

      setMessage("Perfil actualizado correctamente");

      setMessageType("success");

    } catch (error) {

      console.error(error);

      setMessage(

        error instanceof Error

          ? error.message

          : "No se pudo conectar con el servidor",

      );

      setMessageType("error");

    } finally {

      setSaving(false);

    }

  };

  const initials = fullName.charAt(0).toUpperCase() || "P";

  if (loading) {

    return (

      <main className="pv-profile">

        <style>{profileStyles}</style>

        <div className="pv-profile__loading" role="status">

          Cargando tu perfil...

        </div>

      </main>

    );

  }

  return (

    <main className="pv-profile">

      <style>{profileStyles}</style>

      <div className="pv-profile__shell">

        <header className="pv-profile__header">

          <a href="/" className="pv-profile__brand">

            <span className="pv-profile__brand-mark" aria-hidden="true">p</span>

            <span className="pv-profile__brand-name">Portavia</span>

          </a>

          <button

            type="button"

            className="pv-profile__back"

            onClick={() => navigate("/dashboard")}

          >

            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">

              <path

                d="M19 12H5m6 6-6-6 6-6"

                stroke="currentColor"

                strokeWidth="1.8"

                strokeLinecap="round"

                strokeLinejoin="round"

              />

            </svg>

            Volver al dashboard

          </button>

        </header>

        <section className="pv-profile__heading">

          <p className="pv-profile__eyebrow">Tu presencia profesional</p>

          <h1>Mi perfil</h1>

          <p>

            Cuida los detalles de tu presentación. Estos datos ayudan a que tu

            portafolio cuente mejor quién eres y qué haces.

          </p>

        </section>

        <div className="pv-profile__layout">

          <section className="pv-profile__editor">

            <h2 className="pv-profile__section-title">Información personal</h2>

            <p className="pv-profile__section-copy">

              Actualiza tu foto, tu título profesional y una breve biografía.

            </p>

            <form onSubmit={handleSubmit} className="pv-profile__form">

              <div className="pv-profile__photo-row">

                <div className="pv-profile__photo">

                  {profileImagePreview ? (

                    <img src={profileImagePreview} alt={`Foto de ${fullName || "tu perfil"}`} />

                  ) : (

                    initials

                  )}

                </div>

                <div className="pv-profile__photo-copy">

                  <strong>Foto de perfil</strong>

                  <p>JPG, PNG o WEBP. Tamaño máximo: 5 MB.</p>

                  <label htmlFor="profileImage" className="pv-profile__file-label">

                    Elegir imagen

                  </label>

                  <input

                    id="profileImage"

                    className="pv-profile__file-input"

                    type="file"

                    accept="image/jpeg,image/png,image/webp"

                    onChange={handleImageChange}

                  />

                  {profileImagePreview && (

                    <button

                      type="button"

                      className="pv-profile__remove-photo"

                      onClick={handleRemoveImage}

                    >

                      Quitar foto

                    </button>

                  )}

                </div>

              </div>

              <div className="pv-profile__field">

                <label htmlFor="name">Nombre(s)</label>

                <input

                  id="name"

                  type="text"

                  autoComplete="given-name"

                  value={name}

                  onChange={(event) => setName(event.target.value)}

                  placeholder="Ej. Luis Alberto"

                  required

                />
</div>

              <div className="pv-profile__field">

                <label htmlFor="paternalSurname">Apellido paterno</label>

                <input

                  id="paternalSurname"

                  type="text"

                  autoComplete="family-name"

                  value={paternalSurname}

                  onChange={(event) => setPaternalSurname(event.target.value)}

                  placeholder="Tu apellido paterno"

                />

              </div>

              <div className="pv-profile__field">

                <label htmlFor="maternalSurname">Apellido materno (opcional)</label>

                <input

                  id="maternalSurname"

                  type="text"

                  value={maternalSurname}

                  onChange={(event) => setMaternalSurname(event.target.value)}

                  placeholder="Tu apellido materno"

                />

                <small className="pv-profile__field-help">

                  Si solo tienes un apellido, completa únicamente el campo que corresponda.

                </small>

              </div>

              <div className="pv-profile__field">

                <label htmlFor="profession">Título profesional</label>

                <input

                  id="profession"

                  type="text"

                  value={profession}

                  onChange={(event) => setProfession(event.target.value)}

                  placeholder="Ej. Desarrollador de software"

                />

              </div>

              <div className="pv-profile__field">

                <label htmlFor="bio">Biografía</label>

                <textarea

                  id="bio"

                  value={bio}

                  onChange={(event) => setBio(event.target.value)}

                  placeholder="Cuéntales quién eres, qué haces y qué te interesa..."

                  rows={5}

                />

              </div>

              {message && (

                <p

                  className={`pv-profile__message pv-profile__message--${messageType}`}

                  role="status"

                >

                  {message}

                </p>

              )}

              <button

                type="submit"

                className="pv-profile__save"

                disabled={saving}

              >

                {saving ? "Guardando..." : "Guardar cambios"}

              </button>

            </form>

          </section>

          <aside className="pv-profile__preview" aria-label="Vista previa de perfil">

            <div className="pv-profile__preview-cover" />

            <div className="pv-profile__preview-body">

              <div className="pv-profile__preview-avatar">

                {profileImagePreview ? (

                  <img src={profileImagePreview} alt="" />

                ) : (

                  initials

                )}

              </div>

              <h2>{fullName || "Tu nombre"}</h2>

              <p className="pv-profile__profession">

                {profession || "Tu título profesional"}

              </p>

              <p className="pv-profile__preview-bio">

                {bio || "Aquí aparecerá una breve presentación sobre ti."}

              </p>

              <span className="pv-profile__preview-label">

                VISTA PREVIA DE TU PERFIL

              </span>

            </div>

          </aside>

        </div>

      </div>

      {showCropper && (

        <div className="pv-profile__crop-overlay">

          <section

            className="pv-profile__crop-dialog"

            role="dialog"

            aria-modal="true"

            aria-labelledby="crop-title"

          >

            <header className="pv-profile__crop-header">

              <div>

                <p>FOTO DE PERFIL</p>

                <h2 id="crop-title">Ajusta tu foto</h2>

              </div>

              <button

                type="button"

                className="pv-profile__crop-close"

                onClick={handleCancelCrop}

                aria-label="Cerrar recorte"

              >

                ×

              </button>

            </header>

            <div className="pv-profile__crop-area">

              <Cropper

                image={selectedImage}

                crop={crop}

                zoom={zoom}

                aspect={1}

                cropShape="round"

                showGrid={false}

                onCropChange={setCrop}

                onCropComplete={onCropComplete}

                onZoomChange={setZoom}

              />

            </div>

            <div className="pv-profile__crop-controls">

              <label htmlFor="cropZoom">Zoom</label>

              <input

                id="cropZoom"

                type="range"

                min={1}

                max={3}

                step={0.01}

                value={zoom}

                onChange={(event) => setZoom(Number(event.target.value))}

              />

            </div>

            <p className="pv-profile__crop-help">

              Arrastra la imagen para elegir qué parte aparecerá en tu perfil.

            </p>

            <div className="pv-profile__crop-actions">

              <button

                type="button"

                className="pv-profile__crop-cancel"

                onClick={handleCancelCrop}

              >

                Cancelar

              </button>

              <button

                type="button"

                className="pv-profile__crop-apply"

                onClick={handleApplyCrop}

              >

                Aplicar recorte

              </button>

            </div>

          </section>

        </div>

      )}

    </main>

  );

}

export default Profile;