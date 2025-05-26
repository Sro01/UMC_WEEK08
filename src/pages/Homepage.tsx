import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import Menu from "../components/Menu";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCreateModal from "../components/LpCreateModal.tsx";
import useDebounce from "../hooks/useDebounce.ts";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay.ts";
import useThrottle from "../hooks/useThrottle.ts";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const deboncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(50, deboncedValue, order);

  /**
   * ref: 특정한 HTML 요소를 감시
   * inView: 그 요소가 화면에 보이면 true
   */
  const { ref, inView } = useInView({
    threshold: 0, // 화면에 노출되는 정보 (Etnry point 조절)
  });

  const throttledInView = useThrottle(inView, 500); // 500ms 딜레이로 inView 값을 스로틀링

  useEffect(() => {
    if (throttledInView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [throttledInView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <h1>Error!</h1>;
  }

  // 정렬 순서 변경 핸들러
  const handleOrderChange = (newOrder: PAGINATION_ORDER) => {
    setOrder(newOrder);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="page">
      <Menu
        search={search}
        setSearch={setSearch}
        order={order}
        handleOrderChange={handleOrderChange}
      />

      <div className="flex justify-end mb-5">
        <button
          className="hover:cursor-pointer add-lp-button"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add LP
        </button>
      </div>

      {isModalOpen && (
        <LpCreateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="grid-container">
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat() // [[1, 2], [3, 4]].flat() => [1, 2, 3, 4]
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref}></div>
    </div>
  );
};

export default Homepage;
