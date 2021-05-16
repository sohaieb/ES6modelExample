/**
 * Product model
 */
export class Product {
    static staticId = 0;
    constructor(title, description, imgSrc) {
        this.id = ++Product.staticId;
        this.title = title;
        this.description = description;
        this.imgSrc = imgSrc;
    }

}

/**
 * Products collection model
 */
export class ProductCollection {
    products = [];
    #productsListView;

    constructor(products) {
        this.#productsListView = Helper.getProductsListView();
        this.initProducts(products);
    }

    /**
     * Init products list
     *
     * @param products
     */
    initProducts(products) {
        for (let prod of products) {
            this.addProduct(prod);
        }
    }

    /**
     *
     * Add product and update view
     *
     * @param {Product} product
     */
    addProduct(product) {
        this.products.push(product);
        this.updateView(product, 'add');
    }

    /**
     *
     * Remove product and update view
     *
     * @param {Product} product
     */
    removeProduct(product) {
        let i = this.products.findIndex(prod => prod.id === product.id);
        this.products.splice(i, 1);
        this.updateView(product, 'delete');
    }

    /**
     *
     * Update view by action
     *
     * @param {Product} element
     * @param {'add'|'delete'} action
     */
    updateView(element, action) {
        switch (action) {
            case 'add': {
                let productElement = Helper.generateProductElement(element);
                this.#productsListView.addProduct(productElement);
                break;
            }
            case 'delete': {
                this.#productsListView.removeProductById(element.id);
                break;
            }
        }
    }
}


/**
 * Product List view
 */
class ProductListView {

    /**
     *
     * @param {HTMLDivElement} htmlElement
     */
    constructor(htmlElement) {
        this.htmlElement = htmlElement;
    }

    /**
     * Add product to view
     *
     * @param {HTMLElement|string} productView
     */
    addProduct(productView) {
        if(productView instanceof HTMLElement){
            this.htmlElement.insertAdjacentElement('beforeend',productView);
        }else{
            this.htmlElement.insertAdjacentHTML('beforeend',productView);
            productView = this.htmlElement.lastElementChild;
        }

        productView.addEventListener('click',this.removeProductById.bind(this,[productView.dataset.prodid]));
    }

    /**
     *
     * Remove product from view
     *
     * @param {number} productId
     */
    removeProductById(productId){
        let element = this.htmlElement.querySelector(`[data-prodid="${productId}"]`);
        let newElement = element.cloneNode(true);
        this.htmlElement.replaceChild(newElement,element);
        this.htmlElement.removeChild(newElement);
    }
}

/**
 * Helper for different functions
 */
class Helper {
    /**
     * @param {ProductListView} #productListView
     */
    static #productListView;

    /**
     * Get products list view from index.html
     *
     * @param cssClass
     * @returns {ProductListView|*}
     */
    static getProductsListView(cssClass = 'products-list') {
        if(!this.#productListView){
            return new ProductListView(document.querySelector(`.${cssClass}`));
        }
        return this.#productListView;
    }

    /**
     * Generate product HTMLElement
     *
     * @param {Product} product
     * @returns {string}
     */
    static generateProductElement(product) {
        return `
        <div class="product" data-prodid="${product.id}">
                <img class="product-img"
                     src="${product.imgSrc}">
                <div class="product-infos">
                    <label class="product-title">${product.title}</label>
                    <p class="product-description">
                        ${product.description}
                    </p>
                </div>
            </div>
        `;
    }
}
