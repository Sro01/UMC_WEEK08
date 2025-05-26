import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";
import { RequestLpDetailDto, ResponseLpDetailDto } from "../../types/lp";

function useGetLpDetail({ lpId }: RequestLpDetailDto) {
  console.log("lpId", lpId);
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({ lpId }),
    enabled: !!lpId,
  });
}

export default useGetLpDetail;
