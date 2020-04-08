import { Block } from './block';

export class GameObject {
    img: HTMLImageElement;

    constructor(
        private src: string,
        public block: Block       
    ) {
        this.setImage(src);
    }
 
    private setImage(src) {
        this.img = document.createElement('img');        
        this.img.src = src;
        document.body.appendChild(this.img);
        this.setToBlock(this.block);
    }

    setToBlock(block: Block) {
        if(block.getTransform().x < this.block.getTransform().x){
            this.img.style.transform = 'scaleX(-1)';
        }else if(block.getTransform().x > this.block.getTransform().x){
            this.img.style.transform = 'scaleX(1)';
        }
        this.block = block;
        let transform = block.getTransform();
        this.img.style.position = 'absolute';
        this.img.style.top = transform.y + 'px';
        this.img.style.left = transform.x + 'px';
        this.img.style.height = transform.height + 'px';
        this.img.style.width = transform.width + 'px';
        this.img.style.transition = '0.7s';
    }

    destroy() {
        document.body.removeChild(this.img);
    }
    
}