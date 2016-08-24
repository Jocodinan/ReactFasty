"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var Immutable = require('immutable');
var reactRedux = require('react-redux');

const { Map, List } = Immutable;
const { createStore } = Redux;
const { Provider, connect } = reactRedux;


const list = [];

// reducer
const todoListReducer = function(state = list, action) {
  switch (action.type) {
    case 'TOGGLE_CLICK':
      return state.map(function(t){
        if(t.get('id') == action.payload){
          return t.update('isDone', isDone => !isDone);
        }else{
          return t;
        }
      });
    case 'ADD_TODO':
      return state.push(action.payload);
    default:
      return state;
  }
}

//Store
const store = createStore(todoListReducer);

//React components
const TodoList = React.createClass({
  propTypes: {
    todos: React.PropTypes.array
  },
  toggleClick: function(event){
   console.log('toggle-click');
  },
  onSubmit: function(event){
    console.log('submit');
  }
  render: function(){
    var _this = this;
    return (
      <div className='todo'>
        <input 
          type='text'
          className='todo__entry'
          placeholder='Add todo'
          onKeyDown={this.onSubmit} 
        />
        <ul className='todo__list'>
          this.props.todos.map(function(t){
            <li
              key={t.get('id')}
              className='todo__item'
              onClick={_this.toggleClick(t.get('id'))}>
              <Todo todo={t.toJS()} />
            </li>
          });
        </ul>
      </div>
    );
  }
});

const Todo = React.createClass({
  propTypes: {
    todo: React.PropTypes.object
  },
  render: function(){
    if(this.props.todo.isDone) {
      return <strike>{this.props.todo.text}</strike>;  
    } else {
      return <span>{this.props.todo.text}</span>;
    }
  }
});

const render = function(){
  ReactDOM.render(
    <TodoList todos={store.getState()}/>,
    document.getElementById('content')
  );
}

store.subscribe(render);
render();