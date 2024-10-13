import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminLayout, AuthLayout, SellerLayout, UserLayout } from './layout'
import { Login, ReEmailVerificationPage, Signup, VerificationEmail } from './components'
import { AboutPage, AdminChangePassword, AdminDashboard, AdminProfilePage, CartPage, CategoryCard, ChangePassword, ContactPage, FaqPage, ForgotPassword, Hero, LicensingPage, Order, OrderDetail, OrderLists, OrderPage, PlaceOrder, PrivacyPolicy, ProductDetailsPage, ProductListingPage, ProductPage, ProfilePage, ResetPassword,  SellerDashBoardPage, SellerListPage, SellerOrderPage, SellerPage, SellerProductListPage, ShippingPage, UserEdit, UserListPage, Whislist } from './pages'
import { useSelector } from 'react-redux'
import ProtectedRouter from './lib/ProtectedRouter';
import AdminProtectedRouter from "./lib/AdminProtectedRouter"
import ProductUpdatePage from './pages/adminPages/ProductUpdate'
import SellerProtectedRouter from './lib/SellerProtectedRouter'
function App() {
  const isAuthenticated = useSelector(state => state.users.user.isAuthenticated);
  const role = useSelector(state => state.users?.user?.userInfo?.role);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />} >
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/:id/verify'
            element={<VerificationEmail />}
          />
          <Route
            path='/resend-verification-email'
            element={<ReEmailVerificationPage />}
          />
          <Route
            path="/forgot-password"
            element={
              <ForgotPassword />
            } />
          <Route
            path="/reset-password"
            element={
              <ResetPassword />
            } />
          <Route
            path='/signup'
            element={<Signup />}
          />
        </Route>

        {/* User Routes */}
        <Route
          element={<UserLayout />}
        >
          <Route
            path='/'
            element={<Hero />}
          />

          <Route
            path='/about'
            element={<AboutPage />}
          />
          <Route
            path='/privacy-policy'
            element={<PrivacyPolicy />}
          />
          <Route
            path='/licensing'
            element={<LicensingPage />}
          />
          <Route
            path='/contact'
            element={<ContactPage />}
          />
          <Route
            path='/faq'
            element={<FaqPage />}
          />
          <Route
            path="/whislist"
            element={<Whislist />} />
          <Route
            path="/shop"
            element={
              <ProductPage />
            } />
          <Route
            path="/product/:id"
            element={
              <ProductDetailsPage />
            } />
          <Route
            path="/cart"
            element={
              <ProtectedRouter isAuthenticated={isAuthenticated} role={role}>
                <CartPage />
              </ProtectedRouter>
            } />
          <Route
            path="/shipping"
            element={
              <ProtectedRouter isAuthenticated={isAuthenticated} role={role}>
                <ShippingPage />
              </ProtectedRouter>
            } />
          <Route
            path="/placeorder"
            element={
              <ProtectedRouter isAuthenticated={isAuthenticated} role={role}>
                <PlaceOrder />
              </ProtectedRouter>
            } />
          <Route
            path="/order/:id"
            element={
              <ProtectedRouter isAuthenticated={isAuthenticated} role={role}>
                <Order />
              </ProtectedRouter>
            } />
          <Route
            path="/order-details/:id"
            element={
              <ProtectedRouter isAuthenticated={isAuthenticated} role={role}>
                <OrderDetail />
              </ProtectedRouter>
            } />
          <Route
            path="/user/orders"
            element={
              <ProtectedRouter isAuthenticated={isAuthenticated} role={role}>
                <OrderLists />
              </ProtectedRouter>
            } />
          <Route
            path="/user/profile"
            element={
              <ProtectedRouter isAuthenticated={isAuthenticated} role={role}>
                <ProfilePage />
              </ProtectedRouter>
            } />
          <Route
            path="/user/password"
            element={
              <ProtectedRouter isAuthenticated={isAuthenticated} role={role}>
                <ChangePassword />
              </ProtectedRouter>
            } />
          <Route
            path="/seller"
            element={
              <ProtectedRouter isAuthenticated={isAuthenticated} role={role}>
                <SellerPage />
              </ProtectedRouter>
            } />
        </Route>

        {/* Admin Routes */}
        <Route
          element={<AdminLayout />}
        >
          <Route
            path='/admin/dashboard'
            element={
              <AdminProtectedRouter
                isAuthenticated={isAuthenticated}
                role={role}
              >
                <AdminDashboard />
              </AdminProtectedRouter>
            }
          />
          <Route
            path='/admin/categories'
            element={
              <AdminProtectedRouter
                isAuthenticated={isAuthenticated}
                role={role}
              >
                <CategoryCard />
              </AdminProtectedRouter>
            }
          />
          <Route
            path='/admin/profile'
            element={
              <AdminProtectedRouter
                isAuthenticated={isAuthenticated}
                role={role}
              >
                <AdminProfilePage />
              </AdminProtectedRouter>
            }
          />
          <Route
            path='/admin/password'
            element={
              <AdminProtectedRouter
                isAuthenticated={isAuthenticated}
                role={role}
              >
                <AdminChangePassword />
              </AdminProtectedRouter>
            }
          />
          <Route
            path='/admin/products'
            element={
              <AdminProtectedRouter
                isAuthenticated={isAuthenticated}
                role={role}
              >
                <ProductListingPage />
              </AdminProtectedRouter>
            }
          />
          <Route
            path='/admin/product-update/:id'
            element={
              <AdminProtectedRouter
                isAuthenticated={isAuthenticated}
                role={role}
              >
                <ProductUpdatePage />
              </AdminProtectedRouter>
            }
          />
          <Route
            path='/admin/orders'
            element={
              <AdminProtectedRouter
                isAuthenticated={isAuthenticated}
                role={role}
              >
                <OrderPage />
              </AdminProtectedRouter>
            }
          />
          <Route
            path='/admin/users'
            element={
              <AdminProtectedRouter
                isAuthenticated={isAuthenticated}
                role={role}
              >
                <UserListPage />
              </AdminProtectedRouter>
            }
          />
          <Route
            path='/admin/user/edit/:id'
            element={
              <AdminProtectedRouter
                isAuthenticated={isAuthenticated}
                role={role}
              >
                <UserEdit />
              </AdminProtectedRouter>
            }
          />
          <Route
            path='/admin/sellers'
            element={
              <AdminProtectedRouter
                isAuthenticated={isAuthenticated}
                role={role}
              >
                <SellerListPage />
              </AdminProtectedRouter>
            }
          />
        </Route>

        {/* Seller Routes */}
        <Route
          element={<SellerLayout />}
        >
          <Route
          path='/seller/dashboard'
          element={
            <SellerProtectedRouter
            isAuthenticated={isAuthenticated}
            role={role}>
              <SellerDashBoardPage />
            </SellerProtectedRouter>
          }
          />
          <Route
          path='/seller/categories'
          element={
            <SellerProtectedRouter
            isAuthenticated={isAuthenticated}
            role={role}>
              <CategoryCard />
            </SellerProtectedRouter>
          }
          />
          <Route
          path='/seller/products'
          element={
            <SellerProtectedRouter
            isAuthenticated={isAuthenticated}
            role={role}>
              <SellerProductListPage />
            </SellerProtectedRouter>
          }
          />
          <Route
          path='/seller/product-update/:id'
          element={
            <SellerProtectedRouter
            isAuthenticated={isAuthenticated}
            role={role}>
              <ProductUpdatePage />
            </SellerProtectedRouter>
          }
          />
          <Route
          path='/seller/orders'
          element={
            <SellerProtectedRouter
            isAuthenticated={isAuthenticated}
            role={role}>
              <SellerOrderPage />
            </SellerProtectedRouter>
          }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
