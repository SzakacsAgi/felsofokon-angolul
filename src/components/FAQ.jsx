import Accordion from 'react-bootstrap/Accordion';
import {sanitizeHTMLContent} from "../store/utils";
import './FAQ.css';

function FAQ({faqContent}) {
    return (
        <Accordion>
            {faqContent.map((data, index) => <Accordion.Item eventKey={index.toString()} key={`FAQ${index}`}>
                <Accordion.Header>
                    <div className="question" dangerouslySetInnerHTML={sanitizeHTMLContent(data.question)}></div>
                </Accordion.Header>
                <Accordion.Body>
                    <div dangerouslySetInnerHTML={sanitizeHTMLContent(data.answer)}></div>
                </Accordion.Body>
            </Accordion.Item>)}
        </Accordion>
    );
}

export default FAQ;