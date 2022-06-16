import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number,
    price: number,
    priceFormatted: string,
    title: string
  }>
  onAddToWishList(id: number): void;
  totalPrice: number;
}

export function SearchResults({ results, onAddToWishList, totalPrice }: SearchResultsProps) {
  return (
    <div>
      <h2>Total: {totalPrice}</h2>

      {
        results.map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              onAddToWishList={onAddToWishList} />
          )
        })
      }
    </div>
  );
}