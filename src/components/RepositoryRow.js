import React, { useState } from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelectedRepo } from '../hooks/useSelectedRepo';


export const RepositoryRow = ({ repo }) => {
    // const { setActivetab } = useTabInfo();
    const [setActiveTab] = useState('1');
    const { setSelectedRepo } = useSelectedRepo();

    const handleClick = (value) => {
        setSelectedRepo(repo);
        setActiveTab(5);
    };
    return (
        <tr>
            <td className="left">
                <nav>
                    <li onClick={() => { handleClick(repo.name); }}>
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
        </tr>);
};
