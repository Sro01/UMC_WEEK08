import { useRef, useState } from "react";
import { X } from "lucide-react";
import usePostLp from "../hooks/mutation/usePostLp";
import { postImage } from "../apis/lp";
import { useAuth } from "../context/AuthContext";

interface LpCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LpCreateModal: React.FC<LpCreateModalProps> = ({ isOpen, onClose }) => {
  const { accessToken } = useAuth();
  const [thumbnailPreview, setThumbnailPreview] = useState(
    "/images/me-again-cover.jpeg"
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click(); // 이미지 클릭 시 파일 입력창 열기
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setThumbnailPreview(newImageUrl);
      setThumbnailFile(file); // 파일 저장
    }
  };

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, isPending } = usePostLp();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let uploadedUrl = "";

      if (thumbnailFile) {
        uploadedUrl = await postImage(thumbnailFile, accessToken ?? undefined);
      } else {
        uploadedUrl = "/images/me-again-cover.jpeg";
      }

      mutate(
        {
          title,
          content,
          thumbnail: uploadedUrl, // 업로드된 URL을 thumbnail로
          tags,
          published: true,
        },
        {
          onSuccess: () => {
            alert("LP 등록 성공");
            setTitle("");
            setContent("");
            setThumbnailFile(null);
            setThumbnailPreview("/images/me-again-cover.jpeg");
            setTags([]);
            onClose();
          },
          onError: (error) => {
            alert("LP 등록 실패");
            console.error("LP 등록 실패", error);
          },
        }
      );
    } catch (error) {
      console.error("이미지 업로드 실패", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <div className="flex justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => onClose()}
            className="hover:cursor-pointer"
          >
            <X />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 modal-form"
        >
          {/* 이미지 업로드 */}
          <div
            className="modal-img hover:cursor-pointer"
            onClick={handleImageClick}
          >
            <img src={thumbnailPreview} />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          {/* 입력 */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="LP Name"
            required
            className="modal-input"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="LP Content"
            required
            className="modal-input"
          />

          {/* 태그 입력 */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Tag"
              value={tagInput}
              className="modal-input"
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              className="text-[#444] bg-gray-300 py-2 px-4 rounded hover:cursor-pointer font-semibold"
              onClick={handleAddTag}
            >
              +
            </button>
          </div>

          {/* 태그 라벨 */}
          <div className="flex flex-wrap gap-2 w-full">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 px-3 py-1 rounded-full flex justify-between items-center gap-1 text-sm w-fit max-w-[100%]"
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
                  {tag}
                </span>
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              disabled={isPending}
              className="add-button hover:cursor-pointer"
            >
              {isPending ? "등록 중..." : "Add LP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LpCreateModal;
