import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Block } from './block';
import { GameObject } from './game-object';

const BEE_PATH = '/assets/imgs/bee.svg';
const FLOWER_PATH = '/assets/imgs/flower.svg';

@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html'
})
export class FollowPage {
  @ViewChild('tableDivId') tableDiv:ElementRef;
  blocks: Block[] = [];
  positions = { player: null, goal: null };
  player: GameObject;
  goal: GameObject;

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    this.create([
      2, 1, 3, 1,
      1, 1, 1, 1,
      1, 1, 1, 1,
      1, 1, 1, 1
    ]);
  }

  create(map: number[]) {   
    let size = Math.sqrt(map.length);
    let blocksCount = size * size;
    let sizePercent = (100 / size) + '%';

    for (let i = 0; i < blocksCount; i++) {
      let block = document.createElement('div');
      block.style.width = sizePercent;
      block.style.height = sizePercent;
      block.className = 'field-block';
      let walk = map[i] !== 0;
      if(map[i] === 2){
        this.positions.player = i;
      }
      if(map[i] === 3){
        this.positions.goal = i;
      } 
  
      this.tableDiv.nativeElement.appendChild(block);
      this.blocks.push(new Block(block, i, walk));
    }
    if(this.positions.goal != null)
      this.goal = new GameObject(FLOWER_PATH, this.blocks[this.positions.goal]);   
    if(this.positions.player != null) 
    this.player = new GameObject(BEE_PATH, this.blocks[this.positions.player]);    
  }

  controlUp() {
    this.goTo(Block.getUpTo(this.player.block, this.blocks));
  }
  controlDown() {
    this.goTo(Block.getDownTo(this.player.block, this.blocks));
  }  
  controlLeft() {
    this.goTo(Block.getLeftTo(this.player.block, this.blocks));
  }
  controlRight() {
    this.goTo(Block.getRightTo(this.player.block, this.blocks));
  }

  goTo(block: Block) {
    if(block == null || !block.canWalk){
        alert('Você perdeu =[');
        //this.resetPosition();
    }else{
        this.player.setToBlock(block);
    }
    // if(this.init.flower == this.bee.block.id){
    //     setTimeout(function(game){            
    //         alert('Você GANHOU');
    //         game.nextlevel();
    //     }, 800, this.game);
    // }        
}

}
