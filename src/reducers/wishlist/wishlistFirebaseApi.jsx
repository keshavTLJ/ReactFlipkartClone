import { db, auth } from '../../firebase-config'
import { getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

export function getWishlistItems() {
    return getDoc(doc(db, "users", auth.currentUser?.uid))
}

export function addWishlistItem(product) {
    return updateDoc(doc(db, "users", auth.currentUser?.uid), {
        wishlist: arrayUnion(product)
    })
}

export function deleteWishlistItem(item) {
    return updateDoc(doc(db, "users", auth.currentUser?.uid), {
        wishlist: arrayRemove(item)
    })
}