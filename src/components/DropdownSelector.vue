<template>
	<div class="container" v-if="options && options.length ">
		<h2 class="section-header max_header" v-if="current_option">
			<div class="btn-group">
				<button
					type="button"
					class="btn btn-light btn-lg dropdown-toggle"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false">
					{{current_option.title || current_option.name}}
				</button>
				<div class="dropdown-menu">
					<button
						@click="selectOption(option)"
						v-for="option in options"
						class="dropdown-item available-option"
						type="button">
						{{option.title || option.name}}
					</button>
				</div>
			</div>
		</h2>
	</div>
</template>


<script>
export default {
	name: 'dropdown-selector',
	props: ['options', 'default'],
	data: function()
	{
		return {
			current_option: {}
		}
	},
	watch:
	{
		default:
		{
			immediate: true,
			handler(option)
			{
				this.current_option = option;
			}
		}
	},
	methods:
	{
		selectOption(option)
		{
			this.current_option = option;
			this.$emit('selected', this.current_option);
		}
	}
}
</script>