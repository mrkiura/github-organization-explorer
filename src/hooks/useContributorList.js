import { useTrackedState } from '../store';

export const useContributorList = () => {
    const state = useTrackedState()
    return state.contributors
}