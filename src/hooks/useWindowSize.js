import { useState, useEffect } from 'react'

function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		ww: undefined,
		wh: undefined,
	})
	useEffect(() => {
		function handleResize() {
			setWindowSize({
				ww: window.innerWidth,
				wh: window.innerHeight,
			})
		}
		window.addEventListener('resize', handleResize)
		handleResize()
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	return windowSize
}

export default useWindowSize
