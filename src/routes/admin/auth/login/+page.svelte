<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex flex-col">
	<a href="/" class="btn variant-outline-primary">Scouter View</a>
	<div class="row flex-center flex">
		<div class="col-6 form-widget">
			<Auth
				supabaseClient={data.supabase}
				view="magic_link"
				redirectTo={`${data.url}/admin/auth/callback`}
				showLinks={false}
				appearance={{ theme: ThemeSupa }}
			/>
		</div>
	</div>
</div>
