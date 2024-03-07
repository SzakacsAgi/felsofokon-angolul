import Accordion from 'react-bootstrap/Accordion';
import DOMPurify from "dompurify";
import './FAQ.css';

function FAQ({faqContent}) {
    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            {faqContent.map((data, index) => <Accordion.Item eventKey={index.toString()} key={`FAQ${index}`}>
                <Accordion.Header>
                    <div className="question" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.question)}}></div>
                </Accordion.Header>
                <Accordion.Body>
                    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data.answer)}}></div>
                </Accordion.Body>
            </Accordion.Item>)}
        </Accordion>
    );
}

export default FAQ;