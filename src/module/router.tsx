import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import Loading from "@/components/loading"

const CartPage = lazy(() => import("@/pages/cart/index"))

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
