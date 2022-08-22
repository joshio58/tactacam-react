import React, { useState, useEffect, useRef } from 'react'

// import useRef from react in component where this hook is being used
// and attach ref to element to observe
// pass the ref to this hook

const useIntersect = ({ root = null, rootMargin, threshold = 0 }) => {
	const [entry, updateEntry] = useState({})
	const [node, setNode] = useState(null)

	const observer = useRef(null)

	useEffect(() => {
		if (observer.current) observer.current.disconnect()

		observer.current = new window.IntersectionObserver(
			([entry]) => updateEntry(entry),
			{
				root,
				rootMargin,
				threshold,
			}
		)

		const { current: currentObserver } = observer

		if (node) currentObserver.observe(node)

		return () => currentObserver.disconnect()
	}, [node, root, rootMargin, threshold])

	return [setNode, entry]
}

export default useIntersect
