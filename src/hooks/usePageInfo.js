import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';


export const usePageInfo = () => {
    const state = useTrackedState();
    const getPageInfo = () => state.pageInfo;
    const setDraft = useSetDraft();

    const setPageInfo = useCallback(
        (selectedPage, pageCount) => {
            setDraft((draft) => {
                draft.pageInfo.selectedPage = selectedPage;
                draft.pageInfo.pageCount = pageCount;
            })
        },
        [setDraft],
    );
    return { getPageInfo, setPageInfo };
};