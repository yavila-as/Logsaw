import React, { Component } from 'react'
import Box from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import imageZ from '../../images/zoovuz.svg';
import imageo from '../../images/zoovuo.svg';
import imagev from '../../images/zoovuv.svg';
import imageu from '../../images/zoovuu.svg';
import boxImage from '../../images/greenBox.png';
import './styles.css';



export default class GameScreen extends Component {
    componentDidMount(){
        this.shufflePieces();
        setInterval(() => {
            this.setState({
              seconds : this.state.seconds+1
            })
          }, 1000)
    }

    shufflePieces = () =>{
        const shuffled = this.state.list;
    
        for (let i = shuffled.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let tmp = shuffled[i];
          shuffled[i] = shuffled[j];
          shuffled[j] = tmp;
        }
    
        this.setState({list:shuffled});
    }

  state = {
      list: [
        { number: 0, image: `${imageZ}`},
        { number: 1, image: `${imageo}`},
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
    seconds: 0,
  }

  onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    event.dataTransfer.setData("draggedFrom", initialPosition);
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (event) => {
    let draggedFrom = event.dataTransfer.getData("draggedFrom");
    let draggedTo = Number(event.currentTarget.dataset.position);
    const itemDragged = this.state.list[draggedFrom];
    const remainingItems = this.state.editableList.filter((item, index) => index !== Number(draggedTo));

    let editableList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];
console.log(this.state.list[draggedFrom].number,'dede',draggedTo)
        if(this.state.list[draggedFrom].number !== draggedTo){
            this.setState({
            seconds : this.state.seconds+10
            })
        }
    let list = this.state.list.filter((item, index) => index !== Number(draggedFrom));
    this.setState({
      ...this.state,
      editableList,
      list
    });

    
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
                    </p>);
                    <Typography>Pick up the right cards</Typography>
                    <section>
                            {this.state.list.map( (item, index) => {
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
                    <Typography>..and drop them here to make hte logo great again!</Typography>
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
                    <img src={item.image} className="borderBox"/>
                </item>
                )
                })}
            </section>
                </Grid>
            </Box>
        );
    }
}