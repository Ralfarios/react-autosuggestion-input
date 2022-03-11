import { useCallback, useState } from "react";
import { debounce } from "lodash";

import { CInputSearch } from "../../components";

import "./style.css";

function SearchPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");
  const [detailData, setDetailData] = useState(null);

  const fetchData = debounce(async (monster = "") => {
    try {
      if (!monster) {
        setData([]);
      }

      if (monster) {
        const response = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${monster}&num=3&offset=0`
        );

        if (response.ok) {
          const { data: res } = await response.json();

          return setData(res);
        }

        throw response;
      }
      return;
    } catch {
      setData([]);
      setError("notFound");
    }
  }, 1000);

  const handleSearch = useCallback(function ({ target }) {
    setError("");
    setKeyword(target.value);
    fetchData(target.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDetailData = async (id) => {
    try {
      const response = await fetch(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`
      );

      if (response.ok) {
        const { data: res } = await response.json();

        return setDetailData(res?.[0]);
      }

      throw response;
    } catch {
      alert("Card Not Found");
    }
  };

  return (
    <main className="page__search">
      <section className="page__search-input-wrapper">
        <h1>Yu-Gi-Oh! Search</h1>
        <CInputSearch
          placeholder="Search your Yu-Gi-Oh! card here..."
          onChange={handleSearch}
          onClick={fetchDetailData}
          keyword={keyword}
          data={data}
          error={error}
        />
      </section>
      {detailData && (
        <section className="page__search-info">
          <a
            href={detailData?.card_images?.[0]?.image_url}
            target="_blank"
            rel="noreferrer"
          >
            <img alt="" src={detailData?.card_images?.[0]?.image_url_small} />
          </a>
          <div className="page__search-info-detail">
            <h1>
              {detailData?.name} <span>(ID: {detailData?.id})</span>
            </h1>
            <h3>
              {[
                detailData?.type,
                detailData?.attribute,
                detailData?.race,
                `${detailData?.atk}/${detailData.def}`,
              ]?.join("・")}
            </h3>
            <p>{detailData?.desc}</p>
          </div>
        </section>
      )}
    </main>
  );
}

export default SearchPage;
