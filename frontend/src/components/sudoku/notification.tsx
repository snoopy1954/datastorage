import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../state/store';


export const Notification: React.FC = () => {
  const notification: string = useSelector((state: RootState) => state.notification);

  return (
    <>
      {notification!==''&&<div className="ui message">
        <p>{notification}</p>
      </div>}
    </>
  );
}

export default Notification