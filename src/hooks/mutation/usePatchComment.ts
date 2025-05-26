import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

interface PatchCommentParams {
  lpId: number;
  commentId: number;
  content: string;
}

const patchComment = async ({
  lpId,
  commentId,
  content,
}: PatchCommentParams) => {
  const response = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return response.data;
};

export default function usePatchComment(lpId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => patchComment({ lpId, commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
    },
  });
}
