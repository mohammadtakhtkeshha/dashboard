import React from 'react'
import { useMatomo } from '@datapunt/matomo-tracker-react'

export default function MatamoComponent () {
    const { trackPageView, trackEvent } = useMatomo()

    // Track page view
    React.useEffect(() => {
        trackPageView()
    }, [])

    const handleOnClick = () => {
        // Track click on button
        trackEvent({ category: 'sample-page', action: 'click-event' })
    }

    return (
        <button type="button" onClick={handleOnClick}>
            Click me
        </button>
    )
}

