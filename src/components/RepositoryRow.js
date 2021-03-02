import React from 'react';
import { Badge } from 'reactstrap';


export const RepositoryRow = ({ repo }) => {
    return (
        <tr>
            <td className="left">{repo.name}</td>
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
