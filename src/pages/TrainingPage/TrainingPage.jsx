import { useState } from "react"
import Header from "../../components/Header/Header"
import Background from "../../components/Background/Background"
import Text from "../../components/Text/Text"
import TextEdit from "../../components/TextEdit/TextEdit"
import Button from "../../components/Button/Button"

export default function TrainingPage({ minTermCount, maxTermCount, minNum, maxNum, pickRandom, rangeRandom }) {
    // The percentage at which larger numbers are selected when adding and substracting
    const [ASPercent, setASPercent] = useState(0.8)
    // The percentage at which smaller numbers are selected when multiplying and dividing
    const [MDPercent, setMDPercent] = useState(0.8)

    const [answer, setAnswer] = useState()
    const [problem, setProblem] = useState(generateProblem())

    function handleAnswerChange(event) {
        setAnswer(event.target.value)

        if (event.target.value == solveProblem(problem)) {
            setProblem(generateProblem())
            setAnswer("")
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            if (answer != solveProblem(problem)) {
                console.log("Incorrect!")
            }
        }
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
        let terms = []

        for (let i = 0; i < count; i ++) {
            terms.push(rangeRandom(minNum, maxNum))
        }

        return terms
    }

    function returnTermsAndOperations(terms) {
        let operations = []
        
        for (let i = 0; i < terms.length; i++) {
            if (i === terms.length - 1) {
                break
            }

            let chance = Math.round(Math.random() * 10) / 10

            if (terms[i] > maxNum / 2 || terms[i + 1] > maxNum / 2) {
                if (ASPercent >= chance) {
                    operations.push(pickRandom(["+", "-"]))
                }
                else {
                    if (checkDivisibility(i, terms, operations)) {
                        operations.push(pickRandom(["*", "/"]))
                        continue
                    }
                    operations.push("*")   
                }
            }
            else {
                if (MDPercent >= chance) {
                    if (checkDivisibility(i, terms, operations)) {
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

        return [terms, operations]
    }

    function generateProblem() {
        let problem = returnTermsAndOperations(generateTerms())
        let terms = problem[0]
        let operations = problem[1]

        let string = []

        for (let i = 0; i < terms.length; i++) {
            if (i === terms.length - 1) {
                string.push(terms[i])
                break
            }

            string.push(terms[i])
            string.push(operations[i])
        }

        return string.join(" ")
    }

    function solveProblem(problem) {
        return eval(problem)
    }

    return (
        <div className="wrapper">
            <Header></Header>

            <Background bgColor="#F0828C" width="600px" height="200px" borderRadius="20px"
            centerH="center" centerV="center" shadow="rgba(0, 0, 0, 0.25) 6px 6px 4px"
            margin="0 auto 40px auto">
                <Text fontFamily="Rubik" fontSize="64px" color="#fff">{ problem }</Text>
            </Background>

            <TextEdit value={ answer } onChange={ handleAnswerChange } onKeyDown={ handleKeyDown }
            width="200px" height="40px" fontFamily="Rubik" fontSize="24px"
            bgColor="#fff" color="#3f3f3f" borderRadius="10px" shadow="rgba(0, 0, 0, 0.25) 6px 6px 4px"
            centerH={ true } textIndent="10px" placeholder="Ответ..." />

            <Button width="40px" height="40px" fontSize="24px" fontWeight="bold" 
            bgColor="#F0828C" color="#fff" borderRadius="20px">
                ✓
            </Button>
        </div>
    )
}