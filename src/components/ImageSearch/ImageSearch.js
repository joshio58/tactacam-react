import React, { useState, useEffect, useRef } from 'react'
import { createApi } from 'unsplash-js'
import Card from '../Card/Card'
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion'
import { galleryGrid, galleryCard } from '../../utils/motion/variants.js'
import ScrollIndicator from '../ScrollIndicator/ScrollIndicator'
import useWindowSize from '../../hooks/useWindowSize'
import useScrollPosition from '../../hooks/useScrollPosition'
import useIntersect from '../../hooks/useIntersect'
import Modal from '../Modal/Modal'
import Image from '../Image/Image'

const api = createApi({
	accessKey: 'bPfgiIw4vW72MUt72sWrzfIR4KSMdhe3J0brvyZqoCs',
})

const ImageSearch = () => {
	const windowSize = useWindowSize()
	const scrollPos = useScrollPosition()
	const [imageResults, setImageResults] = useState([])
	const [imageResultErrors, setImageResultErrors] = useState(null)
	const [resultsHeight, setResultsHeight] = useState(undefined)
	const [activeImagePage, setActiveImagePage] = useState(0)
	const [activeImage, setActiveImage] = useState({
		url: '',
		author: '',
		authorUrl: '',
		orientation: '',
	})

	const [resultsRef, entry] = useIntersect({})

	const windowHeight = windowSize.wh

	// ----------------------------------------
	// Unsplash API -> Search Request
	// ----------------------------------------
	const requestImages = (params) => {
		api.search
			.getPhotos(params)
			.then((result) => {
				if (result.errors) {
					setImageResultErrors(result.errors)
				} else {
					setImageResults([...imageResults, ...result.response.results])
				}
			})
			.catch(() => {
				console.log('something went wrong!')
			})
	}

	// ----------------------------------------
	// Unsplash -> Request next page / set
	// When activeImagePage updates
	// ----------------------------------------
	useEffect(() => {
		requestImages({ query: 'cat', per_page: 10, page: activeImagePage })
	}, [activeImagePage])

	// ----------------------------------------
	// Unsplash -> Set next page to request
	// When user scrolls to the page bottom
	// ----------------------------------------
	useEffect(() => {
		if (scrollPos + windowHeight >= document.body.offsetHeight) {
			setActiveImagePage(activeImagePage + 1)
		}
	}, [scrollPos, windowHeight])

	// ----------------------------------------
	// Modal / Large View Functionality
	// ----------------------------------------
	const handleCardClick = (imgUrl, author, orientation) => {
		setActiveImage({
			url: imgUrl,
			author: author.username,
			authorUrl: `https://unsplash.com/@${author.username}`,
			orientation: orientation,
		})
		document.body.classList.add('modal-open')
	}

	const handleCloseModal = () => {
		setActiveImage({
			url: '',
			author: '',
			authorUrl: '',
			orientation: '',
		})
		document.body.classList.remove('modal-open')
	}

	// ----------------------------------------
	// Render
	// ----------------------------------------

	if (imageResults.length < 1 && !imageResults?.errors) {
		return <div>Loading...</div>
	} else if (imageResults.errors) {
		return (
			<div className="error">
				<div>Oops! Something went wrong, please try again.</div>
			</div>
		)
	} else {
		return (
			<>
				<motion.div
					ref={resultsRef}
					className="results"
					variants={galleryGrid}
					initial="hidden"
					animate="visible"
				>
					<LayoutGroup>
						{imageResults.map((photo) => {
							return (
								<motion.div
									className="results__item"
									layout
									key={photo.id}
									variants={galleryCard}
								>
									<Card
										photo={photo}
										onClick={(imgUrl, author, orientation) =>
											handleCardClick(imgUrl, author, orientation)
										}
									/>
								</motion.div>
							)
						})}
					</LayoutGroup>
				</motion.div>
				<AnimatePresence>
					{activeImage.url && (
						<Modal
							className="modal--image-gallery-single-image"
							onClick={() => handleCloseModal()}
						>
							<>
								<div className="modal__content__body">
									<img
										className={`modal__img modal__img--${activeImage.orientation}`}
										src={activeImage.url}
										alt={`Image by ${activeImage.author}`}
									/>
								</div>
								<div className="modal__footer">
									<div className="modal__footer__atrribution">
										<span>Image By:</span>
										<a
											className="credit"
											target="_blank"
											href={activeImage.authorUrl}
										>
											{activeImage.author}
										</a>
									</div>
								</div>
							</>
						</Modal>
					)}
				</AnimatePresence>
			</>
		)
	}
}

export default ImageSearch
