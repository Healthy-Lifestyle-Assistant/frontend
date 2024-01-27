<template>
	<NavbarComponent />
	<div class="container global-margins container-custom">
		<router-view></router-view>
	</div>
</template>

<script>
import NavbarComponent from "./shared/components/NavbarComponent.vue";

export default {
	name: "App",

	components: {
		NavbarComponent
	}
}
</script>
