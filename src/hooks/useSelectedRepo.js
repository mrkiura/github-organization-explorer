import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';

export const useSelectedRepo = () => {
    const state = useTrackedState();
    const getSelectedRepo = () => {return { ...state.activeRepo };};
    const setDraft = useSetDraft();

    const setSelectedRepo = useCallback(
        repo => {
            setDraft(draft => {
                draft.activeRepo = { ...repo };
            });
        },
        [setDraft]
    );
    return { getSelectedRepo, setSelectedRepo };
};
