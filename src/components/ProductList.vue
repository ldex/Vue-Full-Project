<template>
    <div>
        <h2>{{ title }}</h2>
        <fieldset class="filters">
          {{itemsNumber}} products |
          Sort by:
          <button @click="sort('name')">Name</button>
          <button @click="sort('price')">Price</button>
          <button @click="sort('modifiedDate')">Date</button>
          <span> Filter by name: <input v-model="filterName" /></span>
        </fieldset>
        <ul class="products">
            <router-link
              v-for="product in sortedFilteredPaginatedItems" v-bind:key="product.id"
              :to="'/product/' + product.id"
              custom v-slot="{ navigate }">
              <li role="link"
                  class="text"
                  v-bind:class='{ discontinued: product.discontinued, selected: product === selectedItem }'
                  :title="JSON.stringify(product)"
                   @click="navigate"
                  >
                <slot :product="product">
                    {{ product.name }}
                </slot>
              </li>
            </router-link>
        </ul>

        <div class="right" v-if="loggedIn">
            <router-link to="/product/insert">Create new product...</router-link>
        </div>

        <button @click="prevPage" :disabled="pageNumber === 1">
            &lt; Previous
        </button>
        Page {{ pageNumber }}
        <button @click="nextPage" :disabled="pageNumber >= pageCount">
            Next &gt;
        </button>
    </div>
</template>

<script setup>
import useList from "@/composables/items-list";
import { defineProps } from "vue";
import { useProductStore } from '@/stores/product'

const store = useProductStore()

const props = defineProps({
      products: {
        type: Array
      },
      pageSize: {
        type: Number,
        required: false,
        default: 5
      },
      title: {
        type: String,
        default: "Products"
      }
});

const loggedIn = store.loggedIn;

const { sort, nextPage, prevPage, filterName, pageNumber, pageCount, sortedFilteredPaginatedItems, itemsNumber } = useList(props.products, props.pageSize, "modifiedDate", "desc")
</script>

<style lang="css" scoped>
.filters {
    padding: 10px
}

.products {
    margin: 0;
    list-style-type: none;
    padding: 0;
}

.products li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0em;
    height: 1.8em;
    border-radius: 4px;
}

.products li:hover {
    color: #607D8B;
    background-color: yellow;
    left: .1em;
}

.products li:hover .name,
.products li:hover .price {
    color: #607D8B;
    background-color: #FFD800;
    left: .1em;
}

.products li.selected {
    background-color: #0094FF;
    color: white;
}

.products li.selected:hover {
    color: white;
}

.products li.selected .name,
.products li.selected .price {
    background-color: #0026FF;
    color: white;
}

.products .text {
    padding: 0.5em 0.7em 0em 0.7em;
    line-height: 1em;
    left: -1px;
    top: -4px;
    height: 1.8em;
}

.products .name {
    display: inline-block;
    color: white;
    padding: 0.5em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0px 0px 4px;
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.products .price {
    float: right;
    width: 15%;
    color: white;
    padding: 0.5em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-left: .8em;
    border-radius: 0px 4px 4px 0px;
}

.products .description {
    height: 1.8em;
    display: inline-block;
    width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.products .discontinued,
.products .discontinued * {
    color: red !important;
}
</style>