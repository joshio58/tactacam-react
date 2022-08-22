import React from 'react'
import { motion } from 'framer-motion'
import { inFromRight } from '../../utils/motion/variants.js'

const Header = () => {
	return (
		<header className="header header--main">
			<motion.div
				className="logo"
				variants={inFromRight}
				initial="hidden"
				animate="visible"
				transition={{ delay: 2 }}
			>
				<img src="/GreenLogo.png" alt="logo" />
			</motion.div>
		</header>
	)
}

export default Header
