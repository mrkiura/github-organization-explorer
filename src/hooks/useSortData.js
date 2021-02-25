import { useMemo, useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';


export const useSortData = (data) => {
    const state = useTrackedState()
    const sortConfig = state.sortConfig;
    const setDraft = useSetDraft();

    const sortedData = useMemo(() => {
      let sortableData = [...data];
      if (sortConfig !== null) {
        sortableData.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableData;
    }, [data, sortConfig]);

    const setSortConfig = useCallback(key => {
        setDraft(draft => {
          let direction = 'ascending';
          const sortConfig = draft.sortConfig;
          if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
          ) {
            direction = 'descending';
          }
          sortConfig.key = key;
          sortConfig.direction = direction;
      })
    }, [setDraft]);

    return { sortedData, sortConfig, setSortConfig };
  };
