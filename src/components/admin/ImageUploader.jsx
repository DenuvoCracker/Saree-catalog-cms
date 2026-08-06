import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";
import { uploadProductImages } from "../../services/storageService.js";

// Handles selecting + uploading multiple images and reports uploaded URLs back to the parent form
export default function ImageUploader({ images, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(e) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls = await uploadProductImages(files);
      onChange([...images, ...urls]);
      toast.success(`${urls.length} image(s) uploaded`);
    } catch (err) {
      toast.error("Image upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeImage(url) {
    onChange(images.filter((img) => img !== url));
  }

  return (
    <div>
      <label className="block text-sm font-body mb-1.5">Product Images</label>
      <div className="flex flex-wrap gap-3 mb-3">
        {images.map((url) => (
          <div key={url} className="relative w-20 h-20 rounded-sm overflow-hidden border border-gold/30">
            <img src={url} alt="Product" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(url)}
              aria-label="Remove image"
              className="absolute top-0.5 right-0.5 bg-ink/70 text-white rounded-full p-0.5 hover:bg-red-600"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-20 h-20 rounded-sm border-2 border-dashed border-gold/40 flex flex-col items-center justify-center text-maroon/50
          hover:border-gold hover:text-maroon transition-colors disabled:opacity-50"
        >
          <UploadCloud size={20} />
          <span className="text-[10px] mt-1">{uploading ? "Uploading…" : "Add"}</span>
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />
    </div>
  );
}
