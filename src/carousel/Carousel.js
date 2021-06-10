import {useState, useEffect} from 'react'
import './carousel.css'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

const Carousel = (props) => {
    const {children, show} = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)  
    // handle swipe 
    const [touchPosition, setTouchPosition] = useState(null)

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition
    
        if(touchDown === null) {
            return
        }
    
        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch
    
        if (diff > 5) {
            next()
        }
    
        if (diff < -5) {
            prev()
        }
    
        setTouchPosition(null)
    }
    
    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }
    
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    return ( 
        <div className="carousel-container">
            {
                currentIndex > 0 &&
                <button onClick={prev} className="left-arrow">
                    <BsFillCaretLeftFill/>
                </button>
            }
            <div className="carousel-wrapper">
                <div className="carousel-content-wrapper" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                    <div className={`carousel-content show-${show}`} style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}>
                        {children}
                    </div>
                </div>
            </div>
            {
                currentIndex < (length - show) &&
                <button onClick={next} className="right-arrow">
                    <BsFillCaretRightFill/>
                </button>
            }
        </div>
     );
}
 
export default Carousel;