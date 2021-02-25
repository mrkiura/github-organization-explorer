import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';


export const useGithubOrg = () => {
    const state = useTrackedState();
    const getGithubOrg = () => state.organization;
    const setDraft = useSetDraft();

    const setGithubOrg = useCallback(
        organization => {
            console.log("Org", organization)
            setDraft((draft) => {
                draft.organization = organization;
            })
        },
        [setDraft],
    );
    return { getGithubOrg, setGithubOrg };
}