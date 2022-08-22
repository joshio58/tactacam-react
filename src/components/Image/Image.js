import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { galleryCardImage } from '../../utils/motion/variants.js'

const Image = ({ src }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [isInView, setIsInView] = useState(false)
	const imageContainer = useRef()

	// Using the IntersectionObserver API to set
	// the isInView State in order to set the src for images (lazy load)
	// TODO: Swap out with hook -> useIntersect
	useEffect(() => {
		const observer = new IntersectionObserver(onIntersection, { threshold: 0 })
		observer.observe(imageContainer.current)

		function onIntersection(entries) {
			const { isIntersecting } = entries[0]

			if (isIntersecting) {
				observer.disconnect()
			}

			setIsInView(isIntersecting)
		}
	}, [])

	function onLoad() {
		setIsLoading((prev) => !prev)
	}

	return (
		<motion.div
			ref={imageContainer}
			className={`image` + (isLoading ? ' image--isLoading' : '')}
			variants={galleryCardImage}
			initial="hidden"
			animate={!isLoading ? 'visible' : 'hidden'}
		>
			<img
				className="image__img"
				src={isInView ? src : null}
				alt=""
				onLoad={() => onLoad()}
			/>
		</motion.div>
	)
}

export default Image
