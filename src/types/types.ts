export interface Recipe {
  id: string
  link?: string
  linkToImage?: string
  name?: string
  course?: Course
  description?: string
  uid: string
}

export enum CourseEnum {
  'Первое' = 1,
  'Второе',
  'Салат',
  'Десерт'
}
export type Course = keyof typeof CourseEnum

export interface Restaurant {
  id: string
  name?: string
  link?: string
  linkToImage?: string
  review?: string
  uid: string
}

export interface PlannerDay {
  id: string
  dinnerId?: string
  supperId?: string
  uid: string
}
