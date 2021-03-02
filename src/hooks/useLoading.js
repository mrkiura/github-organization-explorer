import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';

export const useLoading = () => {
    const state = useTrackedState();
    const getLoading = () => state.loading;
    const setDraft = useSetDraft();
    const toggleLoading = useCallback(
        (loading) => {
            setDraft((draft) => {
                draft.loading = loading;
            });
        },
        [setDraft]
    );
    return { getLoading, toggleLoading };
};
