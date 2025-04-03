import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

const CartPage = lazy(() => import("@/pages/cart/index"))

const Loading = () => <div>Loading...</div>
const routers = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <CartPage />
            </Suspense>
          }
        />
    </>,
  ),
)

export default routers
