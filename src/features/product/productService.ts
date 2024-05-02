import axiosConfig from '../../app/axiosConfig';
import { allProducts } from '../../data/products';

interface productType {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

const getProducts = async () => {
  // const response = await axiosConfig.get("products");
  const listProducts = allProducts;
  const response = await axiosConfig.get('products');
  console.log('api response', response);

  console.log('from the prodcut service', listProducts);

  // return response.data;
  return listProducts;
};
const getSingleProduct = async (id: number) => {
  // const response = await axiosConfig.get('products/' + id);

  const response = allProducts.filter((item: productType) => item?.id === id);
  console.log('single product', response);

  return response[0];
};
const getCategory = async (data: string) => {
  console.log('category filer data', data);

  // const response = await axiosConfig.get('/products/category/' + data);
  const response = allProducts.filter((item: productType) =>
    data.includes(item.category.toLowerCase())
  );
  console.log('procuts by category', response);

  return response;
};

const productService = {
  getProducts,
  getSingleProduct,
  getCategory,
};

export default productService;
