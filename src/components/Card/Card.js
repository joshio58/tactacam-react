import React, { useState, useEffect } from 'react'
import Image from '../Image/Image'

const Card = ({ photo, onClick }) => {
	const { user, urls, width, height } = photo
	const [orientation, setOrientation] = useState('wide')

	useEffect(() => {
		if (width === height) {
			setOrientation('square')
		} else if (width < height) {
			setOrientation('tall')
		}
	}, [width, height])

	return (
		<div
			className="card card--img-gallery"
			onClick={() => onClick(urls.regular, user, orientation)}
		>
			<div className="card__content">
				<Image src={urls.regular} user={user} />
			</div>
			<div className="card__footer">
				<span>Image By:</span>
				<a
					className="credit"
					target="_blank"
					href={`https://unsplash.com/@${user.username}`}
				>
					{user.name}
				</a>
			</div>
		</div>
	)
}

export default Card
