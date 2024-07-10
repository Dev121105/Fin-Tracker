import React from 'react'
import "./style.css"
import { Card, Row } from 'antd'
import Buttons from '../Buttons'

function Cards({
  income,
  expenses,
  currentBalance,
  showExpenseModal,
  showIncomeModal}) {
  return (
    <div>
        <Row className='my-row'>

        <Card bordered={true} className='my-card'>
        <h2>Current Balance</h2>
        <p>₹{currentBalance}</p>
        {/* <Buttons text={"Reset Balance"} blue={true} /> */}
      </Card>

      <Card bordered={true} className='my-card'>
        <h2>Total Income</h2>
        <p>₹{income}</p>
        <Buttons text={"Add Income"} blue={true} onCLick={showIncomeModal} />
      </Card>

      <Card bordered={true} className='my-card'>
        <h2>Total Expenses</h2>
        <p>₹{expenses}</p>
        <Buttons text={"Add Expence"} blue={true} onCLick={showExpenseModal} />
      </Card>
        </Row> 
    </div>
  )
}

export default Cards