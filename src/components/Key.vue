<template>
  <span class="key"><slot/></span>
</template>

<style>
.key {
  color: whitesmoke;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  padding: 5px 7px;
  border-radius: 3px;
  min-width: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255,255,255,0.1);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.05),
    0 3px 0 rgba(255,255,255,0.05);
}
</style>