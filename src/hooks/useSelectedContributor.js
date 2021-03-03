import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';

export const useSelectedContributor = () => {
    const state = useTrackedState();
    const getSelectedContributor = () => state.activeContributor;
    const setDraft = useSetDraft();

    const setSelectedContributor = useCallback(
        (contributor) => {
            setDraft((draft) => {
                draft.activeContributor.activeContributor = contributor;
            });
        },
        [setDraft]
    );
    return { getSelectedContributor, setSelectedContributor };
};
