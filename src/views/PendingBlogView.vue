<template>
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

    <ModalForm v-if="isModalShow" @closeModal="closeModal"/>
</template>
<script>

import ModalForm from '../components/ModalForm.vue';
import { ref } from 'vue';

export default {
    components: {ModalForm},
    setup(props) {
        const isModalShow = ref(false);
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
<style>
    @import url('../temp/css/admin.css');
</style>