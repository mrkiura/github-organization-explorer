import React from 'react';
import {
    Container,
    Jumbotron
} from 'reactstrap';


export const ContributorDetail = () => {
    return (
        <div className="center">
            <Jumbotron fluid="md">
                <Container fluid="md">
                    <h1 className="display-3">Contributor</h1>
                    <p className="lead">Contributor</p>
                </Container>
            </Jumbotron>
        </div>
    );
};
