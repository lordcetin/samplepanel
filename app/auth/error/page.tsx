
import AuthErrorPage from "@/components/Error/Error"
import { Suspense } from "react"
 
export default function ErrorPage() {
 
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorPage/>
    </Suspense>
    </>
  )
}