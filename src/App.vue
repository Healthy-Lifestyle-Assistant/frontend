<template>
	<NavbarComponent />
	<div class="container container-custom">
		<router-view></router-view>
	</div>
</template>

<script>
import NavbarComponent from "./components/common/NavbarComponent.vue"

export default {
	name: "App",

	components: {
		NavbarComponent
	}
}
</script>
