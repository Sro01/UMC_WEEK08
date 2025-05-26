import { PAGINATION_ORDER } from "../enums/common";

// Menu 컴포넌트가 받을 props 타입 정의
interface MenuProps {
  search: string;
  setSearch: (search: string) => void;
  order: PAGINATION_ORDER;
  handleOrderChange: (newOrder: PAGINATION_ORDER) => void;
}

const Menu: React.FC<MenuProps> = ({
  search,
  setSearch,
  order,
  handleOrderChange,
}) => {
  return (
    <div className="menu-container">
      <span className="material-symbols-outlined">search</span>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="search-input"
      />
      <div className="sort-controls" style={{ margin: "10px 0" }}>
        <button
          onClick={() => handleOrderChange(PAGINATION_ORDER.desc)}
          style={{
            fontWeight: order === PAGINATION_ORDER.desc ? "bold" : "normal",
            marginRight: "5px",
          }}
          className="hover:cursor-pointer"
        >
          최신 순
        </button>
        <button
          onClick={() => handleOrderChange(PAGINATION_ORDER.asc)}
          style={{
            fontWeight: order === PAGINATION_ORDER.asc ? "bold" : "normal",
          }}
          className="hover:cursor-pointer"
        >
          오래된 순
        </button>
      </div>
    </div>
  );
};

export default Menu;
