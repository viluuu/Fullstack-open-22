import { useState } from 'react'


const Header = ({text}) => {
  return(
    <div>
      <h1>
        {text}
      </h1>
    </div>
  )
}

const StatisticLine = (props) => (
   <div>
    {props.text} {props.value} {props.sign}
  </div>
  )


const Button = (props) => (
  <button onClick={props.handleClick}>
  {props.text}
  </button>
)

const Statistics = (props) => {
  if ((props.good + props.neutral + props.bad) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <table>
        <tr>
          <td> <StatisticLine text = "good" /> </td>
          <td> <StatisticLine value = {props.good} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text = "neutral" /> </td>
          <td> <StatisticLine value = {props.neutral} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text = "bad" /> </td>
          <td> <StatisticLine value = {props.bad} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text = "all" /> </td>
          <td> <StatisticLine value = {props.good + props.neutral + props.bad} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text = "average" /> </td>
          <td> <StatisticLine value = {(props.good - props.bad) / (props.good + props.neutral + props.bad)} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text = "positive" /> </td>
          <td> <StatisticLine value = {props.good / (props.good + props.neutral + props.bad) * 100} sign = {<t>%</t>} /> </td>
        </tr>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <Header text = "give feedback"/>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <Header text = "statistics"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App


