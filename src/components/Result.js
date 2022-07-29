import React, {useContext} from "react";
import {QuestionContext} from "../context/QuestionContext";
import ReactJson from 'react-json-view'

const Result = () => {
    const {dataRaw, queryResults, columns, error} = useContext(QuestionContext)
    console.log("columns: ", columns)
    if (dataRaw) {

        // add any further data you want to visualized
        const data_sanitized = {
            'generated_sql': dataRaw['sql'],
            'potential_values': dataRaw['table']
        }

        console.log("error : ", error)
        if(error){
            return (
                <>
                    <h3 className="mt-4">Unsupported Query</h3>
                </>)
        } else{
            return (
                <>

                    <h3 className="mt-4">Table</h3>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          {dataRaw["columns"].map(col => <th>{col}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResults.map((resultRow, idx) => (
                            <tr key={idx}>
                                {resultRow.map((resultCell, idxColumn) => (
                                    <td key={idxColumn}>
                                        {resultCell}
                                    </td>))}
                            </tr>))}
                        </tbody>
                    </table>
                    <ReactJson src={data_sanitized} name={false} enableClipboard={false} displayDataTypes={false} collapsed={true} />
                </>);
        }
    }

    return null;
}

export default Result;
