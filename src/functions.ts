import { query, where, type QuerySnapshot, type CollectionReference } from 'firebase/firestore'

export const readQuerySnapshot = (querySnapshot: QuerySnapshot) => {
  const firestoreData = <any[]>[]
  querySnapshot.forEach((doc: any) => {
    // doc.data() is never undefined for query doc snapshots
    firestoreData.push({ id: doc.id, ...doc.data() })
  })
  return firestoreData
}

// export const uidQuery = (colRef: CollectionReference, uid: string) => {
//   return query(colRef, where('uid', '==', uid))
// }
