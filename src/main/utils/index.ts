import { BrowserWindow, app, dialog } from 'electron';
import path from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { finished } from 'stream/promises';
import { Logger } from '../log/logger';


const taskLogger = Logger('task');
// const logger = Logger('utils');


export async function task<T>(
  name: string, 
  func: () => Promise<T> | T
): Promise<T> {
  const time = Date.now();
  const res = await func();
  taskLogger.info(name, ' 耗时:', Date.now() - time);
  return res;
}

export function getCurrentWebContents() {
	return BrowserWindow.getAllWindows()[0].webContents;
}


