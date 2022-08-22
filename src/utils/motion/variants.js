// Variants Transitions
export const spring = {
	type: 'spring',
	stiffness: 700,
	damping: 30,
}

// general Variants
export const inFromTop = {
	hidden: { y: -500, opacity: 0 },
	visible: { y: 0, opacity: 1 },
}

export const inFromRight = {
	hidden: { x: 500, opacity: 0 },
	visible: { x: 0, opacity: 1 },
}

export const galleryGrid = {
	hidden: { x: 0, opacity: 0 },
	visible: { x: 0, opacity: 1, transition: { staggerChildren: 0.2 } },
}

export const galleryCard = {
	hidden: { x: 1000, opacity: 0 },
	visible: { x: 0, opacity: 1 },
}

export const galleryCardImage = {
	hidden: { rotateY: 180, opacity: 0 },
	visible: {
		rotateY: 0,
		opacity: 1,
		transition: { type: 'spring', stiffness: 50, damping: 18 },
	},
}
