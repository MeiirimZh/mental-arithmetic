import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Background from "../../components/Background/Background"
import Text from "../../components/Text/Text"
import TextEdit from "../../components/TextEdit/TextEdit"
import Button from "../../components/Button/Button"
import HLayout from "../../components/HLayout/HLayout"
import Modal from "../../components/Modal/Modal"
import ProgressBar from "../../components/ProgressBar/ProgressBar"

export default function TrainingPage({ minTermCount, maxTermCount, minNum, maxNum, pickRandom, rangeRandom }) {
    // The percentage at which larger numbers are selected when adding and substracting
    const [ASPercent, setASPercent] = useState(0.8)
    // The percentage at which smaller numbers are selected when multiplying and dividing
    const [MDPercent, setMDPercent] = useState(0.8)

    const [answer, setAnswer] = useState()
    const [problem, setProblem] = useState(generateProblem())
    const [endTraining, setEndTraining] = useState(false)

    const [timer] = useState(10)
    const [timeLeft, setTimeLeft] = useState(timer)

    const loseTimeRef = useRef(null)
    const intervalRef = useRef(null)

    function handleAnswerChange(event) {
        setAnswer(event.target.value)

        if (event.target.value == solveProblem(problem)) {
            restartTimer()
            nextProblem()
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            checkAnswer()
        }
    }

    function checkAnswer() {
        if (answer != solveProblem(problem)) {
            setEndTraining(true)
        }
    }

    function nextProblem() {
        setProblem(generateProblem())
        setAnswer("")
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

    function restartTimer() {
        clearTimeout(loseTimeRef.current)
        clearInterval(intervalRef.current)

        setTimeLeft(timer)

        loseTimeRef.current = setTimeout(() => {
            setEndTraining(true)
        }, timer * 1000)

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev > 0) return prev - 1
                return 0
            })
        }, 1000)
    }

    useEffect(() => {
        restartTimer()
        return () => {
            clearTimeout(loseTimeRef.current)
            clearInterval(intervalRef.current)
        }
    }, [])

    return (
        <div className="wrapper">
            <Header></Header>

            <ProgressBar bgColor="#F0828C" color="#fff" bgWidth="100px" bgHeight="20px" width="80px" 
            borderRadius="10px" margin="0 auto 40px auto"/>

            <Background bgColor="#F0828C" width="600px" height="200px" borderRadius="20px"
            centerH="center" centerV="center" shadow="rgba(0, 0, 0, 0.25) 6px 6px 4px"
            margin="0 auto 40px auto">
                <Text fontFamily="Rubik" fontSize="64px" color="#fff">{ problem }</Text>
            </Background>

            <HLayout justifyContent="center" gap="10px">
                <TextEdit value={ answer } onChange={ handleAnswerChange } onKeyDown={ handleKeyDown }
                width="200px" height="40px" fontFamily="Rubik" fontSize="24px"
                bgColor="#fff" color="#3f3f3f" borderRadius="10px" shadow="rgba(0, 0, 0, 0.25) 6px 6px 4px"
                textIndent="10px" placeholder="Ответ..." />

                <Button onClick={ checkAnswer } width="40px" height="40px" 
                fontSize="24px" fontWeight="bold" bgColor="#F0828C" 
                color="#fff" borderRadius="20px"
                shadow="rgba(0, 0, 0, 0.25) 6px 6px 4px">
                    ✓
                </Button>
            </HLayout>

            <Modal isOpen={ endTraining }>
                <Text fontSize="30px" fontFamily="WDXL" color="#131313">
                    Вы проиграли!
                </Text>
                <HLayout gap="10px">
                    <Button fontFamily="Rubik" onClick={() => window.location.reload()} color="#131313">
                        Начать заново
                    </Button>
                    <Button fontFamily="Rubik"><Link className="link" to="/">На главный</Link></Button>
                </HLayout>
            </Modal>

            <Text>{timeLeft}</Text>
        </div>
    )
}