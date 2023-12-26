import { CheckCircleFill, X } from "react-bootstrap-icons";

export const DoneToast = ({ text }) => {
  return (
    <div className="font-poppins mt-2 flex items-center w-full max-w-xs p-4 text-gray-900 bg-cream-100 border-[1px] border-cream-500 rounded-lg">
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-cream-600 rounded-lg">
        <CheckCircleFill className="h-5 w-5 text-cream-100" />
      </div>
      <div className="ms-3 text-sm font-normal">{text}</div>
      <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-cream-100 text-gray-400 rounded-lg inline-flex items-center justify-center h-8 w-8" >
        <span className="sr-only">Close</span>
        <X className="h-6 w-6 text-cream-600" />
      </button>
    </div>
  )
}
