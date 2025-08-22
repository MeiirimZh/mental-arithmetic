import { useState } from "react"
import Header from "../../components/Header/Header"
import Background from "../../components/Background/Background"

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

        return [numbers, operations]
    }

    function createProblemStr(numbers, operations) {
        let string = []

        for (let i = 0; i < numbers.length; i++) {
            if (i === numbers.length - 1) {
                string.push(numbers[i])
                break
            }

            string.push(numbers[i])
            string.push(operations[i])
        }

        return string.join("")
    }

    let problem = generateProblem(generateTerms())
    let problemStr = createProblemStr(problem[0], problem[1])

    return (
        <>
            <Header></Header>
            <h2>{ problemStr }</h2>
            <h2>{ eval(problemStr) }</h2>

            <Background bgColor="#ffffff" padding={ [111, 62] }>
                <h2>Background</h2>
            </Background>
        </>
    )
}