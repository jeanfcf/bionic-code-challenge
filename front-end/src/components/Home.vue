<template>
  <b-container class="bv-example-row bv-example-row-flex-cols mt-5">
    <b-row class="text-center" align-v="center">
      <b-col
        ><b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
        ></b-pagination
      ></b-col>
      <b-col>
        <b-form-group label="Select a type to filter: ">
          <b-form-select
            label="Type"
            v-model="filterOptions.type"
            :options="options.type"
            size="sm"
            class="mx-5"
          ></b-form-select> </b-form-group
      ></b-col>

      <b-col>
        <b-form-group label="Select a device type to filter: "
          ><b-select
            label="Device Type"
            v-model="filterOptions.deviceType"
            :options="options.deviceType"
            size="sm"
            class="mx-5"
          ></b-select> </b-form-group
      ></b-col>
    </b-row>

    <b-row>
      <div class="w-100">
        <p><b>Current Page:</b> {{ currentPage }}</p>
      </div>
      <div>
        <b-table
          :items="filteredAlarms"
          :per-page="perPage"
          :current-page="currentPage"
          responsive
        ></b-table>
      </div>
    </b-row>

    <b-row align-v="end">
      <b-button variant="danger" @click="reset()">Reset</b-button>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  props: {},
  data() {
    return {
      alarms: [],
      filteredAlarms: [],
      windowHeight: window.innerHeight,
      options: { type: ["none"], deviceType: ["none"] },
      filterOptions: { type: "none", deviceType: "none" },
      page: 1,
      perPage: 0,
      currentPage: 1,
    };
  },
  mounted() {
    this.perPage = this.windowHeight * 0.01;
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.list();
    this.update();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  computed: {
    rows() {
      return this.filteredAlarms.length;
    },
  },
  watch: {
    filterOptions: {
      deep: true,
      handler() {
        this.filteredAlarms = this.filter(this.alarms);
      },
    },
  },
  methods: {
    onResize: function () {
      this.windowHeight = window.innerHeight;
      this.perPage = this.windowHeight * 0.01;
    },
    reset: async function () {
      try {
        await axios.delete(`http://localhost:8082/alarm`);
        this.filterOptions.type = "none";
        this.filterOptions.deviceType = "none";
        this.alarms = [];
      } catch (error) {
        console.error(error);
      }
    },
    list: async function () {
      try {
        const response = await axios.get(`http://localhost:8082/alarm`);
        this.alarms = response.data;
        this.filteredAlarms = this.filter(this.alarms);
        this.options.type = [
          "none",
          ...this.unique(response.data, "type"),
        ].sort();
        this.options.deviceType = [
          "none",
          ...this.unique(response.data, "deviceType"),
        ].sort();
      } catch (error) {
        console.error(error);
      }
    },
    update: function () {
      setInterval(() => {
        this.list();
      }, 1000);
    },

    filter: function (all) {
      return all.filter((el) => {
        if (
          (el.type === this.filterOptions.type &&
            el.deviceType === this.filterOptions.deviceType) ||
          (this.filterOptions.type == "none" &&
            this.filterOptions.deviceType == "none") ||
          (this.filterOptions.type == "none" &&
            el.deviceType === this.filterOptions.deviceType) ||
          (el.type === this.filterOptions.type &&
            this.filterOptions.deviceType == "none")
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
    unique: function (arr, prop) {
      var hash = {},
        result = [];
      for (var i = 0, l = arr.length; i < l; ++i) {
        if (!Object.prototype.hasOwnProperty.call(hash, arr[i][prop])) {
          hash[arr[i][prop]] = true;
          result.push(arr[i][prop]);
        }
      }
      return result;
    },
  },
};
</script>