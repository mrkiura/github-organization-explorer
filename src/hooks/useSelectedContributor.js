import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';

export const useSelectedContributor = () => {
    const state = useTrackedState();
    const getSelectedContributor = () => {
        return { ...state.activeContributor };
    };
    const setDraft = useSetDraft();

    const setSelectedContributor = useCallback(
        (contributor) => {
            console.log("clicked person", contributor);
            setDraft((draft) => {
                draft.activeContributor = contributor;
            });
        },
        [setDraft]
    );
    return { getSelectedContributor, setSelectedContributor };
};
