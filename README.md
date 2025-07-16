# Sale Room Frontend

A React-based frontend application for an online auction/sale room platform. This application provides a modern, responsive interface for managing products, orders, payments, and user interactions in an e-commerce environment.



## 🚀 Features

- **User Authentication & Authorization** - Secure login/logout with role-based access control
- **Product Management** - Create, edit, delete, and view products with auction functionality
- **Shopping Cart** - Add products to cart and manage purchases
- **Order Management** - Track and manage orders with status updates
- **Payment Processing** - Handle payment transactions
- **Real-time Bidding** - Live auction functionality with price updates
- **Responsive Design** - Modern UI built with Material-UI components

## 🛠️ Tech Stack

- **React 19.1.0** - Frontend framework
- **Material-UI (MUI) 7.1.1** - UI component library
- **React Router DOM 7.6.2** - Client-side routing
- **React Toastify 11.0.5** - Toast notifications
- **Day.js 1.11.13** - Date manipulation
- **React Top Loading Bar 3.0.2** - Loading indicators

## 📁 Project Structure

```
src/
├── api/           # API service functions
├── components/    # Reusable UI components
├── layouts/       # Layout components
├── views/         # Page components
├── utils/         # Utility functions and constants
├── theme/         # Material-UI theme configuration
└── assets/        # Static assets
```

## 🔌 APIs

The application uses a RESTful API architecture with the following service modules:

### Authentication API (`src/api/auth.js`)
- **`apiCheckLogin`** - Validates user authentication status
- Handles JWT token-based authentication
- Manages user session validation

### Products API (`src/api/products.js`)
- **`apiGetAllProducts`** - Fetch all available products
- **`apiGetProductsByUserId`** - Get products by specific user
- **`apiGetProductById`** - Retrieve single product details
- **`apiCreateProduct`** - Create new product with image upload
- **`apiUpdateProduct`** - Update existing product information
- **`apiDeleteProduct`** - Remove product from system
- **`apiIncreaseProductPrice`** - Handle bidding/price increases
- **`apiGetInactiveProducts`** - Get expired/inactive products
- **`apiGetOffers`** - Retrieve product offers
- **`apiGetPurchasedProducts`** - Get user's purchased items
- **`apiGetProductsSold`** - Get products sold by user
- **`apiGetFinishedOffers`** - Get completed auctions

### Orders API (`src/api/orders.js`)
- **`apiCreateOrder`** - Create new order
- **`apiGetOrders`** - Fetch all orders
- **`apiGetOrderById`** - Get specific order details
- **`apiUpdateOrderStatus`** - Update order status

### Carts API (`src/api/carts.js`)
- **`apiCreateCart`** - Create shopping cart
- **`apiAddProductToCart`** - Add items to cart
- **`apiGetCartIdByUserId`** - Retrieve user's cart

### Payments API (`src/api/payments.js`)
- **Payment processing functions** - Handle financial transactions
- **Payment status management** - Track payment states

### User API (`src/api/user.js`)
- **User profile management** - CRUD operations for user data
- **User preferences** - Manage user settings

### Rights API (`src/api/rights.js`)
- **`apiGetUserRights`** - Get user permissions and roles
- **Role-based access control** - Manage user privileges

## 🧩 Components

### Core Components

#### ProductCards (`src/components/ProductCards.js`)
- **Purpose**: Main product display component with grid layout
- **Features**:
  - Responsive product grid with pagination
  - Product image display with hover effects
  - Real-time auction countdown timers
  - Bidding functionality with price validation
  - Product management actions (edit, delete, add to cart)
  - Role-based button visibility
  - Product status indicators (active/inactive)

#### GenericTable (`src/components/GenericTable.js`)
- **Purpose**: Reusable data table component
- **Features**:
  - Configurable columns and data types
  - Pagination support
  - Expandable rows for nested data
  - File/image preview functionality
  - Status icons and formatting
  - Action buttons with conditional rendering
  - Date formatting and validation

#### Navbar (`src/components/Navbar.js`)
- **Purpose**: Main navigation component
- **Features**:
  - User profile menu
  - Shopping cart icon (customer role)
  - Responsive design
  - Logout functionality
  - Role-based navigation elements

#### Sidebar (`src/components/Sidebar.js`)
- **Purpose**: Navigation sidebar with menu items
- **Features**:
  - Collapsible menu structure
  - Role-based menu visibility
  - Active route highlighting

### Specialized Components

#### StartedEventClock (`src/components/StartedEventClock.js`)
- **Purpose**: Countdown timer for active auctions
- **Features**:
  - Real-time countdown display
  - Auction end time tracking
  - Visual status indicators

#### UnstartedEventClock (`src/components/UnstartedEventClock.js`)
- **Purpose**: Timer for upcoming auctions
- **Features**:
  - Countdown to auction start
  - Pre-auction status display

## 🎨 UI/UX Features

- **Material-UI Design System** - Consistent, modern interface
- **Responsive Grid Layout** - Adapts to different screen sizes
- **Interactive Elements** - Hover effects, transitions, and animations
- **Toast Notifications** - User feedback for actions
- **Loading Indicators** - Progress bars and spinners
- **Form Validation** - Real-time input validation
- **Image Upload** - Drag-and-drop file handling

## 🔐 Security Features

- **JWT Token Authentication** - Secure user sessions
- **Role-Based Access Control** - Permission-based UI rendering
- **API Authorization Headers** - Secure API communication
- **Input Validation** - Client-side data validation

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file with:
   ```
   REACT_APP_API_URL=your_backend_api_url
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.
