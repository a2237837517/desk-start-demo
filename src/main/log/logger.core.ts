// @ts-check
import { join, dirname } from 'path';
import { inspect } from 'util';
import { existsSync, mkdirSync, appendFileSync } from 'fs';

function formatDate():string {
	const date = new Date();
	return [
		date.getFullYear(),
		String(date.getMonth() + 1).padStart(2, '0'),
		date.getDate().toString().padStart(2, '0')
	].join('-');
}

/**
 * 日志对象
 * ```js
 * const l = new LoggerCore(app.getPath("logs"), true, 'test') // create `${logs}/YYYY-MM-DD/test.log`
 * const l2 = new LoggerCore(app.getPath("logs"), true,'project','error','1') // create `${logs}/YYYY-MM-DD/project/error/1.log`
 * ```
 */
export class LoggerCore {
	basePath;
	withConsole;
	dest;
	constructor(basePath: string, withConsole = true, ...name: string[]) {
		this.basePath = basePath;
		this.withConsole = withConsole;
		this.dest = join(this.basePath, '/', formatDate(), '/', name.join('/') + '.log');
	}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
	log = (...msg: any[]):Promise<void> => this._log(this.dest, '信息', ...msg);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	info = (...msg: any[]):Promise<void> => this._log(this.dest, '信息', ...msg);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error = (...msg: any[]):Promise<void> => this._log(this.dest, '错误', ...msg);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	debug = (...msg: any[]):Promise<void> => this._log(this.dest, '调试', ...msg);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	warn = (...msg: any[]):Promise<void> => this._log(this.dest, '警告', ...msg);

	_log(dest: string, level: string, ...msg: string[]):Promise<void> {
		const data = msg
			.map((s) => {
				if (typeof s === 'object' || typeof s === 'function') {
					s = inspect(s);
				}
				return s;
			})
			.join(' ');
		const txt = `[${level}] ${new Date().toLocaleString()} \t ` + data;

		if (this.withConsole) {
			console.log(txt);
		}

		return new Promise<void>((resolve) => {
			if (!existsSync(dirname(dest))) {
				mkdirSync(dirname(dest), { recursive: true });
			}
			appendFileSync(dest, txt + '\n');
			resolve();
		});
	}
}
