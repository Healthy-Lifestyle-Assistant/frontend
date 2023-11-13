<template>
	<NavbarComponent />
	<div class="container container-custom">
		<router-view></router-view>
	</div>
</template>

<script>
import NavbarComponent from "./share/components/NavbarComponent.vue";

export default {
	name: "App",

	components: {
		NavbarComponent
	}
}
</script>
