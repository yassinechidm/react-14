const API_URL = 'https://fakestoreapi.com';

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/products/categories`);
  return response.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  return response.json();
}