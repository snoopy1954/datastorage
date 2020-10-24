import { 
    SET_IMAGE, 
    CLEAR_IMAGE, 
    ActionTypes,
    DispatchSetImage,
} from './types';

import { getOne } from "../../services/image/images";

export const setImage = (id: string) => {
    return async (dispatch: DispatchSetImage) => {
      const newImage = await getOne(id);
      dispatch({
        type: SET_IMAGE,
        payload: newImage
      });
    }
};
  
export const clearImage = () => {
    const action: ActionTypes = {
        type: CLEAR_IMAGE
    };
    
    return action;  
}
