
import { h, VNodeChild } from 'vue';
import { electron } from './node';

const { clipboard } = electron;

interface NotifyOptions {
	type?: 'error' | 'success' | 'info' | 'warning';
	duration?: number;
	btn?: VNodeChild | undefined;
	copy?: boolean;
	close?: boolean;
	max_length?: number;
}

export function notify(title: string, msg: any, key: string, options?: NotifyOptions) {
	console.log(msg)
	return false
}
