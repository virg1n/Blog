import React from 'react'
import { NavBbar } from './NavBbar'

export const Layout = ({children}) => {
  return (
    <React.Fragment>
        <div className="container mx-auto">
            <NavBbar />
            {children}
        </div>
    </React.Fragment>
  )
}
