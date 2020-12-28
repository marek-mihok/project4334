import {useEffect} from 'react';
import {
  useAsyncStorage,
  SET_LAST_FETCHED,
} from '../providers/AsyncStorageProvider';

const useRealmDB = () => {
  // const { updatedResources } = useResources();
  const {state, dispatch} = useAsyncStorage();

  // useEffect(() => {
  //   if (Object.keys(updatedResources).length) {
  //     const updatedLegalResources = Object.keys(updatedResources).reduce<UpdatedResources>((acc, uri) => {
  //       if (uri.startsWith('/legal')) {
  //         acc[uri] = updatedResources[uri];
  //       }
  //       return acc;
  //     }, {});
  //     dispatch({
  //       type: SET_NOT_ACCEPTED_LEGAL_RESOURCES,
  //       payload: {
  //         notAcceptedLegalResources: {
  //           ...state.notAcceptedLegalResources,
  //           ...updatedLegalResources,
  //         },
  //       },
  //     });
  //   }
  // }, [updatedResources, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const setAccepted = (uri: string) => {
    const notAcceptedLegalResources = Object.assign(
      {},
      state.notAcceptedLegalResources,
    );
    delete notAcceptedLegalResources[uri];
    dispatch({
      type: SET_NOT_ACCEPTED_LEGAL_RESOURCES,
      payload: {notAcceptedLegalResources},
    });
  };

  const setAllAccepted = () => {
    const notAcceptedLegalResources = Object.assign(
      {},
      state.notAcceptedLegalResources,
    );
    for (const uri of Object.keys(notAcceptedLegalResources)) {
      delete notAcceptedLegalResources[uri];
    }
    dispatch({
      type: SET_NOT_ACCEPTED_LEGAL_RESOURCES,
      payload: {notAcceptedLegalResources},
    });
  };

  return {
    notAcceptedLegalResources: state.notAcceptedLegalResources,
    setAccepted,
    setAllAccepted,
  };
};

export default useRealmDB;
