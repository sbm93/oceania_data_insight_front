import React, {useEffect, useState} from 'react'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import {FaMicrophone} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import './SpeechToTextButton.css';

const SpeechToTextButton = ({onTranscriptChanged}) => {
    const [isListening, setIsListening] = useState(false)
    const {transcript,  resetTranscript} = useSpeechRecognition()


    useEffect(()=> {
        // in case the transcript changes (that's what we listening with the useEffect()), we want to callback our parent.
        onTranscriptChanged(transcript);
    }, [transcript])


    const toggleSpeechToText = () => {
        if (isListening) {
            endSpeechToText();
        } else {
            beginSpeechToText();
        }
    }

    const beginSpeechToText = () => {
        resetTranscript()
        SpeechRecognition.startListening({ continuous: true }).then(()=> {
            setIsListening(true)
            console.log("Listening started")
        });
    }

    const endSpeechToText = () => {
        SpeechRecognition.stopListening();
        setIsListening(false)
        console.log("Listening stopped");
    }


    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
            <Button variant="secondary"
                    onTouchStart={beginSpeechToText}
                    onTouchEnd={endSpeechToText}
                    onClick={toggleSpeechToText}>
                {!isListening
                ? <FaMicrophone className='clickthrough-element'/>
                : <Spinner animation="grow" className='clickthrough-element' variant="danger"/>
                }

            </Button>
        )
    } else {
        return null
    }
}
export default SpeechToTextButton