// import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { LpDetail } from "../../types/lp";

interface LpCardProps {
  lp: LpDetail;
}
const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const handleCardClick = (lpId: number) => {
    navigate(`/lp/${lpId}`); // /lp/:lpId 경로로 이동
  };

  const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div
      className="card"
      onClick={() => handleCardClick(lp.id)}
      style={{ cursor: "pointer" }}
    >
      <img src={lp.thumbnail} alt={lp.title} className="thumbnail" />
      <div className="card-overlay">
        <div className="card-info">
          <h3 className="card-title">{lp.title}</h3>
          <p className="card-date">{formatDate(lp.createdAt)}</p>
          <p className="card-likes">
            <FaHeart style={{ marginRight: "4px", color: "white" }} />
            {lp.likes?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
