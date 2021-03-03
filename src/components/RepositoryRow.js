import React, { useState } from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import {useTabInfo} from '../hooks/useTabs';


export const RepositoryRow = ({ repo, toggleScreen }) => {
    const { setActivetab } = useTabInfo();
    const [activeTab, setActiveTab] = useState('1');

    const handleClick = (value) => {
        console.log("clicked", value);
        setActivetab(5);
    };
    return (
        <tr>
            <td className="left">
                <nav>
                    <li onClick={() => {handleClick(repo.name);}}>
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
