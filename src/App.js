import React, { Component } from 'react';
import './App.css';
import Food from './components/Food';
import Snake from './components/Snake';

const getRandomCoordinates = () => {// функция которая будет генерировать нахождение еды на поле (в компоненте Food мы превращаем эти числа в проценты)
  let min = 1
  let max = 98
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
  return [x, y]
}

const initialState = {// изначальный state игры
  food: getRandomCoordinates(),
  speed: 100,// с какой скоростью будет двигаться змейка (с каким интервалом будет использоваться функция moveSnake)
  direction: 'RIGHT',// направление по которому будет двигаться змейка
  snakeDots: [
    [0, 0],
    [2, 0]
  ],// каждый массив это координаты каждого snake-dot змейки на поле (в компоненте Snake мы превращаем эти числа в проценты) первое число это ось Х а вторая Y
  noGame: true
}

class App extends Component {

  state = initialState

  componentDidMount() {
    document.onkeydown = this.onKeyDown
  }

  componentDidUpdate() {

    if (this.state.noGame === false) {
      this.checkIfOutTheBorders()
      this.checkIfCollapsed()
      this.checkIfEat()
    }
  }

  onKeyDown = (e) => {
    e = e || window.event // получаем event всего приложения (чтобы он был работал при нажатии на клавишу при нахождении на сайте а не только при клике или фокусе на элементе)
    if (e.keyCode === 37 && this.state.direction !== "RIGHT") {
      this.setState({ direction: "LEFT" });
    }
    else if (e.keyCode === 38 && this.state.direction !== "DOWN") {
      this.setState({ direction: "UP" });
    }
    else if (e.keyCode === 40 && this.state.direction !== "UP") {
      this.setState({ direction: "DOWN" });
    }
    else if (e.keyCode === 39 && this.state.direction !== "LEFT") {
      this.setState({ direction: "RIGHT" });
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];// получаем весь массив snakeDots
    let head = dots[dots.length - 1];// получаем последний элемент массива

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      default:
        break;

    }
    dots.push(head);// закидываем этот элемент в массив dots 
    dots.shift();// удаляем первый элемент так как мы добавили в новый элемент
    this.setState({ snakeDots: dots })// обновляем наш state и подменяем snakeDots на новую его версию - dots
  }

  checkIfOutTheBorders() {// проверяет врезалась ли змея в стены арены
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];//берем последний элемент массива (голову)

    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver()
    }
  }

  checkIfCollapsed() {// когд сработает когда змейка столкнулась сама с собой
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    snake.pop()//Метод pop() удаляет последний элемент из массива и возвращает его значение.
    snake.forEach(dot => {// проходимся по массиву змеи и смотрим есть ли snake-dot у которого координаты такие же как и у головы (перед этим мы вырезали голову из массива чтобы не получалось так что голова сама себя ест)
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver()
      }
    })
  }

  checkIfEat() {// змея кушает еду
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];//берем последний элемент массива (голову)
    let food = this.state.food;// получаем еду
    if (head[0] === food[0] && head[1] === food[1]) {// если координаты еды и головы змеи одинаковы то выполняем код
      this.setState({ food: getRandomCoordinates() })// создает новые координаты еды
      this.enlargeSnake()// увеличивает змею
      this.scaleSpeed()// увеличивает её скорость
    }
  }

  enlargeSnake() {// увеличивает змею
    let snake = [...this.state.snakeDots]// получаем массив змеи
    snake.unshift([])//Метод unshift() добавляет один или более элементов в начало массива и возвращает новую длину массива.Мы добавляем новый snake-dot в начало массива змеи (в хвост)
    this.setState({
      snakeDots: snake
    })
  }

  scaleSpeed() {
    if (this.state.snakeDots.length === 11) {
      this.setState({ speed: this.state.speed - 5 })
      clearInterval()
      setInterval(this.moveSnake, this.state.speed);
    }
    if (this.state.snakeDots.length === 21) {
      this.setState({ speed: this.state.speed - 5 })
      clearInterval()
      setInterval(this.moveSnake, this.state.speed);
    }
  }

  onGameOver() {// проигрыш
    alert(`Вы прогирали со счётом ${this.state.snakeDots.length - 2}`)
    this.setState(initialState)

    window.location.reload();
  }

  render() {
    if (this.state.snakeDots.length >= 12 && this.state.snakeDots.length <= 22) {
      document.body.style = 'background: #fff;'
    }
    if (this.state.snakeDots.length >= 22) {
      document.body.style = 'background: #000;'
    }
    if (this.state.noGame) {
      return (<div className='wrapper'>
        <h1 className='menu_title'>Змейка</h1>
        <h2 className='menu_subtitle'>Попробуй набрать 50 очков!</h2>
        <button className='start' onClick={() => { this.setState({ noGame: false }); setInterval(this.moveSnake, 100); }}> Начать</button>
      </div>
      )
    }
    const styleController = {
      color: this.state.snakeDots.length >= 12 && this.state.snakeDots.length <= 21 ? '#000' : '#fff',
      border: this.state.snakeDots.length >= 12 && this.state.snakeDots.length <= 21 ? '2px solid #000' : '2px solid #fff',
      textAlign: 'center'
    }
    return (
      <>
        <h1 className='count' style={{ color: this.state.snakeDots.length >= 12 && this.state.snakeDots.length <= 21 ? '#000' : '#fff' }}>{this.state.snakeDots.length - 2}</h1>
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} snakeDots={this.state.snakeDots} />
        </div>
        <div className='controller' >
          <button style={styleController} onClick={() => {
            if (this.state.direction !== "DOWN") {
              this.setState({ direction: "UP" });
            }
          }}>&#8593;</button>
          <br />
          <button style={styleController} onClick={() => {

            if (this.state.direction !== "RIGHT") {
              this.setState({ direction: "LEFT" });
            }
          }}>&#8592;</button>

          <button style={styleController} onClick={() => {
            if (this.state.direction !== "UP") {
              this.setState({ direction: "DOWN" });
            }
          }}>&#8595;</button>

          <button style={styleController} onClick={() => {
            if (this.state.direction !== "LEFT") {
              this.setState({ direction: "RIGHT" });
            }
          }}>&#8594;</button>


        </div>
      </>
    )
  }

}

export default App;