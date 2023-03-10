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
					Pending blog
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
				<div class="main__content-table">
					<table>
						<thead>
							<tr>
								<th>Blog ID</th>
								<th>User ID</th>
								<th>Username</th>
								<th>Description</th>
								<th>Created Date</th>
								<th>Accept</th>
								<th>Deny</th>
							</tr>
						</thead>
						<tbody>
							<tr @dblclick="toggleModal">
								<td>#001</td>
								<td>1</td>
								<td>khanhnguyen</td>
								<td class="table__description">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Nulla saepe perferendis nemo amet sit rem perspiciatis cum, rerum numquam laboriosam
									ipsum a aliquid sequi nostrum labore ab! Obcaecati, vel accusamus!</td>
								<td class="date">06/02/23</td>
								<td>
									<button class="button--accept">Accept</button>
								</td>
								<td>
									<button class="button--deny">Deny</button>
								</td>
							</tr>
							<tr>
								<td>#001</td>
								<td>2</td>
								<td>khanhnguyen</td>
								<td class="table__description">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Nulla saepe perferendis nemo amet sit rem perspiciatis cum, rerum numquam laboriosam
									ipsum a aliquid sequi nostrum labore ab! Obcaecati, vel accusamus!</td>
								<td></td>
								<td>
									<button class="button--accept">Accept</button>
								</td>
								<td>
									<button class="button--deny">Deny</button>
								</td>
							</tr>
							<tr>
								<td>#001</td>
								<td>3</td>
								<td>khanhnguyen</td>
								<td class="table__description">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Nulla saepe perferendis nemo amet sit rem perspiciatis cum, rerum numquam laboriosam
									ipsum a aliquid sequi nostrum labore ab! Obcaecati, vel accusamus!</td>
								<td></td>
								<td>
									<button class="button--accept">Accept</button>
								</td>
								<td>
									<button class="button--deny">Deny</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

            <ModalForm v-if="isModalShow" @closeModal="closeModal"/>
		</div>
	</div>
</template>
<script>
    import '@fortawesome/vue-fontawesome';
    import ModalForm from '../components/ModalForm.vue';

    import { ref } from 'vue';

    export default {
        name: 'Admin',
        components: {ModalForm},
        setup(props) {
            let isModalShow = ref(false);
            const toggleModal = () => {
                isModalShow.value = !isModalShow.value;
            };
			const closeModal = (closeForm) => {
				isModalShow.value = closeForm;
			}
            return {isModalShow, toggleModal, closeModal};
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
</style>