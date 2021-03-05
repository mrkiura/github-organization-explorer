import React from 'react';
export const ProfileInfo = ({ username, avatarUrl, profileUrl }) => (
    <div className="profile-info">
        <img alt="avatar" src={avatarUrl} className="avatar" />
        <a className="username" href={profileUrl} target="_blank" rel="noreferrer">
            @{username}
        </a>
    </div>
);
