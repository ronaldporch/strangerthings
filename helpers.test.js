const {
  runTheChallenge,
  restructureShow,
  restructureEpisodes,
  getAirTimestampInEpoch,
  getShortTitle,
  getSequenceNumber,
  getTotalDurationInSeconds,
  getShortSummary,
  getCommonlyUsedWords,
  getEpisodeAverage,
  findFirstDustinSummary
} = require('./helpers')

describe('runTheChallenge()', () => {
  it('should return nothing, but you will see a console.log!', async () => {
    expect(await runTheChallenge()).toBe(undefined)
  })
})

describe('restructureShow()', () => {
  it('should restructure entire show object', () => {
    const show = {
      id: 2993,
      _embedded: {
        episodes: [
          {
            id: 578666,
            name: 'Chapter Five: The Flea and the Acrobat',
            season: 1,
            number: 5,
            airstamp: '2016-07-15T12:00:00+00:00',
            runtime: 60,
            summary:
              '<p>Jim searches for Will at Hawkins Laboratory, but finds something unexpected. Meanwhile, Lonnie helps Joyce bury Will but reveals an ulterior motive for returning to town, while the boys find a way to locate Will but discover that Jane is opposing them.</p>'
          },
          {
            id: 578667,
            name: 'Chapter Six: The Monster',
            season: 1,
            number: 6,
            airstamp: '2016-07-15T12:00:00+00:00',
            runtime: 60,
            summary:
              '<p>Jonathan manages to pull Nancy back to the real world from the Upside Down. Meanwhile, Lucas refuses to help with the search for Jane and goes to Hawkins Labs on his own, while Dustin and Mike look for the missing girl.</p>'
          },
          {
            id: 578668,
            name: 'Chapter Seven: The Bathtub',
            season: 1,
            number: 7,
            airstamp: '2016-07-15T12:00:00+00:00',
            runtime: 60,
            summary:
              '<p>Jim manages to bring everyone together so that they can join forces to reconnect Jane to the Upside Down and find Will. Meanwhile, the government closes in on Jane and the boys.</p>'
          }
        ]
      }
    }
    expect(restructureShow(show)).toEqual({
      '2993': {
        averageEpisodesPerSeason: 3,
        episodes: {
          '578666': {
            airTimestamp: 1468584000,
            sequenceNumber: 's1e5',
            shortSummary:
              'Jim searches for Will at Hawkins Laboratory, but finds something unexpected.',
            shortTitle: 'The Flea and the Acrobat'
          },
          '578667': {
            airTimestamp: 1468584000,
            sequenceNumber: 's1e6',
            shortSummary:
              'Jonathan manages to pull Nancy back to the real world from the Upside Down.',
            shortTitle: 'The Monster'
          },
          '578668': {
            airTimestamp: 1468584000,
            sequenceNumber: 's1e7',
            shortSummary:
              'Jim manages to bring everyone together so that they can join forces to reconnect Jane to the Upside Down and find Will.',
            shortTitle: 'The Bathtub'
          }
        },
        totalDurationSec: 10800
      }
    })
  })
})

describe('findFirstDustinSummary()', () => {
  it('should return the id of the first episode with Dustin in the summary', () => {
    const episodes = [
      {
        id: 1234,
        summary: "This isn't it"
      },
      {
        id: 2345,
        summary: 'Getting warmer'
      },
      {
        id: 3456,
        summary: "It's Dustin!"
      },
      {
        id: 4567,
        summary: 'Passed it'
      }
    ]
    expect(findFirstDustinSummary(episodes)).toBe(3456)
  })
})

describe('getEpisodeAverage()', () => {
  it('should return the average number of episodes to the tenth decimal place', () => {
    const episodes = [
      {
        id: 578666,
        name: 'Chapter Five: The Flea and the Acrobat',
        season: 1,
        number: 5,
        airstamp: '2016-07-15T12:00:00+00:00',
        runtime: 60,
        summary:
          '<p>Jim searches for Will at Hawkins Laboratory, but finds something unexpected. Meanwhile, Lonnie helps Joyce bury Will but reveals an ulterior motive for returning to town, while the boys find a way to locate Will but discover that Jane is opposing them.</p>'
      },
      {
        id: 578667,
        name: 'Chapter Six: The Monster',
        season: 1,
        number: 6,
        airstamp: '2016-07-15T12:00:00+00:00',
        runtime: 60,
        summary:
          '<p>Jonathan manages to pull Nancy back to the real world from the Upside Down. Meanwhile, Lucas refuses to help with the search for Jane and goes to Hawkins Labs on his own, while Dustin and Mike look for the missing girl.</p>'
      },
      {
        id: 578668,
        name: 'Chapter Seven: The Bathtub',
        season: 2,
        number: 7,
        airstamp: '2016-07-15T12:00:00+00:00',
        runtime: 60,
        summary:
          '<p>Jim manages to bring everyone together so that they can join forces to reconnect Jane to the Upside Down and find Will. Meanwhile, the government closes in on Jane and the boys.</p>'
      }
    ]
    expect(getEpisodeAverage(episodes)).toBe(1.5)
  })
})

describe('restructureEpisodes()', () => {
  it('should restructure episodes into an object, instead of an array', () => {
    const episodes = [
      {
        id: 578666,
        name: 'Chapter Five: The Flea and the Acrobat',
        season: 1,
        number: 5,
        airstamp: '2016-07-15T12:00:00+00:00',
        runtime: 60,
        summary:
          '<p>Jim searches for Will at Hawkins Laboratory, but finds something unexpected. Meanwhile, Lonnie helps Joyce bury Will but reveals an ulterior motive for returning to town, while the boys find a way to locate Will but discover that Jane is opposing them.</p>'
      },
      {
        id: 578667,
        name: 'Chapter Six: The Monster',
        season: 1,
        number: 6,
        airstamp: '2016-07-15T12:00:00+00:00',
        runtime: 60,
        summary:
          '<p>Jonathan manages to pull Nancy back to the real world from the Upside Down. Meanwhile, Lucas refuses to help with the search for Jane and goes to Hawkins Labs on his own, while Dustin and Mike look for the missing girl.</p>'
      },
      {
        id: 578668,
        name: 'Chapter Seven: The Bathtub',
        season: 1,
        number: 7,
        airstamp: '2016-07-15T12:00:00+00:00',
        runtime: 60,
        summary:
          '<p>Jim manages to bring everyone together so that they can join forces to reconnect Jane to the Upside Down and find Will. Meanwhile, the government closes in on Jane and the boys.</p>'
      }
    ]
    expect(restructureEpisodes(episodes)).toEqual({
      '578666': {
        airTimestamp: 1468584000,
        sequenceNumber: 's1e5',
        shortSummary:
          'Jim searches for Will at Hawkins Laboratory, but finds something unexpected.',
        shortTitle: 'The Flea and the Acrobat'
      },
      '578667': {
        airTimestamp: 1468584000,
        sequenceNumber: 's1e6',
        shortSummary:
          'Jonathan manages to pull Nancy back to the real world from the Upside Down.',
        shortTitle: 'The Monster'
      },
      '578668': {
        airTimestamp: 1468584000,
        sequenceNumber: 's1e7',
        shortSummary:
          'Jim manages to bring everyone together so that they can join forces to reconnect Jane to the Upside Down and find Will.',
        shortTitle: 'The Bathtub'
      }
    })
  })
})

describe('getAirTimeInEpoch()', () => {
  it('should return timestamp in epoch time (in seconds)', () => {
    const date = new Date('Mon Nov 04 2019 21:52:21 GMT-0700')
    expect(getAirTimestampInEpoch(date)).toBe(1572929541)
  })
})

describe('getShortTitle()', () => {
  it('should return title minus the Chapter number', () => {
    const title = 'Chapter Seven: The Sevening'
    expect(getShortTitle(title)).toBe('The Sevening')
  })
})

describe('getSequenceNumber()', () => {
  it('should return a sequence number in the format of s{x}e{Y}', () => {
    const episode = {
      season: 5,
      number: 3
    }
    expect(getSequenceNumber(episode)).toBe('s5e3')
  })
})

describe('getTotalDurationInSeconds()', () => {
  it('should calculate total duration of series in seconds', () => {
    const episodes = [
      {
        runtime: 60
      },
      {
        runtime: 30
      },
      {
        runtime: 10
      },
      { runtime: 5 }
    ]
    expect(getTotalDurationInSeconds(episodes)).toBe(6300)
  })
})

describe('getShortSummary()', () => {
  it('should summarize', () => {
    const summary =
      '<p>Jonathan manages to pull Nancy back to the real world from the Upside Down. Meanwhile, Lucas refuses to help with the search for Jane and goes to Hawkins Labs on his own, while Dustin and Mike look for the missing girl.</p>'
    expect(getShortSummary(summary)).toBe(
      'Jonathan manages to pull Nancy back to the real world from the Upside Down.'
    )
  })
})

describe('getCommonlyUsedWords()', () => {
  it('should return the five most commonly used words from summarys', () => {
    const episodes = [
      {
        summary:
          'This is a sample sentence. It is long and has a few words that should be the same.'
      },
      {
        summary:
          'This is another sample sentence. Maybe too long of a sentence. Let us see how long a sentence can get... maybe.'
      },
      {
        summary:
          'I just really love spatulas. Something about them makes me want to collect them all. Kinda like some show I used to watch.'
      }
    ]
    expect(getCommonlyUsedWords(episodes)).toBe(
      'a (4), sentence (4), is (3), long (3), This (2)'
    )
  })
})
