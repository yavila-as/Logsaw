import React, { Component } from 'react'
import Box from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import imageZ from '../../images/zoovuz.svg';
import imageo from '../../images/zoovuo.svg';
import imagev from '../../images/zoovuv.svg';
import imageu from '../../images/zoovuu.svg';
import boxImage from '../../images/greenBox.png';
import './styles.css';

const initialState = {
  list: [
      { number: 1, image: `${imageZ}`},
      { number: 2, image: `${imageo}`},
      { number: 2, image: `${imageo}`},
      { number: 3, image: `${imagev}`},
      { number: 4, image: `${imageu}`},
  ],
  editableList: [
      { number: 5, image: `${boxImage}`},
      { number: 6, image: `${boxImage}`},
      { number: 7, image: `${boxImage}`},
      { number: 8, image: `${boxImage}`},
      { number: 9, image: `${boxImage}`},
  ],
  shuffledList: [],
  seconds: 0,
  gameStarted: false,
  win: false,
};

export default class GameScreen extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
  }

  componentDidMount(){
    this.shufflePieces();
  }
  
  shufflePieces = () =>{
    const shuffled = this.state.list;

    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }
    this.setState({shuffledList: shuffled});
  }

  timeCounter = (time) => {
    this.setState({
      seconds : this.state.seconds + time
    })
  }

  onDragStart = (event) => {
    if (!this.state.gameStarted) {
      setInterval(() => {
        this.timeCounter(1);
      }, 1000)
      this.setState({ gameStarted: true });
    } 
    const initialPosition = Number(event.currentTarget.dataset.position);
    event.dataTransfer.setData("draggedFrom", initialPosition);
  }
  
  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (event) => {
    let draggedFrom = event.dataTransfer.getData("draggedFrom");
    let draggedTo = Number(event.currentTarget.dataset.position);
    const itemDragged = this.state.shuffledList[draggedFrom];
    const remainingItems = this.state.editableList.filter((item, index) => index !== Number(draggedTo));

    let editableList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];
    const itemDraggedA = this.state.editableList[draggedTo];
    const remainingItemsA = this.state.shuffledList.filter((item, index) => index !== Number(draggedFrom));

    let shuffledList = [
      ...remainingItemsA.slice(0, draggedFrom),
      itemDraggedA,
      ...remainingItemsA.slice(draggedFrom)
    ];
    if(this.state.shuffledList[draggedFrom].number !== draggedTo){
      console.log('jhhgghgh');
      this.setState({
        seconds : this.state.seconds + 10
      })
    }
    this.setState({
      ...this.state,
      editableList,
      shuffledList
    }); 
    const temp = [1, 2, 2, 3, 4]
    const listChecked = editableList.map((element, index) => {
      return element.number === temp[index] ? true : false;
    });
    this.setState({
      win: !listChecked.includes(false) && !editableList.some(e => e.image === `${boxImage}`),
    }, () =>{
      if(this.state.win){
        setTimeout(()=> this.onUserWin(), 10000);
      }
    });
  }

  onUserWin(){
    alert('nos fuimos');
    this.setState(initialState);
    this.shufflePieces();
    //clearInterval(myVar);
  }

  
  render() {
    return (
      <Box display='flex' flexWrap="wrap">
        <Grid
            container
            direction="column"
            justify="left"
            alignItems="left"
        >
          <Typography>Good luck,{this.props.userName}!</Typography>
          <p>
              Your score: {this.state.seconds} seconds
          </p>
          <Typography>Pick up the right cards</Typography>
          <section>
              {this.state.shuffledList.map( (item, index) => (
                  <item 
                  key={index}
                  data-position={index}
                  draggable
                  onDragStart={(event) => this.onDragStart(event)}
                  onDragOver={(event) => this.onDragOver(event)}
                  onDrop={(event) => this.onDrop(event)}
                  >
                      <img src={item.image} className="imageBox"/>
                  </item>
              ))}
              </section>
          <Typography>..and drop them here to make the logo great again!</Typography>
          <section>
              {this.state.editableList.map( (item, index) => {
              return(
              <item 
              key={index}
              data-position={index}
              draggable
              onDragStart={(event) => this.onDragStart(event)}
              onDragOver={(event) => this.onDragOver(event)}
              onDrop={(event) => this.onDrop(event)}
              >
                  <img src={item.image} className="imageBox"/>
              </item>
              )
              })}
          </section>
        </Grid>
      </Box>
    );
  }
}
