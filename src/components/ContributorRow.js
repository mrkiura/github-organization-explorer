import React from 'react';
import { ProfileInfo } from './ProfileInfo';
import { Badge } from 'reactstrap';
import { Link } from "react-router-dom";

export const ContributorRow = ({ contributor, toggleScreen }) => {
    return (
        <tr>
            <td>
                <nav>
                    <Link to="/contributor" onClick={() => { toggleScreen(); }}
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
