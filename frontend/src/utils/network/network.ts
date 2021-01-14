import { Network } from '../../../../backend/src/types/network';

export const newNetwork = (): Network => {
  const network: Network = {
    mac: '',
    ip: '',
    hostname: ''
  };

  return network;
};
