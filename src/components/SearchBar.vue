<template>
  <div class="search-input">
    <input
      type="text"
      class="search-input__input"
      name="client-search"
      v-model="query"
      :placeholder="placeholder"
      v-on:input="callback(query)"/>
    <span class="search-input__suffix">
      <icon name="search" class="search-input__icon"></icon>
    </span>
  </div>
</template>

<script>
import 'vue-awesome/icons/search';

export default {
  name: 'search-bar',
  data() {
    return {
      query: '',
    };
  },
  props: {
    placeholder: String,
    callback: Function,
  },
};
</script>

<style lang="scss">
.search-input {
  position: relative;
  width: 800px;
  margin: auto;
  overflow: hidden;

  .search-input__input {
    -webkit-appearance: none;
    border: 0;
    border-bottom: 1px solid #afafaf;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0;
    padding-left: 40px;
    width: 100%;
    background-color: transparent;
    font-size: 1em;
  }

  .search-input__suffix {
    position: absolute;
    height: 100%;
    left: 5px;
    top: 12px;
    text-align: center;

    .search-input__icon {
        width: 25px;
        line-height: 40px;
    }
  }
}
</style>
