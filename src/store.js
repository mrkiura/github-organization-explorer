import { useState, useCallback } from 'react';
import { createContainer } from 'react-tracked';
import produce from 'immer';

const initialState = {
    repositories: [],
    contributors: [],
    activeRepo: {
        repoDetail: {},
        contributors: []
    },
    activeContributor: {
        contributorDetail: {},
        repositories: []
    },
    repoContributors: {},
    dropdownToggle: false,
    sortConfig: {
        key: '',
        direction: ''
    },
    pageInfo: {
        selectedPage: 1,
        pageLimit: 12,
        pageCount: null
    },
    organization: 'angular',
    activeTab: '1',
    loading: null
};

const useValue = () => useState(initialState);

const { Provider, useTrackedState, useUpdate: useSetState } = createContainer(
    useValue
);

const useSetDraft = () => {
    const setState = useSetState();
    return useCallback(
        (draftUpdater) => {
            setState(produce(draftUpdater));
        },
        [setState]
    );
};

export { Provider, useTrackedState, useSetDraft };
