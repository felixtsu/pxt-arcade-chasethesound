namespace SpriteKind {
    export const DarkStatue = SpriteKind.create()
    export const LightStatue = SpriteKind.create()
    export const TrueStatue = SpriteKind.create()
    export const FakeStatue = SpriteKind.create()
}
namespace myTiles {
    //% blockIdentity=images._tile
    export const tile0 = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `
}

function disablePlayerControl() {
    controller.moveSprite(hero, 0, 0)
    hero.setFlag(SpriteFlag.Ghost, true)
}

function enablePlayerControl() {
    hero.setFlag(SpriteFlag.Ghost, false)
    controller.moveSprite(hero)
}


let soundHandlerHolder = [function() {}]
function registerSoundHandler(handler:() =>void) {
    soundHandlerHolder[0] = handler
} 
game.onUpdateInterval(100, function () {
    soundHandlerHolder[0]()
})

let statue = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . d d d . . . . . .
    . . . . . . d b b b . . . . . .
    . . . . . . d b d d . . . . . .
    . . . . . . b d d d . . . . . .
    . . . . . . b c d b d . . . . .
    . . . . . . c b c b d d . . . .
    . . . . . . b d b d b d . . . .
    . . . . . c b d b d c d . . . .
    . . . . . c b b b d d b . . . .
    . . . . . c f b d b d d . . . .
    . . . . b c f b d d b d . . . .
    . . . . b c f d d d d . . . . .
    . . . . b f b d d d d . . . . .
    . . . b b f d d d d d b . . . .
    . . . d c b d d d d d d . . . .
    . . . . . b d d d d d d . . . .
    . . . . . b d d b d d d . . . .
    . . . . . b d d b d d d b . . .
    . c c c c b d d b d d d d c c .
    c d d d b b d b b d d d d b d c
    b d d b d b d b b d d b d b d b
    b d d b d d d b b d d b b b d b
    b d d d b d d b b d d b b d d b
    b d d d d b b b b b b b b d d b
    b d d d d d b b b b b d d d d b
    c d d d d d d d d d d d d d d c
    b c c d d d d d d d d d d c c b
    d b b b b b b b b b b b b b b d
    d b b b b c c c c c c b b b b d
    c b b b b b b b b b b b b b b c
    f c c c c c c c c c c c c c c f
`, SpriteKind.DarkStatue)
let hero = sprites.create(img`
    . . . . . f f 4 4 f f . . . . .
    . . . . f 5 4 5 5 4 5 f . . . .
    . . . f e 4 5 5 5 5 4 e f . . .
    . . f b 3 e 4 4 4 4 e 3 b f . .
    . . f 3 3 3 3 3 3 3 3 3 3 f . .
    . f 3 3 e b 3 e e 3 b e 3 3 f .
    . f 3 3 f f e e e e f f 3 3 f .
    . f b b f b f e e f b f b b f .
    . f b b e 1 f 4 4 f 1 e b b f .
    f f b b f 4 4 4 4 4 4 f b b f f
    f b b f f f e e e e f f f b b f
    . f e e f b d d d d b f e e f .
    . . e 4 c d d d d d d c 4 e . .
    . . e f b d b d b d b b f e . .
    . . . f f 1 d 1 d 1 d f f . . .
    . . . . . f f b b f f . . . . .
`, SpriteKind.Player)
let soundStartCountDown = 3
controller.moveSprite(hero)
tiles.setTilemap(tiles.createTilemap(
            hex`0f000f001115151c1515150a1515151c151518130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f141b0f0f0f0f0f0f0f0f0f0f0f0f0f19130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f140b0f0f0f0f0f0f0f0f0f0f0f0f0f0c130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f141b0f0f0f0f0f0f0f0f0f0f0f0f0f19130f0f0f0f0f0f0f0f0f0f0f0f0f14130f0f0f0f0f0f0f0f0f0f0f0f0f141216161a161616091616161a161617`,
            img`
                2 2 2 2 2 2 2 . 2 2 2 2 2 2 2
                2 . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . 2
                . . . . . . . . . . . . . . .
                2 . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . 2
                2 . . . . . . . . . . . . . 2
                2 2 2 2 2 2 2 . 2 2 2 2 2 2 2
            `,
            [myTiles.tile0,sprites.dungeon.darkGroundNorthWest0,sprites.dungeon.darkGroundNorthEast0,sprites.dungeon.darkGroundSouthWest0,sprites.dungeon.darkGroundSouthEast0,sprites.dungeon.darkGroundWest,sprites.dungeon.darkGroundNorth,sprites.dungeon.darkGroundEast,sprites.dungeon.darkGroundSouth,sprites.dungeon.stairSouth,sprites.dungeon.stairNorth,sprites.dungeon.stairWest,sprites.dungeon.stairEast,sprites.dungeon.darkGroundNorthWest1,sprites.dungeon.hazardHole,sprites.dungeon.darkGroundCenter,sprites.dungeon.purpleInnerNorthEast,sprites.dungeon.purpleOuterNorthWest,sprites.dungeon.purpleOuterSouthEast,sprites.dungeon.purpleOuterWest0,sprites.dungeon.purpleOuterEast0,sprites.dungeon.purpleOuterNorth1,sprites.dungeon.purpleOuterSouth1,sprites.dungeon.purpleOuterSouthWest,sprites.dungeon.purpleOuterNorthEast,sprites.dungeon.purpleOuterEast2,sprites.dungeon.purpleOuterSouth2,sprites.dungeon.purpleOuterWest2,sprites.dungeon.purpleOuterNorth2],
            TileScale.Sixteen
        ))
tiles.placeOnTile(statue, tiles.getTileLocation(7, 7))
tiles.placeOnTile(hero, tiles.getTileLocation(7, 9))
scene.cameraFollowSprite(hero)

phraseone.startTrial()
