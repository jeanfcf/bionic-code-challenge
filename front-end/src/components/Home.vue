<template>
  <b-container class="bv-example-row bv-example-row-flex-cols mt-5">
    <b-row class="text-center" align-v="center">
      <b-col
        ><b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
      /></b-col>
      <b-col>
        <b-form-group label="Select a type to filter: ">
          <b-form-select
            label="Type"
            v-model="filterOptions.alarmName"
            :options="options.alarmName"
            size="sm"
            class="mx-5" /></b-form-group
      ></b-col>

      <b-col>
        <b-form-group label="Select a device type to filter: "
          ><b-select
            label="Device Type"
            v-model="filterOptions.deviceName"
            :options="options.deviceName"
            size="sm"
            class="mx-5"
          /> </b-form-group
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
        />
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
      options: { alarmName: ["none"], deviceName: ["none"] },
      filterOptions: { alarmName: "none", deviceName: "none" },
      page: 1,
      perPage: 5,
      currentPage: 1,
    };
  },
  mounted() {
    this.list();
    this.update();
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
    reset: async function () {
      try {
        await axios.delete(`http://localhost:8082/alarm`);
        this.filterOptions.alarmName = "none";
        this.filterOptions.deviceName = "none";
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
        this.options.alarmName = [
          "none",
          ...this.unique(response.data, "alarmName"),
        ].sort();
        this.options.deviceName = [
          "none",
          ...this.unique(response.data, "deviceName"),
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
          (el.alarmName === this.filterOptions.alarmName &&
            el.deviceName === this.filterOptions.deviceName) ||
          (this.filterOptions.alarmName == "none" &&
            this.filterOptions.deviceName == "none") ||
          (this.filterOptions.alarmName == "none" &&
            el.deviceName === this.filterOptions.deviceName) ||
          (el.alarmName === this.filterOptions.alarmName &&
            this.filterOptions.deviceName == "none")
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