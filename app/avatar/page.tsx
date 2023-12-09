"use client";

import { useRef, useState } from "react";
import { GoPencil } from "react-icons/go";

export default function Page() {
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState(
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  );
  const imageInput = useRef<HTMLInputElement>(null);

  const uploadImage = async () => {
    if (image) {
      let formData = new FormData();

      formData.set("userProfile", image);

      await fetch(`/api/user/profile`, {
        method: "POST",
        body: formData,
      });
    }
  };

  return (
    <div className="flex px-3 m-6 gap-4">
      <input
        type="file"
        name="image"
        id="image"
        onChange={(e) => {
          const file = e.target.files;
          if (file && file.length) {
            setImage(e.target.files?.[0]);
            setImageUrl(URL.createObjectURL(file[0]));
          }
        }}
        accept="image/png, image/jpeg"
        className="hidden"
        ref={imageInput}
      />
      <div className="avatar relative ">
        <div className="w-24 rounded-full">
          <img src={imageUrl} />
        </div>
        <button
          onClick={() => imageInput.current?.click()}
          className="p-2 rounded-full bg-neutral-100 absolute right-0 bottom-0 text-neutral-900"
        >
          <GoPencil />
        </button>
      </div>
      <button className="btn btn-active" onClick={uploadImage}>
        Upload
      </button>
    </div>
  );
}

// Server side code

export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const data = await request.formData();
  const file: File | null = data.get("userProfile") as unknown as File;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
}
