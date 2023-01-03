// Add your code here
namespace phraseone {

    let currentTone: music.Melody
    let texts: string[]
    let volumeOverride: boolean = false
    let octave = ["C", "D", "E", "F", "G", "A", "B", "C5"]
    // let octave = ["C", "D"]
    let volume = 0
    let distance = 0
    let traversedRoom = 0
    let splashText = ""
    let splashTick = false
    let exitCandiate: string[] = []
    let currentRoomIndex = 0
    let exitSequence: string[] = []
    let nextExit = null
    let statueOverlapped = false
    let stairLookdown = false;

    game.onUpdate(function () {
        if (!hero.overlapsWith(statue)) {
            statueOverlapped = false
        }
    })

    function enterDoor(sprite: Sprite, location: tiles.Location, side: string) {
        if (stairLookdown) {
            return
        }
        if (!omitOverlap(sprite, location)) {
            let targetLocation: tiles.Location = getOppositeLocation(side)
            tiles.placeOnTile(sprite, targetLocation)
            if (traversedRoom < texts.length) {
                wanderingInSilence()
                splashText = texts[traversedRoom]
                traversedRoom += 1
                return
            } else {
                if (side == exitSequence[currentRoomIndex]) {
                    currentRoomIndex += 1
                } else {
                    currentRoomIndex = 0
                    scene.cameraShake(5, 500)
                    game.showLongText("The sound, I MUST follow the sound.", DialogLayout.Bottom)
                }
                currentTone.stop()
                currentTone = new music.Melody(octave[currentRoomIndex])
                currentTone.loop()
                if (currentRoomIndex == octave.length - 1) {
                    control.runInParallel(() => {
                        stairLookdown = true
                        currentTone.stop()
                        controller.moveSprite(sprite, 0, 0)
                        volumeOverride = true
                        phrasetwo.prepareConsonantTrial()
                        controller.moveSprite(sprite)    
                    })
                }
            }
        }
    }

    function wanderingInSilence() {
        if (traversedRoom == 4) {
            currentTone = new music.Melody(octave[currentRoomIndex])
            currentTone.loop()
        }
        splashTick = true
    }

    function omitOverlap(sprite: Sprite, location: tiles.Location) {
        if (Math.abs(location.x - sprite.x) > 16 || Math.abs(location.y - sprite.y) > 16) {
            return true;
        }
        return false;
    }
    function getOppositeLocation(side: String) {
        if (side == "N") {
            return tiles.getTileLocation(7, 13)
        } else if (side == "S") {
            return tiles.getTileLocation(7, 1)
        } else if (side == "W") {
            return tiles.getTileLocation(13, 7)
        } else {
            return tiles.getTileLocation(1, 7)
        }
    }
    function getExitLocation(side: String) {
        if (side == "N") {
            return tiles.getTileLocation(7, 0)
        } else if (side == "S") {
            return tiles.getTileLocation(7, 14)
        } else if (side == "W") {
            return tiles.getTileLocation(0, 7)
        } else {
            return tiles.getTileLocation(14, 7)
        }
    }

    function genRandomSequence() {
        exitCandiate = ["E", "S", "W"]
        exitSequence.push("N")
        for (let i = 1; i < 8; i++) {
            let candidate: string = Math.pickRandom(exitCandiate)
            exitSequence.push(candidate)
            exitCandiate.removeElement(candidate)
            exitCandiate.push(exitSequence[i - 1])
        }
    }

    export function startTrial() {
        scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairSouth, function (sprite, location) {
            enterDoor(sprite, location, "S")
        })
        scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairNorth, function (sprite, location) {
            enterDoor(sprite, location, "N")
        })
        scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairWest, function (sprite, location) {
            enterDoor(sprite, location, "W")
        })
        scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairEast, function (sprite, location) {
            enterDoor(sprite, location, "E")
        })
        sprites.onOverlap(SpriteKind.Player, SpriteKind.DarkStatue, function (sprite: Sprite, otherSprite: Sprite) {
            if (statueOverlapped) {
                return
            }
            statueOverlapped = true
            game.splash("The statue is dark and gloomy.")
        })

        texts = ["Another room, not supposed to be like this.", "Another room again?", "Again?", "No, I am returning to the SAME room!", "What's that sound?", "I MUST follow that sound."]
        game.onPaint(function () {
            if (splashTick) {
                game.splash(splashText)
            }
            splashTick = false
        })
        let currentTone: music.Melody = null

        registerSoundHandler(() => {
            if (volumeOverride) {
                return
            }
            if (currentRoomIndex < octave.length - 1) {
                let target = getExitLocation(exitSequence[currentRoomIndex])
                distance = Math.sqrt((target.x - hero.x) ** 2 + (target.y - hero.y) ** 2) / 16
                volume = 10 + (15 - distance) ** 3 / 2744 * 85
                music.setVolume(volume)
            }
        })

        genRandomSequence()

        pause(200)
        game.splash("Where am I?")
    }


}
