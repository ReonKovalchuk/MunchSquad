import { type QuerySnapshot } from 'firebase/firestore'
import { DateTime } from 'luxon'

export const getTitle = (day: DateTime) => {
  return day.setLocale('ru').toLocaleString({ day: 'numeric', month: 'short', weekday: 'short' })
}
export const readQuerySnapshot = (querySnapshot: QuerySnapshot) => {
  const firestoreData = <any[]>[]
  querySnapshot.forEach((doc: any) => {
    // doc.data() is never undefined for query doc snapshots
    firestoreData.push({ id: doc.id, ...doc.data() })
  })
  return firestoreData
}

export const handleImgError = (e: any) => {
  e.target.src = '/placeholder-image.png'
}

export const isToday = (day: DateTime) => {
  return DateTime.now().startOf('day').toMillis() == day.toMillis()
}

export const isRecipe = (id: string) => {
  return id.includes('rec')
}
