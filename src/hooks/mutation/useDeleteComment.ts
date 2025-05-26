import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

const deleteComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}) => {
  const res = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return res.data;
};

export default function useDeleteComment(lpId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteComment({ lpId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
  });
}
