import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail.ts";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import { useAuth } from "../context/AuthContext.tsx";
import usePostLike from "../hooks/mutation/usePostLike.ts";
import useDeleteLike from "../hooks/mutation/useDeleteLike.ts";
import CommentList from "../components/Comments/CommentList.tsx";
import CommentForm from "../components/Comments/CommentForm.tsx";
// import usePatchLp from "../hooks/mutation/usePatchLp";
// import useDeleteLp from "../hooks/mutation/useDeleteLp";
// import { useNavigate } from "react-router-dom";

const LpDetailPage = () => {
  const { lpId } = useParams(); // URL 파라미터에서 lpId 추출
  const { accessToken } = useAuth();

  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });
  console.log("data", lp);

  const isLiked = lp?.data?.likes
    .map((like) => like.userId)
    .includes(me?.data.id as number);

  const handleLike = () => {
    console.log("좋아요 누름");
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislike = () => {
    console.log("좋아요 취소");
    dislikeMutate({ lpId: Number(lpId) });
  };

  if (isPending) {
    return <div className="page">Loading...</div>;
  }

  if (isError || !lp) {
    return <div className="page">Error!</div>;
  }

  // const navigate = useNavigate();
  // const { mutate: patchMutate } = usePatchLp();
  // const { mutate: deleteMutate } = useDeleteLp();

  return (
    <div className="lp-detail-page">
      <div className="flex flex-col items-center justify-normal">
        <div className="author-info flex items-center gap-2">
          {lp.data.author.avatar ? (
            <img
              src={lp.data.author.avatar}
              alt="프로필 이미지"
              className="author-avatar"
            />
          ) : (
            <div className="author-avatar placeholder" />
          )}
          <p className="font-semibold">{lp.data.author.name}</p>
        </div>

        <h1 className="lp-title">{lp.data.title}</h1>
        <div className="lp-wrapper">
          <div
            className="lp-disc"
            style={{ backgroundImage: `url(${lp.data.thumbnail})` }}
          >
            <div className="lp-center-label"></div>
          </div>
        </div>
        <p>{lp.data.content}</p>

        <div
          className="like-box hover:cursor-pointer"
          onClick={isLiked ? handleDislike : handleLike}
        >
          <button className="mt-3">
            <Heart
              color={isLiked ? "red" : "black"}
              fill={isLiked ? "red" : "transparent"}
            />
          </button>
          <p className="like-count">{lp.data.likes?.length || 0}</p>
        </div>
      </div>

      <CommentForm />
      <CommentList />
    </div>
  );
};

export default LpDetailPage;
