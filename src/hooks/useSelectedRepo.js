import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';

export const useSelectedRepo = () => {
    const state = useTrackedState();
    const getSelectedRepo = () => state.activeRepo;
    const setDraft = useSetDraft();

    const setSelectedRepo = useCallback(
        (organization) => {
            setDraft((draft) => {
                draft.organization = organization;
                draft.contributors = [];
            });
        },
        [setDraft]
    );
    return { getSelectedRepo, setSelectedRepo };
};
