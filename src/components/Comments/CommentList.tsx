import useGetComments from "../../hooks/queries/useGetComments";
import usePatchComment from "../../hooks/mutation/usePatchComment";
import useDeleteComment from "../../hooks/mutation/useDeleteComment";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

const CommentList = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);
  const { data: comments, isLoading } = useGetComments(Number(lpId));
  const { mutate: patchMutate } = usePatchComment(Number(lpId));
  const { mutate: deleteMutate } = useDeleteComment(Number(lpId));

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  if (isLoading) return <p>댓글 로딩 중...</p>;

  return (
    <div className="comment-list">
      {comments?.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="comment-left">
            {comment.author.avatar ? (
              <img
                src={comment.author.avatar}
                alt="프로필 이미지"
                className="comment-avatar"
              />
            ) : (
              <div className="comment-avatar placeholder" />
            )}
          </div>

          <div className="comment-right">
            <p className="comment-author">{comment.author.name}</p>

            {editingId === comment.id ? (
              <>
                <textarea
                  className="comment-edit-textarea"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="comment-buttons">
                  <button
                    className="comment-button cancel"
                    onClick={() => {
                      setEditingId(null);
                      setEditContent("");
                    }}
                  >
                    취소
                  </button>
                  <button
                    className="comment-button save"
                    onClick={() => {
                      patchMutate({
                        commentId: comment.id,
                        content: editContent,
                      });
                      setEditingId(null);
                    }}
                  >
                    저장
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="comment-content">{comment.content}</p>
                {me?.data.id === comment.author.id && (
                  <div className="comment-actions">
                    <button
                      className="comment-action"
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditContent(comment.content);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="comment-action"
                      onClick={() => {
                        if (confirm("댓글을 삭제하시겠습니까?")) {
                          deleteMutate({ commentId: comment.id });
                        }
                      }}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
