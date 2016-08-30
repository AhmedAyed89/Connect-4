/**
 *	GAME Assets and resources List (Images PNG)
 *
 **/
import winIMG from '../Assets/win.png';
import boxIMG from '../Assets/box.png';
import pokeballIMG from '../Assets/pokeball.png';
import jigglypuffIMG from '../Assets/jigglypuff.png';
import pikachuIMG from '../Assets/pikachu.png';
import vsIMG from '../Assets/Vs.png';

class Assets{
	constructor () {
		this.assetList = [];
		this.assetList.push({name: 'pikachu', fullPath: pikachuIMG});
		this.assetList.push({name: 'jigglypuff', fullPath: jigglypuffIMG});
		this.assetList.push({name: 'box', fullPath: boxIMG});
		this.assetList.push({name: 'win', fullPath: winIMG});
		this.assetList.push({name: 'pokeball', fullPath: pokeballIMG});
		this.assetList.push({name: 'vs', fullPath: vsIMG});
	}

}

export default new Assets();
