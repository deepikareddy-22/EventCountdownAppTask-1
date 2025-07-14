import React from 'react';
import HelloWorld from './components/HelloWorld';
import MyName from './components/MyName';
import EmpComponent from './components/EmpComponent';
import FormattedMoney from './components/FormattedMoney';
import FormattedDate from './components/FormattedDate'; 
import ExpenseEntryItem from './components/ExpenseEntryItem';
import NamesList from './components/NamesList';
import Counter from './components/Counter';
import GlobalVariable from './components/GlobalVariable'; 
import Handleinput from './components/Handleinput';
import SingleTextbox from './components/SingleTextbox';
import ConRendList from './components/CodRendList';
import Clock from './components/Clock';

function App() {

  return (
    <div> 
      <HelloWorld/>
      <MyName name="Deepika" times={1} />
      <EmpComponent />
      <FormattedMoney value={1234.56789} />
      <br/>
      <h2>Formatted Date:</h2>
      <FormattedDate value={new Date()} />
      <br/>
      <h2>Expense Entry Item:</h2>
      <ExpenseEntryItem 
        name="Groceries"
        item={{ amount: 45.67, category: 'Food' }}
        spendDate={new Date('2023-10-01')}
      />
      <br/>
      <NamesList />
      <br/>
      <br/>
      <h2>Formatted Date:</h2>
      <FormattedDate value={new Date()} />
      <br/>
      <Counter />
      <br/>
      <GlobalVariable />
      <br/>
      <Handleinput />
      <br/>
      <h2>Single Textbox Component:</h2>
      <SingleTextbox />
      <br/>
      <h2>Conditional Rendering and List Rendering:</h2>
      <ConRendList />
      <br/>
      <h2>Clock Component:</h2>
      <Clock />
      
    </div>
  
  );
}

export default App;