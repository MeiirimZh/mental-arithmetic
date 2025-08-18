import { useState } from "react"
import Header from "../../components/Header/Header"

export default function TrainingPage({ minNum, maxNum, pickRandom }) {
    // The percentage at which larger numbers are selected when adding and substracting
    const [ASPercent, setASPercent] = useState(0.8)
    // The percentage at which smaller numbers are selected when multiplying and dividing
    const [MDPercent, setMDPercent] = useState(0.8)
    const operations = ["+", "-", "*", "/"]

    function generateTermsCount() {
        return Math.floor(
            Math.random() * (maxNum - minNum + 1)
        ) + minNum
    }

    function generateOperations(count) {
        let array = []

        for (let i = 0; i < count; i++) {
            array.push(pickRandom(operations))
        }

        return array
    }
    
    return (
        <>
            <Header></Header>
        </>
    )
}