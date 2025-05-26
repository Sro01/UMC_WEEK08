import { useState } from "react";
import { useParams } from "react-router-dom";
import usePostComment from "../../hooks/mutation/usePostComment";

const CommentForm = () => {
  const { lpId } = useParams();
  const [content, setContent] = useState("");
  const { mutate, isPending } = usePostComment(Number(lpId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    mutate(
      { content },
      {
        onSuccess: () => {
          setContent(""); // 작성 후 초기화
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "작성 중..." : "작성"}
      </button>
    </form>
  );
};

export default CommentForm;
