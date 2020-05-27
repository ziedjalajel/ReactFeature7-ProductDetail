import React from "react";

// Components
import CookieItem from "./CookieItem";
import SearchBar from "./SearchBar";

// Styling
import { ListWrapper } from "../styles";

const CookieList = (props) => {
  const [query, setQuery] = useState("");
  const [_cookies, setCookies] = useState(cookies);

  const cookieList = _cookies
    .filter((cookie) => cookie.name.includes(query))
    .map((cookie) => (
      <CookieItem cookie={cookie} setCookie={props.setCookie} key={cookie.id} />
    ));

  return (
    <>
      <SearchBar setQuery={setQuery} />
      <ListWrapper>{cookieList}</ListWrapper>
    </>
  );
};

export default CookieList;
