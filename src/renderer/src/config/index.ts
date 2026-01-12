import { reactive, shallowRef } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import page from '../pages/index.vue';
// import { remote } from '../utils/remote';

export const config = reactive({
	routes: [
		{
			name: 'index',
			path: '/',
			redirect: '/version',
			component: shallowRef(page),
			children: [
				{
					name: 'version',
					path: 'version',
					component: () => import('../pages/version.vue'),
					meta: {
						icon: 'view_list',
						title: '浏览器列表'
					}
				}
			 ]
			}
	] as RouteRecordRaw[],
	/** 主题预设 */
	themes: {
		dark: false
	},

});
