<template>
    <div class="wrapper">
		<div class="navigation">
			<div class="navigation__header">Traveling</div>
			<ul class="navigation__list">
				<li class="navigation__list-item">
					<font-awesome-icon icon="fa-solid fa-circle-user" />
					User
				</li>
				<li class="navigation__list-item selected">
					<font-awesome-icon icon="fa-solid fa-blog"/>
					<router-link to="/blog">Pending blog</router-link>
				</li>
				<li class="navigation__list-item">
					<font-awesome-icon icon="fa-solid fa-user"/>
					User Accounts
				</li>
			</ul>
		</div>
		<div class="main">
			<div class="main__header">
				<div class="main__header--left">
					Header Name
				</div>
				<div class="main__header--right">
					<div class="main__header-search">
						<input type="text" name="" class="search" placeholder="Search">
						<div class="search__menu">

						</div>
					</div>
					<div class="main__header-bell icon">
						<font-awesome-icon icon="fa-solid fa-bell" />
					</div>
					<div class="main__header-user icon">
						<font-awesome-icon icon="fa-solid fa-circle-user" />
					</div>
				</div>
			</div>
			<div class="main__content">
				<router-view></router-view>
			</div>

            
		</div>
	</div>
</template>
<script>
    import '@fortawesome/vue-fontawesome';
    import { ref } from 'vue';
	import {RouterView, RouterLink} from 'vue-router';

    export default {
        name: 'Admin',
        setup(props) {
            
        }
    }
</script>
<style scoped>
    @import url('../temp/css/admin.css');
	.navigation {
		background: url('@/temp/css/assets/images/sidebar/sidebar-2.32103624.jpg') center / cover no-repeat;
		background-color: rgba(0,0,0, 0.3);
		position: relative;
		z-index: 1;
	}
	.navigation::after {
		display: block;
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(27,27,27,.87);
		opacity: .85;
		top: 0;
		left: 0;
		z-index: 2;
	}
	a {
		text-decoration: none;
		color: #fff;
	}
	svg {
		min-width: 20px;
	}
</style>