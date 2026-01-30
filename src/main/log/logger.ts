// @ts-check
import { LoggerCore } from './logger.core';
import { app } from 'electron';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Logger(...name: any[]):LoggerCore {
	return new LoggerCore(app.getPath('logs'), true, ...name);
}
