import { useState } from "react"
import Header from "../../components/Header/Header"

export default function TrainingPage({ minTermCount, maxTermCount, minNum, maxNum, pickRandom, rangeRandom }) {
    // The percentage at which larger numbers are selected when adding and substracting
    const [ASPercent, setASPercent] = useState(0.8)
    // The percentage at which smaller numbers are selected when multiplying and dividing
    const [MDPercent, setMDPercent] = useState(0.8)

    function checkDivisibility(i, numbers, operations) {
        if (i === 0) {
            if (numbers[i] % numbers[i + 1] === 0) {
                return true
            }
        }
        else {
            if (operations[i - 1] === '*') {
                if ((numbers[i - 1] * numbers[i]) % numbers[i + 1] === 0) {
                    return true
                }
            }
        }
    }
    
    function generateTermCount() {
        return rangeRandom(minTermCount, maxTermCount)
    }

    function generateTerms() {
        let count = generateTermCount()
        let numbers = []

        for (let i = 0; i < count; i ++) {
            numbers.push(rangeRandom(minNum, maxNum))
        }

        return numbers
    }

    function generateProblem(numbers) {
        let operations = []
        
        for (let i = 0; i < numbers.length; i++) {
            if (i === numbers.length - 1) {
                break
            }

            let chance = Math.round(Math.random() * 10) / 10

            if (numbers[i] > maxNum / 2 || numbers[i + 1] > maxNum / 2) {
                if (ASPercent >= chance) {
                    operations.push(pickRandom(["+", "-"]))
                }
                else {
                    if (checkDivisibility(i, numbers, operations)) {
                        operations.push(pickRandom(["*", "/"]))
                        continue
                    }
                    operations.push("*")   
                }
            }
            else {
                if (MDPercent >= chance) {
                    if (checkDivisibility(i, numbers, operations)) {
                        operations.push(pickRandom(["*", "/"]))
                        continue
                    }
                    operations.push("*")  
                }
                else {
                    operations.push(pickRandom(["+", "-"]))
                }     
            }
        }

        return `${numbers}: ${operations}`
    }

    return (
        <>
            <Header></Header>
            <h2>{ generateProblem(generateTerms()) }</h2>
        </>
    )
}