import { type QuerySnapshot } from 'firebase/firestore'

export const readQuerySnapshot = (querySnapshot: QuerySnapshot) => {
  const firestoreData = <any[]>[]
  querySnapshot.forEach((doc: any) => {
    // doc.data() is never undefined for query doc snapshots
    firestoreData.push({ id: doc.id, ...doc.data() })
  })
  return firestoreData
}

export function handleImgError(e: any) {
  e.target.src = '/placeholder-image.png'
}
