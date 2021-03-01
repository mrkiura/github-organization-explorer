import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';


export const useRepositories = () => {
    const state = useTrackedState();
    const getRepositories = () => state.repositories;
    const setDraft = useSetDraft();

    const addRepositories= useCallback(
        (repositories) => {
            if (!repositories) {
                return;
            }
            setDraft((draft) => {
                draft.repositories = [...draft.repositories, ...repositories];
            })
        },
        [setDraft],
    );
    return { getRepositories, addRepositories };
};