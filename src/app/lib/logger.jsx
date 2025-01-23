// utils/logger.js
import fs from 'fs';
import path from 'path';

const logFolder = path.join(process.cwd(), 'logs'); 
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder); 
}

const getDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const logMessage = (message, Object='', level = 'info') => {
    const dateString = getDateString();
    const logFilePath = path.join(logFolder, `log-${dateString}.log`);
    if(Object){
      message = message + ' : ' + JSON.stringify(Object, null, 2);
    }
    const logEntry = `[${new Date().toLocaleTimeString()}] [${level.toUpperCase()}]\n ${message}\n\n`;
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
  };
  

export default logMessage;
