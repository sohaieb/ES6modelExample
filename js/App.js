import {Product, ProductCollection} from './Classes.js';

export default class App {
    products = [
        {
            title: 'Mon produit 1',
            description: "c'est le produit que tout le monde doit essayer.",
            img: 'assets/prod.jpg'
        },
        {
            title: 'Mon produit 2',
            description: "c'est le produit que tout le monde doit essayer.",
            img: 'assets/prod.jpg'
        },
        {
            title: 'Mon produit 3',
            description: "c'est le produit que tout le monde doit essayer.",
            img: 'assets/prod.jpg'
        }
    ];
    productCollection;

    /**
     * Start the hole application
     */
    startApplication() {
        let prods = [];
        for (let prod of this.products){
            prods.push(new Product(prod.title,prod.description, prod.img));
        }
        this.productCollection = new ProductCollection(prods);
    }
}
