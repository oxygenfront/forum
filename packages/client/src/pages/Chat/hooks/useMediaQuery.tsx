import { useEffect, useState } from 'react'

export const useMediaQuery = ({
	desktopWidth = 1920,
	mobileWidth = 540,
	tabletWidth = 1024, // если tabletWidth передан, он используется как граница
	// между mobile и tablet
}) => {
	// Граница между mobile и tablet: если tabletWidth указан – используем его, иначе mobileWidth
	const boundary = tabletWidth || mobileWidth

	// Функция, определяющая текущие флаги на основе ширины окна
	const getDeviceType = () => {
		const width = window.innerWidth
		return {
			isMobile: width < boundary, // мобильное: ширина меньше границы
			isTablet: width >= boundary && width < desktopWidth, // планшетное: ширина от boundary до desktopWidth - 1
			isDesktop: width >= desktopWidth, // десктопное: ширина больше или равна desktopWidth
		}
	}

	const [deviceType, setDeviceType] = useState(getDeviceType())

	useEffect(() => {
		const handleResize = () => {
			setDeviceType(getDeviceType())
		}

		window.addEventListener('resize', handleResize)
		// При размонтировании компонента удаляем слушатель
		return () => window.removeEventListener('resize', handleResize)
	}, [desktopWidth, mobileWidth, tabletWidth])

	return deviceType
}
