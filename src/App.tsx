import React, {useState} from 'react';
import './App.css';

const App: React.FC = () => {

  const [input, setInput] = useState('')
  const [items, setItems] = useState([] as any)
  const [searchArea, setSearchArea] =  useState(false)

  const onInputForm = (e: any) => {
    setInput(e.target.value)
    console.log('input:', input)
  }

  const onAddItem = async (event: any) => {
    event.preventDefault()
    const newInput = input.split(/\n/)
    const newItems: Array<any> = [...items, ...newInput]
    await setItems(newItems.filter((item: string) => item !== ''))
  }

  const onDeleteItem = (itemIndex: number) => {
    const newItems: Array<any> = items.filter((item: string, index: number) => index !== itemIndex)
    setItems(newItems)
  }

  const onClearSearch = () => {
    setInput('')
    setItems([])
  }

  const convertedInput = replaceComma(input)

  function replaceComma(data: string) {
    let dataToArray = data.split(',')
    return dataToArray.join('\n')
  }

  return (
    <div className="App">
        <form style={{marginBottom: '10px'}} onSubmit={(e) => onAddItem(e)}>
          {!searchArea ?
              <input value={input} onChange={(e) => onInputForm(e)}/> :
              <textarea value={convertedInput} onChange={(e) => onInputForm(e)} />
          }
          <p onClick={() => setSearchArea(!searchArea)} className='toggle_link'>{!searchArea ? 'открыть' : 'закрыть'} массовый поиск</p>
          <div>
            <button type="submit">Поиск</button>
            <button disabled={input.length === 0 && items.length === 0} style={{marginTop: '10px', marginLeft: '10px'}} onClick={onClearSearch}>Очистить</button>
          </div>
        </form>
        <div className='list_block'>
          {items.length > 0 ? <p className='list_title'>Результаты поиска:</p> : null}
          <ul>
            {items.map((item: string, index: number) =>
                <li key={index}>
                  {item}
                  <span key={index} onClick={() => onDeleteItem(index)} title='Удалить' className='close_btn'>x</span>
                </li>
            )}
          </ul>
        </div>
    </div>
  );
}

export default App;
