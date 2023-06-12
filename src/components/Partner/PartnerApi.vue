<template>
  <div class="">
    <div class="text-xl font-bold">API Key</div>
    <div class="text-base text-neutral-500 mb-6">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis malesuada diam convallis scelerisque. Cras scelerisque dui tempor cursus varius. Sed purus libero, varius sit amet ex
      condimentum, consequat rhoncus eros. Vestibulum et mi tristique, mattis justo at, porta tellus. Curabitur libero elit.
    </div>
    <div class="flex gap-6 w-1/2">
      <div class=" w-1/2">
        <TextField type="text" :value="apiKey" :disabled="true" />
      </div>
      <div class="flex gap-4">
        <Button buttonText="Revoke" type="primary" />
        <Button buttonText="Generate" type="secondary" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    TextField: () => import(/* webpackChunkName: "TextField" */ '@/components/Forms/TextField'),
    Button: () => import(/* webpackChunkName: "Button" */ '@/components/Forms/Button')
  },
  data: () => ({
    apiKey: 'abjbu121821822jhjko'
  })
}
</script>
