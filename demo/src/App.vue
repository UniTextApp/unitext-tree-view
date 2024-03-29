<template>
  <div class="navbar">
    <div class="head">
      <div class="title">
        UniText
        <br />
        Tree View
        <br />
        <span class="version">v{{ pkg.version }}</span>
      </div>
      <a target="_blank" :href="pkg.homepage" title="Home Page">Home Page</a>
      <a target="_blank" :href="pkg.repository" title="GitHub">GitHub</a>
      <a target="_blank" href="//www.npmjs.com/package/@palmcivet/unitext-tree-view" title="NPM">NPM</a>
    </div>

    <ul>
      <li
        v-for="(comp, index) in componentList"
        :key="index"
        :class="{ active: comp === activeComponent }"
        @click="activeComponent = comp"
      >
        {{ comp }}
      </li>
    </ul>
  </div>

  <div class="container">
    <component :is="activeComponent" />
  </div>

  <canvas ref="monitorRef"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import ListViewDemo from "./components/ListViewDemo.vue";
import TreeViewDemo from "./components/TreeViewDemo.vue";
import SplitViewDemo from "./components/SplitViewDemo.vue";
import ScrollbarDemo from "./components/ScrollbarDemo.vue";
import Monitor from "./monitor";
import pkg from "../../package.json";

export default defineComponent({
  name: "App",

  components: {
    ListViewDemo,
    TreeViewDemo,
    SplitViewDemo,
    ScrollbarDemo,
  },

  setup() {
    const componentList = [ScrollbarDemo.name, ListViewDemo.name, TreeViewDemo.name, SplitViewDemo.name];
    const activeComponent = ref(SplitViewDemo.name);
    const monitorRef = ref<HTMLCanvasElement>();

    onMounted(() => {
      Monitor(monitorRef.value!);
    });

    return {
      activeComponent,
      componentList,
      monitorRef,
      pkg,
    };
  },
});
</script>

<style lang="less">
ul,
ol,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

.refs {
  width: 250px;
  height: 80%;
  background: #2c3e50;
  color: #bfbfbf;
}

.controls {
  height: 80px;
  margin-top: 20px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;

  @media screen and (max-width: 1024px) {
    min-width: 1024px;
    min-height: 768px;
  }

  .navbar {
    width: 220px;
    padding: 0 10px;
    box-sizing: border-box;

    .head {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      padding-bottom: 80px;

      .title {
        font-weight: bolder;
        font-size: 1.4em;
        margin-bottom: 1em;
      }

      .version {
        font-weight: normal;
        font-size: 0.8em;
      }

      a {
        width: fit-content;
      }
    }

    li {
      height: 1em;
      line-height: 1em;
      font-weight: 500;
      padding: 6px;
      margin: 8px;
      color: #165dff;
      background-color: #fff;
      text-align: center;
      cursor: pointer;
      border: 2px solid #165dff;

      &:hover,
      &.active {
        font-weight: 600;
        color: #fbfbfb;
        background-color: #165dff;
        border: 2px solid transparent;
      }
    }
  }

  .container {
    box-sizing: border-box;
    border: 2px solid #165dff;
    height: calc(100% - 10px * 2);
    width: calc(100% - 220px);
    margin: 0 10px;

    .demo {
      box-sizing: border-box;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 40px;

      .description {
        width: 40%;
      }
    }
  }
}
</style>
