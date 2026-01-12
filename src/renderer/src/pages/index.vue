<template>
	<a-config-provider  >
		<CommonEditActionDropdown
			trigger="contextMenu"
			align-point
			position="bl"
			:style="{ display: 'block' }"
		>
			<div class="row h-100 w-100 p-0 m-0">
				<div class="col p-0 m-0">
					<div class="row main h-100 w-100 p-0 m-0">
						<div class="col-12 p-0 m-0"><Title id="title" /></div>
						<div class="col-12 p-0 m-0 overflow-auto d-flex">
							<div
								
								class="h-100"
							>
								<!-- 侧边栏图标 -->
								<div class="col-auto sider h-100">
									<div class="sider-items" >
										<template
											v-for="(item, index) in (routes.find((r) => r.name === 'index')?.children as CustomRouteType[])"
											:key="index"
										>
											<div
												class="sider-item"
												:class="{ active: item.name === currentRoute.name }"
												@click="clickMenu(item)" >
                                                {{item.name}}
											</div>
										</template>
									</div>
								</div>
							</div>
							<div :style="{ width: `calc(100% - 0px)` }">
								<router-view v-slot="{ Component }">
									<keep-alive>
										<component :is="Component" />
									</keep-alive>
								</router-view>
							</div>
						</div>
					</div>
				</div>
			</div>
		</CommonEditActionDropdown>
	</a-config-provider>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive, computed } from 'vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import { router, routes, CustomRouteType } from '../route';
import { remote } from '../utils/remote';
const version = ref('');
// 当前路由
const currentRoute = useRouter().currentRoute;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function clickMenu(route: RouteRecordRaw & { meta: { title: string } }) {
	router.push(route.path);
	remote.win.call('setTitle', `OCS - ${route.meta.title}`);
}

</script>
<style lang="less">

.main {
	display: grid;
	grid-template-rows: 32px calc(100vh - 32px);
	grid-template-areas:
		'header'
		'main ';
}

.sider {
	-webkit-app-region: no-drag;
	user-select: none;
	padding: 4px 24px 4px 0px;
	text-align: center;
	display: flex;
	justify-content: left;
	border-right: 1px solid #f3f3f3;

	.sider-items {
		padding-top: 12px;

		.sider-item {
			padding: 8px;
			display: flex;
			cursor: pointer;
			align-items: center;
			border-left: 6px solid white;
		}
		.sider-item.active {
			background-color: #f4f9ff;
			border-left: 6px solid #1890ff;
		}

		.sider-item-title {
			font-size: 13px;
		}

		.sider-item + .sider-item {
			margin-top: 12px;
		}

		.icon {
			width: 28px;
			height: 28px;
			font-size: 28px;
			cursor: pointer;
		}
	}

	.version {
		font-size: 12px;
		position: absolute;
		bottom: 0px;
	}
}

.ant-modal-confirm .ant-modal-body {
	padding: 12px !important;
}

/* 新手教程遮罩层 */
.tutorial {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #00000030;
	z-index: 100;
	top: 0;
	left: 0;
}

.bp-toc {
	position: absolute;
	background: white;
	z-index: 999;
	right: 400px;

	animation-duration: 0.5s;
	animation-name: slide-in;
	animation-timing-function: ease;
	padding: 4px;
	border-radius: 8px 0px 0px 8px;
	font-size: 12px;
	top: 24px;
	color: #86909c;

	* {
		cursor: pointer;
		margin: 6px 0px 6px 6px;
		padding: 4px;
		border-radius: 4px;

		&:hover {
			background-color: #ececec;
		}
	}
}

.app-container {
	flex: 0 0 auto;
}

@keyframes slide-in {
	from {
		top: -500px;
	}

	to {
		top: 24px;
	}
}
</style>
