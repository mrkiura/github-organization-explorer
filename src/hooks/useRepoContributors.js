import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';


export const useRepoContributors = () => {
    const state = useTrackedState();
    const getRepoContributors = (repoName) => state.repoContributors.repoName;
    const setDraft = useSetDraft();

    const addContributorsToRepo = useCallback(
        (contributors, repoName) => {
            if (!contributors) {
                return;
            }
            setDraft((draft) => {
                if (draft.repoContributors.repoName) {
                    draft.repoContributors[repoName] = [...draft.repoContributors[repoName], ...contributors]
                } else {
                    draft.repoContributors[repoName] = [contributors]
                }
            })
        },
        [setDraft],
    );
    return { getRepoContributors, addContributorsToRepo };
};