import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom"
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
    <Route path="*" element={<Navigate to="/" replace />} />

    </>,
  ),
)

export default routers
