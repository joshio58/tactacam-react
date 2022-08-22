import React from 'react'
import Header from '../Header/Header'
const LayoutMain = ({ children }) => {
	return (
		<div className="layout">
			<Header />
			<div className="main-content">
				<div className="container">{children}</div>
			</div>
		</div>
	)
}

export default LayoutMain
