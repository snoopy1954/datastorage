import app from './app';
import http from 'http';
import { PORT } from './utils/config';
import { logInfo, logError } from './utils/logger';

const server = http.createServer(app);

server.listen(PORT, () => {
  PORT 
  ? logInfo(`Server running on port ${PORT}`)
  : logError('no port defined');
});