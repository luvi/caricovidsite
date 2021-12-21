import React, { useState } from 'react'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

const AccordionToggle = ({ children, style, eventKey }) => {

    const [highlight, setHighlight] = useState(false)
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        setHighlight(!highlight)
    );

    // Source: https://icons.getbootstrap.com/icons
    const icon_chevron_down = (
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
        </svg>
    )

    // Source: https://icons.getbootstrap.com/icons
    const icon_chevron_right = (
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
    )

    return (
        <button
            type="button"
            className='btn btn-link'
            style={style}
            onClick={decoratedOnClick}
        >
            <h6>
                <span className='px-2'>{highlight ? (icon_chevron_down) : (icon_chevron_right)}</span>
                {children}
            </h6>
        </button>
    );
}

export default AccordionToggle