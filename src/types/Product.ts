interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    thumbnail: string;
    rating: {
      rate: number;
      count: number;
    };
  }
export default Product
