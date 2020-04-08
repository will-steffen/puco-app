export class Block {

    constructor(
        public field: HTMLDivElement,
        public id: number,
        public canWalk: boolean
    ) {
        if(canWalk){
            this.field.className += ' ok';
        }else{
            this.field.className += ' bad';
        }       
    }

    getTransform() {
        return {
            x: this.field.offsetLeft,
            y: this.field.offsetTop,
            width: this.field.offsetWidth,
            height: this.field.offsetHeight
        };
    }

    static getUpTo(block: Block, blocks: Block[]) {
        blocks = blocks.filter(b => 
            b.getTransform().x == block.getTransform().x 
            && b.getTransform().y < block.getTransform().y
        );
        if(blocks.length == 0) return;
        
        blocks = blocks.sort((a, b) => a.getTransform().y < b.getTransform().y ? 1 : -1);        
        return blocks[0];
    }
    static getDownTo(block: Block, blocks: Block[]) {
        blocks = blocks.filter(b => 
            b.getTransform().x == block.getTransform().x
            && b.getTransform().y > block.getTransform().y
        );
        if(blocks.length == 0) return;
        
        blocks = blocks.sort((a, b) => a.getTransform().y > b.getTransform().y ? 1 : -1);        
        return blocks[0];
    }
    static getLeftTo(block: Block, blocks: Block[]) {
        blocks = blocks.filter(b => 
            b.getTransform().y == block.getTransform().y 
            && b.getTransform().x < block.getTransform().x
        );
        if(blocks.length == 0) return;
        
        blocks = blocks.sort((a, b) => a.getTransform().x < b.getTransform().x ? 1 : -1);        
        return blocks[0];
    }
    static getRightTo(block: Block, blocks: Block[]) {
        blocks = blocks.filter(b => 
            b.getTransform().y == block.getTransform().y 
            && b.getTransform().x > block.getTransform().x
        );
        if(blocks.length == 0) return;
        
        blocks = blocks.sort((a, b) => a.getTransform().x > b.getTransform().x ? 1 : -1);        
        return blocks[0];
    }
    
}