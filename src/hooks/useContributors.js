import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';

export const useContributors = () => {
    const state = useTrackedState();
    const getContributors = () => state.contributors;
    const setDraft = useSetDraft();

    const addContributors = useCallback(
        (contributors) => {
            if (!contributors) {
                return;
            }
            setDraft((draft) => {
                draft.contributors = [...draft.contributors, ...contributors];
            });
        },
        [setDraft]
    );
    return { getContributors, addContributors };
};
