import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';

export const useRepoContributors = () => {
    const state = useTrackedState();
    const getRepoContributors = (repoName) =>
        state.repoContributors.repoName.repoContributors;
    const setDraft = useSetDraft();

    const addContributorsToRepo = useCallback(
        (contributors, repo) => {
            const repoName = repo.name;
            if (!contributors) {
                return;
            }
            setDraft((draft) => {
                if (draft.repoContributors[repoName]) {
                    draft.repoContributors[repoName].contributors = [
                        ...draft.repoContributors[repoName].contributors,
                        ...contributors,
                    ];
                } else {
                    draft.repoContributors[repoName] = repo;
                    draft.repoContributors[repoName].contributors = contributors;
                }
            });
        },
        [setDraft]
    );
    return { getRepoContributors, addContributorsToRepo };
};
