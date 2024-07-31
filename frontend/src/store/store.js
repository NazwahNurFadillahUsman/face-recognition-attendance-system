// store.js

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employees: [],
    attendanceRecords: [],
    isLoading: false,
    error: null
  },
  mutations: {
    SET_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    SET_ATTENDANCE_RECORDS(state, records) {
      state.attendanceRecords = records;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchEmployees({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.get('/api/employees');
        commit('SET_EMPLOYEES', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchAttendanceRecords({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.get('/api/attendance');
        commit('SET_ATTENDANCE_RECORDS', response.data);
      } catch (error) {
        commit('SET_ERROR', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async markAttendance({ commit }, employeeId) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.post('/api/attendance', { employeeId });
        // Fetch updated attendance records after marking attendance
        const updatedRecords = await axios.get('/api/attendance');
        commit('SET_ATTENDANCE_RECORDS', updatedRecords.data);
      } catch (error) {
        commit('SET_ERROR', error);
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    allEmployees: state => state.employees,
    allAttendanceRecords: state => state.attendanceRecords,
    isLoading: state => state.isLoading,
    error: state => state.error
  }
});

