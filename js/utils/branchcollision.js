function branchcollision({
    object1,
    object3
}
) {
    return (
        object1.position.y + object1.height >= object3.position.y && 
        object1.position.y <= object3.position.y + object3.height &&
        object1.position.x  <= object3.position.x + object3.width &&
        object1.position.x  + object1.width >= object3.position.x
    )
}

export { branchcollision }