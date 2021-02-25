import { useCallback } from 'react';
import { useTrackedState, useSetDraft } from '../store';


export const useDropdownToggle = () => {
    const state = useTrackedState();
    const getDropdowntoggle = () => state.dropdownToggle
    const setDraft = useSetDraft();
    const setDropdowntoggle =  useCallback(
      () => {
        setDraft(draft => {
          draft.dropdownToggle = !draft.dropdownToggle;
        });
      },
      [setDraft],
    );
    return {getDropdowntoggle, setDropdowntoggle}
  };