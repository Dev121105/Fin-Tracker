import React from 'react'
import "./style.css"
import { Line, Pie } from '@ant-design/charts';
function Chart({sortedTransaction}) {

    const data = sortedTransaction.map((item)=>{return {date: item.date, amount:item.amount}})

    const spendingData = sortedTransaction.filter((transaction)=>{if(transaction.type == "expense"){
        return {tag: transaction.tag, amount:transaction.amount}
    }})

    let finalSpending = spendingData.reduce((acc,obj)=>{
        let key = obj.tag;
        if(!acc[key]){
            acc[key] = {tag:obj.tag,amount:obj.amount}
        }else{
            acc[key].amount += obj.amount
        }
        return acc;
    },{});

    let newSpendings = [
        {tag:"food",amount:0},
        {tag:"education",amount:0},
        {tag:"miscellenous",amount:0},
        {tag:"online",amount:0},
        ]
    spendingData.forEach((item) => {
        if(item.tag=="food"){
            newSpendings[0].amount += item.amount;
        }else if(item.tag=="education"){
            newSpendings[1].amount += item.amount;
        }else if(item.tag=="miscellenous"){
            newSpendings[2].amount += item.amount;
        }else{
            newSpendings[3].amount += item.amount;
        }
    }); 


      const config = {
        data: data,
        width:800,
        height:400,
        xField: 'date',
        yField: 'amount',
      };
      const spendingConfig = {  
        data: newSpendings,
        width:800,
        height:400,
        angleField:'amount',
        colorField: 'tag',
      };
  return (
    <div className='chart-wrapper'>
        <div>
            <h2 style={{color:"black"}}>Your Analytics</h2>
            <Line {...config} className="chart" />;
        </div>
        <div>
            <h2 style={{color:"black"}}>Your Spendings</h2>
            <Pie {...spendingConfig} className="pieChart" />;
        </div>
    </div>
  )
}

export default Chart