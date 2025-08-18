import Header from "../../components/Header/Header"

export default function TrainingPage({ minNum, maxNum, pickRandom }) {
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