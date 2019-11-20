"use strict";function _possibleConstructorReturn(e,o){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!o||"object"!=typeof o&&"function"!=typeof o?e:o}function _inherits(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function, not "+typeof o);e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),o&&(Object.setPrototypeOf?Object.setPrototypeOf(e,o):e.__proto__=o)}function _classCallCheck(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,o){for(var t=0;t<o.length;t++){var r=o[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(o,t,r){return t&&e(o.prototype,t),r&&e(o,r),o}}();!function(){function e(o,t,r){function n(c,i){if(!t[c]){if(!o[c]){var l="function"==typeof require&&require;if(!i&&l)return l(c,!0);if(y)return y(c,!0);var a=new Error("Cannot find module '"+c+"'");throw a.code="MODULE_NOT_FOUND",a}var s=t[c]={exports:{}};o[c][0].call(s.exports,function(e){var t=o[c][1][e];return n(t||e)},s,s.exports,e,o,t,r)}return t[c].exports}for(var y="function"==typeof require&&require,c=0;c<r.length;c++)n(r[c]);return n}return e}()({1:[function(e,o,t){var r=e("./lib"),n=e("./Game"),y=function(){function e(o){_classCallCheck(this,e);var t=o.svg;e.initToolbar(t),new n.Game({el:t,score:document.querySelector(".score-game")}),document.addEventListener("keypress",function(e){13===e.keyCode&&(e.preventDefault(),r.EventEmitter.trigger("start game"))})}return _createClass(e,null,[{key:"initToolbar",value:function(e){var o=document.createElement("div");o.innerHTML='<h3 style="text-align: left; margin-left: 50px; float: left" class="score-game">Score: 0</h3><div  style="float: left; background: #eee; line-height: 40px; margin-left: 50px; padding: 0 20px;"><strong style="color: #ff7978">Enter-</strong>Start Game<strong style="color: #ff7978">L-</strong>Fire<strong style="color: #ff7978">W-</strong>Up<strong style="color: #ff7978">S-</strong>Down<strong style="color: #ff7978">A-</strong>Left<strong style="color: #ff7978">D-</strong>Right</div></HTMLDivElement>',o.style.cssText="position: absolute;top: -50px;width: 100%;background: #fff;",e.parentNode.style.position="relative",e.parentNode.appendChild(o)}}]),e}();t.App=y},{"./Game":3,"./lib":16}],2:[function(e,o,t){var r=e("./lib"),n=e("./constants"),y=e("./entities/Point"),c=function(){function e(){var o=this;_classCallCheck(this,e),r.EventEmitter.on("stop game",function(e){r.EventEmitter.trigger("update field of game",{text:o._endOfTheGame(e.type)})})}return _createClass(e,[{key:"_endOfTheGame",value:function(e){var o=void 0,t=void 0;return t="lose"===e?n.END_GAME_TEXT.GAME_OVER_TEXT:n.END_GAME_TEXT.WIN_TEXT,o=t.map(function(e){return new y.Point(e)}).sort(function(){return Math.random()-.5})}}]),e}();t.EndGame=c},{"./constants":7,"./entities/Point":11,"./lib":16}],3:[function(e,o,t){var r=e("./lib"),n=e("./Processor"),y=e("./GameField"),c=e("./constants"),i=e("./EndGame"),l=function(){function e(o){_classCallCheck(this,e),this._scoreElement=o.score,this._shootTime=performance.now(),this._initGameComponents(o),this.checkScore=this.checkScore.bind(this),r.EventEmitter.on("update score",this.checkScore),document.addEventListener("keydown",this.checkMove.bind(this),!0)}return _createClass(e,[{key:"_initGameComponents",value:function(e){this._dataField=new y.GameField({list:e.el.querySelectorAll("rect")}),new n.Processor({dataField:this._dataField}),new i.EndGame}},{key:"checkScore",value:function(e){this._scoreElement.innerHTML="Score: "+e.score}},{key:"checkMove",value:function(e){var o=c.KEYBOARDS_CODE,t=o.right,n=o.left,y=o.down,i=o.up,l=o.fire,a=e.keyCode;if(a===l||a===i||a===y||a===t||a===n){switch(a){case l:var s=performance.now();(s-this._shootTime)/c.SHIP.TIME_OF_DELAY_SHOTTING>=1&&(this._shootTime=s,r.EventEmitter.trigger("fire"));break;case i:r.EventEmitter.trigger("move",{direction:"up"});break;case t:r.EventEmitter.trigger("move",{direction:"right"});break;case n:r.EventEmitter.trigger("move",{direction:"left"});break;case y:r.EventEmitter.trigger("move",{direction:"down"})}e.preventDefault(),e.stopPropagation()}}}]),e}();t.Game=l},{"./EndGame":2,"./GameField":4,"./Processor":5,"./constants":7,"./lib":16}],4:[function(e,o,t){var r=e("./constants"),n=function(){function e(o){_classCallCheck(this,e),this._dataField=this._initData(o.list)}return _createClass(e,[{key:"_initData",value:function(e){for(var o=[],t=0;t<e.length;t++)o.push({el:e[t],index:t});return o}},{key:"render",value:function(e){this._clearData();var o=this._checkVisiblePositions(e);this._dataField.forEach(function(e){o.forEach(function(o){e.index===o.x*r.FIELD_SIZE.columnLength+o.y&&(e.el.style.fill=o.color)})})}},{key:"endRender",value:function(e){var o=this,t=0;this._clearData(),setTimeout(function n(){var y=e[t];o._dataField.forEach(function(e){e.index===y.x*r.FIELD_SIZE.columnLength+y.y&&(e.el.style.fill=y.color)}),t++,t!==e.length&&setTimeout(n.bind(this),10)}.bind(this),10)}},{key:"_clearData",value:function(){this._dataField.forEach(function(e){e.el.style.fill="#eee"})}},{key:"getLenghtofData",value:function(){return this._dataField.length}},{key:"_checkVisiblePositions",value:function(e){return e.filter(function(e){return e.x>=r.FIELD_SIZE.leftX&&e.x<=r.FIELD_SIZE.rightX&&e.y>=r.FIELD_SIZE.topY&&e.y<=r.FIELD_SIZE.bottomY})}}]),e}();t.GameField=n},{"./constants":7}],5:[function(e,o,t){var r=e("./lib"),n=e("./entities/index"),y=e("./ProcessorForState"),c=e("./constants"),i=function(){function e(o){var t=this;_classCallCheck(this,e),this._isStopGame=!1,this._energyTypes=[],this._score=0,this._energyParams={},Object.keys(c.START_ENERGY_PARAMS).forEach(function(e){t._energyParams[e]=Object.assign({},c.START_ENERGY_PARAMS[e]),t._energyTypes.push(e)}),this._dataField=o.dataField,this._lengthOfField=this._dataField.getLenghtofData(),this._processorState=new y.ProcessorForState({types:this._energyTypes}),r.EventEmitter.on("fire",function(){!t._isStopGame&&t._processorState.get().spaceshipBullet.length<5&&t._shot("spaceshipBullet")}),r.EventEmitter.on("move",function(e){t._energyParams.spaceship.direction=c.SHIP.SPACE_SHIP_DIRECTION[e.direction]}),r.EventEmitter.on("start game",function(){t._prepareGameFieldToStart(),t._startProcess()}),r.EventEmitter.on("update field of game",function(e){t._dataField.endRender(e.text),t._isStopGame=!0})}return _createClass(e,[{key:"_prepareGameFieldToStart",value:function(){this._dataField.render([]),r.EventEmitter.trigger("update score",{score:0}),this._energyParams.enemy.duration=c.START_ENERGY_PARAMS.enemy.duration,this._score=0,this._processorState.clear(),clearInterval(this._timer),this._isStopGame&&(this._isStopGame=!1)}},{key:"_startProcess",value:function(){this._spaceShip=this._createSpaceShip(),this._timer=this._generateEvil(),this._processorState.add({type:"spaceship",instance:this._spaceShip});var e=this;requestAnimationFrame(function o(){if(!e._isStopGame){var t=e._moveAllEntities(),r=t.moved,n=t.all;e._draw(n),e._prepareNextStep(n,r),e._energyParams.spaceship.direction={x:0,y:0},requestAnimationFrame(o)}})}},{key:"_createSpaceShip",value:function(){return new n.Spaceship({colaider:c.SHIP.START_SHIP_POSITION.map(function(e){return new n.Point(e)})})}},{key:"_createEnemyShip",value:function(){var e=this._generateColaider(),o=e.x,t=e.y;return new n.Enemyship({colaider:[new n.Point({type:"body",x:o,y:t,color:"green"}),new n.Point({type:"body",x:o+1,y:t,color:"green"})]})}},{key:"_generateEvil",value:function(){var e=this,o=setInterval(function(){e._processorState.add({type:"enemy",instance:e._createEnemyShip()})},1e3);return o}},{key:"_prepareForStarOfDeath",value:function(){var e=this;clearInterval(this._timer),this._processorState.clearFotStarOfDeath(),this._generateStarOfDeath(),this._timer=setInterval(function(){e._shot("enemyBullet")},800)}},{key:"_moveAllEntities",value:function(){var e=this,o=this._processorState.get(),t={};return this._energyTypes.forEach(function(r){if("spaceship"==r){var n=e._spaceShip.colaider.reduce(function(e,o){return e.x<o.x?e:o}),y=[];e._spaceShip.colaider.forEach(function(e){"gun"===e.type&&y.push(e)});for(var i=e._energyParams.spaceship.direction.y,l=e._energyParams.spaceship.direction.x,a=0;a<y.length;a++)if(y[a].y===c.FIELD_SIZE.bottomY&&i>0||y[a].y===c.FIELD_SIZE.topY&&i<0||n.x===c.FIELD_SIZE.leftX&&l<0||y[a].x===c.FIELD_SIZE.rightX&&l>0)return}o[r].forEach(function(o){var n=o.move(e._energyParams[r]);n&&(t[r]?t[r].push(o):t[r]=[o])})}),{moved:t,all:o}}},{key:"_checkCriticalPoint",value:function(e,o,t){var r=this;switch(e){case"spaceship":this.checkCrash(t.enemy,o),this.checkCrash(t.enemyBullet,o),this.checkCrash(t.starOfDeath,o),o.removed&&(this._settingsToStopGame(),this._resultOfAction("lose"));break;case"spaceshipBullet":if(this.checkCrash(t.enemy,o),this.checkCrash(t.enemyBullet,o),o.removed)return void this._resultOfAction("kill");t.starOfDeath.forEach(function(e){e.checkPosition(o.colaider)&&(o.removed=!0),o.checkPosition(e.getAimColider())&&r._resultOfAction("win")}),o.colaider[0].x>=c.FIELD_SIZE.rightX&&(o.removed=!0);break;case"enemy":if(this.checkCrash(t.spaceshipBullet,o),this.checkCrash(t.spaceship,o),o.removed)return void this._resultOfAction("kill");this._spaceShip.removed&&this._resultOfAction("lose");var n=o.colaider.filter(function(e){return e.x>c.FIELD_SIZE.leftX});n.length||(o.removed=!0);break;case"enemyBullet":this.checkCrash(t.spaceshipBullet,o),this.checkCrash(t.spaceship,o),o.colaider.x<c.FIELD_SIZE.leftX&&(o.removed=!0);break;case"starOfDeath":this.checkCrash(t.spaceship,o),o.getGunCordinates().x<c.FIELD_SIZE.leftX&&(o.removed=!0),t.spaceshipBullet.forEach(function(e){e.checkPosition(o.colaider)&&(e.removed=!0),e.checkPosition(o.getAimColider())&&r._resultOfAction("win")})}}},{key:"_resultOfAction",value:function(e){switch(e){case"lose":r.EventEmitter.trigger("stop game",{type:"lose"});break;case"win":r.EventEmitter.trigger("stop game",{type:"win"});break;case"kill":this._checkScore()}}},{key:"checkCrash",value:function(e,o){e.forEach(function(e){e.checkPosition(o.colaider)&&(e.removed=!0,o.removed=!0)})}},{key:"_draw",value:function(e){var o=[];this._energyTypes.forEach(function(t){e[t].forEach(function(e){o.push(e.colaider)})});var t=r.concatAll(o);this._dataField.render(t)}},{key:"_prepareNextStep",value:function(e,o){var t=this;this._energyTypes.forEach(function(r){o[r]&&o[r].forEach(function(o){t._checkCriticalPoint(r,o,e)})}),this._updateState(e)}},{key:"_settingsToStopGame",value:function(){clearInterval(this._timer),this._processorState.clear(),this._isStopGame=!0}},{key:"_updateState",value:function(e){var o={};this._energyTypes.forEach(function(t){o[t]=e[t].filter(function(e){return!e.removed})}),this._processorState.update(o)}},{key:"_shot",value:function(e){var o=this;switch(e){case"spaceshipBullet":this._spaceShip.getGunCordinates().forEach(function(e){var t={x:e.x+1,y:e.y,color:"#f00",type:"body"};o._processorState.add({type:"spaceshipBullet",instance:new n.Bullet({colaider:[new n.Point(t)]})})});break;case"enemyBullet":this._starOfDeath.getGunCordinates().forEach(function(e){var t={x:e.x-2,y:e.y,color:"#eecb0f",type:"body"};o._processorState.add({type:"enemyBullet",instance:new n.Bullet({colaider:[new n.Point(t)]})})})}}},{key:"_generateColaider",value:function(){var e=c.FIELD_SIZE.rightX,o=c.FIELD_SIZE.maxLength-this._lengthOfField,t=Math.round(Math.random()*(c.FIELD_SIZE.bottomY-c.FIELD_SIZE.topY)+c.FIELD_SIZE.topY);return t>=o&&e--,{x:e,y:t}}},{key:"_generateStarOfDeath",value:function(){this._starOfDeath=new n.StarOfDeath({colaider:c.STAR_OF_DEATH_POSITION.map(function(e){return new n.Point(e)})}),this._processorState.add({type:"starOfDeath",instance:this._starOfDeath})}},{key:"_checkScore",value:function(){if(this._score+=10,r.EventEmitter.trigger("update score",{score:this._score}),600===this._score)this._prepareForStarOfDeath();else if(this._score-100*Math.floor(this._score/100)===0){var e=this._energyParams.enemy.duration;this._energyParams.enemy.duration=e*this._changeDifficulty(this._score)}}},{key:"_changeDifficulty",value:function(e){return 1-Math.floor(e/100)/10}}]),e}();t.Processor=i},{"./ProcessorForState":6,"./constants":7,"./entities/index":14,"./lib":16}],6:[function(e,o,t){var r=function(){function e(o){var t=this;_classCallCheck(this,e),this._currentState={},o.types.forEach(function(e){t._currentState[e]=[]})}return _createClass(e,[{key:"add",value:function(e){this._currentState[e.type].push(e.instance)}},{key:"get",value:function(){return this._currentState}},{key:"update",value:function(e){this._currentState=e}},{key:"clear",value:function(){var e=this;Object.keys(this._currentState).forEach(function(o){e._currentState[o]=[]})}},{key:"clearFotStarOfDeath",value:function(){var e=this;Object.keys(this._currentState).forEach(function(o){"starOfDeath"!=o&&"spaceship"!=o&&(e._currentState[o]=[])})}}]),e}();t.ProcessorForState=r},{}],7:[function(e,o,t){var r={right:68,left:65,down:83,up:87,fire:76};t.KEYBOARDS_CODE=r;var n={leftX:0,rightX:52,topY:0,bottomY:6,columnLength:7,maxLength:370};t.FIELD_SIZE=n;var y={enemy:{direction:{x:-1,y:0},duration:200},spaceshipBullet:{direction:{x:1,y:0},duration:60},enemyBullet:{direction:{x:-1,y:0},duration:70},spaceship:{direction:{x:0,y:0},duration:0},starOfDeath:{direction:{x:-1,y:0},duration:500}};t.START_ENERGY_PARAMS=y;var c={START_SHIP_POSITION:[{type:"body",x:0,y:2,color:"#00f"},{type:"body",x:0,y:3,color:"#00f"},{type:"body",x:0,y:4,color:"#00f"},{type:"gun",x:1,y:3,color:"#00f"}],SPACE_SHIP_DIRECTION:{right:{x:1,y:0},left:{x:-1,y:0},down:{x:0,y:1},up:{x:0,y:-1}},TIME_OF_DELAY_SHOTTING:300};t.SHIP=c;var i={GAME_OVER_TEXT:[{x:1,y:0,color:"green",type:"body"},{x:2,y:0,color:"green",type:"body"},{x:3,y:0,color:"green",type:"body"},{x:9,y:0,color:"green",type:"body"},{x:14,y:0,color:"green",type:"body"},{x:18,y:0,color:"green",type:"body"},{x:20,y:0,color:"green",type:"body"},{x:21,y:0,color:"green",type:"body"},{x:22,y:0,color:"green",type:"body"},{x:27,y:0,color:"green",type:"body"},{x:28,y:0,color:"green",type:"body"},{x:29,y:0,color:"green",type:"body"},{x:32,y:0,color:"green",type:"body"},{x:36,y:0,color:"green",type:"body"},{x:38,y:0,color:"green",type:"body"},{x:39,y:0,color:"green",type:"body"},{x:40,y:0,color:"green",type:"body"},{x:42,y:0,color:"green",type:"body"},{x:43,y:0,color:"green",type:"body"},{x:44,y:0,color:"green",type:"body"},{x:1,y:1,color:"green",type:"body"},{x:8,y:1,color:"green",type:"body"},{x:10,y:1,color:"green",type:"body"},{x:14,y:1,color:"green",type:"body"},{x:15,y:1,color:"green",type:"body"},{x:17,y:1,color:"green",type:"body"},{x:18,y:1,color:"green",type:"body"},{x:20,y:1,color:"green",type:"body"},{x:26,y:1,color:"green",type:"body"},{x:30,y:1,color:"green",type:"body"},{x:32,y:1,color:"green",type:"body"},{x:36,y:1,color:"green",type:"body"},{x:38,y:1,color:"green",type:"body"},{x:42,y:1,color:"green",type:"body"},{x:45,y:1,color:"green",type:"body"},{x:1,y:2,color:"green",type:"body"},{x:8,y:2,color:"green",type:"body"},{x:10,y:2,color:"green",type:"body"},{x:14,y:2,color:"green",type:"body"},{x:16,y:2,color:"green",type:"body"},{x:18,y:2,color:"green",type:"body"},{x:20,y:2,color:"green",type:"body"},{x:26,y:2,color:"green",type:"body"},{x:30,y:2,color:"green",type:"body"},{x:32,y:2,color:"green",type:"body"},{x:36,y:2,color:"green",type:"body"},{x:38,y:2,color:"green",type:"body"},{x:42,y:2,color:"green",type:"body"},{x:45,y:2,color:"green",type:"body"},{x:1,y:3,color:"green",type:"body"},{x:3,y:3,color:"green",type:"body"},{x:4,y:3,color:"green",type:"body"},{x:7,y:3,color:"green",type:"body"},{x:11,y:3,color:"green",type:"body"},{x:14,y:3,color:"green",type:"body"},{x:18,y:3,color:"green",type:"body"},{x:20,y:3,color:"green",type:"body"},{x:21,y:3,color:"green",type:"body"},{x:22,y:3,color:"green",type:"body"},{x:26,y:3,color:"green",type:"body"},{x:30,y:3,color:"green",type:"body"},{x:32,y:3,color:"green",type:"body"},{x:36,y:3,color:"green",type:"body"},{x:38,y:3,color:"green",type:"body"},{x:39,y:3,color:"green",type:"body"},{x:40,y:3,color:"green",type:"body"},{x:42,y:3,color:"green",type:"body"},{x:43,y:3,color:"green",type:"body"},{x:44,y:3,color:"green",type:"body"},{x:1,y:4,color:"green",type:"body"},{x:4,y:4,color:"green",type:"body"},{x:7,y:4,color:"green",type:"body"},{x:8,y:4,color:"green",type:"body"},{x:9,y:4,color:"green",type:"body"},{x:10,y:4,color:"green",type:"body"},{x:11,y:4,color:"green",type:"body"},{x:14,y:4,color:"green",type:"body"},{x:18,y:4,color:"green",type:"body"},{x:20,y:4,color:"green",type:"body"},{x:26,y:4,color:"green",type:"body"},{x:30,y:4,color:"green",type:"body"},{x:32,y:4,color:"green",type:"body"},{x:36,y:4,color:"green",type:"body"},{x:38,y:4,color:"green",type:"body"},{x:42,y:4,color:"green",type:"body"},{x:43,y:4,color:"green",type:"body"},{x:1,y:5,color:"green",type:"body"},{x:4,y:5,color:"green",type:"body"},{x:6,y:5,color:"green",type:"body"},{x:12,y:5,color:"green",type:"body"},{x:14,y:5,color:"green",type:"body"},{x:18,y:5,color:"green",type:"body"},{x:20,y:5,color:"green",type:"body"},{x:26,y:5,color:"green",type:"body"},{x:30,y:5,color:"green",type:"body"},{x:33,y:5,color:"green",type:"body"},{x:35,y:5,color:"green",type:"body"},{x:38,y:5,color:"green",type:"body"},{x:42,y:5,color:"green",type:"body"},{x:44,y:5,color:"green",type:"body"},{x:1,y:6,color:"green",type:"body"},{x:2,y:6,color:"green",type:"body"},{x:3,y:6,color:"green",type:"body"},{x:4,y:6,color:"green",type:"body"},{x:6,y:6,color:"green",type:"body"},{x:12,y:6,color:"green",type:"body"},{x:14,y:6,color:"green",type:"body"},{x:18,y:6,color:"green",type:"body"},{x:20,y:6,color:"green",type:"body"},{x:21,y:6,color:"green",type:"body"},{x:22,y:6,color:"green",type:"body"},{x:27,y:6,color:"green",type:"body"},{x:28,y:6,color:"green",type:"body"},{x:29,y:6,color:"green",type:"body"},{x:34,y:6,color:"green",type:"body"},{x:38,y:6,color:"green",type:"body"},{x:39,y:6,color:"green",type:"body"},{x:40,y:6,color:"green",type:"body"},{x:42,y:6,color:"green",type:"body"},{x:45,y:6,color:"green",type:"body"},{x:47,y:6,color:"green",type:"body"},{x:49,y:6,color:"green",type:"body"},{x:51,y:6,color:"green",type:"body"}],WIN_TEXT:[{x:2,y:0,color:"green",type:"body"},{x:6,y:0,color:"green",type:"body"},{x:9,y:0,color:"green",type:"body"},{x:10,y:0,color:"green",type:"body"},{x:11,y:0,color:"green",type:"body"},{x:14,y:0,color:"green",type:"body"},{x:18,y:0,color:"green",type:"body"},{x:23,y:0,color:"green",type:"body"},{x:26,y:0,color:"green",type:"body"},{x:29,y:0,color:"green",type:"body"},{x:31,y:0,color:"green",type:"body"},{x:32,y:0,color:"green",type:"body"},{x:33,y:0,color:"green",type:"body"},{x:34,y:0,color:"green",type:"body"},{x:35,y:0,color:"green",type:"body"},{x:37,y:0,color:"green",type:"body"},{x:43,y:0,color:"green",type:"body"},{x:46,y:0,color:"green",type:"body"},{x:48,y:0,color:"green",type:"body"},{x:50,y:0,color:"green",type:"body"},{x:2,y:1,color:"green",type:"body"},{x:6,y:1,color:"green",type:"body"},{x:8,y:1,color:"green",type:"body"},{x:12,y:1,color:"green",type:"body"},{x:14,y:1,color:"green",type:"body"},{x:18,y:1,color:"green",type:"body"},{x:23,y:1,color:"green",type:"body"},{x:26,y:1,color:"green",type:"body"},{x:29,y:1,color:"green",type:"body"},{x:33,y:1,color:"green",type:"body"},{x:37,y:1,color:"green",type:"body"},{x:38,y:1,color:"green",type:"body"},{x:43,y:1,color:"green",type:"body"},{x:46,y:1,color:"green",type:"body"},{x:48,y:1,color:"green",type:"body"},{x:50,y:1,color:"green",type:"body"},{x:3,y:2,color:"green",type:"body"},{x:5,y:2,color:"green",type:"body"},{x:8,y:2,color:"green",type:"body"},{x:12,y:2,color:"green",type:"body"},{x:14,y:2,color:"green",type:"body"},{x:18,y:2,color:"green",type:"body"},{x:23,y:2,color:"green",type:"body"},{x:26,y:2,color:"green",type:"body"},{x:29,y:2,color:"green",type:"body"},{x:33,y:2,color:"green",type:"body"},{x:37,y:2,color:"green",type:"body"},{x:39,y:2,color:"green",type:"body"},{x:43,y:2,color:"green",type:"body"},{x:46,y:2,color:"green",type:"body"},{x:48,y:2,color:"green",type:"body"},{x:50,y:2,color:"green",type:"body"},{x:4,y:3,color:"green",type:"body"},{x:8,y:3,color:"green",type:"body"},{x:12,y:3,color:"green",type:"body"},{x:14,y:3,color:"green",type:"body"},{x:18,y:3,color:"green",type:"body"},{x:23,y:3,color:"green",type:"body"},{x:26,y:3,color:"green",type:"body"},{x:29,y:3,color:"green",type:"body"},{x:33,y:3,color:"green",type:"body"},{x:37,y:3,color:"green",type:"body"},{x:40,y:3,color:"green",type:"body"},{x:43,y:3,color:"green",type:"body"},{x:46,y:3,color:"green",type:"body"},{x:48,y:3,color:"green",type:"body"},{x:50,y:3,color:"green",type:"body"},{x:4,y:4,color:"green",type:"body"},{x:8,y:4,color:"green",type:"body"},{x:12,y:4,color:"green",type:"body"},{x:14,y:4,color:"green",type:"body"},{x:18,y:4,color:"green",type:"body"},{x:23,y:4,color:"green",type:"body"},{x:26,y:4,color:"green",type:"body"},{x:29,y:4,color:"green",type:"body"},{x:33,y:4,color:"green",type:"body"},{x:37,y:4,color:"green",type:"body"},{x:41,y:4,color:"green",type:"body"},{x:43,y:4,color:"green",type:"body"},{x:46,y:4,color:"green",type:"body"},{x:48,y:4,color:"green",type:"body"},{x:50,y:4,color:"green",type:"body"},{x:4,y:5,color:"green",type:"body"},{x:8,y:5,color:"green",type:"body"},{x:12,y:5,color:"green",type:"body"},{x:15,y:5,color:"green",type:"body"},{x:17,y:5,color:"green",type:"body"},{x:18,y:5,color:"green",type:"body"},{x:24,y:5,color:"green",type:"body"},{x:26,y:5,color:"green",type:"body"},{x:28,y:5,color:"green",type:"body"},{x:33,y:5,color:"green",type:"body"},{x:37,y:5,color:"green",type:"body"},{x:42,y:5,color:"green",type:"body"},{x:43,y:5,color:"green",type:"body"},{x:4,y:6,color:"green",type:"body"},{x:9,y:6,color:"green",type:"body"},{x:10,y:6,color:"green",type:"body"},{x:11,y:6,color:"green",type:"body"},{x:16,y:6,color:"green",type:"body"},{x:18,y:6,color:"green",type:"body"},{x:19,y:6,color:"green",type:"body"},{x:25,y:6,color:"green",type:"body"},{x:27,y:6,color:"green",type:"body"},{x:31,y:6,color:"green",type:"body"},{x:32,y:6,color:"green",type:"body"},{x:33,y:6,color:"green",type:"body"},{x:34,y:6,color:"green",type:"body"},{x:35,y:6,color:"green",type:"body"},{x:37,y:6,color:"green",type:"body"},{x:43,y:6,color:"green",type:"body"},{x:46,y:6,color:"green",type:"body"},{x:48,y:6,color:"green",type:"body"},{x:50,y:6,color:"green",type:"body"}]};t.END_GAME_TEXT=i;var l=[{type:"body",x:54,y:1,color:"black"},{type:"body",x:55,y:1,color:"black"},{type:"body",x:53,y:2,color:"black"},{type:"body",x:54,y:2,color:"black"},{type:"body",x:55,y:2,color:"black"},{type:"body",x:56,y:2,color:"black"},{type:"body",x:52,y:3,color:"black"},{type:"body",x:53,y:3,color:"black"},{type:"body",x:54,y:3,color:"black"},{type:"body",x:55,y:3,color:"black"},{type:"body",x:56,y:3,color:"black"},{type:"gun",x:57,y:3,color:"black"},{type:"body",x:53,y:4,color:"black"},{type:"body",x:54,y:4,color:"black"},{type:"body",x:55,y:4,color:"black"},{type:"body",x:56,y:4,color:"black"},{type:"body",x:54,y:5,color:"black"},{type:"body",x:55,y:5,color:"black"}];t.STAR_OF_DEATH_POSITION=l},{}],8:[function(e,o,t){var r=e("./Energy"),n=function(e){function o(e){return _classCallCheck(this,o),_possibleConstructorReturn(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,e))}return _inherits(o,e),o}(r.Energy);t.Bullet=n},{"./Energy":10}],9:[function(e,o,t){var r=e("./Energy"),n=function(e){function o(e){return _classCallCheck(this,o),_possibleConstructorReturn(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,e))}return _inherits(o,e),o}(r.Energy);t.Enemyship=n},{"./Energy":10}],10:[function(e,o,t){var r=function(){function e(o){_classCallCheck(this,e),this.colaider=o.colaider,this._time=performance.now(),this.removed=!1}return _createClass(e,[{key:"move",value:function(e){var o=e.direction,t=e.duration,r=performance.now();if(!((r-this._time)/t<1))return this.colaider.forEach(function(e){return e.movePoint(o)}),this._time=r,!0}},{key:"checkPosition",value:function(e){var o=this,t=!1;return e.forEach(function(e){o.colaider.forEach(function(o){e.isSame(o)&&(t=!0)})}),t}}]),e}();t.Energy=r},{}],11:[function(e,o,t){var r=function(){function e(o){_classCallCheck(this,e),this.type=o.type,this.x=o.x,this.y=o.y,this.color=o.color}return _createClass(e,[{key:"isSame",value:function(e){return this.x===e.x&&this.y===e.y}},{key:"movePoint",value:function(e){this.x+=e.x,this.y+=e.y}}]),e}();t.Point=r},{}],12:[function(e,o,t){var r=e("./Energy"),n=function(e){function o(e){return _classCallCheck(this,o),_possibleConstructorReturn(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,e))}return _inherits(o,e),_createClass(o,[{key:"getGunCordinates",value:function(){return this.colaider.filter(function(e){return"gun"===e.type})}}]),o}(r.Energy);t.Spaceship=n},{"./Energy":10}],13:[function(e,o,t){var r=e("./Energy"),n=function(e){function o(e){_classCallCheck(this,o);var t=_possibleConstructorReturn(this,(o.__proto__||Object.getPrototypeOf(o)).call(this,e));return t._initAim(),t}return _inherits(o,e),_createClass(o,[{key:"_initAim",value:function(){setTimeout(function e(){this._generateAim(this.colaider),setTimeout(e.bind(this),400)}.bind(this),400)}},{key:"_generateAim",value:function(e){var o=this._generateAimColaider(e);e.forEach(function(e){"aim"===e.type&&(e.type="body",e.color="#000"),e.x===o.x&&e.y===o.y&&(e.color="#f00",e.type="aim")})}},{key:"_generateAimColaider",value:function(e){var o=e.reduce(function(e,o){return e.y>o.y?e:o}),t=e.reduce(function(e,o){return e.y<o.y?e:o}),r=Math.round(Math.random()*(o.y-t.y)+t.y),n=e.filter(function(e){return e.y===r}).reduce(function(e,o){return e.x<o.x?e:o}).x;return{x:n,y:r}}},{key:"getGunCordinates",value:function(){return this.colaider.filter(function(e){return"gun"===e.type})}},{key:"getAimColider",value:function(){return this.colaider.filter(function(e){return"aim"===e.type})}}]),o}(r.Energy);t.StarOfDeath=n},{"./Energy":10}],14:[function(e,o,t){function r(e){for(var o in e)t.hasOwnProperty(o)||(t[o]=e[o])}r(e("./Point")),r(e("./Spaceship")),r(e("./Bullet")),r(e("./Energy")),r(e("./Enemyship")),r(e("./StarOfDeath"))},{"./Bullet":8,"./Enemyship":9,"./Energy":10,"./Point":11,"./Spaceship":12,"./StarOfDeath":13}],15:[function(e,o,t){var r=e("./App");if(document.querySelector(".js-calendar-graph-svg")){new r.App({svg:document.querySelector(".js-calendar-graph-svg")})}else window.location="https://smiranin.github.io/star-wars/"},{"./App":1}],16:[function(e,o,t){function r(e,o){var t=!1,r=null,n=null;return function y(){return t?(r=arguments,void(n=this)):(t=!0,e.call(this),void setTimeout(function(){t=!1,r&&(y.call(n),n=null,r=null)},o))}}function n(e){var o=[];return e.forEach(function(e){o.push.apply(o,e)}),o}var y={subscribers:{},on:function(e,o){var t=e||"default";this.subscribers[t]||(this.subscribers[t]=[]),this.subscribers[t].push(o)},off:function(e,o){this.subscribers[e]?this.subscribers[e]=this.subscribers[e].filter(function(e){return o!==e}):console.error(e+" not found!")},trigger:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=this.subscribers[e];if(t)for(var r=0,n=t.length;r<n;r++)t[r](o);else console.log("EE.trigger: not found subscribers for "+e+" event")},offAll:function(e){this.subscribers[e]&&(this.subscribers[e]=[])}};t.EventEmitter=y,t.throttle=r,t.concatAll=n},{}]},{},[15]);