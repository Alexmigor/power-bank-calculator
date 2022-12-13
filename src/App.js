import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';



const Input = ({remItem, id}) => {
  const [inputName, setInputName] = useState('')
  const [inputValue, setInputValue] = useState()

  // function delNode(el){el.remove()}
  // useEffect(() => {
  //   console.log("useEffect")
  //   }, [elDelete])
  return (
    <div className={`element-${id}`}>
      <input value={inputName} className='el--Name' onChange={e => setInputName(e.target.value)} placeholder="Название" />
      <input style={{ marginRight: 10 }} type="number" value={inputValue} className='el--Value' onChange={e => setInputValue(e.target.value)} />Вт
      <button onClick={() => remItem(id)} >Удалить</button>
    </div>
  )
}

function App() {
  const [allInput, setAllInput] = useState([])
  const [volt, setVolt] = useState(0)
  const [amper, setAmper] = useState(0)
  const [tot, setTot] = useState(0)
  const [hour, setHour] = useState(0)



  const allBat = tot / 12 * hour
  const allBats = allBat * 0.3
  const alllll = Math.ceil(allBat + allBats)
  const result = Math.floor(volt * amper)
  const id = nanoid()
// const id = allInput.length
  const addInput = () => {
    // const index = allInput.length
    setAllInput(allInput.concat(<Input key={id} remItem={remItem} id={id} />));
  };


  const findTotal = () => {
    let arr = document.getElementsByClassName('el--Value');
    let tot = 0
    for (let i = 0; i < arr.length; i++) {
      if (parseInt(arr[i].value))
        setTot(tot += parseInt(arr[i].value));
    }
    // document.getElementById('total').value = tot;
  }
  
  // const elDelete = (id) => {
  // //  const arr = allInput
  //   setAllInput(arr => {
  //     console.log(`allInput.length = ${arr.length}`)
  //     for (let i = 0; i < arr.length; i++) {
  //       console.log(`key = ${id} value[id].key = ${arr[id].key} value[i].key = ${arr[i].key}`)
  //       if (id === arr[i].key) {
  //         arr.splice([i].key, 1)
          
  //       }
  //       console.log(arr)
  //       return arr
  //     }
      
  //   })
  // }
  // const elDelete = (id) => {
  //   setAllInput( () => 
  //   // const test = allInput.find(id)
  //   // if (test)
  //   allInput.filter( el => el.id !== id)
  //   )
  //   //  const arr = allInput
  //     // setAllInput(arr => {
  //     //   console.log(`allInput.length = ${arr.length}`)
  //     //   for (let i = 0; i < arr.length; i++) {
  //     //     console.log(`key = ${id} value[id].key = ${arr[id].key} value[i].key = ${arr[i].key}`)
  //     //     if (id === arr[i].key) {
  //     //       arr.splice([i].key, 1)
            
  //     //     }
  //     //     console.log(arr)
  //     //     return arr
  //     //   }
        
  //     // })
  //   }
// useEffect(() => {
// console.log("useEffect")
// }, [allInput])


function remItem(id) {
	console.log(id);
  setAllInput([...allInput.slice(0, id), ...allInput.slice(id + 1)])
  // setAllInput(allInput.filter( el => el.index !== index))
}
const res = allInput.map((inpt, id) => {
  return <li className={`elem-${id}`} key={id} >{inpt}<button onClick={() => remItem(id)} >Удалить</button></li>
})
console.log(id)
  return (
    <div className="App">


      <header className="App-header">
        <h1>Calculator</h1>
        <h2>Emergency Power Bank for Home</h2>
        <div className='power' >
          <h3>Определить мощность изделия в Ваттах</h3>
          V = <input value={volt} type="number" onChange={e => setVolt(e.target.value)} />
          A =  <input value={amper} type="number" onChange={e => setAmper(e.target.value)} />
          Вт = <span style={{ color: "green", fontSize: "1.6rem" }}>{result}</span>

        </div>

        <div className='all-power' >
          <h3>Определить общую мощность всех устройств</h3>
          <p style={{ fontSize: "1rem", padding: 20 }}>Добавьте в список название и мощность устройств, которые будут одновременно работать от Вашего инвертора нажав кнопку "Добавить", затем нажмите на "Результат" для вычисления общего значения.</p>
          Список устройств:
          {/* {allInput} */}

          <br />
          {res}
          <button onClick={addInput} >Добавить</button>
          <button onClick={findTotal} >Результат</button>
          {/* <button onClick={() => {
            setallInput([])
            setTot(0)


          }} >Сброс</button> */}
          <br />
          <span style={{ color: "green" }}>Итого: {tot} Вт</span>
          <p style={{ fontSize: "1rem", padding: 20 }}>Номинальная мощность инвертора должна быть больше данного значения.</p>

        </div>
        <div className='accum-bat' >
          <h3>Расчитать емкость АКБ (12 V)</h3>
          <input type="number" value={tot} onChange={e => setTot(e.target.value)} style={{ marginRight: 7 }} />Вт <span style={{ fontSize: 30, margin: 10, color: "green" }} >* </span><input type="number" value={hour} style={{ marginRight: 0 }} onChange={e => setHour(e.target.value)} /> час
          <p style={{ color: "green", margin: "1rem" }}> Более {alllll}  Аh</p>
          <p style={{ fontSize: "1rem" }}>Автомобильные аккумуляторы нельзя разряжать полностью! Остаточная ёмкость должна составлять не менее 25-30%.<br /> Поэтому, с поправкой на коэффициент остаточной емкости, для вышеуказанной мощности необходима система состоящая из одного или нескольких аккумуляторов общей емкостью не менее <span>{alllll}</span> Ah.</p>
        </div>



      </header>

    </div>
  );
}

export default App;
