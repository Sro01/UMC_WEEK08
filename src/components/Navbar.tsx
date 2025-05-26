import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import { ResponseMyInfoDto } from "../types/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { accessToken } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<ResponseMyInfoDto["data"] | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();
      // console.log(response);

      setData(response.data);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // console.log(data);

  return (
    <nav>
      <Link to={"/"} className="nav-text middle-text">
        <img
          src="/images/logoUpdate-1_540x.avif"
          alt="LP"
          className="h-10 m-4"
        />
      </Link>
      <div className="space-x-6">
        {!accessToken && (
          <>
            <Link to={"/login"} className="hover:text-[#abcbe1]">
              LOGIN
            </Link>
            <Link to={"/signup"} className="hover:text-[#abcbe1]">
              SIGN UP
            </Link>
          </>
        )}
        {accessToken && (
          <>
            <span style={{ marginRight: "20px" }}>
              {data?.name ? `${data.name}님 환영합니다.` : "환영합니다."}
            </span>
            <Link to={"/my"} className="hover:text-[#abcbe1]">
              MY
            </Link>
            <button className="hover:text-[#abcbe1]" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
