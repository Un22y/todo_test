
export function dragStartHandler(e,card) {
    console.log('drag ', card)
}

export function dragEndHandler(e,card) {
    
}

export function dragOverHandler(e,card) {
    e.preventDefault();
    
}

export function dropHandler(e,card) {
    e.preventDefault();
    console.log('drop ', card)
}