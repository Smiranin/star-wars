import {App} from "./App";

if(document.querySelector(".js-calendar-graph-svg")) {
    let app = new App({
        svg: document.querySelector(".js-calendar-graph-svg")
    })
} else {(<any>window).location="https://smiranin.github.io/star-wars/"}
