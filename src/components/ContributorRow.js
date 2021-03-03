import React, { useState } from 'react';
import { ProfileInfo } from './ProfileInfo';
import { Badge } from 'reactstrap';
import { Link } from "react-router-dom";
import { useTabInfo } from '../hooks/useTabs';

export const ContributorRow = ({ contributor }) => {
    const [activeTab, setActiveTab] = useState('1');

    const handleClick = (value) => {
        console.log("clicked", value);
        setActiveTab(5);
    };
    return (
        <tr>
            <td>
                <nav>
                    <Link
                        to="/contributor"
                        name={contributor.username}
                        onClick={() => {handleClick(contributor);}}
                    >
                        <ProfileInfo
                            username={contributor.username}
                            avatarUrl={contributor.avatarUrl}
                            profileUrl={contributor.htmlUrl}

                        /></Link>
                </nav>
            </td>
            <td>
                <Badge pill>{contributor.contributions}</Badge>
            </td>
            <td>
                <Badge pill>{contributor.followers}</Badge>
            </td>
            <td>
                <Badge pill>{contributor.publicRepos}</Badge>
            </td>
            <td>
                <Badge pill>{contributor.gists}</Badge>
            </td>
        </tr>
    );
};
