import { db } from '../../firebase-config'
import { collection, getDocs } from "firebase/firestore";

export function getHomeProducts() {
    return getDocs(collection(db, "homeProducts"))
}

export function getWomenFashionProducts() {
    return getDocs(collection(db, "womenFashion"))
}

export function getMenFashionProducts() {
    return getDocs(collection(db, "menFashion"))
}
