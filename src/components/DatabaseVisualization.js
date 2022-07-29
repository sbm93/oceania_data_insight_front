import React, {useContext} from 'react';
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import {QuestionContext} from "../context/QuestionContext";

const DatabaseVisualization = ({selectedDatabase}) => {

    const {dataRaw} = useContext(QuestionContext)

    const cards = [
        {
            dbName: 'concert_singer',
            type: "SQLite",
            title: "Concert/Singer",
            text: "A small, non-productive database containing information about singer, concerts and stadiums. 4 tables in total.",
            links: [
                {
                    label: "ERM",
                    uri: "database/concert_singer/erd.png"
                }, {
                    label: "Concert",
                    uri: "database/concert_singer/concert.png"
                }
                , {
                    label: "Singer",
                    uri: "database/concert_singer/singer.png"
                }, {
                    label: "Stadium",
                    uri: "database/concert_singer/stadium.png"
                }
            ]
        },
        {
            dbName: 'hack_zurich',
            type: "PostgreSQL",
            title: "Zurich Hackathon",
            text: "A small mobility database provided by the Swiss Federal Statistical Office. The database consists of 4 generic tables, which are accessed by ValueNet via a bunch of Views to make attribute/table names more expressive.",
            links: [
                {
                    label: "ERM",
                    uri: "database/hack_zurich/erd.png"
                }
            ]
        },
        {
            dbName: 'college_2',
            type: "SQLite",
            title: "College 2",
            text: "A non-productive database containing information about students, courses, instructors and departments. 11 tables in total.",
            links: [
                {
                    label: "ERM",
                    uri: "database/college_2/erd.png"
                }, {
                    label: "Student",
                    uri: "database/college_2/student.png"
                }, {
                    label: "Classroom",
                    uri: "database/college_2/classroom.png"
                }
                , {
                    label: "Course",
                    uri: "database/college_2/course.png"
                }, {
                    label: "Department",
                    uri: "database/college_2/department.png"
                }, {
                    label: "Instructor",
                    uri: "database/college_2/instructor.png"
                }, {
                    label: "Section",
                    uri: "database/college_2/section.png"
                }, {
                    label: "Timeslot",
                    uri: "database/college_2/time_slot.png"
                }
            ]
        },
        {
            dbName: 'cordis_temporary',
            type: "PostgreSQL",
            title: "CORDIS",
            text: "CORDIS is the Community Research and Development Information Service. This productive database provides information about european research projects, project members, programs, institutions and researchers. The PostgreSQL database contains 23 tables.",
            links: [
                {
                    label: "ERM",
                    uri: "database/cordis_temporary/erd.png"
                }
            ]
        }
    ]

    if (!dataRaw) {

        return (<CardDeck> {
            cards.map((card, idx) => (
                <Card {...card.dbName === selectedDatabase && {'border': 'primary'}} key={idx} >
                    <Card.Header>{card.type}</Card.Header>
                    <Card.Body>
                        <Card.Title>{card.title}</Card.Title>
                        <Card.Text>{card.text}</Card.Text>
                        <Card.Text>
                            Click on the links for schema details and example content.
                        </Card.Text>
                        <ListGroup variant="flush">
                            {
                                card.links.map((link, idxLink) => (
                                    <ListGroupItem key={idxLink}>
                                        <Card.Link target="_blank" rel="noopener noreferrer"
                                                   href={link.uri}>{link.label}</Card.Link>
                                    </ListGroupItem>
                                ))
                            }
                        </ListGroup>
                    </Card.Body>
                </Card>
            ))}
        </CardDeck>)
    } else {
        return null;
    }
}

export default DatabaseVisualization
