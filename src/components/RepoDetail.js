import React from 'react';
import {
    Container,
    Jumbotron
} from 'reactstrap';

export const RepoDetail = (repo) => {
    return (
        <div className="center">
            <Jumbotron fluid>
                <Container fluid="md">
                    <h1 className="display-3">Angular</h1>
                    <p className="lead">Mbaya sana</p>
                </Container>
            </Jumbotron>
        </div>
    );
};
