import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

export const Input = ({ index }) => {

  const local = JSON.parse(window.localStorage.getItem(`inputValue ${index}`))

  const [inputValue, setInputValue] = useState(local ? local : 0)

  useEffect(() => {
    const local = JSON.parse(window.localStorage.getItem(`inputValue ${index}`))
    setInputValue(local);
  }, [index]);

  useEffect(() => {
    window.localStorage.setItem(`inputValue ${index}`, inputValue);
  }, [inputValue, index]);

  return (<>
    {/* <label for="lang">Устройство</label>  */}
    <select name="вevices">
      <option value="select">Выберите устройство</option>
      <option value="150">Отопительный котел</option>
      <option value="70" >Телевизор LED</option>
      <option value="70">Ноутбук</option>
      <option value="50">Монитор</option>
      <option value="30">Роутер</option>
      <option value="10">Медиаконвертер</option>
      <option value="another">Другое...</option>
    </select> <input style={{ marginRight: 10 }} type='number' value={inputValue} className='el--Value' onChange={e => setInputValue(e.target.value)} /><span>Вт</span>
  </>
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
  const index = nanoid()
  // const index = allInput.length
  const addInput = () => {
    // const index = allInput.length
    // const copy = allInput.push(<Input key={index} remItem={remItem} index={index} />)
    setAllInput([...allInput, <Input key={index} remItem={remItem} index={index} allInput={allInput} />])
    // setAllInput(allInput.concat(<Input key={index} remItem={remItem} index={index} />));
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

  // const elDelete = (index) => {
  // //  const arr = allInput
  //   setAllInput(arr => {
  //     console.log(`allInput.length = ${arr.length}`)
  //     for (let i = 0; i < arr.length; i++) {
  //       console.log(`key = ${index} value[index].key = ${arr[index].key} value[i].key = ${arr[i].key}`)
  //       if (index === arr[i].key) {
  //         arr.splice([i].key, 1)

  //       }
  //       console.log(arr)
  //       return arr
  //     }

  //   })
  // }
  // const elDelete = (index) => {
  //   setAllInput( () => 
  //   // const test = allInput.find(index)
  //   // if (test)
  //   allInput.filter( el => el.index !== index)
  //   )
  //   //  const arr = allInput
  //     // setAllInput(arr => {
  //     //   console.log(`allInput.length = ${arr.length}`)
  //     //   for (let i = 0; i < arr.length; i++) {
  //     //     console.log(`key = ${index} value[index].key = ${arr[index].key} value[i].key = ${arr[i].key}`)
  //     //     if (index === arr[i].key) {
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


  function remItem(index) {
    console.log(index);
    setAllInput([...allInput.slice(0, index), ...allInput.slice(index + 1)])
    // setAllInput(allInput.filter( el => el.index !== index))
  }
  const res = allInput.map((inpt, index) => {
    return <li className={`elem-${index}`} key={index} >{inpt}<button onClick={() => remItem(index)} >Удалить</button></li>
  })

  console.log(index)
  return (
    <div className="App">
      <header className="App-header">

        <div className="tooltip"><h1>Calculator</h1>
          <span className="tooltiptext">Данный калькулятор предназначен для расчета мощности инвертора и емкости автомобильного аккумулятора домашнего аварийного повербанка.</span>
        </div>
        <h2>Emergency Power Bank for Home</h2>
        <div className='power' >
          <h3>Определить мощность изделия в Ваттах</h3>
          V = <input value={volt} type="number" onChange={e => setVolt(e.target.value)} />
          A =  <input value={amper} type="number" onChange={e => setAmper(e.target.value)} />
          Вт = <span style={{ color: "green", fontSize: "1.6rem" }}>{result}</span>

        </div>

        <div className='all-power' >
          <h3>Определить общую мощность всех устройств</h3>
          <p style={{ fontSize: "1rem", padding: 20 }}>Если на вашем устройстве указана мощность не в Ваттах, а в Вольтах(V) и Амперах(A) - воспользуйтесь разделом выше, чтобы перевести их в Ватты.
            <br />Составьте список устройств, которые будут одновременно работать от вашего инвертора. 
            <br />Введите значения мощности в Ваттах для каждого из них. 
            <br />Нажмите на "Результат".</p>
          Список устройств:
          {/* {allInput} */}

          <br />
          <ul>{res}</ul>

          <button onClick={addInput} >Добавить</button>
          <button onClick={findTotal} >Результат</button>
          <button onClick={() => { setAllInput([]); setTot(0) }}  >Сброс</button>

          <br />
          <span style={{ color: "green" }}>Итого: {tot} Вт</span>
          <p style={{ fontSize: "1rem", padding: 20 }}>Номинальная мощность вашего инвертора должна быть больше вышеуказанного значения.</p>

        </div>
        <div className='accum-bat' >
          <h3>Расчитать емкость АКБ (12 V)</h3>
          <p style={{ fontSize: "1rem" }}>Укажите желаемое время работы повербанка</p>
          <input type="number" value={tot} onChange={e => setTot(e.target.value)} style={{ marginRight: 7 }} />Вт <span style={{ fontSize: 30, margin: 10, color: "green" }} >* </span><input type="number" value={hour} style={{ marginRight: 0 }} onChange={e => setHour(e.target.value)} /> час
          <p style={{ color: "green", margin: "1rem" }}> Более {alllll}  Аh</p>
          <p style={{ fontSize: "1rem" }}>Автомобильные аккумуляторы нельзя разряжать полностью!<br /> Остаточная ёмкость его должна составлять не менее 25-30%.<br /> Поэтому, с поправкой на коэффициент, для данной системы необходим аккумулятор(ры) общей емкостью не менее <span>{alllll}</span>Ah.</p>
        </div>



      </header>

    </div>
  );
}

export default App;
