import TodoForm from "./components/todoForm/todoForm";
import TodoDisplay from "./components/todoDisplay/todoDisplay";
import { Layout, Menu } from "antd";
import "./App.css";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";

function App({ addTodo, deleteTodo, todos = [{}] }) {
  const onFormSubmit = (todo) => {
    addTodo(todo);
  };

  //ondelete
  const onDeleteTodo = (todoId) => {
    console.log(todoId);
    deleteTodo(todoId);
  };

  //navbar
  const { Header, Content } = Layout;

  return (
    <Router>
      <div className="App">
        <Layout className="layout">
          <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            {/* <div className="title">Todo</div> */}
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <NavLink to="/" className="link">
                  todoForm
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/display" className="link">
                  displayTodo
                </NavLink>
              </Menu.Item>
            </Menu>
          </Header>

          <Content
            className="site-layout"
            style={{ padding: "0 50px", marginTop: 64 }}
          >
            <Switch>
              <Route exact path="/">
                <TodoForm onFormSubmit={onFormSubmit} />
              </Route>
              <Route path="/display">
                <TodoDisplay todos={todos} onDeleteTodo={onDeleteTodo} />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </div>
    </Router>
  );
}

//If your mapStateToProps function is declared as taking one parameter, it will be called whenever the store state changes, and given the store state as the only parameter.
const mapStateToProps = ({ todos }) => ({ todos });

//If your mapDispatchToProps is declared as a function taking one parameter, it will be given the dispatch of your store.
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    addTodo: (val = {}) => {
      console.log(val);
      dispatch({
        type: "ADD_TODO",
        payload: { id: Math.random() * 1000, ...val },
      });
    },
    deleteTodo: (id) => dispatch({ type: "DELETE_TODO", payload: { id } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
