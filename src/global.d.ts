/// <reference types="@sveltejs/kit" />
declare module '*.svg?component' {
  import { SvelteComponent } from 'svelte'
  const content: SvelteComponent
  export default content
}
