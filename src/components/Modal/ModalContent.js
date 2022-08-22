import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../Button/Button'
import Times from '../Svg/Times'

const ModalContent = ({ children, onClick }) => {
	return (
		<motion.div
			className="modal__container"
			initial={{ opacity: 0, y: -200 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -200, transition: { y: { delay: 0.1 } } }}
		>
			<div className="modal__wrapper">
				<div className="modal__content">{children}</div>
				<Button
					className="close-btn"
					iconOnly
					icon={<Times />}
					tooltip="Close"
					onClick={onClick}
				/>
			</div>
		</motion.div>
	)
}

export default ModalContent
