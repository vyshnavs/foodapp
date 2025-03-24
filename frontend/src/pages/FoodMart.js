import React, { useState } from 'react';
import { Plus, X, Search, ShoppingCart } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FoodProductListing = () => {
  // Sample food products data
  const [products, setProducts] = useState([
    { id: 1, name: 'Organic Apples', price: 5.99, category: 'Fruits', location: 'California', description: 'Fresh organic apples from local farms', image: 'https://via.placeholder.com/320x200' },
    { id: 2, name: 'Whole Wheat Bread', price: 4.50, category: 'Bakery', location: 'New York', description: 'Freshly baked whole wheat bread', image: 'https://via.placeholder.com/320x200' },
    { id: 3, name: 'Greek Yogurt', price: 3.99, category: 'Dairy', location: 'Vermont', description: 'Creamy Greek yogurt, high in protein', image: 'https://via.placeholder.com/320x200' },
    { id: 4, name: 'Atlantic Salmon', price: 12.99, category: 'Seafood', location: 'Maine', description: 'Wild-caught Atlantic salmon fillets', image: 'https://via.placeholder.com/320x200' },
    { id: 5, name: 'Quinoa', price: 6.49, category: 'Grains', location: 'Colorado', description: 'Organic quinoa, perfect for salads and sides', image: 'https://via.placeholder.com/320x200' },
    { id: 6, name: 'Avocados', price: 2.50, category: 'Fruits', location: 'California', description: 'Ripe and ready to eat avocados', image: 'https://via.placeholder.com/320x200' },
    { id: 7, name: 'Chicken Breast', price: 8.99, category: 'Meat', location: 'Iowa', description: 'Hormone-free chicken breast', image: 'https://via.placeholder.com/320x200' },
    { id: 8, name: 'Spinach', price: 3.29, category: 'Vegetables', location: 'Arizona', description: 'Fresh organic spinach', image: 'https://via.placeholder.com/320x200' }
  ]);

  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  const [listView, setListView] = useState(true); // true for list view, false for grid view
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', category: '', location: '', description: '', image: 'https://via.placeholder.com/320x200'
  });
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    return (
      searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Sort options
  const [sortOption, setSortOption] = useState('popularity');
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortOption) {
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Handle product selection for purchase
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsSubmitted(false);
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Handle adding new food product
  const handleNewProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      price: parseFloat(newProduct.price)
    };
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: '', price: '', category: '', location: '', description: '', image: 'https://via.placeholder.com/320x200'
    });
    setShowAddProduct(false);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 fw-bold">Food Products Marketplace</h1>
        <button 
          onClick={() => setShowAddProduct(true)} 
          className="btn btn-success d-flex align-items-center gap-2"
        >
          <Plus size={20} /> New Product
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="input-group mb-4 shadow-sm">
        <span className="input-group-text bg-white border-end-0">
          <Search size={18} className="text-secondary" />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search for food products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </div>
      
      {/* Filtering and Sorting Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted">Sort By:</span>
          <select 
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
        <div className="btn-group">
          <button 
            className={`btn ${listView ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setListView(true)}
          >
            List View
          </button>
          <button 
            className={`btn ${!listView ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setListView(false)}
          >
            Grid View
          </button>
        </div>
      </div>
      
      {/* Product Listings */}
      <div className={listView ? "list-group" : "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"}>
        {sortedProducts.map(product => (
          <div key={product.id} className={listView ? "list-group-item" : "col"}>
            <div className="card h-100 shadow-sm">
              <img src={product.image} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <div className="d-flex gap-2 mb-3">
                  <span className="badge bg-secondary">{product.category}</span>
                  <span className="badge bg-secondary">{product.location}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-decoration-line-through text-muted me-2">${product.price.toFixed(2)}</span>
                    <span className="h4 text-success">${(product.price * 0.5).toFixed(2)}</span>
                    <span className="badge bg-danger ms-2">50% OFF</span>
                  </div>
                  <button 
                    onClick={() => handleProductSelect(product)}
                    className="btn btn-primary d-flex align-items-center gap-2"
                  >
                    <ShoppingCart size={16} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">List New Food Product</h5>
                <button 
                  onClick={() => setShowAddProduct(false)}
                  className="btn-close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddProduct}>
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-control"
                      value={newProduct.name}
                      onChange={handleNewProductChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0.01"
                      step="0.01"
                      className="form-control"
                      value={newProduct.price}
                      onChange={handleNewProductChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      name="category"
                      required
                      className="form-control"
                      value={newProduct.category}
                      onChange={handleNewProductChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      name="location"
                      required
                      className="form-control"
                      value={newProduct.location}
                      onChange={handleNewProductChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      required
                      className="form-control"
                      rows="3"
                      value={newProduct.description}
                      onChange={handleNewProductChange}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success">List Product</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Order Modal */}
      {selectedProduct && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order {selectedProduct.name}</h5>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="btn-close"
                ></button>
              </div>
              <div className="modal-body">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="form-control"
                        value={formData.name}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="form-control"
                        value={formData.phone}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Permanent Address</label>
                      <textarea
                        name="address"
                        required
                        className="form-control"
                        rows="3"
                        value={formData.address}
                        onChange={handleFormChange}
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setSelectedProduct(null)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-success">Confirm Order</button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="h1 text-success mb-3">✓</div>
                    <h5 className="mb-3">Order Confirmed!</h5>
                    <p>Thank you for your purchase, {formData.name}!</p>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="btn btn-primary"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodProductListing;