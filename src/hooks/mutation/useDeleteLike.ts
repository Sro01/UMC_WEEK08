import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    onSuccess: (data) => {
      // 요청에 대한 응답이 이 data 안으로 들어옴
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true, // 기본값은 false => 앞부분(QUERY_KEY.lps)만 일치해도 쿼리를 요청해줌
      });
    },
  });
}

export default useDeleteLike;
