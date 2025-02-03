export default interface IImage {
  image: string;
  selected: boolean;
  X: number;
  Y: number;
  id: string;
  isDrag: boolean;
}

export default interface IItems {
  product_description: string;
  product_id: string;
  product_image: string;
  product_name: string;
  product_price: string;
  product_size: string;
  product_stock: string;
}
