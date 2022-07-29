import React, {useContext, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import {QuestionContext} from "../context/QuestionContext";
import SpeechToTextButton from "./SpeechToTextButton";
import Jumbotron from "react-bootstrap/Jumbotron";

function apiKeyOrDefault() {
    const apiKeyInURI = ((new URLSearchParams(window.location.search)).get("api-key"))
    return apiKeyInURI ? apiKeyInURI : ''
}

const Question = ({onDatabaseChanged, initialDatabase}) => {

    // we have an internal state for the question, independent if it gets written manually or dictated by speech-to-text
    // this is the value we then submit to the API
    console.log("initialDatabase: ", initialDatabase)
    const [questionManualOrSpeechToText, setQuestionManualOrSpeechToText] = useState('')

    // we should be able to set the API-Key by query parameter, therefore we need to initialize it like this.
    const [apiKey, setApiKey] = useState(apiKeyOrDefault())

    const {poseQuestion} = useContext(QuestionContext)

    const handleTranscriptChanged = (newTranscriptValue) => {
        setQuestionManualOrSpeechToText(newTranscriptValue)
        console.log(`Question changed by speech-to-text: ${newTranscriptValue}`);
    }

    const handleQuestionChanged = (event) => {
        setQuestionManualOrSpeechToText(event.target.value);
        console.log(`Question changed manually: ${event.target.value}`);
    }

    const handleDatabaseChanged = (event) => {
        console.log(`Change database to: ${event.target.value}`)
        onDatabaseChanged(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formElements = event.target.elements;
        poseQuestion(questionManualOrSpeechToText, formElements.database.value);
        setQuestionManualOrSpeechToText('');
    }

    return (
        <Jumbotron>
            { /* <h1>Talk to your database</h1> */}
            <Form id="question" onSubmit={handleSubmit}>
                { /* <Form.Group controlId="formApiKey">
                                    <Form.Control name="apiKey"
                                                  size="sm"
                                                  type="text"
                                                  placeholder="API Key"
                                                  onChange={(e)=>{setApiKey(e.target.value)}}
                                                  value={apiKey}
                                                  required/>
                                    <Form.Text className="text-muted">
                                        This key is necessary to avoid unnecessary traffic to the service. Please ask the creators of
                                        the app for an API Key.
                                    </Form.Text>
                                </Form.Group> */}
                <Form.Group controlId="formDatabase">
                                    <Form.Control name="database"
                                                  as="select" onChange={handleDatabaseChanged}
                                                  defaultValue={initialDatabase}>
                                        <option value='body_builder'>Body Builder</option>
                                        <option value='customers_campaigns_ecommerce'>Ecommerce</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Select a database you want to talk to. 
                                    </Form.Text>
                                </Form.Group> 
                <Form.Group controlId="formQuestion">
                    <InputGroup>
                        {/*// with the onChange-handler and the value-binding we basically create a two-way-binding on the*/}
                        {/*// questionManualOrSpeechToText variable*/}
                        <Form.Control name="question"
                                      as="textarea"
                                      rows="3"
                                      placeholder="Enter your question here or use the text-to-speech button to the right."
                                      onChange={handleQuestionChanged}
                                      value={questionManualOrSpeechToText}
                                      required/>
                        <InputGroup.Append>
                            <SpeechToTextButton onTranscriptChanged={handleTranscriptChanged}/>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                {/*<Form.Group id="formSubmit">*/}
                {/*    <Form.Check type="checkbox" label="Auto-submit when speech-to-text ends"/>*/}
                {/*</Form.Group>*/}
                <Button variant="outline-primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Jumbotron>
    );
}

export default Question
