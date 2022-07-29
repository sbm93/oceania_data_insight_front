import React, { createContext, useState } from "react";
import { trackPromise} from 'react-promise-tracker';
import axios from 'axios';
import {toast} from "react-toastify";

export const QuestionContext = createContext({})

// Use this data to mock the backend

// const dummyData = {
//     "potential_values_found_in_db": [
//         "COST",
//         "EU project",
//         "Project O",
//         "Project ACT",
//         "Project PEA"
//     ],
//     "question": "Show me title and cost and homepage of the project with the highest total cost",
//     "question_tokenized": [
//         "show",
//         "me",
//         "title",
//         "and",
//         "cost",
//         "and",
//         "homepage",
//         "of",
//         "project",
//         "with",
//         "highest",
//         "total",
//         "cost"
//     ],
//     "result": [
//         [
//             "Implementation of activities described in the Roadmap to Fusion during Horizon 2020 through a Joint programme of the members of the EUROfusion consortium",
//             856961937.57,
//             null
//         ]
//     ],
//     "sem_ql": "Root1(3) Root(2) Sel(0) N(2) A(0) C(13) T(16) A(0) C(55) T(16) A(0) C(54) T(16) Sup(0) A(0) C(55) T(16)",
//     "sql": "SELECT T1.title, T1.total_cost, T1.homepage FROM projects AS T1    ORDER BY T1.total_cost DESC LIMIT 1    "
// }


if (process.env.REACT_APP_PROTON_API_BASE) {
    axios.defaults.baseURL = process.env.REACT_APP_PROTON_API_BASE
}

axios.defaults.baseURL = 'http://localhost:5000';

const QuestionContextProvider = props => {
    const [dataRaw, setDataRaw] = useState()
    const [queryResults, setQueryResults] = useState()
    const [columns, setColumns] = useState()
    const [error, setError] = useState()


    const poseQuestion = (question, database, apiKey) =>  {
        console.log("question, database : ", question, database)

        setDataRaw(null)
        setQueryResults(null)
        setColumns(null)
        setError(false)

        trackPromise(
            axios.get('testing', { params: {"question": question, "database": database}}))
            .then(res => {
                console.log(res.data)
                console.log(res.data === "Unsupported Query")
                if(res.data === "Unsupported Query") {
                    setError(true)
                } else {
                    console.log(res.data["sql"].trim())
                    setQueryResults(res.data['table'])
                    setDataRaw(res.data)
                    setColumns(res.data["columns"])
                }
            }).catch((error => {
                toast.error(`Hmm, something went wrong...\n ${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true
            });
        }))
    }

    return (
        <QuestionContext.Provider value={{dataRaw, queryResults, columns, error, poseQuestion}}>
            {props.children}
        </QuestionContext.Provider>
    )

}

export default QuestionContextProvider
