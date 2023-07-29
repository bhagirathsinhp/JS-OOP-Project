class Product {
  title = "DEFAULT";
  imageUrl;
  description;
  price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}
// console.log(new Product());

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);

    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);

    return rootElement;
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add To Cart</button>
        </div>
      </div>
    `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  #products = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      new Product(
        "A Pillow!",
        "https://cdn.sleepnumber.com/image/upload/f_auto,q_auto:eco/v1598561145/workarea/catalog/product_images/pillow-comfortfit/Pillow-comfortfit_PDP_Postcard_Variant_classic",
        "A soft pillow!",
        10
      ),

      new Product(
        "A Chair!",
        "https://cdn.shopify.com/s/files/1/0635/6929/7637/products/01.jpg?v=1660739372",
        "An Ergonomic Chair!",
        200
      ),
    ];

    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.#products) {
      const productItem = new ProductItem(prod, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);

    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
    }
    // productItem.render();
    // prodList.append(prodEl);
    // return prodList;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, curItem) => {
      return prevValue + curItem.price;
    }, 0);
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProducts = () => {
      console.log("Ordering....");
      console.log(this.items);
    };
    this.render();
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  // orderProducts() {
  //   console.log("Ordering...");
  //   console.log(this.items);
  // }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector("button");
    // orderButton.addEventListener("click", () => this.orderProducts());
    orderButton.addEventListener("click", () => this.orderProducts());
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class Shop extends Component {
  constructor() {
    super();
  }

  render() {
    // const renderHook = document.getElementById("app");
    this.cart = new ShoppingCart("app");
    // this.cart.render();
    new ProductList("app");
    // productList.render();

    // renderHook.append(cartEl);
    // renderHook.append(productListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    // shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

// -----------------------------------------------------------------------------------------------------------

const person = {
  name: "Max",
  greet() {
    console.log(this.name);
  },
};
Object.getOwnPropertyDescriptors(person);
