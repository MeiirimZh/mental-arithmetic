import { useState } from "react"
import Header from "../../components/Header/Header"
import Background from "../../components/Background/Background"
import Text from "../../components/Text/Text"
import TextEdit from "../../components/TextEdit/TextEdit"

export default function TrainingPage({ minTermCount, maxTermCount, minNum, maxNum, pickRandom, rangeRandom }) {
    // The percentage at which larger numbers are selected when adding and substracting
    const [ASPercent, setASPercent] = useState(0.8)
    // The percentage at which smaller numbers are selected when multiplying and dividing
    const [MDPercent, setMDPercent] = useState(0.8)

    const [answer, setAnswer] = useState()
    const [problem, setProblem] = useState(createProblemStr())

    function handleAnswerChange(event) {
        setAnswer(event.target.value)
    }

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

    function createProblemStr() {
        let problem = generateProblem(generateTerms())
        let numbers = problem[0]
        let operations = problem[1]

        let string = []

        for (let i = 0; i < numbers.length; i++) {
            if (i === numbers.length - 1) {
                string.push(numbers[i])
                break
            }

            string.push(numbers[i])
            string.push(operations[i])
        }

        return string.join(" ")
    }

    return (
        <div className="wrapper">
            <Header></Header>

            <Background bgColor="#F0828C" width="600px" height="200px" borderRadius="20px"
            centerH="center" centerV="center" shadow="rgba(0, 0, 0, 0.25) 6px 6px 4px"
            margin="0 auto 40px auto">
                <Text fontFamily="Rubik" fontSize="64px" color="#fff">{ problem }</Text>
            </Background>

            <TextEdit value={ answer } onChange={ handleAnswerChange }
            width="200px" height="40px" fontFamily="Rubik" fontSize="24px"
            bgColor="#fff" color="#3f3f3f" borderRadius="10px" shadow="rgba(0, 0, 0, 0.25) 6px 6px 4px"
            centerH={ true } textIndent="10px" placeholder="Ответ..." />
        </div>
    )
}