import { CircularProgress } from "react-cssfx-loading";

export const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen font-poppins w-full bg-cream-200">
      <div>
        <CircularProgress color="#E94469" width="60px" height="60px" duration="2s" />
      </div>
    </div>
  )
}

export const LoadingPage2 = () => {
  return (
    <div className="ShoppingCart_div font-poppin bg-cream-200 fixed top-0 bottom-0 right-0 z-10 w-full max-w-lg overflow-y-scroll">
      <div className="w-full h-full flex justify-center items-center">
        <CircularProgress color="#E94469" width="60px" height="60px" duration="2s" />
      </div>
    </div>
  )
}

export const LoadingPage3 = () => {
  return (
    <div className="bg-cream-100 w-32">
      <div className="w-full h-full py-2 flex justify-center items-center">
        <CircularProgress color="#E94469" width="35px" height="35px" duration="2s" />
      </div>
    </div>
  )
}