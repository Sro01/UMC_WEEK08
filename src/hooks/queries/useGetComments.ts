import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { Comment } from "../../types/comment"; // 경로는 프로젝트에 따라 조정

export const getComments = async ({
  lpId,
  cursor = 0,
  limit = 10,
  order = "asc",
}: {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: "asc" | "desc";
}) => {
  const res = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });
  return res.data;
};

export default function useGetComments(lpId: number) {
  return useQuery<Comment[]>({
    queryKey: ["lpComments", lpId],
    queryFn: () => getComments({ lpId }).then((res) => res.data.data),
  });
}
