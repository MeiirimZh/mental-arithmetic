import Header from "../../components/Header/Header"

export default function TrainingPage({ minNum, maxNum }) {
    function generateTermsCount() {
        return Math.floor(
            Math.random() * (maxNum - minNum + 1)
        ) + minNum
    }
    
    return (
        <>
            <Header></Header>
        </>
    )
}