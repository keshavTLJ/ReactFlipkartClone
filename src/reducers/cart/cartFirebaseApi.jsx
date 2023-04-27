import { db, auth } from '../../firebase-config'
import { getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove, runTransaction } from 'firebase/firestore'

export function getCartItems() {
    return getDoc(doc(db, "users", auth.currentUser?.uid))
}

export function addCartItem(product) {
    return updateDoc(doc(db, "users", auth.currentUser?.uid), {
        cart: arrayUnion(product)
    })
}

export function deleteCartItem(item) {
    return updateDoc(doc(db, "users", auth.currentUser?.uid), {
        cart: arrayRemove(item)
    })
}

