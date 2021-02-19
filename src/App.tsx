import React, {useState} from 'react';
import './App.css';

const App: React.FC = () => {

  const [input, setInput] = useState('')
  const [items, setItems] = useState([] as any)

  const onInputForm = (e: any) => {
    setInput(e.target.value)
    console.log('input:', input)
  }

  const onAddItem = (event: any) => {
    event.preventDefault()
    const newInput = input.split(' ')
    console.log('newInput:', newInput)
    const newItems: Array<any> = [...items, ...newInput]
    setItems(Object.values(newItems))
    console.log('newItems:', newItems)
    setInput('')
  }

  const onDeleteItem = (itemIndex: number) => {
    const newItems: Array<any> = items.filter((item: string, index: number) => index !== itemIndex)
    setItems(newItems)
  }
  return (
    <div className="App">
        <form style={{marginBottom: '10px'}} onSubmit={(event) => onAddItem(event)}>
          <input value={input} onChange={(e) => onInputForm(e)}  type="text"/>
          <button type='submit'>Поиск</button>
        </form>
        <div className='list_block'>
          {items.filter((item: string) => item !== '').map((item: string, index: number) =>
              <span className='item_badge' key={index}>{item}<span onClick={() => onDeleteItem(index)} title='Удалить' className='close_btn'>x</span></span>
          )}
        </div>
      {items.length > 0 ? <button style={{marginTop: '10px', marginLeft: '10px'}} onClick={() => setItems([])}>Очистить</button> : null}
    </div>
  );
}

export default App;
