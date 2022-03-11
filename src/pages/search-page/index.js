import { CInputSearch } from "../../components";

import "./style.css";

function SearchPage() {
  return (
    <main className="page__search">
      <section className="page__search-input-wrapper">
        <h1>Yu-Gi-Oh! Search</h1>
        <CInputSearch block placeholder="Search your Yu-Gi-Oh! card here..." />
      </section>
    </main>
  );
}

export default SearchPage;
