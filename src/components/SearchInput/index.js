import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { useQueryParameter, useReplaceQueryParameter, } from "./useQueryParameters";
import { searchInputParamName } from "../SearchInput/searchInputParamName";
import { Input } from "./styled";
import { setMoviesQuery, setPeopleQuery } from "../../features/pageState/pageStateSlice";

export const SearchInput = () => {
  const location = useLocation();
  const query = useQueryParameter(searchInputParamName);
  const searchOf = location.pathname.split("/")[1];
  const replaceQueryParameter = useReplaceQueryParameter();
  const dispatch = useDispatch();

  const onInputChange = ({ target }) => {
    const searchQuery = target.value;

    replaceQueryParameter({
      key: "search",
      value: searchQuery.trim() !== "" ? searchQuery : "",
    });

    if (searchOf === "movies") {
      dispatch(setMoviesQuery(searchQuery.trim()));
    } else if (searchOf === "peo") {
      dispatch(setPeopleQuery(searchQuery.trim()));
    }
  };

  return (
    <Input
      type="text"
      placeholder={`Search for ${searchOf}...`}
      value={query || ""}
      onChange={(event) => onInputChange(event)}
    />
  );
};