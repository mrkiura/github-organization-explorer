import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';

export const useTabInfo = () => {
    const state = useTrackedState();
    const getActiveTab = () => state.activeTab;
    const setDraft = useSetDraft();

    const setActivetab = useCallback(
        (selectedTab) => {
            setDraft((draft) => {
                draft.activeTab = selectedTab;
            });
        },
        [setDraft]
    );
    return { getActiveTab, setActivetab };
};
