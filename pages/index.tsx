import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

type Result = {
  totalPrice: number;
  data: any[]
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Result>({
    totalPrice: 0,
    data: []
  });

  async function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);

    const data = await response.json();

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const products = data.map(product => {
      return {
        ...product,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({ data: products, totalPrice });
  }

  const addToWishList = useCallback((id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)} />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        onAddToWishList={addToWishList}
        totalPrice={results.totalPrice}
        results={results.data} />
    </div>
  )
}
