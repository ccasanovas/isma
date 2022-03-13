<template>
		<header>
			<div class="container-fluid">
				<section class="main">
				
				<router-link v-if="url" :to="url">
					<div class="action-first">
							<img src="@/assets/img/icons/arrow-back-white.svg" class="icon icon-lg icon-arrow-back" alt="">
					</div>
					</router-link>
					<router-link v-if="url" :to="url">
					<div class="title">
						<h1 class="btn back_header">{{title}}</h1>
					</div>
						</router-link>
					<div class="action-second">
						<span></span>
					</div>
					
				
				</section>
			</div>
		</header>
</template>

<script>
export default {
	props: ['title', 'url']
}
</script>