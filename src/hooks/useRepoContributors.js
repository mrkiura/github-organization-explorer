import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';

export const useRepoContributors = () => {
    const state = useTrackedState();
    const getRepoContributors = (repoName) =>
        state.repoContributors.repoName.repoContributors;
    const setDraft = useSetDraft();

    const addContributorsToRepo = useCallback(
        (contributors, repo) => {
            const iterable = Array.from(contributors);
            console.log("contributos in set", iterable);
            const repoName = repo.name;
            if (iterable.length < 1) {
                return;
            }
            setDraft((draft) => {
                if (draft.repoContributors[repoName]) {
                    draft.repoContributors[repoName].contributors =
                    draft.repoContributors[repoName].contributors.concat(iterable);
                } else {
                    draft.repoContributors[repoName] = {
                        repoDetail: repo,
                        contributors: iterable
                    };
                }
            });
        },
        [setDraft]
    );
    return { getRepoContributors, addContributorsToRepo };
};
