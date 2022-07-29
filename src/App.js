import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import QuestionContextProvider from "./context/QuestionContext";
import Question from "./components/Question";
import Result from "./components/Result";
import {ToastContainer} from "react-toastify";
import Container from 'react-bootstrap/Container';
import DatabaseVisualization from "./components/DatabaseVisualization";
import LoadingSpinner from "./components/LoadingSpinner";


function App() {
    const [database, setDatabase] = useState('body_builder')

    return (
        <Container className="p-3">
            <ToastContainer/>
            <QuestionContextProvider>
                <Question initialDatabase={database}  onDatabaseChanged={setDatabase}/>
                <LoadingSpinner/>
                <Result/>
                { /* <DatabaseVisualization selectedDatabase={database}/> */ }
            </QuestionContextProvider>
        </Container>
    );
}

export default App;
