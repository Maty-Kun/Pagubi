import { Router } from 'express';
import ProductController from '../controllers/productController';

const router = Router();
const productController = new ProductController();

export function setProductRoutes(app: Router) {
  app.post('/api/products', productController.createProduct.bind(productController));
  app.get('/api/products', productController.getProducts.bind(productController));
  app.put('/api/products/:id', productController.updateProduct.bind(productController));
  app.delete('/api/products/:id', productController.deleteProduct.bind(productController));
}