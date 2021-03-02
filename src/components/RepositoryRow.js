import React from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';


export const RepositoryRow = ({ repo, toggleScreen }) => {
    return (
        <tr>
            <td className="left">
                <nav>
                    <li onClick={() => {toggleScreen();}}>
                        <Link to="/repo">{repo.name}</Link>
                    </li>

                </nav>
            </td>
            <td className="left">{repo.description}</td>
            <td className="left">
                <Badge pill>{repo.language}</Badge>
            </td>
            <td className="left">
                <Badge pill>{repo.forks_count}</Badge>
            </td>
        </tr>
    );
};
