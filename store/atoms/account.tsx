import {atom} from "recoil"

export const accountAtom = atom({
    key: "accountAtom",
    default : ""
})

export const providerAtom = atom({
    key: "providerAtom",
    default : null
})

export const contractAtom = atom({
    key: "contractAtom",
    default : null
})