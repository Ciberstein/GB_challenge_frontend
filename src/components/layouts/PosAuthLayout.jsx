import { useEffect, useState } from 'react'
import { Navbar } from '../shared/user/Navbar'
import { Sidebar } from '../shared/user/Sidebar'
import { useDispatch } from 'react-redux'
import { accountThunk } from '../../store/slices/account.slice'

export const PosAuthLayout = ({ children, className = '' }) => {

  const [openSidebar, setOpenSidebar] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountThunk())
  }, [])

  return (
    <div className="bg-bottom bg-cover bg-no-repeat dark:bg-zinc-800">
      <div className="w-full lg:w-3/4 xl:w-4/5 h-screen flex flex-col gap-6 justify-center mx-auto pb-6">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
        <div className="h-full grid col-span-3 lg:grid-cols-4 gap-6 overflow-hidden">
          <Sidebar open={openSidebar} setOpen={setOpenSidebar}/>
          <div className="col-span-3 h-full overflow-y-auto dark:text-white px-6 lg:p-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
