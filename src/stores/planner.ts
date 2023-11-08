import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe, Restaurant, PlannerDay, Meal } from '@/types/types'

export const usePlannerStore = defineStore('planner', () => {
  function getWeekMenu(firstDay: Date) {
    const lastDay = new Date(firstDay.setDate(firstDay.getDate() + 6))
    let planner
    try {
      // @ts-ignore
      planner = JSON.parse(window.localStorage.getItem('planner')) || []
    } catch (error) {
      console.log('ошибка при получении данных из хранилища:', error)
      planner = []
    }
    return planner.filter((day: PlannerDay) => {
      return day.date >= firstDay && day.date <= lastDay
    })
  }

  function getDayMenu(date: Date) {
    let planner
    try {
      // @ts-ignore
      planner = JSON.parse(window.localStorage.getItem('planner')) || []
    } catch (error) {
      console.log('ошибка при получении данных из хранилища:', error)
      planner = []
    }
    return planner.filter((day: PlannerDay) => {
      return day.date === date
    })
  }
  // const recipes = ref<PlannerDay[]>(getWeekMenu())

  function addNewMenuItem(date: Date, meal: Meal) {}

  function removeMenuItem(id: string) {}
  return
})
