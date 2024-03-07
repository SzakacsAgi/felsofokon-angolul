import Carousel from 'react-bootstrap/Carousel';
import './Slider.css';
import {CarouselCaption} from "react-bootstrap";
import sliderBackgroundImage from "../assets/slider-background.svg";
import DOMPurify from "dompurify";

export default function ReferencesSlider({sliderContent}) {
    return (
        <Carousel>
            {sliderContent.map((data, index) =>
                <Carousel.Item key={index}>
                    <img src={sliderBackgroundImage} alt={`Reference slider background`} />
                    <CarouselCaption>
                        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.feedback)}}></div>
                        <p className="feedback-name">{data.name}</p>
                    </CarouselCaption>
                </Carousel.Item>
            )}
        </Carousel>
    );
}