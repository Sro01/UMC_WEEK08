import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

const postComment = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}) => {
  const res = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
  return res.data;
};

export default function usePostComment(lpId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { content: string }) => postComment({ lpId, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
  });
}
