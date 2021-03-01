import { Container, Jumbotron, Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';


export const RepoDetail= (repo) => {
    return (
        <div className="center">
        <Jumbotron fluid="md">
          <Container fluid="md">
            <h1 className="display-3">{repo.name}</h1>
            <p className="lead">{repo.description}</p>
          </Container>
        </Jumbotron>
      </div>
    )
}