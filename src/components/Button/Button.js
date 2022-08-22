import React, { useState, useEffect } from 'react'
import Tooltip from '../Tooltip/Tooltip'
import { motion, AnimatePresence } from 'framer-motion'

const Button = ({
	className,
	iconOnly,
	icon,
	tooltip,
	onClick,
	style,
	cursor,
	disabled,
	label,
}) => {
	const [hovering, setHovering] = useState(false)
	let classes = 'btn'
	classes = classes + `${className ? ' ' + className : ''}`
	classes = classes + `${icon ? ' has-icon' : ''}`
	classes = classes + `${iconOnly ? ' icon-only' : ''}`
	classes = classes + `${disabled ? ' disabled' : ''}`

	const btnStyle =
		cursor && style
			? { cursor: cursor, ...style }
			: !cursor && style
			? style
			: cursor && !style
			? { cursor: cursor }
			: null

	// TODO: Wire up for hover tooltips
	// const handleMouseEvent = () => {}

	return (
		<button
			className={classes}
			disabled={disabled ? true : false}
			onClick={onClick}
			style={btnStyle}
		>
			{!iconOnly && !icon && label && <span className="btn-text">{label}</span>}
			{icon && label && (
				<>{!iconOnly && <span className="btn-text">{label}</span>}</>
			)}

			{iconOnly && <i className="icon">{icon}</i>}

			<AnimatePresence>
				{tooltip && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Tooltip hovering={hovering}>{tooltip}</Tooltip>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</button>
	)
}

export default Button
