import React, { useState, useContext } from "react";
import axios from "axios";
import styles from "./SearchBox.module.css";
import { ProductContext } from "./ProductContext";

export interface SearchBoxProps {
  onSearch?: (query: string) => void;
  onClose?: () => void;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

// interface ProductProps {
//   // id: number;
//   // category: string;
//   // visitedPins: number[];
//   // onClick: (id: number, category: string) => void;
// products: Product[];
// }

// React.FC<PinProps> = ({ id, category, visitedPins, onClick }) =>
// Huvudfunktionen
// const SearchBox: React.FC<ProductProps> = ({products}) => {

// const categoryImages: { [key: string]: string } = {
//   Elektronik: "/ux ikoner/76h/ElectronicsPin76vh.png",
//   Fordon: "/ux ikoner/76h/VehiclePin76vh.png",
//   Fritid: "/ux ikoner/76h/SportPin76vh.png",
//   Hushåll: "/ux ikoner/76h/HomePin76vh.png",
//   Kläder: "/ux ikoner/76h/ClothesPin76vh.png",
//   Övrigt: "/ux ikoner/76h/OtherPin76vh.png",
// };

// const categoryImagesVisited: { [key: string]: string } = {
//   Elektronik: "/ux ikoner/76h/ElectronicsPinVisited76vh.png",
//   Fordon: "/ux ikoner/76h/VehiclePinVisited76vh.png",
//   Fritid: "/ux ikoner/76h/SportPinVisited76vh.png",
//   Hushåll: "/ux ikoner/76h/HomePinVisited76vh.png",
//   Kläder: "/ux ikoner/76h/ClothesPinVisited76vh.png",
//   Övrigt: "/ux ikoner/76h/OtherPinVisited76vh.png",
// };


const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [visitedPins, setVisitedPins] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isSearching, setIsSearching] = useState(false);
  const { allProducts } = useContext(ProductContext);

  let { products, setProducts } = useContext(ProductContext);
  console.log("products: ", products);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSearching) {
      abortSearch();
    } else {
      executeSearch();
    }
  };
  const executeSearch = async () => {
    setIsSearching(true);
    if (onSearch) {
      onSearch(searchQuery);
    }

    try {
       // const response = await axios.get("http://localhost:8080/");
      // const allProducts = response.data;

      // const filteredProducts = allProducts.filter(
      // const filteredProducts = products.filter(
      const filteredProducts = allProducts.filter(
        (product: Product) =>
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setProducts(filteredProducts);
      setSearchResults(filteredProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
      setSearchQuery("");
    }
  };
  // const handleClick = (id: number) => {
  //   console.log("Clicked product with ID:", id);
  //   setVisitedPins((prevState) => ({
  //     ...prevState,
  //     [id]: true,
  //   }));
  // };

  const abortSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setProducts([]);
  };

  return (
    <div className={styles.searchBox}>
      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
          placeholder="Search..."
          disabled={isSearching}
        />
        <button type="submit" className={styles.searchButton}>
          {isSearching ? <span>X</span> : <span>&#8594;</span>}
        </button>
      </form>

      {/* {searchResults.length > 0 &&
        searchResults.map((product) => (
          <img
            className="styledPins"
            key={product.id}
            src={visitedPins[product.id]
              ? categoryImagesVisited[product.category]
              : categoryImages[product.category]
            }
            alt={product.name}
            onClick={() => handleClick(product.id)}
          />
        ))} */}
    </div>
  );
};

export default SearchBox;
