import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { motion, usePresence } from 'framer-motion'
import ModalContent from './ModalContent'

const Modal = ({ className, onClick, children }) => {
	const elemToAppendTo = document.getElementById('root')
	const [isPresent, safeToRemove] = usePresence()

	useEffect(() => {
		if (!isPresent) {
			setTimeout(safeToRemove, 500)
		}
	}, [isPresent])

	const modal = (
		<div className={`modal${className ? ' ' + className : ''}`}>
			<motion.div
				className="modal__backdrop"
				onClick={onClick}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			></motion.div>
			<ModalContent children={children} onClick={onClick} />
		</div>
	)

	return ReactDOM.createPortal(modal, elemToAppendTo)
}

export default Modal
