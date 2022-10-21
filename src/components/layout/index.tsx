
import React from 'react'
import IBaseProps from '../../interfaces/IBaseProps'

export interface ILayoutProps extends IBaseProps {}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return <div className=" w-full p-3 sm:p-10 mx-auto">{children}</div>
}

export default Layout
