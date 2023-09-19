// button component for common btn
export default function NextPrevBtn({children,onClick}:{children?: React.ReactNode,onClick? : React.MouseEventHandler}){
  
  return (
    <div className={'cursor-pointer rounded-lg px-3 py-1 text-sm font-medium bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white'}
    onClick={onClick}>
      {children}
    </div>

  )
}