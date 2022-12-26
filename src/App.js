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

  return (
    <div className='input'>
      <select value={inputValue} onChange={e => setInputValue(e.target.value)}>
        <option className='option' value="0">Мій пристрій</option>
        <option className='option' value="130">Опалювальний котел</option>
        <option className='option' value="80" >Телевізор LED 42'</option>
        <option className='option' value="70" >Ноутбук</option>
        <option className='option' value="60">Телевізор LED 32'</option>
        <option className='option' value="30">Роутер</option>
        <option className='option' value="10">Медіаконвертер</option>

      </select> <input type='number' value={inputValue} className='el--Value' onChange={e => setInputValue(e.target.value)} /><span>Вт</span>
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
  const index = nanoid()

  const addInput = () => {
    setAllInput([...allInput, <Input key={index} remItem={remItem} index={index} allInput={allInput} />])
  };


  const findTotal = () => {
    let arr = document.getElementsByClassName('el--Value');
    let tot = 0
    for (let i = 0; i < arr.length; i++) {
      if (parseInt(arr[i].value))
        setTot(tot += parseInt(arr[i].value));
    }
  }

  function remItem(index) {
    setAllInput([...allInput.slice(0, index), ...allInput.slice(index + 1)])
  }

  const res = allInput.map((inpt, index) => {
    return <li className={`elem`} key={index} >{inpt}<button onClick={() => remItem(index)} >Удалить</button></li>
  })

  return (
    <div className="App">
      <main className="App-main">
        <i style={{ fontSize: "0.9rem" }}>Даний калькулятор призначений для розрахунку потужності інвертора та ємності автомобільного акумулятора для домашнього аварійного повербанку</i>
        <h1>Calculator</h1>
        <h2>Emergency Power Bank for Home</h2>
        <div className='power' >
          <h3>Визначити потужність виробу у Ватах</h3>
          <i>V</i> = <input value={volt} type="number" onChange={e => setVolt(e.target.value)} /> <i>A</i> =  <input value={amper} type="number" onChange={e => setAmper(e.target.value)} /><i>W</i> (Вт) = <span className='green'>{result}</span>

        </div>

        <div className='all-power' >
          <h3>Визначити загальну потужність усіх пристроїв</h3>
          <p >Якщо на вашому пристрої вказана потужність не у Ватах, а у Вольтах (V) та Амперах (A) - скористайтеся розділом вище, щоб перевести їх у Вати (W).
            <br />Складіть список пристроїв, які одночасно працюватимуть від вашого інвертора.
            <br />Введіть значення потужності у Ватах для кожного з них.
            <br />Натисніть на "Результат".</p>
          <h4>Список пристроїв:</h4>

          <ul>{res}</ul>

          <button onClick={addInput} >Додати</button>
          <button onClick={findTotal} >Результат</button>
          <button onClick={() => { setAllInput([]); setTot(0) }}  >Скинути</button>

          <br />
          <p className='green' >Разом: {tot} Вт</p>
          <p >Номінальна потужність вашого інвертора має бути більшою за вищевказане значення.</p>

        </div>

        <div className='accum-bat' >
          <h3>Розрахувати ємність АКБ (12 V)</h3>
          <p>Вкажіть бажаний час роботи повербанку</p>
          <input type="number" value={tot} onChange={e => setTot(e.target.value)} />Вт <span style={{ fontSize: 30, margin: 10, color: "green" }} >* </span><input type="number" value={hour} onChange={e => setHour(e.target.value)} />час
          <br />
          <p className='green' >Більше {alllll}  Аh</p>
          <p>Автомобільні акумулятори не можна розряджати повністю!<br /> Залишкова ємність його має становити не менше 25-30%.<br /> Тому, з поправкою на коефіцієнт, для цієї системи необхідний акумулятор(ри) загальною ємністю не менше <span>{alllll}</span> Ah.</p>
        </div>


      </main>

      <footer>&copy; 2022 <a href='mailto:studimag@gmail.com'>&nbsp;Studio-MAG</a>&nbsp; 🇺🇦</footer>
    </div>
  );
}

export default App;
