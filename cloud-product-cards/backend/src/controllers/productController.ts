class ProductController {
    private products: any[] = [];

    createProduct(req: any, res: any) {
        const newProduct = req.body;
        this.products.push(newProduct);
        res.status(201).json(newProduct);
    }

    getProducts(req: any, res: any) {
        res.status(200).json(this.products);
    }

    updateProduct(req: any, res: any) {
        const { id } = req.params;
        const updatedProduct = req.body;
        const index = this.products.findIndex(product => product.id === id);

        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            res.status(200).json(this.products[index]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    }

    deleteProduct(req: any, res: any) {
        const { id } = req.params;
        const index = this.products.findIndex(product => product.id === id);

        if (index !== -1) {
            this.products.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
}

export default ProductController;