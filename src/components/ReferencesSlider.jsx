import Carousel from 'react-bootstrap/Carousel';
import './Slider.css';
import {CarouselCaption} from "react-bootstrap";
import sliderBackgroundImage from "../assets/slider-background.svg";
import {sanitizeHTMLContent} from "../store/utils";


export default function ReferencesSlider({sliderContent}) {
    return (
        <Carousel>
            {sliderContent.map((data, index) =>
                <Carousel.Item key={index}>
                    <img src={sliderBackgroundImage} alt={`Reference slider background`} />
                    <CarouselCaption>
                        <div dangerouslySetInnerHTML={sanitizeHTMLContent(data.feedback)}></div>
                        <p className="feedback-name">{data.name}</p>
                    </CarouselCaption>
                </Carousel.Item>
            )}
        </Carousel>
    );
}