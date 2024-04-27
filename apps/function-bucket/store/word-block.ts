// export type OneLetterString = `` | `a` | `b` | `c` | `d` | `e` | `f` | `g` | `h` | `i` | `j` | `k` | `l` | `m` | `n` | `o` | `p` | `q` | `r` | `s` | `t` | `u` | `v` | `w` | `x` | `y` | `z`;
// export type LetterStatus = 'absent' | 'blocked' | 'correct' | 'misplaced'
// export type RoundStatus = 'planned' | 'open' | 'closed' | 'settled'
// export type GameStatus = 'waiting' | 'ready' | 'playing' | 'complete' | 'abandoned'

// export type LetterResult = {
//   letter: OneLetterString
//   status: LetterStatus
//   cssSegment: string
// }
// export type RoundResult = {
//   letterResults: LetterResult[]
//   blockResult: LetterResult
// }
// export type WordBlockRound = {
//   roundNumber: number
//   status: RoundStatus
//   guess?: string
//   blockingLetter: OneLetterString
//   result: RoundResult
// }
// export type WordBlockGame = {
//   status: GameStatus
//   word: string
//   wordLength: number
//   numberOfRounds: number
//   rounds: WordBlockRound[]
//   currentRoundNumber: number
// }

export const useWordBlockStore = defineStore('word-block', () => {
  const game = ref()

  return {
    game
  }
  // const game: Ref<WordBlockGame> = ref({
  //   status: 'ready',
  //   word: 'tacos',
  //   wordLength: 5,
  //   numberOfRounds: 6,
  //   rounds: [
  //   ],
  //   currentRoundNumber: 0
  // })

  // const currentRound: Ref<WordBlockRound | undefined> = computed((): WordBlockRound | undefined => {
  //   return game.value.rounds.find(r => r.roundNumber === game.value.currentRoundNumber)
  //   // const round = game.value.currentRound ?? game.value.rounds.find(r => r.status === 'planned')
  //   // const retval = game.value.rounds.at(-1)
  //   // return retval
  // })

  // const startNewGame = async () => {
  //   const words = [ 'tacos', 'pizza', 'sushi', 'curry', 'apple' ]
  //   const word = words[Math.floor(Math.random() * words.length)];
  //   const numberOfRounds = 6

  //   game.value = {
  //     status: 'playing',
  //     word,
  //     wordLength: word.length,
  //     numberOfRounds: numberOfRounds,
  //     currentRoundNumber: 0,
  //     rounds: Array.from({length: numberOfRounds}, (v, i): WordBlockRound => {
  //       return {
  //         roundNumber: i,
  //         status: 'planned',
  //         blockingLetter: '',
  //         result: {
  //           letterResults: Array.from({length: game.value.wordLength}, (v, i): LetterResult => {
  //             return {
  //               letter: '',
  //               status: 'absent',
  //               cssSegment: ''
  //             }
  //           }),
  //           blockResult: {
  //             letter: '',
  //             status: 'absent',
  //             cssSegment: ''
  //           }
  //         }
  //       }
  //     })
  //   }

  //   await startNewRound()
  // }

  // const startNewRound = async () => {
  //   if (!currentRound.value || currentRound.value.status === 'settled') {
  //     const nextRound = game.value.rounds.find(r => r.status === 'planned')
  //     game.value.currentRoundNumber = nextRound?.roundNumber || game.value.currentRoundNumber
  //     if (nextRound) {
  //       nextRound.status = 'open'
  //     } else {
  //       throw new Error('Cannot start new round, game is complete!')
  //     }
  //   }
  // }

  // const setGuess = async (word: string) => {
  //   if (!currentRound.value) throw new Error("Cannot set guess: no current round")
  //   const roundNumber = currentRound.value.roundNumber
  //   const previousGuessOfThisWord = game.value.rounds.find(r => 
  //     r.roundNumber !== roundNumber && r.guess === word
  //   )
  //   if (previousGuessOfThisWord) {
  //     throw new Error("Word previously guessed")
  //   }
  //   currentRound.value.guess = word
  //   currentRound.value.result.letterResults = word.split('').map(l => {
  //     return {
  //       letter: l as OneLetterString,
  //       state: 'absent',
  //       cssSegment: ''
  //     }
  //   })
  //   if (currentRound.value.blockingLetter) {
  //     currentRound.value.status = 'closed'
  //   }
  // }

  // const setBlockingLetter = async(letter: OneLetterString) => {
  //   if (!currentRound.value) throw new Error("Cannot set blocking letter: no current round")

  //   const blockHasOccurred = game.value.rounds.find(r => r.result.blockResult.status === 'blocked')
  //   if (blockHasOccurred) throw new Error('A block has already occurred in this game')
  //   currentRound.value.blockingLetter = letter
  //   if (currentRound.value.guess) {
  //     currentRound.value.status = 'closed'
  //   }
  // }

  // const settleCurrentRound = async() => {
  //   if (!currentRound.value) throw new Error("Cannot settle: no current round")
  //   if (currentRound.value.status !== 'closed') throw new Error("Round must be closed in order to settle")
  //   if (!currentRound.value.guess) throw new Error("Invalid Game State - cannot settle current round without a guess")

  //   const letters = game.value.word.split('')
  //   const guessLetters = currentRound.value.guess.split('')
  //   const blockingLetter = currentRound.value.blockingLetter
  //   const letterResults = guessLetters.map((l, i): LetterResult => {
  //       const letterIsAbsent = letters.indexOf(l) === -1
  //       const letterIsCorrect = letters.at(i) === l
  //       const letterIsBlocked = !letterIsAbsent && blockingLetter !== '' ? String(blockingLetter) === l : false
  //       const letterIsMisplaced = !letterIsAbsent && !letterIsCorrect

  //       if (letterIsAbsent) {
  //         return { letter: l as OneLetterString, status: 'absent', cssSegment: ''}
  //       } else if (letterIsBlocked) {
  //         return { letter: l as OneLetterString, status: 'blocked', cssSegment: 'bg-red-600'}
  //       } else if (letterIsMisplaced) {
  //         return { letter: l as OneLetterString, status: 'misplaced', cssSegment: 'bg-yellow-600'}
  //       } else {
  //         return { letter: l as OneLetterString, status: 'correct', cssSegment: 'bg-green-600'}
  //       }
  //     })
  //   const blockedLetter = blockingLetter !== '' && 
  //     letterResults.find(lr => lr.letter === blockingLetter && lr.status === 'blocked')

  //   currentRound.value.result = {
  //     letterResults: letterResults,
  //     blockResult: {
  //       letter: blockingLetter,
  //       status: blockedLetter ? 'blocked' : 'absent',
  //       cssSegment: blockedLetter ? 'bg-green-600' : ''
  //     }
  //   }
  //   currentRound.value.status = 'settled'
  //   await startNewRound()
  // }

  // return { 
  //   game,
  //   currentRound,

  //   startNewGame,
  //   startNewRound,
  //   setGuess,
  //   setBlockingLetter,
  //   settleCurrentRound
  // }
})