import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import {
  getCroppedImage,
} from "../utils/cropImage";
import "../App.css";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [profession, setProfession] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [profileImageUrl, setProfileImageUrl] =
    useState("");

  const [profileImageFile, setProfileImageFile] =
    useState<File | null>(null);

  const [profileImagePreview, setProfileImagePreview] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState("");

  const [crop, setCrop] =
    useState({
      x: 0,
      y: 0,
    });

  const [zoom, setZoom] =
    useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<Area | null>(null);

  const [showCropper, setShowCropper] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/profile",
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          localStorage.removeItem(
            "token"
          );

          localStorage.removeItem(
            "user"
          );

          navigate("/login");

          return;
        }

        setName(
          data.user.name || ""
        );

        setProfession(
          data.user.profession || ""
        );

        setBio(
          data.user.bio || ""
        );

        setProfileImageUrl(
          data.user.profile_image_url || ""
        );

        setProfileImagePreview(
          data.user.profile_image_url || ""
        );
      } catch (error) {
        console.error(error);

        setMessage(
          "No se pudo cargar el perfil"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const onCropComplete = useCallback(
    (
      _croppedArea: Area,
      croppedAreaPixels: Area
    ) => {
      setCroppedAreaPixels(
        croppedAreaPixels
      );
    },
    []
  );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(file.type)
    ) {
      setMessage(
        "Solo se permiten imágenes JPG, PNG o WEBP"
      );

      e.target.value = "";

      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setMessage(
        "La imagen no puede superar los 5 MB"
      );

      e.target.value = "";

      return;
    }

    const objectUrl =
      URL.createObjectURL(file);

    setSelectedImage(
      objectUrl
    );

    setCrop({
      x: 0,
      y: 0,
    });

    setZoom(1);

    setShowCropper(
      true
    );

    setMessage("");
  };

  const handleApplyCrop =
    async () => {
      if (
        !selectedImage ||
        !croppedAreaPixels
      ) {
        return;
      }

      try {
        const croppedFile =
          await getCroppedImage(
            selectedImage,
            croppedAreaPixels
          );

        setProfileImageFile(
          croppedFile
        );

        const previewUrl =
          URL.createObjectURL(
            croppedFile
          );

        setProfileImagePreview(
          previewUrl
        );

        setShowCropper(
          false
        );

        setSelectedImage(
          ""
        );

        setMessage(
          "Encuadre aplicado. Guarda los cambios para actualizar tu foto."
        );
      } catch (error) {
        console.error(error);

        setMessage(
          "No se pudo recortar la imagen"
        );
      }
    };

  const handleCancelCrop = () => {
    setShowCropper(
      false
    );

    setSelectedImage(
      ""
    );

    setCrop({
      x: 0,
      y: 0,
    });

    setZoom(1);

    const input =
      document.getElementById(
        "profileImage"
      ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  };

  const uploadProfileImage =
    async () => {
      if (!profileImageFile) {
        return profileImageUrl;
      }

      const token =
        localStorage.getItem(
          "token"
        );

      const formData =
        new FormData();

      formData.append(
        "image",
        profileImageFile
      );

      const response = await fetch(
        "http://localhost:3000/api/uploads/image",
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "No se pudo subir la imagen"
        );
      }

      return data.imageUrl;
    };

  const handleRemoveImage = () => {
    setProfileImageFile(
      null
    );

    setProfileImageUrl(
      ""
    );

    setProfileImagePreview(
      ""
    );

    const input =
      document.getElementById(
        "profileImage"
      ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSaving(true);

    try {
      setMessage(
        profileImageFile
          ? "Subiendo imagen..."
          : "Guardando..."
      );

      const uploadedImageUrl =
        await uploadProfileImage();

      const response = await fetch(
        "http://localhost:3000/api/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${localStorage.getItem(
                "token"
              )}`,
          },

          body: JSON.stringify({
            name,
            profession,
            bio,
            profileImageUrl:
              uploadedImageUrl,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Ocurrió un error"
        );

        return;
      }

      setProfileImageUrl(
        data.user.profile_image_url || ""
      );

      setProfileImagePreview(
        data.user.profile_image_url || ""
      );

      setProfileImageFile(
        null
      );

      const storedUser =
        localStorage.getItem(
          "user"
        );

      if (storedUser) {
        const currentUser =
          JSON.parse(storedUser);

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...currentUser,
            name:
              data.user.name,
            profile_image_url:
              data.user.profile_image_url,
          })
        );
      }

      setMessage(
        "Perfil actualizado correctamente"
      );
    } catch (error) {
      console.error(error);

      if (
        error instanceof Error
      ) {
        setMessage(
          error.message
        );
      } else {
        setMessage(
          "No se pudo conectar con el servidor"
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-card">
          <p>
            Cargando perfil...
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <p>
            Portafolio
          </p>

          <h1>
            Mi perfil
          </h1>
        </div>

        <button
          className="secondary-button"
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
        >
          Volver al Dashboard
        </button>
      </div>

      <div className="profile-card">
        <form
          onSubmit={
            handleSubmit
          }
        >
          <label htmlFor="profileImage">
            Foto de perfil
          </label>

          <input
            id="profileImage"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={
              handleImageChange
            }
          />

          <p className="profile-image-help">
            Formatos permitidos:
            JPG, PNG y WEBP.
            Máximo 5 MB.
          </p>

          {profileImagePreview && (
            <div className="profile-image-preview">
              <img
                src={
                  profileImagePreview
                }
                alt="Foto de perfil"
              />

              <button
                type="button"
                className="secondary-button"
                onClick={
                  handleRemoveImage
                }
              >
                Quitar foto
              </button>
            </div>
          )}

          <label htmlFor="name">
            Nombre
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            required
          />

          <label htmlFor="profession">
            Título profesional
          </label>

          <input
            id="profession"
            type="text"
            placeholder="Ej. Desarrollador de Software"
            value={
              profession
            }
            onChange={(e) =>
              setProfession(
                e.target.value
              )
            }
          />

          <label htmlFor="bio">
            Biografía
          </label>

          <textarea
            id="bio"
            placeholder="Cuéntanos un poco sobre ti..."
            value={bio}
            onChange={(e) =>
              setBio(
                e.target.value
              )
            }
            rows={6}
          />

          <button
            type="submit"
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? "Guardando..."
              : "Guardar cambios"}
          </button>

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}
        </form>
      </div>

      {showCropper && (
        <div className="crop-modal">
          <div className="crop-modal-content">
            <div className="crop-modal-header">
              <div>
                <p className="crop-label">
                  Foto de perfil
                </p>

                <h2>
                  Ajusta tu foto
                </h2>
              </div>

              <button
                type="button"
                className="crop-close-button"
                onClick={
                  handleCancelCrop
                }
              >
                ×
              </button>
            </div>

            <div className="crop-container">
              <Cropper
                image={
                  selectedImage
                }
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={
                  setCrop
                }
                onCropComplete={
                  onCropComplete
                }
                onZoomChange={
                  setZoom
                }
              />
            </div>

            <div className="crop-controls">
              <label htmlFor="cropZoom">
                Zoom
              </label>

              <input
                id="cropZoom"
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) =>
                  setZoom(
                    Number(
                      e.target.value
                    )
                  )
                }
              />
            </div>

            <p className="crop-help">
              Arrastra la imagen para
              elegir qué parte aparecerá
              en tu foto de perfil.
            </p>

            <div className="crop-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={
                  handleCancelCrop
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={
                  handleApplyCrop
                }
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;