import React, { useState, useEffect, useRef } from 'react'
import { FaArrowUpLong } from 'react-icons/fa6'
import './ScrollToTopButton.css'

export default function ScrollToTopButton () {
    const [showButton, setShowButton] = useState(false);
    const scrollToTopButton = useRef();

    function handelScrollToTop () {
        window.scroll({ top: 0, behavior: 'smooth' });
        scrollToTopButton.current.style.display = 'none';
    }

    useEffect(() => {
        const handleScrollButtonVisibility = () => {
            const scrollHeight = 750;
            setShowButton(window.scrollY > scrollHeight);
        }

        window.addEventListener('scroll', handleScrollButtonVisibility);
        return () =>
            window.removeEventListener('scroll', handleScrollButtonVisibility);
    }, [])

  return <>
            {showButton && (
                <button className='scroll-to-top-button' onClick={handelScrollToTop} ref={scrollToTopButton}>
                    <FaArrowUpLong size={45} />
                </button>
            )}
        </>
}