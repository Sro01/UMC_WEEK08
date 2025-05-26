import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),

    /**
     * 이 시간동안은 캐시된 데이터를 그대로 사용
     * 컴포넌트가 마운트 되거나 창에 포커스가 들어오는 경우도 재요청X
     */
    staleTime: 1000 * 60 * 5, // 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄임

    /**
     * 사용되지 않는 (비활성화 상태)인 쿼리 데이터가 캐시에 남아있는 시간
     * staleTime이 지나고 데이터가 신선하지 않더라도, 일정시간 동안 메모리에 보관
     * 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거 (garbage collection)
     */
    gcTime: 1000 * 60 * 10, // 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청 시 데이터를 받아옴

    /**
     * 조건에 따라 쿼리 실행 여부를 제어
     */
    // enabled: Boolean(search),

    /**
     * 데이터를 주기적으로 업데이트
     */
    // refetchInterval: 100 * 60, // 10초마다 업데이트

    /**
     * retry: 쿼리 요청이 실패했을 때 자동으로 재시도 할 횟수를 지정
     * 기본값은 3회 정도, 네트워크 오류 등 임시적인 문제를 보완 가능
     * retry는 App.tsx에서 new QueryClient()할 때 defaultOptions 인자로 넘겨줄 수 있음
     */
    // retry: 3

    /**
     * initialData: 쿼리 설정 전 미리 제공할 초기 데이터를 설정
     * 컴포넌트가 렌더링 될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성할 수 있게 해줌
     */

    select: (data) => data.data.data,
  });
}

export default useGetLpList;
