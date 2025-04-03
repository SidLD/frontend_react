import { Outlet } from "react-router-dom"

export default function GuestLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <main className="flex items-center justify-center p-4">
      <Outlet />
    </main>
  </div>
  )
}
