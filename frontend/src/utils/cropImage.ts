export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function getCroppedImage(
  imageSrc: string,
  pixelCrop: Area
): Promise<File> {
  const image = await createImage(imageSrc);

  const canvas =
    document.createElement("canvas");

  const context =
    canvas.getContext("2d");

  if (!context) {
    throw new Error(
      "No se pudo procesar la imagen"
    );
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  context.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "No se pudo recortar la imagen"
              )
            );

            return;
          }

          const file = new File(
            [blob],
            `perfil-${Date.now()}.jpg`,
            {
              type: "image/jpeg",
            }
          );

          resolve(file);
        },
        "image/jpeg",
        0.9
      );
    }
  );
}

function createImage(
  url: string
): Promise<HTMLImageElement> {
  return new Promise(
    (resolve, reject) => {
      const image =
        new Image();

      image.addEventListener(
        "load",
        () => resolve(image)
      );

      image.addEventListener(
        "error",
        (error) =>
          reject(error)
      );

      image.src = url;
    }
  );
}