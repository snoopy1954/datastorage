import { 
    SET_BINARYDATA, 
    CLEAR_BINARYDATA, 
    ActionTypes,
    DispatchSetBinarydata,
} from './types';

import { getOne } from "../../services/binarydata/images";

export const setBinarydata = (id: string) => {
    return async (dispatch: DispatchSetBinarydata) => {
      const binarydata = await getOne(id);
      dispatch({
        type: SET_BINARYDATA,
        payload: binarydata
      });
    }
};
  
export const clearBinarydata = () => {
    const action: ActionTypes = {
        type: CLEAR_BINARYDATA
    };
    
    return action;  
}
